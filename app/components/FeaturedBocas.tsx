"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n/LanguageContext";

// Two landscape photos for the featured Bocas section.
const PHOTOS = [
  "/photos/styles/PureRootsV2-142.jpg",
  "/photos/styles/CoralWing-43.jpg",
];

export default function FeaturedBocas() {
  const { tr } = useLang();

  return (
    <section id="featured" className="py-24 px-6 sm:px-12 bg-stone-900">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-500 mb-4">
          {tr.featured.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-12 leading-tight max-w-2xl">
          {tr.featured.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tr.featured.cards.map((card, i) => {
            const photo = PHOTOS[i];
            const isPlaceholder = photo === "/photos/placeholder.jpg";
            return (
              <div key={card.label}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-stone-800">
                  {!isPlaceholder ? (
                    <Image
                      src={photo}
                      alt={card.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 480px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-stone-800" />
                  )}
                  <div className="absolute inset-0 bg-stone-900/10" />
                </div>
                <div className="mt-3">
                  <p className="font-serif text-xl text-white">{card.label}</p>
                  <p className="text-stone-400 text-sm leading-relaxed mt-1">
                    {card.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-amber-500 text-sm font-medium mt-8">{tr.featured.note}</p>
      </div>
    </section>
  );
}
