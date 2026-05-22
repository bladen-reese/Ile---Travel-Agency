"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function SiteNav() {
  const [pastHero, setPastHero] = useState(false);
  const { tr, lang, toggleLang } = useLang();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    // Use the nav's actual rendered height so the trigger fires the instant
    // the nav's bottom edge touches the first white pixel below the hero.
    const navHeight = navRef.current?.offsetHeight ?? 128;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0, rootMargin: `-${navHeight}px 0px 0px 0px` }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        pastHero ? "bg-black py-2" : "bg-white py-2 shadow-sm"
      }`}
    >
      <div className="w-full px-6 sm:px-10 flex items-center justify-between">
        {/* Logo + brand — hard left */}
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
          <span className={`font-serif font-medium tracking-[0.18em] uppercase transition-colors text-2xl ${pastHero ? "text-white" : "text-stone-900"}`}>
            Yaguaréte Travels
          </span>
        </Link>

        {/* Nav links + lang toggle — hard right */}
        <div className="flex items-center gap-6">
          <a
            href="#proof"
            className={`text-sm hidden sm:block transition-colors ${pastHero ? "text-stone-300 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
          >
            {tr.nav.ourStays}
          </a>
          <a
            href="#trip-styles"
            className={`text-sm hidden sm:block transition-colors ${pastHero ? "text-stone-300 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
          >
            {tr.nav.tripStyles}
          </a>
          <Link
            href="/trip-builder"
            className={`text-sm font-medium px-5 py-2 rounded-sm border transition-colors ${pastHero ? "border-white/30 text-white bg-white/10 hover:bg-white/20" : "border-stone-300 text-stone-700 hover:bg-stone-100"}`}
          >
            {tr.nav.planATrip}
          </Link>
          <button
            onClick={toggleLang}
            className={`text-sm font-medium px-3 py-2 rounded-sm border transition-colors ${pastHero ? "border-white/30 text-white hover:bg-white/10" : "border-stone-300 text-stone-700 hover:bg-stone-100"}`}
            aria-label="Toggle language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
