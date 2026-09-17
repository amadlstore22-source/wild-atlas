import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import es from "@/dictionaries/es.json";
import de from "@/dictionaries/de.json";
import itDict from "@/dictionaries/it.json";
import ar from "@/dictionaries/ar.json";
// `it` is vitest's test function, so the Italian dictionary is aliased.

/**
 * A TOUR BRIEF MUST EXIST IN EVERY LOCALE, AND MUST NOT BE THE ENGLISH ONE.
 *
 * WHY THE BRIEF EXISTS. Search Console, 90 days to 2026-09-14:
 *
 *              impressions   clicks    CTR    avg position
 *   blog            27,509      474   1.72%           19.2
 *   tours            2,494       74   2.97%           71.4
 *
 * Tour pages convert BETTER than blog posts once seen — they are simply never
 * seen. 3.2% of tour-page impressions came from page one, against 48.9% for
 * the blog. Same domain, same authority, so the difference is not trust: a
 * tour entry averaged 379 words of copy against 1,000–1,750 in a post, and the
 * thinnest tour pages carried barely 200. Nothing on a tour page was indexable
 * prose. `brief` is that prose, added 2026-09-17 to the ten highest-demand
 * tours.
 *
 * THE FAILURE THIS GUARDS. `mergeWithEn` in lib/tours-i18n.ts falls back to
 * the English value for any field a locale file omits. That fallback is
 * deliberate and it is why the field could ship English-first — but it also
 * means a missing translation is INVISIBLE. The page renders, the build
 * passes, the heading is correctly translated, and five of six language
 * versions quietly serve five paragraphs of English prose to a French,
 * Spanish, German, Italian or Arabic reader.
 *
 * This is not hypothetical. It is exactly what happened to the meals claim in
 * September 2026: corrected in English only, and the other five locales kept
 * the wrong wording for three days until a Spanish enquiry arrived and someone
 * read the /es/ page. See meals-claim-locale-consistency.test.ts.
 *
 * WHY NOTHING ELSE CATCHES IT. tsc sees a valid `string[]` either way. The
 * locale merge is doing what it was designed to do. Every page renders. The
 * only way to see it is to compare the localised text against the English
 * text, which is what this does.
 *
 * IF THIS FAILS: translate the brief for the named locale in
 * lib/tours.<locale>.ts. Do not delete the English brief to make it pass, and
 * do not relax the comparison — an English paragraph on a /de/ page is the
 * defect, not the assertion.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;

// The dictionaries are inferred from JSON, so each has its own literal shape
// and they do not unify — hence `unknown` before narrowing to the one field
// this test reads. Casting straight to the Record is a TS2352 under the
// build's stricter check, which `tsc -p tsconfig.json` alone does not apply.
const DICTS = { en, fr, es, de, it: itDict, ar } as unknown as Record<
  string,
  { tourDetail: Record<string, string> }
>;

/** Tours given a brief on 2026-09-17, chosen by 90-day impressions + clicks. */
const TOURS_WITH_BRIEF = [
  "toubkal-summit-2day-marrakech",
  "toubkal-circuit-ifni-lake-6day",
  "azzaden-valley-2day-trek",
  "family-desert-4day-marrakech",
  "sahara-2day-agadir",
  "merzouga-stargazing-desert-tour",
  "atlas-mountains-3day-trek",
  "family-atlas-4day-trek",
  "shared-zagora-2day-marrakech",
  "mgoun-massif-trek",
] as const;

describe("Tour brief", () => {
  it.each(TOURS_WITH_BRIEF)("%s has an English brief", (slug) => {
    const tour = TOURS.find((t) => t.slug === slug);
    expect(tour, `${slug} is not in the English catalogue`).toBeTruthy();
    expect(
      tour!.brief?.length ?? 0,
      `${slug} lost its brief. It was added because tour pages average ` +
        `position 71 with 379 words against the blog's 19 with 1,000+. ` +
        `Removing the prose removes the reason the page can rank.`,
    ).toBeGreaterThanOrEqual(4);
  });

  it.each(TOURS_WITH_BRIEF)(
    "%s has a real translation in every locale, not the English fallback",
    (slug) => {
      const enTour = TOURS.find((t) => t.slug === slug);
      const enBrief = (enTour?.brief ?? []).join(" ");
      const failures: string[] = [];

      for (const lang of LOCALES) {
        const localised = toursFor(lang).find((t) => t.slug === slug);
        if (!localised) {
          failures.push(`[${lang}] tour missing from catalogue`);
          continue;
        }

        const brief = localised.brief ?? [];
        if (brief.length === 0) {
          failures.push(`[${lang}] has no brief at all`);
          continue;
        }

        // The merge substitutes the English array wholesale when the locale
        // file omits the field, so an exact match IS the fallback.
        if (brief.join(" ") === enBrief) {
          failures.push(
            `[${lang}] is serving the ENGLISH brief — lib/tours.${lang}.ts ` +
              `has no \`brief\` for this tour, so mergeWithEn fell back`,
          );
        }
      }

      expect(
        failures,
        `Tour brief has not reached every locale:\n  ${failures.join("\n  ")}\n\n` +
          `The brief is the only indexable prose on a tour page. An English ` +
          `one on a /fr/ or /ar/ page is worse than none: it neither ranks in ` +
          `that language nor reads as ours.`,
      ).toEqual([]);
    },
  );

  it("every locale dictionary has the heading the section renders", () => {
    const missing = Object.entries(DICTS)
      .filter(([, d]) => !d.tourDetail?.briefHeading)
      .map(([lang]) => lang);

    expect(
      missing,
      `Missing tourDetail.briefHeading in: ${missing.join(", ")}. ` +
        `TourBrief renders dict.tourDetail.briefHeading as its <h2>; without ` +
        `it the section ships with an empty heading.`,
    ).toEqual([]);
  });

  it("no brief silently duplicates its related blog post's angle", () => {
    // The brief targets transactional intent and the post informational. They
    // are allowed to cover the same trip, but an identical opening sentence
    // means one was pasted from the other, which puts two of our own URLs in
    // one auction.
    const openings = new Map<string, string>();
    const clashes: string[] = [];

    for (const slug of TOURS_WITH_BRIEF) {
      const tour = TOURS.find((t) => t.slug === slug);
      const first = (tour?.brief?.[0] ?? "").slice(0, 60);
      if (!first) continue;
      const seen = openings.get(first);
      if (seen) clashes.push(`${slug} opens identically to ${seen}`);
      openings.set(first, slug);
    }

    expect(clashes, clashes.join("\n")).toEqual([]);
  });
});
