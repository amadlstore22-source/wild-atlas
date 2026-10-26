import type { Locale } from "@/app/[lang]/dictionaries";
import { BLOG_POSTS as BLOG_POSTS_EN, type BlogPost, type BlogRegion } from "./blog";
import { BLOG_POSTS_PART1 as FR_1 } from "./blog.fr.part1";
import { BLOG_POSTS_PART2 as FR_2 } from "./blog.fr.part2";
import { BLOG_POSTS_PART1 as ES_1 } from "./blog.es.part1";
import { BLOG_POSTS_PART2 as ES_2 } from "./blog.es.part2";
import { BLOG_POSTS_PART1 as DE_1 } from "./blog.de.part1";
import { BLOG_POSTS_PART2 as DE_2 } from "./blog.de.part2";
import { BLOG_POSTS_PART1 as IT_1 } from "./blog.it.part1";
import { BLOG_POSTS_PART2 as IT_2 } from "./blog.it.part2";
import { BLOG_POSTS_PART1 as AR_1 } from "./blog.ar.part1";
import { BLOG_POSTS_PART2 as AR_2 } from "./blog.ar.part2";
import { BLOG_REGIONS as REGIONS_EN, BLOG_CATEGORIES as CATEGORIES_EN } from "./blog";
import { BLOG_REGIONS as REGIONS_FR, BLOG_CATEGORIES as CATEGORIES_FR } from "./blog-meta.fr";
import { BLOG_REGIONS as REGIONS_ES, BLOG_CATEGORIES as CATEGORIES_ES } from "./blog-meta.es";
import { BLOG_REGIONS as REGIONS_DE, BLOG_CATEGORIES as CATEGORIES_DE } from "./blog-meta.de";
import { BLOG_REGIONS as REGIONS_IT, BLOG_CATEGORIES as CATEGORIES_IT } from "./blog-meta.it";
import { BLOG_REGIONS as REGIONS_AR, BLOG_CATEGORIES as CATEGORIES_AR } from "./blog-meta.ar";

const BLOG_POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = {
  en: BLOG_POSTS_EN,
  fr: [...FR_1, ...FR_2],
  es: [...ES_1, ...ES_2],
  de: [...DE_1, ...DE_2],
  it: [...IT_1, ...IT_2],
  ar: [...AR_1, ...AR_2],
};

type RegionEntry = { id: BlogRegion; label: string; icon: string; description: string };
type CategoryEntry = { id: BlogPost["category"]; label: string; icon: string };

const REGIONS_BY_LOCALE: Record<Locale, RegionEntry[]> = {
  en: REGIONS_EN,
  fr: REGIONS_FR,
  es: REGIONS_ES,
  de: REGIONS_DE,
  it: REGIONS_IT,
  ar: REGIONS_AR,
};

const CATEGORIES_BY_LOCALE: Record<Locale, CategoryEntry[]> = {
  en: CATEGORIES_EN,
  fr: CATEGORIES_FR,
  es: CATEGORIES_ES,
  de: CATEGORIES_DE,
  it: CATEGORIES_IT,
  ar: CATEGORIES_AR,
};

/**
 * A locale's post table falls back to English per-post when the translated
 * table is missing an entry (e.g. mid-translation), rather than failing the
 * whole page — matches the destinations/guides/tours-i18n fallback pattern.
 */
export function blogPostsFor(locale: Locale): BlogPost[] {
  const localized = BLOG_POSTS_BY_LOCALE[locale] ?? BLOG_POSTS_EN;
  if (locale === "en") return localized;
  const bySlug = new Map(localized.map((p) => [p.slug, p]));
  return BLOG_POSTS_EN.map((enPost) => {
    const post = bySlug.get(enPost.slug);
    if (!post) return enPost;
    // Which tours a post sells is not a translation question. 68 translated
    // posts (2026-10-12) had been written without relatedTours, so they showed
    // no trip box and no tour cards at all, the Arabic Tibherine post (30
    // clicks in 90 days) and every locale's M'Goun / Grand Traverse cost post
    // among them. A translation inherits the English list unless it sets its own.
    return post.relatedTours?.length ? post : { ...post, relatedTours: enPost.relatedTours };
  });
}

/**
 * Whether this locale has its OWN translation of the post, rather than the
 * English fallback blogPostsFor() serves while a translation is missing.
 *
 * A fallback page is English text under /it/ or /ar/, with lang="it". Offering
 * it to Google as the Italian page (self-canonical, in hreflang, in the
 * sitemap) is a duplicate of /en in the wrong language. The cycling post was
 * live that way in Italian and Arabic (found 2026-10-26). Callers use this to
 * keep fallbacks out of the sitemap and hreflang and to canonicalise them to
 * the English original.
 */
export function isTranslated(locale: Locale, slug: string): boolean {
  if (locale === "en") return true;
  return (BLOG_POSTS_BY_LOCALE[locale] ?? []).some((p) => p.slug === slug);
}

const SITE = "https://marrakechecotours.com";
const ALL_LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/**
 * Canonical, hreflang cluster and robots for one post in one locale.
 *
 * Translated pages self-canonicalise with every translated locale as an
 * alternate. A fallback page (English text, see isTranslated) points its
 * canonical at /en, is left out of the cluster and is noindexed.
 */
export function blogPostSeo(locale: Locale, slug: string) {
  const translated = isTranslated(locale, slug);
  const urlFor = (l: Locale) => `${SITE}/${l}/blog/${blogSlugFor(l, slug)}`;
  return {
    canonical: translated ? urlFor(locale) : `${SITE}/en/blog/${slug}`,
    locales: ALL_LOCALES.filter((l) => isTranslated(l, slug)),
    urlFor,
    robots: translated ? undefined : { index: false, follow: true },
  };
}

/**
 * Resolve a post by either its localised URL segment or its English slug.
 *
 * Accepting both matters: the English slug is what every already-indexed URL,
 * external backlink, and inline link inside translated content uses. Matching
 * `localizedSlug` first means the localised URL is canonical, while the English
 * one still resolves instead of 404ing — proxy.ts redirects it so only one is
 * indexed.
 */
export function getBlogPostFor(locale: Locale, slug: string): BlogPost | undefined {
  const posts = blogPostsFor(locale);
  return posts.find((p) => p.localizedSlug === slug) ?? posts.find((p) => p.slug === slug);
}

/** The URL segment a post should be served at in this locale. */
export function blogSlugFor(locale: Locale, slug: string): string {
  const post = blogPostsFor(locale).find((p) => p.slug === slug);
  return post?.localizedSlug ?? slug;
}

export function blogRegionsFor(locale: Locale): RegionEntry[] {
  return REGIONS_BY_LOCALE[locale] ?? REGIONS_EN;
}

export function blogCategoriesFor(locale: Locale): CategoryEntry[] {
  return CATEGORIES_BY_LOCALE[locale] ?? CATEGORIES_EN;
}
