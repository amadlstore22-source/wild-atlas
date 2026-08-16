import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Two LCP defects measured on 2026-08-16, both of which passed typecheck,
 * build, and the whole test suite. PageSpeed mobile scored 76 on the homepage
 * and 82 on /en/tours.
 *
 * 1. HOMEPAGE — LCP 6.8s, of which 6,075ms was "element render delay" while
 *    load delay and load time were both 0. The LCP element was the <h1>, and
 *    it carried Motion's `initial={{ opacity: 0 }}`. Chromium excludes
 *    elements with opacity 0 from LCP consideration entirely
 *    (web.dev/articles/lcp), so the headline could not be counted until React
 *    hydrated and Motion ran. Nothing was slow to download — the text was
 *    hidden. Fixed by animating the hero copy with CSS keyframes
 *    (.hero-rise), which paint with the document.
 *
 * 2. /en/tours — LCP 4.7s with a 2,000ms "resource load delay". The hero
 *    image was correctly marked `priority`, but so were the first three tour
 *    cards. next/image emits a <link rel="preload"> for every priority image,
 *    so four images competed for the mobile connection and the real LCP
 *    element was starved. Every other page preloaded exactly one image.
 *
 * The rule both share: exactly one above-the-fold image gets `priority`, and
 * above-the-fold TEXT is never animated from opacity 0.
 */

const ROOT = join(__dirname, "..", "..");

/** Components that render a page's first screen. */
const ABOVE_FOLD = [
  "components/sections/Hero.tsx",
  "app/[lang]/tours/ToursClient.tsx",
].filter((f) => existsSync(join(ROOT, f)));

describe("LCP guards", () => {
  it("never animates hero headings from opacity 0", () => {
    const offenders: string[] = [];

    for (const rel of ABOVE_FOLD) {
      const src = readFileSync(join(ROOT, rel), "utf-8");
      // A motion.h1 anywhere in a first-screen component is the defect,
      // regardless of how the initial prop is spelled.
      if (/<motion\.h1\b/.test(src)) {
        offenders.push(
          `${rel}: <motion.h1> — the page's LCP element must paint with the ` +
            `document. Use the .hero-rise CSS classes instead.`
        );
      }
    }

    expect(offenders, `Hero heading animated in JS:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });

  it("marks at most one image per screen as priority", () => {
    const offenders: string[] = [];

    for (const rel of ABOVE_FOLD) {
      // Strip comments first: these files explain the defect in prose, and the
      // word "priority" in a comment is not a preload.
      const src = readFileSync(join(ROOT, rel), "utf-8")
        .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/[^\n]*/g, "");
      // Count `priority` used as a bare prop or set truthy on an <Image>.
      const count = (src.match(/\bpriority(?:\s*=\s*\{?\s*true\s*\}?)?(?=[\s/>])/g) ?? []).length;
      if (count > 1) {
        offenders.push(
          `${rel}: ${count} priority images. next/image preloads each one, and ` +
            `they compete with the real LCP element for the connection.`
        );
      }
    }

    expect(offenders, `Competing image preloads:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });

  it("never passes priority to a card component in a list", () => {
    // The exact shape of the /en/tours defect: priority granted to the first
    // N items of a mapped list, all of which are below the fold.
    const offenders: string[] = [];
    const files = [
      "app/[lang]/tours/ToursClient.tsx",
      "app/[lang]/blog/BlogClient.tsx",
    ].filter((f) => existsSync(join(ROOT, f)));

    for (const rel of files) {
      const src = readFileSync(join(ROOT, rel), "utf-8");
      const m = src.match(/priority=\{\s*\w+\s*[<>=]{1,3}\s*\d+\s*\}/g);
      if (m) offenders.push(`${rel}: ${m.join(", ")}`);
    }

    expect(
      offenders,
      `Cards in a list granted priority — they are below the fold:\n  ${offenders.join("\n  ")}`
    ).toEqual([]);
  });
});
