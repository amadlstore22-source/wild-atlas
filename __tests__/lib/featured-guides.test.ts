import { describe, expect, it } from "vitest";
import { blogPostsFor, blogSlugFor } from "@/lib/blog-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * The homepage's Featured Guides section pins four posts by English slug and
 * renders the first three that resolve.
 *
 * The blog was previously reachable from the homepage only when the external
 * news feed failed, so these links are the site's own editorial surface. If a
 * pinned slug is renamed the section silently backfills, which is safe but
 * means a rename would go unnoticed — hence asserting the pins resolve.
 */
const PINNED = [
  "how-to-climb-toubkal-complete-guide",
  "3-day-sahara-tour-cost-marrakech",
  "merzouga-vs-zagora-which-desert-tour",
  "what-to-pack-desert-tour-morocco",
];

const LOCALES: Locale[] = ["en", "fr", "es", "de", "it", "ar"];

describe("homepage featured guides", () => {
  it("resolves every pinned post in every locale", () => {
    for (const lang of LOCALES) {
      const posts = blogPostsFor(lang);
      for (const slug of PINNED) {
        expect(
          posts.find((p) => p.slug === slug),
          `${slug} missing from ${lang}`
        ).toBeDefined();
      }
    }
  });

  it("renders three cards with a hero image and a read time", () => {
    for (const lang of LOCALES) {
      const posts = blogPostsFor(lang);
      const shown = PINNED.map((s) => posts.find((p) => p.slug === s)!).slice(0, 3);
      expect(shown).toHaveLength(3);
      for (const post of shown) {
        expect(post.heroImage, `${post.slug} has no hero in ${lang}`).toMatch(/^\//);
        expect(post.readTime, `${post.slug} has no readTime in ${lang}`).toBeGreaterThan(0);
        expect(post.excerpt.length, `${post.slug} has no excerpt in ${lang}`).toBeGreaterThan(0);
      }
    }
  });

  it("links to each locale's own URL segment", () => {
    // Arabic deliberately keeps the English segment; the others translate it.
    for (const lang of LOCALES) {
      for (const slug of PINNED) {
        const segment = blogSlugFor(lang, slug);
        expect(segment, `${slug} produced an empty segment in ${lang}`).toBeTruthy();
      }
    }
  });
});
