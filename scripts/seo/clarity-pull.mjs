/**
 * Pull Microsoft Clarity behaviour data (Data Export API) and keep a copy.
 *
 * The API only reaches back 1-3 days and allows 10 requests per project per
 * day, so the point of this script is to SNAPSHOT: every response is saved
 * under C:\Users\cash\wild-atlas-research\clarity\ (outside the repo, so it
 * can never ship), and history builds up one run at a time.
 *
 * Usage:
 *   node scripts/seo/clarity-pull.mjs              # default set: 2 requests
 *   node scripts/seo/clarity-pull.mjs URL Device   # one request, up to 3 dims
 *   node scripts/seo/clarity-pull.mjs --report     # summarise saved snapshots, 0 requests
 *
 * Dimensions: Browser Device Country/Region OS Source Medium Campaign Channel URL
 * Token: CLARITY_API_TOKEN in .env.local (gitignored). Never commit it.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = "C:/Users/cash/wild-atlas-research/clarity";
const API = "https://www.clarity.ms/export-data/api/v1/project-live-insights";
const DAILY_LIMIT = 10;

const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const TOKEN = env.CLARITY_API_TOKEN;

fs.mkdirSync(OUT, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const usageFile = path.join(OUT, "usage.json");
const usage = fs.existsSync(usageFile) ? JSON.parse(fs.readFileSync(usageFile, "utf8")) : {};

async function pull(dims) {
  if ((usage[today] ?? 0) >= DAILY_LIMIT) throw new Error(`Daily limit of ${DAILY_LIMIT} requests reached (UTC ${today}).`);
  if (!TOKEN) throw new Error("CLARITY_API_TOKEN missing from .env.local");
  const qs = new URLSearchParams({ numOfDays: "3" });
  dims.forEach((d, i) => qs.set(`dimension${i + 1}`, d));
  const res = await fetch(`${API}?${qs}`, { headers: { authorization: `Bearer ${TOKEN}`, "content-type": "application/json" } });
  usage[today] = (usage[today] ?? 0) + 1;
  fs.writeFileSync(usageFile, JSON.stringify(usage, null, 2));
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  const file = path.join(OUT, `${today}_${dims.join("+").replace(/\//g, "-") || "total"}.json`);
  fs.writeFileSync(file, JSON.stringify({ pulledAt: new Date().toISOString(), numOfDays: 3, dims, data }, null, 2));
  console.log(`saved ${file}  (${usage[today]}/${DAILY_LIMIT} requests used today)`);
  return data;
}

// The response does not echo dimension names as requested: "URL" comes back
// as "Url". Match on letters only, case-insensitively.
const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
const dimValue = (info, d) => {
  const k = Object.keys(info).find((x) => norm(x) === norm(d) || norm(x) === norm(d).replace("region", ""));
  let v = k ? info[k] : null;
  // Strip tracking params so ?utm_source=chatgpt.com rows join their page.
  if (v && norm(d) === "url") v = v.replace(/^https:\/\/marrakechecotours\.com/, "").replace(/[?&]utm_[^&]+/g, "").replace(/\?$/, "") || "/";
  return v ?? "(none)";
};

const PROBLEMS = ["DeadClickCount", "RageClickCount", "QuickbackClick", "ErrorClickCount", "ScriptErrorCount", "ExcessiveScroll"];

/** One row per dimension value, metrics summed (counts) or session-weighted (averages). */
function table(data, dims) {
  const rows = new Map();
  const get = (info) => {
    const key = dims.map((d) => dimValue(info, d)).join(" | ");
    if (!rows.has(key)) rows.set(key, { key, sessions: 0, users: 0, scrollW: 0, scrollN: 0, active: 0, total: 0, ...Object.fromEntries(PROBLEMS.map((p) => [p, 0])) });
    return rows.get(key);
  };
  const by = (n) => data.find((m) => m.metricName === n)?.information ?? [];
  for (const i of by("Traffic")) { const r = get(i); r.sessions += i.totalSessionCount; r.users += i.distinctUserCount; }
  for (const i of by("ScrollDepth")) { const r = get(i); const w = Math.max(1, r.sessions); r.scrollW += i.averageScrollDepth * w; r.scrollN += w; }
  for (const i of by("EngagementTime")) { const r = get(i); r.active += i.activeTime; r.total += i.totalTime; }
  for (const p of PROBLEMS) for (const i of by(p)) get(i)[p] += i.subTotal ?? 0;
  return [...rows.values()].map((r) => ({ ...r, scroll: r.scrollN ? Math.round(r.scrollW / r.scrollN) : null }));
}

function print(rows, dims, limit = 25) {
  rows.sort((a, b) => b.sessions - a.sessions);
  const sum = rows.reduce((a, r) => a + r.sessions, 0);
  console.log(`\n== by ${dims.join(" + ")}  (${rows.length} rows, ${sum} sessions summed across rows)`);
  console.log("sessions  scroll%  active-s  dead rage quickback errclick scripterr  " + dims.join(" | "));
  for (const r of rows.slice(0, limit))
    console.log(`${String(r.sessions).padStart(8)}  ${String(r.scroll ?? "-").padStart(7)}  ${String(r.active).padStart(8)}  ${String(r.DeadClickCount).padStart(4)} ${String(r.RageClickCount).padStart(4)} ${String(r.QuickbackClick).padStart(9)} ${String(r.ErrorClickCount).padStart(8)} ${String(r.ScriptErrorCount).padStart(9)}  ${r.key}`);
  const bad = rows.filter((r) => PROBLEMS.some((p) => r[p] > 0));
  if (bad.length) {
    console.log(`\n-- rows with a frustration or error signal (${bad.length}):`);
    for (const r of bad) console.log("  ", r.key, "→", PROBLEMS.filter((p) => r[p] > 0).map((p) => `${p} ${r[p]}`).join(", "));
  }
}

const args = process.argv.slice(2);
if (args.includes("--report")) {
  // Re-read today's saved snapshots (or a given date) without spending a request.
  const date = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) ?? today;
  for (const f of fs.readdirSync(OUT).filter((f) => f.startsWith(date) && f.endsWith(".json"))) {
    const snap = JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8"));
    print(table(snap.data, snap.dims), snap.dims);
  }
} else {
  const sets = args.length ? [args] : [["URL", "Device"], ["Channel", "Source"]];
  for (const dims of sets) print(table(await pull(dims), dims), dims);
}
