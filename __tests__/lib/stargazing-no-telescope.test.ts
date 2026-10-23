import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The Merzouga stargazing tour has no telescope and no guided stargazing
 * session (owner, 2026-10-23): guests enjoy the dark sky at camp on their own.
 * Until then the page in all six languages sold "a telescope session with an
 * astronomy guide", in the description, highlights, includes, itinerary, price
 * paragraph and Google description, while its own FAQ said it was naked-eye.
 *
 * Rules for this tour's block in every language: no astronomy guide, and any
 * sentence that names a telescope must say there is none.
 */
const LIB = join(process.cwd(), "lib");
const SLUG = "merzouga-stargazing-desert-tour";
const TELESCOPE = /telescop|Teleskop|télescope|تلسكوب/i;
const NEGATION = /\b(no|ni|sans|sin|weder|ohne|non|né|senza)\b|لا |دون/i;
const ASTRO_GUIDE = /astronomy guide|guide astronome|guía (astrónomo|de astronomía)|Astronomie-Guide|guida astronom|مرشد فلكي|المرشد الفلكي/i;

function block(file: string): string {
  const s = readFileSync(join(LIB, file), "utf8");
  const i = s.indexOf(`slug: "${SLUG}"`);
  expect(i, `${file} has the tour`).toBeGreaterThan(-1);
  const j = s.indexOf("\n  {\n", i);
  return s.slice(i, j > 0 ? j : s.length);
}

const FILES = ["tours.ts", "tours.fr.ts", "tours.es.ts", "tours.de.ts", "tours.it.ts", "tours.ar.ts"];

describe("Merzouga stargazing tour promises no telescope or guided session", () => {
  it.each(FILES)("%s", (file) => {
    const b = block(file).replace(/q: "(?:[^"\\]|\\.)*"/g, "");
    expect(b.match(ASTRO_GUIDE)?.[0] ?? null, "no astronomy guide on this tour").toBeNull();
    const promises = b
      .split(/[.;:!?؛\n]/)
      .filter((sentence) => TELESCOPE.test(sentence) && !NEGATION.test(sentence))
      .map((sentence) => sentence.trim());
    expect(promises, "a sentence names a telescope without saying there is none").toEqual([]);
  });

  it.each(["fr", "es", "de", "it", "ar"])("tour-includes.%s.ts lists no telescope", (lang) => {
    const s = readFileSync(join(LIB, `tour-includes.${lang}.ts`), "utf8");
    const i = s.indexOf(`"${SLUG}": {`);
    expect(i).toBeGreaterThan(-1);
    expect(TELESCOPE.test(s.slice(i, s.indexOf("\n  },", i)))).toBe(false);
  });
});
