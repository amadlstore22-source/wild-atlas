import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The anti-spam honeypot (components/ui/Honeypot.tsx, security audit
 * 2026-10-19) first hid its field with `left: -10000px`. That is invisible in
 * English, but on the Arabic pages the document is dir="rtl", where content
 * past the left edge is part of the scrollable area. The newsletter form in
 * the footer carries the honeypot, so from 49812c3 every /ar page could be
 * swiped 10,000px sideways into blank space on a phone. Found 2026-10-20 by a
 * browser check of /ar/categories/desert (scrollWidth - innerWidth = 9,984).
 *
 * tsc, the unit tests and next build all passed it, and the English pages
 * looked right. This keeps the field clipped in place instead: no large
 * negative left/right/margin offset may come back.
 */
const SRC = readFileSync(join(__dirname, "..", "..", "components", "ui", "Honeypot.tsx"), "utf8");

describe("honeypot never creates sideways scroll on RTL pages", () => {
  it("is clipped in place, not pushed off-screen", () => {
    const style = SRC.slice(SRC.indexOf("export default function Honeypot"));
    expect(style, "Do not move the honeypot off-screen with a big negative offset: on dir=rtl pages that space scrolls. Clip it in place (clipPath inset(50%), 1px box, overflow hidden).")
      .not.toMatch(/(left|right|marginLeft|marginRight|insetInlineStart|insetInlineEnd)\s*:\s*["']?-\d{3,}/);
    expect(style).toMatch(/clipPath:\s*"inset\(50%\)"/);
    expect(style).toMatch(/overflow:\s*"hidden"/);
  });
});
