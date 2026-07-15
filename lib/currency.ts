"use client";

import { createContext, useCallback, useContext } from "react";

/**
 * Lightweight currency layer. Tour prices are stored as USD numbers in
 * lib/tours.ts; this converts + formats them for display. Default is EUR
 * because the audience is primarily European (FR/ES/DE/IT locales).
 *
 * Rates are hardcoded relative to USD (the base the tour data is stored in).
 * There is no live FX call — REVIEW THESE RATES QUARTERLY.
 *
 * Caveat: only the numeric `price`/`priceMax`/`depositAmount` fields convert.
 * Dollar amounts baked into tour prose / SEO strings stay in USD.
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

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number) => string;
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null);

/** Read the active currency + a bound formatter. Safe to call outside a provider
 *  (falls back to the default) so components never crash in isolation. */
export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  const fallbackFormat = useCallback((usd: number) => formatPrice(usd, DEFAULT_CURRENCY), []);
  if (ctx) return ctx;
  return { currency: DEFAULT_CURRENCY, setCurrency: () => {}, format: fallbackFormat };
}
