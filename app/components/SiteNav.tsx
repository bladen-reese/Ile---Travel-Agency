"use client";

import Link from "next/link";
import Image from "next/image";
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
          ? "bg-white/95 backdrop-blur-sm border-b border-stone-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo + brand name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/20">
            <Image
              src="/logo.png"
              alt="Yaguarete Travels jaguar logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-serif text-sm font-medium tracking-[0.12em] uppercase transition-colors ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            Yaguaré<span className="tracking-[0.12em]">te</span> Travels
          </span>
        </Link>

        {/* Nav links */}
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
