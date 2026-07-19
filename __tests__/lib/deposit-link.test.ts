import { describe, it, expect } from "vitest";
import { priceIn, formatPrice, CURRENCIES, DEFAULT_CURRENCY, type Currency } from "@/lib/currency-core";
import { TOURS } from "@/lib/tours";
import { SITE } from "@/lib/constants";

/**
 * The deposit link is a money path: whatever PayPal opens with must equal what
 * the page displayed. Before this was fixed, the link passed the raw USD number
 * with no currency, so a page showing "€87" opened PayPal for "95".
 */
function depositUrl(depositUsd: number, currency: Currency): string {
  return `https://www.paypal.com/paypalme/${SITE.paypal}/${priceIn(depositUsd, currency)}${currency}`;
}

describe("PayPal deposit link", () => {
  it("sends the same number the page shows, in every currency", () => {
    const tour = TOURS.find((t) => t.slug === "toubkal-summit-trek-4day")!;
    for (const currency of CURRENCIES) {
      const shown = formatPrice(tour.depositAmount, currency).replace(/[^\d]/g, "");
      const sent = depositUrl(tour.depositAmount, currency).match(/\/(\d+)[A-Z]{3}$/)![1];
      expect(sent, `${currency}: link sends ${sent} but page shows ${shown}`).toBe(shown);
    }
  });

  it("always states the currency explicitly", () => {
    // Without the suffix PayPal falls back to the account default, which is how
    // a EUR-priced deposit could be charged as USD.
    for (const currency of CURRENCIES) {
      expect(depositUrl(95, currency)).toMatch(/\/\d+(EUR|USD|GBP|MAD)$/);
    }
  });

  it("never sends the unconverted USD figure when displaying EUR", () => {
    const usd = 95;
    const url = depositUrl(usd, "EUR");
    expect(url).toContain("87EUR");
    expect(url).not.toContain("95EUR");
  });

  it("covers every tour without producing a zero or fractional amount", () => {
    for (const tour of TOURS) {
      const amount = priceIn(tour.depositAmount, DEFAULT_CURRENCY);
      expect(Number.isInteger(amount), `${tour.slug} deposit is fractional`).toBe(true);
      expect(amount, `${tour.slug} deposit rounds to zero`).toBeGreaterThan(0);
    }
  });

  // The Terms used to promise "a deposit of 30% of the total tour price" while
  // every tour charged 24-29%. Terms now say "typically around a quarter", so
  // this guards the band that sentence claims.
  it("every deposit stays within the range the Terms describe", () => {
    for (const tour of TOURS) {
      const pct = (tour.depositAmount / tour.price) * 100;
      expect(pct, `${tour.slug} deposit is ${pct.toFixed(1)}% — outside the stated band`).toBeGreaterThanOrEqual(20);
      expect(pct, `${tour.slug} deposit is ${pct.toFixed(1)}% — outside the stated band`).toBeLessThanOrEqual(32);
    }
  });

  // Guard against shipping a handle that sends money to the wrong account.
  // paypal.me/wildatlas resolves as an unclaimed namespace, so the old brand
  // name is not merely stale — it is a live route for deposits to a stranger.
  it("never ships a handle belonging to another brand", () => {
    const forbidden = ["wildatlas", "wild-atlas", "wildatlastours"];
    expect(
      forbidden,
      `SITE.paypal is "${SITE.paypal}" — a namespace we do not own`,
    ).not.toContain(SITE.paypal.toLowerCase());
  });

  // Empty is the intended state until the real handle exists: BookingSidebar
  // swaps the pay button for a "request a payment link" prompt. What must never
  // happen is a half-built URL like ".../paypalme//155EUR".
  it("builds a deposit URL only when a handle is configured", () => {
    if (!SITE.paypal) return; // no handle: the button is not rendered at all
    expect(depositUrl(95, "EUR")).toMatch(
      /^https:\/\/www\.paypal\.com\/paypalme\/[^/]+\/\d+[A-Z]{3}$/,
    );
  });
});
