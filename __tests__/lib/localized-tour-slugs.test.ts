import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { toursFor, getTourFor, tourSlugFor } from "@/lib/tours-i18n";

/**
 * Localised tour slugs live in two places that must agree:
 *   - `localizedSlug` in lib/tours.<locale>.ts, which decides the URL served
 *   - the TOUR_SLUGS_* maps in proxy.ts, which 308 the English URL to it
 *
 * Drift here is worse than on the blog: these are the booking pages. A proxy
 * entry pointing at a segment no tour claims sends a live, indexed money page
 * to a 404, and nothing else in the build would notice.
 */

const proxySrc = readFileSync(join(__dirname, "..", "..", "proxy.ts"), "utf-8");

function proxyMap(locale: string): Record<string, string> {
  const block = proxySrc.match(
    new RegExp(`const TOUR_SLUGS_${locale.toUpperCase()}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`)
  );
  if (!block) return {};
  const out: Record<string, string> = {};
  for (const [, k, v] of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[k] = v;
  return out;
}

const LOCALISED = ["fr", "es", "de", "it"] as const;

describe("localised tour slugs", () => {
  it("proxy.ts and the tour data agree in every locale", () => {
    for (const lc of LOCALISED) {
      const map = proxyMap(lc);
      expect(Object.keys(map).length, `${lc}: proxy map is empty`).toBe(TOURS.length);

      for (const [enSlug, localised] of Object.entries(map)) {
        const tour = toursFor(lc).find((t) => t.slug === enSlug);
        expect(tour, `${lc}: proxy redirects ${enSlug} but no such tour`).toBeDefined();
        expect(
          tour!.localizedSlug,
          `${lc}: proxy sends ${enSlug} -> ${localised}, tour says ${tour!.localizedSlug}`
        ).toBe(localised);
      }
    }
  });

  it("every tour has a localised slug in every localised locale", () => {
    for (const lc of LOCALISED) {
      for (const tour of toursFor(lc)) {
        expect(
          tour.localizedSlug,
          `${lc}/${tour.slug} has no localizedSlug — it would serve an English URL`
        ).toBeTruthy();
      }
    }
  });

  it("resolves a tour by either its localised or English slug", () => {
    for (const lc of LOCALISED) {
      for (const tour of toursFor(lc)) {
        expect(getTourFor(lc, tour.localizedSlug!)?.slug).toBe(tour.slug);
        // The English slug must keep resolving: every existing backlink, every
        // indexed URL, and every inline /xx/tours/... link inside translated
        // blog copy still uses it.
        expect(getTourFor(lc, tour.slug)?.slug).toBe(tour.slug);
      }
    }
  });

  it("localised slugs are unique within a locale", () => {
    for (const lc of LOCALISED) {
      const segments = toursFor(lc).map((t) => tourSlugFor(lc, t.slug));
      expect(new Set(segments).size, `${lc}: duplicate URL segment`).toBe(segments.length);
    }
  });

  it("localised slugs never collide with another tour's English slug", () => {
    // A localised segment equal to a DIFFERENT tour's English slug would make
    // getTourFor ambiguous — localizedSlug is matched first, so the English URL
    // for that other tour would silently serve the wrong page.
    const english = new Set(TOURS.map((t) => t.slug));
    for (const lc of LOCALISED) {
      for (const tour of toursFor(lc)) {
        const seg = tour.localizedSlug!;
        if (english.has(seg)) {
          expect(seg, `${lc}: ${tour.slug} localised to another tour's slug`).toBe(tour.slug);
        }
      }
    }
  });

  it("localised slugs are URL-safe", () => {
    for (const lc of LOCALISED) {
      for (const tour of toursFor(lc)) {
        expect(tour.localizedSlug, `${lc}/${tour.slug}`).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  it("English and Arabic keep the English slug", () => {
    for (const lc of ["en", "ar"] as const) {
      for (const tour of toursFor(lc)) {
        expect(tourSlugFor(lc, tour.slug), `${lc}/${tour.slug}`).toBe(tour.slug);
      }
    }
  });
});
