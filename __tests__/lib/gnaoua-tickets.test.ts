import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Until 2026-10-20 the Gnaoua festival page, its highlights and three blog
 * posts told readers, in all six languages, that the festival "is free ... no
 * ticket, no venue". It is not. Le360 (27 June 2026) reported the 2026 prices:
 * Moulay Hassan main stage 400-600 MAD a night or 1,200 MAD for three days,
 * the beach stage 300 MAD, Dar Souiri and the zaouias 250 MAD, with free
 * badges kept for sponsors, press, partners, artists and teams. The official
 * site (festival-gnaoua.net) sells tickets through guichet.com.
 *
 * A traveller who believed us would turn up without a ticket. Nothing caught
 * it: the sentence is valid copy in every locale and only someone who checked
 * the festival's own site would notice. It also had to be fixed in ~25 places,
 * because each translation carried its own copy.
 */
const LIB = join(__dirname, "..", "..", "lib");
const FREE = /\bfree\b|gratuit|gratis|kostenlos|eintritt (?:ist )?frei|مجان/i;
const GNAOUA = /gnaoua|gnawa|كناوة/i;

describe("the Gnaoua festival is not described as free", () => {
  it("no 'free' wording within a paragraph of a Gnaoua mention, any locale", () => {
    const hits: string[] = [];
    for (const f of readdirSync(LIB).filter((n) => n.endsWith(".ts"))) {
      const s = readFileSync(join(LIB, f), "utf8");
      for (const m of s.matchAll(new RegExp(FREE.source, "gi"))) {
        const i = m.index ?? 0;
        if (GNAOUA.test(s.slice(Math.max(0, i - 300), i + 300))) {
          hits.push(`lib/${f}:${s.slice(0, i).split("\n").length}: …${s.slice(Math.max(0, i - 60), i + 40).replace(/\s+/g, " ")}…`);
        }
      }
    }
    expect(
      hits,
      `The festival's stages are ticketed (2026: main stage 400-600 MAD a night). Reword these;\n` +
        `if a hit is unrelated to the festival (free cancellation, say), rephrase or move it:\n  ${hits.join("\n  ")}`,
    ).toEqual([]);
  });
});
