import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { RATES } from "@/lib/currency-core";

/**
 * Tour prices are stored in USD and rendered in EUR (currency-core). Blog prose
 * that quotes the stored number with a euro sign therefore overstates the price
 * by ~9% — the article says €245 while the booking page beside it says €225.
 *
 * That shipped across all eight cost posts in six languages before this test
 * existed. Nothing else catches it: the number is valid TypeScript, the page
 * builds, and only a reader comparing the two notices.
 *
 * The rule enforced here: inside a post, a euro figure that exactly equals the
 * USD price of a tour that post links is always the bug. A correctly converted
 * figure never collides with the stored one (0.92 rate), and unrelated amounts
 * (MAD line items, sums) are not equal to a linked tour's USD price.
 */

const RATE = RATES.EUR;
const usdPrices = new Map(TOURS.map((t) => [t.slug, t.price]));

const FILES = [
  "blog.ts",
  "blog.fr.part2.ts",
  "blog.es.part2.ts",
  "blog.de.part2.ts",
  "blog.it.part2.ts",
  "blog.ar.part2.ts",
];

function readLib(f: string) {
  return readFileSync(join(__dirname, "..", "..", "lib", f), "utf-8");
}

/** Split a blog source file into per-post segments keyed by slug. */
function segments(src: string): Array<{ slug: string; body: string }> {
  const marks = [...src.matchAll(/\n {4}slug: "([^"]+)"/g)];
  return marks.map((m, i) => ({
    slug: m[1],
    body: src.slice(m.index!, i + 1 < marks.length ? marks[i + 1].index! : src.length),
  }));
}

describe("blog euro prices match tour data", () => {
  it("never quotes a linked tour's USD price as euros", () => {
    const offenders: string[] = [];

    for (const file of FILES) {
      for (const { slug, body } of segments(readLib(file))) {
        const linked = new Set([...body.matchAll(/\/tours\/([a-z0-9-]+)/g)].map((m) => m[1]));
        const linkedUsd = new Set(
          [...linked].map((t) => usdPrices.get(t)).filter((p): p is number => p !== undefined)
        );
        if (linkedUsd.size === 0) continue;

        // Both orders: "€245" (en) and "245 €" / "245 يورو" (fr/es/de/it/ar).
        const figures = [
          ...body.matchAll(/€\s?(\d[\d,]*)/g),
          ...body.matchAll(/(\d[\d,]*)\s?(?:€|يورو)/g),
        ].map((m) => Number(m[1].replace(/,/g, "")));

        for (const n of figures) {
          if (linkedUsd.has(n)) {
            offenders.push(`${file} :: ${slug} :: €${n} should be €${Math.round(n * RATE)}`);
          }
        }
      }
    }

    expect(
      [...new Set(offenders)],
      `Blog prose quotes a stored USD price as euros:\n  ${[...new Set(offenders)].join("\n  ")}`
    ).toEqual([]);
  });

  it("quotes the correct converted price for each linked tour", () => {
    // Spot-check the headline claim of every cost post: the post's own tour
    // price must appear, converted, somewhere in the body.
    const missing: string[] = [];
    const src = readLib("blog.ts");

    for (const { slug, body } of segments(src)) {
      if (!/cost|price/.test(slug)) continue;
      // Overview posts survey a price *range* across many tours rather than
      // quoting one trip, so there is no single figure to assert.
      if (/how-much-does-a/.test(slug)) continue;
      const own = [...body.matchAll(/\/tours\/([a-z0-9-]+)/g)].map((m) => m[1]);
      const primary = own.find((t) => usdPrices.has(t));
      if (!primary) continue;

      const eur = Math.round(usdPrices.get(primary)! * RATE);
      const shown = new RegExp(`€\\s?${eur.toLocaleString("en-US")}|€\\s?${eur}`);
      if (!shown.test(body)) {
        missing.push(`${slug}: expected €${eur} for ${primary}`);
      }
    }

    expect(missing, `Cost posts missing their own converted price:\n  ${missing.join("\n  ")}`).toEqual(
      []
    );
  });
});
