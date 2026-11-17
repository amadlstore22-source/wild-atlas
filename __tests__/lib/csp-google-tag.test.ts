import { describe, expect, it } from "vitest";
import nextConfig from "@/next.config";

/**
 * INCIDENT, found 2026-11-17 while checking why enquiries had gone quiet.
 *
 * The Google tag (G-MH5VKPGR38) is linked to a Google Ads account with a
 * "Contact Us" conversion. Driving the live contact form in headless Chrome
 * showed the browser refusing three of the tag's requests:
 *
 *   connect-src  https://www.google.com/measurement/conversion?...en=ads_conversion_Contact_Us_1
 *   connect-src  https://stats.g.doubleclick.net/g/collect?...
 *   img-src      https://www.google.co.ma/ads/ga-audiences?...
 *
 * The policy had allowed plain GA4 only, since launch. Nothing failed
 * visibly: the page works, GA4 page views still arrive, and the only trace is
 * a console line no visitor reads. Google Ads would have bid without ever
 * seeing an enquiry, the moment the owner started a campaign (planned).
 *
 * The required hosts below are Google's own, from the "Google Analytics"
 * (with advertising features) and "Google Ads" tables of
 * developers.google.com/tag-platform/security/guides/csp, plus the three
 * URLs that were actually blocked. This reads the policy the config really
 * serves, not the source text, so a refactor of next.config.ts cannot fool it.
 */

async function servedPolicy(): Promise<Record<string, string[]>> {
  const rules = await nextConfig.headers!();
  const all = rules.find((r) => r.source === "/(.*)");
  const csp = all?.headers.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
  return Object.fromEntries(
    csp
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const [name, ...values] = d.split(/\s+/);
        return [name, values];
      }),
  );
}

/** Does a source list let `origin` through, exactly or by a `*.` wildcard? */
function allows(sources: string[] = [], origin: string): boolean {
  return sources.some((s) => {
    if (s === origin) return true;
    const m = s.match(/^https:\/\/\*\.(.+)$/);
    return !!m && origin.startsWith("https://") && origin.slice(8).endsWith(`.${m[1]}`);
  });
}

const REQUIRED: Record<string, string[]> = {
  "script-src": [
    "https://www.googletagmanager.com",
    "https://www.googleadservices.com",
    "https://www.google.com",
  ],
  "img-src": [
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.google.com",
    "https://www.google.co.ma", // blocked live: the ga-audiences image
    "https://googleads.g.doubleclick.net",
    "https://www.googleadservices.com",
    "https://pagead2.googlesyndication.com",
  ],
  "connect-src": [
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://analytics.google.com",
    "https://www.google.com", // blocked live: the Ads conversion ping
    "https://stats.g.doubleclick.net", // blocked live
    "https://googleads.g.doubleclick.net",
    "https://www.googleadservices.com",
    "https://pagead2.googlesyndication.com",
    "https://ad.doubleclick.net",
  ],
  "frame-src": ["https://www.googletagmanager.com"],
};

describe("CSP lets the Google tag (GA4 + Google Ads) do its job", () => {
  it("allows every host Google's CSP guide lists, and the requests that were blocked", async () => {
    const policy = await servedPolicy();
    const missing = Object.entries(REQUIRED).flatMap(([directive, origins]) =>
      origins.filter((o) => !allows(policy[directive], o)).map((o) => `${directive}  ${o}`),
    );
    expect(
      missing,
      `The Content-Security-Policy in next.config.ts blocks Google tag requests.\n` +
        `Add these to GOOGLE_TAG there (hosts from Google's CSP guide):\n  ` +
        missing.join("\n  "),
    ).toEqual([]);
  });

  it("allows the same Google country domains for images and for fetch", async () => {
    const policy = await servedPolicy();
    const country = (list: string[] = []) =>
      list.filter((s) => /google\.(?!com$)[a-z.]+$/.test(s) && !s.includes("google-analytics")).sort();
    expect(
      country(policy["img-src"]),
      "Google's guide needs each google.<country> domain in BOTH img-src and connect-src.",
    ).toEqual(country(policy["connect-src"]));
    expect(country(policy["img-src"]).length).toBeGreaterThan(0);
  });

  it("still refuses to let anyone frame the site", async () => {
    const policy = await servedPolicy();
    expect(policy["frame-ancestors"]).toEqual(["'none'"]);
  });
});
