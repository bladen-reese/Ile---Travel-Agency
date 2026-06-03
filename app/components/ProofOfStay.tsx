"use client";

import Image from "next/image";
import { stays } from "@/lib/content/stays";
import { useLang } from "@/lib/i18n/LanguageContext";

const BG: Record<string, string> = {
  Panama: "bg-emerald-900",
  Colombia: "bg-yellow-900",
  Ecuador: "bg-teal-900",
  Argentina: "bg-violet-900",
  Brazil: "bg-orange-900",
};

export default function ProofOfStay() {
  const { tr } = useLang();
  const top = stays.slice(0, 3);

  function PhotoCard({
    stay,
    aspect,
  }: {
    stay: (typeof stays)[0];
    aspect: string;
  }) {
    const bg = BG[stay.country] ?? "bg-stone-800";
    return (
      <div>
        <div className={`relative ${aspect} overflow-hidden rounded-sm bg-stone-200`}>
          {stay.photo !== "/photos/placeholder.jpg" ? (
            <Image
              src={stay.photo}
              alt={stay.photoAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
          ) : (
            <div className={`absolute inset-0 ${bg}`} />
          )}
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>
        <div className="mt-2.5">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-[0.15em]">
            {stay.region}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="proof" className="py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-3">
          {tr.proof.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-4 leading-tight">
          {tr.proof.heading}
        </h2>
        <p className="text-stone-500 text-base leading-relaxed mb-12 max-w-xl">
          {tr.proof.body}
        </p>

        {/* 3 portrait photos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {top.map((stay, i) => (
            <PhotoCard key={i} stay={stay} aspect="aspect-[3/4]" />
          ))}
        </div>

        <p className="text-stone-400 text-xs mt-8">{tr.proof.noCommission}</p>
      </div>
    </section>
  );
}
