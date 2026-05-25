import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { matchArchetype, UserInputs } from "@/lib/selector/matchArchetype";
import { polishWithClaude } from "@/lib/polish/polishWithClaude";
import { CountryTemplateSchema } from "@/lib/templates/schema";

const InputSchema = z.object({
  countries: z.array(z.string()).min(1),
  duration: z.number().int().min(5).max(21),
  travelers: z.string(),
  budget: z.number().int().min(1500).max(6000),
  interests: z.array(z.string()).min(1),
  travelMonth: z.string(),
});

const COUNTRY_TEMPLATE_MAP: Record<string, string> = {
  Panama: "panama",
  Colombia: "colombia",
  Ecuador: "ecuador",
  Brazil: "brazil",
  Argentina: "argentina",
  Peru: "_country_six",
  "Costa Rica": "costa_rica",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputs = InputSchema.parse(body) as UserInputs;

    const country = inputs.countries[0];
    const templateKey = COUNTRY_TEMPLATE_MAP[country];
    if (!templateKey) {
      return NextResponse.json(
        { error: `No template for country: ${country}` },
        { status: 400 }
      );
    }

    const rawTemplate = await import(
      `@/lib/templates/${templateKey}.json`
    ).then((m) => m.default);
    const template = CountryTemplateSchema.parse(rawTemplate);

    const archetype = matchArchetype(template, inputs);
    const polished = await polishWithClaude(
      archetype,
      inputs.duration,
      inputs.travelMonth,
      country
    );

    return NextResponse.json({
      archetypeId: archetype.id,
      country,
      itinerary: polished,
    });
  } catch (err) {
    console.error("[generate-itinerary]", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
