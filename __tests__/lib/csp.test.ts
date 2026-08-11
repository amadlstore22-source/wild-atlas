import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/**
 * CSP directives that do NOT inherit from default-src, and so have to be
 * written out explicitly. They were all missing until the August 2026 audit:
 *
 *  - object-src: without it, <object>/<embed> plugin content is allowed.
 *  - base-uri:   an injected <base> rewrites every relative URL on the page.
 *  - form-action: controls where a form is allowed to POST.
 *
 * Asserted against the config source rather than a running server so the check
 * costs nothing in CI. PayPal is a plain link (paypal.me), not a cross-origin
 * form post, so 'self' is safe for form-action — confirmed in BookingSidebar.
 */
describe("Content-Security-Policy", () => {
  const config = readFileSync("next.config.ts", "utf8");

  it.each([
    ["object-src 'none'"],
    ["base-uri 'self'"],
    ["form-action 'self'"],
    ["frame-ancestors 'none'"],
  ])("declares %s", (directive) => {
    expect(config).toContain(directive);
  });

  it("never allows unsafe-eval in production", () => {
    // unsafe-eval is gated behind isDev for Turbopack HMR. A production build
    // that permits eval() turns any injection into script execution.
    const prodBranch = config.split("isDev")[2] ?? "";
    expect(prodBranch.split("style-src")[0]).not.toContain("unsafe-eval");
  });
});
