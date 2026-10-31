import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Mountain heights and road claims in the catalogue must match their sources.
 *
 * Found 2026-10-31 while quoting a family a 3-day trek: every locale said the
 * Tizi Mzik pass is 2,684 m (sources give 2,450–2,490 m, usually 2,489 m, and
 * the terrain along our own trek-maps.json route peaks at ~2,472 m). The
 * 3-day village trek said "nothing above about 2,700 m", but its own route
 * map goes Tacheddirt → Ourika over the Tizi n'Tacheddirt, ~3,172 m
 * (SummitPost, TourHQ), a pass that holds snow in winter. Both numbers went
 * out word for word in client emails. Separately, the Essaouira page said
 * transfers take "2.5 hours on the A7 motorway"; the A7 runs Casablanca–
 * Marrakech–Agadir and does not reach Essaouira.
 *
 * Nothing caught any of it: a wrong height is valid TypeScript, the page
 * builds, and only someone who knows the mountains notices.
 *
 * The checks read the raw source of every tour, blog and destination file in
 * every locale, so they hold for pages nobody is editing today.
 * Fix a failure by correcting the prose. Change a range below only with a
 * cited source in this docblock.
 */

const LIB = path.resolve(__dirname, "../../lib");
const FILES = readdirSync(LIB).filter((f) => /^(tours|blog|destinations)(\.[a-z]{2})?(\.part\d)?\.ts$/.test(f));
const SOURCES = FILES.map((f) => ({ file: f, text: readFileSync(path.join(LIB, f), "utf8") }));

// A height written after the pass name, in any locale's number style:
// "2,489 m", "2.489 m", "2 489 m" (normal, no-break or narrow no-break
// space), "2,489 متر". Up to 40 characters may sit between name and number.
const NUM = String.raw`(\d)[.,   ]?(\d{3})\s?(?:m\b|متر|م\b)`;

const PASSES: { name: string; pattern: RegExp; min: number; max: number }[] = [
  { name: "Tizi Mzik", pattern: /Tizi[\s-]Mzik|تيزي مزيك/g, min: 2450, max: 2500 },
  { name: "Tizi n'Tacheddirt", pattern: /Tizi n['’]Tacheddirt|تيزي ن['’]تاشدّيرت/g, min: 3140, max: 3200 },
];

function heightsAfter(text: string, pattern: RegExp): { value: number; context: string }[] {
  const found: { value: number; context: string }[] = [];
  for (const m of text.matchAll(pattern)) {
    // Stop at the next place ("→ Tizi Oussem (1,850 m)") so its height is not
    // read as the pass's.
    const tail = text
      .slice(m.index! + m[0].length, m.index! + m[0].length + 60)
      .split(/→|←|Tizi|تيزي/)[0];
    const n = new RegExp(`^[^\\n]{0,40}?${NUM}`).exec(tail);
    if (n) found.push({ value: Number(n[1] + n[2]), context: (m[0] + tail).slice(0, 70) });
  }
  return found;
}

describe("pass heights", () => {
  for (const pass of PASSES) {
    it(`${pass.name} is written between ${pass.min} and ${pass.max} m everywhere`, () => {
      const wrong: string[] = [];
      for (const { file, text } of SOURCES) {
        for (const h of heightsAfter(text, pass.pattern)) {
          if (h.value < pass.min || h.value > pass.max) wrong.push(`${file}: ${h.value} m in "${h.context}"`);
        }
      }
      expect(
        wrong,
        `${pass.name} is ${pass.min}–${pass.max} m (see the docblock for sources). Correct these:\n  ` +
          wrong.join("\n  "),
      ).toEqual([]);
    });
  }

  it("the 3-day village trek never claims a ceiling below the Tizi n'Tacheddirt", () => {
    const wrong: string[] = [];
    for (const { file, text } of SOURCES.filter((s) => s.file.startsWith("tours"))) {
      const start = text.indexOf('slug: "atlas-mountains-3day-trek"');
      if (start < 0) continue;
      const end = text.indexOf('slug: "', start + 10);
      const block = text.slice(start, end < 0 ? undefined : end);
      for (const m of block.matchAll(/2[.,   ]?700\s?(?:m\b|متر|م\b)/g)) {
        wrong.push(`${file}: "${block.slice(Math.max(0, m.index! - 40), m.index! + 12)}"`);
      }
    }
    expect(
      wrong,
      `The 3-day trek's own route crosses the Tizi n'Tacheddirt (~3,170 m) on day 3, so a\n` +
        `"nothing above 2,700 m" claim misleads the families it is sold to. Remove these:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });

  it("no page puts Essaouira on the A7 motorway", () => {
    const wrong: string[] = [];
    for (const { file, text } of SOURCES) {
      text.split("\n").forEach((line, i) => {
        if (/Essaouira|الصويرة/.test(line) && /\bA7\b/.test(line)) wrong.push(`${file}:${i + 1}`);
      });
    }
    expect(
      wrong,
      `The A7 runs Casablanca–Marrakech–Agadir and does not reach Essaouira. Give the\n` +
        `drive time without the road name on these lines:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });
});
