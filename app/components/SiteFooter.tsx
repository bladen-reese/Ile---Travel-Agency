export default function SiteFooter() {
  return (
    <footer className="bg-stone-950 py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          <div>
            <p className="font-serif text-xl text-white mb-2">
              Yaguarete Travels
            </p>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Latin America travel design. We&apos;ve been there. We can help
              you get there too.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-600 mb-4">
                Countries
              </p>
              <ul className="space-y-2 text-stone-400 text-sm">
                {["Panama", "Colombia", "Ecuador", "Brazil", "Argentina", "Peru"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-600 mb-4">
                Contact
              </p>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>
                  <a
                    href="https://wa.me/1234567890"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@yaguaretetravels.com"
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Yaguarete Travels. All recommendations
            from personal experience.
          </p>
          <p className="text-stone-700 text-xs italic">
            Yaguarete — jaguar in Guaraní
          </p>
        </div>
      </div>
    </footer>
  );
}
