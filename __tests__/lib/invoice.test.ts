import { describe, expect, it } from "vitest";
import {
  computeTotals,
  eur,
  isPlaceholderEmail,
  renderInvoiceHtml,
  type InvoiceInput,
} from "@/lib/invoice";

/**
 * INVOICES ARE THE ONE DOCUMENT A CUSTOMER CHECKS ARITHMETIC ON.
 *
 * The first invoice (MET-2026-001) was hand-written HTML, and two defects came
 * straight out of that: a CSS typo (`--warn-fg: #E5B madeleine;`) that silently
 * killed a colour, and a dark palette inherited from the sender's OS. The dark
 * one was the dangerous half — the print rule forced a white background but
 * left the pale ink tokens, so printing from a dark-mode machine produced
 * near-white text on white paper: an invoice that looks blank.
 *
 * Neither typecheck nor a build can catch any of that. These tests encode the
 * rules the document must never break.
 */

const BASE: InvoiceInput = {
  number: "MET-2026-002",
  issued: "2026-09-01",
  clientName: "Test Client",
  clientEmail: "test@example.com",
  tourTitle: "3-Day Private Sahara Desert Tour",
  people: 3,
  total: 85000,
  deposit: 17500,
};

describe("invoice money", () => {
  it("never loses a cent to floating point", () => {
    // 0.1 + 0.2 !== 0.3. Every amount is integer cents precisely so that an
    // invoice cannot render €849.99 for an €850.00 booking.
    const t = computeTotals({ ...BASE, total: 85000, deposit: 17500 });
    expect(t.balance).toBe(67500);
    expect(eur(t.total)).toBe("€850.00");
    expect(eur(t.deposit)).toBe("€175.00");
    expect(eur(t.balance)).toBe("€675.00");
  });

  it("always has deposit + balance equal the total", () => {
    // The single invariant a customer will check with a calculator.
    for (const [total, deposit] of [
      [85000, 17500],
      [120000, 0],
      [33333, 11111],
      [100, 100],
    ] as const) {
      const t = computeTotals({ ...BASE, total, deposit });
      expect(
        t.deposit + t.balance,
        `deposit ${t.deposit} + balance ${t.balance} !== total ${total}`,
      ).toBe(total);
    }
  });

  it("refuses a deposit larger than the total", () => {
    // Would render a negative balance, i.e. the company owing the customer.
    expect(() => computeTotals({ ...BASE, total: 10000, deposit: 20000 })).toThrow(
      /cannot exceed/,
    );
  });

  it("refuses non-integer money, which is how float bugs get in", () => {
    expect(() => computeTotals({ ...BASE, total: 850.5 })).toThrow(/integer/);
    expect(() => computeTotals({ ...BASE, deposit: 17.5 })).toThrow(/integer/);
  });

  it("refuses a group size that would divide by zero", () => {
    expect(() => computeTotals({ ...BASE, people: 0 })).toThrow(/positive integer/);
  });

  it("only calls it a discount when the customer actually saves", () => {
    // A "standard" price BELOW the charged price would otherwise render as a
    // negative discount — a surcharge presented to the customer as a saving.
    const cheaper = computeTotals({ ...BASE, standardPerPerson: 20000, total: 85000 });
    expect(cheaper.discount).toBeNull();

    const real = computeTotals({ ...BASE, standardPerPerson: 32000, total: 85000 });
    expect(real.discount).toBe(11000); // 3 × 320 − 850 = 110
  });

  it("formats cents as euro with two decimals", () => {
    expect(eur(0)).toBe("€0.00");
    expect(eur(5)).toBe("€0.05");
    expect(eur(100)).toBe("€1.00");
    expect(eur(123456)).toBe("€1,234.56");
  });
});

describe("invoice document", () => {
  const html = renderInvoiceHtml({
    ...BASE,
    standardPerPerson: 32000,
    includes: ["Private 4×4 transport"],
    excludes: ["Travel insurance"],
  });

  it("is light-only, so it prints as ink on paper", () => {
    // THE BUG THIS EXISTS FOR: the original carried the site's dark palette
    // behind prefers-color-scheme. Generated from a dark-mode machine it
    // produced a near-black page, and printing gave white text on white paper.
    expect(html).not.toContain("prefers-color-scheme");
    expect(html).not.toMatch(/\[data-theme="dark"\]/);
  });

  it("keeps background fills when printed", () => {
    // Chrome drops every background fill on print by default, which erases the
    // emphasis the totals block is laid out around.
    expect(html).toContain("print-color-adjust: exact");
  });

  it("escapes the client name, which carries accents and apostrophes", () => {
    const evil = renderInvoiceHtml({
      ...BASE,
      clientName: 'O"Brien <script>alert(1)</script> & Sons',
    });
    expect(evil).not.toContain("<script>alert(1)</script>");
    expect(evil).toContain("&lt;script&gt;");
    expect(evil).toContain("&amp;");
  });

  it("shows the amounts the totals say", () => {
    expect(html).toContain("€850.00");
    expect(html).toContain("€175.00");
    expect(html).toContain("€675.00");
  });

  it("flags missing payment instructions rather than printing a blank box", () => {
    // SITE.paypal is deliberately empty (the old handle was an unclaimed
    // namespace that could have received customer deposits), so an invoice
    // with no payment line must say so visibly, not look finished.
    expect(html).toContain("[payment instructions");

    const withPay = renderInvoiceHtml({ ...BASE, paymentInstructions: "IBAN MA00 0000" });
    expect(withPay).not.toContain("[payment instructions");
    expect(withPay).toContain("IBAN MA00 0000");
  });

  it("pluralises travellers", () => {
    expect(renderInvoiceHtml({ ...BASE, people: 1 })).toContain("1 traveller<");
    expect(renderInvoiceHtml({ ...BASE, people: 3 })).toContain("3 travellers");
  });
});

describe("extra line items", () => {
  /**
   * Katrin Vogelsang's booking was the first with add-ons: a quad-bike upgrade
   * at EUR 20 per person and a one-off private transfer to Imlil at EUR 60 for
   * the group. Two ways to get this wrong, neither caught by a typecheck:
   *
   *  - multiplying the flat transfer by the headcount (EUR 120, not 60), or
   *  - forgetting to multiply the per-person one (EUR 20, not 40).
   *
   * Both produce a plausible-looking invoice that is simply wrong, and the
   * customer is the one who finds out.
   */
  const WITH_EXTRAS = {
    ...BASE,
    people: 2,
    total: 24000,
    deposit: 0,
    extras: [
      { label: "Quad biking", amount: 2000, perPerson: true },
      { label: "Private transfer to Imlil", amount: 6000 },
    ],
  };

  it("multiplies per-person extras and leaves flat ones alone", () => {
    const t = computeTotals(WITH_EXTRAS);
    expect(t.extras[0].amount, "quad: 2 x 20 = 40").toBe(4000);
    expect(t.extras[1].amount, "transfer is flat, not per head").toBe(6000);
    expect(t.extrasTotal).toBe(10000);
  });

  it("adds extras to the total", () => {
    const t = computeTotals(WITH_EXTRAS);
    expect(t.subtotal, "the tour alone").toBe(24000);
    expect(t.total, "240 + 40 + 60 = 340").toBe(34000);
    expect(t.balance).toBe(34000);
  });

  it("shows the unit price on a per-person row", () => {
    // "Quad biking (2 x EUR20.00)" — without the unit the customer cannot see
    // whether the EUR 40 is one quad or two.
    const t = computeTotals(WITH_EXTRAS);
    expect(t.extras[0].label).toContain("2 ×");
    expect(t.extras[0].label).toContain("€20.00");
  });

  it("still balances: deposit + balance === total, with extras", () => {
    const t = computeTotals({ ...WITH_EXTRAS, deposit: 8000 });
    expect(t.deposit + t.balance).toBe(t.total);
    expect(t.total).toBe(34000);
  });

  it("lets a deposit exceed the base tour price when extras justify it", () => {
    // The deposit check must run AFTER extras are added. Checking it against
    // the bare tour price would reject a legitimate deposit.
    expect(() =>
      computeTotals({ ...WITH_EXTRAS, total: 5000, deposit: 10000 }),
    ).not.toThrow();
  });

  it("still refuses a deposit above the real grand total", () => {
    expect(() => computeTotals({ ...WITH_EXTRAS, deposit: 40000 })).toThrow(/cannot exceed/);
  });

  it("refuses a non-integer extra", () => {
    expect(() =>
      computeTotals({ ...BASE, extras: [{ label: "x", amount: 20.5 }] }),
    ).toThrow(/non-negative integer/);
  });

  it("renders each extra as its own visible row", () => {
    // Folding extras into the tour total shows one unexplained number.
    const html = renderInvoiceHtml(WITH_EXTRAS);
    expect(html).toContain("Quad biking");
    expect(html).toContain("Private transfer to Imlil");
    expect(html).toContain("€340.00");
  });

  it("changes nothing when there are no extras", () => {
    const t = computeTotals(BASE);
    expect(t.extras).toEqual([]);
    expect(t.extrasTotal).toBe(0);
    expect(t.total).toBe(BASE.total);
  });

  it("shows the tour's own price on the tour line, not the grand total", () => {
    // FOUND BY LOOKING AT THE RENDERED INVOICE. t.total now includes extras, so
    // the tour's line item read "EUR170.00 pp / EUR340.00" on a EUR240 tour and
    // the extras were then itemised again below it. The document appeared to
    // double-count on its face, even though the total was right.
    const html = renderInvoiceHtml(WITH_EXTRAS);
    const tourRow = html.slice(
      html.indexOf(WITH_EXTRAS.tourTitle),
      html.indexOf("Quad biking"),
    );
    expect(tourRow, "tour row must show the tour subtotal").toContain("240.00");
    expect(tourRow, "tour row must NOT show the grand total").not.toContain("340.00");
  });

  it("itemises each extra exactly once", () => {
    // They used to appear as a table row AND a summary row.
    const html = renderInvoiceHtml(WITH_EXTRAS);
    const count = (needle: string) => html.split(needle).length - 1;
    expect(count("Private transfer to Imlil")).toBe(1);
  });
});

describe("client email", () => {
  /**
   * THE INCIDENT: Katrin Vogelsang's enquiry was forwarded without her email
   * address, and the invoice was generated with "katrin.vogelsang@example.com".
   * A fabricated contact detail on a customer document is worse than a missing
   * one — it looks authoritative and it is wrong.
   *
   * Nothing catches it: the string is valid, the PDF renders, and it reads as
   * a real address unless someone looks at the domain.
   */
  it("omits the line entirely when no email is known", () => {
    const html = renderInvoiceHtml({ ...BASE, clientEmail: undefined });
    // Scope to the "Billed to" block: the page legitimately contains @media
    // rules and the operator's OWN address in the "From" column.
    const billed = html.slice(html.indexOf("Billed to"), html.indexOf("Trip"));
    expect(billed).toContain("Test Client");
    expect(billed).not.toContain("undefined");
    expect(billed, "no email line should render at all").not.toContain("@");
  });

  it("renders a real address when one is given", () => {
    const html = renderInvoiceHtml({ ...BASE, clientEmail: "real@client.com" });
    expect(html).toContain("real@client.com");
  });

  it("exposes a check the caller can use to reject placeholder addresses", () => {
    // The renderer cannot know a real address from a fake one, so this asserts
    // the SHAPE of the problem instead: a placeholder domain renders exactly
    // like a real one, which is why it slipped through. The guard belongs in
    // the CLI, and isPlaceholderEmail() is where it lives.
    expect(isPlaceholderEmail("katrin.vogelsang@example.com")).toBe(true);
    expect(isPlaceholderEmail("a@test.com")).toBe(true);
    expect(isPlaceholderEmail("x@localhost")).toBe(true);
    expect(isPlaceholderEmail("real.person@gmail.com")).toBe(false);
    // An unusual but genuine TLD must not be mistaken for a placeholder.
    expect(isPlaceholderEmail("traveller@yahoo.co.in")).toBe(false);
    expect(isPlaceholderEmail(undefined)).toBe(false);
  });
});
