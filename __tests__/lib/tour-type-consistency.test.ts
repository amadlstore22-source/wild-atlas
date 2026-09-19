import { describe, it, expect } from "vitest";
import { TOURS, type Tour } from "@/lib/tours";
import { TOURS as TOURS_FR } from "@/lib/tours.fr";
import { TOURS as TOURS_ES } from "@/lib/tours.es";
import { TOURS as TOURS_DE } from "@/lib/tours.de";
import { TOURS as TOURS_IT } from "@/lib/tours.it";
import { TOURS as TOURS_AR } from "@/lib/tours.ar";

/**
 * A PRIVATE TOUR THAT TOLD CUSTOMERS IT WAS SHARED.
 *
 * THE INCIDENT (found 2026-09-19).
 *
 * Two tours carried `tourType: "private"`, a private per-group-size price
 * ladder and — on ourika-valley-day-hike — the seoTitle "Private Ourika Valley
 * Day Trip", while their own FAQ answered the group-size question with:
 *
 *   ourika-valley-day-hike   "It is a shared day tour, so you may walk with
 *                            others."
 *   sous-massa-national-park "a small shared group"
 *
 * In all six locales. Private and shared are different products at different
 * prices, and the FAQ sits on the booking page: a customer paying the private
 * rate read that they would be walking with strangers. We were quoting a
 * 14-person private Ourika booking off that page at the time.
 *
 * WHY NOTHING CAUGHT IT. `tourType` drives the badge, the schema and the
 * price ladder; the FAQ is free prose. Nothing compared them. Both values are
 * valid on their own, the page renders, and shared-tours.test.ts checks the
 * shared catalogue's own integrity rather than whether a PRIVATE tour
 * describes itself as shared.
 *
 * WHAT THIS ASSERTS. A tour's prose may not contradict its own `tourType`, in
 * any of the six catalogues. Checked per locale because the contradiction was
 * translated faithfully into all five — a fix in English alone would have left
 * five language versions still wrong, which is the exact shape of the
 * coordinate and meals incidents before it.
 *
 * IF THIS FAILS: decide which is true — the field or the sentence — and make
 * the other match. Do not soften the pattern; "shared group" on a private tour
 * is the bug, not the detector.
 */

const CATALOGUES: [string, Tour[]][] = [
  ["en", TOURS],
  ["fr", TOURS_FR],
  ["es", TOURS_ES],
  ["de", TOURS_DE],
  ["it", TOURS_IT],
  ["ar", TOURS_AR],
];

/**
 * "Shared" as a claim about THIS tour's group, per language. Deliberately
 * narrow: a private tour may legitimately mention the shared alternative
 * ("the shared version costs less"), and several FAQs do exactly that, so the
 * pattern requires the word attached to a group/tour noun rather than the word
 * alone.
 */
const SAYS_SHARED: Record<string, RegExp> = {
  en: /\b(shared (day )?(tour|trip|group|departure|minibus|basis)|group is shared|share (the )?(vehicle|minibus) with other)/i,
  fr: /(groupe partag|excursion partag|circuit partag|en groupe partag|partagez le (v[ée]hicule|minibus) avec d'autres)/i,
  es: /(grupo compartido|excursi[óo]n compartida|tour compartido|comparte el (veh[íi]culo|minib[úu]s) con otr)/i,
  de: /(geteilte[rn]? Gruppe|Gruppenreise mit anderen|teilen sich das Fahrzeug mit anderen|Sammel(tour|minibus))/i,
  it: /(gruppo condiviso|escursione condivisa|tour condiviso|condivide il (veicolo|minibus) con altri)/i,
  ar: /(مجموعة مشتركة|رحلة مشتركة|جولة مشتركة)/,
};

/** The mirror case: a shared departure claiming to be private. */
const SAYS_PRIVATE: Record<string, RegExp> = {
  en: /\b(this is a private|it is a private|the tour is private|fully private) (day )?(tour|trip|departure)\b/i,
  fr: /(l'excursion est priv[ée]e|le circuit est priv[ée]|il s'agit d'une excursion priv[ée]e)/i,
  es: /(la excursi[óo]n es privada|el tour es privado|se trata de un tour privado)/i,
  de: /(die Tour ist privat|es handelt sich um eine private Tour)/i,
  it: /(l'escursione [èe] privata|il tour [èe] privato)/i,
  ar: /(الرحلة خاصة|الجولة خاصة)/,
};

/** Every free-prose field a customer reads on the tour page. */
function proseOf(t: Tour): string {
  const faq = (t.faq ?? []).map((f) => `${f.q} ${f.a}`).join(" ");
  const itinerary = (t.itinerary ?? [])
    .map((d) => `${d.title ?? ""} ${d.description ?? ""}`)
    .join(" ");
  return [t.shortDescription, t.description, faq, itinerary, ...(t.highlights ?? [])]
    .filter(Boolean)
    .join(" ");
}

/**
 * `tourType` is NOT repeated in the locale catalogues — it is inherited from
 * English through mergeWithEn, so `t.tourType` is undefined on every locale
 * record. The first version of this test filtered on it directly and was
 * therefore vacuous for five of the six catalogues: it silently tested nothing
 * outside English, and only reintroducing the German bug on purpose exposed
 * that. Always resolve the type from the English record by slug.
 */
const TYPE_OF = new Map(TOURS.map((t) => [t.slug, t.tourType]));

describe("tour prose matches its own tourType", () => {
  for (const [lang, tours] of CATALOGUES) {
    it(`${lang}: no private tour describes itself as shared`, () => {
      const offenders = tours
        .filter(
          (t) =>
            TYPE_OF.get(t.slug) === "private" && SAYS_SHARED[lang].test(proseOf(t)),
        )
        .map((t) => t.slug);

      expect(
        offenders,
        `lib/tours${lang === "en" ? "" : "." + lang}.ts: these are ` +
          `tourType "private" but their own copy calls the group shared:\n  ` +
          offenders.join("\n  ") +
          `\n\nPrivate and shared are different products at different prices, ` +
          `and this text sits on the booking page. Fix the sentence, or fix ` +
          `tourType — and apply it in all six catalogues.`,
      ).toEqual([]);
    });

    it(`${lang}: no shared tour describes itself as private`, () => {
      const offenders = tours
        .filter(
          (t) =>
            TYPE_OF.get(t.slug) === "shared" && SAYS_PRIVATE[lang].test(proseOf(t)),
        )
        .map((t) => t.slug);

      expect(
        offenders,
        `lib/tours${lang === "en" ? "" : "." + lang}.ts: these are ` +
          `tourType "shared" but their own copy calls the tour private:\n  ` +
          offenders.join("\n  "),
      ).toEqual([]);
    });
  }
});
