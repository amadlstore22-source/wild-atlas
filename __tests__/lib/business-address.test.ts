import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/constants";

/**
 * One address, everywhere. Google compares the business address in structured
 * data with the one printed on the page (name/address/phone consistency), and
 * until 2026-09-28 the schema said "Marrakech" with a city-centre point while
 * the owner's actual base is Imlil. SITE.postalAddress is now the only source;
 * these tests stop a hardcoded copy creeping back in.
 */
const ROOT = join(__dirname, "..", "..");
const read = (...p: string[]) => readFileSync(join(ROOT, ...p), "utf8");

describe("business address", () => {
  it("is Imlil, with no invented house number", () => {
    expect(SITE.postalAddress.addressLocality).toBe("Imlil");
    expect(SITE.postalAddress.postalCode).toBe("42152");
    expect(SITE.postalAddress.streetAddress).not.toMatch(/\d+\s*,|\bNo\.?\s*\d/);
  });

  it("uses Google's recommended 5-decimal coordinates", () => {
    for (const v of [SITE.geo.latitude, SITE.geo.longitude]) {
      expect(String(v).split(".")[1]?.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("comes from SITE in both business schema nodes", () => {
    for (const f of [["app", "[lang]", "page.tsx"], ["app", "[lang]", "about", "page.tsx"]]) {
      const src = read(...f);
      expect(src).toContain("...SITE.postalAddress");
      expect(src).not.toMatch(/addressLocality:\s*"/);
    }
  });

  it("is not hardcoded as the old city on visible pages", () => {
    for (const f of [
      ["components", "layout", "Footer.tsx"],
      ["app", "[lang]", "contact", "page.tsx"],
      ["app", "[lang]", "terms", "page.tsx"],
      ["app", "[lang]", "privacy", "page.tsx"],
    ]) {
      expect(read(...f), f.join("/")).not.toContain("Marrakech, Morocco");
    }
  });

  it("derives priceRange from the catalogue rather than typing it", () => {
    expect(read("app", "[lang]", "page.tsx")).toMatch(/priceRange: PRICE_RANGE/);
  });
});
