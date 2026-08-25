import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards against SEO metadata being copied from English into the locale files
 * and never translated.
 *
 * This actually happened: 15 tours shipped with an English `seoTitle` in all
 * five locale files (and 5 of them an English `seoDescription` too), so the
 * <title> tag and meta description -- the two things Google shows in the SERP
 * -- were English on the French, Spanish, German, Italian and Arabic pages.
 * `title` was translated, so the on-page H1 looked right and it stayed hidden.
 *
 * It hit ALL FIVE shared tours, which are the cheapest, highest-volume
 * products, i.e. exactly the pages we most want ranking in those markets.
 *
 * The block-splitting below matters: an earlier ad-hoc check used a regex that
 * ran past the end of a tour and matched the NEXT tour's seoTitle, which made
 * the bug look absent. Always bound the search to one tour.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;
const ROOT = join(__dirname, "..", "..");

type Block = { slug: string; body: string };

function tourBlocks(file: string): Map<string, string> {
  const src = readFileSync(join(ROOT, "lib", file), "utf8");
  const marks = [...src.matchAll(/\n {4}slug: "([^"]+)"/g)];
  const out = new Map<string, string>();
  marks.forEach((m, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index! : src.length;
    out.set(m[1], src.slice(m.index!, end));
  });
  return out;
}

function field(body: string | undefined, name: string): string | null {
  if (!body) return null;
  const m = body.match(new RegExp(`\\n {4}${name}: "([^"]+)"`));
  return m ? m[1] : null;
}

const EN = tourBlocks("tours.ts");

describe("tour SEO metadata is actually translated", () => {
  for (const loc of LOCALES) {
    const L = tourBlocks(`tours.${loc}.ts`);

    it(`${loc}: no seoTitle is identical to the English one`, () => {
      const same: string[] = [];
      for (const slug of EN.keys()) {
        const en = field(EN.get(slug), "seoTitle");
        const tr = field(L.get(slug), "seoTitle");
        if (en && tr && en === tr) same.push(slug);
      }
      expect(same, `untranslated seoTitle in ${loc}`).toEqual([]);
    });

    it(`${loc}: no seoDescription is identical to the English one`, () => {
      const same: string[] = [];
      for (const slug of EN.keys()) {
        const en = field(EN.get(slug), "seoDescription");
        const tr = field(L.get(slug), "seoDescription");
        if (en && tr && en === tr) same.push(slug);
      }
      expect(same, `untranslated seoDescription in ${loc}`).toEqual([]);
    });
  }
});

describe("shared-tour prices survive translation", () => {
  // The price is part of the SERP title for the shared tours -- it is the hook.
  // A translator rewriting the sentence must not drop or change the number.
  const PRICES: Record<string, string> = {
    "shared-merzouga-3day-marrakech": "€120",
    "shared-zagora-2day-marrakech": "€85",
    "shared-ouzoud-waterfalls-day-trip": "€40",
    "shared-agafay-dinner-camel-ride": "€30",
    "shared-essaouira-day-trip": "€30",
  };

  for (const loc of LOCALES) {
    const L = tourBlocks(`tours.${loc}.ts`);
    it(`${loc}: keeps the advertised price in every shared-tour seoTitle`, () => {
      for (const [slug, price] of Object.entries(PRICES)) {
        const title = field(L.get(slug), "seoTitle");
        expect(title, `${slug} missing seoTitle in ${loc}`).toBeTruthy();
        expect(title, `${slug} lost ${price} in ${loc}`).toContain(price);
      }
    });
  }
});
