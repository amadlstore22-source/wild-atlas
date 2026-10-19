import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { priceIn } from "@/lib/currency-core";

/**
 * The five shared daily departures.
 *
 * These are the operator's first shared products — every other tour is private
 * — so the invariants that matter are different: a shared seat prices FLAT per
 * person because the vehicle runs whether you book or not, where a private tour
 * discounts as the group grows and spreads a fixed vehicle cost.
 *
 * One exception, set by the owner on 2026-10-19: on the two overnight shared
 * tours a solo traveller pays more (Merzouga €160, Zagora €105), because two
 * people share a room and a tent and one person has them alone. That is a
 * single-occupancy step from 1 to 2, not a group ladder: from two people the
 * price is flat again. `eur` is the price from two; `solo` the one-person price.
 *
 * The locale check exists because of a real past failure: `tourType` was set on
 * every English tour but missing from all five locale files, so 24 private
 * tours were badged "Shared" in fr/es/de/it/ar. mergeWithEn() now backfills it,
 * and this asserts the backfill actually reaches the rendered catalogue.
 */

const SHARED: { slug: string; eur: number; solo?: number }[] = [
  { slug: "shared-merzouga-3day-marrakech", eur: 120, solo: 160 },
  { slug: "shared-zagora-2day-marrakech", eur: 85, solo: 105 },
  { slug: "shared-ouzoud-waterfalls-day-trip", eur: 40 },
  { slug: "shared-agafay-dinner-camel-ride", eur: 30 },
  { slug: "shared-essaouira-day-trip", eur: 30 },
];

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

describe("shared daily departures", () => {
  it("all five exist and are marked shared", () => {
    for (const { slug } of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug);
      expect(tour, `${slug} missing from TOURS`).toBeDefined();
      expect(tour!.tourType, `${slug} is not marked shared`).toBe("shared");
    }
  });

  it("renders the operator's exact euro price", () => {
    // `price` is the one-person price, as on every tour.
    for (const { slug, eur, solo } of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      expect(priceIn(tour.price, "EUR"), `${slug}`).toBe(solo ?? eur);
    }
  });

  it("prices flat per person from two, with at most a solo step", () => {
    // A shared seat has no vehicle cost to divide, so six travellers pay six
    // times one. A descending ladder here would invent a discount that the
    // product does not offer. The only allowed step is 1 -> 2 (a room and tent
    // to yourself), on the tours the owner priced that way.
    for (const { slug, eur, solo } of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const expected = solo ? [{ minPeople: 1, price: solo }, { minPeople: 2, price: eur }] : [{ minPeople: 1, price: eur }];
      expect(tour.groupPricing, `${slug} tiers`).toEqual(expected);
    }
  });

  it("stays marked shared in every locale after the merge", () => {
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const { slug } of SHARED) {
        const tour = catalogue.find((t) => t.slug === slug);
        expect(tour, `${slug} missing from ${lang}`).toBeDefined();
        expect(tour!.tourType, `${slug} lost tourType in ${lang}`).toBe("shared");
      }
    }
  });

  it("keeps the same price in every locale", () => {
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const { slug, eur, solo } of SHARED) {
        const tour = catalogue.find((t) => t.slug === slug)!;
        expect(priceIn(tour.price, "EUR"), `${slug} in ${lang}`).toBe(solo ?? eur);
        expect(tour.groupPricing, `${slug} tiers in ${lang}`).toEqual(TOURS.find((t) => t.slug === slug)!.groupPricing);
      }
    }
  });

  it("carries a translated title in every locale", () => {
    // The generator clones the English block and overlays translations; a
    // failure here means an overlay silently did not apply.
    for (const lang of LOCALES.filter((l) => l !== "en")) {
      const catalogue = toursFor(lang);
      for (const { slug } of SHARED) {
        const tour = catalogue.find((t) => t.slug === slug)!;
        const en = TOURS.find((t) => t.slug === slug)!;
        expect(tour.title, `${slug} untranslated in ${lang}`).not.toBe(en.title);
      }
    }
  });
});
