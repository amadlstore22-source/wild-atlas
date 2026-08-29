// Contact sheets: 12 photos per sheet (4x3), each labelled with an index so a
// finding can be traced back to an exact file. Reviewing 124 images one at a
// time is not feasible; a grid lets many be triaged at once, and anything
// promising gets opened full-size before it is used.
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = process.argv[2];
const OUT = process.argv[3];
const COLS = 4, ROWS = 3, CELL = 420, PAD = 6, LABEL = 26;

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const index = [];
let sheet = 0;

for (let i = 0; i < files.length; i += COLS * ROWS) {
  const batch = files.slice(i, i + COLS * ROWS);
  const tiles = [];
  for (let k = 0; k < batch.length; k++) {
    const f = batch[k];
    const n = i + k;
    index.push({ n, file: f, kb: Math.round(statSync(join(SRC, f)).size / 1024) });
    let buf;
    try {
      buf = await sharp(join(SRC, f)).rotate()
        .resize(CELL, CELL - LABEL, { fit: "contain", background: "#111" }).jpeg({ quality: 78 }).toBuffer();
    } catch { continue; }
    const label = Buffer.from(
      `<svg width="${CELL}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/>` +
      `<text x="6" y="18" font-family="monospace" font-size="15" fill="#0f0">#${n}</text></svg>`,
    );
    const cell = await sharp({ create: { width: CELL, height: CELL, channels: 3, background: "#111" } })
      .composite([{ input: buf, top: LABEL, left: 0 }, { input: label, top: 0, left: 0 }])
      .jpeg().toBuffer();
    tiles.push({ input: cell, top: Math.floor(k / COLS) * (CELL + PAD), left: (k % COLS) * (CELL + PAD) });
  }
  const W = COLS * (CELL + PAD), H = ROWS * (CELL + PAD);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#222" } })
    .composite(tiles).jpeg({ quality: 76 }).toFile(`${OUT}/sheet-${String(sheet).padStart(2, "0")}.jpg`);
  sheet++;
}
writeFileSync(`${OUT}/index.json`, JSON.stringify(index, null, 1));
console.log(`${files.length} photos -> ${sheet} sheets`);
