import { describe, it, expect } from "vitest";
import { formatPrice, DEFAULT_CURRENCY, RATES, CURRENCY_SYMBOL } from "@/lib/currency";
import { TOURS, lowestGroupPrice, groupPriceTiers } from "@/lib/tours";

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
    // Guards the conversion direction: 380 USD -> 329 EUR, never 438.
    // (329 = 380 * 0.86693, the ECB rate verified 2026-08-07.)
    expect(formatPrice(380, "EUR")).toBe("€329");
    expect(formatPrice(380, "USD")).toBe("$380");
  });
});

describe("tour seoDescription price prose", () => {
  // Mirror of localisePrice() in app/[lang]/tours/[slug]/page.tsx. It converts
  // EACH figure it finds; it used to substitute the solo rate into every "$N"
  // in the string, which silently rewrote "From $30 pp for 6+" into the solo
  // "€86 pp for 6+" once descriptions started leading with the group tier.
  const localisePrice = (text: string | undefined, _usd: number) => {
    if (!text) return text;
    return text.replace(/\$([\d,]+)/g, (m, digits: string) => {
      const value = Number(digits.replace(/,/g, ""));
      if (!Number.isFinite(value)) return m;
      return `${CURRENCY_SYMBOL[DEFAULT_CURRENCY]}${Math.round(value * RATES[DEFAULT_CURRENCY]).toLocaleString("en-US")}`;
    });
  };

  it("every tour's stored prose price matches a real price tier", () => {
    // The prose is hand-written; if it drifts from the ladder, localising it
    // would quietly publish a wrong number rather than a wrong currency.
    // Originally this demanded t.price exactly. That blocked the cheapest-tier
    // phrasing ("From $30 pp for 6+"), which is the more clickable and equally
    // true figure, so the rule is now "matches SOME tier" -- a number matching
    // no tier at all is still caught.
    TOURS.forEach((t) => {
      const m = t.seoDescription?.match(/\$(\d[\d,]*)/);
      if (!m) return;
      const quoted = Number(m[1].replace(/,/g, ""));
      const tiers = groupPriceTiers(t).map((x) => x.price);
      expect(
        [t.price, ...tiers].includes(quoted),
        `${t.slug}: prose quotes $${quoted}, which is neither the solo rate ` +
          `($${t.price}) nor any group tier ($${tiers.join(", $")}).`,
      ).toBe(true);
    });
  });

  it("localised description advertises the same price the page charges", () => {
    TOURS.forEach((t) => {
      const out = localisePrice(t.seoDescription, t.price);
      if (!out) return;
      expect(out, `${t.slug}: still quotes USD`).not.toMatch(/\$\d/);
      // A description may quote EITHER the solo rate (t.price) or the cheapest
      // group tier, but a group rate MUST carry its qualifier -- see the
      // "for N+" test below. Originally this demanded t.price unconditionally,
      // which blocked the more clickable "From EUR260 pp for 6+" phrasing.
      const solo = formatPrice(t.price, DEFAULT_CURRENCY);
      const group = formatPrice(lowestGroupPrice(t).price, DEFAULT_CURRENCY);
      expect(
        out.includes(solo) || out.includes(group),
        `${t.slug}: quotes a price that is neither the solo rate (${solo}) ` +
          `nor the cheapest group tier (${group}). A number in the meta that ` +
          `matches no tier will contradict the page and the AggregateOffer.`,
      ).toBe(true);
    });
  });

  /**
   * A meta description that leads with the cheapest tier is far more clickable
   * than one leading with the solo rate -- on the 4-day Toubkal that is EUR260
   * against EUR650. But the cheap number is only true at six people. Printing
   * it bare promises EUR260 to a solo visitor who is then quoted EUR650, and
   * contradicts AggregateOffer.lowPrice, whose eligibleQuantity says the price
   * needs a group. The qualifier is the whole reason the low number is honest,
   * so it is asserted rather than left to whoever edits the string next.
   */
  it("a group-tier price in the meta always carries its group-size qualifier", () => {
    const unqualified = TOURS.filter((t) => {
      const out = localisePrice(t.seoDescription, t.price);
      if (!out) return false;
      const cheapest = lowestGroupPrice(t);
      if (cheapest.minPeople <= 1) return false; // no qualifier needed
      const group = formatPrice(cheapest.price, DEFAULT_CURRENCY);
      if (!out.includes(group)) return false;    // not quoting the group rate
      // Accept "for 6+", "for 6 or more", "6+ people", "pp for 6+".
      return !new RegExp(`${cheapest.minPeople}\\s*\\+|for\\s+${cheapest.minPeople}\\b`).test(out);
    }).map((t) => t.slug);

    expect(
      unqualified,
      `These seoDescriptions quote the cheapest group price with no group-size\n` +
        `qualifier, so the SERP promises a price the page only charges to a\n` +
        `larger party. Add "for N+" after the figure:\n  ` +
        unqualified.join("\n  "),
    ).toEqual([]);
  });
});
