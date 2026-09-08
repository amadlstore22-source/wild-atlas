import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Measured on 2026-09-08: 470 blog pages carrying Search Console impressions
 * were serving a title or description that Google truncates -- 21,326
 * impressions between them, roughly 74% of the site's total.
 *
 * The clearest case was /es/blog/what-is-a-riad: 667 impressions at position
 * 9.2 and ZERO clicks in 90 days, with a 71-character title cut mid-phrase.
 * Ranking on page one and earning nothing is a snippet problem, not a ranking
 * problem, and nothing on the site was measuring it.
 *
 * seo-meta-length.test.ts has measured length since 2026-08-26, but only over
 * TOURS (tour.seoTitle) and, since the gallery fix, the dictionary seo.* keys.
 * Blog posts are a third metadata source and were covered by neither, which is
 * how 595 over-length titles accumulated past a green suite.
 *
 * TWO MEASUREMENT TRAPS, both of which produced wrong numbers before being
 * caught, and both of which this test is shaped to avoid:
 *
 *   - Locale source files store non-ASCII as \\uXXXX escapes. Counting the raw
 *     source makes "\\u0627" six characters instead of one, which made every
 *     Arabic title look 3-4x over the limit when the rendered page was fine
 *     (ar/sahara-desert-weather measured 65/129 live, entirely correct).
 *     decodeLiteral below unescapes before counting.
 *   - Some seoTitles carry " | Marrakech Eco Tours" inline AND the layout
 *     appends it via the title template; the blog page strips the inline copy
 *     before rendering. 36 posts do this. Measuring the raw field would report
 *     a length the page never serves, so the inline brand is stripped here
 *     exactly as the page does it.
 *
 * Catalogue-wide over every blog source file. The limits are the same ones
 * seo-meta-length.test.ts uses, so all three metadata sources now answer to
 * one rule.
 */

const FILES = [
  "blog.ts",
  "blog.fr.part1.ts",
  "blog.fr.part2.ts",
  "blog.es.part1.ts",
  "blog.es.part2.ts",
  "blog.de.part1.ts",
  "blog.de.part2.ts",
  "blog.it.part1.ts",
  "blog.it.part2.ts",
  "blog.ar.part1.ts",
  "blog.ar.part2.ts",
];

const BRAND = " | Marrakech Eco Tours";
const STRIP_BRAND = /\s*\|\s*Marrakech Eco Tours\s*$/;

// Same slack as the tour suite: Google measures pixels, not characters, and a
// title in the low 60s is rarely clipped. The limit exists to catch the 80-110
// character strings, not to police 61.
const TITLE_MAX = 65;
const DESC_MAX = 160;

// Every post is inside the limits as of 2026-09-08; there are no exceptions.
// If one is ever needed, add it here with the reason and the impressions it
// carries -- and remove it again as soon as the copy is rewritten.
const GRANDFATHERED = new Set<string>([]);
function readLib(f: string) {
  return readFileSync(join(__dirname, "..", "..", "lib", f), "utf-8");
}

function localeOf(file: string): string {
  const m = /^blog\.([a-z]{2})\./.exec(file);
  return m ? m[1] : "en";
}

/** Decode a JS string literal body to the text the page actually renders. */
function decodeLiteral(lit: string): string {
  return lit
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

/** What Google receives: inline brand stripped, template suffix appended once.
 *  Mirrors the blog page's own logic. */
function renderedTitle(seoTitle: string): string {
  return seoTitle.replace(STRIP_BRAND, "") + BRAND;
}

const FIELD = /(seoTitle|seoDescription):\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;

function posts(src: string): Array<{ slug: string; body: string }> {
  const marks = [...src.matchAll(/\n {4}slug: "([^"]+)"/g)];
  return marks.map((m, i) => ({
    slug: m[1],
    body: src.slice(m.index!, i + 1 < marks.length ? marks[i + 1].index! : src.length),
  }));
}

interface Row { key: string; title?: string; desc?: string }

function allRows(): Row[] {
  const rows: Row[] = [];
  for (const file of FILES) {
    const loc = localeOf(file);
    for (const { slug, body } of posts(readLib(file))) {
      const head = body.slice(0, 2500);
      const row: Row = { key: `${loc}/${slug}` };
      for (const m of head.matchAll(FIELD)) {
        const value = decodeLiteral(m[2]);
        if (m[1] === "seoTitle" && row.title === undefined) row.title = value;
        if (m[1] === "seoDescription" && row.desc === undefined) row.desc = value;
      }
      rows.push(row);
    }
  }
  return rows;
}

describe("blog SERP snippet lengths", () => {
  const rows = allRows();

  it("finds blog posts to check", () => {
    expect(rows.length).toBeGreaterThan(300);
  });

  it("no blog title is truncated once the brand suffix is applied", () => {
    const tooLong = rows
      .filter((r) => r.title && !GRANDFATHERED.has(r.key))
      .map((r) => ({ key: r.key, len: renderedTitle(r.title!).length }))
      .filter((r) => r.len > TITLE_MAX)
      .sort((a, b) => b.len - a.len);

    expect(
      tooLong,
      `These blog seoTitles exceed ${TITLE_MAX} characters once\n` +
        `" | Marrakech Eco Tours" is applied, so Google clips the end off the\n` +
        `listing. Shorten the title -- budget is ~${TITLE_MAX - BRAND.length} characters before the\n` +
        `brand. Keep the term the page ranks for at the FRONT and drop the\n` +
        `trailing clause; that is where the cut lands anyway:\n  ` +
        tooLong.map((r) => `${r.key} (${r.len})`).join("\n  "),
    ).toEqual([]);
  });

  it("no blog description is truncated in the SERP snippet", () => {
    const tooLong = rows
      .filter((r) => r.desc && !GRANDFATHERED.has(r.key))
      .map((r) => ({ key: r.key, len: r.desc!.length }))
      .filter((r) => r.len > DESC_MAX)
      .sort((a, b) => b.len - a.len);

    expect(
      tooLong,
      `These blog seoDescriptions exceed ${DESC_MAX} characters, so the snippet\n` +
        `is cut mid-sentence and everything after the cut -- prices, place\n` +
        `names, the specifics that earn the click -- is never read. Trim at a\n` +
        `clause boundary so it still reads as finished prose:\n  ` +
        tooLong.map((r) => `${r.key} (${r.len})`).join("\n  "),
    ).toEqual([]);
  });
});
