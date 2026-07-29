// Regenerate docs/all-index-urls.txt — the complete list of canonical URLs to
// submit to the Google Indexing API. Mirrors app/sitemap.ts exactly so the two
// never drift. Run:  node scripts/build_index_list.mjs
//
// Reads slugs/ids straight from the source data files via regex (no TS build
// step needed), then fans out across locales the same way the sitemap does.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://marrakechecotours.com";
const LOCALES = ["en", "fr", "es", "de", "it", "ar"];

const read = (p) => readFileSync(path.join(ROOT, p), "utf8");

// Top-level slugs only: a `slug: "..."` line indented by exactly 4 spaces is a
// tour/blog entry; deeper indents are nested (stops, faq, etc.).
function topLevelSlugs(src) {
  return [...src.matchAll(/^ {4}slug: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
}
function topLevelIds(src) {
  return [...src.matchAll(/^ {4}id: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
}

const tours = topLevelSlugs(read("lib/tours.ts"));
const blog = topLevelSlugs(read("lib/blog.ts"));
const destinations = topLevelSlugs(read("lib/destinations.ts"));
const guides = topLevelIds(read("lib/guides.ts"));
// Categories: the 4 CATEGORIES entries in lib/tours.ts (id: "trekking" etc.).
const categories = ["trekking", "desert", "day-tours", "cultural"];

// Static routes carried in the sitemap (same list as app/sitemap.ts).
const staticPaths = ["", "/tours", "/destinations", "/guides", "/news", "/blog", "/about", "/contact", "/terms", "/privacy", "/cookies"];

const urls = [];
const add = (p) => LOCALES.forEach((l) => urls.push(`${BASE}/${l}${p}`));

staticPaths.forEach(add);
tours.forEach((s) => add(`/tours/${s}`));
categories.forEach((c) => add(`/categories/${c}`));
destinations.forEach((s) => add(`/destinations/${s}`));
guides.forEach((g) => add(`/guides/${g}`));
blog.forEach((s) => add(`/blog/${s}`));

// De-dupe defensively and write.
const unique = [...new Set(urls)];
writeFileSync(path.join(ROOT, "docs/all-index-urls.txt"), unique.join("\n") + "\n", "utf8");

console.log(`Wrote ${unique.length} URLs to docs/all-index-urls.txt`);
console.log(
  `  static ${staticPaths.length}×${LOCALES.length}=${staticPaths.length * 6} · ` +
  `tours ${tours.length}×6=${tours.length * 6} · ` +
  `categories ${categories.length}×6=${categories.length * 6} · ` +
  `destinations ${destinations.length}×6=${destinations.length * 6} · ` +
  `guides ${guides.length}×6=${guides.length * 6} · ` +
  `blog ${blog.length}×6=${blog.length * 6}`,
);
