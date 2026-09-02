/**
 * One-off: move data/invoices.json to the two-series data/documents.json.
 *
 * The old file held only invoices, numbered MET-YYYY-NNN. Contracts were
 * numbered by hand in the generator script and recorded nowhere, so the client's
 * contract carries MET-2026-001 purely because that string was typed into the
 * file — not because anything allocated it.
 *
 * This rewrites the invoices into the INV series, preserving their sequence
 * (MET-2026-001 -> INV-2026-001), and adds the contracts that were already
 * issued so their numbers can never be handed out again.
 *
 * Safe to re-run: it refuses if documents.json already exists.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readLedger, writeLedger, ledgerPath } from "../lib/doc-ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OLD = path.join(ROOT, "data", "invoices.json");

if (fs.existsSync(ledgerPath(ROOT))) {
  console.error(
    "data/documents.json already exists — migration has already run.\n" +
      "Delete it only if you are certain, and remember it holds the numbering.",
  );
  process.exit(1);
}

const documents = [];

if (fs.existsSync(OLD)) {
  const old = JSON.parse(fs.readFileSync(OLD, "utf8"));
  for (const inv of old.invoices ?? []) {
    documents.push({
      kind: "invoice",
      // MET-2026-001 -> INV-2026-001. The sequence position is preserved so
      // the customer's copy still matches what the ledger says.
      number: String(inv.number).replace(/^MET-/, "INV-"),
      previousNumber: inv.number,
      issued: inv.issued,
      clientName: inv.clientName,
      clientEmail: inv.clientEmail || "",
      tour: inv.tour,
      people: inv.people,
      totalCents: inv.totalCents,
      depositCents: inv.depositCents,
      balanceCents: inv.balanceCents,
      pdfPath: inv.pdfPath ?? null,
      sheet: !!inv.sheet,
    });
  }
}

/**
 * The contracts already generated. Not in any ledger — the reference was a
 * string literal in scripts/make-contract-alejandro.mjs — so they are recorded
 * here explicitly, or the next contract would reuse the number.
 */
documents.push({
  kind: "contract",
  number: "CON-2026-001",
  previousNumber: "MET-2026-001",
  issued: "2026-09-01",
  clientName: "Andrés Gutiérrez Peña",
  // Address deliberately omitted: this file is committed, and the ledger
  // it writes (data/documents.json) is gitignored for that reason. The
  // real address lives there and in data/client-archive.json.
  clientEmail: "",
  tour: "Marrakech a Merzouga — 3 días por el desierto (privado)",
  people: 3,
  totalCents: 85000,
  depositCents: 17500,
  balanceCents: 67500,
  languages: ["es", "en"],
  pdfPath: "C:\\Users\\cash\\Downloads\\Contrato_MET-2026-001_Andres_Gutierrez_Pena.pdf",
  note: "Issued as MET-2026-001 before the CON series existed. The PDFs the client holds carry the old reference.",
});

writeLedger(ROOT, { documents });

console.log(`Wrote ${documents.length} documents to data/documents.json`);
for (const d of documents) {
  console.log(`  ${d.kind.padEnd(9)} ${d.number}  ${d.clientName}`);
}
console.log(
  "\ndata/invoices.json is left in place. Delete it once you are satisfied.",
);
