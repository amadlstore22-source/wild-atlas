import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MARKETS, marketPath } from "@/lib/markets";
import { MARKET_SLUG_BY_LANG } from "@/lib/market-slugs";
import { GUIDES } from "@/lib/guides";
import { translatePath } from "@/lib/locale-switch";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * "Morocco from <country>" pages (2026-09-28). They carry legal-sounding
 * facts -- passport rules, visa-free days, clock changes, airline routes --
 * where a wrong line costs a traveller a denied boarding, not a typo.
 *
 * What these tests hold:
 *  - Each page exists in exactly one locale and the language switcher, which
 *    only swaps the /xx/ prefix for untranslated routes, would otherwise send
 *    a visitor to /fr/travel-from/deutschland-... (a 404).
 *  - The competitor teardown that prompted these pages found 30 of Serenity
 *    Morocco Tours' 38 "tours from <country>" URLs returning 404 from their
 *    own sitemap. Every page here must resolve and be in the sitemap.
 *  - The Italian page must not promise an Italian-speaking guide: no guide
 *    profile lists Italian.
 *  - The Ramadan clock change quoted on every page is checked against the
 *    tz database, so a tzdata update that moves it fails here, not in a
 *    traveller's itinerary.
 */
const ROOT = join(__dirname, "..", "..");

describe("market pages", () => {
  it("one page per locale, matching the slug map the switcher uses", () => {
    const langs = MARKETS.map((m) => m.lang);
    expect(new Set(langs).size).toBe(langs.length);
    for (const m of MARKETS) expect(MARKET_SLUG_BY_LANG[m.lang]).toBe(m.slug);
    expect(Object.keys(MARKET_SLUG_BY_LANG).sort()).toEqual([...langs].sort());
  });

  it("cites an https source for every entry rule", () => {
    for (const m of MARKETS) {
      expect(m.entry.length, m.slug).toBeGreaterThan(0);
      for (const e of m.entry) expect(e.source.url, `${m.slug}: ${e.who}`).toMatch(/^https:\/\//);
    }
  });

  it("only claims guides for a language a guide profile actually lists", () => {
    for (const m of MARKETS) {
      const speakers = GUIDES.filter((g) => g.languages.includes(m.guideLanguage));
      if (speakers.length === 0) {
        // The fallback line is what renders; it must not name the language as spoken.
        // "…non italiano" (not Italian) is the honest line; any other mention
        // of the language would read as a promise.
        expect(m.guidesNo.replace(/non italiano/i, ""), m.slug).not.toMatch(/italian/i);
      } else {
        expect(m.guidesYes, m.slug).toContain("{names}");
      }
    }
    expect(GUIDES.some((g) => g.languages.includes("Italian")), "an Italian speaker now exists: update the Italian page").toBe(false);
  });

  it("keeps titles and descriptions inside Google's display limits", () => {
    for (const m of MARKETS) {
      // The layout template appends " | Marrakech Eco Tours"; the WHOLE title
      // must fit, or Google truncates the part that says which country.
      const full = `${m.metaTitle} | Marrakech Eco Tours`;
      expect(full.length, full).toBeLessThanOrEqual(60);
      expect(m.metaDescription.length, m.slug).toBeLessThanOrEqual(160);
    }
  });

  it("the language switcher never lands on another locale's market slug", () => {
    const all: Locale[] = ["en", "fr", "de", "es", "it", "ar"];
    for (const m of MARKETS) {
      for (const to of all) {
        const out = translatePath(marketPath(m), m.lang, to);
        const own = MARKET_SLUG_BY_LANG[to];
        expect(out, `${m.slug} -> ${to}`).toBe(own ? `/${to}/travel-from/${own}` : `/${to}`);
      }
    }
  });

  it("is in the sitemap and linked from the footer", () => {
    expect(readFileSync(join(ROOT, "app", "sitemap.ts"), "utf8")).toContain("...marketUrls");
    expect(readFileSync(join(ROOT, "components", "layout", "Footer.tsx"), "utf8")).toContain("marketsIn(lang)");
  });

  it("quotes the Ramadan clock change the tz database actually has", () => {
    const offset = (iso: string) => {
      const p = new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Casablanca", timeZoneName: "shortOffset" })
        .formatToParts(new Date(iso))
        .find((x) => x.type === "timeZoneName")!.value;
      return p === "GMT" ? 0 : Number(p.replace("GMT", ""));
    };
    // Pages say: UTC+0 from 7 February to 14 March 2027, UTC+1 otherwise.
    expect(offset("2027-02-06T12:00:00Z")).toBe(1);
    expect(offset("2027-02-08T12:00:00Z")).toBe(0);
    expect(offset("2027-03-13T12:00:00Z")).toBe(0);
    expect(offset("2027-03-15T12:00:00Z")).toBe(1);
  });

  it("promises the same reply time as the rest of the site", () => {
    for (const m of MARKETS) expect(m.ctaBody, m.slug).not.toMatch(/\b24\b/);
  });
});
