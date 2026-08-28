import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor } from "@/lib/blog-i18n";

/**
 * Blog articles can place a photograph inline with
 * `![alt](/gallery/file.jpg "optional caption")` on its own line.
 *
 * WHY THE RENDERER SPLITS INTO REACT INSTEAD OF EMITTING <img>
 * The first implementation put an <img> tag into renderMarkdown's output
 * string. It worked, and it was wrong: a raw <img> inside
 * dangerouslySetInnerHTML BYPASSES the Next image optimizer, so none of the
 * AVIF/WebP negotiation or per-device resizing configured in next.config.ts
 * applies. The gallery averages 238 KB per JPEG, so four images in an article
 * would have shipped ~1 MB of unoptimised bytes — on a site whose LCP is
 * already 3.0 s against a 2.5 s threshold. The feature would have damaged the
 * metric it exists to improve.
 *
 * These assertions lock in the properties that made it worth shipping. They
 * are cheap to keep and would each catch a silent regression:
 *
 *   - a broken path renders a 404 image with no build error
 *   - a missing alt is an accessibility and image-SEO loss that nothing warns about
 *   - reverting to a string <img> would restore the performance defect invisibly
 */

const GALLERY = join(__dirname, "..", "..", "public");
const PAGE = join(__dirname, "..", "..", "app", "[lang]", "blog", "[slug]", "page.tsx");
const IMG_LINE = /^!\[([^\]]*)\]\((\/[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/** Every inline image across every locale, with its post for reporting. */
function allInlineImages() {
  const found: { locale: string; slug: string; alt: string; src: string }[] = [];
  for (const lc of LOCALES) {
    for (const post of blogPostsFor(lc)) {
      for (const line of (post.content ?? "").split("\n")) {
        const m = line.trim().match(IMG_LINE);
        if (m) found.push({ locale: lc, slug: post.slug, alt: m[1] ?? "", src: m[2] });
      }
    }
  }
  return found;
}

describe("blog inline images", () => {
  it("every referenced file exists on disk", () => {
    // A typo in a path produces a 404 image at runtime and no build error at
    // all — next/image does not verify that a local file exists.
    const missing = allInlineImages()
      .filter((i) => !existsSync(join(GALLERY, i.src)))
      .map((i) => `${i.locale}/${i.slug}: ${i.src}`);

    expect(
      [...new Set(missing)],
      `These inline images point at files that do not exist in public/. The\n` +
        `page still builds and renders — the reader just gets a broken image:\n  ` +
        [...new Set(missing)].join("\n  "),
    ).toEqual([]);
  });

  it("every inline image has descriptive alt text", () => {
    // Alt text is how these photographs earn anything in image search, and how
    // a screen-reader user knows what the article is showing. An empty alt on a
    // content image is a silent loss on both counts.
    const MIN = 15;
    const weak = allInlineImages()
      .filter((i) => i.alt.trim().length < MIN)
      .map((i) => `${i.locale}/${i.slug}: "${i.alt}" (${i.alt.trim().length} chars)`);

    expect(
      [...new Set(weak)],
      `These inline images have missing or too-short alt text (under ${MIN}\n` +
        `characters). Describe what is actually in the frame — these are real\n` +
        `photographs from our own departures and they should say so:\n  ` +
        [...new Set(weak)].join("\n  "),
    ).toEqual([]);
  });

  it("the renderer routes images through next/image, not a raw <img>", () => {
    // The performance regression this whole design exists to prevent. If a
    // future edit emits an <img> tag from renderMarkdown, the optimizer is
    // bypassed and nothing else notices.
    const src = readFileSync(PAGE, "utf-8");

    expect(
      /htmlParts\.push\([^)]*<img/.test(src),
      "renderMarkdown emits a raw <img> tag. That bypasses the Next image\n" +
        "optimizer entirely — no AVIF, no WebP, no per-device resizing — and\n" +
        "ships full-size JPEGs into articles. Images must be split out as React\n" +
        "blocks and rendered with <Image>; see the docblock above toBlocks().",
    ).toBe(false);

    expect(
      src.includes("kind === \"html\"") && src.includes("<Image"),
      "The block splitter that routes inline images through <Image> is gone.",
    ).toBe(true);
  });

  it("inline images declare width and height", () => {
    // Without explicit dimensions the browser cannot reserve the box, and the
    // article reflows as each photograph arrives. That is a CLS failure on a
    // page type where CLS should be exactly zero.
    const src = readFileSync(PAGE, "utf-8");
    const block = src.slice(src.indexOf("kind === \"html\""));
    expect(
      /width=\{\d+\}/.test(block) && /height=\{\d+\}/.test(block),
      "The inline-image <Image> has lost its explicit width/height, so the\n" +
        "article will shift as photographs load. Do not switch to `fill` here:\n" +
        "it needs a sized parent and reintroduces the shift.",
    ).toBe(true);
  });

  it("English and translated posts agree on how many images they show", () => {
    // A translation that drops the image lines gives one language a rich
    // article and another a wall of text, from the same source material.
    const enCounts = new Map(
      BLOG_POSTS.map((p) => [
        p.slug,
        (p.content ?? "").split("\n").filter((l) => IMG_LINE.test(l.trim())).length,
      ]),
    );

    const drift: string[] = [];
    for (const lc of LOCALES) {
      if (lc === "en") continue;
      for (const post of blogPostsFor(lc)) {
        const en = enCounts.get(post.slug);
        if (en === undefined || en === 0) continue;
        const here = (post.content ?? "").split("\n").filter((l) => IMG_LINE.test(l.trim())).length;
        // A locale that has not been translated yet falls back to the English
        // post wholesale, so its count matches by definition. Only a genuinely
        // translated post can drift.
        if (here !== en) drift.push(`${lc}/${post.slug}: ${here} images vs ${en} in English`);
      }
    }

    expect(
      drift,
      `These translated posts show a different number of photographs than the\n` +
        `English original. The images are part of the article, not decoration —\n` +
        `carry the same lines across when translating:\n  ` + drift.join("\n  "),
    ).toEqual([]);
  });
});
