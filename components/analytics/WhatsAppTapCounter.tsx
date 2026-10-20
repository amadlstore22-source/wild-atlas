"use client";

import { useEffect } from "react";
import { isWaButton, type WaButton } from "@/lib/whatsapp-taps";

/**
 * Counts every tap on a WhatsApp link, anywhere on the site, without a cookie
 * (see lib/whatsapp-taps.ts). One listener on the document instead of an
 * onClick on each button: there are WhatsApp links in a dozen components, many
 * of them server components, and a new one is counted without anyone having to
 * remember to wire it up.
 */
export default function WhatsAppTapCounter() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]');
      if (!a) return;
      const set = (a as HTMLElement).dataset.wa;
      const button: WaButton = isWaButton(set)
        ? set
        : a.closest("footer") ? "footer" : a.closest("header") ? "header" : "page";
      const lang = document.documentElement.lang;
      try {
        // sendBeacon survives the tab switch this click starts; fetch may not.
        const data = new Blob([JSON.stringify({ lang, path: location.pathname, button })], { type: "application/json" });
        navigator.sendBeacon?.("/api/wa-tap", data);
      } catch {
        // Counting must never get in the way of the click.
      }
    };
    // Capture phase, so a handler that stops propagation cannot hide the tap.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
