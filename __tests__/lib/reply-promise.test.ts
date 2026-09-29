import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/constants";

/**
 * The site promised replies "within 24 hours" in eleven places per language
 * (hero trust line, booking sidebar, enquiry confirmation, contact page, How
 * we operate...). On 2026-09-28 the owner said enquiries are answered in under
 * an hour, and a 24-hour promise undersells the one thing a small operator
 * beats the booking platforms on. Serenity Morocco Tours, a competitor,
 * leads with "free itinerary in 24 hours".
 *
 * The wording is spread across six dictionaries, so one missed string would
 * leave a page contradicting the rest. This checks all of them at once.
 */
const LANGS = ["en", "fr", "de", "es", "it", "ar"];
const ROOT = join(__dirname, "..", "..");

function strings(o: unknown, path: string[] = []): [string, string][] {
  if (typeof o === "string") return [[path.join("."), o]];
  if (o && typeof o === "object") return Object.entries(o).flatMap(([k, v]) => strings(v, [...path, k]));
  return [];
}

describe("reply-time promise", () => {
  it("is one hour", () => {
    expect(SITE.responseHours).toBe(1);
  });

  it("no dictionary still promises a 24-hour reply or an {hours} template", () => {
    const REPLY = /(repl|respon|antwort|réponse|risposta|respuesta|الرد|نرد|يُردّ)/i;
    const bad: string[] = [];
    for (const lang of LANGS) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${lang}.json`), "utf8"));
      for (const [k, v] of strings(d)) {
        if (/weather|faq|cancel/i.test(k)) continue;
        if (v.includes("{hours}") || (REPLY.test(v) && /\b24\b/.test(v))) bad.push(`${lang}:${k}`);
      }
    }
    expect(bad, "reword these to 'within the hour, 8:00–20:00 Morocco time'").toEqual([]);
  });

  /**
   * The dictionary check above missed three English strings written straight
   * into code, found 2026-09-29 while testing the enquiry form: the guest's
   * confirmation email said "within 1 hours" (a template built for 24), the
   * success toast still said "within 24 hours", and the Terms page said "We
   * reply within 1 hours". The confirmation email is the first thing a new
   * lead reads from us.
   */
  it("no code-level string promises 24 hours or builds 'N hours' from responseHours", () => {
    const FILES = [
      "app/api/contact/route.ts",
      "hooks/useFormSubmit.ts",
      "app/[lang]/terms/page.tsx",
      "app/[lang]/contact/page.tsx",
      "components/tours/BookingSidebar.tsx",
    ];
    const bad: string[] = [];
    for (const f of FILES) {
      const src = readFileSync(join(ROOT, f), "utf8");
      if (/responseHours\}?\s*hours|\$\{hrs\}\s*hours/.test(src)) bad.push(`${f}: "{responseHours} hours"`);
      if (/(repl|respon|get back)[^"`\n]{0,40}\b24 hours/i.test(src)) bad.push(`${f}: "24 hours"`);
    }
    expect(bad, "say 'within the hour (8:00–20:00 Morocco time)' instead").toEqual([]);
  });
});
