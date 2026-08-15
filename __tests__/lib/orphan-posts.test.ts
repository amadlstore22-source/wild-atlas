import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { TOURS } from "@/lib/tours";

/**
 * A post with no inbound internal link is an orphan: Google can reach it from
 * the sitemap, but nothing on the site votes for it, so it ranks far below
 * pages of the same quality that are linked. This is the defect that left 24
 * money pages stranded before the related-tours fix, and it recurred silently
 * on four commercial pages -- marrakech-to-chefchaouen-tour-cost (position
 * 48.7), ourika-valley-day-trip-marrakech (73.5), family-desert-tour-morocco-
 * cost (63.5) and 7-day-agadir-itinerary-morocco -- because nothing checks it.
 *
 * A post counts as reachable if either:
 *   - another post links it in prose, or
 *   - a tour lists it in relatedPosts (the tour page renders those).
 *
 * Fix an orphan by linking it from where its topic is already discussed, not
 * by adding it to an arbitrary list.
 */

const src = readFileSync(join(__dirname, "..", "..", "lib", "blog.ts"), "utf-8");

const linkedFromPosts = new Set<string>();
for (const [, slug] of src.matchAll(/\]\(\/en\/blog\/([a-z0-9-]+)\)/g)) {
  linkedFromPosts.add(slug);
}

const linkedFromTours = new Set<string>();
for (const tour of TOURS) {
  for (const slug of tour.relatedPosts ?? []) linkedFromTours.add(slug);
}

describe("blog posts are reachable by internal links", () => {
  it("has no orphaned posts", () => {
    const orphans = BLOG_POSTS.map((p) => p.slug).filter(
      (slug) => !linkedFromPosts.has(slug) && !linkedFromTours.has(slug)
    );

    expect(
      orphans,
      `These posts have no inbound internal link, so nothing on the site votes\n` +
        `for them. Link each from a page already discussing its topic:\n  ` +
        orphans.join("\n  ")
    ).toEqual([]);
  });

  it("never links a blog slug that does not exist", () => {
    const real = new Set(BLOG_POSTS.map((p) => p.slug));
    const broken = [...linkedFromPosts].filter((s) => !real.has(s));
    expect(
      broken,
      `Prose links point at blog slugs with no post behind them:\n  ${broken.join("\n  ")}`
    ).toEqual([]);
  });
});
