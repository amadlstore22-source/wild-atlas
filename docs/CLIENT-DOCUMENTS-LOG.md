# Client documents — what we have issued, and what went wrong

A running record of every invoice, contract and quoted enquiry, kept so the
recurring problems become visible and can be fixed once instead of patched
each time.

**Why this file exists.** Each document so far has exposed a defect that
typecheck and the build both passed. They were only caught by looking at the
rendered output. Written down, the pattern is obvious; scattered across
conversations, each one looks like a one-off.

Add a row when you issue a document. Add a **Defect** entry when something is
wrong, whether or not it reached the customer.

---

## Documents issued, and enquiries quoted

Deliberately not listed here. Client names, tours, amounts and deposits live in
`data/client-archive.json` and `data/documents.json`, both gitignored — this
file is committed and would publish them.

Use the ledger for the record of who holds which number:

```bash
node -e "const l=require('./data/documents.json');
  for (const d of l.documents) console.log(d.number, d.kind, d.clientName)"
```

## Defects found

Each of these shipped or nearly shipped. None was caught by `tsc` or
`next build`.

**1. Dark theme on a printed document.**
The first invoice inherited the site's dark palette via
`prefers-color-scheme`. Generated from a dark-mode machine it produced a
near-black page, and its print rule forced a white background while leaving the
pale ink — printing gave white text on white paper, an invoice that looks
blank. *Fixed: invoice and contract are light-only. Test:
`invoice.test.ts` → "is light-only".*

**2. CSS typo that silently killed a colour.**
`--warn-fg: #E5B madeleine;` in the hand-written HTML. Invalid CSS is dropped
without error. *Fixed by generating the document instead of hand-editing it.*

**3. Prices stored in USD, displayed in EUR.**
Quoting the stored number with a euro sign overstates by ~9%. `tours.ts` holds
USD; `RATES.EUR = 0.86693`. *Always compute with `perPersonPrice()` and
convert — never read `tour.price` and prepend €.*

**4. The tour line showed the grand total.**
Once extras existed, the tour's own row read "€170.00 pp / €340.00" on a €240
tour, with the extras itemised again below — the document appeared to
double-count on its face. *Fixed: the line uses `t.subtotal`. Test: "shows the
tour's own price on the tour line".*

**5. Extras rendered twice.**
Once as table rows, once in the summary column. *Fixed: itemised in the table,
summarised as "Tour subtotal / Extras".*

**6. A placeholder email on a customer document.**
the second client's enquiry arrived without an address and the invoice was generated with
`a placeholder @example.com address`. A fabricated contact detail looks authoritative
and is wrong. *Fixed: `--email` is optional, the line is omitted when absent,
and `isPlaceholderEmail()` makes the CLI refuse RFC 2606 domains.*

**7. Invoice numbers reallocated after a ledger reset.**
`data/invoices.json` allocates numbers. Deleting it restarts at 001, which is
how two clients ended up with MET-2026-001. *Mitigation: the file is gitignored
and must be backed up. **Open:** the sheet's duplicate guard catches a repeat
within the sheet, but nothing stops the ledger itself being reset.*

**8. Sheet webhook was never connected.**
`SHEET_WEBHOOK_URL` was documented in July but never set in Vercel or
`.env.local`, so no enquiry ever reached the spreadsheet. *Fixed 2026-09-01
locally. **Open:** still needs setting in Vercel + redeploy for the website's
own enquiries.*

**9. Duplicate rule watched the wrong column.**
The Apps Script highlighted duplicates on column F (Departure), so any two
customers wanting the same week were flagged. *Fixed: watches column D
(Email).*

---

## Recurring themes

Worth reading before building the next document type.

**Money must be integer cents.** Every amount, everywhere. Floats produce
€849.99 for an €850 booking, and that is a document a customer disputes.

**A document is not a web page.** Light-only, print-color-adjust, page-break
rules. The viewer's theme is irrelevant — it will be printed and filed.

**Never invent a detail to fill a field.** A placeholder email, a guessed
hotel name, a made-up ICE number. Omit it, or mark it visibly unfinished — the
invoice prints `[payment instructions …]` in italics for exactly this reason.

**Look at the rendered output.** Defects 1, 4, 5 and 6 all passed typecheck,
tests and the build. Every one was found by rendering the document and reading
it.

**The build passing is not evidence.** `next build` exiting 0 does not prove a
page rendered. Check the artefact.

---

## Open items

- [ ] **Bank details** — every invoice and contract prints a placeholder. No
      IBAN/RIB anywhere in the repo.
- [ ] **ICE / RC numbers** — absent. A Moroccan operator invoicing an EU
      customer would normally carry one.
- [ ] **the second client's email address** — not in the forwarded enquiry.
- [ ] **Vercel env vars + redeploy** so website enquiries reach the sheet.
- [ ] **Confirm the quad swap is operationally possible** on a shared
      departure, and that the Imlil transfer is priced correctly at €60.
- [ ] **Back up `data/invoices.json`** somewhere outside the repo.

---

## What a fuller system would need

Notes for later, based on what these documents have actually required.

**One record per booking, not per document.** Invoice, contract and the
confirmation email all restate the same facts — client, dates, price,
accommodation, inclusions. They are currently three separate call sites and can
drift. A single `Booking` object rendering all three would make defect 4
structurally impossible.

**Status, not just existence.** The sheet records that an invoice was issued.
It does not know whether the deposit arrived, so "who has not paid" is manual.

**Quotes should be first-class.** Rama Rao's €1,050 exists only in an email. If
he books in three weeks, nothing records what was promised.

**Language belongs to the booking.** the first client's contract is Spanish because
the sale was; the second client's is English. This is currently decided per document by
hand.

**Extras need a catalogue.** €20 quad, €60 Imlil transfer — both invented at
the point of sale. A short list with standard prices would stop the same add-on
being quoted differently twice.
