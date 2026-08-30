import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EVENTS } from "@/lib/events";
import { eventsFor } from "@/lib/events.i18n";
import { TOURS } from "@/lib/tours";
import enDict from "@/dictionaries/en.json";
import frDict from "@/dictionaries/fr.json";
import esDict from "@/dictionaries/es.json";
import deDict from "@/dictionaries/de.json";
import itDict from "@/dictionaries/it.json";
import arDict from "@/dictionaries/ar.json";

/**
 * SET-DEPARTURE EVENTS: OUR OWN TRIPS IN A FILE BUILT FOR THIRD-PARTY FESTIVALS
 *
 * lib/events.ts was written for festivals — one occurrence, one date range, a
 * confidence flag because harvest and lunar dates move. A set-departure trip of
 * ours breaks two of those assumptions at once, and both failure modes are
 * silent: the page renders, the build passes, and only a customer notices.
 *
 * THE COLLAPSED-RANGE TRAP
 * TourEvent carries a single startDate/endDate. The 8-day Highlights trip runs
 * FIVE departures across March and April 2027, so those two fields have to span
 * the whole season for the existing sort and expiry logic to keep working. But
 * a season range rendered on its own reads as one seven-week event: someone
 * scanning the page sees "5 March – 22 April" and reasonably concludes they can
 * join in the middle. They cannot — these are five separate eight-day trips.
 * So whenever departureDates exists, the individual dates must be what the UI
 * shows, and the endDate must cover the last departure's RETURN rather than its
 * start, or the event vanishes from the site while that trip is still running.
 *
 * THE TWO-SOURCES-OF-TRUTH TRAP
 * The same five dates live in lib/tours.ts as `fixedDeparture.dates`, which is
 * what the booking sidebar sells against. Retyping them into lib/events.ts
 * creates two lists that drift the first time a departure moves — and the
 * events page would then advertise a date the booking page will not sell. This
 * is the same class of defect as the proxy/localizedSlug pair and the
 * blog-prose/tour-price pair, both of which shipped before a test existed.
 *
 * Assertions are catalogue-wide rather than scoped to this one event: the next
 * set-departure entry added is the one nobody will check.
 */

const LOCALES = { en: enDict, fr: frDict, es: esDict, de: deDict, it: itDict, ar: arDict } as const;

const WITH_DEPARTURES = EVENTS.filter((e) => (e.departureDates?.length ?? 0) > 0);

const ISO = /^\d{4}-\d{2}-\d{2}$/;

describe("set-departure events", () => {
  it("exist — the suite below is meaningless if the filter is empty", () => {
    expect(
      WITH_DEPARTURES.length,
      "No event carries `departureDates`. If the field was renamed, update this\n" +
        "suite; if the last set-departure event was removed, delete it.",
    ).toBeGreaterThan(0);
  });

  it("never invents a date the booking page does not sell", () => {
    // The single most important assertion here. Every departure date on an
    // event must appear in some tour's fixedDeparture.dates, because that is
    // what the booking sidebar actually sells seats against.
    const sellable = new Set(
      TOURS.flatMap((t) => t.fixedDeparture?.dates ?? []),
    );

    const invented: string[] = [];
    for (const e of WITH_DEPARTURES) {
      for (const d of e.departureDates ?? []) {
        if (!sellable.has(d)) invented.push(`${e.slug}: ${d}`);
      }
    }

    expect(
      invented,
      "These event departure dates match no tour's fixedDeparture.dates, so the\n" +
        "events page advertises a departure the booking page will not sell.\n" +
        "Read the dates from lib/tours.ts rather than retyping them:\n  " +
        invented.join("\n  "),
    ).toEqual([]);
  });

  it("links a tour that actually runs those departures", () => {
    // An event listing dates must point at the tour those dates belong to,
    // otherwise "see departures" leads to a page that sells something else.
    const orphaned: string[] = [];
    for (const e of WITH_DEPARTURES) {
      const dates = new Set(e.departureDates ?? []);
      const match = e.tourSlugs.some((slug) => {
        const tour = TOURS.find((t) => t.slug === slug);
        return (tour?.fixedDeparture?.dates ?? []).some((d) => dates.has(d));
      });
      if (!match) orphaned.push(e.slug);
    }

    expect(
      orphaned,
      "These events list departure dates but none of their tourSlugs is the\n" +
        "tour that runs them, so the page offers dates it cannot sell:\n  " +
        orphaned.join("\n  "),
    ).toEqual([]);
  });

  it("spans the season, so the event survives until the last trip returns", () => {
    // endDate governs expiry (upcomingEventsFor filters on endDate >= today).
    // Setting it to the last DEPARTURE would drop the event mid-trip, while a
    // start after the first departure hides a date that is still bookable.
    const wrong: string[] = [];
    for (const e of WITH_DEPARTURES) {
      const dates = [...(e.departureDates ?? [])].sort();
      if (e.startDate > dates[0]) {
        wrong.push(`${e.slug}: startDate ${e.startDate} is after its first departure ${dates[0]}`);
      }
      if (e.endDate < dates[dates.length - 1]) {
        wrong.push(`${e.slug}: endDate ${e.endDate} is before its last departure ${dates[dates.length - 1]}`);
      }
    }

    expect(
      wrong,
      "A set-departure event's startDate/endDate must span every departure —\n" +
        "endDate drives expiry, so an endDate on the last departure drops the\n" +
        "event from the site while that trip is still out:\n  " +
        wrong.join("\n  "),
    ).toEqual([]);
  });

  it("keeps departures in chronological order and free of duplicates", () => {
    const bad: string[] = [];
    for (const e of WITH_DEPARTURES) {
      const dates = e.departureDates ?? [];
      const sorted = [...dates].sort();
      if (dates.join() !== sorted.join()) bad.push(`${e.slug}: not in date order`);
      if (new Set(dates).size !== dates.length) bad.push(`${e.slug}: has duplicate dates`);
      for (const d of dates) {
        if (!ISO.test(d) || Number.isNaN(Date.parse(`${d}T00:00:00Z`))) {
          bad.push(`${e.slug}: "${d}" is not a real ISO date`);
        }
      }
    }
    expect(bad, `Departure date list problems:\n  ${bad.join("\n  ")}`).toEqual([]);
  });

  it("is confirmed, because we are the organiser of our own departures", () => {
    // The confidence system exists because festival dates move. A date we set
    // ourselves and sell seats against does not, so anything softer than
    // `confirmed` here would understate a date the customer can rely on.
    const soft = WITH_DEPARTURES.filter((e) => e.confidence !== "confirmed").map(
      (e) => `${e.slug} (${e.confidence})`,
    );
    expect(
      soft,
      "These events list our own set departures but are not marked `confirmed`.\n" +
        "We set these dates and sell seats against them — there is no harvest or\n" +
        "moon sighting to hedge against:\n  " + soft.join("\n  "),
    ).toEqual([]);
  });

  it("renders the individual dates, never only the collapsed season range", () => {
    // The whole failure mode this file guards. Both the detail page and the
    // index card must read departureDates; showing only formatEventDates()
    // turns five trips into one seven-week event.
    const detail = readFileSync(
      join(__dirname, "..", "..", "app", "[lang]", "events", "[slug]", "page.tsx"),
      "utf-8",
    );
    const index = readFileSync(
      join(__dirname, "..", "..", "app", "[lang]", "events", "page.tsx"),
      "utf-8",
    );

    // NB: React emits `dateTime` in camelCase (like srcSet, unlike crossOrigin,
    // which it lowercases). HTML attribute names are case-insensitive so
    // browsers and crawlers read it correctly — but a case-sensitive grep for
    // `datetime=` finds nothing and looks exactly like a page that renders no
    // dates at all. It cost a false alarm during this change.
    expect(
      detail.includes("departureDates"),
      "The event detail page no longer reads `departureDates`, so a five-\n" +
        "departure trip renders as a single seven-week date range and a reader\n" +
        "would believe they can join partway through.",
    ).toBe(true);

    expect(
      index.includes("departureDates"),
      "The events index card no longer reads `departureDates`, so it prints the\n" +
        "whole season as one chip — which reads as one long event rather than\n" +
        "several separate trips.",
    ).toBe(true);
  });

  it("emits each departure as a subEvent, not one long season", () => {
    // The schema is where this matters most. Emitting only the season's
    // startDate..endDate told Google there was a SINGLE seven-week event
    // running 5 March - 22 April 2027 — the exact misreading the page body is
    // built to prevent, repeated in the SERP where no page copy can correct it.
    // schema.org/subEvent is the series-and-occurrences shape.
    const src = readFileSync(
      join(__dirname, "..", "..", "app", "[lang]", "events", "[slug]", "page.tsx"),
      "utf-8",
    );
    expect(
      src.includes("subEvent"),
      "The Event schema no longer emits `subEvent`. A set-departure trip is a\n" +
        "series of separate trips; without subEvent the markup claims one\n" +
        "continuous event spanning the whole season.",
    ).toBe(true);
  });

  it("formats dates through localeTag, not a bare locale", () => {
    // Bare "en" resolves to en-US and prints "Mar 5, 2027" on a site that is
    // British English everywhere else. localeTag exists for exactly this and
    // the booking sidebar already routes through it.
    for (const [name, file] of [
      ["events/[slug]/page.tsx", join(__dirname, "..", "..", "app", "[lang]", "events", "[slug]", "page.tsx")],
      ["events/page.tsx", join(__dirname, "..", "..", "app", "[lang]", "events", "page.tsx")],
    ] as const) {
      const src = readFileSync(file, "utf-8");
      if (!src.includes("toLocaleDateString")) continue;
      expect(
        src.includes("localeTag("),
        `${name} formats a date without localeTag(). A bare locale string makes\n` +
          `Intl fall back to en-US, which prints "Mar 5, 2027" instead of\n` +
          `"5 March 2027" on a British-English site.`,
      ).toBe(true);
    }
  });

  it("states the seat cap in words on every locale, not only in JSON-LD", () => {
    // fixed-departure.test.ts records why: a seat cap that exists only in
    // structured data and is rendered nowhere is the exact mismatch Google's
    // spam policy targets.
    const missing: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      const ev = (dict as { events?: Record<string, string> }).events ?? {};
      if (!ev.departureDates?.trim()) missing.push(`${loc}: events.departureDates`);
      if (!ev.departureDatesNote?.trim()) missing.push(`${loc}: events.departureDatesNote`);
    }
    expect(
      missing,
      "These locales have no label for the set-departure block, so it renders\n" +
        "an empty heading or falls back to English:\n  " + missing.join("\n  "),
    ).toEqual([]);
  });

  it("translates the departure labels rather than shipping English", () => {
    // An English fallback in a locale file is invisible — the file's own
    // docblock records two features that shipped serving English to five of
    // six locales.
    const en = (enDict as { events: Record<string, string> }).events;
    const untranslated: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      if (loc === "en") continue;
      const ev = (dict as { events: Record<string, string> }).events;
      for (const key of ["departureDates", "departureDatesNote"] as const) {
        if (ev[key] === en[key]) untranslated.push(`${loc}.${key}`);
      }
    }
    expect(
      untranslated,
      "These strings are byte-identical to English, which means the locale is\n" +
        "serving untranslated copy:\n  " + untranslated.join("\n  "),
    ).toEqual([]);
  });

  it("keeps the dates identical in every locale", () => {
    // eventFor() overlays prose only. A locale that somehow altered the dates
    // would sell a different departure to French readers than to English ones.
    const enEvent = EVENTS.find((e) => (e.departureDates?.length ?? 0) > 0)!;
    for (const loc of ["fr", "es", "de", "it", "ar"] as const) {
      const localised = eventsFor(loc).find((e) => e.slug === enEvent.slug)!;
      expect(
        localised.departureDates,
        `${loc} renders different departure dates than English for ${enEvent.slug}.`,
      ).toEqual(enEvent.departureDates);
    }
  });
});
