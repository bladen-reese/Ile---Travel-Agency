import Anthropic from "@anthropic-ai/sdk";
import { Archetype } from "@/lib/templates/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";

const client = new Anthropic();

const HOTEL_DENYLIST = [
  /\b(marriott|hilton|hyatt|sheraton|westin|ritz.?carlton|four seasons|intercontinental|radisson|ibis|novotel|accor)\b/i,
  /\b(booking\.com|tripadvisor|airbnb|vrbo)\b/i,
];

function containsDeniedContent(text: string): boolean {
  return HOTEL_DENYLIST.some((pattern) => pattern.test(text));
}

async function callClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}

function extractJSON(raw: string): object {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in Claude response");
  return JSON.parse(jsonMatch[0]);
}

export async function polishWithClaude(
  archetype: Archetype,
  duration: number,
  travelMonth: string,
  country: string
): Promise<object> {
  const userPrompt = buildUserPrompt(archetype, duration, travelMonth, country);

  let raw = await callClaude(SYSTEM_PROMPT, userPrompt);
  let parsed = extractJSON(raw);

  if (containsDeniedContent(JSON.stringify(parsed))) {
    const stricter =
      SYSTEM_PROMPT +
      "\n\nWARNING: Your previous response contained specific hotel or operator names. This is strictly forbidden. Do NOT name any specific accommodation, restaurant, or operator under any circumstances.";
    raw = await callClaude(stricter, userPrompt);
    parsed = extractJSON(raw);
  }

  return parsed;
}
