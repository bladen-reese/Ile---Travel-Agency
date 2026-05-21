import Image from "next/image";
import { stays } from "@/lib/content/stays";

function PhotoPlaceholder({ alt, country }: { alt: string; country: string }) {
  const colors: Record<string, string> = {
    Panama: "bg-emerald-900",
    Colombia: "bg-yellow-900",
    Ecuador: "bg-teal-900",
    Argentina: "bg-violet-900",
    Brazil: "bg-orange-900",
  };
  const bg = colors[country] ?? "bg-stone-800";
  return (
    <div className={`w-full h-full ${bg} flex items-end p-4`}>
      <p className="text-white/40 text-xs leading-tight">{alt}</p>
    </div>
  );
}

export default function ProofOfStay() {
  return (
    <section id="proof" className="py-24 px-6 sm:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-4">
          We&apos;ve been there
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6 leading-tight">
          Recommendations from places we&apos;ve stayed
        </h2>
        <p className="text-stone-500 text-lg leading-relaxed mb-16 max-w-2xl">
          Every property and region in our network is one we&apos;ve visited
          ourselves. These are a few notes from our own trips.
        </p>

        <div className="space-y-16">
          {stays.map((stay, i) => (
            <div
              key={i}
              className={`grid sm:grid-cols-2 gap-10 items-start ${
                i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Photo */}
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-stone-100 relative">
                {stay.photo !== "/photos/placeholder.jpg" ? (
                  <Image
                    src={stay.photo}
                    alt={stay.photoAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ) : (
                  <PhotoPlaceholder alt={stay.photoAlt} country={stay.country} />
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-stone-700 text-xs font-medium px-3 py-1 rounded-full">
                    {stay.country}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-2">
                  {stay.region} · {stay.month}
                </p>
                <h3 className="font-serif text-2xl text-stone-900 mb-1">
                  {stay.stayType}
                </h3>
                <p className="text-stone-600 leading-relaxed mt-4 mb-6">
                  {stay.note}
                </p>
                <div className="border-l-2 border-amber-400 pl-4">
                  <p className="text-stone-700 italic text-sm">
                    &ldquo;{stay.standout}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-stone-100 text-center">
          <p className="text-stone-500 mb-2">
            These are representative — we have notes on many more properties
            across all six countries.
          </p>
          <p className="text-stone-400 text-sm">
            All recommendations are from personal stays, not commissions or
            complimentary visits.
          </p>
        </div>
      </div>
    </section>
  );
}
