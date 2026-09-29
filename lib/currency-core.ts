/**
 * Currency data and formatting — no React, no "use client".
 *
 * This is deliberately separate from lib/currency.ts. That module is marked
 * "use client" because it holds the context/hook, and importing its constants
 * from a Server Component yields undefined at build time (structured data
 * rendered "undefinedNaN" before this split). Anything that both the server and
 * the browser need — rates, symbols, formatting — lives here.
 *
 * EUROS ARE THE BASE. Tour prices in lib/tours*.ts are the owner's euro prices,
 * exactly as quoted; every other currency is converted from them and rounded to
 * a whole unit (nearest, .5 up — the owner's choice, 2026-09-29).
 *
 * Until 2026-09-29 the data was stored in USD and converted to EUR at 0.86693,
 * with each USD figure reverse-engineered so it would land on the owner's euro
 * number. That made the euro price a by-product of a dollar one: any rate
 * update moved every euro price, and a total converted in one go could miss
 * per-person × travellers by a euro. The stored numbers were converted once to
 * the euro figure the site was already displaying, so no euro price moved.
 *
 * Rates are fixed, not fetched: the owner updates them on request.
 */

export type Currency = "EUR" | "USD" | "GBP" | "MAD";

// 1 EUR = X units of currency.
//
// Sources, both dated 2026-09-28 (the latest published on 2026-09-29):
//   USD, GBP: European Central Bank euro reference rates, via
//             https://api.frankfurter.dev/v1/latest?base=EUR
//             -> USD 1.1378, GBP 0.85785
//   MAD:      Bank Al-Maghrib "cours de référence",
//             https://www.bkam.ma/Marches/Principaux-indicateurs/Marche-des-changes/Cours-de-change/Cours-de-reference
//             -> 10.9587 MAD per EUR (its 9.6339 per USD gives EUR/USD
//             1.1375, agreeing with the ECB to 0.03%)
//
// To update: replace the three numbers and the date above, then run
// `npx vitest run __tests__/lib/currency.test.ts`.
export const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.1378,
  GBP: 0.85785,
  MAD: 10.9587,
};

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  MAD: "MAD ",
};

export const CURRENCIES: Currency[] = ["EUR", "USD", "GBP", "MAD"];
export const DEFAULT_CURRENCY: Currency = "EUR";
export const CURRENCY_COOKIE = "met_currency";

export function isCurrency(v: string | undefined | null): v is Currency {
  return v === "EUR" || v === "USD" || v === "GBP" || v === "MAD";
}

/** Convert a EUR amount to the target currency and format it as a whole
 *  number — travel prices don't need cents. */
export function formatPrice(eur: number, currency: Currency): string {
  return formatAmount(priceIn(eur, currency), currency);
}

/** Format an amount ALREADY in `currency` (no conversion). */
export function formatAmount(amount: number, currency: Currency): string {
  return `${CURRENCY_SYMBOL[currency]}${Math.round(amount).toLocaleString("en-US")}`;
}

/**
 * A group total that agrees with the per-person price on screen: convert and
 * round the per-person rate FIRST, then multiply. Converting the whole total
 * instead rounds once over the sum, so a page reading "£280 per person"
 * totalled 3 people at £839, not £840 — a sum any visitor can check.
 */
export function formatGroupTotal(eurPerPerson: number, people: number, currency: Currency): string {
  return formatAmount(priceIn(eurPerPerson, currency) * people, currency);
}

/** Bare converted whole number (no symbol), for structured data and payment
 *  links. Must round exactly like formatPrice so schema and page never
 *  disagree. */
export function priceIn(eur: number, currency: Currency): number {
  return Math.round(eur * RATES[currency]);
}
