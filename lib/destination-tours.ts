import { TOURS, type Tour } from "./tours";
import type { Destination } from "./destinations";

/**
 * Which tours a destination page lists, and in what order.
 *
 * It used to be "any tour in a related category, or starting from a related
 * origin", then the first six in catalogue order. The Essaouira page therefore
 * listed Agafay, Ourika and Ouzoud, and neither of the two trips that actually
 * go to Essaouira; the Agadir page led with Marrakech day trips and left out
 * the Agadir-Essaouira trip (found 2026-10-07). Wrong for the visitor, and
 * the strongest internal link a tour can get went to the wrong pages.
 *
 * Now each tour is scored: it goes to the place (3), it starts from a related
 * origin (2), it is in a related category (1). Highest first, catalogue order
 * breaking ties. Matching reads the ENGLISH record (slug, title, itinerary
 * stops), so every locale ranks the same tours.
 */
const VISITS: Record<string, RegExp> = {
  marrakech: /\bmarrakech\b/i,
  "high-atlas": /\b(toubkal|imlil|high atlas|azzaden|mgoun|m'goun)\b/i,
  sahara: /\b(sahara|merzouga|erg chebbi|chegaga|zagora)\b/i,
  fes: /\b(fes|fès|fez)\b/i,
  chefchaouen: /\bchefchaouen\b/i,
  agadir: /\bagadir\b/i,
  ouzoud: /\bouzoud\b/i,
  essaouira: /\bessaouira\b/i,
};

function visits(tour: Tour, dest: string): boolean {
  const re = VISITS[dest];
  if (!re) return false;
  const text = [
    tour.slug.replace(/-/g, " "),
    tour.title,
    ...(tour.itinerary ?? []).map((d) => d.stop?.name ?? ""),
  ].join(" | ");
  return re.test(text);
}

export function scoreTourForDestination(tour: Tour, destination: Destination): number {
  const base = TOURS.find((t) => t.slug === tour.slug) ?? tour;
  return (
    (visits(base, destination.slug) ? 3 : 0) +
    (destination.relatedOrigins.includes(base.origin) ? 2 : 0) +
    (destination.relatedCategories.includes(base.category) ? 1 : 0)
  );
}

/** The tours for a destination page, best match first. `tours` is the locale's list. */
export function toursForDestination(tours: Tour[], destination: Destination, limit = 6): Tour[] {
  return tours
    .map((tour, i) => ({ tour, i, score: scoreTourForDestination(tour, destination) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.tour);
}
