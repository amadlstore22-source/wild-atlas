import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Two incidents found on 2 Nov 2026 while removing the mule from the 2-day
 * Toubkal trek (the owner: "the mule is not part of the 2 day").
 *
 * 1. The Arabic brief of the 2-day trek still quoted 185 / 175 / 165 for three,
 *    four and five people, a month after the 9 Oct price rise made them 241 /
 *    228 / 215. The Arabic 6-day Ifni circuit quoted the whole pre-rise ladder
 *    (790 ... 450 instead of 948 ... 540). price-locale-parity only compares the
 *    `price:` and `groupPricing` fields; prose is free text, so a number typed
 *    into a sentence never met a test. Both pages built and rendered, and only
 *    an Arabic reader comparing the brief with the price box would notice.
 *
 *    The rule: a brief is a translation, so it carries the same numbers as the
 *    English one -- prices, heights, distances. Checked catalogue-wide; when
 *    this was written every other tour already agreed, so a failure here is a
 *    real drift, not formatting.
 *
 * 2. The 2-day trek listed a "mule porter for group gear" in all six
 *    languages, twice in four of them (tours.<lang>.ts and tour-includes), and
 *    a client reply quoted it. There is no mule on the 2-day; walkers carry
 *    their own bag to the refuge.
 */

const LIB = join(process.cwd(), "lib");
const LOCALES = ["fr", "es", "de", "it", "ar"];

function blocks(file: string): Record<string, string> {
  const s = readFileSync(join(LIB, file), "utf8");
  const out: Record<string, string> = {};
  const re = /slug: "([^"]+)"/g;
  const hits = [...s.matchAll(re)];
  hits.forEach((m, i) => {
    out[m[1]] = s.slice(m.index! + m[0].length, i + 1 < hits.length ? hits[i + 1].index : s.length);
  });
  return out;
}

function brief(block: string): string | null {
  const m = /brief: \[([\s\S]*?)\n {4}\],/.exec(block);
  return m ? m[1] : null;
}

/** 4,167 / 4.167 / 4 167 -> 4167; Arabic-Indic digits -> ASCII; keep numbers >= 100. */
function numbers(text: string): number[] {
  const t = text
    .replace(/(?<=\d)[,.   ](?=\d{3}\b)/g, "")
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  return [...new Set((t.match(/\d+/g) ?? []).map(Number).filter((n) => n >= 100))].sort((a, b) => a - b);
}

describe("tour briefs", () => {
  it("carry the same numbers in every language as in English", () => {
    const en = blocks("tours.ts");
    const drift: string[] = [];
    for (const lang of LOCALES) {
      for (const [slug, block] of Object.entries(blocks(`tours.${lang}.ts`))) {
        const mine = brief(block);
        const theirs = en[slug] ? brief(en[slug]) : null;
        if (!mine || !theirs) continue;
        const a = numbers(theirs);
        const b = numbers(mine);
        const missing = a.filter((n) => !b.includes(n));
        const extra = b.filter((n) => !a.includes(n));
        if (missing.length || extra.length) {
          drift.push(`tours.${lang}.ts ${slug}: English has ${missing.join(", ") || "-"}; ${lang} has ${extra.join(", ") || "-"} instead`);
        }
      }
    }
    expect(
      drift,
      `These translated briefs quote numbers the English brief does not (usually a price\n` +
        `ladder left behind by a price change). Copy the English figures into the sentence:\n  ` +
        drift.join("\n  "),
    ).toEqual([]);
  });
});

describe("the 2-day Toubkal trek", () => {
  const MULE = /\bmule|muletier|mulet\b|\bmula\b|mulero|muletero|maultier|\bmulo\b|mulattier|بغل|بغّال|حمّال|\bporter\b|porteur|porteador|träger|portatore/i;
  const SLUG = "toubkal-summit-2day-marrakech";

  it("has no mule or porter in any language", () => {
    const found: string[] = [];
    for (const file of ["tours.ts", ...LOCALES.map((l) => `tours.${l}.ts`)]) {
      const block = blocks(file)[SLUG];
      if (block && MULE.test(block)) found.push(file);
    }
    for (const lang of LOCALES) {
      const s = readFileSync(join(LIB, `tour-includes.${lang}.ts`), "utf8");
      const start = s.indexOf(`"${SLUG}": {`);
      const block = start < 0 ? "" : s.slice(start, s.indexOf("\n  },", start));
      if (MULE.test(block)) found.push(`tour-includes.${lang}.ts`);
    }
    expect(found, `The 2-day trek has no mule (owner, 2026-11-02). Remove it from:\n  ${found.join("\n  ")}`).toEqual([]);
  });
});
