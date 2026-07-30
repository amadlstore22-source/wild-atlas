"use client";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/analytics";

/**
 * Vercel Analytics + Speed Insights, behind the same consent gate as GA4.
 *
 * These were previously mounted unconditionally in the root layout, so they
 * beaconed page views on every visit — including visits where the user chose
 * "Necessary only". That directly contradicted our own cookie policy, which
 * promises "Choose Necessary only and none of these are ever set", and under
 * ePrivacy Art. 5(3) the rule covers any access to the device, not only
 * cookies.
 *
 * Mirrors GoogleAnalytics.tsx: reads consent on mount, re-checks on the
 * CookieBanner broadcast so it starts the moment the user accepts, and on
 * `storage` so a choice made in another tab is respected here too.
 */
export default function VercelAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const sync = () => setConsented(hasAnalyticsConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!consented) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
