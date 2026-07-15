"use client";

import { useCallback, useState, type ReactNode } from "react";
import {
  CurrencyContext,
  DEFAULT_CURRENCY,
  CURRENCY_COOKIE,
  formatPrice,
  isCurrency,
  type Currency,
} from "@/lib/currency";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Provides the active display currency to the tree. Persists the choice in a
 * cookie (1 year) so it survives navigation and reloads. Initialised lazily from
 * the cookie to avoid a flash of the wrong currency on the client.
 */
export default function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = readCookie(CURRENCY_COOKIE);
    return isCurrency(stored) ? stored : DEFAULT_CURRENCY;
  });

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const format = useCallback((usd: number) => formatPrice(usd, currency), [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}
