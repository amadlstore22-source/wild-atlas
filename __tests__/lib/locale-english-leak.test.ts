import { describe, it, expect } from "vitest";
import { TOURS, type Tour } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * A LOCALE PAGE THAT RENDERS ENGLISH PROSE
 *
 * The user changed the site to Spanish, and /es/tours/desierto-zagora-2-dias-
 * compartido came back fully Spanish — navigation, headings, price box — with
 * an English day-by-day itinerary sitting in the middle of it. That itinerary
 * is the longest block of prose on a booking page.
 *
 * Measured before fixing: 40 itinerary days and 1,060 highlights/includes/
 * excludes bullets across fr/es/de/it/ar were byte-identical to English. The
 * "What's included" list sits directly under the price, so a Spanish reader
 * decided whether to book from an English list of what they were buying.
 *
 * WHY NOTHING CAUGHT IT
 * locale-content-integrity.test.ts guards the `itinerary: []` trap — a locale
 * supplying an EMPTY array, which passes mergeWithEn's undefined/null/"" guard
 * and silently drops the English fallback. That is the same family of bug, one
 * step further on: a locale supplying the ENGLISH STRING passes every check
 * too. Empty renders nothing; English renders the wrong language. Both
 * type-check, both build, both render a valid page.
 *
 * The itinerary leak came in with commit a23a1b3, which added five shared
 * departures and copied their itineraries into all five locale files instead of
 * translating them. Nobody would notice unless they read a locale page in a
 * language they speak.
 *
 * WHAT THIS ASSERTS
 * No translated locale may serve a long prose string that is byte-identical to
 * English. Catalogue-wide, per AGENTS.md — the next tour added is the one
 * nobody will check.
 *
 * THE THRESHOLD IS NOT COSMETIC
 * Short strings are excluded because they are legitimately identical across
 * languages: "Marrakech", "4x4", "Erg Chebbi", "UNESCO". Flagging those would
 * bury the real leaks in noise and get the test deleted. 25 characters is long
 * enough to be a sentence or a real bullet, short enough to catch every case
 * measured above.
 */

const LOCALES: Exclude<Locale, "en">[] = ["fr", "es", "de", "it", "ar"];

/** Below this, a match is a proper noun or a unit, not a translation failure. */
const MIN_LEN = 25;

/**
 * A route line is a chain of place names — "Agadir → Essaouira → Agadir",
 * "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt". Those are correct in
 * all six languages and identical by definition, but the arrows make them long
 * enough to clear MIN_LEN, so the first version of this test reported 52 of
 * them as untranslated. They are the one place where byte-identical is the
 * right answer.
 *
 * KNOWN LIMIT, stated rather than papered over: the rule matches any
 * capitalised word between arrows, so "Sunrise → Marrakech" would also be
 * exempted even though "Sunrise" must be translated. That exact string WAS a
 * real leak on the shared Zagora tour and is now fixed, so nothing is hidden
 * today — but a future English day titled "Sunrise → somewhere" would slip
 * past. Tightening it would need a place-name list, which drifts as tours are
 * added; the trade is deliberate. Descriptions are the long prose and are
 * still fully checked.
 */
function isRouteLine(s: string): boolean {
  if (!s.includes("→")) return false;
  return s
    .split("→")
    .every((part) => /^[\p{Lu}][\p{L}\p{M}'’\-. ]*$/u.test(part.trim()));
}

const bySlug = new Map(TOURS.map((t) => [t.slug, t]));

type Leak = { locale: string; slug: string; field: string; text: string };

function collect(): Leak[] {
  const leaks: Leak[] = [];

  for (const locale of LOCALES) {
    for (const tour of toursFor(locale)) {
      const en = bySlug.get(tour.slug);
      if (!en) continue;

      const same = (a?: string, b?: string) =>
        !!a && !!b && a === b && a.length >= MIN_LEN && !isRouteLine(a);

      const push = (field: string, text: string) =>
        leaks.push({ locale, slug: tour.slug, field, text });

      // Single strings.
      for (const field of ["title", "shortDescription", "description", "seoTitle", "seoDescription"] as const) {
        if (same(tour[field] as string | undefined, en[field] as string | undefined)) {
          push(field, tour[field] as string);
        }
      }

      // Bullet lists rendered on the booking page, right under the price.
      for (const field of ["highlights", "includes", "excludes"] as const) {
        const a = (tour[field] ?? []) as string[];
        const b = (en[field] ?? []) as string[];
        if (a.length !== b.length) continue;
        a.forEach((x, i) => {
          if (same(x, b[i])) push(field, x);
        });
      }

      // The itinerary — the longest prose block on the page, and where this
      // was actually spotted.
      const ai = tour.itinerary ?? [];
      const bi = en.itinerary ?? [];
      if (ai.length === bi.length) {
        ai.forEach((day, i) => {
          if (same(day.title, bi[i]?.title)) push(`itinerary[${i}].title`, day.title);
          if (same(day.description, bi[i]?.description)) {
            push(`itinerary[${i}].description`, day.description);
          }
        });
      }
    }
  }

  return leaks;
}

describe("locale pages never render English prose", () => {
  it("has locales to check — guards against the filter going empty", () => {
    expect(LOCALES.length).toBeGreaterThan(0);
    expect(toursFor("es").length, "toursFor('es') returned nothing").toBeGreaterThan(0);
  });

  it("no tour serves a string identical to English in any locale", () => {
    const leaks = collect();

    // Group by locale+field so the message is readable when a whole file drifts.
    const summary = leaks.slice(0, 25).map(
      (l) => `${l.locale} · ${l.slug} · ${l.field}: "${l.text.slice(0, 60)}"`,
    );
    const more = leaks.length > 25 ? `\n  …and ${leaks.length - 25} more` : "";

    expect(
      leaks.length,
      `${leaks.length} strings are byte-identical to English on a translated\n` +
        `locale page. A visitor who switched the site to that language is\n` +
        `reading English — most damagingly in the "What's included" list, which\n` +
        `sits directly under the price.\n\n` +
        `Translate these in lib/tours.<locale>.ts. Do NOT delete the value to\n` +
        `fall back to English: mergeWithEn treats any non-empty value as\n` +
        `supplied, so the fallback never fires.\n  ` +
        summary.join("\n  ") + more,
    ).toBe(0);
  });

  it("keeps every locale's itinerary the same length as English", () => {
    // A locale that drops days renders a shorter trip than the one being sold.
    // Related to the `itinerary: []` trap, but catches partial loss too.
    const wrong: string[] = [];
    for (const locale of LOCALES) {
      for (const tour of toursFor(locale)) {
        const en = bySlug.get(tour.slug);
        if (!en) continue;
        const a = tour.itinerary?.length ?? 0;
        const b = en.itinerary?.length ?? 0;
        if (a !== b) wrong.push(`${locale} · ${tour.slug}: ${a} days vs ${b} in English`);
      }
    }
    expect(
      wrong,
      `These locales render a different number of itinerary days than English,\n` +
        `so the trip described is not the trip being sold:\n  ` + wrong.join("\n  "),
    ).toEqual([]);
  });

  it("keeps every locale's includes/excludes the same length as English", () => {
    // A locale silently dropping an "excludes" bullet promises something the
    // English page explicitly says is not included.
    const wrong: string[] = [];
    for (const locale of LOCALES) {
      for (const tour of toursFor(locale)) {
        const en = bySlug.get(tour.slug);
        if (!en) continue;
        for (const field of ["includes", "excludes", "highlights"] as const) {
          const a = ((tour[field] ?? []) as string[]).length;
          const b = ((en[field] ?? []) as string[]).length;
          if (a !== b) {
            wrong.push(`${locale} · ${tour.slug} · ${field}: ${a} vs ${b} in English`);
          }
        }
      }
    }
    expect(
      wrong,
      `These locales list a different number of items than English. An\n` +
        `"excludes" bullet lost in translation promises something the English\n` +
        `page says is extra:\n  ` + wrong.join("\n  "),
    ).toEqual([]);
  });
});

/** Keeps the Tour type referenced so a field rename surfaces here too. */
export type _TourShape = Pick<Tour, "highlights" | "includes" | "excludes" | "itinerary">;
