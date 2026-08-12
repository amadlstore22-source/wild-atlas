import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Tipping guidance must be per-day and per-role, never a percentage of the
 * trip price.
 *
 * The site used to give both: the desert posts quoted fixed MAD amounts, the
 * Toubkal posts quoted "10–15% of the trip cost". A reader comparing the two
 * got contradictory advice, and the percentage scaled the wrong way — the same
 * 2-day trek is €350 for one walker and €153 each at six, so a percentage
 * would have paid the guide more than twice as much for the solo booking, for
 * identical work on identical ground.
 *
 * French wrote it as "10 à 15 %", which is why the first sweep missed eleven
 * instances: matching only the digit form is not enough.
 */
const PERCENT_FORMS = [
  /10\s*[–-]\s*15\s*%/,
  /10\s+à\s+15\s*%/,
  /10\s+a\s+15\s*%/,
  /10\s+bis\s+15\s*%/,
  /10\s+e\s+15\s*%/,
];

describe("tipping guidance", () => {
  const files = readdirSync("lib").filter((f) => /^blog(\.[a-z]{2})?(\.part\d)?\.ts$/.test(f));

  it("covers every blog corpus file", () => {
    // Guards the glob itself: a renamed corpus file would otherwise make this
    // suite silently pass by checking nothing.
    expect(files.length).toBeGreaterThanOrEqual(6);
  });

  it("never expresses a tip as a percentage of the trip price", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(join("lib", file), "utf8");
      const lines = src.split("\n");
      lines.forEach((line, i) => {
        if (PERCENT_FORMS.some((re) => re.test(line))) {
          offenders.push(`${file}:${i + 1}  ${line.trim().slice(0, 90)}`);
        }
      });
    }
    expect(
      offenders,
      `Percentage-based tipping guidance found:\n  ${offenders.join("\n  ")}`
    ).toEqual([]);
  });
});
