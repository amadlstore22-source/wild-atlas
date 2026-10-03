import { tourSlugFor } from "@/lib/tours-i18n";
import { blogSlugFor } from "@/lib/blog-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

// Not hasLocale(): dictionaries.ts is server-only, and this runs in tests too.
const LOCALES = new Set<string>(["en", "fr", "es", "de", "it", "ar"]);
const isLocale = (s: string): s is Locale => LOCALES.has(s);

/**
 * Translated content links tours and posts by their ENGLISH slug, which only
 * reaches the page through a 301/308 in fr/es/de/it. Point such a link at the
 * localised slug directly; anything already localised, or not a tour/blog
 * path, passes through unchanged.
 */
export function localizeHref(href: string): string {
  const m = href.match(/^\/([a-z]{2})\/(tours|blog)\/([^/?#]+)(.*)$/);
  if (!m || !isLocale(m[1])) return href;
  const [, loc, kind, seg, rest] = m;
  const slug = kind === "tours" ? tourSlugFor(loc, seg) : blogSlugFor(loc, seg);
  return `/${loc}/${kind}/${slug}${rest}`;
}

/** `[label](/path)` or `[label](https://…)`. Protocol-relative `//host` is rejected. */
const MD_LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*|https:\/\/[^)\s]+)\)/g;

export type TextSegment = { text: string; href?: string };

/**
 * Split a plain-text FAQ answer into text and link segments. FAQ answers are
 * authored with markdown links but were rendered as raw text, so 357 blog
 * answers and 49 tour answers showed readers literal "[label](/en/blog/…)".
 */
export function splitMarkdownLinks(s: string): TextSegment[] {
  const out: TextSegment[] = [];
  let last = 0;
  for (const m of s.matchAll(MD_LINK)) {
    if (m.index! > last) out.push({ text: s.slice(last, m.index) });
    out.push({ text: m[1], href: m[2].startsWith("/") ? localizeHref(m[2]) : m[2] });
    last = m.index! + m[0].length;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}

/** The same text with links reduced to their labels — for JSON-LD, which must match what is visible. */
export function stripMarkdownLinks(s: string): string {
  return s.replace(MD_LINK, "$1");
}
