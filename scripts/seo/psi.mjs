#!/usr/bin/env node
/**
 * PageSpeed Insights auditor.
 *
 * WHY THIS EXISTS
 * Local Lighthouse runs on this laptop scored the Merzouga tour page at 75
 * with TBT 200ms. The real PageSpeed report for the same URL, minutes apart,
 * said 88 with TBT 0ms. The gap is this machine's CPU under load, not the
 * site. Acting on the local number would have meant hunting a 200ms blocking
 * problem that does not exist in production.
 *
 * PSI runs on Google's infrastructure, so its numbers are reproducible and
 * match what the user sees in their own report. Verified on 2026-09-09:
 * this script returned 87 against a hand-run report of 88 -- run-to-run
 * variance, not a pipeline discrepancy.
 *
 * The key lives in .env.local (gitignored, .gitignore:40) and is restricted
 * in Google Cloud to the PageSpeed Insights API only, so it is read-only and
 * cannot touch the Indexing API credentials in service-account.json.
 *
 * USAGE
 *   node scripts/seo/psi.mjs <url> [--strategy=mobile|desktop] [--json=out.json]
 *   node scripts/seo/psi.mjs --file=urls.txt          # one URL per line
 *
 * Anonymous calls get quota 0 ("quota_limit_value": "0"), which is why the
 * key is required rather than optional.
 */
import fs from "node:fs";
import path from "node:path";

const ENV_FILE = ".env.local";
const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

/** Read one key out of .env.local without pulling in a dotenv dependency.
 *  Values are used verbatim: an API key has no quoting or escaping to undo. */
function readKey(name) {
  const file = path.resolve(process.cwd(), ENV_FILE);
  if (!fs.existsSync(file)) {
    throw new Error(`${ENV_FILE} not found in ${process.cwd()}`);
  }
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    if (t.slice(0, eq).trim() === name) return t.slice(eq + 1).trim();
  }
  throw new Error(`${name} not set in ${ENV_FILE}`);
}

/** PSI cold-starts a real Chrome, so a slow page can take over a minute.
 *  Retry only on 429/5xx and on the propagation error Google returns for the
 *  first call after an API is enabled -- never on a bad key, which would just
 *  burn the retry budget on a failure that cannot resolve itself. */
async function audit(url, strategy, key, attempt = 1) {
  const qs = new URLSearchParams({ url, strategy, key });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) {
    qs.append("category", c);
  }
  const res = await fetch(`${ENDPOINT}?${qs}`, { signal: AbortSignal.timeout(240_000) });
  const body = await res.json();

  if (body.error) {
    const msg = body.error.message || "unknown error";
    const retryable =
      res.status === 429 || res.status >= 500 || /has not been used in project/.test(msg);
    if (retryable && attempt < 3) {
      const wait = attempt * 20_000;
      console.error(`  retry ${attempt}/2 in ${wait / 1000}s — ${msg.slice(0, 100)}`);
      await new Promise((r) => setTimeout(r, wait));
      return audit(url, strategy, key, attempt + 1);
    }
    throw new Error(`${res.status}: ${msg}`);
  }
  return body;
}

const score = (cat) => (cat && typeof cat.score === "number" ? Math.round(cat.score * 100) : null);
const pad = (v, n) => String(v ?? "-").padStart(n);

function report(body) {
  const lr = body.lighthouseResult;
  const c = lr.categories;
  const m = (id) => (lr.audits[id] ? lr.audits[id].displayValue : "-");

  console.log(`\n${lr.finalDisplayedUrl}`);
  console.log(`  ${lr.configSettings.formFactor}  ·  Lighthouse ${lr.lighthouseVersion}  ·  ${lr.fetchTime}`);
  console.log(
    `  perf ${pad(score(c.performance), 3)}   a11y ${pad(score(c.accessibility), 3)}` +
      `   bp ${pad(score(c["best-practices"]), 3)}   seo ${pad(score(c.seo), 3)}`,
  );
  console.log(
    `  FCP ${pad(m("first-contentful-paint"), 7)}  LCP ${pad(m("largest-contentful-paint"), 7)}` +
      `  TBT ${pad(m("total-blocking-time"), 7)}  CLS ${pad(m("cumulative-layout-shift"), 5)}`,
  );

  // Field data only exists once a URL has enough real traffic. Absence is
  // normal for a newer page and is not an error.
  const le = body.loadingExperience;
  if (le && le.metrics && Object.keys(le.metrics).length) {
    console.log(`  CrUX (real users): ${le.overall_category}`);
    for (const [k, v] of Object.entries(le.metrics)) {
      console.log(`    ${k.padEnd(32)} ${pad(v.percentile, 6)}  ${v.category}`);
    }
  }
  return { url: lr.finalDisplayedUrl, perf: score(c.performance), a11y: score(c.accessibility) };
}

const args = process.argv.slice(2);
const flag = (n, d) => {
  const a = args.find((x) => x.startsWith(`--${n}=`));
  return a ? a.slice(n.length + 3) : d;
};

const strategy = flag("strategy", "mobile");
const fileArg = flag("file", null);
const jsonOut = flag("json", null);
const urls = fileArg
  ? fs.readFileSync(fileArg, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  : args.filter((a) => !a.startsWith("--"));

if (!urls.length) {
  console.error("usage: node scripts/seo/psi.mjs <url...> [--strategy=mobile|desktop] [--file=urls.txt] [--json=out.json]");
  process.exit(1);
}

const key = readKey("PAGESPEED_API_KEY");
const results = [];
let failed = 0;

// Sequential on purpose. PSI is rate-limited per key and each call spins up a
// real browser; firing them in parallel trades a little wall-clock for 429s.
for (const url of urls) {
  try {
    const body = await audit(url, strategy, key);
    results.push(report(body));
    if (jsonOut) {
      fs.mkdirSync(path.dirname(path.resolve(jsonOut)), { recursive: true });
      fs.writeFileSync(
        jsonOut.replace(/\.json$/, "") + `.${results.length}.json`,
        JSON.stringify(body, null, 1),
      );
    }
  } catch (e) {
    failed++;
    console.error(`\n${url}\n  FAILED: ${e.message}`);
  }
}

if (results.length > 1) {
  console.log(`\n${"=".repeat(60)}\nsummary (${strategy})`);
  for (const r of results.sort((a, b) => (a.perf ?? 999) - (b.perf ?? 999))) {
    console.log(`  perf ${pad(r.perf, 3)}  a11y ${pad(r.a11y, 3)}  ${r.url.replace("https://marrakechecotours.com", "")}`);
  }
}
if (failed) {
  console.error(`\n${failed} of ${urls.length} failed`);
  process.exit(1);
}
