import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

/**
 * EVERY OPTIMIZED IMAGE WAS SENT TO THE BROWSER WITH max-age=0
 *
 * Vercel serves /public with `Cache-Control: public, max-age=0,
 * must-revalidate`. next/image DERIVES the optimized image's expiry from that
 * upstream header — the Next docs are explicit: "The expiration (or rather Max
 * Age) of the optimized image is defined by either the minimumCacheTTL or the
 * upstream image Cache-Control header, whichever is larger", and "If you need
 * to change the caching behavior per image, you can configure headers to set
 * the Cache-Control header on the upstream image (e.g. /some-asset.jpg, not
 * /_next/image itself)."
 *
 * So minimumCacheTTL: 31 days was already set here and did nothing for the
 * browser. Measured on the live site:
 *
 *   /gallery/*.jpg          Cache-Control: public, max-age=0, must-revalidate
 *   /_next/image?...        Cache-Control: public, max-age=0, must-revalidate
 *   /_next/static/*.js      Cache-Control: public,max-age=31536000,immutable
 *
 * Vercel's own edge reported X-Vercel-Cache: HIT, which is what made this easy
 * to miss — the CDN was caching perfectly while every returning visitor was
 * still told to revalidate all 33 images on the homepage, on every navigation.
 * That is a slower repeat visit AND billable edge requests, on a site whose
 * single biggest asset is its photography.
 *
 * After the fix the optimized response carries max-age=2678400 (31 days — the
 * larger of the two values, as documented).
 *
 * WHY NOT `immutable`, which is what the hashed JS gets:
 * these filenames are stable, not content-hashed, and gallery files have
 * genuinely been replaced in place three times in this repo's history (image
 * resizing passes). `immutable` would pin a stale photograph in every
 * visitor's browser for a year with no way to bust it short of renaming the
 * file. stale-while-revalidate gives the same practical hit rate and still
 * lets a replaced file propagate.
 *
 * Nothing else catches this: it is not a type error, not a build failure, and
 * every page renders correctly. It is only visible in a response header.
 */

type HeaderRule = { source: string; headers: { key: string; value: string }[] };

async function rules(): Promise<HeaderRule[]> {
  const headers = nextConfig.headers;
  if (typeof headers !== "function") throw new Error("next.config has no headers()");
  return (await headers()) as HeaderRule[];
}

describe("image caching", () => {
  it("serves /gallery with a long max-age, so optimized images inherit one", () => {
    return rules().then((rs) => {
      const gallery = rs.find((r) => r.source.startsWith("/gallery"));

      expect(
        gallery,
        "There is no headers() rule for /gallery. Without it Vercel serves\n" +
          "those files with max-age=0, and next/image derives the OPTIMIZED\n" +
          "image's expiry from that upstream header — so every visitor\n" +
          "revalidates every photograph on every page view, no matter what\n" +
          "minimumCacheTTL says.",
      ).toBeDefined();

      const cc = gallery!.headers.find((h) => h.key.toLowerCase() === "cache-control");
      expect(cc, "The /gallery rule sets no Cache-Control header.").toBeDefined();

      const maxAge = Number(/max-age=(\d+)/.exec(cc!.value)?.[1] ?? 0);
      expect(
        maxAge,
        `/gallery is served with max-age=${maxAge}. That is what the optimizer\n` +
          `inherits, so a low value here silently defeats minimumCacheTTL and\n` +
          `sends every optimized image out as revalidate-on-every-view.`,
      ).toBeGreaterThanOrEqual(86_400);
    });
  });

  it("does not mark /gallery immutable, because those files get replaced in place", () => {
    // The plausible over-fix. Gallery filenames are stable rather than
    // content-hashed, and this repo has replaced images under the same name
    // three times. immutable would strand a stale photo in every browser.
    return rules().then((rs) => {
      const gallery = rs.find((r) => r.source.startsWith("/gallery"));
      const cc = gallery?.headers.find((h) => h.key.toLowerCase() === "cache-control");

      expect(
        /immutable/.test(cc?.value ?? ""),
        "/gallery is marked `immutable`. These filenames are NOT content-\n" +
          "hashed, and gallery images have been replaced in place three times\n" +
          "in this repo (resizing passes). immutable tells every browser to\n" +
          "never re-check for a year, so a corrected photograph would never\n" +
          "reach anyone who had already loaded the old one. Use\n" +
          "stale-while-revalidate instead.",
      ).toBe(false);
    });
  });

  it("keeps minimumCacheTTL, which sets the floor the optimizer actually uses", () => {
    // The two settings work together: the header governs the browser and the
    // upstream value the optimizer reads; minimumCacheTTL is the floor applied
    // to the optimized variant. Removing either re-opens the defect.
    const ttl = nextConfig.images?.minimumCacheTTL ?? 0;
    expect(
      ttl,
      "images.minimumCacheTTL has been removed or lowered. It is the floor for\n" +
        "the optimized image's expiry — the documented rule is that Next uses\n" +
        "whichever is larger, minimumCacheTTL or the upstream Cache-Control.",
    ).toBeGreaterThanOrEqual(86_400);
  });

  it("still drops the 2048/3840 buckets that cost ~2s on a cold hero", () => {
    // Each extra deviceSize is another billable transformation per source
    // image, and the comment in next.config.ts records that these two measured
    // ~2s between TTFB and FCP on the 100vw heroes.
    const sizes = nextConfig.images?.deviceSizes ?? [];
    expect(
      sizes.filter((w: number) => w > 1920),
      `deviceSizes contains buckets above 1920. No hero on the site renders\n` +
        `wider than that, so each one only adds a billable transformation per\n` +
        `image and makes Vercel transcode a 4K variant on a cold cache miss\n` +
        `before it can respond: ${JSON.stringify(sizes)}`,
    ).toEqual([]);
  });
});
