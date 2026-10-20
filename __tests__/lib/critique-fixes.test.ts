import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Design critique, 2026-10-20 (.impeccable/critique, score 28/40). Each of
 * these shipped, built cleanly and passed every test, and was only visible in
 * a browser:
 *
 * 1. A blank 256px band under the footer on every page. `section { padding-
 *    block }` in globals.css also padded Sonner's empty <section aria-live>
 *    toaster, which sits after the footer.
 * 2. `.eyebrow` was unlayered CSS, and unlayered CSS beats every Tailwind v4
 *    utility. "eyebrow text-brass-glow" on the navy Why Us band rendered deep
 *    saffron at 2.3:1, and the hero label on the photo the same. (The heading
 *    default hit the identical trap earlier; see the note in globals.css.)
 * 3. Text at 9.3-9.9px (card category labels, badges, "Sister brand"), worst
 *    in Arabic, where tracked labels also pulled joined letters apart.
 */
const ROOT = join(__dirname, "..", "..");
const CSS = readFileSync(join(ROOT, "app", "globals.css"), "utf8");

function tsx(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? tsx(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

describe("critique fixes stay fixed", () => {
  it("live regions never get the layout section padding", () => {
    if (/(^|\n)section\s*\{[^}]*padding/.test(CSS)) {
      expect(CSS, "A global `section` padding rule needs `section[aria-live] { padding-block: 0 }` or the toaster opens a blank band under the footer")
        .toMatch(/section\[aria-live\]\s*\{\s*padding-block:\s*0/);
    }
  });

  it(".eyebrow is layered, so a colour utility on the same element wins", () => {
    const unlayered = CSS.replace(/@layer\s+\w+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
    expect(unlayered, "Move .eyebrow into @layer components; unlayered it overrides text-* utilities (2.3:1 saffron on navy)")
      .not.toMatch(/(^|\n)\s*\.eyebrow\s*\{/);
  });

  it("Arabic labels are not letter-spaced", () => {
    expect(CSS).toMatch(/\[dir="rtl"\][^{]*tracking-[^{]*\{\s*letter-spacing:\s*0/);
  });

  it("no text below 11px", () => {
    // The MET monogram in the logo mark is a logotype, not text to read.
    const ALLOWED = [/className="text-\[0\.\d+rem\] font-extrabold tracking-\[0\.06em\] leading-none text-surface" aria-hidden>MET</];
    const bad: string[] = [];
    for (const p of [...tsx(join(ROOT, "components")), ...tsx(join(ROOT, "app"))]) {
      const src = readFileSync(p, "utf8");
      for (const line of src.split("\n")) {
        const m = line.match(/text-\[(\d+(?:\.\d+)?)(px|rem)\]/);
        if (!m || ALLOWED.some((a) => a.test(line))) continue;
        const px = m[2] === "rem" ? parseFloat(m[1]) * 16 : parseFloat(m[1]);
        if (px < 11) bad.push(`${relative(ROOT, p).replace(/\\/g, "/")}: ${m[0]} (${px}px)`);
      }
    }
    expect(bad, `Use micro-text (11px, 13px in Arabic) or text-xs instead:\n  ${bad.join("\n  ")}`).toEqual([]);
  });
});
