const steps = [
  {
    number: "01",
    title: "Tell us what you're after",
    body: "Country, duration, who's going, rough budget, what kind of trip pulls you. Six questions. Our builder maps a route.",
  },
  {
    number: "02",
    title: "We send you a trip skeleton",
    body: "Not a generic PDF — a real regional breakdown with the logical sequence, the timing trade-offs, and the things most people get wrong. Built from our own experience in each place.",
  },
  {
    number: "03",
    title: "We build the full thing together",
    body: "A 20-minute call. We refine based on your priorities, lock in accommodation from our network of vetted properties, and handle the logistics so you don't have to.",
  },
  {
    number: "04",
    title: "You travel with us in your pocket",
    body: "Confirmed bookings, a pre-departure briefing, and a local contact in each region. If something goes sideways, we fix it.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-4">
          The process
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-16 leading-tight">
          How a trip comes together
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-4xl text-stone-200 leading-none block mb-4">
                {step.number}
              </span>
              <h3 className="font-medium text-stone-900 text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-stone-500 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
