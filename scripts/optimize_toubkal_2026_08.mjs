// Resize + compress the client's August 2026 Toubkal-trek photos for web,
// writing them into /public/gallery with descriptive names.
//
// Same approach as optimize_client_photos.mjs: a ~1600px JPEG at q80 is
// plenty, because Next/Image re-encodes to AVIF/WebP per request anyway.
//
// NAMING — read before adding to this list
// The gallery already contains filenames that lie: destinations-sahara.jpg is
// a photograph of Monument Valley. A wrong name is worse than a generic one,
// because it silently becomes the alt text and nobody re-checks it. So every
// name here describes only what is verifiably IN the frame.
//
// THE WRECK SITE
// It is NOT Toubkal's summit -- an earlier draft assumed that from the haze
// and a summit-marker-shaped object, and was wrong. It is Tibherine, a twin
// summit in the Toubkal massif: East 3,880 m, West 3,887 m. The wreckage is
// on TIBHERINE EAST, which is why sources quoting "3,886-3,887 m" appear to
// disagree -- they are quoting the west top for the east one.
//
// The aircraft was a Lockheed L-749A Constellation carrying ammunition from
// Faro to Sao Tome, bound for Biafra. It struck the mountain at night on
// 28 November 1969 after engine failure; all eight aboard died, and the wreck
// was not found until 18 July 1970 -- which is where the "1969/1970" in
// aggregator summaries comes from. One engine is embedded in the summit and
// debris runs down the west face.
// Verified against baaa-acro.com (the accident record) and SummitPost, not an
// aggregator -- same rule as the sourceUrl requirement in lib/events.ts.
import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const DOWNLOADS = "C:/Users/cash/Downloads";
const OUT = "C:/Users/cash/wild-atlas/public/gallery";
const P = "WhatsApp Image 2026-08-28 at 20.37";

const MAP = [
  // Sunrise over a forested valley, pines in the foreground.
  [`${P}.29 (2).jpeg`, "atlas-valley-pines-sunrise-haze.jpg", 1600],
  // The cirque above the refuge: meltwater stream in a boulder field.
  [`${P}.29 (3).jpeg`, "toubkal-cirque-meltwater-stream.jpg", 1600],
  [`${P}.29.jpeg`, "toubkal-cirque-stream-scree-slopes.jpg", 1600],
  // Trekkers approaching the Toubkal refuge, the building clearly in frame.
  [`${P}.27 (1).jpeg`, "toubkal-refuge-approach-trekkers.jpg", 1600],
  // The refuge from above, looking back down the Mizane valley.
  [`${P}.27 (5).jpeg`, "toubkal-refuge-valley-view.jpg", 1600],
  // Lockheed Constellation wreckage on Tibherine East (3,880 m).
  [`${P}.27 (3).jpeg`, "tibherine-east-plane-wreck-ridges.jpg", 1600],
  [`${P}.27 (2).jpeg`, "tibherine-east-plane-wreck-sunrise.jpg", 1600],
  [`${P}.30.jpeg`, "tibherine-east-summit-view-valley.jpg", 1600],
  // Toubkal National Park sign, trilingual (Arabic / Tifinagh / French).
  [`${P}.27.jpeg`, "toubkal-national-park-sign-trilingual.jpg", 1600],
  // Trekkers and a pack mule on the high traverse.
  [`${P}.27 (4).jpeg`, "toubkal-traverse-trekkers-mule.jpg", 1600],
  [`${P}.29 (1).jpeg`, "toubkal-valley-trail-trekkers.jpg", 1600],
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
