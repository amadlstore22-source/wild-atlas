import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function req(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(new URL(`https://marrakechecotours.com${path}`), { headers });
}

const GOOGLEBOT =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const HUMAN_IT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

describe("locale redirect", () => {
  it("passes through paths that already carry a locale", () => {
    expect(proxy(req("/en/tours"))).toBeUndefined();
    expect(proxy(req("/it"))).toBeUndefined();
  });

  // A 307 leaves both URLs as separate ranking candidates; Google only
  // consolidates through a permanent redirect.
  it("redirects permanently (308), not temporarily", () => {
    const res = proxy(req("/tours"));
    expect(res?.status).toBe(308);
  });

  it("preserves the path when adding the locale", () => {
    const res = proxy(req("/tours"));
    expect(res?.headers.get("location")).toContain("/en/tours");
  });
});

describe("crawlers always get the canonical locale", () => {
  // The bug this guards: Googlebot sending Accept-Language: it was redirected
  // to /it/tours, so Google indexed 66 Italian URLs against 25 English ones.
  it("sends Googlebot to /en even when Accept-Language says otherwise", () => {
    const res = proxy(req("/tours", { "user-agent": GOOGLEBOT, "accept-language": "it-IT,it;q=0.9" }));
    expect(res?.headers.get("location")).toContain("/en/tours");
  });

  it.each([
    ["bingbot", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"],
    ["GPTBot", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0"],
    ["ClaudeBot", "Mozilla/5.0 (compatible; ClaudeBot/1.0)"],
    ["PerplexityBot", "Mozilla/5.0 (compatible; PerplexityBot/1.0)"],
  ])("routes %s to the default locale", (_name, ua) => {
    const res = proxy(req("/blog", { "user-agent": ua, "accept-language": "de-DE,de;q=0.9" }));
    expect(res?.headers.get("location")).toContain("/en/blog");
  });

  it("still honours a real user's language preference", () => {
    const res = proxy(req("/tours", { "user-agent": HUMAN_IT, "accept-language": "it-IT,it;q=0.9" }));
    expect(res?.headers.get("location")).toContain("/it/tours");
  });

  it("falls back to English for an unsupported language", () => {
    const res = proxy(req("/tours", { "user-agent": HUMAN_IT, "accept-language": "ja-JP,ja;q=0.9" }));
    expect(res?.headers.get("location")).toContain("/en/tours");
  });
});

describe("apex host consolidation", () => {
  it("redirects a .vercel.app host to the primary domain, permanently", () => {
    const r = new NextRequest(new URL("https://wild-atlas-six.vercel.app/en/tours"), {
      headers: { host: "wild-atlas-six.vercel.app" },
    });
    const res = proxy(r);
    expect(res?.status).toBe(308);
    expect(res?.headers.get("location")).toContain("marrakechecotours.com");
  });
});
