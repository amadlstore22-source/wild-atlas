import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { WA_BUTTONS, isSitePath, isWaButton } from "@/lib/whatsapp-taps";

/**
 * WhatsApp tap counts, 2026-10-20. The owner wanted WhatsApp contacts counted
 * in the sheet the way email enquiries are. One document-level listener
 * (components/analytics/WhatsAppTapCounter.tsx) reports every wa.me tap to
 * app/api/wa-tap, which writes date, language, page and button to the
 * "WhatsApp taps" tab.
 *
 * The way this breaks is silent, and nothing else would notice:
 *  - a link tagged data-wa="something-new" that the route does not know is
 *    answered 400 and never reaches the sheet, while the button itself works;
 *  - a layout that stops mounting the listener counts nothing, on every page;
 *  - the route accepting free text would let anyone write into the owner's
 *    sheet, or let a query string carry what a visitor typed.
 */
const ROOT = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? sources(p) : /\.tsx?$/.test(p) ? [p] : [];
  });
}

describe("WhatsApp taps are counted", () => {
  it("every data-wa name used on a link is one the route accepts", () => {
    const unknown: string[] = [];
    for (const p of [...sources(join(ROOT, "components")), ...sources(join(ROOT, "app"))]) {
      for (const m of readFileSync(p, "utf8").matchAll(/data-wa(?:=\{[^}]*?)?[=:]?\s*"([a-z-]+)"/g)) {
        if (!isWaButton(m[1])) unknown.push(`${relative(ROOT, p).replace(/\\/g, "/")}: data-wa="${m[1]}"`);
      }
    }
    expect(unknown, `Add these to WA_BUTTONS in lib/whatsapp-taps.ts, or the route drops their taps:\n  ${unknown.join("\n  ")}`).toEqual([]);
  });

  it("the site layout mounts the listener, so every page counts", () => {
    expect(read("app/[lang]/layout.tsx"), "Render <WhatsAppTapCounter /> in app/[lang]/layout.tsx").toMatch(/<WhatsAppTapCounter\s*\/>/);
  });

  it("the route records only a site path and a known button", () => {
    expect(isSitePath("/it/tours/agafay-cena-cammello-spettacolo-fuoco")).toBe(true);
    expect(isSitePath("/en")).toBe(true);
    expect(isSitePath("/en/tours?q=my phone 0612")).toBe(false);
    expect(isSitePath("/xx/tours")).toBe(false);
    expect(isSitePath("https://evil.example/en")).toBe(false);
    expect(isWaButton("hello")).toBe(false);
    expect(WA_BUTTONS).toContain("page");
  });

  it("the sheet script setup knows kind 'whatsapp'", () => {
    expect(read("docs/ENQUIRY_SHEET_SETUP.md"), "The Apps Script in docs/ENQUIRY_SHEET_SETUP.md must handle data.kind === 'whatsapp'")
      .toMatch(/data\.kind === 'whatsapp'/);
  });

  it("every cookie policy says WhatsApp taps are counted", () => {
    const missing = ["en", "fr", "es", "de", "it", "ar"].filter(
      (l) => !/WhatsApp|واتساب/.test(read(`app/[lang]/cookies/content/${l}.tsx`).split('id: "measurement"')[1]?.split("id:")[0] ?? ""),
    );
    expect(missing, `Describe the WhatsApp tap count in the measurement section of these cookie policies: ${missing.join(", ")}`).toEqual([]);
  });
});
