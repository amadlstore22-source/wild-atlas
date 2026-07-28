// Resize + compress the client's Toubkal-trek phone photos for web, writing
// them into /public/gallery with descriptive names. Next/Image will further
// serve them as AVIF/WebP, so a ~1600px JPEG source at q80 is plenty.
import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const DOWNLOADS = "C:/Users/cash/Downloads";
const OUT = "C:/Users/cash/wild-atlas/public/gallery";

// All taken in Toubkal National Park, on the Imlil -> Sidi Chamharouch trail.
const MAP = [
  ["IMG_20260727_171639.jpg.jpeg", "toubkal-national-park-peak-clouds.jpg", 1600],
  ["IMG_20260727_171619.jpg.jpeg", "imlil-berber-village-kittens.jpg", 1400],
  ["IMG_20260727_175934.jpg.jpeg", "toubkal-trail-waterfall-gorge.jpg", 1400],
  ["IMG_20260727_171455.jpg.jpeg", "toubkal-trail-turquoise-pool-waterfall.jpg", 1600],
  ["IMG_20260726_203904.jpg.jpeg", "imlil-village-green-valley.jpg", 1400],
  ["IMG_20260727_171404.jpg.jpeg", "toubkal-national-park-entrance-sign.jpg", 1400],
  ["IMG_20260727_224318.jpg.jpeg", "imlil-valley-night-stars.jpg", 1400],
];

let done = 0;
for (const [src, dest, w] of MAP) {
  const inPath = path.join(DOWNLOADS, src);
  const outPath = path.join(OUT, dest);
  if (!existsSync(inPath)) {
    console.log(`SKIP (missing): ${src}`);
    continue;
  }
  const info = await sharp(inPath)
    .rotate() // respect EXIF orientation
    .resize({ width: w, height: w, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);
  console.log(`✓ ${dest}  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`);
  done++;
}
console.log(`\nOptimised ${done} photos into public/gallery.`);
