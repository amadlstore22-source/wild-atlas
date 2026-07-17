/**
 * Currency data and formatting — no React, no "use client".
 *
 * This is deliberately separate from lib/currency.ts. That module is marked
 * "use client" because it holds the context/hook, and importing its constants
 * from a Server Component yields undefined at build time (structured data
 * rendered "undefinedNaN" before this split). Anything that both the server and
 * the browser need — rates, symbols, formatting — lives here.
 *
 * Tour prices are stored as USD numbers in lib/tours.ts; these helpers convert
 * and format them for display. Default is EUR because the audience is primarily
 * European (FR/ES/DE/IT locales).
 *
 * Rates are hardcoded relative to USD (the base the tour data is stored in).
 * There is no live FX call — REVIEW THESE RATES QUARTERLY.
 *
 * Caveat: only the numeric price/priceMax/depositAmount fields convert. Dollar
 * amounts baked into tour prose / SEO strings stay in USD.
 */

export type Currency = "EUR" | "USD" | "GBP" | "MAD";

// 1 USD = X units of currency. Review quarterly.
export const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  MAD: 9.9,
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

/** Convert a USD amount to the target currency and format it (rounded to a
 *  clean unit — travel prices don't need cents). */
export function formatPrice(usd: number, currency: Currency): string {
  const converted = usd * RATES[currency];
  const rounded = Math.round(converted);
  const grouped = rounded.toLocaleString("en-US");
  return `${CURRENCY_SYMBOL[currency]}${grouped}`;
}

/** Bare converted number (no symbol), for structured data. Must round exactly
 *  like formatPrice so schema and page never disagree. */
export function priceIn(usd: number, currency: Currency): number {
  return Math.round(usd * RATES[currency]);
}
