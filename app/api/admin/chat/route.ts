import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "bladen-reese/Ile---Travel-Agency";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

// Always loaded — covers most text/content requests
const CORE_FILES = [
  "lib/i18n/translations.ts",
  "lib/content/tripStyleMeta.ts",
  "lib/content/stays.ts",
];

// Keyword → extra files to include
const KEYWORD_FILES: [string, string[]][] = [
  ["colombia", ["lib/templates/colombia.json"]],
  ["ecuador", ["lib/templates/ecuador.json"]],
  ["peru", ["lib/templates/_country_six.json"]],
  ["perú", ["lib/templates/_country_six.json"]],
  ["panama", ["lib/templates/panama.json"]],
  ["panamá", ["lib/templates/panama.json"]],
  ["costa rica", ["lib/templates/costa_rica.json"]],
  ["brazil", ["lib/templates/brazil.json"]],
  ["brasil", ["lib/templates/brazil.json"]],
  ["argentina", ["lib/templates/argentina.json"]],
  ["archetype", [
    "lib/templates/colombia.json", "lib/templates/ecuador.json",
    "lib/templates/_country_six.json", "lib/templates/panama.json",
    "lib/templates/costa_rica.json", "lib/templates/brazil.json",
    "lib/templates/argentina.json",
  ]],
  ["destination", [
    "lib/templates/colombia.json", "lib/templates/ecuador.json",
    "lib/templates/_country_six.json", "lib/templates/panama.json",
    "lib/templates/costa_rica.json", "lib/templates/brazil.json",
    "lib/templates/argentina.json",
  ]],
  ["destino", [
    "lib/templates/colombia.json", "lib/templates/ecuador.json",
    "lib/templates/_country_six.json", "lib/templates/panama.json",
    "lib/templates/costa_rica.json", "lib/templates/brazil.json",
    "lib/templates/argentina.json",
  ]],
  ["hero", ["app/components/Hero.tsx"]],
  ["footer", ["app/components/SiteFooter.tsx"]],
  ["nav", ["app/components/SiteNav.tsx"]],
  ["how it works", ["app/components/HowItWorks.tsx"]],
  ["cómo funciona", ["app/components/HowItWorks.tsx"]],
  ["countries section", ["app/components/Countries.tsx"]],
  ["sección países", ["app/components/Countries.tsx"]],
  ["proof", ["app/components/ProofOfStay.tsx"]],
  ["alojamiento", ["app/components/ProofOfStay.tsx"]],
  ["cta", ["app/components/BottomCTA.tsx"]],
  ["whatsapp", ["app/components/SiteFooter.tsx", "app/components/BottomCTA.tsx"]],
  ["new page", ["app/page.tsx"]],
  ["nueva página", ["app/page.tsx"]],
  ["new section", ["app/page.tsx"]],
  ["nueva sección", ["app/page.tsx"]],
  ["layout", ["app/page.tsx", "app/components/Hero.tsx"]],
  ["color", ["app/components/Hero.tsx", "app/components/TripStyles.tsx"]],
  ["colour", ["app/components/Hero.tsx", "app/components/TripStyles.tsx"]],
  ["design", [
    "app/components/Hero.tsx", "app/components/TripStyles.tsx",
    "app/components/SiteNav.tsx", "app/components/SiteFooter.tsx",
  ]],
  ["diseño", [
    "app/components/Hero.tsx", "app/components/TripStyles.tsx",
    "app/components/SiteNav.tsx", "app/components/SiteFooter.tsx",
  ]],
];

const SYSTEM_PROMPT = `You are an AI assistant that manages the Yaguaréte Travels website — a Next.js travel agency site for Latin America. Ile (the owner) sends requests in Spanish or English; you implement them and return the modified files.

## Codebase overview

### lib/i18n/translations.ts
Main content file. Exports \`translations\` with \`en\` and \`es\` keys — identical structure in both.
CRITICAL: When you change ANY text content, update BOTH languages. The \`tripStyles.styles\` array must have the same length and order in en and es at all times.

### lib/content/tripStyleMeta.ts
Exports \`tripStyleMeta\` — array of \`{ id, photo, emoji }\`. This array is accessed by POSITIONAL INDEX against translations.tripStyles.styles. If you add a style, append to the END of this array and also append to the END of both en.tripStyles.styles and es.tripStyles.styles. Never reorder.

### lib/content/stays.ts
"Proof of stay" entries — real places Ile visited. Fields: country, region, stayType, photo (/photos/filename.jpg), photoAlt, note, month, standout. The tripStyles export at the bottom is unused; ignore it.

### lib/templates/*.json
Trip builder destination data. Structure: \`{ "country": { "name": "...", "archetypes": [...] } }\`.
Each archetype: id, min_days, max_days, interests[], travelers[], budget_tier ("mid"|"upper-mid"|"luxury"), is_priority (boolean), regions[{name, nights, highlights[], type}], common_mistakes[], budget_range_usd_per_person: { low, high }.
Valid interests: nature, culture, adventure, food, beaches, wellness, rest, solo_women, coffee, holistic, honeymoon, party, photography, birdwatching, surf, gastronomy.

### app/components/*.tsx
React components. Use Tailwind CSS with the existing color palette (stone-900, stone-50, amber-700, white). Match the design patterns you see in the existing components.

### app/page.tsx
Root page — imports and renders components in order. Edit this to add/remove/reorder sections.

## Response format
Return ONLY raw JSON — no markdown, no code fences:
{
  "reply": "Response in the same language Ile used",
  "changes": [
    {
      "path": "lib/i18n/translations.ts",
      "content": "COMPLETE file content — never a partial or diff",
      "description": "One-line description of what changed"
    }
  ]
}

## Non-negotiable rules
1. Always return COMPLETE file content — never a partial, never a diff
2. Always update both \`en\` and \`es\` when changing text
3. Never break positional sync between tripStyleMeta and tripStyles.styles
4. New trip styles always appended to END of arrays
5. All TypeScript must be syntactically valid — watch quotes, brackets, commas
6. Preserve all existing content unless Ile explicitly says to remove it
7. If a request is unclear, ask in the reply and return empty changes array
8. If a change would require a photo that doesn't exist yet, note it in the reply
9. NEVER ask Ile to paste or share file contents — the files are loaded automatically from GitHub. If files are missing from context, tell Ile there was a technical issue loading files and to try again`;

async function readFromGitHub(
  filePath: string
): Promise<{ content: string; sha: string } | null> {
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
    return {
      content: Buffer.from(data.content, "base64").toString("utf-8"),
      sha: data.sha,
    };
  } catch {
    return null;
  }
}

async function writeToGitHub(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<{ ok: boolean; error?: string }> {
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
    return NextResponse.json(
      {
        reply:
          "El panel no puede guardar cambios porque GITHUB_TOKEN no está configurado. Configuralo en las variables de entorno de Vercel.",
        changes: [],
        error: true,
      },
      { status: 503 }
    );
  }

  // Determine which files to load
  const msgLower = message.toLowerCase();
  const filesToLoad = new Set<string>(CORE_FILES);
  for (const [keyword, files] of KEYWORD_FILES) {
    if (msgLower.includes(keyword)) files.forEach((f) => filesToLoad.add(f));
  }

  // Fetch file contents in parallel
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
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const raw =
      response.content[0].type === "text"
        ? response.content[0].text.trim()
        : "";

    let parsed: {
      reply: string;
      changes: { path: string; content: string; description: string }[];
    };

    try {
      const cleaned = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // Claude returned plain text rather than JSON — surface it as a reply
      return NextResponse.json({ reply: raw, changes: [] });
    }

    // Apply changes sequentially (GitHub API requires current SHA)
    const applied: { path: string; description: string }[] = [];
    const failed: string[] = [];

    for (const change of parsed.changes ?? []) {
      const label = change.description ?? message.slice(0, 72);
      const result = await writeToGitHub(
        change.path,
        change.content,
        `Admin: ${label}`
      );
      if (result.ok) {
        applied.push({ path: change.path, description: change.description });
      } else {
        failed.push(change.path);
        console.error(`[admin/chat] Failed to write ${change.path}:`, result.error);
      }
    }

    let reply = parsed.reply;
    if (failed.length > 0) {
      reply += `\n\n⚠️ No se pudieron guardar: ${failed.join(", ")}`;
    }

    return NextResponse.json({ reply, changes: applied });
  } catch (err) {
    console.error("[admin/chat]", err);
    return NextResponse.json(
      {
        reply:
          "Ocurrió un error al procesar tu solicitud. Por favor intentá de nuevo.",
        changes: [],
        error: true,
      },
      { status: 500 }
    );
  }
}
