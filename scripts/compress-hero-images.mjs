// Shrink the oversized /public/gallery heroes in place.
//
// Lighthouse on /en/blog/morocco-unesco-sites-film-locations measured a 4.7 s
// mobile LCP with 2.6 s of it in "resource load duration". The hero there is a
// 1.3 MB JPEG, and several others run to 2.8 MB. next/image re-encodes them to
// AVIF/WebP on demand, but the optimiser still has to read and decode the full
// original, so an oversized source costs real time on the first request for
// every size variant — and the derivative it produces is larger than it needs
// to be.
//
// Heroes render at most 1600px wide (sizes="100vw", capped by the layout), so a
// 1600px q80 mozjpeg source is already more than the largest variant needs.
// Matches the convention in optimize_client_photos.mjs.
//
// Usage:
//   node scripts/compress-hero-images.mjs           # report only
//   node scripts/compress-hero-images.mjs --write   # rewrite in place
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";

const GALLERY = path.join(process.cwd(), "public", "gallery");
const MAX_WIDTH = 1600;
const QUALITY = 80;
// Anything under this is already cheap enough that a re-encode risks losing
// more quality than it saves bytes.
const THRESHOLD_BYTES = 400 * 1024;

const write = process.argv.includes("--write");

const files = (await readdir(GALLERY)).filter((f) => /\.(jpe?g|png)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;
let touched = 0;

for (const name of files.sort()) {
  const file = path.join(GALLERY, name);
  const { size } = await stat(file);
  if (size < THRESHOLD_BYTES) continue;

  const meta = await sharp(file).metadata();
  const tmp = file + ".tmp";

  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_WIDTH, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp);

  const saved = size - info.size;
  // A re-encode that saves nothing is not worth the quality loss.
  if (saved <= 0) {
    await unlink(tmp);
    continue;
  }

  totalBefore += size;
  totalAfter += info.size;
  touched++;

  console.log(
    `${write ? "✓" : "·"} ${name.padEnd(52)} ` +
      `${meta.width}x${meta.height} ${(size / 1024).toFixed(0)}KB → ` +
      `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB ` +
      `(-${((saved / size) * 100).toFixed(0)}%)`,
  );

  if (write) await rename(tmp, file);
  else await unlink(tmp);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(
  `\n${touched} files: ${mb(totalBefore)} MB → ${mb(totalAfter)} MB ` +
    `(saves ${mb(totalBefore - totalAfter)} MB)`,
);
if (!write) console.log("Dry run. Re-run with --write to apply.");
