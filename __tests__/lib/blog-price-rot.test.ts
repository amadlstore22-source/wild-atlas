import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { RATES } from "@/lib/currency-core";

/**
 * Blog prose quotes tour prices as plain text. When a tour is repriced the
 * prose does not move with it, and nothing fails: the number is a string in a
 * template literal, so tsc is happy, the page builds, and only a reader
 * comparing the article with the booking page beside it notices.
 *
 * That is how these shipped, across six locales:
 *
 *   sahara-3day-marrakech           said EUR 225, actual EUR 380  (-155/person)
 *   sahara-2day-agadir              said EUR 179, actual EUR 400  (-221/person)
 *   family-desert-4day-marrakech    said EUR 350, actual EUR 398
 *   toubkal-three-peaks-4000m-3day  said EUR 280, actual EUR 302
 *   desert-4day-agadir              said EUR 482, actual EUR 519  (English too)
 *   agafay-desert-sunset            said EUR  87, actual EUR  94
 *   toubkal-summit-sahara-5day      said EUR 635, actual EUR 644  (English only)
 *   toubkal-summit-trek-4day        said EUR 350, actual EUR 360  (FR + AR only)
 *
 * The 3-day Sahara and 2-day Agadir posts additionally still sold a "luxury
 * camp" — the claim removed from the tour pages on 2026-09-06, because the
 * rate buys the standard camp with a shared washing block and the en-suite
 * tent is +EUR 30pp. The tour page and the blog contradicted each other for
 * a day on the same tour.
 *
 * scripts/seo/audit-blog-tour-prices.ts existed the whole time and reported
 * these. It was never wired into the suite, so it only ever ran when somebody
 * remembered to run it — which is the actual reason the rot shipped. This test
 * is the wiring. It deliberately asserts on the SPECIFIC figures that were
 * wrong rather than re-running the whole audit: that script also flags market
 * ranges, DIY breakdowns and sums of two tours, all of which are legitimate,
 * so a blanket "audit must be empty" assertion would fail on correct copy and
 * be deleted within a week.
 */

const BLOG_DIR = join(process.cwd(), "lib");
const BLOG_FILES = readdirSync(BLOG_DIR).filter((f) =>
  /^blog(\.[a-z]{2})?(\.part\d)?\.ts$/.test(f)
);

const eur = (usd: number) => Math.round(usd * RATES.EUR);

function tierFor(slug: string, people: number): number {
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) throw new Error(`no such tour: ${slug}`);
  const tiers = tour.groupPricing ?? [{ minPeople: 1, price: tour.price }];
  const match = [...tiers].reverse().find((t) => t.minPeople <= people);
  return eur((match ?? tiers[0]).price);
}

/** The figures that were wrong, and what they should be. */
const FIXED = [
  { slug: "sahara-3day-marrakech", stale: 225, people: 2 },
  { slug: "sahara-2day-agadir", stale: 179, people: 2 },
  { slug: "family-desert-4day-marrakech", stale: 350, people: 4 },
  { slug: "toubkal-three-peaks-4000m-3day", stale: 280, people: 2 },
  { slug: "desert-4day-agadir", stale: 482, people: 2 },
  { slug: "agafay-desert-sunset", stale: 87, people: 2 },
  { slug: "toubkal-summit-sahara-5day", stale: 635, people: 2 },
] as const;

describe("blog price rot", () => {
  it("no post quotes a figure that was corrected, beside the tour it links to", () => {
    const failures: string[] = [];
    for (const file of BLOG_FILES) {
      const lines = readFileSync(join(BLOG_DIR, file), "utf8").split("\n");
      lines.forEach((line, i) => {
        for (const { slug, stale } of FIXED) {
          if (!line.includes(`/tours/${slug}`)) continue;
          // €225 / 225 € / 225 يورو — the shapes the six locales actually use.
          const money = new RegExp(`(?:€\\s?${stale}\\b|\\b${stale}\\s?(?:€|EUR|يورو))`);
          if (money.test(line)) {
            failures.push(`${file}:${i + 1} quotes €${stale} for ${slug}`);
          }
        }
      });
    }
    expect(
      failures,
      `These figures were corrected once. Each is a price a visitor would read\n` +
        `on the article and then not be charged:\n  ` + failures.join("\n  ")
    ).toEqual([]);
  });

  it("the corrected figures are still the tour's real price", () => {
    // Guards the other direction: if a tour is repriced again, this names the
    // posts that now need updating instead of letting them rot silently.
    const drifted = FIXED.filter(({ slug, people, stale }) => {
      const now = tierFor(slug, people);
      return now === stale;
    }).map(({ slug }) => slug);
    expect(
      drifted,
      `These tours have been repriced back to the figure the blog used to\n` +
        `quote, so the assertion above is now testing nothing. Re-check the\n` +
        `posts and update FIXED:\n  ` + drifted.join("\n  ")
    ).toEqual([]);
  });

  it("no tour page's own camp claim is contradicted by the blog", () => {
    // The 3-day Sahara and 2-day Agadir posts sold a "luxury camp" while the
    // tour pages said standard. Both tours run the same standard camp.
    const LUX = /camp de luxe|Luxuscamp|campamento de lujo|campo di lusso|luxury desert camp|مخيم فاخر/;
    const STANDARD_CAMP_TOURS = ["sahara-3day-marrakech", "sahara-2day-agadir"];
    const failures: string[] = [];
    for (const file of BLOG_FILES) {
      const lines = readFileSync(join(BLOG_DIR, file), "utf8").split("\n");
      lines.forEach((line, i) => {
        if (!LUX.test(line)) return;
        for (const slug of STANDARD_CAMP_TOURS) {
          if (line.includes(`/tours/${slug}`)) {
            failures.push(`${file}:${i + 1} sells a luxury camp on ${slug}`);
          }
        }
      });
    }
    expect(
      failures,
      `The rate buys the standard camp — private sleeping tent, shared washing\n` +
        `block, en-suite +€30pp. The tour pages were corrected on 2026-09-06;\n` +
        `these lines put the old claim back:\n  ` + failures.join("\n  ")
    ).toEqual([]);
  });
});
