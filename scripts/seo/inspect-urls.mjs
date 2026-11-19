#!/usr/bin/env node
/**
 * Read-only check of a list of URLs, the way Search Console's "Page
 * indexing" reports group them: what the live page answers today, and what
 * Google's URL Inspection says about it now (the reports lag by weeks).
 *
 *   node scripts/seo/inspect-urls.mjs <list.txt> [--out result.json] [--no-google]
 *
 * <list.txt>: one "<group> <path>" per line (# comments allowed), e.g.
 *   crawled /en/tours/sahara-3day-marrakech
 *
 * Uses the same service account as gsc-pull.mjs (webmasters.readonly).
 * URL Inspection allows 2,000 calls a day per property; this makes one per URL.
 * Fetches go out four at a time: fast probing trips Vercel's bot checkpoint.
 * On this PC run it as: node --no-network-family-autoselection scripts/seo/inspect-urls.mjs …
 * (Node otherwise gives each connection 250 ms, and Google times out here).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { token } from "./_gtoken.mjs";

const SITE = "sc-domain:marrakechecotours.com";
const ORIGIN = "https://marrakechecotours.com";
const args = process.argv.slice(2);
const list = args[0];
const out = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;
const google = !args.includes("--no-google");
if (!list) { console.error("usage: node scripts/seo/inspect-urls.mjs <list.txt> [--out file.json] [--no-google]"); process.exit(1); }

const rows = readFileSync(list, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [group, path] = l.split(/\s+/); return { group, path }; });

const attr = (html, re) => (html.match(re) || [])[1] || "";
const words = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  const text = main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
};

async function live(path) {
  const r = { status: 0, location: "", canonical: "", robots: "", lang: "", title: "", words: 0, hreflangs: 0 };
  try {
    let res = await retry(() => fetch(ORIGIN + path, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (MET site check)" } }));
    r.status = res.status;
    if (res.status >= 300 && res.status < 400) {
      r.location = res.headers.get("location") || "";
      res = await fetch(new URL(r.location, ORIGIN), { headers: { "user-agent": "Mozilla/5.0 (MET site check)" } });
      r.finalStatus = res.status;
    }
    const html = await res.text();
    r.canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i).replace(ORIGIN, "");
    r.robots = attr(html, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
    r.lang = attr(html, /<html[^>]+lang="([^"]+)"/i);
    r.title = attr(html, /<title>([^<]*)<\/title>/i);
    r.hreflangs = (html.match(/hreflang="/g) || []).length;
    r.words = words(html);
  } catch (e) { r.error = String(e.cause?.code || e.message); }
  return r;
}

// This PC's network drops some connections (see project notes): retry those.
async function retry(fn, tries = 4) {
  for (let i = 1; ; i++) {
    try { return await fn(); } catch (e) {
      if (i >= tries) throw e;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

let TOKEN;
async function inspect(path) {
  const res = await retry(() => fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({ inspectionUrl: ORIGIN + path, siteUrl: SITE }),
  }));
  if (!res.ok) return { error: `${res.status} ${(await res.text()).slice(0, 200)}` };
  const x = (await res.json()).inspectionResult?.indexStatusResult ?? {};
  return {
    verdict: x.verdict, coverage: x.coverageState, lastCrawl: (x.lastCrawlTime || "").slice(0, 10),
    googleCanonical: (x.googleCanonical || "").replace(ORIGIN, ""), userCanonical: (x.userCanonical || "").replace(ORIGIN, ""),
    inSitemap: (x.sitemap || []).length > 0, referrers: (x.referringUrls || []).length,
  };
}

if (google) TOKEN = await retry(() => token("https://www.googleapis.com/auth/webmasters.readonly"));
const results = [];
for (let i = 0; i < rows.length; i += 4) {
  const batch = rows.slice(i, i + 4);
  results.push(...(await Promise.all(batch.map(async (row) => ({ ...row, live: await live(row.path), google: google ? await inspect(row.path) : null })))));
  process.stderr.write(`\r${results.length}/${rows.length}`);
}
process.stderr.write("\n");
if (out) writeFileSync(out, JSON.stringify(results, null, 2));

for (const r of results) {
  const l = r.live, g = r.google || {};
  console.log([r.group, r.path, l.status + (l.location ? `→${l.location}` : ""), l.canonical === r.path ? "self" : `canon=${l.canonical}`, l.robots || "-", `${l.words}w`,
    g.coverage || g.error || "", g.lastCrawl || "", g.googleCanonical && g.googleCanonical !== r.path ? `gcanon=${g.googleCanonical}` : ""].join("\t"));
}
