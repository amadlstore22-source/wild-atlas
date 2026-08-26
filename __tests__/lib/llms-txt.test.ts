import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { TOURS } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * public/llms.txt claimed "the full catalogue of 41 tours". There are 46.
 *
 * The number was correct when it was written — 41 is still exactly the
 * private-tour count — and then five shared departures were added and nobody
 * edited a hand-maintained text file sitting in /public.
 *
 * A stale number matters more here than it normally would. llms.txt exists so
 * AI assistants treat it as the authoritative summary of the business, which
 * means a wrong figure is repeated back to users as fact with no page to
 * contradict it. The site's own pages were never wrong: they read
 * STATS.tourCount, which is computed from TOURS.length precisely so it "can
 * never fall out of sync". Only the static file drifted.
 *
 * Nothing else can catch this. llms.txt is not TypeScript, no module imports
 * it, `next build` never reads it, and the hreflang audit only walks .next.
 *
 * Every URL in the file is also asserted below. A link rotting in llms.txt is
 * worse than a normal dead link: an assistant will cite it confidently, and the
 * user lands on a 404 with our name attached to it.
 */

const LLMS = readFileSync("public/llms.txt", "utf8");

describe("public/llms.txt", () => {
  it("states the real tour count", () => {
    const m = LLMS.match(/catalogue of (\d+) tours/);
    expect(m, "the tour-count phrase is missing — did the wording change?").toBeTruthy();
    expect(
      Number(m![1]),
      `llms.txt advertises ${m![1]} tours but the catalogue holds ${TOURS.length}.\n` +
        `Regenerate it rather than hand-editing the number:\n` +
        `    node scripts/seo/sync-llms-txt.mjs`,
    ).toBe(TOURS.length);
  });

  it("links only to tour slugs that exist", () => {
    const slugs = new Set(TOURS.map((t) => t.slug));
    const linked = [...LLMS.matchAll(/marrakechecotours\.com\/en\/tours\/([a-z0-9-]+)/g)]
      .map((m) => m[1])
      .filter((s) => s.length > 0);

    const dead = [...new Set(linked)].filter((s) => !slugs.has(s));
    expect(
      dead,
      `These tour URLs in llms.txt point at slugs that no longer exist. An AI\n` +
        `assistant will cite them and send the reader to a 404:\n  ` + dead.join("\n  "),
    ).toEqual([]);
  });

  it("links only to blog slugs that exist", () => {
    // The file curates 14 guides as the ones an assistant should cite. A
    // renamed slug here is a confidently-cited 404, same as a tour.
    const slugs = new Set(BLOG_POSTS.map((p) => p.slug));
    const linked = [...LLMS.matchAll(/marrakechecotours\.com\/en\/blog\/([a-z0-9-]+)/g)]
      .map((m) => m[1]);

    const dead = [...new Set(linked)].filter((s) => !slugs.has(s));
    expect(
      dead,
      `These blog URLs in llms.txt point at slugs that no longer exist:\n  ` + dead.join("\n  "),
    ).toEqual([]);
  });

  it("keeps the facts that also live in code identical", () => {
    // These are asserted rather than generated because they are prose, but a
    // change to the underlying constant must not leave llms.txt behind.
    expect(LLMS, "llms.txt no longer names the 2010 founding").toContain("2010");
    expect(LLMS, "llms.txt no longer carries the TripAdvisor rating").toMatch(/5\.0\/5[^\n]*122 reviews/);
  });

  it("uses absolute https URLs on the canonical host", () => {
    // Relative links are meaningless once the file is ingested out of context,
    // and a .vercel.app link would hand an assistant the preview domain.
    const bad = [...LLMS.matchAll(/\]\(([^)]+)\)/g)]
      .map((m) => m[1])
      .filter((u) => !u.startsWith("https://marrakechecotours.com") && !u.startsWith("https://wa.me"));

    expect(
      bad,
      `llms.txt links must be absolute and on the canonical host:\n  ` + bad.join("\n  "),
    ).toEqual([]);
  });
});
