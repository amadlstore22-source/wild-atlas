import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { ONE_DAY_TOUBKAL, REFUGE_FIRST_OPEN_DATE, REFUGE_FULL_UNTIL, refugeFull, sleepsAtRefuge } from "@/lib/refuge";

/**
 * 2026-10-06: the Toubkal Refuge is fully booked for the rest of 2026 (owner).
 * Every trek that sleeps there can only be sold for 2027, and the one-day
 * climb from Imlil is the only 2026 summit. Before this, the booking form on
 * all eight refuge treks accepted any date from tomorrow, so a visitor could
 * send an enquiry for a trip we cannot run, and nothing on the page said so.
 *
 * Guarded here: the detection finds the refuge treks (it reads the English
 * `stay`, so a reworded itinerary could silently drop one), the one-day tour
 * the notice links to exists in every locale and does NOT itself need the
 * refuge, the dates are coherent, and the booking form enforces them.
 */
const ROOT = join(__dirname, "..", "..");

describe("Toubkal Refuge full", () => {
  it("finds every trek that sleeps at the refuge, and only treks", () => {
    const refuge = TOURS.filter((t) => sleepsAtRefuge(t.slug));
    expect(refuge.length, "No refuge trek found: did the English `stay` wording change?").toBeGreaterThan(0);
    expect(refuge.filter((t) => t.category !== "trekking").map((t) => t.slug)).toEqual([]);
    // Every trek through the summit from the refuge side must be caught.
    const missed = TOURS.filter((t) => t.itinerary.some((d) => d.stop?.name === "Toubkal Refuge") && t.itinerary.some((d) => d.stay) && !sleepsAtRefuge(t.slug) && t.slug !== ONE_DAY_TOUBKAL);
    expect(missed.map((t) => t.slug), "These treks stop at the refuge but are not treated as sleeping there").toEqual([]);
  });

  it("links to a one-day tour that exists in every locale and needs no refuge night", () => {
    const one = TOURS.find((t) => t.slug === ONE_DAY_TOUBKAL);
    expect(one, `${ONE_DAY_TOUBKAL} is gone; RefugeNotice links to it`).toBeDefined();
    expect(sleepsAtRefuge(ONE_DAY_TOUBKAL)).toBe(false);
    expect(one!.itinerary.length).toBe(1);
    for (const l of ["fr", "es", "de", "it", "ar"] as const)
      expect(toursFor(l).some((t) => t.slug === ONE_DAY_TOUBKAL), `${l}: one-day tour missing`).toBe(true);
  });

  it("has coherent dates and the booking form enforces them", () => {
    expect(new Date(`${REFUGE_FIRST_OPEN_DATE}T00:00:00Z`).getTime() - new Date(`${REFUGE_FULL_UNTIL}T00:00:00Z`).getTime()).toBe(86_400_000);
    expect(refugeFull(new Date(`${REFUGE_FULL_UNTIL}T12:00:00Z`))).toBe(true);
    expect(refugeFull(new Date(`${REFUGE_FIRST_OPEN_DATE}T12:00:00Z`))).toBe(false);
    const sidebar = readFileSync(join(ROOT, "components", "tours", "BookingSidebar.tsx"), "utf8");
    expect(sidebar, "BookingSidebar must start refuge treks at REFUGE_FIRST_OPEN_DATE").toMatch(/refugeLocked \? REFUGE_FIRST_OPEN_DATE/);
  });

  it("is labelled in every locale", () => {
    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      for (const k of ["refugeFullTitle", "refugeFullBody", "refugeFullLink", "refugeDateNote"]) if (!d.tourDetail?.[k]) missing.push(`${l}: tourDetail.${k}`);
    }
    expect(missing).toEqual([]);
  });
});
