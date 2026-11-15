import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { REVIEWS, reviewsForTour } from "@/lib/reviews";

/**
 * The booking sidebar quotes a real traveller next to the price. That only
 * works as proof if the quote is about the trip on screen.
 *
 * reviewsForTour used to slice an unfiltered, score-sorted list, so a tour
 * matching nothing still rendered the highest-scoring review — a Toubkal
 * summit quote on an Ouzoud waterfalls day trip, across 23 of 46 tour pages.
 */

describe("review quotes are about the tour they appear on", () => {
  /**
   * 2026-11-15: the keyword match that replaced the slice would have shown
   * Anja's review of the Marrakech Erg Chegaga trip on the Agadir Erg Chegaga
   * page too (both titles say "Erg Chegaga"), and matched nothing on French,
   * Spanish, German, Italian and Arabic pages, whose titles are translated.
   * Quotes are now chosen by tourSlug; this holds that line catalogue-wide.
   */
  it("never attaches a review to a tour the guest did not take", () => {
    const failures: string[] = [];
    for (const tour of TOURS) {
      for (const r of reviewsForTour(tour.slug)) {
        if (r.tourSlug !== tour.slug) failures.push(`${tour.slug} shows ${r.name}'s review of ${r.tourSlug}`);
      }
    }
    expect(failures, `mismatched review quotes:\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("returns nothing rather than a filler quote when no review matches", () => {
    expect(reviewsForTour("zzzz-nonexistent-excursion")).toEqual([]);
  });

  it("every review is quoted on the page of the tour it describes", () => {
    const lost = REVIEWS.filter((r) => !reviewsForTour(r.tourSlug, 99).includes(r)).map((r) => r.name);
    expect(lost, "these reviews appear on no tour page").toEqual([]);
  });

  it("every review carries the attribution the sidebar renders", () => {
    for (const r of REVIEWS) {
      expect(r.name.length, "review needs a name").toBeGreaterThan(0);
      // country may be empty when the guest gave none; the UI then omits it.
      expect(r.date.length, "review needs a date").toBeGreaterThan(0);
      expect(r.short.length, `${r.name}: pull-quote too long`).toBeLessThanOrEqual(110);
    }
  });
});
