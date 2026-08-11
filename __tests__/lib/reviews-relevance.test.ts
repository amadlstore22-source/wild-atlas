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

const GENERIC = new Set(["marrakech", "marrakesh", "agadir", "morocco", "moroccan", "tours"]);

function keywords(title: string) {
  return title
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 4 && !GENERIC.has(w));
}

describe("review quotes are about the tour they appear on", () => {
  it("never attaches an unrelated review to a tour", () => {
    const failures: string[] = [];
    for (const tour of TOURS) {
      for (const r of reviewsForTour(tour.title)) {
        const hit = keywords(tour.title).some((w) => r.tour.toLowerCase().includes(w));
        if (!hit) failures.push(`${tour.slug} shows a review of "${r.tour}"`);
      }
    }
    expect(failures, `mismatched review quotes:\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("returns nothing rather than a filler quote when no review matches", () => {
    // A slug that shares no keyword with any review must yield an empty array,
    // not the top-scoring review.
    expect(reviewsForTour("Zzzz Nonexistent Excursion")).toEqual([]);
  });

  it("still surfaces quotes where a genuine match exists", () => {
    // Guards against over-correcting into showing nothing anywhere.
    const matched = TOURS.filter((t) => reviewsForTour(t.title).length > 0);
    expect(matched.length).toBeGreaterThan(0);
  });

  it("every review carries the attribution the sidebar renders", () => {
    for (const r of REVIEWS) {
      expect(r.name.length, "review needs a name").toBeGreaterThan(0);
      expect(r.country.length, "review needs a country").toBeGreaterThan(0);
      expect(r.date.length, "review needs a date").toBeGreaterThan(0);
      expect(r.short.length, `${r.name}: pull-quote too long`).toBeLessThanOrEqual(110);
    }
  });
});
