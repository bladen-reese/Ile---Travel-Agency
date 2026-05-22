"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function BottomCTA() {
  const { tr } = useLang();

  return (
    <section className="py-28 px-6 sm:px-12 bg-amber-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6 leading-tight">
          {tr.cta.heading}
        </h2>
        <p className="text-amber-200 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          {tr.cta.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/trip-builder"
            className="inline-flex items-center justify-center h-14 px-10 bg-white text-amber-900 text-sm font-medium rounded-sm hover:bg-amber-50 transition-colors"
          >
            {tr.cta.primary}
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 border border-amber-600 text-white text-sm font-medium rounded-sm hover:border-amber-400 transition-colors"
          >
            {tr.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
