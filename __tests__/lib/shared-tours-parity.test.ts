import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { BLOG_POSTS } from "@/lib/blog";
import tourRoutes from "@/lib/tour-routes.json";

/**
 * The shared departures shipped as a late addition, appended after the rest of
 * the catalogue, and that is exactly how a tour ends up missing the pieces the
 * others get for free. Two real gaps were found this way:
 *
 *   - `relatedPosts` was absent, so the pages were internal-linking dead ends.
 *   - The route builder's ROAD_TOURS allowlist predated them, so the two
 *     multi-day tours drew straight lines across the Atlas instead of roads.
 *
 * These assert the parity rather than the values, so the next tour appended to
 * the array is held to the same bar.
 */

const SHARED = [
  "shared-merzouga-3day-marrakech",
  "shared-zagora-2day-marrakech",
  "shared-ouzoud-waterfalls-day-trip",
  "shared-agafay-dinner-camel-ride",
  "shared-essaouira-day-trip",
];

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

describe("shared tours have the same components as every other tour", () => {
  it("links out to real blog posts", () => {
    const known = new Set(BLOG_POSTS.map((p) => p.slug));
    for (const slug of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const related = tour.relatedPosts ?? [];
      expect(related.length, `${slug} has no relatedPosts`).toBeGreaterThan(0);
      for (const p of related) {
        expect(known.has(p), `${slug} links to missing post "${p}"`).toBe(true);
      }
    }
  });

  it("keeps those links in every locale after the merge", () => {
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const slug of SHARED) {
        const tour = catalogue.find((t) => t.slug === slug)!;
        expect(
          (tour.relatedPosts ?? []).length,
          `${slug} lost relatedPosts in ${lang}`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("carries road geometry whenever there are two stops to route between", () => {
    // A single-stop day trip has no leg to draw, and its private twin has no
    // route either — that is correct, not a gap. Anything with two or more
    // stops is a driving route and must snap to real roads.
    const routes = tourRoutes as Record<string, unknown[]>;
    for (const slug of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      const stops = tour.itinerary.filter((d) => d.stop).length;
      if (stops < 2) continue;
      const line = routes[slug];
      expect(line, `${slug} has ${stops} stops but no route geometry`).toBeDefined();
      // A real road route is hundreds of points; a straight line is two.
      expect(line!.length, `${slug} route looks unrouted`).toBeGreaterThan(50);
    }
  });

  it("pins a meeting point travellers can actually reach", () => {
    for (const slug of SHARED) {
      const tour = TOURS.find((t) => t.slug === slug)!;
      expect(tour.meetingPoint, `${slug} has no meetingPoint`).toBeDefined();
      expect(tour.meetingPoint.name.length).toBeGreaterThan(0);
    }
  });
});
