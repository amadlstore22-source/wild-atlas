import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy, config } from "@/proxy";

/**
 * Google indexed the Vercel preview domain as a separate site. A real SERP
 * result read:
 *
 *     https://wild-atlas-six.vercel.app › tours › origin=marrak...
 *     Trekking, Desert Tours & Cultural Excursions | Marrakech ...
 *
 * competing with marrakechecotours.com on the operator's own brand terms and
 * splitting ranking signals across two hosts.
 *
 * proxy() had 308'd every .vercel.app request to the canonical host since long
 * before that result appeared, and it worked -- for HTML. The hole was
 * `config.matcher`, which skips any path with a file extension so that
 * /public assets are served directly:
 *
 *     matcher: ["/((?!_next|api|.*\\.[\\w]+$).*)"]
 *
 * robots.txt and sitemap.xml both carry extensions, so neither ever reached
 * proxy(). The preview host answered /robots.txt with its own 200 and a plain
 * "User-Agent: * / Allow: /" -- an explicit invitation to crawl a domain whose
 * every page redirects away. Nothing else caught this: the redirect worked,
 * the sitemap listed correct canonical URLs, `next build` was happy, and the
 * only symptom appeared in Google's index weeks later.
 *
 * The fix adds both paths to the matcher, which then creates the OPPOSITE
 * hazard: on the canonical host every remaining branch of proxy() falls
 * through to the locale redirect, which would rewrite /robots.txt to
 * /en/robots.txt and remove robots.txt and the sitemap from the live site
 * altogether -- a far worse outcome than the duplicate it fixes.
 *
 * Both directions are asserted here because each is invisible in isolation.
 */

const PREVIEW = "wild-atlas-six.vercel.app";
const CANONICAL = "marrakechecotours.com";

function request(host: string, path: string) {
  return new NextRequest(`https://${host}${path}`, { headers: { host } });
}

describe("proxy: host-level crawler files", () => {
  const FILES = ["/robots.txt", "/sitemap.xml"];

  it("matcher covers robots.txt and sitemap.xml", () => {
    // Without these entries proxy() never runs for them and the preview host
    // advertises itself as crawlable.
    for (const file of FILES) {
      expect(
        config.matcher.includes(file),
        `config.matcher no longer lists ${file}, so the .vercel.app redirect\n` +
          `cannot reach it. The preview host will serve its own robots.txt\n` +
          `saying "Allow: /" while every page 308s away, and Google will index\n` +
          `the preview domain as a separate site.`,
      ).toBe(true);
    }
  });

  it("redirects them to the canonical host when served from a preview URL", () => {
    for (const file of FILES) {
      const res = proxy(request(PREVIEW, file));
      expect(res, `${file}: expected a redirect from the preview host`).toBeTruthy();
      expect(res!.status, `${file}: must be a permanent redirect`).toBe(308);
      expect(res!.headers.get("location")).toBe(`https://${CANONICAL}${file}`);
    }
  });

  it("serves them untouched on the canonical host", () => {
    for (const file of FILES) {
      const res = proxy(request(CANONICAL, file));
      // `undefined` means "pass through". Anything else here is the locale
      // redirect turning /robots.txt into /en/robots.txt.
      expect(
        res,
        `${file} is being redirected on the canonical host. Every branch after\n` +
          `the preview check ends at the locale redirect, so ${file} would\n` +
          `become /en${file} and disappear from the site. It must return early.`,
      ).toBeUndefined();
    }
  });

  it("still redirects ordinary pages from the preview host", () => {
    // Guards against a fix that returns early too broadly.
    const res = proxy(request(PREVIEW, "/en/tours"));
    expect(res?.status).toBe(308);
    expect(res?.headers.get("location")).toBe(`https://${CANONICAL}/en/tours`);
  });

  it("leaves the Search Console and IndexNow verification files alone", () => {
    // These live in /public and must answer 200 on their own path. The matcher
    // excludes them via the extension rule; if someone widens the matcher to
    // all files, verification for the whole property breaks.
    for (const file of [
      "/google0efcdd8577e942f1.html",
      "/2dc71b105b5a38bfaceaace47ca6e7b9.txt",
    ]) {
      const extensionRule = config.matcher[0];
      expect(
        extensionRule.includes("\\.[\\w]+$"),
        `The matcher no longer excludes files with extensions, so ${file}\n` +
          `is being routed through proxy(). Redirecting it breaks Search\n` +
          `Console verification or the IndexNow key for the whole property.`,
      ).toBe(true);
    }
  });
});
