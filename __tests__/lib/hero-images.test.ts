import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { TOURS } from "@/lib/tours";

/**
 * Two defects, both of which shipped here.
 *
 * 1. A heroImage path with no file behind it renders a broken image on a live
 *    page. Nothing in the build fails: the string is valid TypeScript and Next
 *    only resolves /public at request time. Renaming a gallery file without
 *    rewriting every reference is the usual cause -- seven files were renamed
 *    on 2026-08-16 because their names misdescribed their contents.
 *
 * 2. Heavy hero reuse. 88 posts shared 51 images, one of them across six
 *    posts, while 14 original client photos sat unused. Duplication is not
 *    itself a bug, so this is asserted as a ceiling rather than banned: a
 *    single image on more than MAX_REUSE posts means the gallery is being
 *    under-used, not that the photo is wrong.
 *
 * NOT asserted: that the photo depicts what the page is about. No test can
 * check that -- it needs a human to open the file. The gallery here contained
 * `destinations-sahara.jpg` (actually Monument Valley, Arizona) and seven more
 * whose names lied. When adding an image, open it first.
 */

const PUBLIC = join(__dirname, "..", "..", "public");
const MAX_REUSE = 6;

/** Remote stock images (Unsplash/Pexels) are allow-listed in next.config.ts
 *  and cannot be checked on disk. Only local /gallery paths are verified. */
const isLocal = (src: string) => src.startsWith("/");

describe("hero images", () => {
  it("every local image reference exists on disk", () => {
    const missing: string[] = [];

    for (const p of BLOG_POSTS) {
      if (p.heroImage && isLocal(p.heroImage) && !existsSync(join(PUBLIC, p.heroImage))) {
        missing.push(`blog/${p.slug}: ${p.heroImage}`);
      }
    }
    for (const t of TOURS) {
      if (t.heroImage && isLocal(t.heroImage) && !existsSync(join(PUBLIC, t.heroImage))) {
        missing.push(`tour/${t.slug}: ${t.heroImage}`);
      }
      for (const g of t.gallery ?? []) {
        if (isLocal(g) && !existsSync(join(PUBLIC, g))) {
          missing.push(`tour/${t.slug} gallery: ${g}`);
        }
      }
    }

    expect(
      missing,
      `These render as broken images on live pages:\n  ${missing.join("\n  ")}`
    ).toEqual([]);
  });

  it("no single hero image is reused past the ceiling", () => {
    const counts = new Map<string, string[]>();
    for (const p of BLOG_POSTS) {
      if (!p.heroImage) continue;
      counts.set(p.heroImage, [...(counts.get(p.heroImage) ?? []), p.slug]);
    }

    const over = [...counts.entries()]
      .filter(([, slugs]) => slugs.length > MAX_REUSE)
      .map(([img, slugs]) => `${img} on ${slugs.length} posts: ${slugs.join(", ")}`);

    expect(
      over,
      `Reused past ${MAX_REUSE} posts. Check public/gallery for an unused\n` +
        `original before reaching for another copy:\n  ${over.join("\n  ")}`
    ).toEqual([]);
  });
});
