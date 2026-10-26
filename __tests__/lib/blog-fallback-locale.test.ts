import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, blogSlugFor, blogPostSeo, isTranslated } from "@/lib/blog-i18n";

/**
 * THE INCIDENT (found 2026-10-26 in a full-site walkthrough): the cycling post
 * has no Italian or Arabic translation, so blogPostsFor() served the English
 * text at /it/blog/... and /ar/blog/... under lang="it" / lang="ar". Those
 * pages self-canonicalised, sat in every hreflang cluster and in the sitemap:
 * Google was told an English page was the Italian and Arabic version, a
 * duplicate of /en in the wrong language.
 *
 * Nothing else catches it: the fallback is deliberate (a missing translation
 * should not 404), the page renders, and the hreflang audit only checks that
 * clusters are reciprocal, not that the text is in the right language.
 *
 * The rule: a fallback page is noindexed, canonicalises to /en, and appears in
 * neither the sitemap nor any hreflang cluster, until the translation lands.
 * The blog post page takes all three from blogPostSeo(), tested here.
 */
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const SITE = "https://marrakechecotours.com";
const fallbacks = LOCALES.flatMap((l) =>
  BLOG_POSTS.filter((p) => !isTranslated(l, p.slug)).map((p) => [l, p.slug] as const),
);

describe("English fallbacks are never presented as translations", () => {
  it("isTranslated agrees with what blogPostsFor actually serves", () => {
    for (const l of LOCALES) {
      for (const p of blogPostsFor(l)) {
        const servedEnglish = l !== "en" && BLOG_POSTS.includes(p);
        expect(isTranslated(l, p.slug), `${l}/${p.slug}`).toBe(!servedEnglish);
      }
    }
  });

  it("the sitemap lists no fallback page", () => {
    const urls = new Set(sitemap().map((e) => e.url));
    const listed = fallbacks.filter(([l, s]) => urls.has(`${SITE}/${l}/blog/${blogSlugFor(l, s)}`));
    expect(listed, "Drop these from app/sitemap.ts (filter on isTranslated):").toEqual([]);
  });

  it("every fallback is noindexed, points to /en and sits in no hreflang cluster", () => {
    for (const [lang, slug] of fallbacks) {
      const seo = blogPostSeo(lang, slug);
      expect(seo.robots, `${lang}/${slug} must be noindex`).toMatchObject({ index: false });
      expect(seo.canonical, `${lang}/${slug}`).toBe(`${SITE}/en/blog/${slug}`);
      for (const l of LOCALES) {
        expect(blogPostSeo(l, slug).locales, `${l}/${slug} lists the ${lang} fallback as an alternate`).not.toContain(lang);
      }
    }
  });

  it("translated pages are untouched: indexable and self-canonical", () => {
    for (const p of BLOG_POSTS) {
      for (const lang of LOCALES.filter((l) => isTranslated(l, p.slug))) {
        const seo = blogPostSeo(lang, p.slug);
        expect(seo.robots, `${lang}/${p.slug}`).toBeUndefined();
        expect(seo.canonical, `${lang}/${p.slug}`).toBe(`${SITE}/${lang}/blog/${blogSlugFor(lang, p.slug)}`);
        expect(seo.locales, `${lang}/${p.slug}`).toContain(lang);
      }
    }
  });
});
