import { describe, expect, it } from "vitest";
import { TOUR_HUB_DESTINATIONS, toursForDestination } from "@/lib/destination-tours";
import { destinationsFor } from "@/lib/destinations-i18n";
import { TOURS } from "@/lib/tours";

/**
 * Search Console, 2026-11-15: four English destination pages (High Atlas,
 * Sahara, Fes, Chefchaouen) were never indexed and had 0 impressions, while
 * the other four destination pages were indexed. Each of the four was titled
 * "X Travel Guide" and laid out like the blog post "X Travel Guide 2026" next
 * to it, so Google kept the post and dropped the page as a repeat. Nothing in
 * the build catches that: the pages rendered fine, in six languages.
 *
 * They were turned into tour pages (tours and prices first, titled as tours,
 * linking to the blog guide). This test keeps them from drifting back to a
 * "guide" title in any language, and checks every hub still has tours to lead
 * with: a tour hub with no tours is an empty page at the top.
 */
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const GUIDE_WORDS = /\b(travel guide|guide de voyage|guide du|guía|guida|reiseführer)\b|دليل/i;

describe("destination tour hubs", () => {
  it("each hub exists in every language and is titled as tours, not as a guide", () => {
    const problems: string[] = [];
    for (const slug of TOUR_HUB_DESTINATIONS) {
      for (const locale of LOCALES) {
        const d = destinationsFor(locale).find((x) => x.slug === slug);
        if (!d) problems.push(`${locale}/${slug}: missing`);
        else if (GUIDE_WORDS.test(d.seoTitle)) problems.push(`${locale}/${slug}: "${d.seoTitle}"`);
      }
    }
    expect(
      problems,
      "These tour-hub pages are missing or titled as a travel guide again, which repeats the blog guide\n" +
        "Google already prefers. Give them a tours-and-prices title (see lib/destination-tours.ts):\n  " +
        problems.join("\n  "),
    ).toEqual([]);
  });

  it("each hub has tours to show at the top", () => {
    const empty = [...TOUR_HUB_DESTINATIONS].filter((slug) => {
      const d = destinationsFor("en").find((x) => x.slug === slug);
      return !d || toursForDestination(TOURS, d).length === 0;
    });
    expect(empty, `These tour hubs would open with no tours: ${empty.join(", ")}`).toEqual([]);
  });
});
