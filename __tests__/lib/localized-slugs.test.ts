import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, getBlogPostFor, blogSlugFor } from "@/lib/blog-i18n";

/**
 * Localised blog slugs live in two places that must agree:
 *   - `localizedSlug` on the post, which decides the URL it is served at
 *   - the BLOG_SLUGS_* maps in proxy.ts, which 301 the English URL to it
 *
 * If they drift, the proxy redirects a live URL to one that does not exist —
 * a 404 on an indexed page, and nothing else in the build would catch it.
 */

const proxySrc = readFileSync(join(__dirname, "..", "..", "proxy.ts"), "utf-8");

function proxyMap(locale: string): Record<string, string> {
  const block = proxySrc.match(
    new RegExp(`const BLOG_SLUGS_${locale.toUpperCase()}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`)
  );
  if (!block) return {};
  const out: Record<string, string> = {};
  for (const [, k, v] of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[k] = v;
  return out;
}

const LOCALISED = ["fr", "es", "de", "it"] as const;

describe("localised blog slugs", () => {
  it("proxy.ts and the post data agree in every locale", () => {
    for (const lc of LOCALISED) {
      const map = proxyMap(lc);
      expect(Object.keys(map).length, `${lc}: proxy map is empty`).toBeGreaterThan(0);

      for (const [enSlug, localised] of Object.entries(map)) {
        const post = blogPostsFor(lc).find((p) => p.slug === enSlug);
        expect(post, `${lc}: proxy redirects ${enSlug} but no such post`).toBeDefined();
        expect(
          post!.localizedSlug,
          `${lc}: proxy sends ${enSlug} -> ${localised}, post says ${post!.localizedSlug}`
        ).toBe(localised);
      }
    }
  });

  it("every localizedSlug has a matching proxy redirect", () => {
    for (const lc of LOCALISED) {
      const map = proxyMap(lc);
      for (const post of blogPostsFor(lc)) {
        if (!post.localizedSlug) continue;
        expect(
          map[post.slug],
          `${lc}: ${post.slug} has localizedSlug but proxy.ts would not redirect it`
        ).toBe(post.localizedSlug);
      }
    }
  });

  it("resolves a post by either its localised or English slug", () => {
    for (const lc of LOCALISED) {
      for (const post of blogPostsFor(lc)) {
        if (!post.localizedSlug) continue;
        expect(getBlogPostFor(lc, post.localizedSlug)?.slug).toBe(post.slug);
        // The English slug must still resolve — inline links inside translated
        // content and every existing backlink use it.
        expect(getBlogPostFor(lc, post.slug)?.slug).toBe(post.slug);
      }
    }
  });

  it("localised slugs are unique within a locale", () => {
    for (const lc of LOCALISED) {
      const segments = blogPostsFor(lc).map((p) => blogSlugFor(lc, p.slug));
      expect(new Set(segments).size, `${lc}: duplicate URL segment`).toBe(segments.length);
    }
  });

  it("localised slugs are URL-safe", () => {
    for (const lc of LOCALISED) {
      for (const post of blogPostsFor(lc)) {
        if (!post.localizedSlug) continue;
        expect(post.localizedSlug, `${lc}/${post.slug}`).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  it("leaves already-indexed posts on their English slug", () => {
    // Posts published before 2026-08 are ranking under the English slug;
    // renaming them would trade real positions for a marginal gain.
    for (const lc of LOCALISED) {
      for (const post of blogPostsFor(lc)) {
        if (!post.localizedSlug) continue;
        const en = BLOG_POSTS.find((p) => p.slug === post.slug)!;
        expect(
          en.publishedAt >= "2026-07-30",
          `${lc}/${post.slug} is an older post and should keep its English slug`
        ).toBe(true);
      }
    }
  });

  it("English and Arabic keep the English slug", () => {
    for (const lc of ["en", "ar"] as const) {
      for (const post of blogPostsFor(lc)) {
        expect(blogSlugFor(lc, post.slug), `${lc}/${post.slug}`).toBe(post.slug);
      }
    }
  });
});
