// Resize the five Essaouira-coast trek photographs into the gallery.
//
// Source files are 4032x3024 phone originals, 3-5.6 MB each. The gallery
// convention is ~1600px on the long edge at quality 82, which lands the
// existing files between 187 and 411 KB. Shipping the originals would put
// 4 MB of unoptimised JPEG behind next/image for no visible gain.
//
// Filenames describe what is ACTUALLY in the frame. The existing gallery has
// several files whose names do not match their contents
// (toubkal-summit-sunrise-ridge.jpg is two trekkers on a valley path among
// autumn walnut trees; toubkal-cirque-stream-scree-slopes.jpg is the Toubkal
// Refuge building). Those names are how a photo ends up on the wrong page.
import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "C:/Users/cash/Downloads/";
const OUT = "C:/Users/cash/wild-atlas/public/gallery/";

const FILES = [
  ["20180905_104441.jpg", "atlantic-coast-trek-beach-walkers.jpg"],
  ["20180904_123641.jpg", "atlantic-coast-trek-camels-argan-track.jpg"],
  ["20180905_092243.jpg", "atlantic-coast-trek-argan-trail-group.jpg"],
  ["20180906_085838.jpg", "atlantic-coast-sea-arch-cliff.jpg"],
  ["20180906_184439.jpg", "coastal-desert-camp-dusk-tents.jpg"],
];

for (const [from, to] of FILES) {
  const meta = await sharp(SRC + from).metadata();
  await sharp(SRC + from)
    .rotate() // honour EXIF orientation before resizing
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(OUT + to);
  const after = await sharp(OUT + to).metadata();
  console.log(
    `${to}\n   ${meta.width}x${meta.height} ${Math.round(statSync(SRC + from).size / 1024)}KB` +
      `  ->  ${after.width}x${after.height} ${Math.round(statSync(OUT + to).size / 1024)}KB`,
  );
}
