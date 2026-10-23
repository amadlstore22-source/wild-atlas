import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PREFERRED_SOURCE_URL } from "@/lib/preferred-source";

/**
 * The "add us as a preferred source on Google" link (2026-10-23) only works
 * for a whole domain: Google's tool lists marrakechecotours.com, not pages or
 * folders, so a link built from a page URL would open an empty search. The
 * wording lives in six dictionaries, and a missing key renders as nothing with
 * no build error, so both are pinned here.
 */
describe("Google preferred-source link", () => {
  it("queries the bare domain on Google's preferences page", () => {
    const u = new URL(PREFERRED_SOURCE_URL);
    expect(u.origin + u.pathname).toBe("https://www.google.com/preferences/source");
    expect(u.searchParams.get("q")).toBe("marrakechecotours.com");
  });

  it("every language has the article box and footer wording", () => {
    const missing: string[] = [];
    for (const lang of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(__dirname, "..", "..", "dictionaries", `${lang}.json`), "utf8"));
      for (const k of ["preferredSourceTitle", "preferredSourceBody", "preferredSourceCta"]) if (!d.blog?.[k]) missing.push(`${lang}: blog.${k}`);
      if (!d.footer?.preferredSource) missing.push(`${lang}: footer.preferredSource`);
    }
    expect(missing, "add these keys to dictionaries/<lang>.json").toEqual([]);
  });
});
