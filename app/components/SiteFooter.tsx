"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

const SOCIALS = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@yaguaretetravels",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@yaguaretetravels",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:yaguaretetravels@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const { tr } = useLang();

  return (
    <footer className="bg-stone-950 py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          <div>
            <p className="font-serif text-xl text-white mb-2 tracking-wide uppercase">
              Yaguaréte Travels
            </p>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed mb-6">
              {tr.footer.tagline}
            </p>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-stone-500 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-600 mb-4">
                {tr.footer.countries}
              </p>
              <ul className="space-y-2 text-stone-400 text-sm">
                {tr.countries.items.map((c) => (
                  <li key={c.name}>{c.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-600 mb-4">
                {tr.footer.contact}
              </p>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>
                  <a href="https://wa.me/5491137811199" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:yaguaretetravels@gmail.com" className="hover:text-white transition-colors">
                    {tr.footer.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Yaguaréte Travels. {tr.footer.rights}
          </p>
          <p className="text-stone-700 text-xs italic">{tr.footer.guarani}</p>
        </div>
      </div>
    </footer>
  );
}

