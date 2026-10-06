import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { ONE_DAY_OPTION_TREKS, REFUGE_FIRST_OPEN_DATE, REFUGE_FULL_UNTIL, offersOneDay, refugeFull, sleepsAtRefuge } from "@/lib/refuge";

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
    const refuge = TOURS.filter((t) => sleepsAtRefuge(t.slug));
    expect(refuge.length, "No refuge trek found: did the English `stay` wording change?").toBeGreaterThan(0);
    expect(refuge.filter((t) => t.category !== "trekking").map((t) => t.slug)).toEqual([]);
    const missed = TOURS.filter((t) => t.itinerary.some((d) => d.stop?.name === "Toubkal Refuge") && !sleepsAtRefuge(t.slug));
    expect(missed.map((t) => t.slug), "These treks stop at the refuge but are not treated as sleeping there").toEqual([]);
  });

  it("offers the one-day summit only as an option on refuge treks, never as a tour", () => {
    for (const s of ONE_DAY_OPTION_TREKS) expect(offersOneDay(s), `${s} does not sleep at the refuge, or no longer exists`).toBe(true);
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

  it("is labelled in every locale", () => {
    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      for (const k of ["refugeFullTitle", "refugeFullBody", "refugeFullBodyOneDay", "refugeOneDayLabel"]) if (!d.tourDetail?.[k]) missing.push(`${l}: tourDetail.${k}`);
    }
    expect(missing).toEqual([]);
  });
});
