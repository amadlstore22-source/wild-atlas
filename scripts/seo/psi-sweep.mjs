#!/usr/bin/env node
/**
 * Site-wide PageSpeed sweep that survives PSI's variance.
 *
 * WHY NOT psi-batch.mjs
 * A single PSI run is not a measurement -- see docs/PAGESPEED-NOTES.md. The
 * same unchanged live URL scored 65, 87, 87 and 89 across four runs, and one
 * run reported a11y 72 / seo 82 for a page that is 97 / 100 on every re-test.
 * A one-pass sweep of the whole site therefore produces a list of failures
 * that is mostly noise, and acting on it means fixing bugs that do not exist.
 *
 * HOW THIS DIFFERS
 * Two-phase. Phase 1 audits every URL once, cheaply. Phase 2 re-audits only
 * the URLs that looked bad, CONFIRM_RUNS more times, and keeps the MEDIAN.
 * A page is reported only if its median across all runs is still bad -- i.e.
 * the problem reproduced. Noise fails to reproduce and drops out by design.
 *
 * Sequential on purpose: concurrent PSI calls contend for the same measurement
 * resources and the contention is recorded as the page's score (a concurrency-4
 * run reported 66-74 for pages that were 88-93 one at a time).
 *
 * Usage:
 *   node scripts/seo/psi-sweep.mjs --file=docs/all-index-urls.txt
 *   node scripts/seo/psi-sweep.mjs --file=urls.txt --threshold=85 --limit=200
 *   node scripts/seo/psi-sweep.mjs --file=urls.txt --resume    # continue after a stop
 */
import fs from "node:fs";
import path from "node:path";

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CONFIRM_RUNS = 2; // extra runs for a suspicious URL; with phase 1 that is 3 samples

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
  try {
    const res = await fetch(`${ENDPOINT}?${qs}`, { signal: AbortSignal.timeout(240_000) });
    const body = await res.json();
    if (!body.error) return body;
    const retryable =
      res.status === 429 || res.status >= 500 || /has not been used in project/.test(body.error.message || "");
    if (!retryable || attempt >= 3) throw new Error(`${res.status}: ${(body.error.message || "").slice(0, 120)}`);
  } catch (e) {
    if (attempt >= 3) throw e;
  }
  await new Promise((r) => setTimeout(r, attempt * 15_000));
  return audit(url, strategy, key, attempt + 1);
}

const pct = (c) => (c && typeof c.score === "number" ? Math.round(c.score * 100) : null);
const num = (lr, id) => {
  const a = lr.audits[id];
  return a && typeof a.numericValue === "number" ? Math.round(a.numericValue) : null;
};
const median = (a) => {
  const v = a.filter((x) => typeof x === "number").sort((x, y) => x - y);
  return v.length ? v[Math.floor(v.length / 2)] : null;
};

function sample(body) {
  const lr = body.lighthouseResult;
  return {
    perf: pct(lr.categories.performance),
    a11y: pct(lr.categories.accessibility),
    bp: pct(lr.categories["best-practices"]),
    seo: pct(lr.categories.seo),
    lcp: num(lr, "largest-contentful-paint"),
    tbt: num(lr, "total-blocking-time"),
  };
}

const args = process.argv.slice(2);
const flag = (n, d) => {
  const a = args.find((x) => x.startsWith(`--${n}=`));
  return a ? a.slice(n.length + 3) : d;
};
const strategy = flag("strategy", "mobile");
const threshold = Number(flag("threshold", 85));
const limit = Number(flag("limit", 0));
const file = flag("file", null);
const state = flag("state", `.originals/psi-sweep-${strategy}.json`);
const resume = args.includes("--resume");
if (!file) {
  console.error("usage: node scripts/seo/psi-sweep.mjs --file=urls.txt [--threshold=85] [--limit=N] [--resume]");
  process.exit(1);
}

let urls = fs.readFileSync(file, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
if (limit) urls = urls.slice(0, limit);

// Progress is checkpointed after every URL: a 1164-URL sweep is many hours and
// must survive being stopped, rate-limited or rebooted without redoing it all.
fs.mkdirSync(path.dirname(state), { recursive: true });
let done = {};
if (resume && fs.existsSync(state)) {
  done = JSON.parse(fs.readFileSync(state, "utf8"));
  console.error(`resuming: ${Object.keys(done).length} already audited`);
}

const key = readKey("PAGESPEED_API_KEY");
const todo = urls.filter((u) => !done[u]);
console.error(`phase 1: ${todo.length} to audit (${urls.length} total) · ${strategy} · sequential`);

let n = 0;
for (const url of todo) {
  try {
    done[url] = { runs: [sample(await audit(url, strategy, key))] };
  } catch (e) {
    done[url] = { error: String(e.message || e).slice(0, 150) };
  }
  n++;
  fs.writeFileSync(state, JSON.stringify(done));
  if (n % 20 === 0 || n === todo.length) console.error(`  ${n}/${todo.length}`);
}

// Phase 2 -- only the suspicious ones, and only because one bad run means
// nothing. Anything whose first sample is below threshold gets re-sampled.
const suspicious = urls.filter((u) => {
  const d = done[u];
  if (!d || d.error || !d.runs) return false;
  if (d.runs.length > 1) return false; // already confirmed on a previous pass
  const r = d.runs[0];
  return r.perf < threshold || r.a11y < 90 || r.bp < 90 || r.seo < 90;
});
console.error(`\nphase 2: re-testing ${suspicious.length} suspicious URLs x${CONFIRM_RUNS}`);

n = 0;
for (const url of suspicious) {
  for (let i = 0; i < CONFIRM_RUNS; i++) {
    try {
      done[url].runs.push(sample(await audit(url, strategy, key)));
    } catch { /* keep whatever samples we have */ }
  }
  n++;
  fs.writeFileSync(state, JSON.stringify(done));
  if (n % 5 === 0 || n === suspicious.length) console.error(`  ${n}/${suspicious.length}`);
}

const rows = [];
const errors = [];
for (const url of urls) {
  const d = done[url];
  if (!d) continue;
  if (d.error) { errors.push({ url, error: d.error }); continue; }
  const m = {};
  for (const k of ["perf", "a11y", "bp", "seo", "lcp", "tbt"]) m[k] = median(d.runs.map((r) => r[k]));
  rows.push({ url: url.replace("https://marrakechecotours.com", "") || "/", samples: d.runs.length, ...m });
}

const out = `psi-sweep-${strategy}.csv`;
fs.writeFileSync(
  out,
  ["url,samples,performance,accessibility,best_practices,seo,lcp_ms,tbt_ms",
    ...rows.sort((a, b) => a.perf - b.perf).map((r) => [r.url, r.samples, r.perf, r.a11y, r.bp, r.seo, r.lcp, r.tbt].join(",")),
  ].join("\n") + "\n",
);

// Only medians survive here, so anything listed reproduced across 3 samples.
const real = rows.filter((r) => r.samples > 1 && (r.perf < threshold || r.a11y < 90 || r.bp < 90 || r.seo < 90));
const stat = (k) => {
  const v = rows.map((r) => r[k]).filter((x) => typeof x === "number").sort((a, b) => a - b);
  return v.length ? `min ${v[0]}  p10 ${v[Math.floor(v.length * 0.1)]}  med ${v[Math.floor(v.length / 2)]}  max ${v[v.length - 1]}` : "-";
};
console.error(`\nwrote ${out} — ${rows.length} URLs, ${errors.length} errors`);
console.error(`performance   ${stat("perf")}`);
console.error(`accessibility ${stat("a11y")}`);
console.error(`seo           ${stat("seo")}`);
console.error(`\nCONFIRMED problems (median of 3+ runs still bad): ${real.length}`);
for (const r of real.slice(0, 40)) {
  console.error(`  perf ${String(r.perf).padStart(3)}  a11y ${String(r.a11y).padStart(3)}  bp ${String(r.bp).padStart(3)}  seo ${String(r.seo).padStart(3)}  ${r.url}`);
}
if (errors.length) {
  console.error(`\nerrors (${errors.length}):`);
  for (const e of errors.slice(0, 10)) console.error(`  ${e.url}\n    ${e.error}`);
}
