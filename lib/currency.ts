"use client";

import { createContext, useCallback, useContext } from "react";
import { DEFAULT_CURRENCY, formatPrice, type Currency } from "@/lib/currency-core";

/**
 * Client-side currency context. The data and formatting live in
 * lib/currency-core.ts (no "use client") so Server Components can use them too
 * — importing constants from a "use client" module gives undefined on the
 * server, which is how structured data ended up rendering "undefinedNaN".
 *
 * Everything from currency-core is re-exported here so existing
 * `from "@/lib/currency"` imports keep working unchanged.
 */
export {
  RATES,
  CURRENCY_SYMBOL,
  CURRENCIES,
  DEFAULT_CURRENCY,
  CURRENCY_COOKIE,
  isCurrency,
  formatPrice,
  priceIn,
  type Currency,
} from "@/lib/currency-core";

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
