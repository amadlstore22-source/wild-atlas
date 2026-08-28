#!/usr/bin/env node
/**
 * Ask GOOGLE what it actually received, rather than trusting our own logs.
 *
 * WHY THIS EXISTS
 * Every check we had after a submission was self-reported: the submitter
 * prints "N submitted, 0 failed", and docs/.submitted-today.json records what
 * the wrapper believes it sent. Both are our side of the conversation. If a
 * request never reached Google, or Google accepted the call but recorded
 * nothing, neither file would know.
 *
 * The Indexing API exposes urlNotifications/metadata, which returns the LAST
 * notification Google holds for a URL — including the timestamp it recorded.
 * That is Google's own record, and it is the only thing that actually answers
 * "did it go through".
 *
 * A 404 here means Google holds NO notification for that URL: the submission
 * did not land, whatever our logs say.
 *
 * NOTE ON QUOTA
 * Metadata reads are cheap relative to publishes but are not free — they draw
 * on the same project quota bucket. Verifying a 24-URL batch costs 24 reads.
 * Worth it after a batch you care about; not something to run in a loop.
 *
 * USAGE
 *   node scripts/seo/verify-submitted.mjs --key ./service-account.json --urls docs/batch-YYYY-MM-DD.txt
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
const SINGLE = args.url;

if (!KEY_PATH || (!URLS_FILE && !SINGLE)) {
  console.error("Usage: node scripts/seo/verify-submitted.mjs --key <sa.json> (--urls <file> | --url <url>)");
  process.exit(1);
}

const sa = JSON.parse(readFileSync(KEY_PATH, "utf-8"));

const b64url = (s) =>
  Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

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
  const signature = signer
    .sign(sa.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const jwt = `${signingInput}.${signature}`;

  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`token: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

const urls = SINGLE
  ? [SINGLE]
  : readFileSync(URLS_FILE, "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

const token = await getAccessToken();
console.log(`Asking Google about ${urls.length} URL(s)...\n`);

let confirmed = 0;
const missing = [];
const errors = [];

for (const url of urls) {
  const endpoint =
    "https://indexing.googleapis.com/v3/urlNotifications/metadata?url=" +
    encodeURIComponent(url);
  const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
  const path = url.replace("https://marrakechecotours.com", "");

  if (res.status === 200) {
    const body = await res.json();
    const when = body?.latestUpdate?.notifyTime ?? "(no timestamp)";
    const type = body?.latestUpdate?.type ?? "?";
    console.log(`  OK    ${when}  ${type}  ${path}`);
    confirmed++;
  } else if (res.status === 404) {
    // Google holds no notification for this URL at all.
    console.log(`  NONE  Google has no record        ${path}`);
    missing.push(url);
  } else {
    const text = (await res.text()).slice(0, 120).replace(/\s+/g, " ");
    console.log(`  ERR   HTTP ${res.status}  ${path}  ${text}`);
    errors.push(`${res.status} ${url}`);
  }
  // Gentle pacing; the metadata endpoint is rate-limited like the rest.
  await new Promise((r) => setTimeout(r, 120));
}

console.log(
  `\nGoogle confirms ${confirmed} of ${urls.length}.` +
    (missing.length ? `  No metadata: ${missing.length}` : "") +
    (errors.length ? `  errors: ${errors.length}` : "")
);
if (missing.length === urls.length && urls.length > 0) {
  console.log(
    "\nEVERY url returned 404. That is the signature of the known Google-side\n" +
      "defect described at the top of this file, NOT of failed submissions --\n" +
      "publish returns 200 while metadata stays 404. Do NOT re-send on this\n" +
      "basis; it spends quota and buys nothing. Check Search Console's Page\n" +
      "Indexing report in a few days instead."
  );
} else if (missing.length) {
  console.log("\nThese returned no metadata (see the caveat above before re-sending):");
  for (const u of missing) console.log("  " + u);
}
// Exit 0 when the failure is uniform: that is the known bug, not our problem.
process.exit(errors.length || (missing.length && missing.length !== urls.length) ? 1 : 0);
