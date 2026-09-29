import { describe, it, expect } from "vitest";
import { formatPrice, DEFAULT_CURRENCY, RATES, CURRENCY_SYMBOL } from "@/lib/currency";
import { TOURS, lowestGroupPrice, groupPriceTiers } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";

/** Mirror of schemaPrice() in app/[lang]/tours/[slug]/page.tsx. */
const schemaPrice = (eur: number) => String(Math.round(eur * RATES[DEFAULT_CURRENCY]));

describe("structured-data price matches the visible price", () => {
  // Google compares the price in structured data against the price on the page.
  // When tour prices were stored in USD, a schema that quoted the raw stored
  // number said "$380" on a page showing "€350" — a real mismatch flagged as a
  // rich-results issue. Prices are euros now, but schema and page must still
  // round through the same function.
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

  it("euros are the base and other currencies convert from them", () => {
    // Owner, 2026-09-29: "the base currency should be euros ... if a tour says
    // 120 euros and the client changes to a different currency it would show
    // 136 in today's rate ... without the .number". Rounding is to the NEAREST
    // whole unit (owner chose that over cutting the decimals): 120 x 1.1378 =
    // 136.54 -> $137.
    expect(RATES.EUR).toBe(1);
    expect(formatPrice(120, "EUR")).toBe("€120");
    expect(formatPrice(120, "USD")).toBe("$137");
    expect(formatPrice(120, "GBP")).toBe("£103"); // 102.94
    expect(formatPrice(120, "MAD")).toBe("MAD 1,315"); // 1315.04
  });

  it("never shows decimals in any currency", () => {
    for (const t of TOURS) {
      for (const c of ["EUR", "USD", "GBP", "MAD"] as const) {
        for (const v of [t.price, t.depositAmount, ...groupPriceTiers(t).map((x) => x.price)]) {
          expect(formatPrice(v, c), `${t.slug} ${c}`).toMatch(/^(€|\$|£|MAD )\d{1,3}(,\d{3})*$/);
        }
      }
    }
  });

  it("stores whole euros, so the euro price is exactly the quoted one", () => {
    // A fractional stored price would display rounded in EUR too, and the
    // euro figure would no longer be the one the owner quoted.
    for (const t of TOURS) {
      for (const v of [t.price, t.depositAmount, ...(t.groupPricing ?? []).map((x) => x.price)]) {
        expect(Number.isInteger(v), `${t.slug}: ${v} is not a whole euro amount`).toBe(true);
      }
    }
  });
});

describe("tour seoDescription price prose", () => {
  /**
   * seoDescription is what Google prints under the result, and it is used
   * exactly as written. Until 2026-09-29 these strings quoted USD ("From $380")
   * and the page rewrote each figure into euros at render time. With euros as
   * the stored currency that rewrite would have printed the dollar number with
   * a euro sign, ~15% high, so every figure was converted once in the source
   * and the rewrite removed.
   *
   * Checking all six locales turned up 21 translated descriptions quoting a
   * price the tour no longer had — "Da €69" on the Italian Agafay page (real
   * price €186), "From €313" on the family trek in five languages (€554),
   * "€1,697" on the Arabic camel trek. The August price uplift had updated the
   * English strings only, and this test only read English. Same failure as
   * price-locale-parity.test.ts, in the one field that test did not cover.
   */
  const LOCALES = ["en", "fr", "de", "es", "it", "ar"] as const;
  // "€245", "245 €", "1.030 €", "58 يورو", "1,030 euros".
  const euroFigures = (text = "") =>
    [...text.matchAll(/€\s?([\d.,\u00a0\u202f ]*\d)|(\d[\d.,\u00a0\u202f ]*)\s?(?:€|EUR\b|euros?\b|يورو)/gi)].map((m) =>
      Number((m[1] ?? m[2]).replace(/[.,\u00a0\u202f ]/g, "")),
    );

  it("never quotes a dollar price", () => {
    const offenders = LOCALES.flatMap((l) =>
      toursFor(l)
        .filter((t) => /\$\s?\d/.test(t.seoDescription ?? ""))
        .map((t) => `${l}/${t.slug}: ${t.seoDescription}`),
    );
    expect(
      offenders,
      `Descriptions are shown as written and prices are in euros. Write the\n` +
        `euro figure (the tour's price in lib/tours*.ts) instead:\n  ` + offenders.join("\n  "),
    ).toEqual([]);
  });

  it("every quoted euro figure is a real price of that tour, in every locale", () => {
    const offenders: string[] = [];
    for (const l of LOCALES) {
      for (const t of toursFor(l)) {
        const valid = new Set([t.price, ...groupPriceTiers(t).map((x) => x.price)]);
        if (t.fixedDeparture?.listPrice) valid.add(t.fixedDeparture.listPrice); // "was €921"
        for (const n of euroFigures(t.seoDescription)) {
          if (!valid.has(n)) offenders.push(`${l}/${t.slug}: quotes €${n}; prices are €${[...valid].join(", €")}`);
        }
      }
    }
    expect(offenders, `Descriptions quoting a price the tour does not have:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });

  it("a translated description quotes the same figures as the English one", () => {
    // A locale may leave the price out, but if it names one it must be the
    // English figure: a quote that is merely "some tier" still lets one
    // language advertise the 2-person rate while another quotes solo.
    const offenders: string[] = [];
    for (const l of LOCALES.filter((x) => x !== "en")) {
      for (const t of toursFor(l)) {
        const mine = euroFigures(t.seoDescription);
        if (!mine.length) continue;
        const en = euroFigures(TOURS.find((x) => x.slug === t.slug)?.seoDescription);
        if (JSON.stringify(mine) !== JSON.stringify(en)) offenders.push(`${l}/${t.slug}: €${mine.join(", €")} vs en €${en.join(", €")}`);
      }
    }
    expect(offenders, `Translated descriptions disagree with English on price:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });

  /**
   * A meta description that leads with the cheapest tier is far more clickable
   * than one leading with the solo rate -- on the 4-day Toubkal that is EUR260
   * against EUR650. But the cheap number is only true at six people. Printing
   * it bare promises EUR260 to a solo visitor who is then quoted EUR650, and
   * contradicts AggregateOffer.lowPrice, whose eligibleQuantity says the price
   * needs a group. The qualifier is the whole reason the low number is honest,
   * so it is asserted rather than left to whoever edits the string next.
   * Checked in every locale: "for 6+", "6+", "+6", "6 أشخاص فأكثر", "ab 6".
   */
  it("a group-tier price in the meta always carries its group-size qualifier", () => {
    const unqualified: string[] = [];
    for (const l of LOCALES) {
      for (const t of toursFor(l)) {
        const cheapest = lowestGroupPrice(t);
        if (cheapest.minPeople <= 1) continue; // no qualifier needed
        if (cheapest.price === t.price) continue; // the solo rate needs none
        if (!euroFigures(t.seoDescription).includes(cheapest.price)) continue;
        const n = cheapest.minPeople;
        const qualifier = new RegExp(
          String.raw`${n}\s*\+|\+\s*${n}\b|\b${n}\s+أشخاص|for\s+${n}\b|\b${n}\s+(or more|oder mehr|ou plus|o más|o più)`,
        );
        if (!qualifier.test(t.seoDescription ?? "")) {
          unqualified.push(`${l}/${t.slug}`);
        }
      }
    }
    expect(
      unqualified,
      `These seoDescriptions quote the cheapest group price with no group-size\n` +
        `qualifier, so the SERP promises a price the page only charges to a\n` +
        `larger party. Add "for N+" after the figure:\n  ` +
        unqualified.join("\n  "),
    ).toEqual([]);
  });
});
