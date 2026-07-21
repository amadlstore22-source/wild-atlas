"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const STORAGE_KEY = "met-cookie-consent";

export default function CookieBanner({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
      }
    } catch {
      // localStorage not available (SSR guard)
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "all");
    setShow(false);
  }

  function necessary() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setShow(false);
  }

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
