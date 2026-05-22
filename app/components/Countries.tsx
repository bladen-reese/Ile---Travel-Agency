"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

export default function Countries() {
  const { tr } = useLang();

  return (
    <section id="countries" className="py-24 px-6 sm:px-12 bg-stone-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 mb-4">
          {tr.countries.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-16 leading-tight">
          {tr.countries.heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-700">
          {tr.countries.items.map((c) => (
            <div key={c.name} className="bg-stone-900 p-8 hover:bg-stone-800 transition-colors">
              <div className="text-4xl mb-4">{c.flag}</div>
              <h3 className="font-serif text-xl text-white mb-2">{c.name}</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">{c.tagline}</p>
              <p className="text-amber-500 text-xs font-medium">{c.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
