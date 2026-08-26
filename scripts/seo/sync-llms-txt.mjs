/**
 * Refresh the counts inside public/llms.txt from the live catalogue.
 *
 * WHY THIS EXISTS
 * ---------------
 * llms.txt said "the full catalogue of 41 tours". There are 46. The number was
 * right when it was written — 41 is still exactly the private-tour count — and
 * then five shared departures were added and nobody edited a hand-maintained
 * text file in /public.
 *
 * That matters more than a stale number normally would. llms.txt exists
 * specifically so AI assistants treat it as the authoritative summary of the
 * business, so a wrong figure there is repeated back to users as fact, with no
 * page to contradict it. It is also invisible to every other check: it is not
 * TypeScript, no test imports it, and `next build` never reads it.
 *
 * Rather than patch 41 -> 46 and wait for the next drift, this regenerates the
 * counted phrases from lib/tours.ts and lib/blog.ts.
 *
 *   node scripts/seo/sync-llms-txt.mjs           # rewrite
 *   node scripts/seo/sync-llms-txt.mjs --check   # exit 1 if stale (CI/test)
 *
 * __tests__/lib/llms-txt.test.ts runs the --check logic, so a new tour fails
 * the suite instead of silently ageing the file.
 */
import { readFileSync, writeFileSync } from "node:fs";

const LLMS = "public/llms.txt";

/** Count top-level records without importing TS: both files use the same
 *  4-space `slug: "..."` marker, one per record. */
function countSlugs(path) {
  const src = readFileSync(path, "utf8");
  return (src.match(/\n {4}slug: "/g) ?? []).length;
}

const tours = countSlugs("lib/tours.ts");
const posts = countSlugs("lib/blog.ts");

/** Phrases in llms.txt that embed a live number. Each rule rewrites only the
 *  digits, so the surrounding prose stays hand-written. */
const RULES = [
  {
    label: "tour count",
    find: /the full catalogue of \d+ tours/,
    make: () => `the full catalogue of ${tours} tours`,
  },
  {
    label: "blog count",
    find: /in-depth Morocco travel guides/,
    // Left as prose deliberately: the blog index paginates and a raw post
    // count is not a useful fact for an assistant to repeat.
    make: null,
  },
];

const original = readFileSync(LLMS, "utf8");
let out = original;
const stale = [];

for (const rule of RULES) {
  if (!rule.make) continue;
  const current = out.match(rule.find);
  if (!current) {
    stale.push(`${rule.label}: phrase not found in ${LLMS} — did the wording change?`);
    continue;
  }
  const replacement = rule.make();
  if (current[0] !== replacement) {
    stale.push(`${rule.label}: "${current[0]}" should be "${replacement}"`);
    out = out.replace(rule.find, replacement);
  }
}

if (process.argv.includes("--check")) {
  if (stale.length) {
    console.error("public/llms.txt is out of date:\n  " + stale.join("\n  "));
    process.exit(1);
  }
  console.log(`public/llms.txt is current (${tours} tours, ${posts} posts)`);
} else if (out !== original) {
  writeFileSync(LLMS, out, "utf8");
  console.log("updated public/llms.txt:\n  " + stale.join("\n  "));
} else {
  console.log(`public/llms.txt already current (${tours} tours, ${posts} posts)`);
}
