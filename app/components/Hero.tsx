import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end pb-20 px-6 sm:px-12 overflow-hidden bg-stone-900">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #78350f 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #1c1917 0%, transparent 50%)`,
        }}
      />

      {/* Country strip */}
      <div className="absolute top-0 left-0 right-0 flex overflow-hidden opacity-10 pointer-events-none select-none">
        {["PANAMA", "COLOMBIA", "ECUADOR", "BRAZIL", "ARGENTINA", "PERU"].map((c) => (
          <span
            key={c}
            className="font-serif text-[11vw] text-white whitespace-nowrap mr-20 leading-none"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="relative max-w-4xl">
        <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-6">
          Latin America · Concierge Travel
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl text-white leading-[1.05] mb-8">
          Yaguarete<br />Travels
        </h1>
        <p className="text-stone-300 text-xl sm:text-2xl font-light leading-relaxed max-w-xl mb-12">
          We design trips across South and Central America using places
          we&apos;ve actually stayed, guides we trust, and timing that makes
          the difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/trip-builder"
            className="inline-flex items-center justify-center h-14 px-10 bg-amber-700 text-white text-sm font-medium rounded-sm hover:bg-amber-600 transition-colors"
          >
            Build your trip →
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center h-14 px-10 border border-stone-500 text-stone-200 text-sm font-medium rounded-sm hover:border-stone-300 hover:text-white transition-colors"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
