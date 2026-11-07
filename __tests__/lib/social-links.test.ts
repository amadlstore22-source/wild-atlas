import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { SOCIAL } from "@/lib/constants";

/**
 * Until 2026-11-07 the footer's Instagram icon, the homepage and About page
 * structured data (`sameAs`) and the email signature template all pointed at
 * instagram.com/met_morocco. The business's account is
 * instagram.com/marrakechecotours. Every visitor who tapped the icon, and
 * Google reading `sameAs` to tie the business to its profiles, was sent to
 * an account that is not the company's.
 *
 * Nothing could catch it: a wrong handle is a valid URL, the page builds, and
 * the link only fails when someone opens it and reads the name. The handle
 * had also been typed out by hand in three files beside the constant, so a
 * fix to lib/constants.ts alone would have left the structured data wrong.
 *
 * Rule: SOCIAL.instagram in lib/constants.ts is the only place the address is
 * written. Every instagram.com link in the site's source and in the email
 * signature template must equal it.
 */

const ROOTS = ["app", "components", "lib", "docs"];

function files(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) files(p, out);
    else if (/\.(tsx?|mjs|html)$/.test(f)) out.push(p);
  }
  return out;
}

describe("Instagram link", () => {
  it("is the business account", () => {
    expect(SOCIAL.instagram).toBe("https://www.instagram.com/marrakechecotours/");
  });

  it("every instagram.com link in the source is SOCIAL.instagram", () => {
    const wrong: string[] = [];
    for (const file of ROOTS.flatMap((r) => files(r))) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/https?:\/\/(?:www\.)?instagram\.com\/[^\s"'`)<]*/g)) {
        if (m[0] !== SOCIAL.instagram) wrong.push(`${file.replace(/\\/g, "/")}: ${m[0]}`);
      }
    }
    expect(
      wrong,
      `These Instagram links are not the business account (${SOCIAL.instagram}).\n` +
        `Use SOCIAL.instagram from lib/constants.ts instead of typing the address:\n  `,
    ).toEqual([]);
  });
});
