import type { Locale } from "@/app/[lang]/dictionaries";
import { TOURS, lowestGroupPrice, type Tour } from "./tours";
import { toursFor } from "./tours-i18n";

export interface MapTour {
  href: string;
  title: string;
  duration: string;
  priceEur: number;
  /** Group size the price needs; 1 means it is the solo rate. */
  minPeople: number;
}

/**
 * Which tours go to each place on the homepage map (components/map/ToursMap.tsx),
 * keyed by the place's id there.
 *
 * Matched against the ENGLISH record so every locale lists the same tours:
 * a tour whose slug or title names the place ranks first, then one that only
 * stops there. Catalogue order breaks ties.
 *
 * Why the panels list tours at all: a Clarity recording (2026-10-13) showed a
 * visitor open three places over three minutes and leave without seeing a
 * single tour. The first version ranked by the destination pages' score, where
 * 3 also means "starts nearby, same category", and listed the Marrakech medina
 * tour under Chefchaouen; matching on the place itself does not.
 */
export const MAP_PLACE_MATCH: Record<string, RegExp> = {
  // The city itself: its walking tours, not every trip that starts there.
  marrakech: /\bmarrakech (medina|food)\b/i,
  toubkal: /\b(toubkal|imlil)\b/i,
  sahara: /\b(merzouga|erg chebbi)\b/i,
  fes: /\b(fes|fès|fez)\b/i,
  chefchaouen: /\bchefchaouen\b/i,
  agadir: /\b(agadir|taghazout|paradise valley)\b/i,
  ouzoud: /\bouzoud\b/i,
  essaouira: /\bessaouira\b/i,
  "ait-ben-haddou": /\ba[iï]t[ -]?ben[ -]?haddou\b/i,
  dades: /\bdad[eè]s\b/i,
  todra: /\b(todra|todgha)\b/i,
  zagora: /\b(zagora|draa|drâa)\b/i,
  chegaga: /\bchegaga\b/i,
  agafay: /\bagafay\b/i,
  ourika: /\bourika\b/i,
  mgoun: /\bm'?goun\b/i,
  tafraoute: /\b(tafraout\w*|anti atlas trekking)\b/i,
  "souss-massa": /\bsouss?[ -]massa\b/i,
  rabat: /\brabat\b/i,
  volubilis: /\b(volubilis|meknes|meknès)\b/i,
};

function score(tour: Tour, re: RegExp): number {
  const base = TOURS.find((t) => t.slug === tour.slug) ?? tour;
  const named = re.test(`${base.slug.replace(/-/g, " ")} | ${base.title}`);
  const stops = re.test((base.itinerary ?? []).flatMap((d) => [d.stop?.name ?? "", d.title ?? ""]).join(" | "));
  return (named ? 2 : 0) + (stops ? 1 : 0);
}

/** Does this tour go to this map place? */
export function goesToPlace(tour: Tour, placeId: string): boolean {
  const re = MAP_PLACE_MATCH[placeId];
  return !!re && score(tour, re) > 0;
}

export function mapToursFor(lang: Locale, limit = 3): Record<string, MapTour[]> {
  const tours = toursFor(lang);
  return Object.fromEntries(
    Object.entries(MAP_PLACE_MATCH).map(([id, re]) => [
      id,
      tours
        .map((t, i) => ({ t, i, s: score(t, re) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s || a.i - b.i)
        .slice(0, limit)
        .map(({ t }) => {
          const { price, minPeople } = lowestGroupPrice(t);
          return {
            href: `/${lang}/tours/${t.localizedSlug ?? t.slug}`,
            title: t.title,
            duration: t.duration,
            priceEur: price,
            minPeople,
          };
        }),
    ]),
  );
}
