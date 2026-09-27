import { describe, it, expect } from "vitest";
import { blogPostsFor } from "@/lib/blog-i18n";
import { getTourFor, toursFor, tourSlugFor } from "@/lib/tours-i18n";
import { toCardData } from "@/lib/tours";
import { splitBeforeFirstH2 } from "@/lib/blog-trip-box";
import type { Locale } from "@/app/[lang]/dictionaries";

const LOCALES: Locale[] = ["en", "fr", "de", "es", "it", "ar"];

/**
 * Blog → tour hand-off, measured 2026-09-27 on a 390px phone.
 *
 * 80% of Search clicks land on blog posts, but the only tour cards sat after
 * the FAQ, 12-15 screens down. On /de/ and /es/ Toubkal posts (~70 clicks a
 * month) the first tour link of any kind was 55-59% of the way down. The fix
 * is BlogTripBox, placed before the first <h2>, fed by relatedTours[0].
 *
 * A post whose first related slug does not resolve in its locale renders no
 * box and nothing fails, so the gap is silent. Hence the catalogue-wide check.
 */
describe("blog trip box", () => {
  it("keeps the intro and the first section intact when splitting", () => {
    expect(splitBeforeFirstH2("<p>intro</p>\n<h2>One</h2><p>a</p><h2>Two</h2>")).toEqual([
      "<p>intro</p>",
      "<h2>One</h2><p>a</p><h2>Two</h2>",
    ]);
    expect(splitBeforeFirstH2("<h2>One</h2>")).toEqual(["", "<h2>One</h2>"]);
    expect(splitBeforeFirstH2("<p>only</p>")).toEqual(["<p>only</p>", ""]);
  });

  it("every post with related tours has a main tour that resolves in its locale", () => {
    const missing: string[] = [];
    for (const lang of LOCALES) {
      for (const post of blogPostsFor(lang)) {
        const first = post.relatedTours?.[0];
        if (first && !getTourFor(lang, first)) missing.push(`${lang}/${post.slug} → ${first}`);
      }
    }
    expect(
      missing,
      `These posts would show no trip box because relatedTours[0] is not a tour\n` +
        `in that locale. Fix the slug or reorder relatedTours:\n  ` + missing.join("\n  "),
    ).toEqual([]);
  });
});

/**
 * Tour cards linked `/${lang}/tours/${tour.slug}` — the ENGLISH slug — on
 * every localised page, so each click from a /de/ blog post went through a
 * 308 to /de/tours/<localizedSlug>. Valid code, the page still arrived, so
 * neither the build nor a click-through noticed; only a redirect trace did.
 */
describe("tour card links", () => {
  it("point straight at the URL each locale serves the tour at", () => {
    const wrong: string[] = [];
    for (const lang of LOCALES) {
      for (const tour of toursFor(lang)) {
        const card = toCardData(tour);
        const linked = card.localizedSlug ?? card.slug;
        const served = tourSlugFor(lang, tour.slug);
        if (linked !== served) wrong.push(`${lang}: card → ${linked}, served at ${served}`);
      }
    }
    expect(wrong, `Cards must carry localizedSlug through toCardData():\n  ` + wrong.join("\n  ")).toEqual([]);
  });
});
