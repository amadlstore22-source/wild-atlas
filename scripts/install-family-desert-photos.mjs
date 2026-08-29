// Three verified first-party photographs from the operator's own family desert
// departures, for tours that were carrying stock imagery.
//
// Every filename describes what is ACTUALLY in the frame. Each was opened and
// looked at before naming — this gallery already contains files whose names
// lie (toubkal-summit-sunrise-ridge.jpg is two walkers among autumn walnut
// trees; toubkal-cirque-stream-scree-slopes.jpg is the Toubkal Refuge), and a
// wrong name is how a photo ends up on the wrong page.
import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "C:/Users/cash/Desktop/lifetimestravel/";
const OUT = "C:/Users/cash/wild-atlas/public/gallery/";

const FILES = [
  // Camel caravan on Erg Chebbi dunes, two children riding, guide walking.
  ["WhatsApp Image 2026-08-01 at 00.01.14.jpeg", "family-desert-camel-caravan-dunes.jpg"],
  // Family with two young children at the campfire, guide tending it, Berber
  // tent lit from inside, dusk.
  ["WhatsApp Image 2026-08-01 at 00.02.09.jpeg", "family-desert-camp-campfire-dusk.jpg"],
  // Children in headscarves riding camels past a palmeraie and mud-brick wall.
  ["WhatsApp Image 2026-08-01 at 00.01.14 (1).jpeg", "family-camel-trek-palmeraie-children.jpg"],
];

for (const [from, to] of FILES) {
  const before = await sharp(SRC + from).metadata();
  await sharp(SRC + from)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(OUT + to);
  const after = await sharp(OUT + to).metadata();
  console.log(
    `${to}\n   ${before.width}x${before.height} ${Math.round(statSync(SRC + from).size / 1024)}KB` +
      `  ->  ${after.width}x${after.height} ${Math.round(statSync(OUT + to).size / 1024)}KB`,
  );
}
