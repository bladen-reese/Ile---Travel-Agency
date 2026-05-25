import { Archetype, CountryTemplate } from "@/lib/templates/schema";

export interface UserInputs {
  countries: string[];
  duration: number;
  travelers: string;
  budget: number;
  interests: string[];
  travelMonth: string;
}

const BUDGET_TIER_RANGES: Record<string, [number, number]> = {
  mid: [1500, 3500],
  "upper-mid": [3000, 5500],
  luxury: [5000, 10000],
};

function scoreArchetype(archetype: Archetype, inputs: UserInputs): number {
  let score = 0;

  // Duration fit
  if (
    inputs.duration >= archetype.min_days &&
    inputs.duration <= archetype.max_days
  ) {
    score += 40;
  } else {
    const gap = Math.min(
      Math.abs(inputs.duration - archetype.min_days),
      Math.abs(inputs.duration - archetype.max_days)
    );
    score += Math.max(0, 40 - gap * 8);
  }

  // Interest overlap
  const interestMatches = inputs.interests.filter((i) =>
    archetype.interests.includes(i)
  ).length;
  score += interestMatches * 10;

  // Traveler type match
  const travelerKey =
    inputs.travelers === "couple"
      ? "couples"
      : inputs.travelers.startsWith("family")
        ? "families"
        : "couples";
  if (archetype.travelers.includes(travelerKey)) {
    score += 15;
  }

  // Budget tier match
  const [low, high] = BUDGET_TIER_RANGES[archetype.budget_tier] ?? [0, 99999];
  if (inputs.budget >= low && inputs.budget <= high) {
    score += 20;
  } else if (inputs.budget < low) {
    score += Math.max(0, 20 - (low - inputs.budget) / 100);
  } else {
    score += 10; // budget is above tier — still a reasonable match
  }

  // Priority boost — surfaces partner destinations when scores are otherwise equal
  if (archetype.is_priority) {
    score += 15;
  }

  return score;
}

export function matchArchetype(
  template: CountryTemplate,
  inputs: UserInputs
): Archetype {
  let best = template.archetypes[0];
  let bestScore = -1;

  for (const archetype of template.archetypes) {
    const score = scoreArchetype(archetype, inputs);
    if (score > bestScore) {
      bestScore = score;
      best = archetype;
    }
  }

  // Fall back to default if score is too low
  if (bestScore < 20) {
    const defaultArchetype = template.archetypes.find(
      (a) => a.id === template.default_archetype_id
    );
    return defaultArchetype ?? template.archetypes[0];
  }

  return best;
}
