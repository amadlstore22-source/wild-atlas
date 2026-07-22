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
  return BLOG_POSTS_EN.map((enPost) => bySlug.get(enPost.slug) ?? enPost);
}

export function getBlogPostFor(locale: Locale, slug: string): BlogPost | undefined {
  return blogPostsFor(locale).find((p) => p.slug === slug);
}

export function blogRegionsFor(locale: Locale): RegionEntry[] {
  return REGIONS_BY_LOCALE[locale] ?? REGIONS_EN;
}

export function blogCategoriesFor(locale: Locale): CategoryEntry[] {
  return CATEGORIES_BY_LOCALE[locale] ?? CATEGORIES_EN;
}
