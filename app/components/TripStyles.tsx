"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n/LanguageContext";
import { tripStyleMeta } from "@/lib/content/tripStyleMeta";

export default function TripStyles() {
  const { tr } = useLang();

  return (
    <section id="trip-styles" className="py-24 px-6 sm:px-12 bg-stone-50">
      <div className="max-w-5xl mx-auto">
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
          {tr.tripStyles.styles.map((style, i) => {
            const meta = tripStyleMeta[i];
            return (
              <div
                key={style.label}
                className="border-t border-stone-200 py-10 grid sm:grid-cols-[220px_1fr_2fr] gap-8 items-start last:border-b"
              >
                {/* Photo */}
                <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-sm bg-stone-200 relative w-full">
                  <Image
                    src={meta.photo}
                    alt={style.label}
                    fill
                    className={`object-cover${meta.id === "holistic" ? " object-left" : ""}`}
                    sizes="220px"
                  />
                  <div className="absolute inset-0 bg-stone-900/20" />
                </div>

                {/* Label + headline */}
                <div className="sm:pt-1">
                  <h3 className="font-serif text-xl text-stone-900 mb-2">{style.label}</h3>
                  <p className="text-xs font-medium uppercase tracking-widest text-amber-700 leading-relaxed">
                    {style.headline}
                  </p>
                </div>

                {/* Description + details */}
                <div>
                  <p className="text-stone-600 leading-relaxed mb-5">{style.description}</p>
                  <div className="space-y-2">
                    <div className="flex gap-3 text-sm">
                      <span className="text-stone-400 shrink-0 w-24">{tr.tripStyles.shape}</span>
                      <span className="text-stone-700">{style.typicalShape}</span>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <span className="text-stone-400 shrink-0 w-24">{tr.tripStyles.budget}</span>
                      <span className="text-stone-700">{style.budgetNote}</span>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <span className="text-stone-400 shrink-0 w-24">{tr.tripStyles.bestFor}</span>
                      <span className="text-stone-700">{style.bestFor}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
