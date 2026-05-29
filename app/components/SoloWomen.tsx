"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function SoloWomen() {
  const { tr } = useLang();

  return (
    <section className="py-24 px-6 sm:px-12 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <p className="text-amber-700 text-xs font-medium uppercase tracking-[0.2em] mb-5">
          {tr.solo.eyebrow}
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/2">
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 leading-tight">
              {tr.solo.heading}
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-center">
            <p className="text-stone-600 text-base leading-relaxed">
              {tr.solo.body}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {tr.solo.pillars.map((pillar) => (
            <div key={pillar.title} className="border-t-2 border-amber-700 pt-6">
              <h3 className="font-medium text-stone-900 text-base mb-3 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/trip-builder"
            className="inline-flex items-center justify-center h-12 px-8 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-stone-700 transition-colors"
          >
            {tr.solo.cta}
          </Link>
          <a
            href="https://wa.me/5491137811199"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 border border-stone-300 text-stone-700 text-sm font-medium rounded-sm hover:border-stone-500 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
