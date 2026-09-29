import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { REVIEWS } from "@/lib/reviews";

/**
 * THE INCIDENT (found 2026-09-29): the three "genuine" reviews on the site —
 * homepage testimonials, booking-sidebar quotes and named Review schema on
 * three tours in six languages — were the site template's placeholder
 * testimonials. The initial commit shipped five of them with Unsplash stock
 * portraits; a later commit turned two into 4-star reviews "with realistic
 * minor criticism". They stayed live for three months.
 *
 * Nothing caught it: the text is plausible, the schema validates, and every
 * earlier test checked that the reviews were ATTRIBUTED correctly, never that
 * they were REAL. A test cannot prove a review is real, so this one holds the
 * line it can: each review must name its source, and the known fabricated
 * names and stock-photo hosts may never come back.
 */
const TEMPLATE_NAMES = ["Katherine L.", "Marco B.", "Emily C.", "Thomas M.", "Amelia S."];
const ROOT = join(__dirname, "..", "..");

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) sourceFiles(p, out);
    else if (/\.(ts|tsx|json)$/.test(name)) out.push(p);
  }
  return out;
}

describe("reviews are real", () => {
  it("every review says where it came from and how the guest agreed", () => {
    for (const r of REVIEWS) {
      expect(r.source?.trim().length ?? 0, `${r.name}: add a source (who, where, when permission was given)`).toBeGreaterThan(10);
      expect(r.source, `${r.name}: Tripadvisor terms forbid copying its reviews; use its widget`).not.toMatch(/tripadvisor/i);
    }
  });

  it("the template's fabricated reviewers never return", () => {
    const found: string[] = [];
    for (const dir of ["app", "components", "lib", "dictionaries"]) {
      for (const f of sourceFiles(join(ROOT, dir))) {
        const src = readFileSync(f, "utf8");
        for (const n of TEMPLATE_NAMES) {
          // lib/reviews.ts names them in the docblock explaining the removal.
          if (f.endsWith(join("lib", "reviews.ts"))) continue;
          if (src.includes(`"${n}"`) || src.includes(`— ${n}`)) found.push(`${f.slice(ROOT.length + 1)}: ${n}`);
        }
      }
    }
    expect(found, `Template (fake) reviewers are back:\n  ${found.join("\n  ")}`).toEqual([]);
    for (const r of REVIEWS) expect(TEMPLATE_NAMES).not.toContain(r.name);
  });

  it("no review text is attached to a stock photo", () => {
    const reviewsSrc = readFileSync(join(ROOT, "lib", "reviews.ts"), "utf8");
    expect(reviewsSrc).not.toMatch(/images\.unsplash\.com|pexels\.com|istockphoto/);
  });
});
