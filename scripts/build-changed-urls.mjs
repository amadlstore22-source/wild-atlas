// Build an index-submission list from what actually changed in git.
//
// The standing priority list (docs/priority-index-urls.txt) is tour pages only.
// After a content pass that rewrites blog posts, resubmitting priority tells
// Google nothing new — the pages that changed are not in it. This derives the
// list from the commit range instead, so a submission run matches the work.
//
// Usage:
//   node scripts/build-changed-urls.mjs <since-ref>     # e.g. HEAD~4
//   node scripts/build-changed-urls.mjs HEAD~4 --write  # write the file
//
// Writes docs/changed-index-urls.txt, ordered English-first so a truncated
// run still covers the highest-value locale.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const since = process.argv[2];
const write = process.argv.includes("--write");
if (!since) {
  console.error("usage: node scripts/build-changed-urls.mjs <since-ref> [--write]");
  process.exit(1);
}

const SITE = "https://marrakechecotours.com";
const LOCALES = ["en", "fr", "es", "de", "it", "ar"];

const diff = execSync(`git diff --name-only ${since}..HEAD`, { encoding: "utf8" })
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

// Which catalogues were touched, and which slugs inside them?
const changedBlog = new Set();
const changedTour = new Set();

for (const file of diff) {
  if (!/^lib\/(blog|tours)/.test(file)) continue;
  const isTour = file.startsWith("lib/tours");
  // slugs whose record lines changed in this range
  let patch = "";
  try {
    patch = execSync(`git diff -U0 ${since}..HEAD -- "${file}"`, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    continue;
  }
  // Walk the file once, mapping every line number to the slug it belongs to,
  // then attribute each changed hunk to that slug.
  const src = existsSync(file) ? readFileSync(file, "utf8").split("\n") : [];
  const owner = [];
  let current = null;
  for (let i = 0; i < src.length; i++) {
    const m = src[i].match(/^\s*slug: "([a-z0-9-]+)"/);
    if (m) current = m[1];
    owner[i] = current;
  }
  for (const h of patch.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = parseInt(h[1], 10);
    const len = h[2] ? parseInt(h[2], 10) : 1;
    for (let n = start; n < start + Math.max(len, 1); n++) {
      const slug = owner[n - 1];
      if (slug) (isTour ? changedTour : changedBlog).add(slug);
    }
  }
}

// Keep only slugs that are really published, using the sitemap as the authority.
const sitemapPath = ".next/server/app/sitemap.xml.body";
let live = null;
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  live = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

// Most locales publish a translated slug (fr/blog/prix-circuit-maroc-taille-groupe,
// not fr/blog/morocco-tour-price-group-size), so the English path is usually not
// the live URL. Resolve each locale's real path from the catalogue's
// localizedSlug rather than guessing, and fall back to the English slug for
// Arabic, which never carries one.
function localisedSlugs(kind, slug) {
  const out = { en: slug };
  for (const lc of LOCALES.filter((l) => l !== "en")) {
    const files =
      kind === "tour"
        ? [`lib/tours.${lc}.ts`]
        : [`lib/blog.${lc}.part1.ts`, `lib/blog.${lc}.part2.ts`];
    for (const f of files) {
      if (!existsSync(f)) continue;
      const src = readFileSync(f, "utf8");
      const i = src.indexOf(`slug: "${slug}"`);
      if (i === -1) continue;
      const next = src.indexOf('\n    slug: "', i + 10);
      const rec = src.slice(i, next === -1 ? undefined : next);
      const m = rec.match(/localizedSlug: "([^"]+)"/);
      out[lc] = m ? m[1] : slug;
      break;
    }
    if (!out[lc]) out[lc] = slug;
  }
  return out;
}

const urls = [];
for (const lc of LOCALES) {
  for (const slug of [...changedBlog].sort())
    urls.push(`${SITE}/${lc}/blog/${localisedSlugs("blog", slug)[lc]}`);
  for (const slug of [...changedTour].sort())
    urls.push(`${SITE}/${lc}/tours/${localisedSlugs("tour", slug)[lc]}`);
}

// The sitemap is the authority on what is actually published, so anything it
// does not list is a bad guess and is dropped rather than submitted as a 404.
const final = live ? urls.filter((u) => live.has(u)) : urls;
const dropped = urls.length - final.length;

console.log(`changed since ${since}:`);
console.log(`  blog slugs: ${changedBlog.size}`);
console.log(`  tour slugs: ${changedTour.size}`);
console.log(`  urls:       ${final.length}${dropped ? `  (${dropped} not in sitemap, dropped)` : ""}`);
if (!live) console.log("  NOTE: no sitemap body found — run `npm run build` for accurate URLs");

if (write) {
  writeFileSync("docs/changed-index-urls.txt", final.join("\n") + "\n");
  console.log("\n  -> docs/changed-index-urls.txt");
  // index-batch.ps1 fills in --key and resolves paths from the repo root, which
  // is what makes this safe to paste from any working directory.
  console.log(`\n  .\\scripts\\index-batch.ps1 docs/changed-index-urls.txt`);
} else {
  console.log("\ndry run; re-run with --write");
}
