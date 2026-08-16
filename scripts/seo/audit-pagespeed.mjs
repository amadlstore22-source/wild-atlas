#!/usr/bin/env node
/**
 * Lighthouse audit across every distinct page TEMPLATE, mobile and desktop.
 *
 * Why templates and not all 960 URLs: the site has 18 route templates. The 528
 * blog URLs are one template rendered with different data in six locales, so
 * auditing them all would take ~16 hours and report the same defect 528 times.
 * A performance bug lives in the template, so one representative URL per
 * template finds it. Locale variants are covered by a spot-check group.
 *
 * Usage:
 *   node scripts/seo/audit-pagespeed.mjs                 # both form factors
 *   node scripts/seo/audit-pagespeed.mjs --mobile        # one form factor
 *   node scripts/seo/audit-pagespeed.mjs --only=blog     # substring filter
 *   node scripts/seo/audit-pagespeed.mjs --budget        # exit 1 if below budget
 *
 * Writes docs/pagespeed-report.json and prints a table. Results are appended,
 * so a crashed run resumes rather than starting over.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const ORIGIN = "https://marrakechecotours.com";
const OUT = "docs/pagespeed-report.json";

/** One representative URL per route template, plus locale spot-checks. */
const TARGETS = [
  ["home", "/en"],
  ["tours-listing", "/en/tours"],
  ["tour-detail", "/en/tours/sahara-3day-marrakech"],
  ["tour-detail-shared", "/en/tours/shared-merzouga-3day-marrakech"],
  ["blog-listing", "/en/blog"],
  ["blog-post", "/en/blog/toubkal-guide-cost"],
  ["blog-post-new", "/en/blog/best-things-to-do-in-morocco"],
  ["categories", "/en/categories/desert"],
  ["destinations", "/en/destinations"],
  ["destination-detail", "/en/destinations/marrakech"],
  ["guides", "/en/guides"],
  ["about", "/en/about"],
  ["contact", "/en/contact"],
  ["how-we-operate", "/en/how-we-operate"],
  ["news", "/en/news"],
  // Locale spot-checks: RTL and a localised-slug route are the two ways a
  // locale can differ structurally rather than just in text.
  ["locale-ar-home", "/ar"],
  ["locale-ar-blog", "/ar/blog/best-things-to-do-in-morocco"],
  ["locale-fr-blog", "/fr/blog/que-faire-au-maroc"],
];

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const budgetMode = args.includes("--budget");
const forms = args.includes("--mobile")
  ? ["mobile"]
  : args.includes("--desktop")
    ? ["desktop"]
    : ["mobile", "desktop"];

/** Score below which a page is reported as failing. */
const BUDGET = { performance: 90, accessibility: 95, "best-practices": 95, seo: 95 };

const prior = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf-8")) : { runs: {} };
const results = prior.runs ?? {};

function audit(url, form) {
  const tmp = join(tmpdir(), `lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  const flags = [
    url,
    "--quiet",
    "--output=json",
    `--output-path=${tmp}`,
    "--only-categories=performance,accessibility,best-practices,seo",
    `--form-factor=${form}`,
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    "--max-wait-for-load=60000",
  ];
  // Desktop needs its own throttling; mobile is Lighthouse's default.
  if (form === "desktop") {
    flags.push("--screenEmulation.disabled", "--throttling.rttMs=40",
      "--throttling.throughputKbps=10240", "--throttling.cpuSlowdownMultiplier=1");
  } else {
    flags.push("--screenEmulation.mobile");
  }

  try {
    execFileSync("npx", ["--yes", "lighthouse@12", ...flags], {
      stdio: "ignore",
      timeout: 240000,
      shell: process.platform === "win32",
    });
  } catch {
    // Lighthouse exits non-zero on Chrome cleanup even when the report wrote.
  }
  if (!existsSync(tmp)) return null;

  const d = JSON.parse(readFileSync(tmp, "utf-8"));
  try { rmSync(tmp); } catch { /* best effort */ }

  const A = d.audits ?? {};
  const cat = (k) => Math.round((d.categories?.[k]?.score ?? 0) * 100);
  const lcpEl = A["largest-contentful-paint-element"];
  const phases = {};
  for (const item of lcpEl?.details?.items ?? []) {
    for (const sub of item.items ?? []) {
      if (sub.phase) phases[sub.phase] = Math.round(sub.timing);
    }
  }
  const opps = Object.values(A)
    .filter((a) => a.score !== null && a.score < 0.9 &&
      !["notApplicable", "manual", "informative"].includes(a.scoreDisplayMode))
    .map((a) => ({
      id: a.id, title: a.title,
      savingsMs: Math.round(a.details?.overallSavingsMs ?? 0),
      savingsKb: Math.round((a.details?.overallSavingsBytes ?? 0) / 1024),
    }))
    .filter((o) => o.savingsMs > 0 || o.savingsKb > 0)
    .sort((a, b) => b.savingsMs - a.savingsMs)
    .slice(0, 6);

  return {
    scores: {
      performance: cat("performance"), accessibility: cat("accessibility"),
      "best-practices": cat("best-practices"), seo: cat("seo"),
    },
    metrics: {
      fcp: A["first-contentful-paint"]?.displayValue,
      lcp: A["largest-contentful-paint"]?.displayValue,
      tbt: A["total-blocking-time"]?.displayValue,
      cls: A["cumulative-layout-shift"]?.displayValue,
    },
    lcpElement: (lcpEl?.details?.items?.[0]?.node?.snippet ?? "").slice(0, 120),
    lcpPhases: phases,
    opportunities: opps,
  };
}

const queue = TARGETS.filter(([name]) => !only || name.includes(only));
console.log(`Auditing ${queue.length} templates x ${forms.length} form factor(s)\n`);

for (const [name, path] of queue) {
  for (const form of forms) {
    const key = `${name}::${form}`;
    if (results[key]) { console.log(`  skip ${key} (already in report)`); continue; }
    process.stdout.write(`  ${key.padEnd(34)} `);
    const r = audit(ORIGIN + path, form);
    if (!r) { console.log("FAILED"); continue; }
    results[key] = { name, path, form, ...r, at: new Date().toISOString() };
    const s = r.scores;
    console.log(`perf ${String(s.performance).padStart(3)}  a11y ${String(s.accessibility).padStart(3)}  bp ${String(s["best-practices"]).padStart(3)}  seo ${String(s.seo).padStart(3)}   LCP ${r.metrics.lcp ?? "-"}`);
    mkdirSync("docs", { recursive: true });
    writeFileSync(OUT, JSON.stringify({ runs: results }, null, 2));
  }
}

// ---- summary -------------------------------------------------------------
const rows = Object.values(results);
console.log(`\n${"=".repeat(78)}\nBELOW BUDGET\n${"=".repeat(78)}`);
const failing = [];
for (const r of rows) {
  const bad = Object.entries(BUDGET)
    .filter(([k, min]) => r.scores[k] < min)
    .map(([k, min]) => `${k} ${r.scores[k]}<${min}`);
  if (bad.length) {
    failing.push(r);
    console.log(`  ${r.form.padEnd(8)} ${r.path.padEnd(46)} ${bad.join(", ")}`);
  }
}
if (!failing.length) console.log("  none — every audited template is within budget");

const byOpp = new Map();
for (const r of rows) {
  for (const o of r.opportunities) {
    const e = byOpp.get(o.title) ?? { pages: 0, ms: 0, kb: 0 };
    e.pages++; e.ms += o.savingsMs; e.kb += o.savingsKb;
    byOpp.set(o.title, e);
  }
}
console.log(`\n${"=".repeat(78)}\nMOST COMMON OPPORTUNITIES (fix once, helps every page)\n${"=".repeat(78)}`);
for (const [title, e] of [...byOpp.entries()].sort((a, b) => b[1].pages - a[1].pages).slice(0, 12)) {
  console.log(`  ${String(e.pages).padStart(3)} pages  ${title.slice(0, 52).padEnd(54)} ~${e.ms}ms ${e.kb}KB`);
}
console.log(`\nReport: ${OUT}`);

if (budgetMode && failing.length) process.exit(1);
