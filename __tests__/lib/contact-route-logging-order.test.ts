import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * The contact route wrote its internal record AFTER sending the emails, with a
 * comment explaining that this kept the sheet from ever delaying delivery. The
 * reasoning was sound; the ordering was not.
 *
 * When Resend rejects the admin email — expired key, unverified domain, 429
 * quota — the route returns 502 and exits. That early return sat BEFORE the
 * logEnquiry() call, so the one enquiry that most needed a written record was
 * the one enquiry that got none. The visitor saw an honest error telling them
 * to use WhatsApp, and if they did not follow up the lead was gone with no
 * trace it had ever existed. Silent, and invisible in any dashboard.
 *
 * Nothing else catches this. It is valid TypeScript, the route compiles and
 * responds correctly, every unit test of logEnquiry passes (it is called, just
 * not on the failure path), and the happy path — which is what anyone testing
 * by hand exercises — logs perfectly well. Only a reader tracing the 502 branch
 * to the end of the function sees it.
 *
 * This asserts on source order rather than behaviour on purpose: the failure is
 * *where the call sits relative to the early returns*, which is a property of
 * the file, not of any single execution. Mocking Resend to fail would prove the
 * fix for one branch; this proves it for every branch that returns early.
 */

const ROUTE = path.join(process.cwd(), "app", "api", "contact", "route.ts");
const src = fs.readFileSync(ROUTE, "utf8");

describe("contact route: the enquiry is recorded before delivery is attempted", () => {
  it("calls logEnquiry exactly once", () => {
    const calls = src.match(/await logEnquiry\(/g) ?? [];
    expect(calls).toHaveLength(1);
  });

  it("calls logEnquiry before the first Resend request", () => {
    const logAt = src.indexOf("await logEnquiry(");
    const resendAt = src.indexOf("https://api.resend.com/emails");

    expect(logAt).toBeGreaterThan(-1);
    expect(resendAt).toBeGreaterThan(-1);
    // The whole point: a Resend failure must not be able to skip the record.
    expect(logAt).toBeLessThan(resendAt);
  });

  it("calls logEnquiry before every early return that follows validation", () => {
    const logAt = src.indexOf("await logEnquiry(");

    // Error returns that abandon the request. Each one must sit after the log
    // call, otherwise it is a path on which the enquiry vanishes.
    for (const status of ["502", "503"]) {
      const at = src.indexOf(`status: ${status}`);
      expect(at, `no ${status} return found — has the route changed shape?`).toBeGreaterThan(-1);
      expect(at, `the ${status} path can return before the enquiry is recorded`).toBeGreaterThan(
        logAt,
      );
    }
  });

  it("still records the enquiry only after input validation", () => {
    // Logging must not happen for junk: the 400 for a missing or malformed
    // name/email is the one early return that SHOULD precede the record.
    const validationAt = src.indexOf("Missing or invalid fields");
    const logAt = src.indexOf("await logEnquiry(");

    expect(validationAt).toBeGreaterThan(-1);
    expect(validationAt).toBeLessThan(logAt);
  });
});
