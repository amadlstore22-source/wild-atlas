import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The search-result description of a tour quotes its "from" price. Prices moved
 * to euros on 2026-09-29 and were raised since, but 18 translated
 * seoDescriptions still quoted the old dollar figure until 2026-10-23: the
 * Arabic 2-day Zagora tour said "from $415" in Google while the page charged
 * from €98 per person, and the French, Spanish, German and Italian family
 * desert tour said "from 607 $" against €526. price-locale-parity checks the
 * price fields, not this sentence, and the sentence is valid text in any
 * currency, so nothing failed. It was found while reading Search Console data.
 *
 * Rules, catalogue-wide: no dollar price in any translated tour description,
 * and every euro figure a translation quotes must be one the English
 * description of the same tour also quotes.
 */
const LIB = join(process.cwd(), "lib");
const FIELD = /seoDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/;
const USD = /\d[\d.,\s]*\$|\$\s*\d|US\$|دولار/;

function descriptions(file: string): Map<string, string> {
  const s = readFileSync(join(LIB, file), "utf8");
  const out = new Map<string, string>();
  const slugs = [...s.matchAll(/\n {4}slug: "([^"]+)"/g)];
  slugs.forEach((m, i) => {
    const block = s.slice(m.index!, slugs[i + 1]?.index ?? s.length);
    const d = block.match(FIELD);
    if (d) out.set(m[1], d[1]);
  });
  return out;
}

/** Euro amounts in a description, as integers ("1 030 €", "€1,030", "1.030 €" all give 1030). */
function euros(text: string): number[] {
  const found = [
    ...text.matchAll(/€\s?(\d[\d.,   ]*\d|\d)/g),
    ...text.matchAll(/(\d[\d.,   ]*\d|\d)\s?(?:€|يورو)/g),
  ];
  return found.map((m) => Number(m[1].replace(/[.,   ]/g, "")));
}

describe("tour search descriptions quote the real euro price", () => {
  const en = descriptions("tours.ts");

  it("no translated tour description quotes a dollar price", () => {
    const bad: string[] = [];
    for (const lang of ["fr", "es", "de", "it", "ar"]) {
      for (const [slug, d] of descriptions(`tours.${lang}.ts`)) if (USD.test(d)) bad.push(`${lang} ${slug}: …${d.slice(-50)}`);
    }
    expect(bad, "replace with the euro price the English seoDescription quotes").toEqual([]);
  });

  it("every euro figure in a translation is one the English description quotes", () => {
    const bad: string[] = [];
    for (const lang of ["fr", "es", "de", "it", "ar"]) {
      for (const [slug, d] of descriptions(`tours.${lang}.ts`)) {
        const ref = new Set(euros(en.get(slug) ?? ""));
        for (const n of euros(d)) if (!ref.has(n)) bad.push(`${lang} ${slug}: €${n} (English quotes ${[...ref].map((x) => "€" + x).join(", ") || "no price"})`);
      }
    }
    expect(bad, "the translated description disagrees with the English one; copy the English price").toEqual([]);
  });
});
