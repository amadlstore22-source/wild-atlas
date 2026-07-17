import { describe, it, expect } from "vitest";
import { BLOG_POSTS, getBlogPost, BLOG_CATEGORIES, BLOG_REGIONS } from "@/lib/blog";
import { TOURS } from "@/lib/tours";

describe("BLOG_POSTS data", () => {
  it("has at least one post", () => {
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
  });

  it("every post has a unique slug", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every post has a non-empty title and excerpt", () => {
    BLOG_POSTS.forEach((p) => {
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.excerpt.trim().length).toBeGreaterThan(0);
    });
  });

  it("every post has a positive readTime", () => {
    BLOG_POSTS.forEach((p) => {
      expect(p.readTime).toBeGreaterThan(0);
    });
  });

  it("every post has a valid ISO publishedAt date", () => {
    BLOG_POSTS.forEach((p) => {
      expect(new Date(p.publishedAt).toString()).not.toBe("Invalid Date");
    });
  });

  it("every post has at least one tag", () => {
    BLOG_POSTS.forEach((p) => {
      expect(p.tags.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("blog SEO invariants", () => {
  it("updatedAt, where present, is valid and not before publishedAt", () => {
    BLOG_POSTS.forEach((p) => {
      if (!p.updatedAt) return;
      expect(new Date(p.updatedAt).toString(), p.slug).not.toBe("Invalid Date");
      expect(
        new Date(p.updatedAt).getTime() >= new Date(p.publishedAt).getTime(),
        `${p.slug}: updatedAt precedes publishedAt`
      ).toBe(true);
    });
  });

  it("seoTitle stays within Google's ~60-70 char display budget", () => {
    BLOG_POSTS.forEach((p) => {
      if (!p.seoTitle) return;
      expect(p.seoTitle.length, `${p.slug} seoTitle too long`).toBeLessThanOrEqual(75);
    });
  });

  it("seoDescription stays within the ~155-165 char snippet budget", () => {
    BLOG_POSTS.forEach((p) => {
      if (!p.seoDescription) return;
      expect(p.seoDescription.length, `${p.slug} seoDescription too long`).toBeLessThanOrEqual(200);
    });
  });

  it("no post advertises a stale year in its SEO title", () => {
    const staleYear = String(new Date().getFullYear() - 1);
    BLOG_POSTS.forEach((p) => {
      expect(p.seoTitle?.includes(staleYear), `${p.slug} still says ${staleYear}`).toBeFalsy();
    });
  });

  it("FAQ entries are non-empty and answers are self-contained", () => {
    BLOG_POSTS.forEach((p) => {
      p.faq?.forEach((f) => {
        expect(f.q.trim().length, `${p.slug} empty question`).toBeGreaterThan(0);
        // Google renders answers detached from the page, so they must stand alone.
        expect(f.a.trim().length, `${p.slug}: "${f.q}" answer too thin`).toBeGreaterThan(40);
      });
    });
  });

  it("relatedTours reference tours that actually exist", () => {
    const slugs = new Set(TOURS.map((t) => t.slug));
    BLOG_POSTS.forEach((p) => {
      p.relatedTours?.forEach((slug) => {
        expect(slugs.has(slug), `${p.slug} links to missing tour "${slug}"`).toBe(true);
      });
    });
  });

  it("internal markdown links point at real tour or site routes", () => {
    const tourSlugs = new Set(TOURS.map((t) => t.slug));
    BLOG_POSTS.forEach((p) => {
      const links = [...p.content.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
      links.forEach((href) => {
        const tourMatch = href.match(/^\/en\/tours\/([^/#?]+)$/);
        if (tourMatch) {
          expect(tourSlugs.has(tourMatch[1]), `${p.slug} links to missing tour ${href}`).toBe(true);
        }
      });
    });
  });
});

describe("getBlogPost", () => {
  it("returns the correct post by slug", () => {
    const first = BLOG_POSTS[0];
    const found = getBlogPost(first.slug);
    expect(found).toBeDefined();
    expect(found?.title).toBe(first.title);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getBlogPost("not-a-real-slug")).toBeUndefined();
  });
});

describe("BLOG_CATEGORIES", () => {
  it("has at least one category", () => {
    expect(BLOG_CATEGORIES.length).toBeGreaterThan(0);
  });

  it("every category has an id, label, and icon", () => {
    BLOG_CATEGORIES.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.label).toBeTruthy();
      expect(c.icon).toBeTruthy();
    });
  });
});

describe("BLOG_REGIONS", () => {
  it("includes the root region", () => {
    const root = BLOG_REGIONS.find((r) => r.id === "root");
    expect(root).toBeDefined();
  });
});
