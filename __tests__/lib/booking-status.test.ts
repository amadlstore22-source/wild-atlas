import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EVENTS } from "@/lib/events";
import enDict from "@/dictionaries/en.json";
import frDict from "@/dictionaries/fr.json";
import esDict from "@/dictionaries/es.json";
import deDict from "@/dictionaries/de.json";
import itDict from "@/dictionaries/it.json";
import arDict from "@/dictionaries/ar.json";

/**
 * THE "BOOKING OPEN NOW" BADGE IS A LIVE CLAIM ON A STATIC PAGE
 *
 * The events routes are SSG — the build output marks them `●`, prerendered at
 * build time. So `new Date()` evaluated during render freezes at the moment of
 * the build, and a badge computed that way keeps announcing "Booking open now
 * — next departure 5 March 2027" forever, including on 6 March 2027 and every
 * day after, until somebody happens to redeploy.
 *
 * That is strictly worse than having no badge. A stale date chip is a mistake
 * a reader can see; a stale AVAILABILITY claim reads as current and is the one
 * thing on the page a customer would act on immediately. It is also the exact
 * shape of the defect the fixed-departure suite already documents — markup
 * asserting something the page cannot substantiate.
 *
 * So the badge must be a client component that recomputes from the browser's
 * own clock, which is the same reasoning BookingSidebar records for its date
 * bounds: "computed per render rather than at module load so a long-lived tab
 * does not go stale overnight."
 *
 * WHAT IT MAY NOT CLAIM
 * Not a seat count. `seatsTotal` is a CAP, not live inventory — nothing in this
 * codebase knows how many seats remain. "Only 3 left" would be unverifiable,
 * and false urgency is precisely the OTA reflex this site's copy avoids
 * everywhere else (see the honest `considerations` lists, and the deliberate
 * absence of aggregateRating on tours).
 *
 * Assertions are catalogue-wide: the next set-departure event added is the one
 * nobody will check.
 */

const LOCALES = { en: enDict, fr: frDict, es: esDict, de: deDict, it: itDict, ar: arDict } as const;

const ROOT = join(__dirname, "..", "..");
const BADGE = join(ROOT, "components", "events", "BookingStatus.tsx");
const DETAIL = join(ROOT, "app", "[lang]", "events", "[slug]", "page.tsx");
const INDEX = join(ROOT, "app", "[lang]", "events", "page.tsx");

const badgeSrc = readFileSync(BADGE, "utf-8");

describe("live booking status badge", () => {
  it("is a client component, so it cannot freeze at build time", () => {
    expect(
      badgeSrc.startsWith('"use client"'),
      "BookingStatus is no longer a client component. The events pages are SSG,\n" +
        "so a server-rendered badge computes `new Date()` once at BUILD time and\n" +
        "then advertises 'booking open, next departure <past date>' indefinitely.",
    ).toBe(true);
  });

  it("reads the clock at render, not at module load", () => {
    // A `const today = new Date()` at module scope is evaluated once when the
    // chunk is first parsed. A tab left open over midnight — or over the
    // departure date — would keep the old answer.
    //
    // Comments are stripped first. The first version of this check matched the
    // phrase `new Date()` inside this file's own docblock explaining the trap,
    // and reported a bug in prose describing the bug.
    const withoutComments = badgeSrc
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");
    const moduleScope = withoutComments.slice(0, withoutComments.indexOf("export default"));
    expect(
      /new Date\(\)/.test(moduleScope),
      "BookingStatus evaluates `new Date()` at module scope. That is read once\n" +
        "when the chunk loads, so a long-lived tab keeps the stale answer — the\n" +
        "same trap BookingSidebar documents for its date bounds.",
    ).toBe(false);
  });

  it("handles the season being over instead of always claiming open", () => {
    // The failure mode that matters: every departure in the past must produce
    // a "finished" state, not an open one.
    expect(
      badgeSrc.includes("closed"),
      "BookingStatus has no closed/finished branch, so once every departure has\n" +
        "passed it still renders 'Booking open now'.",
    ).toBe(true);
    expect(
      /upcoming\.length === 0|upcoming\.length < 1|!upcoming\.length/.test(badgeSrc),
      "BookingStatus does not test for an empty list of upcoming departures.",
    ).toBe(true);
  });

  it("compares dates as calendar days, not instants", () => {
    // `new Date(iso) >= new Date()` marks a departure past during its own
    // departure morning for anyone west of UTC. The trip leaves that day, so
    // the day itself still counts as bookable-to.
    expect(
      badgeSrc.includes("toISOString().slice(0, 10)"),
      "BookingStatus compares Date instants rather than YYYY-MM-DD strings. A\n" +
        "departure would read as past during its own departure day in any\n" +
        "timezone behind UTC.",
    ).toBe(true);
  });

  it("never claims a seat count it cannot substantiate", () => {
    // seatsTotal is a cap, not remaining inventory.
    const forbidden = /seatsLeft|seatsRemaining|spotsLeft|places?Left|only \d+ left/i;
    expect(
      forbidden.test(badgeSrc),
      "BookingStatus appears to claim remaining seats. `seatsTotal` is a CAP,\n" +
        "not live inventory — nothing here knows how many seats are left, so any\n" +
        "such number is unverifiable false urgency.",
    ).toBe(false);
  });

  it("respects prefers-reduced-motion on the pulsing dot", () => {
    if (!badgeSrc.includes("animate-ping")) return;
    expect(
      badgeSrc.includes("motion-reduce:animate-none"),
      "The status dot animates without a motion-reduce escape. A pulsing element\n" +
        "is exactly what prefers-reduced-motion exists to suppress.",
    ).toBe(true);
  });

  it("appears at the top of the event page and on the index card", () => {
    // The badge answers "can I still get on this?", which is the first question
    // on a set-departure trip. Below the fold it may as well not exist.
    const detail = readFileSync(DETAIL, "utf-8");
    const index = readFileSync(INDEX, "utf-8");

    expect(
      detail.includes("BookingStatus"),
      "The event detail page no longer renders BookingStatus.",
    ).toBe(true);
    expect(
      index.includes("BookingStatus"),
      "The events index card no longer renders BookingStatus, so availability is\n" +
        "invisible until someone clicks through.",
    ).toBe(true);

    // "Top" means inside the hero, before the article body starts.
    const heroEnd = detail.indexOf("<article");
    const badgeAt = detail.indexOf("<BookingStatus");
    expect(
      badgeAt > 0 && heroEnd > 0 && badgeAt < heroEnd,
      "BookingStatus has moved below the hero. It answers the first question a\n" +
        "reader has about a set-departure trip and belongs above the fold.",
    ).toBe(true);
  });

  it("has translated labels in every locale", () => {
    const missing: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      const ev = (dict as { events?: Record<string, string> }).events ?? {};
      for (const key of ["bookingOpen", "bookingNext", "bookingClosed"] as const) {
        if (!ev[key]?.trim()) missing.push(`${loc}: events.${key}`);
      }
    }
    expect(
      missing,
      "These locales have no booking-status copy, so the badge renders empty or\n" +
        "falls back to English:\n  " + missing.join("\n  "),
    ).toEqual([]);
  });

  it("translates the labels rather than shipping English", () => {
    const en = (enDict as { events: Record<string, string> }).events;
    const untranslated: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      if (loc === "en") continue;
      const ev = (dict as { events: Record<string, string> }).events;
      for (const key of ["bookingOpen", "bookingNext", "bookingClosed"] as const) {
        if (ev[key] === en[key]) untranslated.push(`${loc}.${key}`);
      }
    }
    expect(
      untranslated,
      "These booking-status strings are byte-identical to English:\n  " +
        untranslated.join("\n  "),
    ).toEqual([]);
  });

  it("keeps the {date} placeholder in every locale", () => {
    // The next-departure date is substituted in. A locale that drops the
    // placeholder silently renders a sentence with no date in it.
    const broken: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      const ev = (dict as { events: Record<string, string> }).events;
      if (!ev.bookingNext.includes("{date}")) broken.push(loc);
    }
    expect(
      broken,
      "These locales dropped the {date} placeholder from events.bookingNext, so\n" +
        "the badge names no departure at all:\n  " + broken.join(", "),
    ).toEqual([]);
  });

  it("gives set-departure events the seat reason, not the accommodation one", () => {
    // `bookAhead` says "accommodation near these events fills early" — true for
    // the six festivals (Essaouira's riads sell out a year before Gnaoua) and
    // simply wrong for our own trip, where nobody books a hotel near the
    // departure and what runs out is the fourteen seats. Shipping the festival
    // sentence there gives a confident reason to book early that is not the
    // real one. Caught by reading the built HTML, not by any assertion.
    for (const [name, file] of [
      ["events/[slug]/page.tsx", DETAIL],
      ["events/page.tsx", INDEX],
    ] as const) {
      const src = readFileSync(file, "utf-8");
      expect(
        src.includes("bookAheadSeats"),
        `${name} no longer chooses bookAheadSeats for set departures, so a\n` +
          `seat-capped trip tells readers to book early because ACCOMMODATION\n` +
          `fills up — which is not why it fills up.`,
      ).toBe(true);
    }

    const missing: string[] = [];
    for (const [loc, dict] of Object.entries(LOCALES)) {
      const ev = (dict as { events: Record<string, string> }).events;
      if (!ev.bookAheadSeats?.trim()) missing.push(`${loc}: events.bookAheadSeats`);
      else if (!ev.bookAheadSeats.includes("{weeks}")) missing.push(`${loc}: lost {weeks}`);
    }
    expect(
      missing,
      "Problems with the seat-capped bookAhead copy:\n  " + missing.join("\n  "),
    ).toEqual([]);
  });

  it("gives set-departure events a lead time sized for a flight decision", () => {
    // bookAheadWeeks means something different here than on a festival. On a
    // festival it answers "when does nearby accommodation sell out" (Gnaoua is
    // 40 because Essaouira's riads fill a year ahead). On our own trip the
    // constraint is fourteen seats plus the customer's international flights.
    //
    // Comparators: Nepal operators quote 6-8 weeks for a spring trek and about
    // six months as "almost always sufficient"; general tour booking windows
    // have shortened to 15-25 days, but that is day tours and activities, not a
    // trip people book flights around. Anything under ~8 weeks is advice given
    // too late to act on.
    const short = EVENTS.filter(
      (e) => (e.departureDates?.length ?? 0) > 0 && e.bookAheadWeeks < 8,
    ).map((e) => `${e.slug}: ${e.bookAheadWeeks} weeks`);

    expect(
      short,
      "These set-departure events advise booking less than 8 weeks ahead. That\n" +
        "is shorter than any comparable multi-day trek operator quotes, and too\n" +
        "late for someone still to book international flights:\n  " +
        short.join("\n  "),
    ).toEqual([]);
  });
});
