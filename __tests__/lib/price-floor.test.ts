import { describe, it, expect } from "vitest";
import { TOURS, perPersonPrice } from "@/lib/tours";
import { priceIn } from "@/lib/currency-core";
import {
  COMPETITOR_PRICES,
  MAX_UNDERCUT,
  MAX_PREMIUM,
  cheapestCompetitor,
  competitorsFor,
} from "@/lib/competitor-prices";

/**
 * Guards the pricing floor: undercut the market, but never by so much that the
 * margin disappears.
 *
 * The modelled cost base for a 3-day private desert tour is roughly €527 fixed
 * plus €154 per head — derived independently from three operators' published
 * tables, which agree closely. There is real room to undercut, and very little
 * room to undercut deeply.
 *
 * These tests will also fail if a COMPETITOR moves. That is intended: if a
 * rival cuts prices, we can end up above the market without touching our own
 * data, and that should surface as a failure rather than a lost booking.
 */
describe("competitor price floor", () => {
  const benchmarked = [...new Set(COMPETITOR_PRICES.map((c) => c.slug))];

  it("benchmarks only tours that exist", () => {
    for (const slug of benchmarked) {
      expect(TOURS.find((t) => t.slug === slug), `unknown slug: ${slug}`).toBeDefined();
    }
  });

  it("never sits more than 15% below the cheapest comparable competitor", () => {
    const breaches: string[] = [];

    for (const slug of benchmarked) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const sizes = new Set(
        competitorsFor(slug).flatMap((c) => Object.keys(c.prices).map(Number)),
      );

      for (const people of [...sizes].sort((a, b) => a - b)) {
        const rival = cheapestCompetitor(slug, people);
        if (!rival) continue;

        const ours = priceIn(perPersonPrice(tour, people), "EUR");
        const undercut = 1 - ours / rival.price;

        if (undercut > MAX_UNDERCUT) {
          breaches.push(
            `${slug} @${people}pax: €${ours} is ${(undercut * 100).toFixed(0)}% below ` +
              `${rival.operator}'s €${rival.price} (floor is ${MAX_UNDERCUT * 100}%)`,
          );
        }
      }
    }

    expect(breaches, `Prices below the floor:\n  ${breaches.join("\n  ")}`).toEqual([]);
  });

  it("does not sit above the market on a like-for-like trip", () => {
    // A small premium is defensible — licensed Berber guides, family operation,
    // no middleman. Being visibly dearer than a rival selling the same trip is
    // not, when the customer can open both pages side by side.
    const over: string[] = [];

    for (const slug of benchmarked) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const sizes = new Set(
        competitorsFor(slug).flatMap((c) => Object.keys(c.prices).map(Number)),
      );

      for (const people of [...sizes].sort((a, b) => a - b)) {
        const rival = cheapestCompetitor(slug, people);
        if (!rival) continue;

        const ours = priceIn(perPersonPrice(tour, people), "EUR");
        const premium = ours / rival.price - 1;

        if (premium > MAX_PREMIUM) {
          over.push(
            `${slug} @${people}pax: €${ours} is ${(premium * 100).toFixed(0)}% ABOVE ` +
              `${rival.operator}'s €${rival.price}`,
          );
        }
      }
    }

    expect(over, `Priced above the market:\n  ${over.join("\n  ")}`).toEqual([]);
  });

  it("keeps every benchmark entry sourced and dated", () => {
    // A number with no URL cannot be re-checked, and an undated one cannot be
    // trusted — competitor pricing moves.
    for (const c of COMPETITOR_PRICES) {
      expect(c.source, `${c.slug}/${c.operator}`).toMatch(/^https:\/\//);
      expect(c.verified, `${c.slug}/${c.operator}`).toMatch(/^\d{4}-\d{2}$/);
      expect(c.basis.length, `${c.slug}/${c.operator}: needs a stated basis`).toBeGreaterThan(20);
      expect(Object.keys(c.prices).length, `${c.slug}/${c.operator}: no prices`).toBeGreaterThan(0);
    }
  });

  it("reports where each benchmarked tour sits", () => {
    // Not an assertion — prints the current position so a price change shows
    // its competitive effect in the test output rather than needing a script.
    const lines: string[] = [];
    for (const slug of benchmarked) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const rival = cheapestCompetitor(slug, 2) ?? cheapestCompetitor(slug, 1);
      if (!rival) continue;
      const people = cheapestCompetitor(slug, 2) ? 2 : 1;
      const ours = priceIn(perPersonPrice(tour, people), "EUR");
      const gap = ((1 - ours / rival.price) * 100).toFixed(0);
      lines.push(`${slug} @${people}pax €${ours} vs €${rival.price} (${gap}% under)`);
    }
    expect(lines.length).toBeGreaterThan(0);
  });
});
