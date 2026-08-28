import { describe, it, expect } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { blogPostsFor } from "@/lib/blog-i18n";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * THE EMPTY-ARRAY TRAP, ACROSS THE WHOLE CATALOGUE
 *
 * mergeWithEn() in lib/tours-i18n.ts overlays any locale value that is not
 * undefined, null or "". An EMPTY ARRAY passes that guard. So `itinerary: []`
 * in a locale file type-checks, passes every test, builds, renders a page, and
 * silently ships a booking page with NO itinerary — the English fallback never
 * fires because the locale "supplied" a value.
 *
 * This was found while adding the 8-day fixed departure, and a guard was
 * written — but scoped to `t.fixedDeparture`, which is ONE tour of 47. That
 * scoping was the mistake. Verified by injecting `itinerary: []` into the
 * French 4-day Toubkal, a tour with no fixedDeparture:
 *
 *     tsc --noEmit      clean
 *     vitest run        402/402 passed
 *     next build        compiled successfully
 *     /fr/tours/...     shipped with the itinerary gone
 *
 * Nothing failed. The only visible symptom was "Mizane" appearing 4 times on
 * the French page against 8 on the English one — which nobody would ever check.
 *
 * AGENTS.md states the rule this violated: "Assert catalogue-wide, not on
 * today's change... Three defects here regressed on pages nobody was editing."
 * The 8-day tour was not special; the next tour translated is the one nobody
 * will measure.
 *
 * Asserted through toursFor() and blogPostsFor() — the functions the pages
 * actually call — so this tests the MERGED result a reader sees, not the
 * source file.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/** Array fields whose emptiness means a visibly broken page. */
const TOUR_ARRAYS = ["highlights", "includes", "excludes", "itinerary", "gallery"] as const;

describe("locale content integrity", () => {
  it("no tour renders an empty content array in any locale", () => {
    const empty: string[] = [];

    for (const lc of LOCALES) {
      for (const tour of toursFor(lc)) {
        for (const field of TOUR_ARRAYS) {
          const value = tour[field];
          if (Array.isArray(value) && value.length === 0) {
            empty.push(`${lc}/${tour.slug}: ${field}`);
          }
        }
      }
    }

    expect(
      empty,
      `These merged tours have an empty content array, so that section of the\n` +
        `page renders blank. The usual cause is a locale file supplying \`[]\` to\n` +
        `satisfy the Tour type: mergeWithEn() overlays any value that is not\n` +
        `undefined/null/"", and an EMPTY ARRAY passes that guard, so it BEATS the\n` +
        `English fallback rather than deferring to it.\n\n` +
        `Fix by translating the field properly. Do NOT "fix" it by deleting the\n` +
        `key — the Tour type requires these four, so tsc will reject that:\n  ` +
        empty.join("\n  "),
    ).toEqual([]);
  });

  it("no tour loses itinerary days in translation", () => {
    // A subtler version of the same defect: a locale that supplies SOME days
    // but not all. The page renders and looks plausible, but a French reader
    // gets a shorter trip than the English one describes — on a page where the
    // day count is the product.
    const short: string[] = [];
    const enBySlug = new Map(TOURS.map((t) => [t.slug, t]));

    for (const lc of LOCALES) {
      if (lc === "en") continue;
      for (const tour of toursFor(lc)) {
        const en = enBySlug.get(tour.slug);
        if (!en) continue;
        if (tour.itinerary.length !== en.itinerary.length) {
          short.push(
            `${lc}/${tour.slug}: ${tour.itinerary.length} days vs ${en.itinerary.length} in English`,
          );
        }
      }
    }

    expect(
      short,
      `These tours have a different number of itinerary days than the English\n` +
        `original, so one language is selling a different trip from another:\n  ` +
        short.join("\n  "),
    ).toEqual([]);
  });

  it("no tour loses inclusions or exclusions in translation", () => {
    // includes/excludes are the contractual part of the page. A locale that
    // drops an entry is not a cosmetic difference — it is a different offer.
    // Note tour-includes.<locale>.ts overrides these at display time for some
    // tours, so this checks the merged data, which is the fallback path.
    const drift: string[] = [];
    const enBySlug = new Map(TOURS.map((t) => [t.slug, t]));

    for (const lc of LOCALES) {
      if (lc === "en") continue;
      for (const tour of toursFor(lc)) {
        const en = enBySlug.get(tour.slug);
        if (!en) continue;
        for (const field of ["includes", "excludes"] as const) {
          if (tour[field].length !== en[field].length) {
            drift.push(
              `${lc}/${tour.slug}: ${field} has ${tour[field].length} vs ${en[field].length} in English`,
            );
          }
        }
      }
    }

    expect(
      drift.slice(0, 30),
      `These tours list a different number of inclusions or exclusions than the\n` +
        `English original. That is a contractual difference, not a stylistic one —\n` +
        `a customer reading one language is being offered something different:\n  ` +
        drift.slice(0, 30).join("\n  "),
    ).toEqual([]);
  });

  it("no blog post renders empty in any locale", () => {
    // blogPostsFor() falls back per POST rather than per field, so an empty
    // body here means the locale file itself carries one — still worth
    // asserting, because the failure mode is identical from the reader's side.
    const empty: string[] = [];
    const MIN_CONTENT = 200; // characters; anything shorter is not an article

    for (const lc of LOCALES) {
      for (const post of blogPostsFor(lc)) {
        if (!post.content || post.content.trim().length < MIN_CONTENT) {
          empty.push(`${lc}/${post.slug}: ${post.content?.trim().length ?? 0} chars`);
        }
        if (!post.title?.trim()) empty.push(`${lc}/${post.slug}: empty title`);
      }
    }

    expect(
      empty,
      `These posts render with no usable body in the locale shown. A published\n` +
        `URL with an empty article is worse than no page: it is indexed, it is\n` +
        `thin, and it drags the whole domain's quality signal down:\n  ` +
        empty.join("\n  "),
    ).toEqual([]);
  });

  it("every locale serves the full catalogue", () => {
    // A locale array shorter than English means pages that exist in one
    // language and 404 in another, which breaks the hreflang cluster.
    const counts = LOCALES.map((lc) => ({ lc, tours: toursFor(lc).length, posts: blogPostsFor(lc).length }));
    const enCounts = counts.find((c) => c.lc === "en")!;

    const mismatched = counts.filter(
      (c) => c.tours !== enCounts.tours || c.posts !== enCounts.posts,
    );

    expect(
      mismatched.map((c) => `${c.lc}: ${c.tours} tours / ${c.posts} posts`),
      `These locales do not serve the same number of pages as English ` +
        `(${enCounts.tours} tours / ${enCounts.posts} posts). hreflang declares ` +
        `them as alternates of each other, so a missing page breaks the cluster:`,
    ).toEqual([]);
  });
});
