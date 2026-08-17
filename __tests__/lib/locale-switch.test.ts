import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { translatePath } from "@/lib/locale-switch";
import { blogPostsFor } from "@/lib/blog-i18n";
import { toursFor } from "@/lib/tours-i18n";

/**
 * INCIDENT (reported by the owner 2026-08-17, reproduced from the code)
 *
 * The header's language switcher replaced only the locale segment:
 *
 *     const segments = pathname.split("/");
 *     segments[1] = newLang;
 *
 * On any page whose URL segment is translated, that leaves the slug in the OLD
 * language. Switching French -> English on the site's best-performing post sent
 * the visitor from /fr/blog/prix-guide-toubkal to /en/blog/prix-guide-toubkal,
 * which is a hard 404: English serves that post at toubkal-guide-cost.
 *
 * Why nothing caught it:
 *   - typecheck and build pass; the string manipulation is valid
 *   - proxy.ts maps English -> localised ONLY, so it had no reverse entry to
 *     redirect the broken URL back to a real page
 *   - every locale test asserted that the localised URL WORKS, never that
 *     moving between locales lands somewhere real
 *
 * Scope at the time: 24 blog posts x 4 locales and ~46 tours x 4 locales, in
 * both directions — every localised page on the site, not one post.
 */

const LOCALISED = ["fr", "es", "de", "it"] as const;
const ALL = ["en", "fr", "es", "de", "it", "ar"] as const;

const proxySrc = readFileSync(join(__dirname, "..", "..", "proxy.ts"), "utf-8");

function proxyMap(prefix: string, locale: string): Record<string, string> {
  const m = proxySrc.match(
    new RegExp(`const ${prefix}_${locale.toUpperCase()}: Record<string, string> = \\{([\\s\\S]*?)\\n\\};`)
  );
  if (!m) return {};
  const out: Record<string, string> = {};
  for (const [, k, v] of m[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[k] = v;
  return out;
}

describe("locale switching translates the slug, not just the prefix", () => {
  it("the reported case no longer 404s", () => {
    expect(translatePath("/fr/blog/prix-guide-toubkal", "fr", "en")).toBe(
      "/en/blog/toubkal-guide-cost"
    );
    expect(translatePath("/en/blog/toubkal-guide-cost", "en", "fr")).toBe(
      "/fr/blog/prix-guide-toubkal"
    );
  });

  it("every localised blog URL maps to a real page in every other locale", () => {
    const broken: string[] = [];

    for (const from of ALL) {
      for (const post of blogPostsFor(from)) {
        const fromSeg = post.localizedSlug ?? post.slug;
        for (const to of ALL) {
          if (to === from) continue;
          const got = translatePath(`/${from}/blog/${fromSeg}`, from, to);
          const wantSeg =
            blogPostsFor(to).find((p) => p.slug === post.slug)?.localizedSlug ?? post.slug;
          const want = `/${to}/blog/${wantSeg}`;
          if (got !== want) broken.push(`${from}->${to}: ${got} (should be ${want})`);
        }
      }
    }

    expect(
      broken.slice(0, 25),
      `Switching language lands on a URL no page serves:\n  ${broken.slice(0, 25).join("\n  ")}`
    ).toEqual([]);
  });

  it("every localised tour URL maps to a real page in every other locale", () => {
    const broken: string[] = [];

    for (const from of ALL) {
      for (const tour of toursFor(from)) {
        const fromSeg = tour.localizedSlug ?? tour.slug;
        for (const to of ALL) {
          if (to === from) continue;
          const got = translatePath(`/${from}/tours/${fromSeg}`, from, to);
          const wantSeg =
            toursFor(to).find((t) => t.slug === tour.slug)?.localizedSlug ?? tour.slug;
          const want = `/${to}/tours/${wantSeg}`;
          if (got !== want) broken.push(`${from}->${to}: ${got} (should be ${want})`);
        }
      }
    }

    expect(
      broken.slice(0, 25),
      `Switching language lands on a URL no page serves:\n  ${broken.slice(0, 25).join("\n  ")}`
    ).toEqual([]);
  });

  it("leaves untranslated routes alone apart from the prefix", () => {
    for (const [path, from, to, want] of [
      ["/en/tours", "en", "fr", "/fr/tours"],
      ["/en/about", "en", "de", "/de/about"],
      ["/fr/contact", "fr", "en", "/en/contact"],
      ["/en", "en", "it", "/it"],
      ["/en/categories/desert", "en", "es", "/es/categories/desert"],
    ] as const) {
      expect(translatePath(path, from, to)).toBe(want);
    }
  });

  it("stays in sync with proxy.ts, which is the source of truth", () => {
    // The switcher's maps are the inverse of the proxy's. If a new localised
    // slug is added to proxy.ts and not regenerated here, switching language on
    // that page 404s again — exactly the original bug.
    const drift: string[] = [];

    for (const locale of LOCALISED) {
      for (const [prefix, kind] of [["BLOG_SLUGS", "blog"], ["TOUR_SLUGS", "tours"]] as const) {
        for (const [en, localised] of Object.entries(proxyMap(prefix, locale))) {
          if (en === localised) continue;
          const back = translatePath(`/${locale}/${kind}/${localised}`, locale, "en");
          if (back !== `/en/${kind}/${en}`) {
            drift.push(`${locale} ${kind}: ${localised} -> ${back}, proxy says ${en}`);
          }
        }
      }
    }

    expect(
      drift.slice(0, 20),
      `lib/locale-switch.ts is out of sync with proxy.ts:\n  ${drift.slice(0, 20).join("\n  ")}`
    ).toEqual([]);
  });
});
