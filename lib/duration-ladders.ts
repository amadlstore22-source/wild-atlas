import { TOURS, perPersonPrice } from "@/lib/tours";
import { getTourFor } from "@/lib/tours-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";
import MAPS from "@/lib/route-maps.json";

/**
 * "How many days?" on desert tour pages (components/tours/DurationChooser.tsx).
 *
 * WHY. Copied in spirit from arhhal.com (2026-10-06 teardown), whose journey
 * pages answer "3, 4 or 5 days?" next to the itinerary. It is the question a
 * desert visitor is actually stuck on, and our data answers it plainly: every
 * Merzouga trip spends ONE night at the camp and covers about the same
 * distance (1,100–1,120 km from Marrakech), so extra days do not buy more
 * desert, they spread the same road over more days. The stargazing tour's own
 * brief already sends people to "a 3- or 4-day desert itinerary".
 *
 * A ladder is the set of private trips to the SAME dunes from the SAME city,
 * shortest first. `dunes` is the start of the itinerary stop name for those
 * dunes; it is named here rather than read from the camp night's `stop`,
 * because `stop` is a place passed that day, not where you sleep (the 4-day
 * trip's camp night is marked "Todra Gorge"). Nothing on the block is written
 * by hand: days, driving per day, camp nights and prices come from each
 * tour's English record, distance from lib/route-maps.json (the figure the
 * route map on the same page shows). __tests__/lib/duration-ladders.test.ts
 * keeps the intro sentence true.
 */
export const DURATION_LADDERS: { dunes: string; slugs: string[] }[] = [
  { dunes: "Erg Chebbi", slugs: ["merzouga-stargazing-desert-tour", "sahara-3day-marrakech", "desert-4day-marrakech"] },
  { dunes: "Erg Chebbi", slugs: ["merzouga-3day-agadir", "desert-4day-agadir"] },
];

export interface LadderOption {
  slug: string;
  days: number;
  /** Hours on the road per day, parsed from the English itinerary ("≈8.5 h" -> 8.5). */
  drives: number[];
  campNights: number;
  km: number;
  /** Per-person price in EUR when two travel. */
  perPersonForTwo: number;
}

/** "≈8.5 h" -> 8.5, "8–9 h" -> 9, missing -> 0. */
export function driveHours(s?: string): number {
  const m = s?.match(/(\d+(?:[.,]\d+)?)\s*h/);
  return m ? Number(m[1].replace(",", ".")) : 0;
}

const maps = MAPS as unknown as Record<string, { km: number }>;

export function ladderOf(slug: string) {
  return DURATION_LADDERS.find((l) => l.slugs.includes(slug)) ?? null;
}

/** Index of the itinerary day whose stop is the ladder's dunes, or -1. */
export function dunesDayIndex(slug: string): number {
  const ladder = ladderOf(slug);
  const t = TOURS.find((x) => x.slug === slug);
  if (!ladder || !t) return -1;
  return t.itinerary.findIndex((d) => d.stop?.name.startsWith(ladder.dunes));
}

/** The ladder a tour belongs to, or null. Options come shortest first. */
export function ladderFor(slug: string): LadderOption[] | null {
  const ladder = ladderOf(slug);
  if (!ladder) return null;
  return ladder.slugs.flatMap((s) => {
    const t = TOURS.find((x) => x.slug === s);
    if (!t) return [];
    return [{
      slug: s,
      days: t.itinerary.length,
      drives: t.itinerary.map((d) => driveHours(d.driving)),
      campNights: t.itinerary.filter((d) => d.stay === "Desert camp").length,
      km: maps[s]?.km ?? 0,
      perPersonForTwo: perPersonPrice(t, 2),
    }];
  });
}

/**
 * The dunes' name in a page's language ("Erg Chebbi, Merzouga", "عرق الشبي،
 * مرزوكة") for the intro sentence. Some translated itineraries drop that day's
 * stop (the Arabic 4-day trip did, and its page lost the intro), so this takes
 * the name from any trip in the ladder, preferring one actually translated
 * (the Arabic stargazing itinerary kept the Latin "Erg Chebbi, Merzouga"
 * while the Arabic 3-day one says "عرق الشبي، مرزوكة"), then the English name.
 */
export function dunesPlace(slug: string, lang: Locale): string {
  const ladder = ladderOf(slug);
  if (!ladder) return "";
  const english = TOURS.find((x) => x.slug === slug)?.itinerary[dunesDayIndex(slug)]?.stop?.name ?? "";
  const names: string[] = [];
  for (const s of ladder.slugs) {
    const base = TOURS.find((x) => x.slug === s);
    const local = getTourFor(lang, s);
    const i = dunesDayIndex(s);
    if (base && local && i >= 0 && local.itinerary.length === base.itinerary.length) {
      const name = local.itinerary[i]?.stop?.name;
      if (name) names.push(name);
    }
  }
  return names.find((n) => n !== english) ?? names[0] ?? english;
}
