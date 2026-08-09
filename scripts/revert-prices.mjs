#!/usr/bin/env node
/**
 * Revert the price ladders written on 2026-08-09 (commit dca92bf and the six
 * operator-confirmed ladders before it).
 *
 *   node scripts/revert-prices.mjs --list     show what would change
 *   node scripts/revert-prices.mjs --all      revert every tour below
 *   node scripts/revert-prices.mjs <slug>...  revert only those tours
 *
 * WHAT IT RESTORES
 * Each entry records the tour's `price`, `depositAmount`, `priceMax` and
 * `tourType` exactly as they stood before the change, and whether it had a
 * `groupPricing` block at all. Reverting removes the ladder written on top and
 * puts the old fields back, so the tour returns to the derived curve it used
 * before.
 *
 * WHY A SCRIPT AND NOT A BUTTON
 * A revert control on the live site would mean shipping price-editing to a
 * public page, and the prices are compiled into the build rather than read
 * from a database — a button could not change them without a redeploy anyway.
 * This runs against the source, and `git diff lib/tours.ts` shows exactly what
 * moved before anything is committed.
 *
 * AFTER RUNNING
 *   npx vitest run          the price tests will flag anything inconsistent
 *   npx next build
 *   git diff lib/tours.ts   read it before committing
 *
 * Blog prose that quotes these prices is NOT reverted — those edits were
 * sentence rewrites, not number swaps, and several corrected claims that were
 * false at the old prices. `git revert` the relevant commit if you need those
 * back too.
 */

import { readFileSync, writeFileSync } from "node:fs";

const FILE = "lib/tours.ts";

/** Pre-change state. `hadLadder: false` means the tour used the derived curve. */
const BEFORE = {
  // Generated from commit 8cd0676 (lib/tours.ts as it stood before any
  // price work), not typed by hand. `hadLadder: false` means the tour used
  // the derived curve and its groupPricing block should be removed.
  "agadir-imperial-cities-6day": { price: 594, deposit: 149, hadLadder: false },
  "agadir-surf-lesson": { price: 30, deposit: 8, hadLadder: false, tourType: "shared" },
  "agadir-to-chefchaouen-5day": { price: 445, deposit: 112, hadLadder: false },
  "agadir-to-essaouira-day-trip": { price: 43, deposit: 10, hadLadder: false, tourType: "shared" },
  "agadir-to-fes-4day": { price: 1188, deposit: 261, hadLadder: true },
  "agafay-desert-sunset": { price: 80, deposit: 21, hadLadder: false, tourType: "shared" },
  "anti-atlas-trekking-agadir": { price: 298, deposit: 74, hadLadder: false },
  "atlas-mountains-3day-trek": { price: 271, deposit: 69, hadLadder: false },
  "azzaden-valley-2day-trek": { price: 186, deposit: 47, hadLadder: false },
  "chegaga-camel-trek-8day": { price: 2076, deposit: 531, hadLadder: true },
  "desert-4day-agadir": { price: 445, deposit: 112, hadLadder: false, tourType: "shared" },
  "desert-4day-marrakech": { price: 382, deposit: 96, hadLadder: false, tourType: "shared" },
  "erg-chegaga-3day-agadir": { price: 930, deposit: 205, hadLadder: true },
  "erg-chegaga-3day-marrakech": { price: 976, deposit: 214, hadLadder: true },
  "family-atlas-4day-trek": { price: 361, deposit: 90, hadLadder: false, minPeople: null },
  "family-desert-4day-marrakech": { price: 930, deposit: 205, hadLadder: true },
  "high-atlas-grand-traverse-15day": { price: 1751, deposit: 424, hadLadder: false, priceMax: 1963, minPeople: null },
  "marrakech-food-market-tour": { price: 47, deposit: 10, hadLadder: false, tourType: "shared" },
  "marrakech-imperial-cities-5day": { price: 510, deposit: 127, hadLadder: false },
  "marrakech-medina-cultural-tour": { price: 47, deposit: 13, hadLadder: false },
  "marrakech-to-chefchaouen-4day": { price: 361, deposit: 90, hadLadder: false },
  "marrakech-to-fes-3day": { price: 1179, deposit: 258, hadLadder: true },
  "merzouga-3day-agadir": { price: 313, deposit: 80, hadLadder: false, tourType: "shared" },
  "merzouga-stargazing-desert-tour": { price: 223, deposit: 59, hadLadder: false, tourType: "shared" },
  "mgoun-massif-trek": { price: 870, deposit: 212, hadLadder: false },
  "ourika-valley-day-hike": { price: 37, deposit: 10, hadLadder: false, tourType: "shared" },
  "ouzoud-waterfalls-day-trip": { price: 32, deposit: 8, hadLadder: false, tourType: "shared" },
  "paradise-valley-agadir": { price: 32, deposit: 8, hadLadder: false, tourType: "shared" },
  "sahara-2day-agadir": { price: 207, deposit: 53, hadLadder: false, tourType: "shared" },
  "sahara-3day-marrakech": { price: 820, deposit: 180, hadLadder: true },
  "sous-massa-national-park": { price: 74, deposit: 20, hadLadder: false, tourType: "shared" },
  "souss-valley-cultural-tour": { price: 40, deposit: 10, hadLadder: false },
  "taroudant-day-trip-agadir": { price: 43, deposit: 10, hadLadder: false, tourType: "shared" },
  "toubkal-aguelzim-pass-3day": { price: 351, deposit: 90, hadLadder: false },
  "toubkal-circuit-ifni-lake-6day": { price: 658, deposit: 165, hadLadder: false },
  "toubkal-summit-2day-marrakech": { price: 223, deposit: 59, hadLadder: false },
  "toubkal-summit-sahara-5day": { price: 1096, deposit: 241, hadLadder: true },
  "toubkal-summit-trek-4day": { price: 404, deposit: 100, hadLadder: false },
  "toubkal-three-peaks-4000m-3day": { price: 382, deposit: 96, hadLadder: false },
  "zagora-2day-agadir": { price: 190, deposit: 47, hadLadder: false, tourType: "shared" },
  "zagora-2day-marrakech": { price: 71, deposit: 16, hadLadder: false, tourType: "shared" },
};

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  console.log(
    "usage:\n" +
      "  node scripts/revert-prices.mjs --list\n" +
      "  node scripts/revert-prices.mjs --all\n" +
      "  node scripts/revert-prices.mjs <slug> [<slug>...]\n",
  );
  process.exit(0);
}

let src = readFileSync(FILE, "utf8");

/** Slice out one tour's record so edits cannot leak into a neighbour. */
function recordRange(slug) {
  const at = src.indexOf(`slug: "${slug}"`);
  if (at === -1) return null;
  const next = src.indexOf("\n  {\n", at);
  return [at, next === -1 ? src.length : next];
}

function currentPrice(slug) {
  const r = recordRange(slug);
  if (!r) return null;
  const m = src.slice(r[0], r[1]).match(/\n    price: (\d+),/);
  return m ? Number(m[1]) : null;
}

if (args.includes("--list")) {
  console.log("slug".padEnd(34) + "now".padStart(7) + "  ->  before");
  for (const [slug, was] of Object.entries(BEFORE)) {
    const now = currentPrice(slug);
    const flag = now === was.price ? "  (already reverted)" : "";
    console.log(slug.padEnd(34) + String(now ?? "?").padStart(7) + "  ->  " + was.price + flag);
  }
  process.exit(0);
}

const wanted = args.includes("--all") ? Object.keys(BEFORE) : args;
const unknown = wanted.filter((s) => !(s in BEFORE));
if (unknown.length) {
  console.error("unknown slug(s): " + unknown.join(", "));
  process.exit(1);
}

let changed = 0;
for (const slug of wanted) {
  const was = BEFORE[slug];
  const range = recordRange(slug);
  if (!range) {
    console.error(`  ${slug}: not found in ${FILE}`);
    continue;
  }
  let rec = src.slice(range[0], range[1]);
  const before = rec;

  // drop the ladder written on top, if the tour had none originally
  if (!was.hadLadder) {
    rec = rec.replace(
      /    (?:\/\/[^\n]*\n)*    groupPricing: \[\n(?:[^\]]*?)\n    \],\n/,
      "",
    );
  }
  if (was.minPeople === null) {
    rec = rec.replace(/    (?:\/\/[^\n]*\n)*    minPeople: \d+,\n/, "");
  }

  rec = rec.replace(/\n    price: \d+,/, `\n    price: ${was.price},`);
  rec = rec.replace(/    depositAmount: \d+,\n/, `    depositAmount: ${was.deposit},\n`);

  if (was.tourType) {
    rec = rec.replace(/tourType: "\w+"/, `tourType: "${was.tourType}"`);
  }
  if (was.priceMax && !/priceMax:/.test(rec)) {
    rec = rec.replace(/\n    price: (\d+),/, `\n    price: $1,\n    priceMax: ${was.priceMax},`);
  }
  // "From $N" prose tracks price
  rec = rec.replace(/From \$\d[\d,]*/g, `From $${was.price}`);

  if (rec !== before) {
    src = src.slice(0, range[0]) + rec + src.slice(range[1]);
    changed++;
    console.log(`  reverted ${slug} -> price ${was.price}`);
  } else {
    console.log(`  ${slug}: already at the old values`);
  }
}

if (changed) {
  writeFileSync(FILE, src);
  console.log(
    `\n${changed} tour(s) reverted in ${FILE}.\n` +
      "Now run:  npx vitest run  &&  npx next build\n" +
      "Then read: git diff lib/tours.ts",
  );
} else {
  console.log("\nnothing to change.");
}
