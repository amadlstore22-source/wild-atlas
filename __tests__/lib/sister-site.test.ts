import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { SISTER_SITE, SITE } from "@/lib/constants";

/**
 * THE SISTER BRAND LINK, AND WHY A LIVE URL IS NOT ENOUGH.
 *
 * The footer carries a full-width band linking to the bike-touring
 * brand run by the same team. Until 2026-09-21 it pointed at
 * moroccobike-skitours.com — the site that business rebuilt and
 * rebranded as Atlas Pedals.
 *
 * THE FAILURE MODE IS THAT NOTHING FAILS. The old domain still returns
 * HTTP 200. So the link was not broken, no crawler reported it, no test
 * could have caught it by fetching, and the page rendered perfectly. It
 * simply sent every visitor who clicked it — on every page of an
 * 800-page site — to a brand the company no longer trades under.
 *
 * That is the shape of stale outbound data generally: a URL that
 * resolves looks correct forever.
 *
 * WHAT THIS ASSERTS. That the constant names the brand it is supposed
 * to, and — separately — that the old domain has not crept back in
 * anywhere. It does not fetch: a unit test that depends on a third
 * party being reachable fails for reasons unrelated to the change, and
 * a test that fails for the wrong reason gets ignored.
 */

const ROOT = process.cwd();

/** The brand this site's bike-touring sister actually trades as. */
const EXPECTED_NAME = "Atlas Pedals";
const EXPECTED_URL = "https://atlaspedals.com";

/** The domain it replaced. Live, which is exactly the problem. */
const RETIRED_DOMAIN = "moroccobike-skitours.com";

describe("sister brand", () => {
  it("names the current bike brand", () => {
    expect(
      SISTER_SITE.name,
      `SISTER_SITE.name is "${SISTER_SITE.name}". The bike side of this\n` +
        `business trades as ${EXPECTED_NAME}.`,
    ).toBe(EXPECTED_NAME);

    expect(
      SISTER_SITE.url,
      `SISTER_SITE.url is "${SISTER_SITE.url}".\n\n` +
        `If this says ${RETIRED_DOMAIN}, note that the domain still returns\n` +
        `200 — so the link works, nothing reports it, and every visitor who\n` +
        `clicks the footer band lands on a retired brand.`,
    ).toBe(EXPECTED_URL);
  });

  it("carries a blurb describing what they actually do", () => {
    // The band shows this under the name. An empty or stale blurb is the
    // half of the link nobody re-reads when the URL changes.
    expect(SISTER_SITE.blurb.length).toBeGreaterThan(20);
    expect(
      /bike|cycl|gravel|mountain/i.test(SISTER_SITE.blurb),
      `SISTER_SITE.blurb does not mention cycling: "${SISTER_SITE.blurb}"`,
    ).toBe(true);
    expect(
      /ski/i.test(SISTER_SITE.blurb),
      `SISTER_SITE.blurb still mentions skiing. That was the old brand's\n` +
        `offer; Atlas Pedals runs bike tours.`,
    ).toBe(false);
  });

  it("the retired domain appears nowhere in the source", () => {
    /**
     * A second copy is how these drift. The constant is the single
     * source, but a URL pasted into a blog post, a schema builder or a
     * page's prose would not go through it.
     */
    const files = [
      "lib/constants.ts",
      "components/layout/Footer.tsx",
      "app/[lang]/page.tsx",
      "app/[lang]/privacy/page.tsx",
    ];

    const offenders: string[] = [];
    for (const rel of files) {
      const raw = readFileSync(join(ROOT, rel), "utf8");
      /* Comments stripped: lib/constants.ts documents the change by
         naming the old domain, and reporting that as the defect would
         flag the very note explaining it. */
      const code = raw
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/\/\/[^\n]*/g, " ");
      if (code.includes(RETIRED_DOMAIN)) offenders.push(`  ${rel}`);
    }

    expect(
      offenders,
      `${RETIRED_DOMAIN} still appears in:\n${offenders.join("\n")}\n\n` +
        `It resolves, so nothing will ever report it as broken.`,
    ).toEqual([]);
  });

  it("is not claimed as sameAs in the organisation schema", () => {
    /**
     * schema.org `sameAs` asserts "another official page of THIS
     * organisation". It held SISTER_SITE.url while both brands were one
     * operation under one trading name, which was defensible.
     *
     * Atlas Pedals is now a separate brand with its own domain, its own
     * Search Console property and its own structured data declaring its
     * own identity. Claiming it here would tell Google two distinct
     * organisations are the same entity, which risks the entity
     * resolution of both — and the footer link carries the referral
     * without making the claim.
     */
    const home = readFileSync(join(ROOT, "app/[lang]/page.tsx"), "utf8");
    const code = home
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/\/\/[^\n]*/g, " ");

    const sameAs = code.match(/sameAs:\s*\[([\s\S]*?)\]/);
    expect(sameAs, "No sameAs array found in the homepage schema.").not.toBeNull();

    expect(
      sameAs![1].includes("SISTER_SITE") || sameAs![1].includes("atlaspedals"),
      `The homepage schema lists the sister brand under sameAs. That tells\n` +
        `Google it is another page of ${SITE.name}, which it is not — it is\n` +
        `a separate organisation with its own schema asserting its own\n` +
        `identity. Two conflicting claims about one entity is worse than\n` +
        `no claim.`,
    ).toBe(false);
  });

  it("the footer still renders the link", () => {
    // The point of all of the above. A correct constant nothing renders
    // helps nobody — this project has already shipped exactly that on
    // the sister site, where a language switcher was imported and never
    // placed in the JSX.
    const footer = readFileSync(
      join(ROOT, "components/layout/Footer.tsx"),
      "utf8",
    );
    expect(
      footer.includes("SISTER_SITE.url") && footer.includes("SISTER_SITE.name"),
      `components/layout/Footer.tsx no longer renders the sister-brand\n` +
        `band. If that was deliberate, remove this test with it.`,
    ).toBe(true);
  });
});
