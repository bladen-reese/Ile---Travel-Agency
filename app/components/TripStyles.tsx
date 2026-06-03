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

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {tr.tripStyles.styles.map((style, i) => {
            const meta = tripStyleMeta[i];
            return (
              <div key={style.label} className="flex flex-col">
                {/* Photo */}
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-stone-200 relative w-full mb-5">
                  <Image
                    src={meta.photo}
                    alt={style.label}
                    fill
                    className={`object-cover${meta.id === "holistic" ? " object-left" : ""}`}
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-stone-900/20" />
                </div>

                {/* Label + description */}
                <h3 className="font-serif text-2xl text-stone-900 mb-3 leading-snug">
                  {style.label}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
