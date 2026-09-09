#!/usr/bin/env node
/**
 * Re-crop portrait tour hero images to 16:10 landscape.
 *
 * THE BUG
 * The tour hero renders in a fixed landscape band -- `h-[60vh] min-h-[420px]`
 * with `fill` + `object-cover` + `sizes="100vw"` (app/[lang]/tours/[slug]/page.tsx).
 * 16 of 48 tour heroes are portrait phone photos. next/image resizes to the
 * requested WIDTH, so a 1200x1600 source becomes 750x1000 at the mobile
 * breakpoint and object-cover then discards roughly half that height. The
 * cropped-away pixels are still downloaded and still decoded.
 *
 * Measured on the live site at the mobile breakpoint (w=750):
 *   portrait heroes   51-208 KB   (avg ~147 KB)
 *   landscape heroes  23-54  KB   (avg ~36 KB)
 * ourika-valley-day-hike delivered 9x the bytes of a landscape hero for a
 * SMALLER visible image. PageSpeed scored that page's sibling tour 74 vs 90
 * for an otherwise identical template.
 *
 * WHY 1600x1000 (16:10)
 * The band is landscape on desktop and roughly 5:6 on a 412px phone. 16:10 at
 * 1600 wide covers every breakpoint next/image requests (max 1920 is never
 * needed for a band this short) without shipping height that object-cover
 * throws away. Quality 82 + mozjpeg matches what the originals were saved at.
 *
 * WHY `attention` CROP
 * Blind centre-cropping a portrait discards the top and bottom equally, which
 * is wrong for photos composed with the subject high (a summit) or low (a
 * valley floor). sharp's attention strategy picks the region with the highest
 * detail energy. Every output was reviewed by eye before this shipped.
 *
 * ORIGINALS ARE PRESERVED under .originals/gallery-heroes/ (gitignored) -- these
 * are real client photos from real treks and are not regenerable. Nothing is
 * overwritten until every crop has succeeded (two-pass): a per-file write
 * inside the loop would leave the set half-converted if a later file failed.
 *
 * Usage:
 *   node scripts/seo/fix-portrait-heroes.mjs --dry-run
 *   node scripts/seo/fix-portrait-heroes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const GALLERY = "public/gallery";
// NOT under public/. Everything in public/ is served, so a backup directory
// there would publish 5.5 MB of duplicate photographs at
// marrakechecotours.com/gallery/_originals-portrait/... — crawlable, and
// competing with the real images. .originals/ is gitignored (.gitignore:84).
const BACKUP = ".originals/gallery-heroes";
const TOURS = "lib/tours.ts";
const TARGET_W = 1600;
const TARGET_H = 1000;
const QUALITY = 82;

const dryRun = process.argv.includes("--dry-run");

/** Collect every distinct heroImage in tours.ts.
 *
 *  An earlier version paired each `heroImage` with the preceding `slug` and
 *  cleared the slug after each match, so any entry whose heroImage did not
 *  directly follow its own slug was dropped -- it silently missed 4 of 47
 *  heroes, one of which was portrait and survived the first run. The slug was
 *  only ever used for log output, so matching the image field alone removes
 *  the failure mode entirely. Label each image by its own filename instead. */
function tourHeroes() {
  const src = fs.readFileSync(TOURS, "utf8");
  const imgs = [...new Set([...src.matchAll(/heroImage:\s*"([^"]+)"/g)].map((m) => m[1]))];
  return imgs.map((img) => ({ slug: path.basename(img, path.extname(img)), img }));
}

const heroes = tourHeroes();
if (!heroes.length) {
  console.error(`No slug/heroImage pairs found in ${TOURS} — aborting rather than guessing.`);
  process.exit(1);
}

const work = [];
for (const { slug, img } of heroes) {
  const file = path.join("public", img);
  if (!fs.existsSync(file)) {
    console.error(`  MISSING (skipped): ${img}`);
    continue;
  }
  const meta = await sharp(file).metadata();
  // Not `height > width`. The band is 16:10 (1.60), so a 1600x1600 square or a
  // 1600x1461 near-square is landscape by orientation yet still ships ~45% more
  // height than object-cover can show: those two averaged 114KB delivered
  // against 42KB for heroes already near the target ratio. Anything materially
  // taller than the band pays the same penalty a portrait does.
  const RATIO_MIN = 1.45; // 16:10 is 1.60; allow a little slack before re-cropping
  if (meta.width / meta.height >= RATIO_MIN) continue;
  work.push({ slug, img, file, w: meta.width, h: meta.height, kb: Math.round(fs.statSync(file).size / 1024) });
}

console.log(`${heroes.length} tour heroes · ${work.length} portrait\n`);
if (!work.length) {
  console.log("Nothing to do.");
  process.exit(0);
}

// PASS 1 — build every crop in memory and measure it. Nothing on disk changes.
const built = [];
for (const w of work) {
  const buf = await sharp(w.file)
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  // What the browser actually downloads: next/image serves webp at the
  // breakpoint width. Comparing source JPEGs would overstate the win.
  const before = (await sharp(w.file).resize(750).webp({ quality: 75 }).toBuffer()).length;
  const after = (await sharp(buf).resize(750).webp({ quality: 75 }).toBuffer()).length;
  // Gate on the MEASURED saving, not the aspect ratio. Widening the ratio
  // filter to catch near-square heroes also swept in 4:3 photos that were
  // already small: children-camels-palm-oasis-draa came out BIGGER after
  // re-encoding (79KB -> 81KB) and three others moved by <=1KB. Re-encoding a
  // JPEG is lossy, so a crop that does not clearly pay for itself is a pure
  // quality loss. Require both a real proportional win and a real absolute one.
  const saved = before - after;
  if (saved < before * 0.15 || saved < 12 * 1024) {
    console.log(
      `  ${w.slug.padEnd(38)} ${String(w.w + "x" + w.h).padEnd(10)} ` +
        `SKIP (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB, not worth re-encoding)`,
    );
    continue;
  }
  built.push({ ...w, buf, before, after });
  console.log(
    `  ${w.slug.padEnd(38)} ${String(w.w + "x" + w.h).padEnd(10)} ` +
      `delivered ${String(Math.round(before / 1024)).padStart(4)}KB → ${String(Math.round(after / 1024)).padStart(4)}KB`,
  );
}

if (!built.length) {
  console.log("\nNothing worth re-encoding.");
  process.exit(0);
}
const before = built.reduce((a, b) => a + b.before, 0);
const after = built.reduce((a, b) => a + b.after, 0);
console.log(
  `\ntotal delivered: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB ` +
    `(saves ${Math.round((before - after) / 1024)}KB, ${Math.round((1 - after / before) * 100)}%)`,
);

if (dryRun) {
  console.log("\n--dry-run: nothing written.");
  process.exit(0);
}

// PASS 2 — all crops succeeded, so commit. Back up first: these are real
// client photos and the originals cannot be re-shot.
fs.mkdirSync(BACKUP, { recursive: true });
for (const b of built) {
  const dest = path.join(BACKUP, path.basename(b.file));
  if (!fs.existsSync(dest)) fs.copyFileSync(b.file, dest);
}
// Write to a sibling temp file and rename over the target. Opening the
// original for writing failed with a Windows sharing violation (errno -4094,
// code UNKNOWN) on a file that was readable and had W_OK -- an indexer or
// scanner holds a transient handle on freshly-read image files. rename() only
// needs the DIRECTORY, so it is immune to a reader holding the old inode, and
// it is atomic: a crash mid-write cannot leave a truncated JPEG.
for (const b of built) {
  const tmp = `${b.file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, b.buf);
  try {
    fs.renameSync(tmp, b.file);
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    throw new Error(`could not replace ${b.file}: ${e.code}`);
  }
}

console.log(`\nwrote ${built.length} heroes · originals backed up to ${BACKUP}`);
