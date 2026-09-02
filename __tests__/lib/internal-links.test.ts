import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "@/lib/blog";
import { TOURS } from "@/lib/tours";

/**
 * A LINK THAT 404s IS WORSE THAN NO LINK AT ALL.
 *
 * blog.test.ts already checks that blog prose linking to /en/tours/<slug> names
 * a real tour. Three other directions were unchecked, and all three now carry
 * real traffic:
 *
 *   blog  -> blog   the four 2026-09 guides cross-reference each other
 *   tour  -> blog   thirteen tour FAQ answers link out to a guide
 *   tour  -> tour   FAQ answers comparing two tours ("Zagora or Merzouga?")
 *
 * None of these is caught by anything else: a wrong slug is a valid string,
 * TypeScript is happy, the page builds, and the link renders. It only fails
 * when a customer clicks it — and the tour-FAQ links sit on the booking page,
 * one click from a sale.
 *
 * relatedPosts is checked too. It drives the "Related Guides" block, and a
 * slug that matches no post silently renders nothing, so the failure is
 * invisible rather than loud.
 */

const postSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
const tourSlugs = new Set(TOURS.map((t) => t.slug));

/** Every markdown link target in a body of text. */
function linksIn(text: string): string[] {
  return [...text.matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
}

/** Resolve an internal href to a problem string, or null when it is fine. */
function problem(href: string): string | null {
  const blog = href.match(/^\/en\/blog\/([^/#?]+)$/);
  if (blog) return postSlugs.has(blog[1]) ? null : `no such post: ${href}`;

  const tour = href.match(/^\/en\/tours\/([^/#?]+)$/);
  if (tour) return tourSlugs.has(tour[1]) ? null : `no such tour: ${href}`;

  // Section indexes and static pages: real routes, nothing to resolve.
  return null;
}

describe("internal links resolve", () => {
  it("every link in blog prose points at a real post or tour", () => {
    const broken: string[] = [];
    for (const p of BLOG_POSTS) {
      for (const href of linksIn(p.content)) {
        const bad = problem(href);
        if (bad) broken.push(`blog/${p.slug}: ${bad}`);
      }
      for (const f of p.faq ?? []) {
        for (const href of linksIn(f.a)) {
          const bad = problem(href);
          if (bad) broken.push(`blog/${p.slug} FAQ: ${bad}`);
        }
      }
    }
    expect(
      broken,
      broken.length === 0 ? "" : `Broken links in blog content:\n  ${broken.join("\n  ")}`,
    ).toEqual([]);
  });

  it("every link in a tour FAQ points at a real post or tour", () => {
    // These sit on the booking page, one click from a sale.
    const broken: string[] = [];
    for (const t of TOURS) {
      for (const f of t.faq ?? []) {
        for (const href of linksIn(f.a)) {
          const bad = problem(href);
          if (bad) broken.push(`tour/${t.slug} FAQ "${f.q}": ${bad}`);
        }
      }
      for (const href of linksIn(t.description ?? "")) {
        const bad = problem(href);
        if (bad) broken.push(`tour/${t.slug} description: ${bad}`);
      }
    }
    expect(
      broken,
      broken.length === 0 ? "" : `Broken links on tour pages:\n  ${broken.join("\n  ")}`,
    ).toEqual([]);
  });

  it("every relatedPosts slug names a real post", () => {
    // A bad slug here renders nothing at all rather than erroring, so the
    // "Related Guides" block just quietly loses an entry.
    const broken: string[] = [];
    for (const t of TOURS) {
      for (const slug of t.relatedPosts ?? []) {
        if (!postSlugs.has(slug)) broken.push(`tour/${t.slug}: relatedPosts "${slug}"`);
      }
    }
    expect(
      broken,
      broken.length === 0
        ? ""
        : `relatedPosts naming posts that do not exist:\n  ${broken.join("\n  ")}`,
    ).toEqual([]);
  });

  it("no post lists itself in relatedTours, and no tour links to itself", () => {
    // A self-link is always a copy-paste slip, and it wastes the slot.
    const broken: string[] = [];
    for (const t of TOURS) {
      if ((t.relatedPosts ?? []).length !== new Set(t.relatedPosts ?? []).size) {
        broken.push(`tour/${t.slug}: duplicate entry in relatedPosts`);
      }
      for (const f of t.faq ?? []) {
        if (linksIn(f.a).includes(`/en/tours/${t.slug}`)) {
          broken.push(`tour/${t.slug}: FAQ links to itself`);
        }
      }
    }
    for (const p of BLOG_POSTS) {
      if (linksIn(p.content).includes(`/en/blog/${p.slug}`)) {
        broken.push(`blog/${p.slug}: links to itself`);
      }
    }
    expect(broken, broken.length === 0 ? "" : broken.join("\n  ")).toEqual([]);
  });
});
