"use client";

import { useLang } from "@/lib/i18n/LanguageContext";

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
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              {tr.footer.tagline}
            </p>
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
                  <a href="https://wa.me/1234567890" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@yaguaretetravels.com" className="hover:text-white transition-colors">
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
