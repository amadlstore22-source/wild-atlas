/**
 * Write lib/blog-lastmod.json: one date per TRANSLATED blog post, taken from
 * git — the newest commit among the lines of that post's own record in
 * lib/blog.<locale>.part<N>.ts.
 *
 * WHY (2026-11-27). app/sitemap.ts dated every locale of a post from the
 * English record's updatedAt. The translated records carry their own
 * updatedAt, but it was almost never bumped: in 439 of 608 translated posts
 * the text changed after the date the sitemap gave Google. A Search Console
 * URL Inspection the same day found 157 of 704 pages "Crawled - currently
 * not indexed", most last crawled in July and August, before the translation
 * and retitle work. The sitemap told Google nothing had changed, so it had
 * no reason to look again.
 *
 * Per-record blame, not the file's last commit: editing one Spanish post
 * must not re-date the other sixty in the same file. Google ignores lastmod
 * on sites whose dates are consistently inaccurate.
 *
 * SHALLOW CLONES KEEP THE COMMITTED FILE. Vercel clones the last 10 commits,
 * where git reports the oldest commit as the last change to every line. So
 * the map is generated from full history on a working copy (this runs as
 * `prebuild`) and committed; a shallow clone leaves it untouched. Lines not
 * committed yet count as now, since they ship with the build that reads them.
 *
 * usage: node scripts/build-blog-lastmod.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "lib", "blog-lastmod.json");
const git = (args) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], maxBuffer: 1 << 28 });

let shallow = false;
try {
  shallow = git(["rev-parse", "--is-shallow-repository"]).trim() === "true";
} catch {
  console.log("blog-lastmod: not a git repo, keeping lib/blog-lastmod.json");
  process.exit(0);
}
if (shallow) {
  console.log("blog-lastmod: shallow clone, keeping the committed lib/blog-lastmod.json");
  process.exit(0);
}

const out = {};
const files = fs.readdirSync(path.join(ROOT, "lib")).filter((f) => /^blog\.[a-z]{2}\.part\d+\.ts$/.test(f)).sort();
for (const file of files) {
  const lang = file.split(".")[1];
  const rel = `lib/${file}`;
  const lines = fs.readFileSync(path.join(ROOT, rel), "utf8").split(/\r?\n/);
  const times = [];
  let current = 0;
  for (const l of git(["blame", "--line-porcelain", "--", rel]).split("\n")) {
    if (/^[0-9a-f]{40} /.test(l)) current = /^0{40} /.test(l) ? -1 : 0;
    else if (l.startsWith("committer-time ") && current !== -1) current = Number(l.slice(15));
    else if (l.startsWith("\t")) times.push(current);
  }
  const starts = [];
  lines.forEach((l, i) => {
    const m = /^    slug: "([^"]+)",$/.exec(l);
    if (m) starts.push([m[1], i]);
  });
  starts.forEach(([slug, start], n) => {
    // The record opens on the line above its slug; it ends where the next one opens.
    const end = n + 1 < starts.length ? starts[n + 1][1] - 1 : lines.length;
    let newest = 0;
    for (let i = Math.max(0, start - 1); i < end; i++) newest = Math.max(newest, times[i] === -1 ? Date.now() / 1000 : times[i] ?? 0);
    if (newest) out[`${lang}:${slug}`] = new Date(Math.floor(newest) * 1000).toISOString().replace(".000Z", "Z");
  });
}

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n");
console.log(`blog-lastmod: ${Object.keys(sorted).length} translated posts dated from git`);
