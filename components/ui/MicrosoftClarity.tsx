"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { CLARITY_ID, CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/analytics";

/**
 * Microsoft Clarity (heatmaps + session recordings), same consent gate as
 * GoogleAnalytics.tsx: nothing loads until the visitor chooses "Accept all".
 *
 * Why not Clarity's "no-consent mode": it still records the session, just
 * without cookies. Our cookie policy promises that "Necessary only" loads no
 * analytics at all, and ePrivacy Art. 5(3) covers any access to the device,
 * not only cookies (the same reasoning that gated Vercel Analytics).
 *
 * The consentv2 call right after the tag is required: since 31 Oct 2025
 * Clarity withholds full functionality for EEA/UK/CH visits without an
 * explicit signal (learn.microsoft.com/clarity, clarity-consent-api-v2). We
 * only ever reach this code with consent, so it is always "granted". Clarity
 * queues the call until its script has loaded.
 */
export default function MicrosoftClarity() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (!CLARITY_ID) return;
    const sync = () => setConsented(hasAnalyticsConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!CLARITY_ID || !consented) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
        window.clarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
      `}
    </Script>
  );
}
