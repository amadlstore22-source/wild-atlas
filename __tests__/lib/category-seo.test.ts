import { describe, it, expect } from "vitest";
import { CATEGORIES, type Category } from "@/lib/tours";
import { getToursByCategoryFor, getCategoryFor } from "@/lib/tours-i18n";
import { categorySeoFor } from "@/lib/category-seo";

/**
 * 2026-10-20: the owner searched Google for "sahara desert tours from
 * marrakech" and MET was not in the first three pages. The page built for that
 * search, /en/categories/desert, was titled "Desert Tours | Marrakech Eco
 * Tours" with an h1 of "Desert Tours", and in 90 days of Search Console data it
 * had no impressions for a single desert-tour query. The operators who do rank
 * put the whole phrase in the title and the heading. Every other locale and
 * category had the same bare label ("Wüstentouren", "Circuits Désert").
 *
 * Nothing caught it: a one-word title is valid, short and builds. This holds
 * every category page in every locale to a search title that is longer than
 * its label, fits the results page once the brand is appended, and has every
 * number filled from the live tours (a stale "from €X" is what blog-price-rot
 * exists for).
 */
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const BRAND = " | Marrakech Eco Tours";

describe("category pages carry a real search title", () => {
  const rows = LOCALES.flatMap((lang) =>
    CATEGORIES.map((c) => {
      const tours = getToursByCategoryFor(lang, c.id as Category);
      return { lang, id: c.id, label: getCategoryFor(lang, c.id as Category)!.label, tours, seo: categorySeoFor(lang, c.id as Category, tours) };
    }),
  );

  it("every category in every locale has a title, heading and description", () => {
    const missing = rows.filter((r) => r.tours.length && !r.seo).map((r) => `${r.lang}/${r.id}`);
    expect(missing, `Add these to lib/category-seo.ts:\n  ${missing.join("\n  ")}`).toEqual([]);
  });

  it("the title says more than the bare label, and fits the results page", () => {
    const bad = rows.flatMap((r) => {
      if (!r.seo) return [];
      const out: string[] = [];
      if (r.seo.title.trim() === r.label.trim()) out.push(`${r.lang}/${r.id}: title is just the label "${r.label}"`);
      if ((r.seo.title + BRAND).length > 65) out.push(`${r.lang}/${r.id}: title ${(r.seo.title + BRAND).length} chars with the brand (max 65)`);
      if (r.seo.description.length > 160) out.push(`${r.lang}/${r.id}: description ${r.seo.description.length} chars (max 160)`);
      if (r.seo.description.length < 70) out.push(`${r.lang}/${r.id}: description only ${r.seo.description.length} chars`);
      return out;
    });
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("every number is filled from the live tours", () => {
    const bad = rows.filter((r) => r.seo && /\{\w+\}/.test(r.seo.title + r.seo.heading + r.seo.description)).map((r) => `${r.lang}/${r.id}`);
    expect(bad, `Unfilled placeholder in:\n  ${bad.join("\n  ")}`).toEqual([]);
    for (const r of rows) {
      if (!r.seo) continue;
      const from = Math.min(...r.tours.map((t) => Math.min(...(t.groupPricing ?? [{ minPeople: 1, price: t.price }]).map((g) => g.price))));
      expect(r.seo.description, `${r.lang}/${r.id} must quote the lowest live price, ${from}`).toMatch(new RegExp(`(€${from}|${from} €)`));
    }
  });
});
