"use client";
import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * Three components each hand-rolled this with `useEffect(() => setState(
 * mq.matches))`, which React 19 flags as a cascading render: the first client
 * render always reported `false`, then a second render corrected it. On the
 * Hero that meant the parallax initialised as if on mobile before switching.
 *
 * matchMedia is an external store, so useSyncExternalStore is the right tool —
 * it reads the real value during the first client render and re-renders only
 * when the query actually changes.
 *
 * The server snapshot is always `false`: the server has no viewport, and the
 * conservative answer (no desktop parallax, no desktop-only chrome) is the one
 * that renders correctly everywhere and matches the mobile-first CSS.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Desktop viewport where the visitor has not asked for reduced motion. */
export const DESKTOP_MOTION_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
