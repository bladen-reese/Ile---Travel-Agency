"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

const EMOJIS = ["🦜", "🏛️", "⛰️", "☕", "🏝️", "🌿"];

export default function TripStyles() {
  const { tr } = useLang();

  return (
    <section id="trip-styles" className="py-24 px-6 sm:px-12 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-4">
          {tr.tripStyles.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6 leading-tight">
          {tr.tripStyles.heading}
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed mb-16 max-w-2xl">
          {tr.tripStyles.body}
        </p>

        <div className="space-y-0">
          {tr.tripStyles.styles.map((style, i) => (
            <div
              key={style.label}
              className="border-t border-stone-200 py-10 grid sm:grid-cols-[1fr_2fr] gap-8 items-start last:border-b"
            >
              <div>
                <span className="text-3xl mb-3 block">{EMOJIS[i]}</span>
                <h3 className="font-serif text-xl text-stone-900 mb-1">{style.label}</h3>
                <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
                  {style.headline}
                </p>
              </div>
              <div>
                <p className="text-stone-600 leading-relaxed mb-4">{style.description}</p>
                <div className="space-y-2">
                  <div className="flex gap-3 text-sm">
                    <span className="text-stone-400 shrink-0 w-28">{tr.tripStyles.shape}</span>
                    <span className="text-stone-700">{style.typicalShape}</span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-stone-400 shrink-0 w-28">{tr.tripStyles.budget}</span>
                    <span className="text-stone-700">{style.budgetNote}</span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-stone-400 shrink-0 w-28">{tr.tripStyles.bestFor}</span>
                    <span className="text-stone-700">{style.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
