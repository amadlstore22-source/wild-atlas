import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  TOURS,
  toCardData,
  toListItem,
  groupPriceTiers,
  lowestGroupPrice,
} from "@/lib/tours";

/**
 * A CLIENT COMPONENT WAS SERIALISING THE ENTIRE TOUR CATALOGUE.
 *
 * THE INCIDENT (2026-09-19, found while auditing page weight against a
 * competitor whose homepage is 242 KB to our 592 KB).
 *
 * TourCard is "use client", so every field of its `tour` prop is serialised
 * into the React Flight payload embedded in the HTML. It was handed the whole
 * `Tour` object — itinerary, faq, includes, excludes, brief, gallery, full
 * description, seoDescription, relatedPosts — to render a card showing a
 * title, an image, a price and three bullets.
 *
 * Measured on the homepage's six featured tours: 26.0 KB serialised, 3.9 KB
 * used. 22.1 KB of dead weight per locale, 132.5 KB across six, and TourCard
 * also renders on /tours, the category, destination, guide, blog and
 * related-tours pages. /tours passed all 48 tours so the BROWSER could call
 * durationBucket(), which reads tour.itinerary.length.
 *
 * WHY NOTHING CAUGHT IT. The extra fields are valid, they typecheck, the page
 * renders identically, and every existing test passes. The only symptom is a
 * byte count nothing measured.
 *
 * THE BUG THIS INTRODUCED, and why the pricing assertions below exist.
 * Moving the day count off the itinerary and onto a field defaulted to
 * `?? 1`, which handed every multi-day tour the DAY-TOUR discount curve.
 * group-pricing.test.ts caught it on synthetic tours. A card is exactly that
 * shape — no itinerary — so the same silent mispricing was one missing field
 * away from shipping on every listing page.
 *
 * WHAT THIS ASSERTS. The card payload carries no heavy field, and a card
 * prices identically to the full tour it came from.
 */

const ROOT = join(__dirname, "..", "..");

/** Fields that must never cross the client boundary to render a card. */
const HEAVY = [
  "itinerary",
  "faq",
  "includes",
  "excludes",
  "brief",
  "gallery",
  "description",
  "seoDescription",
  "seoTitle",
  "relatedPosts",
  "reviewCount",
  "rating",
] as const;

describe("tour card payload stays slim", () => {
  it("toCardData drops every heavy field", () => {
    const leaked = new Set<string>();
    for (const tour of TOURS) {
      const card = toCardData(tour) as unknown as Record<string, unknown>;
      for (const f of HEAVY) if (f in card) leaked.add(f);
    }
    expect(
      [...leaked],
      `These fields are serialised into every page rendering a TourCard, to\n` +
        `render a card that does not display them:\n  ` +
        [...leaked].join("\n  ") +
        `\n\nRemove them from toCardData in lib/tours.ts. Widen it only for a\n` +
        `field the card genuinely shows.`,
    ).toEqual([]);
  });

  it("the card payload is a fraction of the full tour", () => {
    const full = TOURS.reduce((n, t) => n + JSON.stringify(t).length, 0);
    const card = TOURS.reduce((n, t) => n + JSON.stringify(toCardData(t)).length, 0);
    // Measured at ~15% when introduced. The threshold is deliberately loose —
    // it exists to catch someone spreading the whole tour back in, not to
    // police a few bytes.
    expect(
      card / full,
      `The card payload is ${(100 * card / full).toFixed(0)}% of the full ` +
        `catalogue (was ~15%). Something heavy has been added back to ` +
        `toCardData.`,
    ).toBeLessThan(0.35);
  });

  it("no TourCard call site passes a raw tour", () => {
    const FILES = [
      "components/sections/FeaturedTours.tsx",
      "components/tours/RelatedTours.tsx",
      "components/blog/RelatedTourCards.tsx",
      "app/[lang]/categories/[category]/page.tsx",
      "app/[lang]/destinations/[dest]/page.tsx",
      "app/[lang]/guides/[id]/page.tsx",
    ];
    const raw: string[] = [];
    for (const f of FILES) {
      const src = readFileSync(join(ROOT, f), "utf8");
      // `tour={tour}` means the full object crosses the boundary. The listing
      // page is exempt: it maps toListItem() before rendering, so its cards
      // are already slim by the time TourCard sees them.
      if (/<TourCard[^>]*\stour=\{tour\}/.test(src)) raw.push(f);
    }
    expect(
      raw,
      `These pass a full Tour to a client component. Wrap it in\n` +
        `toCardData():\n  ` + raw.join("\n  "),
    ).toEqual([]);
  });
});

describe("slimming the payload does not change prices", () => {
  it("a card prices identically to the tour it came from", () => {
    const drift: string[] = [];
    for (const tour of TOURS) {
      const item = toListItem(tour);
      if (JSON.stringify(groupPriceTiers(tour)) !== JSON.stringify(groupPriceTiers(item))) {
        drift.push(`${tour.slug}: ladder differs`);
      }
      if (JSON.stringify(lowestGroupPrice(tour)) !== JSON.stringify(lowestGroupPrice(item))) {
        drift.push(`${tour.slug}: lowest price differs`);
      }
    }
    expect(
      drift,
      `A card quotes a different price from its own tour page:\n  ` +
        drift.join("\n  ") +
        `\n\nThe day count moved off tour.itinerary onto itineraryDays; a\n` +
        `missing value there silently applies the DAY-TOUR discount curve to\n` +
        `a multi-day trip.`,
    ).toEqual([]);
  });

  it("toListItem always carries the day count the ladder needs", () => {
    const missing = TOURS.filter((t) => !toListItem(t).itineraryDays).map((t) => t.slug);
    expect(
      missing,
      `Without itineraryDays these cards fall back to a 1-day tour and are\n` +
        `mispriced:\n  ` + missing.join("\n  "),
    ).toEqual([]);
  });
});
