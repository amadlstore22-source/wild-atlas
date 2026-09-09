#!/usr/bin/env node
/**
 * PageSpeed Insights across a list of URLs, with a CSV summary.
 *
 * WHY SEPARATE FROM psi.mjs
 * psi.mjs audits a handful of URLs and prints them. This one walks a whole
 * list and writes a table meant to be sorted and compared rather than read
 * line by line. It is SLOW on purpose -- see CONCURRENCY below.
 *
 * SCORES VARY RUN TO RUN, EVEN SEQUENTIALLY. The same URL returned 87, 88 and
 * 90 on three consecutive single runs. Treat any move under ~5 points as
 * noise; only a repeated result or a large shift means anything. A ranking
 * across many pages is far more trustworthy than any single page's number.
 *
 * DO NOT "SPEED THIS UP" BY RAISING CONCURRENCY. That was tried and it
 * silently produced false data -- the whole story is on the CONCURRENCY
 * constant. Parallel PSI calls do not fail, they lie.
 *
 * Usage:
 *   node scripts/seo/psi-batch.mjs --file=docs/bing-submit-2026-09-09.txt
 *   node scripts/seo/psi-batch.mjs --file=urls.txt --strategy=desktop --out=psi.csv
 */
import fs from "node:fs";
import path from "node:path";

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
// 1, not 4. Four concurrent calls DID all return 200 -- but they corrupted the
// measurements: a 100-URL run at concurrency 4 reported 66/67/69/72/74 for
// pages that scored 88/88/88/90/93 when re-run one at a time minutes later,
// with LCP inflated from ~3.5s to ~6.5s. Parallel audits contend for the same
// measurement resources, so they slow each other down and the slowdown is
// recorded as the page's score. It also produced a phantom a11y 72 that was
// really 97. A slower run that is correct beats a fast one that invents
// regressions to chase.
const CONCURRENCY = 1;

function readKey(name) {
  const file = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) throw new Error(".env.local not found");
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq !== -1 && t.slice(0, eq).trim() === name) return t.slice(eq + 1).trim();
  }
  throw new Error(`${name} not set in .env.local`);
}

async function audit(url, strategy, key, attempt = 1) {
  const qs = new URLSearchParams({ url, strategy, key });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) qs.append("category", c);
  let body;
  try {
    const res = await fetch(`${ENDPOINT}?${qs}`, { signal: AbortSignal.timeout(240_000) });
    body = await res.json();
    if (!body.error) return body;
    const retryable = res.status === 429 || res.status >= 500 || /has not been used in project/.test(body.error.message || "");
    if (!retryable || attempt >= 3) throw new Error(`${res.status}: ${(body.error.message || "").slice(0, 120)}`);
  } catch (e) {
    // A network timeout is as retryable as a 429; a thrown non-retryable
    // error above has already been shaped and should propagate on the last try.
    if (attempt >= 3) throw e;
  }
  await new Promise((r) => setTimeout(r, attempt * 15_000));
  return audit(url, strategy, key, attempt + 1);
}

const pct = (c) => (c && typeof c.score === "number" ? Math.round(c.score * 100) : null);
/** Numeric metric values, not displayValue: "1.4 s" cannot be sorted. */
const num = (lr, id) => {
  const a = lr.audits[id];
  return a && typeof a.numericValue === "number" ? Math.round(a.numericValue) : null;
};

const args = process.argv.slice(2);
const flag = (n, d) => {
  const a = args.find((x) => x.startsWith(`--${n}=`));
  return a ? a.slice(n.length + 3) : d;
};
const strategy = flag("strategy", "mobile");
const outCsv = flag("out", `psi-${strategy}.csv`);
const file = flag("file", null);
if (!file) {
  console.error("usage: node scripts/seo/psi-batch.mjs --file=urls.txt [--strategy=mobile|desktop] [--out=psi.csv]");
  process.exit(1);
}

const urls = fs.readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const key = readKey("PAGESPEED_API_KEY");
console.error(`auditing ${urls.length} URLs · ${strategy} · concurrency ${CONCURRENCY}`);

const rows = [];
const failures = [];
let done = 0;

// Shared index rather than fixed slices: a slow URL would otherwise stall its
// whole slice while other workers sit idle.
let cursor = 0;
async function worker() {
  for (;;) {
    const i = cursor++;
    if (i >= urls.length) return;
    const url = urls[i];
    try {
      const body = await audit(url, strategy, key);
      const lr = body.lighthouseResult;
      rows.push({
        url: lr.finalDisplayedUrl.replace("https://marrakechecotours.com", "") || "/",
        perf: pct(lr.categories.performance),
        a11y: pct(lr.categories.accessibility),
        bp: pct(lr.categories["best-practices"]),
        seo: pct(lr.categories.seo),
        fcp: num(lr, "first-contentful-paint"),
        lcp: num(lr, "largest-contentful-paint"),
        tbt: num(lr, "total-blocking-time"),
        cls: lr.audits["cumulative-layout-shift"]?.numericValue ?? null,
      });
    } catch (e) {
      failures.push({ url, error: String(e.message || e).slice(0, 150) });
    }
    done++;
    if (done % 10 === 0 || done === urls.length) console.error(`  ${done}/${urls.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

rows.sort((a, b) => (a.perf ?? 999) - (b.perf ?? 999));
const header = "url,performance,accessibility,best_practices,seo,fcp_ms,lcp_ms,tbt_ms,cls";
const csv = [header, ...rows.map((r) => [r.url, r.perf, r.a11y, r.bp, r.seo, r.fcp, r.lcp, r.tbt, r.cls === null ? "" : r.cls.toFixed(3)].join(","))].join("\n");
fs.writeFileSync(outCsv, csv + "\n");

const stat = (k) => {
  const v = rows.map((r) => r[k]).filter((x) => typeof x === "number").sort((a, b) => a - b);
  if (!v.length) return "-";
  return `min ${v[0]}  med ${v[Math.floor(v.length / 2)]}  max ${v[v.length - 1]}`;
};
console.error(`\nwrote ${outCsv} — ${rows.length} audited, ${failures.length} failed`);
console.error(`performance   ${stat("perf")}`);
console.error(`accessibility ${stat("a11y")}`);
console.error(`lcp (ms)      ${stat("lcp")}`);
if (failures.length) {
  console.error(`\nfailures:`);
  for (const f of failures.slice(0, 10)) console.error(`  ${f.url}\n    ${f.error}`);
}
