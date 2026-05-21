const countries = [
  {
    name: "Panama",
    flag: "🇵🇦",
    tagline: "Cloud forest, coffee highlands, Caribbean archipelago",
    highlight: "Best 7–10 day circuit in Central America",
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    tagline: "Medellín, coffee country, Caribbean coast, Amazon",
    highlight: "The most underrated food scene in Latin America",
  },
  {
    name: "Ecuador",
    flag: "🇪🇨",
    tagline: "Galápagos, highlands haciendas, Amazon lodges",
    highlight: "Three ecosystems within a day of each other",
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    tagline: "Amazon, Pantanal wildlife, Rio, Bahia coast",
    highlight: "The Pantanal in dry season — nowhere compares",
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    tagline: "Buenos Aires, wine country, Patagonia",
    highlight: "Fitz Roy and the wine valley in the same trip",
  },
  {
    name: "Peru",
    flag: "🇵🇪",
    tagline: "Sacred Valley, Amazon, Lima food scene",
    highlight: "More depth than Machu Picchu alone suggests",
  },
];

export default function Countries() {
  return (
    <section id="countries" className="py-24 px-6 sm:px-12 bg-stone-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 mb-4">
          Where we work
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-16 leading-tight">
          Six countries, each with a distinct logic
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-700">
          {countries.map((c) => (
            <div
              key={c.name}
              className="bg-stone-900 p-8 hover:bg-stone-800 transition-colors"
            >
              <div className="text-4xl mb-4">{c.flag}</div>
              <h3 className="font-serif text-xl text-white mb-2">{c.name}</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                {c.tagline}
              </p>
              <p className="text-amber-500 text-xs font-medium">
                {c.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
