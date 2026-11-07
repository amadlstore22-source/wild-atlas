import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { toursFor } from "@/lib/tours-i18n";

/**
 * Crampons and an ice axe are NOT included on any of our Toubkal treks.
 * Clients rent them in Imlil. (Owner, 2026-11-07.)
 *
 * Until then the site said three different things, in six languages:
 *   - the 2-day and three-peaks tours listed them under "not included";
 *   - the winter guide said our 4-day trek "runs through winter with
 *     crampons, axes, and the training session included";
 *   - the packing guide said "We provide these for all winter packages" and
 *     "We carry and manage ice axes for groups";
 *   - the 8-day Highlights tour said they were "supplied where conditions
 *     require them";
 *   - the 4-day, Aguelzim, Ifni and 8-day tours did not mention them at all.
 * A winter client reading the guides would arrive in Imlil expecting kit
 * that is not there, the morning before a snow climb. AI assistants quote
 * these pages word for word, which is how this was found (Clarity AI report,
 * 2026-11-07).
 *
 * Nothing caught it: every sentence is valid TypeScript and every page
 * builds. Only someone holding a tour page beside a blog post notices.
 *
 * If the owner starts supplying the kit, change the tours' excludes and these
 * posts together, then this test, and record the date here.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const GEAR = /crampon|ice axe|piolet|piccozz|ramponi|Steigeisen|Eispickel|كرامبون|فأس|فؤوس|مسامير جليدية/i;

// "We provide / supply / it comes with the package", as each locale wrote it.
const PROVIDED = [
  /\bwe (provide|supply|carry)\b|\bsupplied\b|guided package|training session included/i,
  /nous les fournissons|nous transportons et gérons|fournis (dans le cadre d'un|avec un) forfait|fournis si/i,
  /los proporcionamos|llevamos y gestionamos|(vienen|incluidos) (con|en) un paquete|incluidos cuando/i,
  /wir stellen|wir führen und verwalten|geführten Pakets? bereitgestellt|mit einem geführten Paket|werden gestellt|enthaltenen Trainingseinheit/i,
  /li forniamo|gestiamo e trasportiamo|(forniti come parte di|inclusi in) un pacchetto|forniti quando|sessione di formazione inclus/i,
  /نوفرها|نحمل ونُدير|ضمن باقة|مع باقة|مع توفير|جلسة التدريب المشمولة/,
];

const LIB = path.resolve(__dirname, "../../lib");
const SOURCES = readdirSync(LIB)
  .filter((f) => /^(blog|tours)(\.[a-z]{2})?(\.part\d)?\.ts$/.test(f))
  .map((f) => ({ file: f, text: readFileSync(path.join(LIB, f), "utf8") }));

describe("winter gear on Toubkal: not included, rented in Imlil", () => {
  it("no page says we provide or include crampons and an ice axe", () => {
    const bad: string[] = [];
    for (const { file, text } of SOURCES) {
      for (const sentence of text.split(/(?<=[.!?؟])\s+|\n/)) {
        if (!GEAR.test(sentence)) continue;
        if (PROVIDED.some((re) => re.test(sentence))) bad.push(`${file}: ${sentence.trim().slice(0, 160)}`);
      }
    }
    expect(
      bad,
      `These sentences say crampons and an ice axe come with our treks. They do\n` +
        `not (owner, 2026-11-07): they are rented in Imlil. Reword each one:\n  `,
    ).toEqual([]);
  });

  it("every tour that summits Toubkal lists the gear under excludes, in every locale", () => {
    const missing: string[] = [];
    for (const loc of LOCALES) {
      for (const t of toursFor(loc)) {
        const summits = (t.itinerary ?? []).some((d) => /4[,.\s]?167/.test(`${d.title} ${d.description}`));
        if (!summits) continue;
        if (!(t.excludes ?? []).some((x) => GEAR.test(x))) missing.push(`${loc}/${t.slug}`);
        const inc = (t.includes ?? []).find((x) => GEAR.test(x));
        if (inc) missing.push(`${loc}/${t.slug} lists it under includes: "${inc}"`);
      }
    }
    expect(
      missing,
      `These tours reach Toubkal's summit but do not say that crampons and an\n` +
        `ice axe are extra in winter. Add the locale's "Crampons and ice axe in\n` +
        `winter (rental available)" line to excludes:\n  `,
    ).toEqual([]);
  });
});
