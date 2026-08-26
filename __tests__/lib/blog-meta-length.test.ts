import { describe, it, expect } from "vitest";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * app/[lang]/blog/[slug]/page.tsx resolves the meta description as
 * `post.seoDescription ?? post.excerpt`. Both fields existed on every post, but
 * 56 of the 90 effective descriptions ran over 160 characters — the worst at
 * 200 — so Google truncated them mid-sentence and the closing hook was never
 * seen. `is-morocco-safe-tourist-guide` lost the entire second half of a
 * sentence that was doing the persuading.
 *
 * Nothing caught it. The strings are valid TypeScript, every page builds and
 * renders, the hreflang audit passes, and truncation is invisible unless
 * someone counts characters or looks at a live SERP.
 *
 * The lower bound matters as much as the upper one. Fixing the long ones by
 * cutting at the first sentence boundary produced the opposite failure: "Is
 * Morocco safe for solo female travellers?" as a 43-character description on a
 * 189-character excerpt, wasting most of the space Google allots. Both bounds
 * are asserted so neither fix can regress into the other.
 *
 * Scoped to the whole catalogue: the 65 posts rewritten are not special, and
 * the next post added is the one nobody will measure.
 */

// Google renders roughly 155-160 characters of a description. 158 leaves a
// little headroom; 165 is the failure threshold so a borderline edit does not
// fail the build over two characters.
const DESC_MAX = 165;
// Below this the snippet wastes the slot it was given.
const DESC_MIN = 85;

/** What the page actually publishes, mirroring the fallback in the route. */
function effectiveDescription(post: (typeof BLOG_POSTS)[number]): string {
  return post.seoDescription ?? post.excerpt;
}

describe("blog meta descriptions", () => {
  it("none is truncated in the SERP snippet", () => {
    const tooLong = BLOG_POSTS.map((p) => ({ slug: p.slug, len: effectiveDescription(p).length }))
      .filter((p) => p.len > DESC_MAX)
      .sort((a, b) => b.len - a.len);

    expect(
      tooLong,
      `These blog meta descriptions exceed ${DESC_MAX} characters, so Google cuts\n` +
        `them mid-sentence and everything after the cut is never seen. Note the\n` +
        `page falls back to \`excerpt\` when \`seoDescription\` is absent, so a long\n` +
        `excerpt is enough to cause this. Regenerate rather than hand-editing:\n` +
        `    PYTHONIOENCODING=utf-8 py scripts/seo/gen_blog_seo_descriptions.py\n\n  ` +
        tooLong.map((p) => `${p.slug} (${p.len})`).join("\n  "),
    ).toEqual([]);
  });

  it("none is so short it wastes the slot", () => {
    const tooShort = BLOG_POSTS.map((p) => ({ slug: p.slug, len: effectiveDescription(p).length }))
      .filter((p) => p.len < DESC_MIN)
      .sort((a, b) => a.len - b.len);

    expect(
      tooShort,
      `These blog meta descriptions are under ${DESC_MIN} characters. Google gives a\n` +
        `snippet ~155 characters; a one-line fragment throws most of that away.\n` +
        `This is the failure mode of cutting at the first sentence boundary:\n  ` +
        tooShort.map((p) => `${p.slug} (${p.len})`).join("\n  "),
    ).toEqual([]);
  });

  it("no two posts share a description", () => {
    // Duplicate snippets make two results look like the same page and waste a
    // listing. Google's guide is explicit that a description should be "unique
    // to one particular page".
    const byText = new Map<string, string[]>();
    for (const p of BLOG_POSTS) {
      const d = effectiveDescription(p);
      byText.set(d, [...(byText.get(d) ?? []), p.slug]);
    }
    const dupes = [...byText.entries()].filter(([, slugs]) => slugs.length > 1);

    expect(
      dupes.map(([d, slugs]) => `${slugs.join(" + ")}: "${d.slice(0, 60)}..."`),
      "These posts publish identical meta descriptions:",
    ).toEqual([]);
  });

  it("no blog title is long enough to be accidental", () => {
    // The blog route sets `title: post.seoTitle ?? post.title` and the layout
    // template appends " | Marrakech Eco Tours" (22 chars).
    const BRAND = 22;
    const tooLong = BLOG_POSTS.map((p) => ({
      slug: p.slug,
      len: (p.seoTitle ?? p.title).replace(/\s*\|\s*Marrakech Eco Tours\s*$/, "").length + BRAND,
    }))
      .filter((p) => p.len > 110)
      .sort((a, b) => b.len - a.len);

    // Deliberately loose, unlike the tour-title rule. Google's own guide sets
    // no length limit for titles and commonly rewrites long ARTICLE titles
    // rather than clipping them, and an editorial headline carries meaning a
    // truncated tour name does not: "Is Morocco Safe for Tourists? Honest 2026
    // Guide" earns its length. 69 of 90 posts sit between 75 and 95 characters
    // by editorial choice, so policing 75 here would mean rewriting the whole
    // blog to satisfy a rule Google does not have.
    //
    // The threshold catches only a genuine outlier: past ~110 characters a
    // headline has usually absorbed a subtitle that belongs in the excerpt.
    expect(
      tooLong.map((p) => `${p.slug} (${p.len})`),
      `These blog titles are long enough to look accidental rather than\n` +
        `editorial — past ~110 characters a headline has usually absorbed a\n` +
        `subtitle that belongs in the excerpt.`,
    ).toEqual([]);
  });
});
