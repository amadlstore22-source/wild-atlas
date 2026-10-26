/**
 * The logistics brief: what the team running a booking must know, taken from
 * the invoice the client was sent.
 *
 * THE INCIDENT (INV-2026-033, 26 Oct 2026): her invoice
 * promised dinner at Trigados Camp with a reserved family table, live music
 * and a fire show. Those promises lived only in the invoice PDF's "Included"
 * list. The Invoices sheet the logistics team reads had no column for them,
 * and the Apps Script dropped even the notes we sent. The driver took the
 * family to a different camp, they reached Trigados after it was full, ate a
 * cold dinner and missed both shows. A family of six, four children, €450,
 * and a 50% refund request.
 *
 * So every invoice now names its suppliers (scripts/make-invoice.mjs refuses
 * without --suppliers), and the same facts reach the team three ways: this
 * brief saved next to the PDF (ready to forward on WhatsApp), the sheet's
 * Pickup / Suppliers booked / Trip details columns, and the local ledger.
 */
export interface BriefInput {
  number: string;
  clientName: string;
  clientPhone?: string;
  tourTitle: string;
  departure?: string;
  ret?: string;
  people: number;
  language?: string;
  pickup?: string;
  /** Named suppliers, one per entry, or ["standard"] for the tour's usual partners. */
  suppliers: string[];
  includes?: string[];
  description?: string;
  notes?: string;
}

/** "standard" means the tour's usual partners; anything else must be named. */
export function isStandardSuppliers(suppliers: string[]): boolean {
  return suppliers.length === 1 && suppliers[0].trim().toLowerCase() === "standard";
}

/** Parse the --suppliers flag: pipe-separated, blanks dropped. */
export function parseSuppliers(raw: unknown): string[] {
  return String(raw ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

const day = (iso?: string) =>
  iso
    ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
        weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
      })
    : "to confirm";

export function buildBrief(b: BriefInput): string {
  const lines: string[] = [];
  lines.push(`BOOKING ${b.number}: ${b.clientName} (${b.people} ${b.people === 1 ? "traveller" : "travellers"})`);
  lines.push(`Tour: ${b.tourTitle}`);
  lines.push(`Dates: ${day(b.departure)}${b.ret && b.ret !== b.departure ? ` to ${day(b.ret)}` : ""}`);
  lines.push(`Pick-up: ${b.pickup?.trim() || "TO CONFIRM WITH CLIENT"}`);
  if (b.clientPhone) lines.push(`Client phone: ${b.clientPhone}`);
  if (b.language) lines.push(`Guide language: ${b.language}`);
  lines.push("");
  lines.push("SUPPLIERS BOOKED (confirm each one before the day):");
  if (isStandardSuppliers(b.suppliers)) lines.push("- Standard partners for this tour");
  else for (const s of b.suppliers) lines.push(`- ${s}`);
  if (b.includes?.length) {
    lines.push("");
    lines.push("PROMISED TO THE CLIENT (on their invoice):");
    for (const s of b.includes) lines.push(`- ${s}`);
  }
  if (b.description?.trim()) {
    lines.push("");
    lines.push(`Details: ${b.description.trim()}`);
  }
  if (b.notes?.trim()) {
    lines.push("");
    lines.push(`Notes: ${b.notes.trim()}`);
  }
  return lines.join("\n") + "\n";
}

/** One-line forms for the sheet's columns. */
export function sheetColumns(b: BriefInput) {
  return {
    pickup: b.pickup?.trim() || "",
    suppliers: isStandardSuppliers(b.suppliers) ? "Standard partners" : b.suppliers.join(" · "),
    details: [b.description?.trim(), b.includes?.length ? `Included: ${b.includes.join("; ")}` : "", b.notes?.trim()]
      .filter(Boolean)
      .join(" | "),
  };
}
