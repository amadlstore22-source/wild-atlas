/**
 * Resubmit the sitemap to Search Console, then print what Google has on file
 * for it. This is the sanctioned way to tell Google pages changed (the
 * Indexing API is for JobPosting/BroadcastEvent pages only; see
 * scripts/README-indexing.md). Needs the service account to be an Owner on
 * the property (it is) and the webmasters (read/write) scope.
 *
 *   node scripts/seo/gsc-sitemap-submit.mjs            # submit + status
 *   node scripts/seo/gsc-sitemap-submit.mjs --status   # status only
 */
import { token } from "./_gtoken.mjs";

const SITE = "sc-domain:marrakechecotours.com";
const FEED = "https://marrakechecotours.com/sitemap.xml";
const base = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(FEED)}`;
const t = await token("https://www.googleapis.com/auth/webmasters");
const auth = { authorization: `Bearer ${t}` };

if (!process.argv.includes("--status")) {
  const r = await fetch(base, { method: "PUT", headers: auth });
  console.log(`submit ${FEED}: HTTP ${r.status}${r.ok ? "" : " " + (await r.text())}`);
  if (!r.ok) process.exit(1);
}
const s = await (await fetch(base, { headers: auth })).json();
console.log(JSON.stringify({ lastSubmitted: s.lastSubmitted, lastDownloaded: s.lastDownloaded, isPending: s.isPending, warnings: s.warnings, errors: s.errors, contents: s.contents }, null, 1));
