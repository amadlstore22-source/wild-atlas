import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * THE COOKIE BANNER STILL WINS LCP ON A FIRST VISIT, ROUGHLY HALF THE TIME
 *
 * The banner cannot be server-rendered (it reads localStorage), so it mounts
 * after hydration and is a large block of text. CookieBanner's own docblock
 * records the earlier rounds of this fight: it was the LCP element at 5.3 s
 * with 4,522 ms of render delay; shortening the copy did not help because size
 * was never the cause; a two-frame rAF delay did not help because rAF fires the
 * instant hydration ends. requestIdleCallback with a 2,500 ms timeout was the
 * fix that worked.
 *
 * It is not a complete fix, and this test exists to record that honestly.
 * Measured 2026-08-29 on the built site, 390x844, 1x CPU, Slow 4G, cold cache,
 * six runs:
 *
 *     LCP 2164  el=SPAN  "Beyond the Tourist Trail"     <- hero text
 *     LCP 2188  el=SPAN  "Beyond the Tourist Trail"
 *     LCP 2388  el=SPAN  "Beyond the Tourist Trail"
 *     LCP 3960  el=P     "We use cookies for your..."   <- the banner
 *     LCP 4004  el=P     "We use cookies for your..."
 *     LCP 4036  el=P     "We use cookies for your..."
 *
 * Same build, same page, same profile: a ~1.8 s swing decided by whether the
 * banner's text happens to be larger than the hero copy once it wraps at
 * 390 px. The 2,500 ms timeout is a cap, not a guarantee — the banner lands at
 * hydration-finish PLUS the idle wait, which on a slow thread is ~4 s.
 *
 * WHAT WAS TRIED AND REVERTED, so nobody spends the afternoon on it again:
 * animating the banner from `opacity: 0`. Chromium excludes opacity-0 elements
 * from LCP, which is exactly what made the hero <h1> unmeasurable before
 * .hero-rise replaced its Motion entry (see lcp-guards.test.ts). It does NOT
 * work here: the exclusion applies while the element is transparent, and the
 * banner becomes eligible again the moment the fade completes. Measured after
 * the change — the banner still won LCP in 4 of 6 runs, at 3,952–4,140 ms.
 * The change was reverted rather than shipped with a comment claiming a
 * mechanism that does not hold.
 *
 * WHY IT IS LEFT ALONE FOR NOW: it only affects a visitor's FIRST page view.
 * Once consent is stored the banner never renders, and returning visitors —
 * plus every crawl after the first — see the hero text at ~2.2 s. Fixing it
 * properly means not rendering a large text block late, which is a consent-UX
 * decision (a smaller notice, a corner toast) rather than a code tweak, and
 * that is the owner's call.
 *
 * What this test DOES enforce is that the two mitigations already paid for
 * stay in place.
 */

const BANNER = join(__dirname, "..", "..", "components", "ui", "CookieBanner.tsx");

describe("cookie banner LCP mitigations", () => {
  it("still defers the banner past the LCP window", () => {
    const src = readFileSync(BANNER, "utf-8");

    expect(
      src.includes("requestIdleCallback"),
      "The cookie banner no longer waits for requestIdleCallback. Without it\n" +
        "the banner mounts the instant hydration finishes and becomes the LCP\n" +
        "element outright — measured at 5.3 s with 4,522 ms of render delay.\n" +
        "A requestAnimationFrame delay is NOT a substitute: rAF fires at the\n" +
        "same moment hydration ends, which was measured at 5.2 s, unchanged.",
    ).toBe(true);

    // The timeout is the floor for Safari (no rIC) and the cap for a thread
    // that never goes idle. Dropping it far below the LCP window puts the
    // banner straight back into contention.
    const timeout = src.match(/timeout:\s*(\d+)/)?.[1];
    expect(
      Number(timeout ?? 0) >= 2000,
      `The requestIdleCallback timeout is ${timeout ?? "missing"} ms. It is the\n` +
        "cap for a main thread that never idles, so it has to outlast the LCP\n" +
        "window rather than land inside it. Below ~2,000 ms the banner reliably\n" +
        "becomes the LCP element again.",
    ).toBe(true);
  });

  it("is absent from the server-rendered HTML", () => {
    // The server snapshot returning "already consented" is what keeps the
    // banner out of the initial paint entirely. If that flipped, the banner
    // would ship in the HTML of all 1,050 pages and be the LCP element for
    // every visitor rather than only first-timers.
    const src = readFileSync(BANNER, "utf-8");

    expect(
      /useSyncExternalStore\(\s*subscribe,\s*hasConsent,\s*\(\)\s*=>\s*true\s*\)/.test(src),
      "The server snapshot for consent is no longer `true`. It must be, so the\n" +
        "banner is absent from the server-rendered HTML and appears only after\n" +
        "the client confirms it is needed. Returning it as `false` would put a\n" +
        "large text block into the first paint of every page.",
    ).toBe(true);
  });

  it("does not try to hide the banner with opacity, which does not work", () => {
    // Reverted experiment, recorded so it is not repeated. Chromium's opacity-0
    // exclusion lasts only while the element is transparent; once the fade
    // finishes the banner is eligible again with its real paint time.
    const src = readFileSync(BANNER, "utf-8");
    const initial = src.match(/initial=\{\{([^}]*)\}\}/)?.[1] ?? "";

    expect(
      /opacity/.test(initial),
      "The banner animates from opacity 0. That looks like the .hero-rise fix\n" +
        "but does not transfer: Chromium excludes an element from LCP only\n" +
        "WHILE it is transparent, and the banner becomes eligible again as soon\n" +
        "as the fade completes. Measured with the fade in place, the banner\n" +
        "still won LCP in 4 of 6 runs at 3,952-4,140 ms — no improvement over\n" +
        "the 3 of 6 without it. Keep the slide-only entry; the real mitigation\n" +
        "is the requestIdleCallback deferral above.",
    ).toBe(false);
  });
});
