import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Until 2026-10-23 every translated blog post and tour page carried its FAQ
 * under an English heading, "Frequently asked questions", on the Spanish,
 * German, French, Italian and Arabic pages alike: FaqSection defaults to that
 * string and the blog and tour pages never passed a title. It showed up while
 * reading Search Console data, as an English <h2> on a Spanish page Google
 * ranks at position 10. The build cannot see it, because the default is valid.
 *
 * Every FaqSection under app/[lang] must pass a title built from the page's
 * dictionary (dict.contact.faqTitle), never rely on the English default or a
 * hard-coded English phrase.
 */
const ROOT = join(__dirname, "..", "..", "app", "[lang]");

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? tsxFiles(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

describe("FAQ headings are translated", () => {
  it("every <FaqSection> on a localised page passes a dictionary title", () => {
    const bad: string[] = [];
    for (const f of tsxFiles(ROOT)) {
      const src = readFileSync(f, "utf8");
      for (const m of src.matchAll(/<FaqSection\b[^>]*\/>/g)) {
        if (!/title=\{[^}]*dict\./.test(m[0]) && !/title=\{`[^`]*\$\{dict\./.test(m[0])) {
          bad.push(`${f.slice(ROOT.length)}: ${m[0]}`);
        }
      }
    }
    expect(bad, "pass title={dict.contact.faqTitle} (or build it from dict) so the heading matches the page language").toEqual([]);
  });
});
