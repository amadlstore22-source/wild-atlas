import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "@/app/sitemap";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, blogSlugFor, isTranslated } from "@/lib/blog-i18n";
import BLOG_LASTMOD from "@/lib/blog-lastmod.json";

/**
 * THE INCIDENT (found 2026-11-27, Search Console URL Inspection of the
 * sitemap). app/sitemap.ts gave every locale of a blog post the ENGLISH
 * record's updatedAt. The translated records have their own updatedAt, but
 * it was almost never bumped when a translation was rewritten or retitled:
 * git shows 439 of 608 translated posts changed after the date the sitemap
 * gave Google. Meanwhile 157 of the first 704 pages inspected were "Crawled -
 * currently not indexed", most last crawled in July and August, before the
 * translation and retitle work. The sitemap told Google nothing had changed.
 *
 * Nothing else catches it: the sitemap is valid, every date is plausible,
 * and only comparing a date with the file's git history shows it is stale.
 *
 * The dates now come from lib/blog-lastmod.json, which
 * scripts/build-blog-lastmod.mjs writes from git blame of each record (run
 * on prebuild; a shallow Vercel clone keeps the committed file, because
 * there git dates every line to the oldest commit it has).
 */
const LOCALES = ["fr", "es", "de", "it", "ar"] as const;
const map = BLOG_LASTMOD as Record<string, string>;
const entries = sitemap();

describe("blog sitemap dates per locale", () => {
  it("has a git date for every translated post", () => {
    const missing: string[] = [];
    for (const lang of LOCALES)
      for (const p of BLOG_POSTS) if (isTranslated(lang, p.slug) && !map[`${lang}:${p.slug}`]) missing.push(`${lang}:${p.slug}`);
    expect(
      missing,
      "These translations have no date in lib/blog-lastmod.json. Run `node scripts/build-blog-lastmod.mjs`\n" +
        "from the full working copy (not a shallow clone) and commit the file:\n  " + missing.join("\n  "),
    ).toEqual([]);
  });

  it("dates each translation by the latest of English, its own record and its git date", () => {
    const wrong: string[] = [];
    for (const lang of LOCALES)
      for (const p of BLOG_POSTS) {
        if (!isTranslated(lang, p.slug)) continue;
        const local = blogPostsFor(lang).find((x) => x.slug === p.slug)!;
        const expected = Math.max(
          Date.parse(p.updatedAt ?? p.publishedAt),
          Date.parse(local.updatedAt ?? local.publishedAt),
          map[`${lang}:${p.slug}`] ? Date.parse(map[`${lang}:${p.slug}`]) : 0,
        );
        const url = `https://marrakechecotours.com/${lang}/blog/${blogSlugFor(lang, p.slug)}`;
        const got = entries.find((e) => e.url === url)?.lastModified;
        if (!got || new Date(got).getTime() !== expected) wrong.push(`${url} (sitemap ${got ? new Date(got).toISOString().slice(0, 10) : "missing"})`);
      }
    expect(wrong, "Translated posts must carry their own date in app/sitemap.ts:\n  " + wrong.join("\n  ")).toEqual([]);
  });

  it("keeps the committed map on a shallow clone and runs before every build", () => {
    const root = process.cwd();
    const script = readFileSync(join(root, "scripts/build-blog-lastmod.mjs"), "utf8");
    expect(script).toMatch(/--is-shallow-repository/);
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.scripts.prebuild).toMatch(/build-blog-lastmod/);
  });
});
