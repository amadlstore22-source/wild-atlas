import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The booking box on every tour page said "You choose the dates — Private
 * departures, no fixed schedule to fit into". On the shared tours (sold by the
 * seat, in a group of up to 16-20) that was simply false, in six languages,
 * and nothing caught it: valid copy, valid page. Found 2026-10-05 while
 * reviewing the site.
 *
 * Shared tours now read booking.sharedDatesTitle/Body. This guards both halves:
 * every locale has the shared copy, and it never claims "private".
 */
const ROOT = join(__dirname, "..", "..");
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const PRIVATE = /private|privé|privad|privat|privat|خاص/i;

describe("shared-tour booking copy", () => {
  it("exists in every locale and never calls a shared departure private", () => {
    const problems: string[] = [];
    for (const l of LOCALES) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      const t = d.booking?.sharedDatesTitle, b = d.booking?.sharedDatesBody;
      if (!t || !b) problems.push(`${l}: booking.sharedDatesTitle/Body missing`);
      else if (PRIVATE.test(t + " " + b)) problems.push(`${l}: shared copy says "private": ${t} / ${b}`);
    }
    expect(problems, `Fix dictionaries/<locale>.json:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  it("is what the booking sidebar shows for shared tours", () => {
    const src = readFileSync(join(ROOT, "components", "tours", "BookingSidebar.tsx"), "utf8");
    expect(src, "BookingSidebar must pick sharedDates* when tour.tourType === \"shared\"").toMatch(
      /tourType === "shared" \? b\.sharedDatesTitle : b\.chooseDatesTitle/,
    );
  });
});
