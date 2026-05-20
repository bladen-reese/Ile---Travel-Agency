interface Props {
  country: string;
}

export default function FinalCTA({ country }: Props) {
  return (
    <div className="mt-20 py-16 border-t border-stone-100">
      <div className="max-w-2xl">
        <h3 className="font-serif text-3xl text-stone-900 mb-4">
          Want this trip built for real?
        </h3>
        <p className="text-stone-600 leading-relaxed mb-8">
          Our team designs the full itinerary using our network of vetted
          properties and local partners across {country}. You get exclusive
          perks, better rates than booking direct, and someone on the ground if
          anything goes sideways.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://calendly.com/ile-travel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 rounded-sm bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Book a 20-min call
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 rounded-sm border border-stone-300 text-stone-800 text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            Reply by WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
