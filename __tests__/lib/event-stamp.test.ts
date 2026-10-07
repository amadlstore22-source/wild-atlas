import { describe, it, expect } from "vitest";
import { EVENTS } from "@/lib/events";
import { eventsFor } from "@/lib/events.i18n";
import { eventStamp, eventMonthKey } from "@/lib/events-format";

/**
 * The events index cards (redesigned 2026-10-07) carry a small calendar leaf
 * on the photo: a band over a large number. A large "1" over "FEB" on the
 * Almond Blossom card would read as "1 February", a date nobody has announced,
 * and people book flights against dates.
 *
 * formatEventDates already refuses to name a day for estimated and lunar
 * dates. This keeps the stamp to the same rule, for every event and locale.
 */
const LANGS = ["en", "fr", "es", "de", "it", "ar"] as const;

describe("event calendar stamp", () => {
  it("prints a day only for confirmed dates and our own departures", () => {
    const wrong: string[] = [];
    for (const lang of LANGS) {
      for (const event of eventsFor(lang)) {
        const stamp = eventStamp(event, lang);
        const mayShowDay = event.confidence === "confirmed" || Boolean(event.departureDates?.length);
        // Western or Arabic-Indic digits in the body mean a day is printed.
        const showsDigits = /[0-9٠-٩]/.test(stamp.body);
        if (!mayShowDay && (stamp.dayKnown || showsDigits)) {
          wrong.push(`${lang} ${event.slug}: "${stamp.band} / ${stamp.body}" (${event.confidence})`);
        }
      }
    }
    expect(
      wrong,
      `These stamps print a day for a date that is not confirmed. Show the\n` +
        `month only (see eventStamp):\n  ` + wrong.join("\n  "),
    ).toEqual([]);
  });

  it("our own departures stamp their first departure, not the season start", () => {
    for (const event of EVENTS.filter((e) => e.departureDates?.length)) {
      const first = event.departureDates![0];
      expect(eventMonthKey(event), event.slug).toBe(first.slice(0, 7));
      expect(eventStamp(event, "en").body, event.slug).toBe(String(Number(first.slice(8, 10))));
    }
  });
});
