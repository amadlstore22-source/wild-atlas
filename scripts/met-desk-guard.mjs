/**
 * Stops the invoice and contract commands once MET Desk issues the documents.
 *
 * From 2026-11-02 the numbered documents are issued in MET Desk (the owner's
 * local back office, C:\Users\cash\met-desk). It imported this command's ledger
 * and continues the same INV / CON series. If this command kept running, both
 * would count independently and two invoices could carry the same number,
 * which is the one error a customer notices and a tax inspector asks about.
 *
 * So the command refuses as soon as MET Desk's database holds a document.
 * Until the owner imports the old ledger there, nothing changes here.
 * MET_DESK_DATA points elsewhere, as it does for MET Desk itself.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export async function assertMetDeskNotIssuing(what) {
  const dir = process.env.MET_DESK_DATA || path.join(os.homedir(), "MET-Desk-Data");
  const file = path.join(dir, "met-desk.db");
  if (!fs.existsSync(file)) return;
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(file, { readOnly: true });
  let latest;
  try {
    latest = db.prepare("SELECT number FROM documents ORDER BY id DESC LIMIT 1").get();
  } catch {
    latest = undefined; // a database without documents yet
  } finally {
    db.close();
  }
  if (!latest) return;
  console.error(
    `\nRefused: ${what} are issued in MET Desk now (it holds ${latest.number}).\n` +
      `This command keeps its own count, so using it would give two documents the same number.\n` +
      `Open MET Desk (desktop icon), find or create the booking, and issue it there.\n`,
  );
  process.exit(1);
}
