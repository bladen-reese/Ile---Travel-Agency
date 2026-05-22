"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { tr, lang, toggleLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-stone-100 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full px-6 sm:px-10 flex items-center justify-between">
        {/* Logo + brand — hard left, 3× size */}
        <Link href="/" className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 shadow-md">
            <Image
              src="/logo.png"
              alt="Yaguaréte Travels"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-serif font-medium tracking-[0.18em] uppercase transition-colors text-2xl ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            Yaguaréte Travels
          </span>
        </Link>

        {/* Nav links + lang toggle — hard right */}
        <div className="flex items-center gap-6">
          <a
            href="#proof"
            className={`text-sm hidden sm:block transition-colors ${
              scrolled
                ? "text-stone-500 hover:text-stone-800"
                : "text-stone-300 hover:text-white"
            }`}
          >
            {tr.nav.ourStays}
          </a>
          <a
            href="#trip-styles"
            className={`text-sm hidden sm:block transition-colors ${
              scrolled
                ? "text-stone-500 hover:text-stone-800"
                : "text-stone-300 hover:text-white"
            }`}
          >
            {tr.nav.tripStyles}
          </a>
          <Link
            href="/trip-builder"
            className={`text-sm font-medium px-5 py-2 rounded-sm transition-colors ${
              scrolled
                ? "bg-stone-900 text-white hover:bg-stone-700"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
          >
            {tr.nav.planATrip}
          </Link>
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className={`text-sm font-medium px-3 py-2 rounded-sm border transition-colors ${
              scrolled
                ? "border-stone-300 text-stone-600 hover:bg-stone-100"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
