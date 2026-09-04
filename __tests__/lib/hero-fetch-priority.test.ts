import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * The LCP image on the tour, blog and category routes was marked with next/image's
 * `priority` prop. That emits a <link rel="preload"> in the head — and the tour
 * page really did carry one, at char 717 of the HTML, well before anything else
 * in the body. The image still was not fetched for two seconds: PageSpeed
 * measured Load Delay of 1,999ms on /en/tours/sahara-3day-marrakech and 2,133ms
 * on the shared Merzouga page (2026-08-16), the largest single component of a
 * 6.5s LCP.
 *
 * A plain preload carries NORMAL fetch priority. It queued behind the three
 * font preloads and the script preloads that sit above it in the head, so the
 * browser knew about the image early and still chose to fetch other things
 * first. Nothing in the markup said "this is the LCP element".
 *
 * `fetchPriority="high"` is the attribute that actually raises it. Next 16's own
 * docs say so — node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:
 * "In most cases, you should use loading='eager' or fetchPriority='high' instead
 * of preload" — and the same page deprecates `priority` outright in v16.
 *
 * Nothing catches this. `priority` is not an error, it is not removed, the page
 * builds, the preload tag is present in the HTML, and every existing test
 * passes. Only a waterfall shows the image waiting its turn.
 *
 * The assertion is deliberately two-sided. Marking every above-the-fold image
 * high priority is the same as marking none, so this checks both that the hero
 * IS high priority and that no route stacks several of them.
 */

const ROUTES = [
  "app/[lang]/tours/[slug]/page.tsx",
  "app/[lang]/tours/ToursClient.tsx",
  "app/[lang]/blog/[slug]/page.tsx",
  "app/[lang]/blog/page.tsx",
  "app/[lang]/categories/[category]/page.tsx",
];

function read(rel: string) {
  return fs.readFileSync(path.join(process.cwd(), rel), "utf8");
}

describe("LCP hero images are fetched at high priority", () => {
  for (const rel of ROUTES) {
    it(`${rel.split("/").slice(-2).join("/")} marks its hero fetchPriority="high"`, () => {
      const src = read(rel);
      expect(src).toMatch(/fetchPriority="high"/);
    });

    it(`${rel.split("/").slice(-2).join("/")} marks exactly one image high priority`, () => {
      const src = read(rel);
      const hits = src.match(/fetchPriority="high"/g) ?? [];
      // More than one and the browser has no way to tell which matters.
      expect(hits).toHaveLength(1);
    });

    it(`${rel.split("/").slice(-2).join("/")} no longer uses the deprecated priority prop`, () => {
      const src = read(rel);
      // `priority` was deprecated in Next 16. Strip comments first: this file's
      // own explanation of the fix contains the word, and matching prose would
      // make the test fail on its own documentation.
      const code = src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      // A bare JSX prop on its own line, or inline on an <Image>. Deliberately
      // does not match `priority={priority}` pass-throughs (TourCard forwards
      // one), which are a different concern.
      const bare = code.match(/^\s*priority\s*$|<Image[^>]*\spriority[\s/>]/gm) ?? [];
      expect(bare).toHaveLength(0);
    });
  }
});
