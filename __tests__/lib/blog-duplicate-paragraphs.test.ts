import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * /de/blog/alcohol-in-morocco served its entire closing paragraph twice, back
 * to back -- the same two sentences and the same two tour links, repeated. The
 * French translation of the same post had it too. Verified on the live page,
 * not just in source.
 *
 * That page is the single highest-impression URL on the site: 1,415
 * impressions over 90 days in Search Console, against 9 clicks. It is the last
 * thing a reader sees before deciding whether to look at a tour, and it read
 * like a copy-paste error -- on the two locales nobody on the team reads back.
 *
 * Nothing catches this. It is valid TypeScript inside a template literal, the
 * post builds, renders, passes the hreflang audit, and reads correctly in
 * English, the locale that gets proofread. It came from a localisation pass
 * appending a closing paragraph that the translated body already ended with.
 *
 * Catalogue-wide across every locale file rather than scoped to this post: the
 * defect survived precisely because nobody was reading that post, and the next
 * one will be equally unwatched. The character floor keeps the assertion off
 * legitimately repeated short lines (a recurring heading, a one-line note)
 * while still catching any repeated real paragraph.
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

/** A repeated paragraph shorter than this is usually deliberate structure
 *  (a heading, a short recurring note), not a duplication bug. */
const MIN_PARAGRAPH_CHARS = 120;

function readLib(f: string) {
  return readFileSync(join(__dirname, "..", "..", "lib", f), "utf-8");
}

/** Split a blog source file into per-post segments keyed by slug.
 *  Same approach as blog-prices.test.ts, which reads these files rather than
 *  importing them (the locale catalogues are assembled from part files). */
function segments(src: string): Array<{ slug: string; body: string }> {
  const marks = [...src.matchAll(/\n {4}slug: "([^"]+)"/g)];
  return marks.map((m, i) => ({
    slug: m[1],
    body: src.slice(m.index!, i + 1 < marks.length ? marks[i + 1].index! : src.length),
  }));
}

/** The prose body of a post: everything inside its content template literal. */
function contentOf(body: string): string | null {
  const j = body.indexOf("content: `");
  if (j === -1) return null;
  const k = body.indexOf("`,", j + 10);
  if (k === -1) return null;
  return body.slice(j + 10, k);
}

const normalise = (p: string) => p.replace(/\s+/g, " ").trim();

describe("blog posts do not repeat a paragraph", () => {
  it("no post prints the same substantial paragraph twice in succession", () => {
    const offenders: string[] = [];

    for (const file of FILES) {
      for (const { slug, body } of segments(readLib(file))) {
        const content = contentOf(body);
        if (!content) continue;

        const paras = content.split("\n\n").map(normalise).filter(Boolean);
        for (let i = 0; i < paras.length - 1; i++) {
          if (paras[i] === paras[i + 1] && paras[i].length > MIN_PARAGRAPH_CHARS) {
            offenders.push(`${file} ${slug}: "${paras[i].slice(0, 60)}..."`);
            break;
          }
        }
      }
    }

    expect(
      offenders,
      `These posts print the same paragraph twice in a row, which reads as a\n` +
        `copy-paste error to every visitor on the page. Delete the second copy,\n` +
        `checking the surrounding structure against the English post -- that is\n` +
        `the locale that gets proofread:\n  ` + offenders.join("\n  "),
    ).toEqual([]);
  });
});
