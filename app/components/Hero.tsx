"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageContext";

const COUNTRIES = ["ARGENTINA", "BRAZIL", "PERU", "ECUADOR", "COLOMBIA", "PANAMA", "COSTA RICA"];

export default function Hero() {
  const { tr } = useLang();

  return (
    <section data-hero className="relative min-h-[92vh] flex flex-col justify-end pb-20 px-6 sm:px-12 overflow-hidden bg-stone-900">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #78350f 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #1c1917 0%, transparent 50%)`,
        }}
      />

      {/* Nav shade */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.80) 0%, transparent 100%)" }}
      />

      {/* Scrolling country marquee */}
      <div className="absolute top-36 left-0 right-0 overflow-hidden opacity-[0.13] pointer-events-none select-none">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 35s linear infinite" }}>
          {[0, 1].map((copy) =>
            COUNTRIES.map((c) => (
              <span
                key={`${copy}-${c}`}
                className="font-serif text-white leading-none"
                style={{ fontSize: "9vw", marginRight: "4vw", flexShrink: 0 }}
              >
                {c}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="relative max-w-4xl">
        <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-6">
          {tr.hero.eyebrow}
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl text-white leading-[1.05] mb-8">
          {tr.hero.heading1}
          <br />
          <span className="italic text-stone-300">{tr.hero.heading2}</span>
        </h1>
        <p className="text-stone-300 text-xl sm:text-2xl font-light leading-relaxed max-w-xl mb-12">
          {tr.hero.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/trip-builder"
            className="inline-flex items-center justify-center h-14 px-10 bg-amber-700 text-white text-sm font-medium rounded-sm hover:bg-amber-600 transition-colors"
          >
            {tr.hero.cta}
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center h-14 px-10 border border-stone-500 text-stone-200 text-sm font-medium rounded-sm hover:border-stone-300 hover:text-white transition-colors"
          >
            {tr.hero.howItWorks}
          </a>
        </div>
      </div>
    </section>
  );
}
