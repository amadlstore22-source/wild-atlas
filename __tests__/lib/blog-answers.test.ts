import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, isTranslated } from "@/lib/blog-i18n";

/**
 * The short answer boxes (added 2026-11-28, search audit step 4) sit at the
 * top of the most-read posts and become each article's schema `abstract`, so
 * they are the passage Google and AI assistants are most likely to quote.
 *
 * What can go wrong, and why nothing else would catch it:
 *  - A box quotes a figure the page does not give (a price from an old
 *    ladder, a temperature from somewhere else). It is valid TypeScript, the
 *    page builds, and a reader sees the box contradict the table beneath it.
 *    While writing them, two such conflicts turned up inside MET already: the
 *    guide fee is 500–800 MAD in one post and 400–600 MAD in another, and the
 *    Sahara table runs 1–2 °C warmer than ERA5. So the rule here is strict:
 *    every number in a box appears in the same page (title, excerpt, content
 *    or FAQ, in that language) or in the box's own named source.
 *  - A box exists in English and not in a translation, so /de or /es (where
 *    most of the Toubkal-weather clicks come from) misses it.
 *  - A box grows into a second article. AI answers quote passages of about
 *    130–170 words; past ~180 the passage stops being quotable as one.
 */
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/** Numbers as digits only: 4,167 / 4.167 / 4 167 → 4167; ranges and signs split off. */
function numbers(s: string): Set<string> {
  const out = new Set<string>();
  for (const m of s.matchAll(/\d{1,3}(?:[.,   ]\d{3})+(?!\d)|\d+/g)) out.add(m[0].replace(/[.,   ]/g, "").replace(/^0+(?=\d)/, ""));
  return out;
}

const answered = BLOG_POSTS.filter((p) => p.answer);

describe("blog answer boxes", () => {
  it("exist on at least the ten most-read posts", () => {
    expect(answered.length).toBeGreaterThanOrEqual(10);
  });

  it("are in every language the post is published in", () => {
    const missing: string[] = [];
    for (const p of answered)
      for (const l of LOCALES)
        if (isTranslated(l, p.slug) && !blogPostsFor(l).find((x) => x.slug === p.slug)?.answer) missing.push(`${l}: ${p.slug}`);
    expect(missing, "Add the answer box to these translations (the post record's `answer` field):\n  " + missing.join("\n  ")).toEqual([]);
  });

  it("stay one quotable passage (60–180 words)", () => {
    const wrong: string[] = [];
    for (const l of LOCALES)
      for (const p of blogPostsFor(l))
        if (p.answer) {
          const n = p.answer.text.trim().split(/\s+/).length;
          if (n < 60 || n > 180) wrong.push(`${l}: ${p.slug} has ${n} words`);
        }
    expect(wrong, "Rewrite these boxes to 60–180 words:\n  " + wrong.join("\n  ")).toEqual([]);
  });

  it("only quote figures the page itself gives, or that their source names", () => {
    const wrong: string[] = [];
    for (const l of LOCALES)
      for (const p of blogPostsFor(l)) {
        if (!p.answer) continue;
        const page = [p.title, p.excerpt, p.content, p.seoTitle ?? "", p.seoDescription ?? "", ...(p.faq ?? []).flatMap((f) => [f.q, f.a]), p.answer.source ?? ""].join("\n");
        const known = numbers(page);
        const extra = [...numbers(p.answer.text)].filter((n) => !known.has(n));
        if (extra.length) wrong.push(`${l}: ${p.slug} quotes ${extra.join(", ")}`);
      }
    expect(
      wrong,
      "These boxes quote numbers that appear nowhere else on their page. Either the box is wrong, or the\n" +
        "figure must be added to the page (with its source) first:\n  " + wrong.join("\n  "),
    ).toEqual([]);
  });
});
