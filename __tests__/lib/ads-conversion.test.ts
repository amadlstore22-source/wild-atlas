import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Google Ads conversion tracking has a silent failure mode that already cost
 * this site real data: trackConversion() sends `send_to: "AW-xxx/LABEL"`, but
 * gtag.js only routes that event if the AW account was registered on the tag
 * with its own gtag('config', 'AW-xxx') call. Configure GA4 alone and the event
 * is accepted and dropped — no console error, no network failure, and Ads
 * simply reports zero conversions while bidding on incomplete data.
 *
 * These tests assert the two halves stay wired together, since nothing else
 * in the build would catch them drifting apart.
 */

const root = join(__dirname, "..", "..");
const analytics = readFileSync(join(root, "lib/analytics.ts"), "utf-8");
const gaComponent = readFileSync(join(root, "components/ui/GoogleAnalytics.tsx"), "utf-8");

describe("Google Ads conversion wiring", () => {
  it("exports an ADS_ID read from env", () => {
    expect(analytics).toMatch(/export const ADS_ID\s*=\s*process\.env\.NEXT_PUBLIC_ADS_CONVERSION_ID/);
  });

  it("configures the AW account on the tag, not just GA4", () => {
    // Without this second config line every send_to: "AW-.../LABEL" is dropped.
    expect(gaComponent).toContain("ADS_ID");
    expect(gaComponent).toMatch(/gtag\('config',\s*'\$\{ADS_ID\}'\)/);
  });

  it("gates the AW config on ADS_ID being set", () => {
    // An empty gtag('config', '') would be worse than omitting it.
    expect(gaComponent).toMatch(/ADS_ID\s*\?/);
  });

  it("maps every trackConversion label to a send_to env var", () => {
    const labels = ["enquiry", "whatsapp", "deposit", "phone"];
    for (const label of labels) {
      const envVar = `NEXT_PUBLIC_ADS_SEND_TO_${label.toUpperCase()}`;
      expect(analytics, `${label} has no ${envVar} mapping`).toContain(envVar);
    }
  });

  it("still sends the GA4 event when Ads is unconfigured", () => {
    // GA4 must not be conditional on the Ads label existing — otherwise an
    // unset AW id would blind Analytics as well as Ads.
    const fn = analytics.slice(analytics.indexOf("export function trackConversion"));
    const ga4Call = fn.indexOf("window.gtag?.(\"event\", `conversion_${label}`");
    const sendToGuard = fn.indexOf("if (sendTo)");
    expect(ga4Call).toBeGreaterThan(-1);
    expect(sendToGuard).toBeGreaterThan(ga4Call);
  });
});
