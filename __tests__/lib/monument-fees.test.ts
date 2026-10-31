import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Monument ticket prices in blog prose must match the Ministry of Culture.
 *
 * Found 2026-11-01 while answering why AI assistants cite other sites for
 * "is Volubilis worth visiting": our Volubilis guide said entry is 70 dirhams,
 * in its SEO description, FAQ and practical section, in six languages, and the
 * Casablanca-to-Marrakech cost post repeated it. The Marrakech medina guide
 * said the same of the El Badi Palace and the Saadian Tombs. The ministry's
 * own ticket pages (e-services.minculture.gov.ma/en/tickets/<site>) charge a
 * foreign adult 100 Dh at all of them; 70 is the old price many guides still
 * print. AI answers quote our number, and a guest who budgets on it is short
 * at the gate.
 *
 * Nothing caught it: the number is valid TypeScript and the page builds.
 *
 * Fix a failure by correcting the post. If the ministry changes a price,
 * update ALLOWED with the date checked and keep the source URL.
 */

// Ministry of Culture ticket pages, checked 2026-11-01 (Bahia 2026-10-30).
// Foreign adult / foreign child 7-13 / Moroccan or resident adult / resident child.
const ALLOWED = new Set([100, 50, 30, 10]);
const SITES =
  /Volubilis|وليلي|El[ -]Badi|Badi(?:i)?[- ]Palast|Palais El Badi|Palacio El Badi|Palazzo El Badi|قصر البديع|Saadian Tombs|Tombeaux saadiens|Saadier-Gräber|Tumbas saad[ií]es|Tombe Saadiane|قبور السعديين|Bahia|الباهية/i;
// A dirham amount: "70 MAD", "70 dirhams", "70 Dirham", "70 Dh", "70 درهمًا".
const AMOUNT = /(\d{2,3})\s?(?:MAD|dirhams?|Dirham|Dh\b|درهم)/g;

const LIB = path.resolve(__dirname, "../../lib");
const POSTS = readdirSync(LIB)
  .filter((f) => /^blog(\.[a-z]{2}\.part\d)?\.ts$/.test(f))
  .map((f) => ({ file: f, text: readFileSync(path.join(LIB, f), "utf8") }));

describe("monument fees in blog posts", () => {
  it("quote the Ministry of Culture's ticket prices", () => {
    const wrong: string[] = [];
    for (const { file, text } of POSTS) {
      text.split("\n").forEach((line, i) => {
        // Look at each sentence or table cell that names one of the sites.
        for (const clause of line.split(/[.|;:—]\s|\s—|\|/)) {
          if (!SITES.test(clause)) continue;
          for (const m of clause.matchAll(AMOUNT)) {
            const n = Number(m[1]);
            if (!ALLOWED.has(n)) wrong.push(`${file}:${i + 1}: ${n} in "${clause.trim().slice(0, 90)}"`);
          }
        }
      });
    }
    expect(
      wrong,
      `Volubilis, El Badi, the Saadian Tombs and Bahia cost a foreign adult 100 Dh\n` +
        `(child 7-13: 50; Moroccan or resident: 30), per the Ministry of Culture.\n` +
        `Correct these, or update ALLOWED if the ministry has changed its prices:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });
});
