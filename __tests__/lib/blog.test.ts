import { describe, it, expect } from "vitest";
import { BLOG_POSTS, getBlogPost, BLOG_CATEGORIES, BLOG_REGIONS } from "@/lib/blog";

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
