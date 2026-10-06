import { TOURS } from "@/lib/tours";

/**
 * Toubkal Refuge availability.
 *
 * Owner, 2026-10-06: the refuge (Toubkal "base camp") is fully booked for the
 * rest of 2026, so a trek that sleeps there can only be sold for 2027 dates,
 * and the only way to the summit this year is the one-day climb from Imlil
 * (toubkal-summit-1day). While REFUGE_FULL_UNTIL has not passed:
 *   - every refuge trek page shows components/tours/RefugeNotice.tsx;
 *   - its booking date picker starts at REFUGE_FIRST_OPEN_DATE.
 * Both switch off by themselves after that date (at the next build for the
 * statically generated notice; in the browser for the date picker). If the
 * refuge frees up earlier, or stays full longer, change the two dates here.
 */
export const REFUGE_FULL_UNTIL = "2026-12-31";
export const REFUGE_FIRST_OPEN_DATE = "2027-01-01";
export const ONE_DAY_TOUBKAL = "toubkal-summit-1day";

/** Decided on the English record: translated `stay` values say "refuge" in five languages. */
export function sleepsAtRefuge(slug: string): boolean {
  const t = TOURS.find((x) => x.slug === slug);
  return !!t?.itinerary.some((d) => /refuge/i.test(d.stay ?? ""));
}

export function refugeFull(now: Date = new Date()): boolean {
  return now.toISOString().slice(0, 10) <= REFUGE_FULL_UNTIL;
}
