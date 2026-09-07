#!/usr/bin/env node
/**
 * IndexNow submitter — Bing, Yandex, Seznam and Naver in one call.
 *
 * The site has had a valid IndexNow key hosted at the domain root since before
 * this script existed, and nothing ever used it. The key alone does nothing:
 * IndexNow is a push protocol, so a crawler only comes early if you tell it to.
 *
 * Why this is worth having alongside scripts/google-index.mjs:
 *   - no OAuth, no service account, no ownership verification to lose
 *   - no 200/day quota — the limit is 10,000 URLs per request
 *   - one submission reaches every participating engine, and Bing is what
 *     feeds ChatGPT search and Copilot, which app/robots.ts deliberately courts
 *
 * Unlike the Google Indexing API, IndexNow is the officially sanctioned way to
 * do this for ordinary pages. There is no terms-of-service caveat here.
 *
 * Usage:
 *   node scripts/indexnow.mjs --urls ./docs/batch-2026-09-07-city-guides.txt
 *   node scripts/indexnow.mjs --url https://marrakechecotours.com/en/tours/x
 *   node scripts/indexnow.mjs --urls ./docs/all-index-urls.txt --dry-run
 */

import { readFileSync } from "node:fs";

const HOST = "marrakechecotours.com";
const KEY = "2dc71b105b5a38bfaceaace47ca6e7b9";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// IndexNow accepts up to 10,000 URLs per request. Batching well below that
// keeps any single failure small and the output readable.
const BATCH = 500;

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const val = arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true";
      acc.push([key, val]);
    }
    return acc;
  }, [])
);

const URLS_FILE = args.urls;
const SINGLE_URL = args.url;
const DRY_RUN = args["dry-run"] === "true";

if (!URLS_FILE && !SINGLE_URL) {
  console.error("Usage: node scripts/indexnow.mjs (--urls <file> | --url <url>) [--dry-run]");
  process.exit(1);
}

// ---- Build the list ----
let urls = SINGLE_URL
  ? [SINGLE_URL]
  : readFileSync(URLS_FILE, "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("http"));

// Every URL must be on the host the key belongs to, or the whole batch is
// rejected with 422. Catching it here names the offender instead.
const foreign = urls.filter((u) => {
  try {
    return new URL(u).hostname !== HOST;
  } catch {
    return true;
  }
});
if (foreign.length) {
  console.error(
    `\nThese URLs are not on ${HOST}, so IndexNow would reject the whole batch:\n  ` +
      foreign.join("\n  ")
  );
  process.exit(1);
}

if (urls.length === 0) {
  console.error("No URLs found.");
  process.exit(1);
}

console.log(`Loaded ${urls.length} URL(s) for ${HOST}. ${DRY_RUN ? "(DRY RUN)" : ""}`);

if (DRY_RUN) {
  for (const u of urls) console.log(`  would submit: ${u}`);
  console.log(`\nDry run: ${urls.length} URLs. No requests sent.`);
  process.exit(0);
}

// ---- Confirm the key is actually reachable ----
// A key that 404s means every submission is silently rejected, which is
// exactly the failure mode that leaves you believing you are submitting.
const keyCheck = await fetch(KEY_LOCATION);
if (!keyCheck.ok) {
  console.error(
    `\nKey file is not reachable: ${KEY_LOCATION} returned ${keyCheck.status}.\n` +
      `IndexNow rejects every submission without it. Check public/${KEY}.txt is deployed.`
  );
  process.exit(1);
}
const keyBody = (await keyCheck.text()).trim();
if (keyBody !== KEY) {
  console.error(`\nKey file contains "${keyBody}" but the key is "${KEY}". They must match exactly.`);
  process.exit(1);
}
console.log(`Key verified at ${KEY_LOCATION}`);

// ---- Submit ----
let submitted = 0;
let failed = 0;

for (let i = 0; i < urls.length; i += BATCH) {
  const chunk = urls.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    }),
  });

  // 200 = accepted, 202 = accepted but key still being validated. Both are fine.
  if (res.ok) {
    submitted += chunk.length;
    console.log(`  ✓ ${chunk.length} URL(s) accepted (HTTP ${res.status})`);
  } else {
    failed += chunk.length;
    const body = await res.text();
    console.error(`  ✗ ${chunk.length} URL(s) rejected (HTTP ${res.status}) ${body.slice(0, 200)}`);
    if (res.status === 403) {
      console.error("    403 means the key was not accepted for this host.");
    } else if (res.status === 422) {
      console.error("    422 means a URL did not belong to the host, or the key does not match.");
    } else if (res.status === 429) {
      console.error("    429 means too many requests — wait and re-run.");
    }
  }
}

console.log(`\nDone. ${submitted} submitted, ${failed} failed, of ${urls.length}.`);
console.log(
  "IndexNow is a crawl request, not a guarantee of indexing — the same caveat as the sitemap."
);
process.exit(failed > 0 ? 1 : 0);
