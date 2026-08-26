import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EVENTS, upcomingEvents, toursForEvent } from "@/lib/events";
import { formatEventDates } from "@/lib/events-format";
import { eventFor, EVENT_COPY } from "@/lib/events.i18n";
import { TOURS } from "@/lib/tours";

const ROOT = join(__dirname, "..", "..");
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/**
 * Event dates are the highest-stakes data on the site: a visitor books flights
 * against them.
 *
 * Most Moroccan festival dates are NOT fixed — harvest festivals follow the
 * crop, religious dates follow a moon sighting announced by the Ministry of
 * Endowments, and village moussems are set locally weeks ahead. So lib/events
 * carries a `confidence` field, and the rule this suite enforces is that
 * confidence must constrain what we are allowed to SAY, not merely what we
 * store.
 *
 * Hence the rule that a `confirmed` date must cite the organiser's own URL.
 * Two things that happened while building this feature show why the source
 * matters more than the value:
 *   - Gnaoua: an aggregator said "24-26 June 2027"; festival-gnaoua.net said
 *     25-27 June 2026. The aggregator was wrong.
 *   - Marrakech Marathon: an aggregator said "31 Jan 2027, 37th edition" and
 *     was dismissed because the official site still showed 25 Jan 2026. Hours
 *     later the official site rolled over to exactly that. The aggregator was
 *     right, just early.
 * Only the organiser's page is authoritative at the moment it is read, which
 * is also why "no event has silently expired" below matters: these entries go
 * stale on their own.
 */

describe("event date honesty", () => {
  it("every confirmed event cites the organiser's own source", () => {
    const missing = EVENTS.filter(
      (e) => e.confidence === "confirmed" && !e.sourceUrl
    ).map((e) => e.slug);
    expect(
      missing,
      "A confirmed date is a factual claim. Cite the organiser's page in\n" +
        "`sourceUrl`, not an aggregator — aggregators were wrong 2 of 2:\n  " +
        missing.join("\n  ")
    ).toEqual([]);
  });

  it("unconfirmed events never claim a single day", () => {
    const tooPrecise = EVENTS.filter(
      (e) => e.confidence !== "confirmed" && e.startDate === e.endDate
    ).map((e) => e.slug);
    expect(
      tooPrecise,
      "These events are estimated or lunar but carry a one-day range, which\n" +
        "renders as a precise date. Widen to the window we actually know:\n  " +
        tooPrecise.join("\n  ")
    ).toEqual([]);
  });

  it("unconfirmed events explain why the date can move", () => {
    const noNote = EVENTS.filter(
      (e) => e.confidence !== "confirmed" && !e.dateNote
    ).map((e) => e.slug);
    expect(
      noNote,
      "An unconfirmed date needs a `dateNote` saying what moves it, or the\n" +
        "month window silently reads as authoritative:\n  " + noNote.join("\n  ")
    ).toEqual([]);
  });

  it("unconfirmed dates never render as a single day in any locale", () => {
    // The real guard: whatever the data says, the RENDERED string for a
    // non-confirmed event must not name one specific day.
    const offenders: string[] = [];
    for (const event of EVENTS.filter((e) => e.confidence !== "confirmed")) {
      for (const lang of LOCALES) {
        const rendered = formatEventDates(event, lang);
        // A month window has no day number; a precise date does.
        if (/\d{1,2}\b/.test(rendered.replace(/\b\d{4}\b/g, ""))) {
          offenders.push(`${event.slug} [${lang}]: "${rendered}"`);
        }
      }
    }
    expect(
      offenders,
      "Unconfirmed events rendered a day number:\n  " + offenders.join("\n  ")
    ).toEqual([]);
  });

  it("no event has silently expired", () => {
    /**
     * The index only lists events whose window is still open, so an event
     * left on a past edition does not error — it just vanishes from the page.
     * That happened: Gnaoua and the Marrakech Marathon were both entered on
     * their 2026 dates, and by the time the pages were reviewed the index
     * showed four estimated events and neither confirmed one.
     *
     * These are annual, so the fix is always to roll the entry to the next
     * edition (re-checking `sourceUrl`), not to delete it.
     */
    const today = new Date().toISOString().slice(0, 10);
    const expired = EVENTS.filter((e) => e.endDate < today).map(
      (e) => `${e.slug} (ended ${e.endDate})`
    );
    expect(
      expired,
      "These events have passed and no longer appear anywhere on the site.\n" +
        "Roll each to its next edition and re-check the organiser's dates:\n  " +
        expired.join("\n  ")
    ).toEqual([]);
  });

  it("start date never falls after end date", () => {
    const inverted = EVENTS.filter((e) => e.startDate > e.endDate).map((e) => e.slug);
    expect(inverted, `inverted date range: ${inverted.join(", ")}`).toEqual([]);
  });

  it("dates are ISO YYYY-MM-DD and real calendar days", () => {
    const bad: string[] = [];
    for (const e of EVENTS) {
      for (const [field, value] of [["startDate", e.startDate], ["endDate", e.endDate]] as const) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          bad.push(`${e.slug}.${field}=${value} (not ISO)`);
          continue;
        }
        const d = new Date(value + "T00:00:00Z");
        if (d.toISOString().slice(0, 10) !== value) {
          bad.push(`${e.slug}.${field}=${value} (not a real date)`);
        }
      }
    }
    expect(bad, bad.join("\n  ")).toEqual([]);
  });
});

describe("events link to real tours and images", () => {
  it("every tourSlug resolves to a tour in lib/tours.ts", () => {
    const known = new Set(TOURS.map((t) => t.slug));
    const broken: string[] = [];
    for (const e of EVENTS) {
      for (const slug of e.tourSlugs) {
        if (!known.has(slug)) broken.push(`${e.slug} -> ${slug}`);
      }
    }
    expect(
      broken,
      "These event pages would render a dead link to a tour that does not\n" +
        "exist. Two were caught this way when the feature was built:\n  " +
        broken.join("\n  ")
    ).toEqual([]);
  });

  it("every event resolves at least one real tour", () => {
    const empty = EVENTS.filter((e) => toursForEvent(e).length === 0).map((e) => e.slug);
    expect(
      empty,
      "An event with no bookable tour is a dead end for the reader:\n  " +
        empty.join("\n  ")
    ).toEqual([]);
  });

  it("every heroImage exists on disk", () => {
    const missing = EVENTS.filter(
      (e) => !existsSync(join(ROOT, "public", e.heroImage.replace(/^\//, "")))
    ).map((e) => `${e.slug} -> ${e.heroImage}`);
    expect(missing, missing.join("\n  ")).toEqual([]);
  });

  it("slugs are unique and URL-safe", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    const unsafe: string[] = [];
    for (const e of EVENTS) {
      if (seen.has(e.slug)) dupes.push(e.slug);
      seen.add(e.slug);
      if (!/^[a-z0-9-]+$/.test(e.slug)) unsafe.push(e.slug);
    }
    expect(dupes, `duplicate slugs: ${dupes.join(", ")}`).toEqual([]);
    expect(unsafe, `slug not URL-safe: ${unsafe.join(", ")}`).toEqual([]);
  });
});

describe("upcomingEvents filtering", () => {
  it("keeps an event on its final day and drops it the day after", () => {
    // Derived from the data, not hardcoded to one festival: an earlier version
    // named Gnaoua explicitly and broke the moment that event rolled to its
    // next edition — testing the calendar rather than the rule.
    const sample = [...EVENTS].sort((a, b) => a.endDate.localeCompare(b.endDate))[0];
    const lastDay = new Date(sample.endDate + "T00:00:00Z");
    const dayAfter = new Date(lastDay.getTime() + 24 * 60 * 60 * 1000);

    expect(
      upcomingEvents(lastDay).map((e) => e.slug),
      `${sample.slug} is still 'upcoming' on its own final day`
    ).toContain(sample.slug);

    expect(
      upcomingEvents(dayAfter).map((e) => e.slug),
      `${sample.slug} should drop off the day after it ends`
    ).not.toContain(sample.slug);
  });

  it("never lists an event whose window has already closed", () => {
    // The live index calls this with the real clock, so a stale event would
    // sit on the page advertising a date that has passed.
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const stale = upcomingEvents(now).filter((e) => e.endDate < today);
    expect(
      stale.map((e) => `${e.slug} ended ${e.endDate}`),
      "past events still showing as upcoming"
    ).toEqual([]);
  });

  it("returns events soonest first", () => {
    const dates = upcomingEvents(new Date("2025-01-01T00:00:00Z")).map((e) => e.startDate);
    expect(dates).toEqual([...dates].sort());
  });
});

describe("events copy is defined and translated in every locale", () => {
  const FIELDS = [
    "metaTitle", "metaDesc", "eyebrow", "heading", "sub", "confirmed",
    "estimated", "lunar", "bookAhead", "seeDepartures", "departuresHeading",
    "officialSource", "allEvents", "disclaimer",
  ];

  for (const loc of LOCALES) {
    it(`${loc} defines every events field`, () => {
      const dict = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      );
      const missing = FIELDS.filter((f) => !dict.events?.[f]);
      expect(missing, `dictionaries/${loc}.json missing events.*`).toEqual([]);
    });
  }

  it("non-English events copy is actually translated", () => {
    const en = JSON.parse(
      readFileSync(join(ROOT, "dictionaries", "en.json"), "utf8")
    ).events;
    const same: string[] = [];
    for (const loc of LOCALES.filter((l) => l !== "en")) {
      const d = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      ).events;
      for (const f of FIELDS) {
        if (d?.[f] && d[f] === en[f]) same.push(`${loc}.events.${f}`);
      }
    }
    expect(same, `untranslated events copy:\n  ${same.join("\n  ")}`).toEqual([]);
  });

  it("every locale keeps the {weeks} placeholder in bookAhead", () => {
    // The number lives in lib/events.ts; dropping the placeholder in
    // translation would render the sentence with no lead time at all.
    const broken: string[] = [];
    for (const loc of LOCALES) {
      const d = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      ).events;
      if (!d?.bookAhead?.includes("{weeks}")) broken.push(loc);
    }
    expect(broken, `bookAhead lost {weeks} in: ${broken.join(", ")}`).toEqual([]);
  });
});

/**
 * Event prose (name, blurb, description, dateNote) must be translated, not
 * fall back to English.
 *
 * This exact failure shipped twice in one week elsewhere in the codebase: 15
 * tour seoTitles and the entire review page rendered perfectly while serving
 * English to five of six locales, because a fallback is invisible. lib/
 * events.i18n.ts falls back to English by design, so only a test can tell the
 * difference between "translated" and "silently English".
 */
describe("event prose is translated in every locale", () => {
  const NON_EN = ["fr", "es", "de", "it", "ar"] as const;

  it("every event has copy for every non-English locale", () => {
    const missing: string[] = [];
    for (const e of EVENTS) {
      for (const loc of NON_EN) {
        if (!EVENT_COPY[e.slug]?.[loc]) missing.push(`${e.slug} [${loc}]`);
      }
    }
    expect(
      missing,
      "These events would render English prose in a non-English locale:\n  " +
        missing.join("\n  ")
    ).toEqual([]);
  });

  it("no translated sentence is byte-identical to English", () => {
    // Only prose. `name` and `shortName` are proper nouns and can legitimately
    // match: "Ramadan" is the same word in French, German and Italian, and
    // forcing a difference there would mean inventing a wrong translation.
    // A whole sentence matching English is always a missed translation.
    const same: string[] = [];
    for (const e of EVENTS) {
      for (const loc of NON_EN) {
        const copy = EVENT_COPY[e.slug]?.[loc];
        if (!copy) continue;
        for (const field of ["blurb", "description"] as const) {
          if (copy[field] === e[field]) same.push(`${e.slug}.${field} [${loc}]`);
        }
        // highlights and considerations are prose too, just in list form. They
        // were added after this test and would otherwise have been free to fall
        // back to English for all five locales -- which is exactly the failure
        // this suite exists to catch, since eventFor() spreads locale copy over
        // the English base and a missing array is invisible on the page.
        for (const field of ["highlights", "considerations"] as const) {
          const localised = copy[field];
          if (!localised) {
            same.push(`${e.slug}.${field} [${loc}] — missing, falls back to English`);
            continue;
          }
          localised.forEach((line, i) => {
            if (line === e[field][i]) same.push(`${e.slug}.${field}[${i}] [${loc}]`);
          });
        }
      }
    }
    expect(same, "untranslated event prose:\n  " + same.join("\n  ")).toEqual([]);
  });

  it("every locale keeps the same number of highlights and considerations", () => {
    // A locale with fewer lines than English is a half-finished translation:
    // the page renders a shorter list with no error, and nothing else notices.
    const drift: string[] = [];
    for (const e of EVENTS) {
      for (const loc of NON_EN) {
        const copy = EVENT_COPY[e.slug]?.[loc];
        if (!copy) continue;
        for (const field of ["highlights", "considerations"] as const) {
          const n = copy[field]?.length ?? 0;
          if (n !== e[field].length) {
            drift.push(`${e.slug}.${field} [${loc}]: ${n} vs ${e[field].length} in English`);
          }
        }
      }
    }
    expect(drift, "list length drifted from English:\n  " + drift.join("\n  ")).toEqual([]);
  });

  it("eventFor swaps prose but never the dates", () => {
    for (const e of EVENTS) {
      for (const loc of NON_EN) {
        const localised = eventFor(loc, e.slug);
        expect(localised?.startDate, `${e.slug} [${loc}] startDate drifted`).toBe(e.startDate);
        expect(localised?.endDate, `${e.slug} [${loc}] endDate drifted`).toBe(e.endDate);
        expect(localised?.confidence, `${e.slug} [${loc}] confidence drifted`).toBe(e.confidence);
        expect(localised?.tourSlugs, `${e.slug} [${loc}] tourSlugs drifted`).toEqual(e.tourSlugs);
      }
    }
  });

  it("an unconfirmed event has a TRANSLATED dateNote in every locale", () => {
    /**
     * Checking `eventFor(...).dateNote` for mere presence is not enough:
     * eventFor spreads the English base first, so a missing translation
     * inherits the English string and the field looks populated. That is
     * exactly how the untranslated seoTitles survived — a fallback reads as
     * success. Assert against EVENT_COPY, the translations themselves.
     */
    const problems: string[] = [];
    for (const e of EVENTS.filter((x) => x.confidence !== "confirmed")) {
      for (const loc of NON_EN) {
        const note = EVENT_COPY[e.slug]?.[loc]?.dateNote;
        if (!note) problems.push(`${e.slug} [${loc}] — no translated dateNote`);
        else if (note === e.dateNote) problems.push(`${e.slug} [${loc}] — still English`);
      }
    }
    expect(
      problems,
      "The dateNote is the warning that a date can still move. Falling back\n" +
        "to English drops it for exactly the readers least able to spot it:\n  " +
        problems.join("\n  ")
    ).toEqual([]);
  });
});
