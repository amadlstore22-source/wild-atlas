import { describe, it, expect } from "vitest";
import { TOURS, lowestGroupPrice, groupPriceTiers } from "@/lib/tours";
import { buildAggregateOffer } from "@/lib/seo/schema";
import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import es from "@/dictionaries/es.json";
import de from "@/dictionaries/de.json";
import itDict from "@/dictionaries/it.json";
import ar from "@/dictionaries/ar.json";
// `it` is vitest's test function, so the Italian dictionary is aliased.

/**
 * Measured live on 2026-08-26, the priority commercial pages were serving
 * titles of 88-97 characters and descriptions of 164-280. Google truncates a
 * SERP title near 60 characters and a description near 155, so the 3-day Sahara
 * page was losing roughly 45% of its description -- including the entire price
 * ladder ("EUR690 for one traveller, EUR380 each for two...") that was the most
 * persuasive thing on the listing. The 2-day Toubkal page lost its closing
 * trust line the same way.
 *
 * Nothing caught it. The strings are valid TypeScript, every page builds and
 * renders, the hreflang audit passes, and the truncation is invisible unless
 * someone counts characters or looks at a live SERP.
 *
 * The budget is not 60 flat. `seoTitle` carries "| Marrakech Eco Tours" inline
 * AND app/[lang]/layout.tsx appends the same suffix via its title template, so
 * the tour page strips the inline copy before rendering. What Google sees is
 * the stripped title PLUS the 22-character brand, which is what BRAND is for
 * below -- a check against the raw field would pass at 60 and still ship at 82.
 *
 * Scoped to the whole catalogue on purpose: the three pages fixed today are not
 * special, and the next tour added is the one nobody will measure.
 */

const BRAND = " | Marrakech Eco Tours";
const STRIP_BRAND = /\s*\|\s*Marrakech Eco Tours\s*$/;

/** What Google actually renders: field with the inline brand stripped, then the
 *  template's suffix appended exactly once. Mirrors the tour page's own logic. */
function renderedTitle(seoTitle: string): string {
  return seoTitle.replace(STRIP_BRAND, "") + BRAND;
}

// Titles are allowed a little slack over the nominal 60: Google measures in
// pixels, not characters, and a title in the low 60s is rarely clipped. The
// limit exists to catch the 80-97 character strings, not to police 61.
const TITLE_MAX = 65;
const DESC_MAX = 160;

describe("SERP title and description length", () => {
  it("no tour title is truncated once the brand suffix is appended", () => {
    const tooLong = TOURS.filter((t) => t.seoTitle)
      .map((t) => ({ slug: t.slug, len: renderedTitle(t.seoTitle!).length }))
      .filter((t) => t.len > TITLE_MAX)
      .sort((a, b) => b.len - a.len);

    expect(
      tooLong,
      `These seoTitles exceed ${TITLE_MAX} chars once " | Marrakech Eco Tours"\n` +
        `is appended by the layout template, so Google clips the end off the\n` +
        `SERP listing. Shorten the seoTitle field (budget ~39 chars before the\n` +
        `brand) -- do not change the template, it is brand-critical:\n  ` +
        tooLong.map((t) => `${t.slug} (${t.len})`).join("\n  "),
    ).toEqual([]);
  });

  it("no tour description is truncated in the SERP snippet", () => {
    const tooLong = TOURS.filter((t) => t.seoDescription)
      .map((t) => ({ slug: t.slug, len: t.seoDescription!.length }))
      .filter((t) => t.len > DESC_MAX)
      .sort((a, b) => b.len - a.len);

    expect(
      tooLong,
      `These seoDescriptions exceed ${DESC_MAX} chars, so Google truncates them\n` +
        `mid-sentence. Anything after the cut -- prices, cancellation terms,\n` +
        `trust signals -- is never seen. Rewrite so the persuasive part lands\n` +
        `in the first ${DESC_MAX} characters:\n  ` +
        tooLong.map((t) => `${t.slug} (${t.len})`).join("\n  "),
    ).toEqual([]);
  });
});

/**
 * /[lang]/tours hardcoded an English title and description for all six locales,
 * so /fr/tours served French content under "All Tours - Morocco Adventures" and
 * every translation competed on one identical string -- precisely what the
 * hreflang cluster declared two lines below was meant to prevent.
 *
 * This is a REPEAT of a defect already fixed on /about, which still carries the
 * note: "These were hardcoded English, so /fr/about served French content under
 * an English <title>". The tours index kept the bug because nothing checked it.
 * That is the second occurrence, so the assertion covers every seo.* key rather
 * than just seo.tours.
 */
describe("per-locale SEO strings", () => {
  const DICTS = { en, fr, es, de, it: itDict, ar } as Record<string, { seo: Record<string, { title?: string; description?: string }> }>;
  const NON_EN = ["fr", "es", "de", "it", "ar"];

  it("every seo section present in English exists in all six locales", () => {
    const missing: string[] = [];
    for (const key of Object.keys(en.seo)) {
      // guideTitleSuffix is a bare string, not a {title, description} section.
      if (typeof (en.seo as Record<string, unknown>)[key] === "string") continue;
      for (const lc of NON_EN) {
        if (!DICTS[lc].seo?.[key]) missing.push(`${lc}.seo.${key}`);
      }
    }
    expect(
      missing,
      `These locales fall back to English metadata, so the translated page\n` +
        `competes against its own siblings on one identical <title>. Add the\n` +
        `key to the matching dictionaries/*.json:\n  ` + missing.join("\n  "),
    ).toEqual([]);
  });

  it("no locale reuses the English title verbatim", () => {
    const copied: string[] = [];
    for (const key of Object.keys(en.seo)) {
      const enSection = (en.seo as Record<string, { title?: string }>)[key];
      if (typeof enSection === "string" || !enSection?.title) continue;
      for (const lc of NON_EN) {
        const t = DICTS[lc].seo?.[key]?.title;
        // Brand-led titles legitimately share the company name across locales;
        // only an exact match means the string was never translated.
        if (t && t === enSection.title) copied.push(`${lc}.seo.${key}: "${t}"`);
      }
    }
    expect(
      copied,
      `These titles are byte-identical to English, which means the locale is\n` +
        `serving untranslated metadata over translated content:\n  ` + copied.join("\n  "),
    ).toEqual([]);
  });
});

/**
 * The meta descriptions now lead with the cheapest tier ("From EUR260 pp for
 * 6+"). `tour.price` is the SOLO rate -- on the 4-day Toubkal that is EUR650
 * against EUR260 at six people. A plain Offer carrying tour.price therefore
 * contradicted the visible headline price, and Google cross-checks
 * structured-data prices against the page.
 *
 * The listing cards shipped this exact bug once already: they showed tour.price
 * and advertised EUR1,800 for a trek a group of five pays EUR695 for, which is
 * why lowestGroupPrice() exists. Reading tour.price in the schema would
 * reintroduce it in the one place no human reviewer ever looks.
 */
describe("AggregateOffer spans the real price ladder", () => {
  it("lowPrice matches the cheapest tier, never the solo rate", () => {
    const wrong = TOURS.filter((t) => {
      const tiers = groupPriceTiers(t);
      if (tiers.length < 2) return false;
      const low = lowestGroupPrice(t).price;
      return low >= t.price;
    }).map((t) => t.slug);

    // A multi-tier ladder must get cheaper; if it does not, either the tiers are
    // mis-sorted or the tour is priced flat and should not declare tiers.
    expect(
      wrong,
      `These tours have multiple price tiers but no tier cheaper than the solo\n` +
        `rate, so AggregateOffer.lowPrice would advertise the most expensive\n` +
        `figure. Check groupPricing is sorted ascending by minPeople:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });

  it("collapses to a plain Offer when the ladder is flat", () => {
    const flat = buildAggregateOffer({
      low: 100, high: 100, currency: "EUR",
      url: "https://x/t", validUntil: "2027-01-01",
    });
    expect(flat["@type"]).toBe("Offer");
    expect(flat).not.toHaveProperty("lowPrice");
  });

  it("declares the group size that unlocks lowPrice", () => {
    // The return type is a union (Offer | AggregateOffer); widen to read the
    // AggregateOffer-only keys without asserting the discriminant away.
    const spread = buildAggregateOffer({
      low: 260, high: 650, currency: "EUR",
      url: "https://x/t", validUntil: "2027-01-01", minPeople: 6,
    }) as Record<string, unknown>;
    expect(spread["@type"]).toBe("AggregateOffer");
    expect(spread.lowPrice).toBe("260");
    expect(spread.highPrice).toBe("650");
    // Without eligibleQuantity the "for 6+" qualifier in the meta description
    // has no machine-readable counterpart, and lowPrice reads as unconditional.
    expect(spread.eligibleQuantity).toEqual({
      "@type": "QuantitativeValue", minValue: 6, unitCode: "IE",
    });
  });
});
