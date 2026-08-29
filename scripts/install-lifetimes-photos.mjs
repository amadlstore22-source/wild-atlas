// Second pass over the operator's photo library: all 124 files were reviewed
// via contact sheets, then every candidate below was opened full-size before
// being named or placed.
//
// WHAT WAS EXCLUDED, AND WHY — the exclusions are the point of the review:
//   - Two frames carry a third-party watermark, "Nissim Trek-Run ©". Those are
//     someone else's copyrighted photographs and are not ours to publish.
//   - A brand logo for "Life Times Travel — Toubkal Adventure", a different
//     company.
//   - A Casablanca fish market ("Marché central N°14 Casa" on the sign) with an
//     identifiable vendor and phone numbers on display.
//   - Roughly seventy near-duplicate Anti-Atlas landscapes, most of them two
//     thirds empty sky, with no people, no guide and nothing that identifies
//     the trip.
//
// SOME FILES CARRY A "Galaxy A16" DEVICE STAMP in the lower-left corner. Those
// are ours, so they are kept and the stamp is cropped off (`crop: true` below)
// rather than left on a page arguing these are professional trips. The crop
// takes 12% off the bottom, which no composition here depends on.
import sharp from "sharp";
import { statSync } from "node:fs";

const SRC = "C:/Users/cash/Desktop/lifetimestravel/";
const OUT = "C:/Users/cash/wild-atlas/public/gallery/";

/** [source, destination, cropDeviceStamp] */
const FILES = [
  // --- High Atlas: the trek experience, which the gallery was thin on ---
  ["WhatsApp Image 2026-08-01 at 00.06.02.jpeg", "atlas-terraced-fields-sunrise.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.06.04.jpeg", "trek-lunch-mint-tea-walnut-grove.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.06.03.jpeg", "berber-salad-platter-trail-lunch.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.06.02 (1).jpeg", "atlas-mule-train-green-trail.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.06.15.jpeg", "trek-group-descending-scree.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.06.15 (1).jpeg", "trek-scramble-gorge-poles.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.01.23.jpeg", "refuge-group-dinner-long-table.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.05.59.jpeg", "winter-ascent-crampons-helmet.jpg", false],
  // Named for the cascade it actually shows, NOT "waterfall" generically. It
  // was first placed on the Ouzoud day trip, which was wrong: Ouzoud is a
  // 110 m multi-tier fall, and this is a small streamside cascade with a café
  // terrace beside it — Ourika/Setti Fatma. Selling the Ouzoud trip with this
  // photograph would misdescribe the product.
  ["WhatsApp Image 2026-08-01 at 01.08.54.jpeg", "ourika-valley-cascade-cafe.jpg", true],
  ["WhatsApp Image 2026-08-01 at 01.08.49.jpeg", "high-camp-tents-below-ridge.jpg", true],

  // --- Sahara: guests, guides and camels, not empty dunes ---
  ["WhatsApp Image 2026-08-01 at 01.16.36.jpeg", "camel-caravan-sunset-riders.jpg", true],
  ["WhatsApp Image 2026-08-01 at 01.16.44.jpeg", "camel-caravan-dune-crest-walker.jpg", true],
  ["WhatsApp Image 2026-08-01 at 01.16.23.jpeg", "camels-resting-dune-golden-hour.jpg", true],
  ["WhatsApp Image 2026-08-01 at 00.02.07.jpeg", "camels-couched-camp-dawn.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.02.08.jpeg", "caravan-dune-ridge-long-shadows.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.02.09 (1).jpeg", "camp-cook-preparing-vegetables.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.01.19 (2).jpeg", "desert-campfire-night-guests.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.01.20 (2).jpeg", "camels-resting-acacia-tree.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.01.20.jpeg", "trekkers-crossing-dune-field.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.00.51.jpeg", "group-walking-dune-ridge.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.05.54.jpeg", "dune-summit-arms-raised.jpg", false],
  ["WhatsApp Image 2026-08-01 at 01.14.04.jpeg", "wild-ostrich-souss-massa.jpg", true],

  // --- Named itinerary stops ---
  ["WhatsApp Image 2026-08-01 at 00.24.31.jpeg", "ait-ben-haddou-kasbah-wide.jpg", true],
  ["WhatsApp Image 2026-08-01 at 00.24.06 (1).jpeg", "tafraoute-painted-rocks.jpg", false],
  ["WhatsApp Image 2026-08-01 at 00.01.22 (1).jpeg", "summit-ridge-arms-wide-atlas.jpg", false],
];

let total = 0;
for (const [from, to, crop] of FILES) {
  const img = sharp(SRC + from).rotate();
  const meta = await img.metadata();
  // The device stamp sits in the bottom-left. Measured by sampling row
  // brightness on the source: the white text spans y=0.90-0.95 of the frame
  // height, so a 7% crop cut THROUGH it and left the top half of the letters
  // visible. 12% clears it with margin.
  const pipeline = crop
    ? img.extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.88) })
    : img;
  await pipeline
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(OUT + to);
  const after = await sharp(OUT + to).metadata();
  const kb = Math.round(statSync(OUT + to).size / 1024);
  total += kb;
  console.log(`${crop ? "crop " : "     "}${to}  ${after.width}x${after.height}  ${kb}KB`);
}
console.log(`\n${FILES.length} photographs, ${total} KB total`);
