import { describe, expect, it } from "vitest";
import { billToFor, bookingsDecision, record } from "@/lib/doc-ledger.mjs";
import { renderInvoiceHtml, type InvoiceInput } from "@/lib/invoice";

/**
 * TWO THINGS WENT WRONG, OR NEARLY DID, ON ONE REISSUE (INV-2026-040).
 *
 * 1. THE INVOICE COULD NOT BE BILLED TO A COMPANY. On 30 Oct 2026 a group's
 *    organiser asked for the invoice in the name of the firm paying for it,
 *    with its registered address and registration number. "Billed to" printed only a person's
 *    name, and --reissue refuses a different name, so the choices were a second
 *    invoice number for one booking (the error a customer notices) or the
 *    company buried in the notes. `billTo` bills the entity and keeps the
 *    person as the contact, under the same number. A later reissue that forgets
 *    --bill-to keeps the company rather than quietly reverting to a personal
 *    invoice.
 *
 * 2. A REISSUE WOULD HAVE PUT THE BOOKING IN bookings26 TWICE. bookings26 finds
 *    a re-sent invoice by the number in its INVOICE column; if no row has it, it
 *    adds a new row. INV-2026-040 was issued before bookings26 was automated, so
 *    the team typed the booking in by hand with INVOICE empty. Re-sending it
 *    would have created a second "Mon 9 Nov, 19 guests" row beside theirs. A
 *    reissue now reaches bookings26 only when the ledger records that this
 *    script placed the booking, or the owner forces it with --bookings.
 *
 * Neither is visible to typecheck or a build: the first is a missing field, the
 * second only shows up as a duplicate row in a sheet the team plans from.
 */

/** Made up. Real client details belong in the gitignored ledger, never here. */
const LAW_FIRM = [
  "Example & Partners Law Office",
  "1 Example Street, Sofia, Bulgaria",
  "UIC 000000000",
  "Represented by A. Example, managing partner",
];

describe("billing a company", () => {
  it("reads --bill-to as the entity's name followed by its lines", () => {
    expect(billToFor(undefined, LAW_FIRM.join(" | "))).toEqual(LAW_FIRM);
  });

  it("keeps the billed company on a reissue that does not repeat --bill-to", () => {
    // The "balance paid" reissue is where this would otherwise be lost.
    expect(billToFor({ billTo: LAW_FIRM }, undefined)).toEqual(LAW_FIRM);
  });

  it("drops the company only when told to", () => {
    expect(billToFor({ billTo: LAW_FIRM }, "none")).toBeUndefined();
    expect(billToFor(undefined, undefined)).toBeUndefined();
  });

  it("refuses an empty or valueless --bill-to rather than billing nobody", () => {
    expect(() => billToFor(undefined, true)).toThrow(/needs a value/);
    expect(() => billToFor(undefined, " | ")).toThrow(/empty/);
  });

  const BASE: InvoiceInput = {
    number: "INV-2026-900",
    issued: "2026-10-18",
    clientName: "Test Contact",
    clientEmail: "contact@example.com",
    tourTitle: "Private Day Trip",
    people: 19,
    total: 203300,
    deposit: 40660,
  };

  it("prints the company under Billed to and the person as the contact", () => {
    const html = renderInvoiceHtml({ ...BASE, billTo: LAW_FIRM });
    const billed = html.slice(html.indexOf("Billed to"), html.indexOf("</div>\n  </div>", html.indexOf("Billed to")));
    expect(billed).toContain("<strong>Example &amp; Partners Law Office</strong>");
    for (const line of LAW_FIRM.slice(1)) expect(billed).toContain(line);
    expect(billed).toContain("Contact: Test Contact");
    expect(billed).toContain("contact@example.com");
  });

  it("is unchanged for an ordinary personal invoice", () => {
    const html = renderInvoiceHtml(BASE);
    expect(html).toContain("<strong>Test Contact</strong>");
    expect(html).not.toContain("Contact: ");
  });
});

describe("a reissue and bookings26", () => {
  it("always sends a NEW invoice", () => {
    expect(bookingsDecision({ reissue: false, held: undefined, force: false }).send).toBe(true);
  });

  it("does not send a reissue the script never placed: the team's row has no number", () => {
    const d = bookingsDecision({ reissue: true, held: { number: "INV-2026-040" }, force: false });
    expect(d.send).toBe(false);
    expect(d.why).toMatch(/second row/);
  });

  it("sends a reissue the script placed, so its own row is updated", () => {
    expect(bookingsDecision({ reissue: true, held: { bookingsPlaced: true }, force: false }).send).toBe(true);
  });

  it("sends when the owner forces it after putting the number in the row", () => {
    expect(bookingsDecision({ reissue: true, held: {}, force: true }).send).toBe(true);
  });

  it("keeps the 'placed' record through a reissue that skipped the sheet", () => {
    // make-invoice only ever ADDS bookingsPlaced; record() must not lose it.
    const ledger = {
      documents: [
        { kind: "invoice", number: "INV-2026-901", clientName: "Test Contact", bookingsPlaced: true, recordedAt: "2026-10-28T00:00:00Z" },
      ],
    };
    record(ledger, { kind: "invoice", number: "INV-2026-901", clientName: "Test Contact", status: "Deposit paid" }, { replace: true });
    expect(ledger.documents[0]).toMatchObject({ bookingsPlaced: true, status: "Deposit paid", reissues: 1 });
  });
});
