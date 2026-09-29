"use client";

import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";
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
 * The saved currency, read through useSyncExternalStore — the same pattern as
 * CookieBanner.
 *
 * THE INCIDENT: this used to be `useState(() => readCookie(...))`. Pages are
 * prerendered in EUR, so for any visitor who had picked USD, GBP or MAD the
 * first client render disagreed with the HTML, React threw hydration error
 * #418 and recovered by discarding the whole server-rendered page and
 * rebuilding it in the browser (measured 2026-09-29: 40 of 40 sampled nodes
 * replaced, footer included; 0 for EUR visitors). Every non-euro visitor paid
 * for a second full render, recreated images, and lost anything typed before
 * hydration.
 *
 * The server snapshot (EUR) is what React uses while hydrating, so hydration
 * matches the HTML; React then re-renders with the cookie's value. Only the
 * price text changes. The HTML still shows EUR until the script loads, exactly
 * as before — that part is inherent to a prerendered page.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function savedCurrency(): Currency {
  const stored = readCookie(CURRENCY_COOKIE);
  return isCurrency(stored) ? stored : DEFAULT_CURRENCY;
}

const serverCurrency = (): Currency => DEFAULT_CURRENCY;

/**
 * Provides the active display currency to the tree. Persists the choice in a
 * cookie (1 year) so it survives navigation and reloads.
 */
export default function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, savedCurrency, serverCurrency);

  const setCurrency = useCallback((c: Currency) => {
    document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=31536000; samesite=lax`;
    listeners.forEach((l) => l());
  }, []);

  const format = useCallback((eur: number) => formatPrice(eur, currency), [currency]);
  const value = useMemo(() => ({ currency, setCurrency, format }), [currency, setCurrency, format]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
