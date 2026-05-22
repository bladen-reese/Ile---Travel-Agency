"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

export default function HowItWorks() {
  const { tr } = useLang();

  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-4">
          {tr.howItWorks.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-16 leading-tight">
          {tr.howItWorks.heading}
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
          {tr.howItWorks.steps.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-4xl text-stone-200 leading-none block mb-4">
                {step.number}
              </span>
              <h3 className="font-medium text-stone-900 text-lg mb-2">{step.title}</h3>
              <p className="text-stone-500 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
