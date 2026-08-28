import { describe, it, expect } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { groupPriceTiers } from "@/lib/tours";
import enDict from "@/dictionaries/en.json";
import frDict from "@/dictionaries/fr.json";
import esDict from "@/dictionaries/es.json";
import deDict from "@/dictionaries/de.json";
import itDict from "@/dictionaries/it.json";
import arDict from "@/dictionaries/ar.json";

/**
 * Fixed departures — set-date trips sold by the seat — were added for the
 * 8-day Toubkal + Sahara trip, and they break two assumptions the rest of the
 * catalogue is built on.
 *
 * THE EMPTY-ARRAY TRAP
 * mergeWithEn() in lib/tours-i18n.ts overlays any locale value that is not
 * undefined/null/"". An EMPTY ARRAY passes that guard. So `itinerary: []` in a
 * locale file type-checks, builds, renders a page, and silently produces a
 * booking page with NO itinerary at all — the English fallback never fires.
 * That happened while adding this tour: tsc requires the four array fields, and
 * the obvious way to satisfy it is `[]`, which is exactly wrong. Nothing else
 * catches it; the page is valid HTML and only a human reading the localised
 * page would notice the itinerary had vanished.
 *
 * THE SCHEMA-VISIBILITY TRAP
 * The Offer for these tours asserts LimitedAvailability, an inventoryLevel and
 * a ListPrice. Google requires structured data to have a visible counterpart,
 * so a seat cap and a "was" price that appear only in JSON-LD are precisely the
 * mismatch its spam policy targets. The first build of this feature emitted all
 * three and rendered none of them.
 *
 * Assertions are catalogue-wide rather than scoped to this one tour: the next
 * fixed departure added is the one nobody will check.
 */

const LOCALES = {
  en: enDict,
  fr: frDict,
  es: esDict,
  de: deDict,
  it: itDict,
  ar: arDict,
} as const;

const FIXED = TOURS.filter((t) => t.fixedDeparture);

describe("fixed departures", () => {
  it("exist — the suite below is meaningless if the filter is empty", () => {
    // Guards against a refactor that renames the field and silently turns every
    // assertion here into a no-op over an empty array.
    expect(
      FIXED.length,
      "No tour carries `fixedDeparture`. If the field was renamed, update this\n" +
        "suite; if the last fixed departure was removed, delete it.",
    ).toBeGreaterThan(0);
  });

  it("never renders an empty body field in any locale", () => {
    // The empty-array trap above. Checked through toursFor(), which is what the
    // page actually calls, so this asserts the MERGED result a reader sees.
    const empty: string[] = [];
    for (const lc of Object.keys(LOCALES) as (keyof typeof LOCALES)[]) {
      for (const tour of toursFor(lc).filter((t) => t.fixedDeparture)) {
        for (const field of ["highlights", "includes", "excludes", "itinerary"] as const) {
          if (tour[field].length === 0) empty.push(`${lc}/${tour.slug}: ${field} is empty`);
        }
      }
    }

    expect(
      empty,
      `These merged tour records have an empty body field, so the page renders\n` +
        `that section blank. mergeWithEn() overlays any value that is not\n` +
        `undefined/null/"" — an EMPTY ARRAY passes that guard and beats the\n` +
        `English fallback. Translate the field properly or omit the key:\n  ` +
        empty.join("\n  "),
    ).toEqual([]);
  });

  it("translates the body rather than falling back to English", () => {
    // A locale entry that omits these keys inherits the English prose, which
    // renders English paragraphs inside an otherwise translated page. The FAQ
    // equivalent of this has bitten three times (see faq-locale-parity).
    const english: string[] = [];
    for (const lc of ["fr", "es", "de", "it", "ar"] as const) {
      for (const tour of toursFor(lc).filter((t) => t.fixedDeparture)) {
        const en = TOURS.find((t) => t.slug === tour.slug);
        if (!en) continue;
        if (tour.description === en.description) english.push(`${lc}/${tour.slug}: description`);
        if (tour.itinerary[0]?.title === en.itinerary[0]?.title) {
          english.push(`${lc}/${tour.slug}: itinerary day 1 title`);
        }
        if (tour.highlights[0] === en.highlights[0]) english.push(`${lc}/${tour.slug}: highlights`);
      }
    }

    expect(
      english,
      `These fixed-departure fields are identical to English, so the localised\n` +
        `booking page shows English prose:\n  ` + english.join("\n  "),
    ).toEqual([]);
  });

  it("keeps the seat price flat — no derived discount ladder", () => {
    // groupPriceTiers() invents a 6-tier discount curve for any tour without
    // explicit groupPricing. On a fixed departure that would advertise a group
    // discount that does not exist and contradict the flat Offer price. The
    // `tourType: "shared"` short-circuit is what prevents it, so assert the
    // OUTCOME rather than the flag: a future refactor could change either.
    for (const tour of FIXED) {
      const tiers = groupPriceTiers(tour);
      expect(
        tiers.length,
        `${tour.slug} derives ${tiers.length} price tiers. A fixed departure\n` +
          `sells one seat at one price; a ladder here advertises a group\n` +
          `discount that does not exist and contradicts the Offer schema.`,
      ).toBe(1);
      expect(tiers[0].price, `${tour.slug} tier price differs from the seat price`).toBe(
        tour.price,
      );
    }
  });

  it("has the dictionary keys its sidebar block needs, in every locale", () => {
    // The block renders seats, dates and the pre-discount price — the visible
    // counterparts to inventoryLevel, availability and ListPrice in the schema.
    // A missing key falls back to the English default baked into the JSX, which
    // would put an English label on a translated page.
    const REQUIRED = [
      "fixedDepartureTitle",
      "fixedDepartureSeats",
      "fixedDepartureWas",
      "fixedDepartureSave",
      "fixedDepartureNote",
    ] as const;

    const missing: string[] = [];
    for (const [lc, dict] of Object.entries(LOCALES)) {
      const booking = (dict as { booking?: Record<string, unknown> }).booking ?? {};
      for (const key of REQUIRED) {
        if (typeof booking[key] !== "string" || !booking[key]) missing.push(`${lc}.${key}`);
      }
    }

    expect(
      missing,
      `These booking dictionary keys are missing, so the fixed-departure block\n` +
        `falls back to its English default on a translated page. Add them with:\n` +
        `    PYTHONIOENCODING=utf-8 py scripts/seo/add_fixed_departure_dict.py\n\n  ` +
        missing.join("\n  "),
    ).toEqual([]);
  });

  it("states a departure date that has not already passed", () => {
    // A set-date trip whose dates are all in the past is an unbookable page
    // still advertising LimitedAvailability. Nothing expires on its own, so
    // this is the only thing that will ever say so.
    const stale: string[] = [];
    const today = new Date().toISOString().slice(0, 10);
    for (const tour of FIXED) {
      const future = tour.fixedDeparture!.dates.filter((d) => d >= today);
      if (future.length === 0) {
        stale.push(`${tour.slug}: last departure was ${tour.fixedDeparture!.dates.at(-1)}`);
      }
    }

    expect(
      stale,
      `Every departure for these tours is in the past. The page still advertises\n` +
        `limited availability for a trip nobody can book. Add the next season's\n` +
        `dates or retire the tour:\n  ` + stale.join("\n  "),
    ).toEqual([]);
  });
});
