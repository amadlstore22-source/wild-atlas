import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { CATEGORIES, TOURS } from "@/lib/tours";
import { selectRelatedPosts } from "@/lib/blog-related";
import { CATEGORY_FAQ, categoryFaqFor } from "@/lib/seo/category-faq";
import { absoluteUrl } from "@/lib/seo/schema";
import sitemap from "@/app/sitemap";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * Six SEO defects caught in the 2026-11-20 deep audit of marrakechecotours.com.
 * Every one passed `tsc` and `next build` cleanly while hurting Search Console
 * indexing, language signals, or structured data across hundreds of live pages:
 *
 * 1. All 122 blog posts (x 6 locales = ~730 URLs) emitted a relative
 *    `/gallery/...` path in `BlogPosting.image.url`, which resolves against
 *    schema.org instead of this site and is dropped by Google.
 * 2. All 20 non-English category hubs (/fr/categories/* through /ar/categories/*)
 *    rendered English-only CATEGORY_FAQ text and English FAQPage schema; in the
 *    28 days to 2026-11-17 all 24 category pages earned 0 clicks and 9
 *    impressions combined.
 * 3. On all 51 localized blog URLs in FR/ES/DE/IT (204 pages), `page.tsx`
 *    matched `p.slug === params.slug` (English key vs translated URL), returning
 *    -1 every time so Prev vanished, Next pointed at posts[0], and sidebar
 *    Related Articles could self-link. Meanwhile `filter().slice(0, 3)` sent
 *    sidebar links to only 17 of 122 posts, starving 105 posts while 327 URLs
 *    sat in "Crawled - currently not indexed".
 * 4. The sitewide Footer linked to three `noindex` `?origin=...` URLs on every
 *    one of the 1,233 pages (driving 97 noindex URLs in Search Console) while
 *    giving flagship money tours zero footer links, and listed inactive Facebook
 *    and YouTube profiles (confirmed inactive by owner 2026-11-20).
 * 5. `app/sitemap.ts` submitted 18 legal URLs (/terms, /privacy, /cookies x 6)
 *    that carry nofollow and zero commercial search intent.
 * 6. `marrakech-to-fes-3day` (a Middle Atlas road tour that never enters the
 *    Sahara) carried `seoTitle: "Private 3-Day Marrakech to Fes Desert Tour"`.
 */

const ROOT = join(__dirname, "..", "..");
const read = (...parts: string[]) => readFileSync(join(ROOT, ...parts), "utf8");
const NON_EN: Locale[] = ["fr", "es", "de", "it", "ar"];

describe("BlogPosting schema & blog internal linking (2026-11-20 audit)", () => {
  it("blog detail page absolutises heroImage in JSON-LD and resolves every post image to https", () => {
    const src = read("app", "[lang]", "blog", "[slug]", "page.tsx");
    expect(
      src,
      "BlogPosting JSON-LD must wrap post.heroImage in absoluteUrl() so Google\n" +
        "does not drop the article image on all 122 posts x 6 languages.",
    ).toContain("url: absoluteUrl(post.heroImage)");

    const bad = BLOG_POSTS.filter((p) => !/^https:\/\//.test(absoluteUrl(p.heroImage))).map((p) => p.slug);
    expect(bad, `These blog posts still have non-HTTPS JSON-LD image URLs:\n  ${bad.join("\n  ")}`).toEqual([]);
  });

  it("blog detail page computes postIndex and postUrl from post.slug, never the incoming localised param", () => {
    const src = read("app", "[lang]", "blog", "[slug]", "page.tsx");
    expect(
      src,
      "app/[lang]/blog/[slug]/page.tsx must match posts.findIndex((p) => p.slug === post.slug)\n" +
        "so localized FR/ES/DE/IT URLs do not return -1 and break Prev/Next links.",
    ).toContain("posts.findIndex((p) => p.slug === post.slug)");
    expect(
      src,
      "app/[lang]/blog/[slug]/page.tsx must build postUrl with blogSlugFor(lang, post.slug)\n" +
        "so JSON-LD url and BreadcrumbList always emit the canonical localised URL.",
    ).toContain("blogSlugFor(lang, post.slug)");
  });

  it("selectRelatedPosts never self-links and distributes sidebar links to every blog post", () => {
    const inbound = new Map<string, number>();
    for (const p of BLOG_POSTS) inbound.set(p.slug, 0);

    const selfLinks: string[] = [];
    for (const post of BLOG_POSTS) {
      const picks = selectRelatedPosts(BLOG_POSTS, post, 3);
      if (picks.some((r) => r.slug === post.slug)) selfLinks.push(post.slug);
      for (const r of picks) inbound.set(r.slug, (inbound.get(r.slug) ?? 0) + 1);
    }

    expect(
      selfLinks,
      `selectRelatedPosts linked these posts to themselves:\n  ${selfLinks.join("\n  ")}`,
    ).toEqual([]);

    const starved = [...inbound.entries()].filter(([, n]) => n === 0).map(([slug]) => slug);
    expect(
      starved,
      `These blog posts receive ZERO sidebar links from selectRelatedPosts.\n` +
        `Check lib/blog-related.ts cyclic distribution:\n  ${starved.join("\n  ")}`,
    ).toEqual([]);
  });
});

describe("Category FAQs are translated in every locale (2026-11-20 audit)", () => {
  it("category page reads categoryFaqFor(lang, cat.id) instead of English-only CATEGORY_FAQ", () => {
    const src = read("app", "[lang]", "categories", "[category]", "page.tsx");
    expect(
      src,
      "app/[lang]/categories/[category]/page.tsx must call categoryFaqFor(lang, cat.id)\n" +
        "so FR/ES/DE/IT/AR category hubs do not render English FAQs.",
    ).toContain("categoryFaqFor(lang, cat.id)");
  });

  it("every category has translated FAQ entries in all five non-English locales", () => {
    const problems: string[] = [];
    for (const cat of CATEGORIES) {
      const enQs = new Set((CATEGORY_FAQ[cat.id] ?? []).map((f) => f.q.trim().toLowerCase()));
      for (const lang of NON_EN) {
        const faq = categoryFaqFor(lang, cat.id);
        if (faq.length === 0) {
          problems.push(`${lang}/${cat.id}: missing FAQ`);
          continue;
        }
        for (const f of faq) {
          if (enQs.has(f.q.trim().toLowerCase())) {
            problems.push(`${lang}/${cat.id}: untranslated question "${f.q}"`);
          }
          if (f.a.trim().length <= 40) {
            problems.push(`${lang}/${cat.id}: answer too short for "${f.q}"`);
          }
        }
      }
    }
    expect(
      problems,
      `Translate these category FAQs in lib/seo/category-faq.ts:\n  ${problems.join("\n  ")}`,
    ).toEqual([]);
  });
});

describe("Footer crawl hygiene and active social profiles (2026-11-20 audit)", () => {
  it("footer does not link to noindex ?origin= filter URLs", () => {
    const src = read("components", "layout", "Footer.tsx")
      .replace(/\/\/[^\n]*/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    expect(
      src,
      "components/layout/Footer.tsx links to noindex ?origin= filter URLs on every page.\n" +
        "Link directly to canonical tour or category URLs instead.",
    ).not.toMatch(/\/tours\?origin=/);
  });

  it("inactive Facebook and YouTube profiles are not linked in Footer, constants, or sameAs", () => {
    const files = [
      ["lib", "constants.ts"],
      ["components", "layout", "Footer.tsx"],
      ["app", "[lang]", "page.tsx"],
      ["app", "[lang]", "about", "page.tsx"],
    ];
    const hits: string[] = [];
    for (const parts of files) {
      const src = read(...parts);
      if (/facebook\.com\/marrakechecotours|youtube\.com\/@marrakechecotours/i.test(src)) {
        hits.push(parts.join("/"));
      }
    }
    expect(
      hits,
      `Owner confirmed 2026-11-20 that Facebook and YouTube are inactive.\n` +
        `Remove inactive profile URLs from:\n  ${hits.join("\n  ")}`,
    ).toEqual([]);
  });
});

describe("Sitemap & truthful tour titles (2026-11-20 audit)", () => {
  it("sitemap omits legal boilerplate pages (/terms, /privacy, /cookies)", () => {
    const legal = sitemap()
      .map((e) => e.url)
      .filter((u) => /\/(terms|privacy|cookies)$/.test(u));
    expect(
      legal,
      `Legal pages carry nofollow and no search intent — remove them from app/sitemap.ts:\n  ${legal.join("\n  ")}`,
    ).toEqual([]);
  });

  it("non-desert Marrakech-to-Fes tour does not claim 'Desert' in its seoTitle", () => {
    const t = TOURS.find((x) => x.slug === "marrakech-to-fes-3day");
    expect(t).toBeDefined();
    expect(
      t!.seoTitle ?? "",
      "marrakech-to-fes-3day drives via Midelt and Azrou and never visits the Sahara;\n" +
        "remove 'Desert' from its seoTitle in lib/tours.ts.",
    ).not.toMatch(/desert/i);
  });
});
