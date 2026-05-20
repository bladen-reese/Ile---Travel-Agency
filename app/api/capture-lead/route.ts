import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/client";

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  countries: z.array(z.string()),
  duration: z.number().int(),
  travelers: z.string(),
  budget: z.number().int(),
  interests: z.array(z.string()),
  travelMonth: z.string(),
  archetypeId: z.string(),
  itinerary: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        ...data,
        countries: JSON.stringify(data.countries),
        interests: JSON.stringify(data.interests),
      },
    });

    return NextResponse.json({ id: lead.id });
  } catch (err) {
    console.error("[capture-lead]", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
