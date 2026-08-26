/**
 * Answer "which URLs have NOT been submitted to the Indexing API yet?"
 *
 * WHY THIS EXISTS
 *
 * On 2026-08-26 a day's quota (200 URLs) was spent re-submitting English and
 * French tour pages that had already gone out on 2026-08-16. They were picked
 * by building a fresh priority-ordered queue from the sitemap — which answers
 * "what are the most important pages on this site?", not "what is left to
 * send?". Every request succeeded, so nothing looked wrong; the only symptom
 * was that the 42 genuinely new pages had to wait a day.
 *
 * The correct question is a set difference against what was last submitted,
 * and `docs/all-index-urls.txt` is committed precisely so that history exists.
 * This script does that and nothing else.
 *
 * Usage:
 *   node scripts/build-index-urls.mjs          # refresh from the BUILT sitemap
 *   node scripts/seo/diff-unsubmitted.mjs      # what is genuinely new
 *   node scripts/seo/diff-unsubmitted.mjs --write docs/batch-YYYY-MM-DD.txt
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const LIST = "docs/all-index-urls.txt";

if (!existsSync(LIST)) {
  console.error(`Missing ${LIST}. Run: node scripts/build-index-urls.mjs`);
  process.exit(1);
}

const readUrls = (text) =>
  text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));

const current = readUrls(readFileSync(LIST, "utf8"));

/**
 * The previous submitted state is the last COMMITTED version of the list.
 * Working-tree changes are by definition not yet submitted, so comparing
 * against HEAD is what makes this honest.
 */
let previous;
try {
  previous = new Set(
    readUrls(execSync(`git show HEAD:${LIST}`, { encoding: "utf8", maxBuffer: 1e8 }))
  );
} catch {
  console.error(`Could not read ${LIST} from HEAD — is it committed?`);
  process.exit(1);
}

const unsubmitted = current.filter((u) => !previous.has(u));

console.log(`submitted (HEAD)  : ${previous.size}`);
console.log(`site URLs now     : ${current.length}`);
console.log(`NOT yet submitted : ${unsubmitted.length}`);

if (unsubmitted.length === 0) {
  console.log("\nNothing to send. Do NOT re-submit the whole site — see docs/INDEXING-STATE.md.");
  process.exit(0);
}

const byKind = {};
for (const u of unsubmitted) {
  const path = new URL(u).pathname;
  const kind = path.includes("/events")
    ? "events"
    : path.includes("/tours/")
      ? "tours"
      : path.includes("/blog/")
        ? "blog"
        : "other";
  byKind[kind] = (byKind[kind] ?? 0) + 1;
}
console.log("\nbreakdown:");
for (const [k, n] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${k}`);
}

const writeIdx = process.argv.indexOf("--write");
if (writeIdx !== -1 && process.argv[writeIdx + 1]) {
  const out = process.argv[writeIdx + 1];
  writeFileSync(out, unsubmitted.join("\n") + "\n", "utf8");
  console.log(`\nWrote ${unsubmitted.length} URLs to ${out}`);
  console.log(`Send with:\n  node scripts/google-index.mjs --key ./service-account.json --urls ${out}`);
} else {
  console.log("\nFirst few:");
  unsubmitted.slice(0, 8).forEach((u) => console.log("  " + u));
  console.log("\nRe-run with --write docs/batch-YYYY-MM-DD.txt to save the batch.");
}
