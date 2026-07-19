import { describe, it, expect } from "vitest";
import { isCrossOrigin } from "@/lib/request-origin";

const req = (headers: Record<string, string>) =>
  new Request("https://marrakechecotours.com/api/contact", { method: "POST", headers });

describe("isCrossOrigin: Sec-Fetch-Site is the primary signal", () => {
  it("blocks an explicit cross-site POST", () => {
    expect(isCrossOrigin(req({ "sec-fetch-site": "cross-site" }))).toBe(true);
  });

  it("allows same-origin, same-site and none", () => {
    expect(isCrossOrigin(req({ "sec-fetch-site": "same-origin" }))).toBe(false);
    expect(isCrossOrigin(req({ "sec-fetch-site": "same-site" }))).toBe(false);
    // "none" is a user-initiated navigation — it cannot be a forged POST.
    expect(isCrossOrigin(req({ "sec-fetch-site": "none" }))).toBe(false);
  });

  it("trusts Sec-Fetch-Site over a conflicting Origin", () => {
    // The browser sets Sec-Fetch-Site itself; script cannot forge it. If it
    // says same-origin, an odd Origin value must not override that.
    expect(
      isCrossOrigin(req({ "sec-fetch-site": "same-origin", origin: "https://evil.example" })),
    ).toBe(false);
  });
});

describe("isCrossOrigin: Origin fallback for browsers without fetch metadata", () => {
  it("blocks a foreign origin", () => {
    expect(isCrossOrigin(req({ origin: "https://evil.example" }))).toBe(true);
  });

  it("allows our own hosts", () => {
    expect(isCrossOrigin(req({ origin: "https://marrakechecotours.com" }))).toBe(false);
    expect(isCrossOrigin(req({ origin: "https://www.marrakechecotours.com" }))).toBe(false);
  });

  it("allows localhost and vercel previews so dev and staging keep working", () => {
    expect(isCrossOrigin(req({ origin: "http://localhost:3000" }))).toBe(false);
    expect(isCrossOrigin(req({ origin: "https://wild-atlas-abc123.vercel.app" }))).toBe(false);
  });

  it("blocks a lookalike domain that merely contains our name", () => {
    expect(isCrossOrigin(req({ origin: "https://marrakechecotours.com.evil.example" }))).toBe(true);
    expect(isCrossOrigin(req({ origin: "https://notmarrakechecotours.com" }))).toBe(true);
  });

  it("blocks a malformed Origin", () => {
    expect(isCrossOrigin(req({ origin: "not a url" }))).toBe(true);
  });
});

describe("isCrossOrigin: fails OPEN when no origin signal exists", () => {
  // Per OWASP: absent headers are not evidence of an attack. Older browsers,
  // privacy modes and non-browser clients send nothing. Blocking them would
  // cost real enquiries; the rate limiter still bounds abuse.
  it("allows a request with no origin headers at all", () => {
    expect(isCrossOrigin(req({}))).toBe(false);
  });

  it('allows Origin: "null" (privacy contexts, sandboxed iframes)', () => {
    expect(isCrossOrigin(req({ origin: "null" }))).toBe(false);
  });
});
