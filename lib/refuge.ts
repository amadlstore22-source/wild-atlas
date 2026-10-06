import type { Tour } from "@/lib/tours";

/**
 * Toubkal Refuge availability.
 *
 * Owner, 2026-10-06: the refuge (Toubkal "base camp") is fully booked for the
 * rest of 2026. A trek that sleeps there can only be sold for 2027 dates. For
 * the 2-day and 4-day summit treks there is one exception, offered as an OPTION
 * in their booking form rather than as a tour of its own (the owner's call):
 * climbing the summit in one day from Imlil, which is very demanding physically.
 *
 * While REFUGE_FULL_UNTIL has not passed:
 *   - every refuge trek page shows components/tours/RefugeNotice.tsx;
 *   - its booking date picker starts at REFUGE_FIRST_OPEN_DATE, unless the
 *     visitor ticks the one-day option (ONE_DAY_OPTION_TREKS only).
 * Both switch off by themselves after that date (at the next build for the
 * statically generated notice; in the browser for the form). If the refuge
 * frees up earlier, or stays full longer, change the two dates here.
 *
 * CLIENT-SAFE ON PURPOSE. BookingSidebar (a client component) imports this
 * file. A first version looked treks up in TOURS here, which pulled the whole
 * catalogue — every description, brief and FAQ, ~240 KB of JavaScript — into
 * the bundle of every page on the site. So: type imports only, the refuge
 * treks as a plain list (kept honest by __tests__/lib/refuge.test.ts), and the
 * one-day prices handed to the sidebar by the server page.
 */
export const REFUGE_FULL_UNTIL = "2026-12-31";
export const REFUGE_FIRST_OPEN_DATE = "2027-01-01";

/** Treks that sleep at the refuge: every tour whose English `stay` says "refuge". */
export const REFUGE_TREKS = [
  "toubkal-summit-trek-4day",
  "toubkal-circuit-ifni-lake-6day",
  "toubkal-summit-2day-marrakech",
  "toubkal-aguelzim-pass-3day",
  "toubkal-three-peaks-4000m-3day",
  "high-atlas-grand-traverse-15day",
  "toubkal-summit-sahara-5day",
  "morocco-highlights-toubkal-sahara-8day",
];

/** Treks whose booking form offers the one-day summit while the refuge is full. */
export const ONE_DAY_OPTION_TREKS = ["toubkal-summit-2day-marrakech", "toubkal-summit-trek-4day"];

/** The one-day summit is priced as the 2-day trek (owner, 2026-10-06), whichever trek it is booked from. */
export const ONE_DAY_PRICE_FROM = "toubkal-summit-2day-marrakech";

export type OneDayPrices = Pick<Tour, "price" | "priceMax" | "groupPricing" | "minPeople" | "depositAmount">;

export function sleepsAtRefuge(slug: string): boolean {
  return REFUGE_TREKS.includes(slug);
}

export function refugeFull(now: Date = new Date()): boolean {
  return now.toISOString().slice(0, 10) <= REFUGE_FULL_UNTIL;
}

export function offersOneDay(slug: string): boolean {
  return ONE_DAY_OPTION_TREKS.includes(slug) && sleepsAtRefuge(slug);
}

/** The price fields of ONE_DAY_PRICE_FROM, for the server page to pass to the sidebar. */
export function oneDayPricesFrom(src: Tour): OneDayPrices {
  return { price: src.price, priceMax: src.priceMax, groupPricing: src.groupPricing, minPeople: src.minPeople, depositAmount: src.depositAmount };
}

/** The trek with its prices swapped for the one-day summit's; name, photos and the rest unchanged. */
export function oneDayPricing(t: Tour, prices: OneDayPrices | undefined): Tour {
  return prices ? { ...t, ...prices, fixedDeparture: undefined } : t;
}
