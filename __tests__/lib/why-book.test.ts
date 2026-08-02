import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

const dict = (lc: string) =>
  JSON.parse(
    readFileSync(join(__dirname, "..", "..", "dictionaries", `${lc}.json`), "utf-8")
  );

/**
 * WhyBookWithUs renders on all 432 blog URLs. A key missing from one locale
 * prints "undefined" on 72 live pages, and nothing in the build fails — the
 * component happily renders undefined into the DOM. So the guard has to be a
 * test.
 */
describe("whyBook dictionary", () => {
  const KEYS = [
    "title",
    "intro",
    "licensed",
    "licensedSub",
    "ratingSub",
    "local",
    "localSub",
    "noPrepay",
    "noPrepaySub",
    "fastReply",
    "fastReplySub",
    "browseTours",
    "askQuestion",
  ];

  it("exists in every locale with every key non-empty", () => {
    for (const lc of LOCALES) {
      const wb = dict(lc).whyBook;
      expect(wb, `${lc}: whyBook block missing`).toBeDefined();
      for (const k of KEYS) {
        expect(typeof wb[k], `${lc}.whyBook.${k} is not a string`).toBe("string");
        expect(wb[k].trim().length, `${lc}.whyBook.${k} is empty`).toBeGreaterThan(0);
      }
    }
  });

  it("has no extra or missing keys relative to English", () => {
    const en = Object.keys(dict("en").whyBook).sort();
    for (const lc of LOCALES) {
      expect(Object.keys(dict(lc).whyBook).sort(), `${lc} key set differs`).toEqual(en);
    }
  });

  it("keeps the placeholders the component substitutes", () => {
    // The component does a literal .replace() on these. A translator dropping
    // or renaming one leaves the raw token visible on the page.
    const required: Record<string, string> = {
      ratingSub: "{count}",
      localSub: "{years}",
      noPrepaySub: "{days}",
      fastReplySub: "{hours}",
    };
    for (const lc of LOCALES) {
      const wb = dict(lc).whyBook;
      for (const [key, token] of Object.entries(required)) {
        expect(wb[key], `${lc}.whyBook.${key} lost ${token}`).toContain(token);
      }
    }
  });

  it("leaves no unsubstituted placeholder in other whyBook strings", () => {
    // Any {token} in a key the component does NOT substitute would ship raw.
    const substituted = new Set(["ratingSub", "localSub", "noPrepaySub", "fastReplySub"]);
    for (const lc of LOCALES) {
      for (const [k, v] of Object.entries(dict(lc).whyBook as Record<string, string>)) {
        if (substituted.has(k)) continue;
        expect(v, `${lc}.whyBook.${k} contains an unsubstituted placeholder`).not.toMatch(
          /\{[a-z]+\}/i
        );
      }
    }
  });
});
