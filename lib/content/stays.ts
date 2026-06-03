// Replace placeholder values with your own content.
// Photos go in /public/photos/ — reference them as "/photos/filename.jpg"

export interface StayEntry {
  country: string;
  region: string;
  stayType: string;
  photo: string;          // path under /public, e.g. "/photos/boquete-lodge.jpg"
  photoAlt: string;
  note: string;           // 2-4 sentences in your own voice
  month: string;          // e.g. "March 2024"
  standout: string;       // one short line — the thing you still think about
}

export const stays: StayEntry[] = [
  {
    country: "Colombia",
    region: "Casa Isabel, Cartagena",
    stayType: "Coffee finca, Alto Quiel area",
    photo: "/photos/styles/DJI_0662.jpg",
    photoAlt: "Casa Isabel, Cartagena",
    note:
      "We arrived in the late afternoon when the cloud forest was still dripping from the morning rain. The owners walked us through the drying beds and explained why altitude and shade matter more than any marketing claim. Breakfast the next morning — eggs from their own chickens, toast with their own coffee — was one of the better meals of the trip.",
    month: "February 2024",
    standout: "The silence at 5am before the birds start.",
  },
  {
    country: "Peru",
    region: "Villa Del Sol, Mancora",
    stayType: "Working coffee hacienda, outside Salento",
    photo: "/photos/styles/DJI_0272.jpg",
    photoAlt: "Villa Del Sol, Mancora",
    note:
      "Four nights was the right amount — two felt rushed when we tried it on an earlier trip. The hacienda has been in the same family for three generations and they have strong opinions about which varietals are worth the effort. We walked Cocora Valley on day two; the wax palms look exactly like the photos and somehow still manage to surprise you.",
    month: "October 2023",
    standout: "Cupping session at 7am, still in jackets.",
  },
  {
    country: "Ecuador",
    region: "Natur Hotel, Cuenca",
    stayType: "River-access eco-lodge, Kichwa community",
    photo: "/photos/styles/DJI_0629.jpeg",
    photoAlt: "Natur Hotel, Cuenca",
    note:
      "The boat ride in is part of the experience — you pass fishing communities and the light changes every ten minutes. The lodge itself is simple but the guiding is exceptional; our guide identified 40-something bird species before 8am on the first morning. At night the forest is completely different: frogs, insects, the occasional caiman eye catching your headlamp across the water.",
    month: "July 2023",
    standout: "A kinkajou in the canopy, 11pm, no one else awake.",
  },
  {
    country: "Argentina",
    region: "Mendoza, Uco Valley",
    stayType: "Boutique wine lodge, Luján de Cuyo",
    photo: "/photos/placeholder.jpg",
    photoAlt: "Malbec vines with the Andes behind, late afternoon",
    note:
      "March is harvest and the bodegas are actually working — you smell fermentation when you walk in. We visited three producers in two days, one very small family operation that doesn't export and two mid-size ones. The difference in what they're trying to do is stark. The lodge we stayed at has views of the Andes from the pool; the mountains look painted-on until a cloud moves and proves they're real.",
    month: "March 2024",
    standout: "Asado at the bodega, eating with the harvest crew.",
  },
  {
    country: "Brazil",
    region: "Pantanal, southern sector",
    stayType: "Fazenda lodge on the Transpantaneira",
    photo: "/photos/placeholder.jpg",
    photoAlt: "Jaguar on a riverbank, Cuiabá River",
    note:
      "We saw seven jaguars in four days. I know how that sounds. The Pantanal in August is dry enough that the cats concentrate near the river and the boat drivers know the territory well. It's not a zoo — you wait, you move, you wait again — but the density of wildlife here is unlike anywhere else we've been in South America. The caiman are so numerous you stop counting them by day two.",
    month: "August 2023",
    standout: "A jaguar swimming across the river, completely unhurried.",
  },
  {
    country: "Colombia",
    region: "Tayrona, Caribbean coast",
    stayType: "Eco-camp within the national park",
    photo: "/photos/placeholder.jpg",
    photoAlt: "Cabo San Juan beach through palm trees, Tayrona",
    note:
      "You hike in — there are no roads — and the walk through the jungle before you reach the beach sets the tone. The eco-camp is basic by design; the park doesn't allow anything more permanent. What makes it is the light in the morning before the beach fills up, and the howler monkeys that treat your tent as an interesting obstacle on their route. Book this one months ahead.",
    month: "January 2024",
    standout: "Waking up to howler monkeys at 5:30am.",
  },
];

export interface TripStyle {
  id: string;
  label: string;
  emoji: string;
  headline: string;
  description: string;
  typicalShape: string;   // what the itinerary looks like in practice
  budgetNote: string;
  bestFor: string;
}

export const tripStyles: TripStyle[] = [
  {
    id: "nature",
    label: "Nature & wildlife",
    emoji: "🦜",
    headline: "Built around what the wildlife calendar says",
    description:
      "Jaguar season in the Pantanal, whale season in Patagonia, turtle nesting on the Pacific coast — these trips are planned around windows, not convenience. The itinerary is slower and more patient than most.",
    typicalShape: "3–5 nights per location, one or two remote lodges that require small planes or long boat rides",
    budgetNote: "Mid to upper-mid. Remote lodges cost more to run.",
    bestFor: "Couples and families who are genuinely interested, not just ticking a box",
  },
  {
    id: "culture",
    label: "Culture & history",
    emoji: "🏛️",
    headline: "Colonial cities, pre-Columbian sites, living traditions",
    description:
      "Latin America's cultural depth is underrated. These trips are built around people who want to understand what they're looking at — a local historian in Cartagena, a textile cooperative in the Andes, an Afro-Brazilian music session in Salvador.",
    typicalShape: "More urban, 3–4 cities, with day trips to surrounding ruins or towns",
    budgetNote: "Most accessible price point — cities have a wide range of good mid-range accommodation.",
    bestFor: "Intellectually curious travelers; families with older kids or teens",
  },
  {
    id: "adventure",
    label: "Adventure & hiking",
    emoji: "⛰️",
    headline: "Multi-day treks, altitude, and real physical challenge",
    description:
      "Lost City in Colombia, Fitz Roy in Patagonia, Cotopaxi in Ecuador — these trips are built for people who are comfortable with physical effort and uncertainty. Weather windows, trail conditions, and acclimatization schedules shape everything.",
    typicalShape: "Longer stays in fewer places; one or two anchor expeditions with recovery days built in",
    budgetNote: "Varies — some of the best trekking is in national parks with basic infrastructure.",
    bestFor: "Solo travelers, couples, friend groups with shared fitness baseline",
  },
  {
    id: "food",
    label: "Food & coffee",
    emoji: "☕",
    headline: "Origin experiences, market circuits, regional cooking",
    description:
      "Colombia's coffee triangle, Peru's ceviche circuit, Argentina's wine country — these trips take food seriously without being pretentious about it. The goal is eating with context: understanding where something comes from and why it tastes the way it does.",
    typicalShape: "Concentrated in 2–3 regions with strong food identity; some cooking classes, some market mornings",
    budgetNote: "Mid-range. Good food experiences aren't necessarily expensive here.",
    bestFor: "Couples, small groups; pairs well with culture trips",
  },
  {
    id: "beaches",
    label: "Beaches & islands",
    emoji: "🏝️",
    headline: "Caribbean, Pacific, and freshwater beaches — very different things",
    description:
      "Bocas del Toro, the Rosario Islands, the Galápagos — each is a distinct experience with different expectations around development, crowds, and what the water actually looks like. These trips work best when they're combined with something inland.",
    typicalShape: "Usually 3–4 nights at the coast after a city or highlands section",
    budgetNote: "Overwater accommodation and island transfers push costs up; we know which ones are worth it.",
    bestFor: "Families, couples; often a reward leg at the end of a longer trip",
  },
  {
    id: "slow",
    label: "Slow travel",
    emoji: "🌿",
    headline: "Fewer places, more time, actual rest",
    description:
      "Most people try to cover too much. A slow trip might mean two weeks in the Colombian coffee region plus one city, or a hacienda in Ecuador's highlands for most of a trip. You leave knowing the place instead of having seen it.",
    typicalShape: "2–3 locations maximum; longer stays; built-in unscheduled time",
    budgetNote: "Often ends up costing less because you're not moving constantly.",
    bestFor: "Anyone who's been to Latin America before; remote workers; people recovering from burnout",
  },
];
