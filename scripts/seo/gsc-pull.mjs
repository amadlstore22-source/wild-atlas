/**
 * Pull Search Console performance data for marrakechecotours.com.
 *
 * The service account (indexing-bot@…) already existed for the Indexing API;
 * this reuses it with the webmasters.readonly scope. Requires the Search
 * Console API enabled on the project AND the service account added as a user
 * on the property — both done 2026-09-05.
 *
 * Usage:
 *   node scripts/seo/gsc-pull.mjs                  # last 28 days, by page
 *   node scripts/seo/gsc-pull.mjs query 90         # by query, last 90 days
 *   node scripts/seo/gsc-pull.mjs page 90 json     # raw JSON to stdout
 *
 * Dimensions: page | query | country | device | date | page+query
 *
 * NOTE the 3-day lag: Search Console data is not final for roughly 72 hours,
 * so "yesterday" is normally empty and the last two days read low. Ranges here
 * end 3 days back to avoid reporting a phantom decline.
 */
import { token } from "./_gtoken.mjs";

const SITE = "sc-domain:marrakechecotours.com";
const API = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;

const dim = process.argv[2] ?? "page";
const days = Number(process.argv[3] ?? 28);
const asJson = process.argv[4] === "json";

const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(Date.now() - 3 * 864e5);
const start = new Date(end.getTime() - days * 864e5);

const dimensions = dim === "page+query" ? ["page", "query"] : [dim];

const t = await token("https://www.googleapis.com/auth/webmasters.readonly");
const res = await fetch(API, {
  method: "POST",
  headers: { authorization: `Bearer ${t}`, "content-type": "application/json" },
  body: JSON.stringify({
    startDate: iso(start),
    endDate: iso(end),
    dimensions,
    rowLimit: 25000,
    dataState: "final",
  }),
});

if (!res.ok) {
  console.error("HTTP", res.status, await res.text());
  process.exit(1);
}

const { rows = [] } = await res.json();

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

const tot = rows.reduce(
  (a, r) => ({
    clicks: a.clicks + r.clicks,
    impressions: a.impressions + r.impressions,
  }),
  { clicks: 0, impressions: 0 },
);

console.log(`${SITE}  ${iso(start)} → ${iso(end)}  (${days}d, by ${dim})`);
console.log(
  `rows ${rows.length}   clicks ${tot.clicks}   impressions ${tot.impressions}   ` +
    `CTR ${tot.impressions ? ((100 * tot.clicks) / tot.impressions).toFixed(2) : "0.00"}%`,
);
console.log("");
console.log("clicks  impr    ctr%   pos   key");
console.log("─".repeat(96));
for (const r of rows.slice(0, 60)) {
  const key = r.keys.join(" | ").replace("https://marrakechecotours.com", "");
  console.log(
    `${String(r.clicks).padStart(6)}  ${String(r.impressions).padStart(6)}  ` +
      `${(100 * r.ctr).toFixed(1).padStart(5)}  ${r.position.toFixed(1).padStart(5)}   ${key}`,
  );
}
