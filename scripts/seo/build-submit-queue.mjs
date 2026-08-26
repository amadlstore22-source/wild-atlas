/**
 * Build a priority-ordered submission queue for the Indexing API.
 *
 * The quota is 200 URLs/day, and the sitemap holds ~1,000, so the order is the
 * whole decision. Submitting alphabetically would spend a day's quota on
 * Arabic legal pages.
 *
 * Priority is set by what Search Console actually shows for this site:
 *   1. Brand-new URLs Google has never seen (the 42 event pages) — nothing
 *      else can discover them yet, and discovery is the entire point.
 *   2. Commercial pages: tours. These sit at avg position ~52 and are what
 *      the business sells.
 *   3. Money blog posts (cost/price/guide queries) — the pages that already
 *      rank, e.g. toubkal-guide-cost at position 6.
 *   4. English before other locales WITHIN each tier: 140 of the "Discovered
 *      – currently not indexed" URLs were 94% non-English, i.e. Google is
 *      already choosing not to spend crawl budget there. Pushing more of them
 *      first would repeat that.
 *   5. Everything else.
 *
 * Legal pages (terms/privacy/cookies) are excluded outright — they are
 * noindex-adjacent boilerplate and would burn quota for nothing.
 *
 * Usage:
 *   node scripts/seo/build-submit-queue.mjs                 # write the queue
 *   node scripts/seo/build-submit-queue.mjs --exclude-listed # skip INDEXING_LIST.txt
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITEMAP = ".next/server/app/sitemap.xml.body";
const OUT = "docs/submit-queue.txt";
const EXCLUDE_LISTED = process.argv.includes("--exclude-listed");

if (!existsSync(SITEMAP)) {
  console.error(`Missing ${SITEMAP}. Run \`npm run build\` first.`);
  process.exit(1);
}

const urls = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]
);

let alreadyListed = new Set();
if (EXCLUDE_LISTED && existsSync("INDEXING_LIST.txt")) {
  alreadyListed = new Set(
    readFileSync("INDEXING_LIST.txt", "utf8")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith("http"))
  );
}

// Pages that should never consume quota.
const SKIP = /\/(terms|privacy|cookies|review)$/;

// Blog slugs that target commercial intent.
const MONEY = /(cost|price|prix|precio|kosten|prezzo|guide|vs-|itinerary)/;

function tier(url) {
  const path = new URL(url).pathname;
  const isEn = path.startsWith("/en/");
  const bump = isEn ? 0 : 0.5; // English first inside every tier

  if (path.includes("/events")) return 1 + bump;
  if (path.includes("/tours/")) return 2 + bump;
  if (path.includes("/blog/") && MONEY.test(path)) return 3 + bump;
  if (/\/(tours|destinations|guides)$/.test(path)) return 4 + bump;
  if (path.includes("/destinations/")) return 5 + bump;
  if (path.includes("/blog/")) return 6 + bump;
  return 7 + bump;
}

const queue = urls
  .filter((u) => !SKIP.test(new URL(u).pathname))
  .filter((u) => !alreadyListed.has(u))
  .map((u) => ({ u, t: tier(u) }))
  .sort((a, b) => a.t - b.t || a.u.localeCompare(b.u))
  .map((x) => x.u);

writeFileSync(OUT, queue.join("\n") + "\n", "utf8");

const byTier = {};
for (const u of queue) {
  const t = Math.floor(tier(u));
  byTier[t] = (byTier[t] ?? 0) + 1;
}
const NAMES = {
  1: "event pages (new — nothing else can discover them)",
  2: "tour pages (commercial)",
  3: "money blog posts (cost/price/guide)",
  4: "section indexes",
  5: "destination pages",
  6: "other blog posts",
  7: "everything else",
};

console.log(`Wrote ${queue.length} URLs to ${OUT}`);
if (EXCLUDE_LISTED) console.log(`(excluded ${alreadyListed.size} already in INDEXING_LIST.txt)`);
console.log("");
for (const t of Object.keys(byTier).sort()) {
  console.log(`  tier ${t}  ${String(byTier[t]).padStart(4)}  ${NAMES[t]}`);
}
console.log("");
console.log(`Day 1 (first 200): ${queue.slice(0, 200).length} URLs`);
console.log(`Days needed at 200/day: ${Math.ceil(queue.length / 200)}`);
