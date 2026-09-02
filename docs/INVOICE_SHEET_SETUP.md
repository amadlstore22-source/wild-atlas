# Invoices — creating them and tracking them

Every invoice you issue writes a PDF **and** a row in a Google Sheet, so you
have one place that answers "who owes what, and for which trip".

This builds on the enquiry sheet you already have. If you have not set that up
yet, do [ENQUIRY_SHEET_SETUP.md](ENQUIRY_SHEET_SETUP.md) first — invoices reuse
the same spreadsheet, the same script and the same secret.

---

## Creating an invoice

One command:

```bash
npm run invoice -- \
  --name "Maria Example" \
  --email maria@example.com \
  --tour "3-Day Private Sahara Desert Tour" \
  --people 3 --total 850 --deposit 175
```

That does three things:

1. writes `Invoice_INV-2026-003_Maria_Example.pdf` to your Downloads
2. appends a row to the **Invoices** tab
3. records it in `data/invoices.json`, which is what allocates the next number

Amounts are in **euros** on the command line — `--total 850` — because that is
what you are reading off the customer's email.

### The full set of options

| Flag | Meaning |
|---|---|
| `--name` | customer's full name (required) |
| `--email` | customer's email (required) |
| `--tour` | tour title (required) |
| `--people` | number of travellers (required) |
| `--total` | what they actually pay, in euros (required) |
| `--deposit` | deposit in euros, default 0 |
| `--standard` | undiscounted price **per person** — shows the discount |
| `--departure` `--return` | `2026-09-20` |
| `--route` | `"Marrakech → Merzouga"` |
| `--language` | `Spanish` |
| `--desc` | one line under the tour name |
| `--includes` `--excludes` | pipe-separated: `"a\|b\|c"` |
| `--payment` | bank/PayPal line — see the warning below |
| `--ice` `--rc` | your Moroccan company numbers |
| `--notes` | anything else |
| `--number` | override the automatic invoice number |
| `--out` | where to write the PDF |
| `--no-sheet` | make the PDF without touching the sheet |
| `--no-pdf` | record in the sheet only |

### Showing a discount

Pass `--standard` with the **per-person** list price:

```bash
--people 3 --standard 320 --total 850
```

renders "Standard rate (3 × €320.00) €960.00", "Discount applied −€110.00",
"Total €850.00". If `--standard` is missing, no discount block appears.

> The discount only shows when the customer genuinely saves. A `--standard`
> below the charged price is ignored rather than rendered as a negative
> discount, which would present a surcharge as a saving.

---

## Two things every invoice still needs from you

**1. Payment instructions.** Without `--payment` the invoice prints
`[payment instructions — bank transfer details or PayPal link]` in italics, on
purpose — so an unfinished invoice looks unfinished rather than looking done.
Pass your real details:

```bash
--payment "Bank transfer: Attijariwafa, IBAN MA00 0000 0000 0000, SWIFT BCMAMAMC"
```

**2. ICE / RC numbers.** A Moroccan invoice to an EU customer normally carries
them. There is no ICE anywhere in this codebase, so pass `--ice` and `--rc`
yourself. To stop retyping them, put them in `.env.local`:

```
INVOICE_ICE=002345678000012
INVOICE_RC=123456
```

*(Not yet read automatically — pass the flags for now.)*

---

## Adding the Invoices tab

### 1. Create the tab

Nothing to do by hand — step 2 builds it for you.

### 2. Replace the script

**Extensions → Apps Script**, select everything in the editor and paste in the
contents of [`apps-script.gs`](apps-script.gs) from this folder.

Then put your existing secret on the `SECRET = ` line. **Use the same one you
already have** — a new secret means enquiries stop arriving until you update it
in Vercel too.

That file also fixes a bug in the original: the duplicate-highlight rule watched
column F (Departure), so any two customers wanting the same travel week were
highlighted as duplicates. It now watches column D (Email), which is what a real
duplicate looks like.

You do not need to create the Invoices tab by hand — run `setup` once from the
editor's dropdown and it builds both tabs, the headers, the number formats and
the conditional formatting. It is safe to re-run; it never deletes rows.

### 3. Republish

**Deploy → Manage deployments → (pencil) → Version: New version → Deploy.**

Saving the script is not enough. This is the single most common reason a change
appears to do nothing.

### 4. Point the script at your machine

The invoice command runs locally, so it needs the same two variables in
`.env.local` (not just in Vercel):

```
SHEET_WEBHOOK_URL=https://script.google.com/macros/s/..../exec
SHEET_WEBHOOK_SECRET=your-exact-secret
```

Test without creating anything real:

```bash
npm run invoice -- --name "Test" --email test@example.com \
  --tour "Test tour" --people 1 --total 1 --no-pdf
```

Then delete that row from the sheet and the entry from `data/invoices.json`.

---

## How the numbering works

Invoice numbers are allocated from `data/invoices.json` — `MET-2026-001`,
`MET-2026-002`, and so on, restarting each year. You never type one.

**That file is the ledger. Keep it.** If it is lost the numbering restarts and
two invoices can end up sharing a number. It is written even when the sheet
write fails, precisely so a network problem cannot corrupt the sequence.

To issue a specific number — replacing a cancelled invoice, say — pass
`--number MET-2026-007`. The command refuses if that number is already used.

---

## If the sheet write fails

Unlike enquiries, **the invoice command tells you** when the row does not land:

```
Sheet   NOT RECORDED — unconfigured: SHEET_WEBHOOK_URL / SHEET_WEBHOOK_SECRET are not set.
```

That difference is deliberate. An enquiry is already delivered by email and a
customer is waiting on the response, so the enquiry logger swallows everything.
An invoice has nobody waiting, and an unrecorded invoice is exactly the gap this
system exists to close.

The PDF is still written, and the ledger still records it. Re-run with
`--number` and `--no-pdf` once the connection is fixed:

```bash
npm run invoice -- --number MET-2026-002 --no-pdf \
  --name "..." --email ... --tour "..." --people 3 --total 850
```

The script's duplicate check means a re-run cannot double up the row.

---

## Making the sheet useful

**Total outstanding.** In an empty cell:

```
=SUMIF(K:K,"<>Paid",J:J)
```

That sums the Balance column for every invoice not yet marked Paid.

**This year's revenue.**

```
=SUMIFS(H:H,A:A,">="&DATE(2026,1,1),A:A,"<="&DATE(2026,12,31))
```

**Who still owes a deposit.** Select all → **Data → Create a filter**, then
filter Status to `Deposit due`.

**Colour the unpaid rows.** Format → Conditional formatting, apply to `A:L`,
custom formula `=$K1<>"Paid"`.
