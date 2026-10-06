import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { ONE_DAY_OPTION_TREKS, ONE_DAY_PRICE_FROM, REFUGE_TREKS, oneDayPricesFrom, oneDayPricing, REFUGE_FIRST_OPEN_DATE, REFUGE_FULL_UNTIL, offersOneDay, refugeFull } from "@/lib/refuge";

/**
 * 2026-10-06: the Toubkal Refuge is fully booked for the rest of 2026 (owner).
 * Every trek that sleeps there can only be sold for 2027. Before this, the
 * booking form on all eight refuge treks accepted any date from tomorrow, so a
 * visitor could send an enquiry for a trip we cannot run, and nothing on the
 * page said so.
 *
 * The one-day summit is an OPTION in the 2-day trek's booking form, not a tour
 * of its own: it was first built as a separate tour page and the owner asked
 * for it to be removed. So: no tour may exist for it, and the option is only
 * offered on treks that actually sleep at the refuge.
 *
 * Guarded here: the detection finds the refuge treks (it reads the English
 * `stay`, so a reworded itinerary could silently drop one), the dates are
 * coherent, and the booking form enforces them.
 */
const ROOT = join(__dirname, "..", "..");

describe("Toubkal Refuge full", () => {
  it("finds every trek that sleeps at the refuge, and only treks", () => {
    const fromData = TOURS.filter((t) => t.itinerary.some((d) => /refuge/i.test(d.stay ?? ""))).map((t) => t.slug).sort();
    expect([...REFUGE_TREKS].sort(), "Update REFUGE_TREKS in lib/refuge.ts to the tours whose English `stay` says refuge").toEqual(fromData);
    expect(TOURS.filter((t) => REFUGE_TREKS.includes(t.slug) && t.category !== "trekking").map((t) => t.slug)).toEqual([]);
  });

  it("offers the one-day summit only as an option on refuge treks, never as a tour", () => {
    for (const s of ONE_DAY_OPTION_TREKS) expect(offersOneDay(s), `${s} does not sleep at the refuge, or no longer exists`).toBe(true);
    // Priced as the 2-day trek from every page that offers it: the 4-day page
    // must not quote its own 4-day ladder for a one-day climb.
    const src = TOURS.find((t) => t.slug === ONE_DAY_PRICE_FROM)!;
    for (const s of ONE_DAY_OPTION_TREKS) {
      const p = oneDayPricing(TOURS.find((t) => t.slug === s)!, oneDayPricesFrom(src));
      expect([p.price, p.depositAmount, p.groupPricing], `${s}: one-day price`).toEqual([src.price, src.depositAmount, src.groupPricing]);
    }
    const oneDayTours = TOURS.filter((t) => /toubkal/i.test(t.slug) && t.itinerary.length === 1).map((t) => t.slug);
    expect(oneDayTours, "The owner wants the one-day summit as a booking option on the 2-day trek, not a tour page").toEqual([]);
  });

  it("has coherent dates and the booking form enforces them", () => {
    expect(new Date(`${REFUGE_FIRST_OPEN_DATE}T00:00:00Z`).getTime() - new Date(`${REFUGE_FULL_UNTIL}T00:00:00Z`).getTime()).toBe(86_400_000);
    expect(refugeFull(new Date(`${REFUGE_FULL_UNTIL}T12:00:00Z`))).toBe(true);
    expect(refugeFull(new Date(`${REFUGE_FIRST_OPEN_DATE}T12:00:00Z`))).toBe(false);
    const sidebar = readFileSync(join(ROOT, "components", "tours", "BookingSidebar.tsx"), "utf8");
    expect(sidebar, "BookingSidebar must start refuge treks at REFUGE_FIRST_OPEN_DATE unless one-day is ticked").toMatch(/refugeLocked && !oneDay \? REFUGE_FIRST_OPEN_DATE/);
    expect(sidebar, "The one-day choice must reach the inbox in the tour name").toMatch(/ONE-DAY SUMMIT/);
  });

  // The first version imported TOURS here; BookingSidebar is a client
  // component, so the whole catalogue (~240 KB of JS) shipped on every page.
  // Typecheck, tests and build all passed; only a bundle comparison caught it.
  it("keeps the tour catalogue out of the browser bundle", () => {
    const refuge = readFileSync(join(ROOT, "lib", "refuge.ts"), "utf8");
    const sidebar = readFileSync(join(ROOT, "components", "tours", "BookingSidebar.tsx"), "utf8");
    expect(refuge, "lib/refuge.ts may only `import type` from lib/tours").not.toMatch(/^import (?!type )[^;]*from "@\/lib\/tours"/m);
    expect(sidebar, "BookingSidebar must not import TOURS").not.toMatch(/import \{[^}]*TOURS[^}]*\} from "@\/lib\/tours"/);
  });

  it("is labelled in every locale", () => {
    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      for (const k of ["refugeFullTitle", "refugeFullBody", "refugeFullBodyOneDay", "refugeOneDayLabel"]) if (!d.tourDetail?.[k]) missing.push(`${l}: tourDetail.${k}`);
    }
    expect(missing).toEqual([]);
  });
});
