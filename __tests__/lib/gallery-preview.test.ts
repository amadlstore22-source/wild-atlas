import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { GALLERY_PHOTOS } from "@/lib/gallery-photos";
import { galleryPreview, HOME_GALLERY_TILES } from "@/lib/gallery-preview";

/**
 * The homepage once rendered all 67 gallery photos: a 9,268px grid on mobile
 * and 1,930 DOM elements, which made it the slowest template on the site.
 * Nothing fails when that comes back -- the page builds and looks fine -- so
 * these tests hold the line instead. See lib/gallery-preview.ts.
 */
describe("homepage gallery preview", () => {
  const preview = galleryPreview(GALLERY_PHOTOS);

  it("is a fixed-size sample that fills 2 and 3 columns exactly", () => {
    expect(preview).toHaveLength(HOME_GALLERY_TILES);
    expect(HOME_GALLERY_TILES % 2).toBe(0);
    expect(HOME_GALLERY_TILES % 3).toBe(0);
    // A row-span-2 tile in a 12-tile grid leaves holes.
    expect(preview.every((p) => !p.span)).toBe(true);
  });

  it("shows every kind of trip, not the first dozen Atlas shots", () => {
    const groups = new Set(GALLERY_PHOTOS.map((p) => p.group));
    expect(new Set(preview.map((p) => p.group))).toEqual(groups);
  });

  it("uses real, distinct gallery photos", () => {
    const srcs = preview.map((p) => p.src);
    expect(new Set(srcs).size).toBe(srcs.length);
    const all = new Set(GALLERY_PHOTOS.map((p) => p.src));
    for (const s of srcs) expect(all.has(s)).toBe(true);
  });

  it("is what the homepage section renders, with a link to the full gallery", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "components", "sections", "Gallery.tsx"), "utf8");
    expect(src).toMatch(/photos=\{galleryPreview\(/);
    expect(src).toContain("/gallery`}");
  });

  it("is what the sitemap declares for the homepage", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "app", "sitemap.ts"), "utf8");
    expect(src).toMatch(/homeGalleryImages = galleryPreview\(GALLERY_PHOTOS\)/);
  });
});
