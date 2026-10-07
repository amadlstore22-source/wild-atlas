import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * An SEO scan (2026-10-07) reported "The <img> tag does not have an ALT
 * attribute defined" on /de/blog/solo-female-travel-morocco-guide. The image
 * was the tour thumbnail in BlogTripBox, which shipped alt="" — present on
 * every blog post that carries a trip box, in all six locales. The events
 * pages had the same pattern on their trip and "other events" cards.
 *
 * alt="" is valid HTML and was chosen because the title sits next to the
 * photo, but scanners report it as missing and Google gets no description of
 * the image. FeaturedGuides had already been fixed for the same reason. Every
 * card photo now uses the title it illustrates.
 *
 * Nothing else catches this: the page builds and renders the same.
 *
 * The only exception is GalleryLightbox's preloader: a 1px, aria-hidden copy
 * of the next photo, which has its own alt once it is on screen. A second
 * description there would just repeat it.
 */
const ALLOWED = new Set(["components/ui/GalleryLightbox.tsx"]);

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return tsxFiles(p);
    return p.endsWith(".tsx") ? [p] : [];
  });
}

describe("image alt text", () => {
  it("no rendered image ships an empty alt", () => {
    const root = process.cwd();
    const offenders = ["app", "components"]
      .flatMap((d) => tsxFiles(join(root, d)))
      .map((f) => relative(root, f).replace(/\\/g, "/"))
      .filter((f) => !ALLOWED.has(f))
      .flatMap((f) =>
        readFileSync(join(root, f), "utf8")
          .split("\n")
          // Skip comments that mention alt="" (e.g. FeaturedGuides' history note).
          .map((line, i) => ({ line, i }))
          .filter(({ line }) => /\balt=(""|\{""\})/.test(line) && !/^\s*(\/\/|\*|\{\/\*)/.test(line))
          .map(({ i }) => `${f}:${i + 1}`),
      );
    expect(
      offenders,
      `These images have alt="". SEO scanners report that as a missing alt, and\n` +
        `Google gets no description of the photo. Use the title or name of what\n` +
        `the image shows (as BlogTripBox does with alt={title}):\n  ` +
        offenders.join("\n  "),
    ).toEqual([]);
  });
});
