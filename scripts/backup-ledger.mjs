/**
 * Copy the client-data files in data/ to a timestamped folder OUTSIDE the repo.
 *
 * WHY THIS EXISTS. data/documents.json holds every invoice and contract ever
 * issued, and — more importantly — the numbering sequence. .gitignore says it
 * plainly: "LOSING IT RESTARTS NUMBERING, which is how two clients were once
 * issued the same reference." The file is deliberately excluded from git, so
 * the repo is not a backup of it. Nothing else was.
 *
 * The .bak twins already in data/ are not a backup either. They are written
 * ad hoc before an edit, so data/documents.json.bak was dated 3 September
 * while the live ledger had moved on by ten documents. A backup nobody
 * refreshes is worse than none, because it looks like insurance.
 *
 * WHERE IT WRITES. %USERPROFILE%/wild-atlas-backups (override with --dest).
 * Outside the working tree on purpose: a backup inside data/ is lost to the
 * same rm -rf, the same bad merge and the same disk failure as the original.
 * Copy the folder to a USB stick or cloud drive periodically; it is tiny.
 *
 * ROTATION. Keeps the newest 30 snapshots and deletes older ones, so running
 * it daily costs about 20 KB a month and never needs pruning by hand.
 *
 * Usage:
 *   node scripts/backup-ledger.mjs
 *   node scripts/backup-ledger.mjs --dest "D:/backups"
 *   node scripts/backup-ledger.mjs --keep 90
 *   node scripts/backup-ledger.mjs --list
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]?.startsWith("--") ? true : arr[i + 1] ?? true]);
    return acc;
  }, []),
);

const DEST = typeof args.dest === "string" ? args.dest : path.join(os.homedir(), "wild-atlas-backups");
const KEEP = Number(args.keep) || 30;
const SRC = path.join(process.cwd(), "data");

/* Everything in data/ that carries customer data or numbering state. The .bak
   twins are copied too: they are stale, but a stale copy of a file someone
   later corrupts is still worth having. */
const PATTERN = /\.(json|bak)$/i;

if (args.list) {
  if (!fs.existsSync(DEST)) {
    console.log(`No backups yet. ${DEST} does not exist.`);
    process.exit(0);
  }
  const snaps = fs.readdirSync(DEST).filter((d) => /^\d{4}-\d{2}-\d{2}/.test(d)).sort();
  console.log(`${snaps.length} snapshot(s) in ${DEST}\n`);
  for (const s of snaps.slice(-10)) {
    const files = fs.readdirSync(path.join(DEST, s));
    const kb = files.reduce((n, f) => n + fs.statSync(path.join(DEST, s, f)).size, 0) / 1024;
    console.log(`  ${s}   ${files.length} files   ${kb.toFixed(0)} KB`);
  }
  if (snaps.length > 10) console.log(`  ... and ${snaps.length - 10} older`);
  process.exit(0);
}

if (!fs.existsSync(SRC)) {
  console.error(`No data/ directory at ${SRC}. Run this from the project root.`);
  process.exit(1);
}

const files = fs.readdirSync(SRC).filter((f) => PATTERN.test(f));
if (!files.length) {
  console.error(`Nothing to back up: no .json or .bak files in ${SRC}`);
  process.exit(1);
}

// 2026-09-13T1055 — sorts chronologically as a plain string, and is legible.
const now = new Date();
const stamp =
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}` +
  `T${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

const out = path.join(DEST, stamp);
fs.mkdirSync(out, { recursive: true });

let bytes = 0;
for (const f of files) {
  const src = path.join(SRC, f);
  const dst = path.join(out, f);
  fs.copyFileSync(src, dst);
  const size = fs.statSync(dst).size;
  bytes += size;

  // Verify the copy rather than trusting it: a truncated backup of a ledger is
  // indistinguishable from a good one until the day you need it.
  if (size !== fs.statSync(src).size) {
    console.error(`  MISMATCH ${f} — copy is ${size} bytes, source is ${fs.statSync(src).size}`);
    process.exit(1);
  }
  console.log(`  ${f}  ${(size / 1024).toFixed(1)} KB`);
}

// A one-line manifest, so a folder found in five years explains itself.
const ledgerPath = path.join(SRC, "documents.json");
let summary = "";
if (fs.existsSync(ledgerPath)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    const arr = Array.isArray(parsed) ? parsed : parsed.documents ?? [];
    const last = arr[arr.length - 1];
    summary = `${arr.length} documents, latest ${last?.number ?? "?"}`;
  } catch {
    summary = "documents.json present but could not be parsed";
  }
}
fs.writeFileSync(
  path.join(out, "README.txt"),
  `Marrakech Eco Tours — client data backup\n` +
    `Taken ${now.toISOString()}\n` +
    `Source ${SRC}\n` +
    `${summary}\n\n` +
    `documents.json is the invoice/contract ledger. It holds the numbering\n` +
    `sequence: restoring an out-of-date copy can reissue a reference that a\n` +
    `client already holds. Restore the NEWEST snapshot, and check the last\n` +
    `number against the Google Sheet before issuing anything new.\n`,
  "utf8",
);

console.log(`\nBacked up to ${out}`);
console.log(`${files.length} files, ${(bytes / 1024).toFixed(1)} KB — ${summary}`);

// Rotation, newest KEEP kept.
const snaps = fs
  .readdirSync(DEST)
  .filter((d) => /^\d{4}-\d{2}-\d{2}T\d{4}$/.test(d))
  .sort();
const drop = snaps.slice(0, Math.max(0, snaps.length - KEEP));
for (const d of drop) fs.rmSync(path.join(DEST, d), { recursive: true, force: true });
if (drop.length) console.log(`Rotated: removed ${drop.length} snapshot(s) older than the newest ${KEEP}`);
