"use client";

import { useState } from "react";
import InputWizard, { WizardValues } from "./components/InputWizard";
import LoadingState from "./components/LoadingState";
import ItineraryReveal from "./components/ItineraryReveal";

type Phase = "wizard" | "loading" | "reveal";

interface GeneratedResult {
  archetypeId: string;
  country: string;
  itinerary: object;
}

export default function TripBuilderPage() {
  const [phase, setPhase] = useState<Phase>("wizard");
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [userInputs, setUserInputs] = useState<WizardValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleWizardSubmit(values: WizardValues) {
    setUserInputs(values);
    setPhase("loading");
    setError(null);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      const data = await res.json();
      setResult(data);
      setPhase("reveal");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPhase("wizard");
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="px-6 py-5 border-b border-stone-100 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="font-serif text-xl text-stone-900 tracking-tight">
            Yaguarete Travels
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {phase === "wizard" && (
          <>
            <div className="mb-14">
              <p className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
                Trip builder
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 leading-tight mb-4">
                Where in Latin America
                <br />
                are you going?
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed max-w-xl">
                Answer six questions and we&apos;ll map a route that actually
                makes sense — the regions, the rhythm, and the things people
                get wrong.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-sm text-sm text-red-700">
                {error} — please try again.
              </div>
            )}

            <InputWizard
              onSubmit={handleWizardSubmit}
              isLoading={false}
            />
          </>
        )}

        {phase === "loading" && <LoadingState />}

        {phase === "reveal" && result && userInputs && (
          <>
            <div className="mb-10">
              <button
                onClick={() => { setPhase("wizard"); setResult(null); }}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors mb-8 flex items-center gap-1"
              >
                ← Start over
              </button>
            </div>

            <ItineraryReveal
              itinerary={result.itinerary as Parameters<typeof ItineraryReveal>[0]["itinerary"]}
              archetypeId={result.archetypeId}
              country={result.country}
              userInputs={userInputs}
            />
          </>
        )}
      </div>
    </main>
  );
}
