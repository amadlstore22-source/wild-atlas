import { describe, it, expect } from "vitest";
import { formatPrice, DEFAULT_CURRENCY, RATES, CURRENCY_SYMBOL } from "@/lib/currency";
import { TOURS } from "@/lib/tours";

/** Mirror of schemaPrice() in app/[lang]/tours/[slug]/page.tsx. */
const schemaPrice = (usd: number) => String(Math.round(usd * RATES[DEFAULT_CURRENCY]));

describe("structured-data price matches the visible price", () => {
  // Google compares the price in structured data against the price on the page.
  // Tour prices are stored in USD while the site displays EUR by default, so a
  // schema that quoted the raw stored number said "$380" on a page showing
  // "€350" — a real mismatch flagged as a rich-results issue.
  it("schema price equals the rendered price for every tour", () => {
    TOURS.forEach((t) => {
      const rendered = formatPrice(t.price, DEFAULT_CURRENCY);
      const fromSchema = `${CURRENCY_SYMBOL[DEFAULT_CURRENCY]}${Number(schemaPrice(t.price)).toLocaleString("en-US")}`;
      expect(fromSchema, `${t.slug}: schema and page disagree`).toBe(rendered);
    });
  });

  it("deposit amounts agree too (they appear in FAQ schema)", () => {
    TOURS.forEach((t) => {
      const rendered = formatPrice(t.depositAmount, DEFAULT_CURRENCY);
      const fromSchema = `${CURRENCY_SYMBOL[DEFAULT_CURRENCY]}${Number(schemaPrice(t.depositAmount)).toLocaleString("en-US")}`;
      expect(fromSchema, `${t.slug}: deposit mismatch`).toBe(rendered);
    });
  });

  it("formatPrice converts from USD, not to it", () => {
    // Guards the conversion direction: 380 USD -> 350 EUR, never 413.
    expect(formatPrice(380, "EUR")).toBe("€350");
    expect(formatPrice(380, "USD")).toBe("$380");
  });
});

describe("tour seoDescription price prose", () => {
  // Mirror of localisePrice() in app/[lang]/tours/[slug]/page.tsx.
  const localisePrice = (text: string | undefined, usd: number) => {
    if (!text) return text;
    const shown = `${CURRENCY_SYMBOL[DEFAULT_CURRENCY]}${Math.round(usd * RATES[DEFAULT_CURRENCY]).toLocaleString("en-US")}`;
    return text.replace(/\$[\d,]+/g, shown);
  };

  it("every tour's stored prose price matches its price field", () => {
    // The prose is hand-written; if it drifts from the price field, localising
    // it would quietly publish a wrong number rather than a wrong currency.
    TOURS.forEach((t) => {
      const m = t.seoDescription?.match(/\$(\d[\d,]*)/);
      if (!m) return;
      expect(Number(m[1].replace(/,/g, "")), `${t.slug}: prose price != price field`).toBe(t.price);
    });
  });

  it("localised description advertises the same price the page charges", () => {
    TOURS.forEach((t) => {
      const out = localisePrice(t.seoDescription, t.price);
      if (!out) return;
      expect(out, `${t.slug}: still quotes USD`).not.toMatch(/\$\d/);
      expect(out).toContain(formatPrice(t.price, DEFAULT_CURRENCY));
    });
  });
});
