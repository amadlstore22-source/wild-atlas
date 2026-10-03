import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { ogBase } from "@/lib/seo/open-graph";

/**
 * The 2026-10-03 live crawl found 318 internal links that only reached their
 * page through a 301/308. The blog index, related-post cards, news teasers and
 * the "guides" box on tour pages all built `/${lang}/blog/${post.slug}` from
 * the ENGLISH slug, so in fr/es/de/it every card pointed at a URL that
 * redirects to the localised one. Net effect: 87 translated posts had no
 * direct inbound link anywhere on the site, and every click paid a redirect.
 *
 * Typecheck and next build both pass on this — the redirect makes the link
 * "work". Only a crawl that refuses to follow redirects notices.
 *
 * Fix: build hrefs through blogSlugFor()/tourSlugFor(). This test fails on any
 * template literal that interpolates a bare `.slug` into a /blog/ or /tours/
 * path, anywhere in app/ or components/.
 */
const ROOTS = ["app", "components"];
const BARE_SLUG = /\/(blog|tours)\/\$\{\s*[\w.]+\.slug\s*\}/g;

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : /\.tsx?$/.test(e.name) ? [p] : [];
  });
}

describe("internal links use localised slugs", () => {
  it("never builds a /blog/ or /tours/ href from a bare English slug", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      for (const file of walk(path.resolve(root))) {
        fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
          if (BARE_SLUG.test(line)) offenders.push(`${path.relative(process.cwd(), file)}:${i + 1}  ${line.trim()}`);
          BARE_SLUG.lastIndex = 0;
        });
      }
    }
    expect(
      offenders,
      `These hrefs use the English slug, which 301s in fr/es/de/it.\n` +
        `Wrap the slug in blogSlugFor(lang, …) or tourSlugFor(lang, …):\n  ` +
        offenders.join("\n  ")
    ).toEqual([]);
  });
});

/**
 * Same crawl: 17 pages (destinations and events indexes in every locale, the
 * five travel-from pages) shipped with no og:image. Each declared its own
 * openGraph, and Next REPLACES the layout's openGraph rather than merging it,
 * so the layout's share image vanished. A WhatsApp share showed no picture.
 */
describe("open graph defaults", () => {
  it("ogBase carries a share image so no page that spreads it ships without one", () => {
    const og = ogBase("fr") as { images?: unknown[] };
    expect(og.images?.length, "ogBase(lang) must include the default og:image").toBeGreaterThan(0);
  });
});
