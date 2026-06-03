import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "bladen-reese/Ile---Travel-Agency";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK ?? "";

const CORE_FILES = [
  "lib/i18n/translations.ts",
  "lib/content/tripStyleMeta.ts",
  "lib/content/stays.ts",
];

const KEYWORD_FILES: [string, string[]][] = [
  ["hero", ["app/components/Hero.tsx"]],
  ["footer", ["app/components/SiteFooter.tsx"]],
  ["nav", ["app/components/SiteNav.tsx"]],
  ["how it works", ["app/components/HowItWorks.tsx"]],
  ["cómo funciona", ["app/components/HowItWorks.tsx"]],
  ["countries", ["app/page.tsx"]],
  ["países", ["app/page.tsx"]],
  ["six countries", ["app/page.tsx"]],
  ["seis países", ["app/page.tsx"]],
  ["proof", ["app/page.tsx"]],
  ["places we've", ["app/page.tsx"]],
  ["lugares donde", ["app/page.tsx"]],
  ["page.tsx", ["app/page.tsx"]],
];

// ── Operation types returned by Claude ──────────────────────────────────────
type Op =
  | { op: "remove_style"; id: string }
  | { op: "set_key"; path: string; en: string; es: string }
  | { op: "replace_file"; path: string; content: string };

const SYSTEM_PROMPT = `You are an AI assistant managing the Yaguaréte Travels website. Ile (the owner) sends requests in Spanish or English.

You will receive the current file contents. Return ONLY raw JSON — no markdown, no code fences:
{
  "reply": "Short confirmation in the same language Ile used",
  "ops": [ ... ]
}

## Page sections (in order on the landing page)
- Hero — heading, body, CTA button
- HowItWorks — "How a trip comes together" / "Cómo se construye un viaje"
- TripStyles — "Different travelers want different things" / "Cada viajero busca algo diferente"
- ProofOfStay — "Places we've actually stayed" / "Lugares donde realmente nos alojamos"
- Countries — "Six countries, each with a distinct logic" / "Seis países, cada uno con su propia lógica"
- BottomCTA — "Ready to sketch your trip?" / "¿Listo para esbozar tu viaje?"
- SiteFooter

To REMOVE a section entirely, use replace_file on app/page.tsx and omit the component.
To EDIT section text, use set_key on the relevant translations.ts key.

## Operation types

### Remove a trip style card
{ "op": "remove_style", "id": "<id from tripStyleMeta>" }
This removes the style from BOTH languages in translations.ts AND from tripStyleMeta.ts automatically.

Available style IDs: nature, culture, adventure, beaches, wellness, rest, holistic, honeymoon, party, photography, birdwatching, surf

### Set a simple translation key
{ "op": "set_key", "path": "en.hero.heading1", "en": "New English text", "es": "Nuevo texto en español" }
The "path" uses dot notation into the translations object. Always provide both "en" and "es".

### Replace an entire file
{ "op": "replace_file", "path": "app/page.tsx", "content": "COMPLETE file content" }
Use for app/page.tsx (to remove/reorder sections) or stays.ts or small components. NEVER use for translations.ts or tripStyleMeta.ts.

## Rules
1. Prefer remove_style and set_key — they are fast and reliable
2. Never use replace_file for translations.ts — use set_key instead
3. For trip style text changes, use set_key with path like "en.tripStyles.styles.2.description" (0-indexed)
4. Match section names to the page section list above — never ask for clarification about which section when the name matches a known section heading
5. Never ask Ile to paste file contents
6. If truly unclear (not just a section name question), set ops to [] and ask once`;

async function readFromGitHub(filePath: string): Promise<{ content: string; sha: string } | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${encodeURIComponent(GITHUB_BRANCH)}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.type !== "file" || !data.content) return null;
    return { content: Buffer.from(data.content, "base64").toString("utf-8"), sha: data.sha };
  } catch {
    return null;
  }
}

async function writeToGitHub(filePath: string, content: string, commitMessage: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const current = await readFromGitHub(filePath);
    const body: Record<string, string> = {
      message: commitMessage,
      content: Buffer.from(content).toString("base64"),
      branch: GITHUB_BRANCH,
    };
    if (current?.sha) body.sha = current.sha;
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: (err as { message?: string }).message };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ── Operation handlers ───────────────────────────────────────────────────────

function removeStyleFromTranslations(content: string, id: string): string {
  // Remove a style block from a styles array in translations.ts.
  // We identify entries by matching their label, but we need the id→label mapping.
  // Strategy: remove the tripStyleMeta entry (easy) and the positional styles entry.
  // Since we already know the id, we find it in tripStyleMeta to get its index,
  // then remove the same index from both EN and ES styles arrays.
  // Simpler approach: remove blocks by searching for the id inside the block.
  // The id maps to labels — we'll use a regex to find and remove the entry.

  // Remove matching object from any `styles: [` array — match by id keyword in description area
  // We'll do it by finding the block boundaries
  const lines = content.split("\n");
  const result: string[] = [];
  let inBlock = false;
  let braceDepth = 0;
  let i = 0;

  // We need to identify which positional entry corresponds to this id.
  // Map known ids to label substrings for matching:
  const idToLabelHint: Record<string, string[]> = {
    nature:       ["Nature & wildlife", "Naturaleza y fauna"],
    culture:      ["Culture & history", "Cultura e historia"],
    adventure:    ["Adventure & hiking", "Aventura y senderismo"],
    food:         ["Food & coffee", "Gastronomía y café"],
    beaches:      ["Beaches & islands", "Playas e islas"],
    wellness:     ["Slow travel & wellness", "Viaje lento y bienestar"],
    rest:         ["Rest & disconnect", "Descanso y desconexión"],
    holistic:     ["Holistic retreat", "Retiro holístico"],
    honeymoon:    ["Honeymoon & romance", "Luna de miel y romance"],
    party:        ["Groups & social", "Grupos y social"],
    photography:  ["Photography", "Fotografía"],
    birdwatching: ["Birdwatching", "Avistamiento de aves"],
    surf:         ["Surf & coast", "Surf y costa"],
  };

  const hints = idToLabelHint[id] ?? [];

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!inBlock) {
      // Check if this line starts a style entry that matches our id
      if (trimmed === "{") {
        // Look ahead to see if any of the next few lines contain a matching label
        const lookahead = lines.slice(i, i + 4).join("\n");
        const matches = hints.some(h => lookahead.includes(h));
        if (matches) {
          inBlock = true;
          braceDepth = 1;
          i++;
          continue;
        }
      }
      result.push(line);
    } else {
      // Count braces to find end of block
      for (const ch of line) {
        if (ch === "{") braceDepth++;
        if (ch === "}") braceDepth--;
      }
      if (braceDepth <= 0) {
        inBlock = false;
        // Skip trailing comma on the closing brace line
        i++;
        // Also skip a blank line after if present
        if (lines[i]?.trim() === "") i++;
        continue;
      }
    }
    i++;
  }

  return result.join("\n");
}

function removeStyleFromMeta(content: string, id: string): string {
  // Remove the line containing the given id from tripStyleMeta
  const lines = content.split("\n");
  const filtered = lines.filter(line => !line.includes(`id: "${id}"`));
  return filtered.join("\n");
}

function applySetKey(content: string, path: string, value: string): string {
  // path like "en.hero.heading1"
  // Find the key in the file and replace its string value
  const parts = path.split(".");
  const key = parts[parts.length - 1];
  // Build a regex that finds: key: "...", (possibly multiline)
  const keyEscaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const valueEscaped = value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
  // Replace the value of this key — handles both single and double quotes
  const re = new RegExp(`(${keyEscaped}:\\s*)["'\`][^"'\`]*["'\`]`);
  if (re.test(content)) {
    return content.replace(re, `$1"${valueEscaped}"`);
  }
  return content;
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: { message: string; password: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { message, password } = body;

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({
      reply: "GITHUB_TOKEN no está configurado en las variables de entorno de Vercel.",
      changes: [], error: true,
    }, { status: 503 });
  }

  // Load files
  const msgLower = message.toLowerCase();
  const filesToLoad = new Set<string>(CORE_FILES);
  for (const [keyword, files] of KEYWORD_FILES) {
    if (msgLower.includes(keyword)) files.forEach(f => filesToLoad.add(f));
  }

  const fetched = await Promise.all(
    Array.from(filesToLoad).map(async (path) => {
      const result = await readFromGitHub(path);
      if (!result) return null;
      return `=== ${path} ===\n${result.content}`;
    })
  );

  const context = fetched.filter(Boolean).join("\n\n");
  const userContent = `Current website files:\n\n${context}\n\n${"─".repeat(40)}\n\nRequest: ${message}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text.trim() : "";

    let parsed: { reply: string; ops: Op[] };
    try {
      const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ reply: raw, changes: [] });
    }

    const ops: Op[] = parsed.ops ?? [];
    const applied: { path: string; description: string }[] = [];
    const failed: string[] = [];

    // Apply operations
    for (const op of ops) {
      if (op.op === "remove_style") {
        // Remove from translations.ts
        const trans = await readFromGitHub("lib/i18n/translations.ts");
        if (trans) {
          const modified = removeStyleFromTranslations(trans.content, op.id);
          const res = await writeToGitHub("lib/i18n/translations.ts", modified, `Admin: Remove ${op.id} style from translations`);
          if (res.ok) applied.push({ path: "lib/i18n/translations.ts", description: `Removed ${op.id} style` });
          else failed.push("lib/i18n/translations.ts");
        }
        // Remove from tripStyleMeta.ts
        const meta = await readFromGitHub("lib/content/tripStyleMeta.ts");
        if (meta) {
          const modified = removeStyleFromMeta(meta.content, op.id);
          const res = await writeToGitHub("lib/content/tripStyleMeta.ts", modified, `Admin: Remove ${op.id} from tripStyleMeta`);
          if (res.ok) applied.push({ path: "lib/content/tripStyleMeta.ts", description: `Removed ${op.id} entry` });
          else failed.push("lib/content/tripStyleMeta.ts");
        }
      } else if (op.op === "set_key") {
        // Update a key in translations.ts
        const trans = await readFromGitHub("lib/i18n/translations.ts");
        if (trans) {
          let modified = applySetKey(trans.content, op.path, op.en);
          // For the ES equivalent, derive the es path
          const esPath = op.path.startsWith("en.") ? "es." + op.path.slice(3) : op.path;
          modified = applySetKey(modified, esPath, op.es);
          const res = await writeToGitHub("lib/i18n/translations.ts", modified, `Admin: Update ${op.path}`);
          if (res.ok) applied.push({ path: "lib/i18n/translations.ts", description: `Updated ${op.path}` });
          else failed.push("lib/i18n/translations.ts");
        }
      } else if (op.op === "replace_file") {
        const res = await writeToGitHub(op.path, op.content, `Admin: Update ${op.path}`);
        if (res.ok) applied.push({ path: op.path, description: `Updated ${op.path}` });
        else failed.push(op.path);
      }
    }

    if (applied.length > 0 && VERCEL_DEPLOY_HOOK) {
      fetch(VERCEL_DEPLOY_HOOK, { method: "POST" }).catch(() => {});
    }

    let reply = parsed.reply;
    if (failed.length > 0) reply += `\n\n⚠️ No se pudieron guardar: ${failed.join(", ")}`;

    return NextResponse.json({ reply, changes: applied });
  } catch (err) {
    console.error("[admin/chat]", err);
    return NextResponse.json({
      reply: "Ocurrió un error al procesar tu solicitud. Por favor intentá de nuevo.",
      changes: [], error: true,
    }, { status: 500 });
  }
}
