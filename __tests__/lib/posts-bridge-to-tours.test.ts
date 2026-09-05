import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * /es/blog/what-is-a-riad drew 657 impressions and ZERO clicks over 90 days at
 * position 9.2 (Search Console API, 90d to 2 Sep 2026) — the site's third most
 * visible page. /it/blog/what-is-a-riad (143 impressions, position 9.0) and
 * /de/blog/what-is-a-kasbah (140, position 8.1) were identical: ranking on page
 * one, and carrying no link into the tour catalogue from their own body text.
 *
 * A reader arriving from "riad significado" got a definition and a dead end.
 * The English originals close by naming where you actually sleep in one of
 * these buildings; the translations dropped that closing move, and nothing
 * noticed because nothing checked it. Thirteen pages with real traffic were in
 * this state, four of them Toubkal guides — the site's best-converting subject,
 * where /en/blog/toubkal-guide-cost returns 3.5% CTR against a 0.54% average
 * precisely because it points somewhere.
 *
 * `relatedTours` does not count and is deliberately excluded below. It renders
 * as a sidebar widget; the measured behaviour of these pages — hundreds of
 * impressions, zero clicks — is what a dead end looks like whatever the sidebar
 * holds.
 *
 * Nothing else catches this. The pages build, the prose is correct in every
 * language, hreflang is clean, and the only symptom is a number in a dashboard.
 *
 * SCOPE. This asserts against a named list rather than every post, because the
 * catalogue holds ~110 posts × 6 locales and most carry little traffic. Adding
 * links to all of them would be exactly the low-value churn this work set out
 * to avoid. The list is every locale+slug that drew >=50 impressions in the
 * 90 days to 2 Sep 2026. Re-run `node scripts/seo/gsc-pull.mjs page 90` and
 * extend it when the traffic profile changes — a page that starts ranking is a
 * page that needs a way out.
 */

/** Locale + slug pairs measured at >=50 impressions, 90d to 2026-09-02. */
const HIGH_TRAFFIC: [locale: string, slug: string][] = [
  ["de", "alcohol-in-morocco"],
  ["en", "alcohol-in-morocco"],
  ["fr", "alcohol-in-morocco"],
  ["es", "alcohol-in-morocco"],
  ["en", "toubkal-weather-by-month"],
  ["de", "toubkal-weather-by-month"],
  ["fr", "toubkal-weather-by-month"],
  ["es", "toubkal-weather-by-month"],
  ["en", "toubkal-guide-cost"],
  ["fr", "toubkal-guide-cost"],
  ["es", "what-is-a-riad"],
  ["de", "what-is-a-riad"],
  ["it", "what-is-a-riad"],
  ["de", "what-is-a-kasbah"],
  ["es", "what-is-a-kasbah"],
  ["en", "best-sim-card-morocco-tourists"],
  ["it", "best-sim-card-morocco-tourists"],
  ["es", "best-sim-card-morocco-tourists"],
  ["en", "do-you-need-a-guide-to-climb-toubkal"],
  ["fr", "how-hard-is-toubkal-difficulty-guide"],
  ["de", "how-hard-is-toubkal-difficulty-guide"],
  ["es", "how-hard-is-toubkal-difficulty-guide"],
  ["en", "visiting-morocco-during-ramadan"],
  ["de", "visiting-morocco-during-ramadan"],
  ["ar", "morocco-food-guide-what-to-eat"],
  ["ar", "marrakech-to-chefchaouen-tour-cost"],
  ["en", "morocco-unesco-sites-film-locations"],
  ["es", "morocco-unesco-sites-film-locations"],
  ["de", "morocco-unesco-sites-film-locations"],
  ["en", "best-time-to-visit-paradise-valley"],
  ["en", "sahara-desert-from-agadir"],
  ["en", "toubkal-in-winter-what-to-expect"],
  ["en", "3-day-sahara-tour-cost-marrakech"],
  ["en", "paradise-valley-from-marrakech"],
];

const LOCALE_FILES: Record<string, string[]> = {
  en: ["lib/blog.ts"],
  fr: ["lib/blog.fr.part1.ts", "lib/blog.fr.part2.ts"],
  es: ["lib/blog.es.part1.ts", "lib/blog.es.part2.ts"],
  de: ["lib/blog.de.part1.ts", "lib/blog.de.part2.ts"],
  it: ["lib/blog.it.part1.ts", "lib/blog.it.part2.ts"],
  ar: ["lib/blog.ar.part1.ts", "lib/blog.ar.part2.ts"],
};

/** The source block for one post, or null when the slug is absent. */
function postBody(locale: string, slug: string): string | null {
  for (const rel of LOCALE_FILES[locale] ?? []) {
    const full = path.join(process.cwd(), rel);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, "utf8");

    const marks: { slug: string; at: number }[] = [];
    const re = /^\s{4}slug:\s*"([^"]+)"/gm;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) marks.push({ slug: m[1], at: m.index });

    const i = marks.findIndex((x) => x.slug === slug);
    if (i === -1) continue;
    const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
    return src.slice(marks[i].at, end);
  }
  return null;
}

describe("pages that rank offer a route into the catalogue", () => {
  it("every high-traffic post links a tour from its body text", () => {
    const deadEnds: string[] = [];
    const missing: string[] = [];

    for (const [locale, slug] of HIGH_TRAFFIC) {
      const body = postBody(locale, slug);
      if (body === null) {
        missing.push(`${locale}/${slug}`);
        continue;
      }
      // A prose link to a tour page or the filtered catalogue, in this post's
      // own locale. `relatedTours: [...]` is deliberately NOT matched — that is
      // the sidebar widget whose presence hid this defect.
      const linksTour = new RegExp(`\\]\\(/${locale}/tours[/?]`).test(body);
      if (!linksTour) deadEnds.push(`${locale}/${slug}`);
    }

    expect(
      missing,
      "These locale+slug pairs are in the high-traffic list but no longer exist\n" +
        "in the blog source. If a post was renamed or removed, update the list\n" +
        "at the top of this file:\n  " +
        missing.join("\n  "),
    ).toEqual([]);

    expect(
      deadEnds,
      "These posts rank in search and offer no way into the catalogue from\n" +
        "their own text, so a reader who lands on one leaves with nothing. A\n" +
        "`relatedTours` entry does not count — it renders as a sidebar widget\n" +
        "that search engines discount and readers skip. Close each post the way\n" +
        "the English versions do: name a specific tour that genuinely visits\n" +
        "what the article describes.\n  " +
        deadEnds.join("\n  "),
    ).toEqual([]);
  });
});
