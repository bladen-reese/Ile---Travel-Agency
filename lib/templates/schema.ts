import { z } from "zod";

export const ActivitySchema = z.object({
  category: z.string(),
  locked_specifics: z.number().int(),
  polished_description: z.string().optional(),
});

export const RegionSchema = z.object({
  name: z.string(),
  nights: z.number().int(),
  stay_type: z.string(),
  stay_locked_count: z.number().int(),
  activities: z.array(ActivitySchema),
  polished_intro: z.string().optional(),
  polished_days: z.array(z.string()).optional(),
});

export const ArchetypeSchema = z.object({
  id: z.string(),
  min_days: z.number().int(),
  max_days: z.number().int(),
  interests: z.array(z.string()),
  travelers: z.array(z.string()),
  budget_tier: z.enum(["mid", "upper-mid", "luxury"]),
  regions: z.array(RegionSchema),
  common_mistakes: z.array(z.string()),
  budget_range_usd_per_person: z.object({ low: z.number(), high: z.number() }),
  polished_headline: z.string().optional(),
  polished_summary: z.string().optional(),
});

export const CountryTemplateSchema = z.object({
  country: z.string(),
  default_archetype_id: z.string(),
  archetypes: z.array(ArchetypeSchema),
});

export type Activity = z.infer<typeof ActivitySchema>;
export type Region = z.infer<typeof RegionSchema>;
export type Archetype = z.infer<typeof ArchetypeSchema>;
export type CountryTemplate = z.infer<typeof CountryTemplateSchema>;
