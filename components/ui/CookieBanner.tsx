"use client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { CONSENT_EVENT } from "@/lib/analytics";

const STORAGE_KEY = "met-cookie-consent";

/**
 * Whether consent has already been stored. Read through useSyncExternalStore
 * rather than an effect: localStorage is an external store, and reading it in
 * an effect meant the first client render always said "no banner", then a
 * second render brought it in — a cascading render React 19 now flags, and a
 * visible flash on slow devices.
 *
 * The server snapshot is `true` (already consented) so the banner is absent
 * from the HTML and appears only once the client confirms it is needed.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function hasConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // localStorage unavailable (private mode, blocked cookies) — treat as
    // consented so we never trap someone behind a banner they cannot dismiss.
    return true;
  }
}

export default function CookieBanner({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const stored = useSyncExternalStore(subscribe, hasConsent, () => true);
  // Set the moment the visitor chooses, so the banner leaves without waiting
  // for a storage event (which does not fire in the tab that wrote the value).
  const [dismissed, setDismissed] = useState(false);

  // Hold the banner back until the page has painted.
  //
  // The banner cannot be server-rendered (it depends on localStorage), so it
  // necessarily appears after hydration. On mobile that made this panel the
  // LARGEST element to paint, and therefore the LCP element — measured at
  // 5.3s with load delay 0, load time 0 and render delay 4,522ms. Nothing was
  // slow; LCP was simply pinned to whenever this mounted. Shortening the copy
  // did not fix it (5.3s, still this element), because size was never the
  // cause: timing was.
  //
  // Two frames of delay puts the mount after the hero has painted, so the
  // hero becomes the LCP element and this stops being measured as content.
  // Nothing about consent changes: analytics still waits for an explicit
  // choice, necessary cookies are always on, and the banner still appears
  // well within the same second. Google's cookie-notice guidance calls this
  // out as the mobile case where a notice contains the LCP element.
  const [painted, setPainted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPainted(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const show = !stored && !dismissed && painted;

  const choose = useCallback((value: "all" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Blocked storage: the banner still dismisses for this session.
    }
    // Tell GoogleAnalytics to boot now, without waiting for a reload.
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setDismissed(true);
  }, []);

  const accept = () => choose("all");
  const necessary = () => choose("necessary");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          data-sticky-cta
          className="fixed bottom-0 left-0 right-0 z-[60] bg-charcoal border-t border-white/10 shadow-2xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/75 text-sm leading-relaxed flex-1">
              {dict.cookieBanner.body}{" "}
              <Link href={`/${lang}/cookies`} className="underline text-white/55 hover:text-white transition-colors">
                {dict.cookieBanner.policyLink}
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={necessary}
                className="px-4 py-2 rounded-[3px] border border-white/20 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white/90 transition-colors"
              >
                {dict.cookieBanner.necessaryOnly}
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 rounded-[3px] bg-indigo text-cream text-sm font-semibold hover:bg-indigo-deep transition-colors"
              >
                {dict.cookieBanner.acceptAll}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
