import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, act } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/analytics";

// next/script injects into <head> only in a real Next runtime; render it as a
// plain element so the test can see whether the tag would be emitted at all.
vi.mock("next/script", () => ({
  default: ({ id, children }: { id?: string; children?: string }) => <script data-testid={id}>{children}</script>,
}));

import MicrosoftClarity from "@/components/ui/MicrosoftClarity";

/**
 * Clarity records sessions. Our cookie policy promises that "Necessary only"
 * loads no analytics at all, and Vercel Analytics once broke that same promise
 * by being mounted unconditionally (see VercelAnalytics.tsx). A Clarity tag
 * pasted straight into <head>, which is what Clarity's setup screen tells you
 * to do, would repeat it for every visitor who declined. Nothing in the build
 * notices: the page renders the same either way.
 */
afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Microsoft Clarity consent gate", () => {
  it("emits nothing before consent, or with Necessary only", () => {
    const a = render(<MicrosoftClarity />);
    expect(a.container.querySelector("script")).toBeNull();
    cleanup();
    localStorage.setItem(CONSENT_KEY, "necessary");
    const b = render(<MicrosoftClarity />);
    expect(b.container.querySelector("script")).toBeNull();
  });

  it("loads the moment Accept all is clicked, and sends the consentv2 signal", () => {
    const { container } = render(<MicrosoftClarity />);
    act(() => {
      localStorage.setItem(CONSENT_KEY, "all");
      window.dispatchEvent(new Event(CONSENT_EVENT));
    });
    const tag = container.querySelector('script[data-testid="ms-clarity"]');
    expect(tag?.textContent).toContain("clarity.ms/tag/");
    // Without this, EEA/UK/CH visits run degraded since 31 Oct 2025.
    expect(tag?.textContent).toContain('"consentv2"');
  });
});

describe("CSP allows Clarity", () => {
  it("lists *.clarity.ms for scripts and uploads, and c.bing.com", () => {
    const config = readFileSync("next.config.ts", "utf8");
    const directive = (name: string) =>
      (config.match(new RegExp(`"${name} [^"]*"`, "g")) ?? []).join(" ");
    expect(directive("script-src")).toContain("https://*.clarity.ms");
    expect(directive("connect-src")).toContain("https://*.clarity.ms");
    expect(directive("connect-src")).toContain("https://c.bing.com");
  });
});
