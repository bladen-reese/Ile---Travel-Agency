"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-stone-100 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-xl tracking-tight transition-colors ${
            scrolled ? "text-stone-900" : "text-white"
          }`}
        >
          Yaguarete Travels
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#proof"
            className={`text-sm hidden sm:block transition-colors ${
              scrolled
                ? "text-stone-500 hover:text-stone-800"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Our stays
          </a>
          <a
            href="#trip-styles"
            className={`text-sm hidden sm:block transition-colors ${
              scrolled
                ? "text-stone-500 hover:text-stone-800"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Trip styles
          </a>
          <Link
            href="/trip-builder"
            className={`text-sm font-medium px-5 py-2 rounded-sm transition-colors ${
              scrolled
                ? "bg-stone-900 text-white hover:bg-stone-700"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
          >
            Plan a trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
