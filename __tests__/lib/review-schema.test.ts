import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { REVIEWS } from "@/lib/reviews";
import { buildReviewNodes } from "@/lib/seo/schema";

/**
 * REVIEW MARKUP MUST NAME A TRIP THE AUTHOR ACTUALLY TOOK.
 *
 * WHY THIS EXISTS (2026-09-19, from a competitor gap analysis).
 *
 * marrakech-desert-trips.com emits AggregateRating with ratingCount 1271 on a
 * single tour page and earns star ratings in the SERP; our tour pages emitted
 * no review markup at all. The obvious "fix" was to emit `tour.rating` and
 * `tour.reviewCount`, which exist on every tour in lib/tours.ts.
 *
 * THAT WOULD HAVE BEEN FABRICATION. Both fields are @deprecated placeholders:
 * they sum to ~2,276 across the catalogue against 122 real TripAdvisor
 * reviews. Emitting them is invented review markup — a Google structured-data
 * spam violation that risks manual action, and a false claim to a customer
 * deciding whether to pay us. The genuine business-wide rating is already
 * emitted once as LocalBusiness/aggregateRating on the homepage.
 *
 * What IS legitimate is the individual Review node, from the three real named
 * travellers in lib/reviews.ts.
 *
 * THE TRAP THIS TEST GUARDS. Attribution must be by `tourSlug`, never by
 * keyword. reviewsForTour() matches loosely on purpose — fine for a visible
 * pull-quote, fatal for schema. Measured before the fix:
 *
 *   - keyword matching attached Marco B. to ELEVEN different desert tours
 *   - naive string containment resolved his "3-Day Sahara Desert Tour" to
 *     merzouga-3day-agadir — a trip from a different city he never took
 *
 * A Review node asserts "this named person reviewed this product". Getting it
 * wrong is not a cosmetic SEO error; it is a fabricated testimonial with a
 * real person's name on it, on a page where someone is deciding to pay.
 *
 * WHAT THIS ASSERTS. Every emitted review belongs to its page, every review
 * points at a tour that exists, and no aggregateRating is ever emitted from
 * the deprecated placeholder fields.
 */

const ROOT = join(__dirname, "..", "..");

describe("Review schema attribution", () => {
  it("every review names a tour slug that exists", () => {
    const slugs = new Set(TOURS.map((t) => t.slug));
    const orphans = REVIEWS.filter((r) => !slugs.has(r.tourSlug)).map(
      (r) => `${r.name}: tourSlug "${r.tourSlug}"`,
    );

    expect(
      orphans,
      `These reviews point at a tour that does not exist, so their Review\n` +
        `node would never render and the traveller's words are lost:\n  ` +
        orphans.join("\n  "),
    ).toEqual([]);
  });

  /**
   * The FIRST version of this test compared each emitted node's author back to
   * the same `tourSlug` that selected it, which is a tautology: it can never
   * fail, and it passed cleanly while Marco B. was deliberately reassigned to
   * merzouga-3day-agadir. Only reintroducing that bug on purpose exposed it.
   *
   * The real claim is about the DATA, not the function: `tourSlug` must name
   * the tour the review's own `tour` label describes. That is what a human
   * would check, and it is the thing keyword matching gets wrong.
   */
  /**
   * TWO FAILED ATTEMPTS BEFORE THIS ONE, both found by reintroducing the bug:
   *
   *  1. Comparing each emitted node's author back to the `tourSlug` that
   *     selected it — a tautology that can never fail.
   *  2. Text similarity between the review's `tour` label and the tour title.
   *     That cannot work here: "3-Day Sahara Desert Tour" appears VERBATIM
   *     inside "Agadir to Merzouga — 3-Day Sahara Desert Tour", so the wrong
   *     tour scores 2/2 — a perfect match. No word-overlap rule separates
   *     them, because the titles genuinely do not differ in those words.
   *
   * The departure city does differ, and it is the fact a customer would notice
   * ("I booked from Marrakech and this review is from an Agadir trip"). So the
   * review states its own `origin` and it is cross-checked against the tour's.
   */
  it("a review's departure city matches the tour it is attributed to", () => {
    const bySlug = new Map(TOURS.map((t) => [t.slug, t]));
    const mismatches: string[] = [];

    for (const r of REVIEWS) {
      const tour = bySlug.get(r.tourSlug);
      if (!tour) continue; // covered by the previous test
      if (tour.origin !== r.origin) {
        mismatches.push(
          `${r.name} departed from ${r.origin} but tourSlug "${r.tourSlug}" ` +
            `(${tour.title}) departs from ${tour.origin}`,
        );
      }
    }

    expect(
      mismatches,
      `A Review node would claim a named traveller reviewed a tour they did\n` +
        `not take:\n  ` +
        mismatches.join("\n  ") +
        `\n\nTitles cannot catch this — the Marrakech and Agadir Sahara tours\n` +
        `share their wording. Set tourSlug to the trip the traveller actually\n` +
        `booked, from the city they actually left from.`,
    ).toEqual([]);
  });

  it("returns undefined rather than an empty array when nothing matches", () => {
    // `review: []` tells Google the product HAS no reviews, which is a
    // different and worse claim than saying nothing. The caller spreads the
    // result, so it must be undefined to disappear.
    const none = buildReviewNodes(REVIEWS, "a-tour-nobody-reviewed");
    expect(none).toBeUndefined();
  });

  it("dates are ISO 8601, or absent — never an unparseable label", () => {
    const bad: string[] = [];
    for (const tour of TOURS) {
      for (const node of buildReviewNodes(REVIEWS, tour.slug) ?? []) {
        const d = (node as { datePublished?: string }).datePublished;
        if (d !== undefined && !/^\d{4}-\d{2}(-\d{2})?$/.test(d)) {
          bad.push(`${tour.slug}: datePublished "${d}"`);
        }
      }
    }
    expect(
      bad,
      `datePublished must be ISO 8601. "March 2025" is silently dropped by\n` +
        `Google:\n  ` + bad.join("\n  "),
    ).toEqual([]);
  });
});

describe("no fabricated aggregate rating", () => {
  it("the tour page never emits aggregateRating from tour.rating", () => {
    const page = readFileSync(
      join(ROOT, "app", "[lang]", "tours", "[slug]", "page.tsx"),
      "utf8",
    );
    // tour.rating / tour.reviewCount are @deprecated placeholders summing to
    // ~2,276 against 122 real reviews. They must not reach structured data.
    //
    // Comments are stripped before matching. The word appears twice in the
    // prose above the Product node explaining why the field is absent, and
    // both a substring check AND a `key:` regex fired on that comment ("No
    // aggregateRating: we have no per-tour review corpus..."). A test that
    // fails on its own documentation gets deleted rather than heeded, so the
    // check has to look at code only.
    const code = page
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/(^|[^:])\/\/.*$/gm, "$1");
    const emitsKey = /(^|[\s{,])aggregateRating\s*:/.test(code);
    expect(
      emitsKey,
      `app/[lang]/tours/[slug]/page.tsx emits aggregateRating. Our per-tour\n` +
        `rating and reviewCount are @deprecated placeholders (~2,276 total vs\n` +
        `122 real TripAdvisor reviews) — emitting them is fabricated review\n` +
        `markup. The real rating belongs on LocalBusiness on the homepage.`,
    ).toBe(false);
  });

  it("individual reviews carry a real rating within schema bounds", () => {
    for (const tour of TOURS) {
      for (const node of buildReviewNodes(REVIEWS, tour.slug) ?? []) {
        const r = node.reviewRating as { ratingValue: string };
        const v = Number(r.ratingValue);
        expect(v, `${tour.slug} review rating out of range`).toBeGreaterThanOrEqual(1);
        expect(v, `${tour.slug} review rating out of range`).toBeLessThanOrEqual(5);
      }
    }
  });
});
