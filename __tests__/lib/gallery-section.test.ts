import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * THE HOMEPAGE GALLERY IS A HAND-CURATED LIST NOTHING VALIDATED
 *
 * hero-images.test.ts checks tour.heroImage and tour.gallery, and
 * blog-inline-images.test.ts checks images placed inside articles. The PHOTOS
 * array in components/sections/Gallery.tsx was covered by neither: a typo in a
 * path there renders a broken tile on the homepage, and nothing in typecheck
 * or `next build` notices, because Next resolves /public at request time.
 *
 * That matters more here than almost anywhere else on the site. This section
 * exists to prove the trips are real — its own docblock records that it once
 * contained a medina doorway captioned as Sahara dunes, and an Unsplash file
 * loaded from someone else's CDN. A broken tile in a section whose entire
 * argument is "these are our own photographs" undercuts the claim it is making.
 *
 * The alt-text minimum is not cosmetic either. These are the only images on
 * the site with no surrounding prose to give them context, so the alt string
 * is the whole description for a screen-reader user and the only thing image
 * search can read.
 *
 * NOT asserted, and it cannot be: that the photograph shows what the alt text
 * says. Only a human opening the file can check that. This gallery folder has
 * repeatedly contained files whose names lie — destinations-sahara.jpg is
 * Monument Valley in Arizona, toubkal-summit-sunrise-ridge.jpg is two walkers
 * among autumn walnut trees, and toubkal-cirque-stream-scree-slopes.jpg is the
 * Toubkal Refuge building. Open the image before you list it.
 */

const ROOT = join(__dirname, "..", "..");
const GALLERY_TSX = join(ROOT, "components", "sections", "Gallery.tsx");
const PUBLIC = join(ROOT, "public");

/** Every { src, alt } entry in the PHOTOS array. */
function galleryEntries() {
  const src = readFileSync(GALLERY_TSX, "utf-8");
  const start = src.indexOf("const PHOTOS = [");
  const end = src.indexOf("\n];", start);
  const block = src.slice(start, end);

  return [...block.matchAll(/\{\s*src:\s*"([^"]+)"\s*,\s*alt:\s*"([^"]*)"/g)].map((m) => ({
    src: m[1],
    alt: m[2],
  }));
}

describe("homepage gallery", () => {
  it("every photograph exists on disk", () => {
    const missing = galleryEntries()
      .filter((p) => p.src.startsWith("/") && !existsSync(join(PUBLIC, p.src)))
      .map((p) => p.src);

    expect(
      missing,
      `These gallery photographs point at files that are not in public/. The\n` +
        `homepage still builds and renders — the visitor just gets a broken\n` +
        `tile, in the one section whose entire purpose is showing that our\n` +
        `trips are real:\n  ` + missing.join("\n  "),
    ).toEqual([]);
  });

  it("every photograph is first-party, never a remote stock URL", () => {
    // The section's own docblock records that an Unsplash file was once listed
    // here. A stock photo of a place we run trips to actively contradicts the
    // claim this section makes.
    const remote = galleryEntries()
      .filter((p) => /^https?:\/\//i.test(p.src))
      .map((p) => p.src);

    expect(
      remote,
      `These gallery entries load from an external host. This section says\n` +
        `"photographs from our own trips" — a stock image here is not a\n` +
        `stylistic choice, it is a false claim, and it also leaves the CSP and\n` +
        `next/image remotePatterns as the only thing standing between the\n` +
        `homepage and a third-party CDN outage:\n  ` + remote.join("\n  "),
    ).toEqual([]);
  });

  it("every photograph has descriptive alt text naming a place", () => {
    // These images carry no surrounding prose, so alt is the entire
    // description — for a screen reader and for image search.
    const MIN = 40;
    const weak = galleryEntries()
      .filter((p) => p.alt.trim().length < MIN || !/morocco/i.test(p.alt))
      .map((p) => `${p.src}: "${p.alt}" (${p.alt.trim().length} chars)`);

    expect(
      weak,
      `These gallery photographs have alt text that is too short (under ${MIN}\n` +
        `characters) or does not name the country. There is no caption or body\n` +
        `copy beside these images, so the alt string is the only description a\n` +
        `screen-reader user or an image-search crawler ever gets. Say what is\n` +
        `in the frame and where it was taken:\n  ` + weak.join("\n  "),
    ).toEqual([]);
  });

  it("no photograph is listed twice", () => {
    // A duplicate reads as padding in a section arguing the opposite.
    const seen = new Map<string, number>();
    for (const p of galleryEntries()) seen.set(p.src, (seen.get(p.src) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([s, n]) => `${s} (${n}x)`);

    expect(
      dupes,
      `These photographs appear more than once in the homepage gallery:\n  ` +
        dupes.join("\n  "),
    ).toEqual([]);
  });
});
