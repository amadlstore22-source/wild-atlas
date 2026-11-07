import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { TOURS } from "@/lib/tours";

/**
 * The 4-day Marrakech desert tour does not add time in the dunes.
 *
 * Found 2026-11-07, while writing the 3-day vs 4-day comparison post after
 * Clarity's AI report showed answers citing other sites for exactly that
 * comparison. Our own 3-day cost post told readers, in its FAQ and its body
 * and in all six languages: "If you want more time in the dunes rather than
 * the car, the 4-day route adds a night". It does add a night, but in an
 * Ouarzazate hotel on the way home. Both tours spend one night at the same
 * Erg Chebbi camp. A reader who booked the 4-day for a second dune night
 * would not get one, and AI assistants repeat FAQ answers word for word.
 *
 * Nothing caught it: the sentence is valid TypeScript, the page builds, and
 * only someone holding the two itineraries side by side notices.
 *
 * Two checks:
 *   1. The catalogue still matches the claim this test protects: each tour
 *      has exactly one desert-camp night. If the owner adds a second camp
 *      night to the 4-day tour, this fails first. Then update the posts and
 *      this docblock rather than deleting the test.
 *   2. No sentence that links to the 4-day Marrakech tour promises more
 *      dune or desert time, in any locale.
 */

const FOUR = "desert-4day-marrakech";
const THREE = "sahara-3day-marrakech";

const LIB = path.resolve(__dirname, "../../lib");
const POSTS = readdirSync(LIB)
  .filter((f) => /^blog(\.[a-z]{2}\.part\d)?\.ts$/.test(f))
  .map((f) => ({ file: f, text: readFileSync(path.join(LIB, f), "utf8") }));

// Localised URL segments of the 4-day tour, read from proxy.ts so a new
// locale slug is covered without editing this file.
const PROXY = readFileSync(path.resolve(__dirname, "../../proxy.ts"), "utf8");
const FOUR_SEGMENTS = [
  FOUR,
  ...[...PROXY.matchAll(new RegExp(`"${FOUR}":\\s*"([a-z0-9-]+)"`, "g"))].map((m) => m[1]),
];

// "More time in the dunes", as each locale has phrased it. A sentence that
// says "rather than more time in the dunes" is a correct statement and is
// excluded below.
const MORE_DUNES = [
  /more (time in the )?dunes?\b|more dune time|second night in the dunes/i,
  /plus de dunes|plus de temps dans les dunes/i,
  /más dunas|más tiempo entre (las )?dunas/i,
  /mehr Zeit in den Dünen|mehr Dünenzeit|lieber mehr Dünenzeit/i,
  /più dune|più tempo tra le dune/i,
  /كثبانًا أكثر|وقتًا أطول بين الكثبان/,
];
const NEGATED = /rather than more|statt mehr|piuttosto che più|plutôt que plus|en lugar de más|does not give|n'apporte pas|no da|nicht bringt|non dà|لا يمنحه/i;

describe("4-day Marrakech desert tour: one night in the dunes", () => {
  it("both Marrakech tours have exactly one desert-camp night", () => {
    const camps = (slug: string) => {
      const t = TOURS.find((x) => x.slug === slug);
      expect(t, `tour ${slug} is missing from lib/tours.ts`).toBeTruthy();
      return (t!.itinerary ?? []).filter((d) => /camp/i.test(d.stay ?? "")).length;
    };
    expect(camps(FOUR), `${FOUR} no longer has exactly one camp night; update the posts, then this test`).toBe(1);
    expect(camps(THREE), `${THREE} no longer has exactly one camp night; update the posts, then this test`).toBe(1);
  });

  it("no sentence linking to the 4-day tour promises more time in the dunes", () => {
    const bad: string[] = [];
    for (const { file, text } of POSTS) {
      // Sentence-ish chunks: split on sentence ends and blank lines, then
      // rejoin hard-wrapped lines so a link and its claim stay together.
      const chunks = text.replace(/\r?\n(?!\r?\n)/g, " ").split(/(?<=[.!?؟])\s+|\n\s*\n/);
      for (const c of chunks) {
        const linksFour = FOUR_SEGMENTS.some((s) => c.includes(`/tours/${s})`));
        if (!linksFour || NEGATED.test(c)) continue;
        if (MORE_DUNES.some((re) => re.test(c))) bad.push(`${file}: ${c.trim().slice(0, 160)}`);
      }
    }
    expect(
      bad,
      `These sentences say the 4-day Marrakech tour gives more time in the dunes.\n` +
        `It does not: its extra night is in Ouarzazate on the way home. Say that\n` +
        `instead (see /en/blog/3-day-vs-4-day-sahara-tour-marrakech):\n  `,
    ).toEqual([]);
  });
});
