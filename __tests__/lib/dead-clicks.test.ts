import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Microsoft Clarity logged dead clicks (a click that changes nothing) on
 * /en/tours/sahara-3day-marrakech, the most visited tour, on mobile and PC in
 * the three days to 2026-10-11. A headless click-through of the live page found
 * what looked tappable and was not:
 *
 *  - "5.0/5 · 122 TripAdvisor reviews" in the trust strip under every tour hero.
 *    Visitors tap a rating to read the reviews; it was plain text, while the
 *    same listing is linked everywhere else on the site.
 *  - Every tour card on the site (homepage, tour lists, categories, "More …
 *    Adventures"): only the "View Tour" button was a link. The photo, title and
 *    highlights did nothing, even though the card lifts on hover like a link.
 *  - The category label in the tour hero ("Desert"), which also showed the
 *    English word on all six locales.
 *
 * Nothing catches this. The pages build, typecheck, render and pass every other
 * test; the only symptom is a visitor tapping, getting nothing, and leaving.
 * These checks keep each fix in place across all tours and both card variants.
 */

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");

describe("no dead clicks on tour pages and cards", () => {
  it("the trust strip's TripAdvisor rating links to the listing in a new tab", () => {
    const src = read("components/tours/TourTrustBar.tsx");
    expect(src, "The rating item must carry href: TRIPADVISOR.url").toMatch(/href:\s*TRIPADVISOR\.url/);
    expect(src, "Linked items must open in a new tab with rel=noopener").toMatch(/target="_blank"\s+rel="noopener noreferrer"/);
  });

  /**
   * The homepage has its own trust strip (components/sections/TrustBar.tsx),
   * separate from the one under tour heroes, and the first fix missed it. A
   * Clarity recording on 2026-10-12 showed a visitor from Instagram on the
   * Spanish homepage tapping "Valorado con 5.0 / 5" twice (two dead clicks)
   * before leaving. The same strip also printed "14 days" and "30+ yrs" in
   * English on all six locales.
   */
  it("the homepage trust strip's rating links to the listing, in the visitor's language", () => {
    const src = read("components/sections/TrustBar.tsx");
    expect(src, "The rating signal must carry href: TRIPADVISOR.url").toMatch(/href:\s*TRIPADVISOR\.url/);
    expect(src, "Linked signals must open in a new tab with rel=noopener").toMatch(/target="_blank"\s+rel="noopener noreferrer"/);
    expect(src, 'Units must come from the dictionary, not hard-coded "days"/"yrs"').not.toMatch(/`[^`]*\}\s*(days|yrs)`/);
  });

  it("every TourCard variant is clickable as a whole, not just its button", () => {
    const src = read("components/ui/TourCard.tsx");
    const variants = (src.match(/<m\.article/g) ?? []).length;
    const overlays = (src.match(/\{cardLink\(/g) ?? []).length;
    expect(
      overlays,
      `TourCard renders ${variants} card variant(s) but only ${overlays} whole-card link overlay(s).\n` +
        `Give each <m.article> a {cardLink(...)} so the photo, title and text open the tour.`,
    ).toBe(variants);
  });

  it("the tour hero's category label links to its category page", () => {
    const src = read("app/[lang]/tours/[slug]/page.tsx");
    expect(src, "The category Badge must render as a Link to /{lang}/categories/{category}").toMatch(
      /render=\{<Link href=\{`\/\$\{lang\}\/categories\/\$\{tour\.category\}`\}/,
    );
  });
});
