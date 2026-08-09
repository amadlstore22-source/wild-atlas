#!/usr/bin/env node
/**
 * Regenerate docs/all-index-urls.txt and docs/priority-index-urls.txt from the
 * BUILT sitemap, so the indexing lists can never drift from what the site
 * actually publishes.
 *
 *   npx next build                       # sitemap.xml.body is written here
 *   node scripts/build-index-urls.mjs
 *
 * Why the sitemap and not the tour/blog data: app/sitemap.ts already resolves
 * every locale, every localised slug and every static route. Re-deriving that
 * here would be a second implementation to keep in sync, and the last list went
 * stale exactly that way (it predated /how-we-operate).
 *
 * Ordering is stable and deliberate — google-index.mjs takes --limit 200/day,
 * so a stable order means tomorrow's run continues where the quota cut off:
 *
 *   1. English money pages (tours) first — they earn the bookings
 *   2. other English pages
 *   3. the five other locales
 *
 * priority-index-urls.txt is the English tours + core static pages, sized to
 * sit well inside one day's quota.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITEMAP = ".next/server/app/sitemap.xml.body";

if (!existsSync(SITEMAP)) {
  console.error(
    `Cannot find ${SITEMAP}\nRun \`npx next build\` first — the sitemap is generated at build time.`,
  );
  process.exit(1);
}

const xml = readFileSync(SITEMAP, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(/&amp;/g, "&").trim(),
);

if (urls.length === 0) {
  console.error("No <loc> entries found — is the sitemap empty?");
  process.exit(1);
}

const seen = new Set();
const unique = urls.filter((u) => (seen.has(u) ? false : (seen.add(u), true)));

const isEn = (u) => /\/en(\/|$)/.test(u) || /marrakechecotours\.com\/?$/.test(u);
const isTour = (u) => /\/tours\/[^/]+$/.test(u);

const rank = (u) => {
  if (isEn(u) && isTour(u)) return 0;
  if (isEn(u)) return 1;
  return 2;
};

const all = [...unique].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

const priority = all.filter(
  (u) =>
    isEn(u) &&
    (isTour(u) ||
      /\/en\/?$/.test(u) ||
      /\/en\/(tours|about|contact|guides|how-we-operate|blog)\/?$/.test(u)),
);

writeFileSync("docs/all-index-urls.txt", all.join("\n") + "\n");
writeFileSync("docs/priority-index-urls.txt", priority.join("\n") + "\n");

const enTours = all.filter((u) => isEn(u) && isTour(u)).length;
console.log(`sitemap URLs:      ${unique.length}`);
console.log(`  English tours:   ${enTours}`);
console.log(`  all-index-urls:  ${all.length}  -> docs/all-index-urls.txt`);
console.log(`  priority:        ${priority.length}  -> docs/priority-index-urls.txt`);
console.log(`\nDays to submit all at 200/day: ${Math.ceil(all.length / 200)}`);
