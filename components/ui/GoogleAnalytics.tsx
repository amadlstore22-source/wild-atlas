"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_ID, ADS_ID, CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/analytics";

// Loads Google Analytics 4 (gtag.js) — the same tag Google Ads conversion
// tracking rides on — but ONLY after the visitor accepts all cookies. It reads
// consent from localStorage (written by CookieBanner) on mount and re-checks
// whenever CookieBanner broadcasts CONSENT_EVENT, so it boots the instant the
// user clicks "Accept all" without needing a reload.
//
// Renders nothing (and loads no third-party JS) when:
//   - NEXT_PUBLIC_GA_ID is unset (e.g. local dev, or before you paste your ID)
//   - consent has not been granted
export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const sync = () => setConsented(hasAnalyticsConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    // Consent may also change in another tab.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
