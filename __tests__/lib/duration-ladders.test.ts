import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { DURATION_LADDERS, ladderFor, dunesDayIndex, dunesPlace } from "@/lib/duration-ladders";

/**
 * The "How many days?" block on desert tour pages (added 2026-10-06) prints
 * one sentence of claim above generated rows: every option "spends one night
 * at the desert camp in {place}" and extra days "spread the driving over more
 * days". Both are true of today's data: one camp night each, and the
 * Marrakech options cover 1,100–1,120 km whatever their length. Both would
 * silently become false if a tour gained a second camp night, changed its
 * route, or a ladder mixed dune fields or cities. That is valid TypeScript, the
 * page builds, and the sentence would sit above bars that contradict it.
 *
 * Also guarded: driving hours are parsed from the itinerary's `driving` text;
 * a day with none would draw an empty bar and quietly shorten the trip.
 */
const ROOT = join(__dirname, "..", "..");

describe("duration ladders", () => {
  it("compare like with like: private desert trips, same city, same dunes, shortest first", () => {
    const problems: string[] = [];
    for (const { dunes, slugs: ladder } of DURATION_LADDERS) {
      const tours = ladder.map((s) => TOURS.find((t) => t.slug === s));
      ladder.forEach((s, i) => { if (!tours[i]) problems.push(`${s}: no such tour`); });
      const ok = tours.filter((t) => t !== undefined);
      if (ok.length < 2) { problems.push(`${ladder.join(", ")}: a ladder needs two trips`); continue; }
      for (const t of ok) {
        if (t.category !== "desert" || t.tourType !== "private") problems.push(`${t.slug}: not a private desert trip`);
        if (t.origin !== ok[0].origin) problems.push(`${t.slug}: starts in ${t.origin}, ladder starts in ${ok[0].origin}`);
        // The intro names the dunes from this stop, on every page in the ladder.
        if (dunesDayIndex(t.slug) < 0) problems.push(`${t.slug}: no itinerary stop named "${dunes}…"`);
      }
      const days = ok.map((t) => t.itinerary.length);
      if (days.some((d, i) => i > 0 && d <= days[i - 1])) problems.push(`${ladder.join(", ")}: not shortest first (${days.join(", ")} days)`);
    }
    expect(problems, `Fix lib/duration-ladders.ts:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  it("keeps the intro sentence true: one camp night each, about the same road", () => {
    const problems: string[] = [];
    for (const { slugs: ladder } of DURATION_LADDERS) {
      const opts = ladderFor(ladder[0])!;
      for (const o of opts) {
        if (o.campNights !== 1) problems.push(`${o.slug}: ${o.campNights} camp nights`);
        if (o.drives.some((h) => h <= 0)) problems.push(`${o.slug}: a day has no driving time in its itinerary`);
        if (!o.km) problems.push(`${o.slug}: no distance in lib/route-maps.json`);
      }
      const km = opts.map((o) => o.km).filter(Boolean);
      if (Math.max(...km) > Math.min(...km) * 1.1) problems.push(`${ladder.join(", ")}: distances ${km.join(" / ")} km differ by more than 10%`);
    }
    expect(problems,
      `The block says every option has one camp night and spreads the same driving\n` +
      `over more days. Reword tourDetail.durationIntro in all six dictionaries, or\n` +
      `move the trip out of its ladder:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  // The Arabic 4-day page shipped to preview with no intro at all: its
  // translated itinerary has no stop on the dunes day, so the name came back
  // empty and the sentence was skipped.
  it("names the dunes on every page in every locale", () => {
    const empty: string[] = [];
    for (const { slugs } of DURATION_LADDERS)
      for (const s of slugs)
        for (const l of ["en", "fr", "es", "de", "it", "ar"] as const)
          if (!dunesPlace(s, l)) empty.push(`${l}: ${s}`);
    expect(empty, "These pages would show the chooser with no intro sentence").toEqual([]);
  });

  it("is labelled in every locale", () => {
    const keys = ["durationHeading", "durationIntro", "durationDriving", "durationDay", "durationPerPersonForTwo", "durationThisTrip", "durationSeeTrip"];
    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      for (const k of keys) if (!d.tourDetail?.[k]) missing.push(`${l}: tourDetail.${k}`);
      if (!d.tourDetail?.durationIntro?.includes("{place}")) missing.push(`${l}: tourDetail.durationIntro needs {place}`);
    }
    expect(missing).toEqual([]);
  });
});
