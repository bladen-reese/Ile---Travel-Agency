"use client";

import { useState } from "react";
import RegionCard from "./RegionCard";
import CommonMistakes from "./CommonMistakes";
import LeadCaptureGate from "./LeadCaptureGate";
import FinalCTA from "./FinalCTA";

interface Activity {
  category: string;
  locked_specifics: number;
  polished_description?: string;
}

interface Region {
  name: string;
  nights: number;
  stay_type: string;
  stay_locked_count: number;
  activities: Activity[];
  polished_intro?: string;
  polished_days?: string[];
}

interface Itinerary {
  polished_headline?: string;
  polished_summary?: string;
  regions: Region[];
  common_mistakes: string[];
  budget_range_usd_per_person: { low: number; high: number };
}

interface Props {
  itinerary: Itinerary;
  archetypeId: string;
  country: string;
  userInputs: {
    countries: string[];
    duration: number;
    travelers: string;
    budget: number;
    interests: string[];
    travelMonth: string;
  };
}

function totalLockedCount(itinerary: Itinerary): number {
  return itinerary.regions.reduce((sum, r) => {
    const activityLocks = r.activities.reduce(
      (s, a) => s + a.locked_specifics,
      0
    );
    return sum + r.stay_locked_count + activityLocks;
  }, 0);
}

export default function ItineraryReveal({
  itinerary,
  archetypeId,
  country,
  userInputs,
}: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const locked = totalLockedCount(itinerary);

  async function handleCapture(values: {
    name: string;
    email: string;
    phone: string;
  }) {
    await fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        ...userInputs,
        archetypeId,
        itinerary: JSON.stringify(itinerary),
      }),
    });
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        {itinerary.polished_headline && (
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
            {itinerary.polished_headline}
          </h2>
        )}
        {itinerary.polished_summary && (
          <p className="text-stone-600 text-lg leading-relaxed max-w-2xl">
            {itinerary.polished_summary}
          </p>
        )}

        {!unlocked && (
          <div className="mt-6 inline-flex items-center gap-2 bg-stone-100 rounded-sm px-4 py-2 text-sm text-stone-600">
            <span>🔒</span>
            <span>
              This teaser unlocks{" "}
              <strong className="text-stone-900">{locked} more decisions</strong>{" "}
              when you work with us
            </span>
          </div>
        )}
      </div>

      {/* Always-visible first region */}
      <RegionCard region={itinerary.regions[0]} index={0} />

      {/* Gate or rest of itinerary */}
      {!unlocked ? (
        <div className="mt-6 relative">
          {/* Blurred preview of region 2 */}
          {itinerary.regions[1] && (
            <div className="relative overflow-hidden max-h-48 pointer-events-none select-none">
              <div className="blur-sm opacity-40">
                <RegionCard region={itinerary.regions[1]} index={1} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50" />
            </div>
          )}
          <LeadCaptureGate onCapture={handleCapture} />
        </div>
      ) : (
        <>
          {itinerary.regions.slice(1).map((region, i) => (
            <RegionCard key={region.name} region={region} index={i + 1} />
          ))}

          <div className="mt-10">
            <CommonMistakes mistakes={itinerary.common_mistakes} />
          </div>

          <div className="mt-6 border border-stone-100 rounded-sm px-6 py-4 flex items-center gap-3">
            <div className="text-stone-500 text-sm">
              <strong className="text-stone-800">Budget range:</strong>{" "}
              ${itinerary.budget_range_usd_per_person.low.toLocaleString()} –{" "}
              ${itinerary.budget_range_usd_per_person.high.toLocaleString()} per
              person
            </div>
          </div>

          <FinalCTA country={country} />
        </>
      )}
    </div>
  );
}
