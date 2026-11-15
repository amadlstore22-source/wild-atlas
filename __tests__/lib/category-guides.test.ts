import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { CATEGORIES } from "@/lib/tours";
import { CATEGORY_GUIDES, categoryGuidesFor } from "@/components/tours/CategoryGuides";

/**
 * The category pages are meant to be the hub for a kind of trip, and until
 * 2026-11-15 nothing connected them to the site's own writing on it.
 *
 * Search Console, 90 days to 2026-11-12: all category pages together had 0
 * clicks and 26 impressions. The desert guides had 254 clicks and 13,780
 * impressions, and /categories/desert linked to none of them: the page was
 * one sentence, 14 cards and the FAQ. The same on /categories/cultural, which
 * did not link the imperial cities route guide written a week earlier.
 *
 * Nothing in the build notices a page that links to no guides, or a guide
 * list that names a post since renamed or removed: the block would silently
 * shrink, or vanish below two cards. So this checks the list itself, in every
 * language, not the two categories that have one today.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const ROOT = join(__dirname, "..", "..");

describe("category pages link to their own guides", () => {
  it("every listed guide is a real post", () => {
    const known = new Set(BLOG_POSTS.map((p) => p.slug));
    const dead: string[] = [];
    for (const [category, slugs] of Object.entries(CATEGORY_GUIDES)) {
      for (const slug of slugs ?? []) {
        if (!known.has(slug)) dead.push(`${category}: ${slug}`);
      }
    }
    expect(
      dead,
      `These slugs in CATEGORY_GUIDES (components/tours/CategoryGuides.tsx) are\n` +
        `not posts in lib/blog.ts. Use the post's English slug, or remove it:\n  ` +
        dead.join("\n  "),
    ).toEqual([]);
  });

  it("every list belongs to a real category and shows at least four guides in every language", () => {
    const categories = new Set<string>(CATEGORIES.map((c) => c.id));
    const thin: string[] = [];
    for (const category of Object.keys(CATEGORY_GUIDES) as (keyof typeof CATEGORY_GUIDES)[]) {
      if (!categories.has(category)) thin.push(`${category}: not a category in lib/tours.ts`);
      for (const lang of LOCALES) {
        const shown = categoryGuidesFor(lang, category).length;
        if (shown < 4) thin.push(`${category} [${lang}]: ${shown} guides shown`);
      }
    }
    expect(
      thin,
      `A guide is left out of a language it is not translated into, so these\n` +
        `category pages show fewer than four. Translate the missing guides or\n` +
        `list ones that exist in that language:\n  ` +
        thin.join("\n  "),
    ).toEqual([]);
  });

  it("the category page renders the block", () => {
    const page = readFileSync(join(ROOT, "app", "[lang]", "categories", "[category]", "page.tsx"), "utf8");
    expect(page, "the category page must render <CategoryGuides>").toMatch(/<CategoryGuides\b/);
  });
});
