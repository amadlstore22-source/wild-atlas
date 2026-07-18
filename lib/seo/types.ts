/**
 * Shared SEO content types.
 *
 * `Faq` lives here rather than in lib/blog.ts because both blog posts and
 * tours now carry FAQ content, and tours.ts importing from blog.ts would
 * couple two unrelated content domains.
 */

export interface Faq {
  q: string;
  a: string;
}
