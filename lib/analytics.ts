// Lightweight, consent-aware analytics layer for Google Analytics 4 + Google
// Ads conversion tracking.
//
// Nothing here loads or fires unless BOTH are true:
//   1. NEXT_PUBLIC_GA_ID is set (the GA4 Measurement ID, e.g. "G-XXXXXXX").
//   2. The visitor has given "all" cookie consent (met-cookie-consent = "all").
//
// This keeps us GDPR / ePrivacy compliant for the EU markets the ads target —
// no tracking cookies before consent. The <GoogleAnalytics> component reads the
// same STORAGE_KEY the CookieBanner writes, and boots the moment consent flips.

export const CONSENT_KEY = "met-cookie-consent";
// Broadcast on the window when consent changes, so analytics can boot without a
// page reload the instant someone clicks "Accept all".
export const CONSENT_EVENT = "met-consent-change";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_KEY) === "all";
  } catch {
    return false;
  }
}

// Minimal gtag typing so we avoid `any` and keep tsc happy.
type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["consent", "default" | "update", Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/**
 * Fire a GA4 event. Safe to call anywhere — it no-ops on the server, when GA is
 * not configured, or before consent. Use for conversions and key interactions.
 *
 *   track("whatsapp_click", { location: "booking_sidebar", tour: "…" })
 */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!GA_ID || !hasAnalyticsConsent()) return;
  window.gtag?.("event", event, params);
}

/**
 * Fire a Google Ads conversion. Only fires once the Ads conversion label is
 * configured via env (NEXT_PUBLIC_ADS_CONVERSION_ID / _LABEL). Call this on the
 * true conversion actions (enquiry sent, WhatsApp opened) so the campaign can
 * optimise. `value`/`currency` help value-based bidding.
 */
export function trackConversion(
  label:
    | "enquiry"
    | "whatsapp"
    | "deposit"
    | "phone",
  opts?: { value?: number; currency?: string },
): void {
  if (typeof window === "undefined") return;
  if (!GA_ID || !hasAnalyticsConsent()) return;

  // Always send the GA4 event so it shows up in Analytics regardless of Ads.
  window.gtag?.("event", `conversion_${label}`, {
    value: opts?.value,
    currency: opts?.currency ?? "EUR",
  });

  // Optionally send the Google Ads conversion if a send_to label is configured.
  const sendTo = ADS_SEND_TO[label];
  if (sendTo) {
    window.gtag?.("event", "conversion", {
      send_to: sendTo,
      value: opts?.value,
      currency: opts?.currency ?? "EUR",
    });
  }
}

// Map each conversion action to its Google Ads "AW-XXXX/LABEL" send_to string.
// Fill these from env once you create the conversion actions in Google Ads.
// Format per action: "AW-1234567890/AbCdEfGhIj".
const ADS_SEND_TO: Record<string, string | undefined> = {
  enquiry: process.env.NEXT_PUBLIC_ADS_SEND_TO_ENQUIRY,
  whatsapp: process.env.NEXT_PUBLIC_ADS_SEND_TO_WHATSAPP,
  deposit: process.env.NEXT_PUBLIC_ADS_SEND_TO_DEPOSIT,
  phone: process.env.NEXT_PUBLIC_ADS_SEND_TO_PHONE,
};
