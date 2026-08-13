#!/usr/bin/env node
/**
 * Google Indexing API submitter — zero npm dependencies.
 *
 * Signs a service-account JWT with Node's built-in crypto, exchanges it for an
 * access token, then calls the Indexing API's urlNotifications:publish endpoint
 * for each URL. Handles the 200/day quota and rate limits with batching + backoff.
 *
 * IMPORTANT: Google officially supports the Indexing API only for JobPosting and
 * BroadcastEvent pages. Using it for general pages is outside Google's stated
 * terms — it often still triggers a crawl, but it is not guaranteed to index and
 * is not a substitute for the sitemap. Treat this as a best-effort crawl nudge.
 *
 * Setup: see scripts/README-indexing.md
 *
 * Usage:
 *   node scripts/google-index.mjs --key ./service-account.json --urls ./docs/all-index-urls.txt
 *   node scripts/google-index.mjs --key ./sa.json --urls ./docs/priority-index-urls.txt --limit 200
 *   node scripts/google-index.mjs --key ./sa.json --url https://marrakechecotours.com/en/tours/x
 *   node scripts/google-index.mjs --key ./sa.json --urls ./docs/all-index-urls.txt --dry-run
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

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

const KEY_PATH = args.key;
const URLS_FILE = args.urls;
const SINGLE_URL = args.url;
const DRY_RUN = args["dry-run"] === "true";
const TYPE = args.type || "URL_UPDATED"; // or URL_DELETED
const LIMIT = args.limit ? parseInt(args.limit, 10) : Infinity;
// Skip the first N URLs. Lets you page through a list bigger than the daily
// quota on consecutive days without editing the file: --offset 200 --limit 200.
const OFFSET = args.offset ? parseInt(args.offset, 10) : 0;

if (!KEY_PATH || (!URLS_FILE && !SINGLE_URL)) {
  console.error("Usage: node scripts/google-index.mjs --key <sa.json> (--urls <file> | --url <url>) [--limit N] [--offset N] [--dry-run]");
  process.exit(1);
}

// ---- Load service account ----
const sa = JSON.parse(readFileSync(KEY_PATH, "utf8"));
if (!sa.client_email || !sa.private_key) {
  console.error("Service account JSON missing client_email / private_key.");
  process.exit(1);
}

// ---- Build the list of URLs ----
let urls;
if (SINGLE_URL) {
  urls = [SINGLE_URL];
} else {
  urls = readFileSync(URLS_FILE, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("http"));
}
const total = urls.length;
urls = urls.slice(OFFSET, OFFSET === 0 && LIMIT === Infinity ? undefined : OFFSET + (LIMIT === Infinity ? total : LIMIT));

console.log(
  `Loaded ${urls.length} URL(s)` +
    (OFFSET ? ` (skipped first ${OFFSET} of ${total})` : "") +
    `. Type=${TYPE}. ${DRY_RUN ? "(DRY RUN)" : ""}`
);
if (urls.length > 200) {
  console.warn(
    `\n⚠️  ${urls.length} URLs exceeds the Indexing API's default 200/day quota. ` +
      `Only the first ~200 will succeed today; run again tomorrow (the list order is stable), ` +
      `or use a smaller --urls file / --limit.\n`
  );
}

// ---- Base64url ----
const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

// ---- Mint an access token via signed JWT (RS256) ----
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: sa.token_uri || "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  const signature = b64url(signer.sign(sa.private_key));
  const jwt = `${signingInput}.${signature}`;

  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.access_token;
}

// ---- Submit one URL ----
async function publish(token, url) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: TYPE }),
  });
  return { status: res.status, body: await res.text() };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Main ----
(async () => {
  if (DRY_RUN) {
    urls.forEach((u) => console.log("  would submit:", u));
    console.log(`\nDry run: ${urls.length} URLs. No requests sent.`);
    return;
  }

  const token = await getAccessToken();
  console.log("Got access token. Submitting…\n");

  let ok = 0;
  let failed = 0;
  let netFail = 0; // never reached Google: no quota consumed
  let netOk = 0;   // succeeded only after a network retry
  let quotaHit = -1; // index where the daily quota stopped us, if it did
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      let r = await publish(token, url);
      // simple backoff on rate-limit
      if (r.status === 429) {
        await sleep(2000);
        r = await publish(token, url);
      }
      if (r.status === 200) {
        ok++;
        console.log(`  ✓ ${url}`);
      } else {
        // A 429 naming the PER DAY limit is terminal — the quota resets at
        // midnight Pacific and every further request today will fail the same
        // way. Stop rather than printing the same error for every URL left.
        // (A per-minute 429 is different: it was already retried above.)
        if (r.status === 429 && /per day/i.test(r.body)) {
          quotaHit = i;
          console.log(
            `\n  ⚠ Daily quota reached after ${ok} submitted this run.\n` +
              `    Google allows 200 publish requests per day; it resets at ` +
              `midnight Pacific.\n    Stopping here rather than retrying ` +
              `${urls.length - i} more that would fail identically.`
          );
          break;
        }
        failed++;
        console.log(`  ✗ [${r.status}] ${url} — ${r.body.slice(0, 160)}`);
        if (r.status === 403) {
          console.error(
            "\n403 usually means the service account is not added as an Owner of the " +
              "property in Search Console, or the Indexing API is not enabled. See README.\n"
          );
          break;
        }
      }
    } catch (e) {
      // A thrown fetch is a NETWORK failure: the request never reached Google,
      // so it consumed no quota and the URL is not necessarily bad. Transient
      // DNS/TLS/socket drops used to fail the whole tail of a batch in one go.
      // Retry with backoff before giving up on the URL.
      let recovered = false;
      for (const wait of [1000, 3000, 8000]) {
        await sleep(wait);
        try {
          const r = await publish(token, url);
          if (r.status === 200) {
            ok++; netOk++;
            console.log(`  ✓ ${url} (after retry)`);
            recovered = true;
            break;
          }
          if (r.status === 429 && /per day/i.test(r.body)) {
            quotaHit = i;
            recovered = true;
            break;
          }
        } catch { /* still down - try the next backoff */ }
      }
      if (quotaHit >= 0) break;
      if (!recovered) {
        failed++; netFail++;
        console.log(`  ✗ NETWORK ${url} — ${e.message} (not sent, no quota used)`);
      }
    }
    await sleep(300); // gentle pacing
  }

  console.log(`\nDone. ${ok} submitted, ${failed} failed, of ${urls.length}.`);
  if (netFail > 0) {
    console.log(
      `   of those never reached Google (network), so they used NO quota` +
        `
  and are still pending. Re-run this same batch to retry them.`
    );
  }

  // Tell the operator exactly where to pick up. Without this the next run needs
  // mental arithmetic over OFFSET + how many actually went through, which is
  // how the same 200 URLs end up being submitted twice.
  // Network failures were never sent, so they are NOT "reached" - counting
  // them silently skipped those URLs forever on the next run.
  const reached = OFFSET + (quotaHit >= 0 ? quotaHit : ok + (failed - netFail));
  if (reached < total) {
    console.log(
      `\nResume tomorrow from URL ${reached + 1} of ${total}:\n` +
        `  node scripts/google-index.mjs --key ${args.key} --urls ${args.urls} ` +
        `--offset ${reached} --limit 200`
    );
  } else {
    console.log(`\nAll ${total} URLs in this list have been submitted.`);
  }
  // The wrapper reads this to charge the daily ledger accurately: only
  // requests that actually reached Google count against the 200/day quota.
  console.log(`\nQUOTA_CONSUMED=${ok + (failed - netFail)}`);
})();
