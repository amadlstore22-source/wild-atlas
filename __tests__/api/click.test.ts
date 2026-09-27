import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/click/route";
import { blogPostsFor } from "@/lib/blog-i18n";

/**
 * The anonymous trip-box counter shares the enquiry sheet's webhook. Two ways
 * it can do damage without failing a build:
 *
 *  1. Sending the secret as `secret` — the pre-existing enquiry script would
 *     accept it and append a blank "Contact" row to the owner's enquiries for
 *     every click. It must travel as `clickSecret`.
 *  2. Forwarding anything — replaying the endpoint must not let a stranger
 *     fill the sheet with junk, so only real post/tour pairs are written.
 *
 * It must also never carry anything about the visitor: this runs without
 * consent, which is only defensible while the row is date/lang/post/tour.
 */
const post = blogPostsFor("en").find((p) => p.relatedTours?.length)!;
const valid = { lang: "en", post: post.slug, tour: post.relatedTours![0] };

function req(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  process.env.SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
  process.env.SHEET_WEBHOOK_SECRET = "test-secret";
  fetchMock = vi.fn(() => Promise.resolve(new Response("{}", { status: 200 })));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  delete process.env.SHEET_WEBHOOK_URL;
  delete process.env.SHEET_WEBHOOK_SECRET;
  vi.unstubAllGlobals();
});

describe("POST /api/click", () => {
  it("records a real click with clickSecret and nothing about the visitor", async () => {
    const res = await POST(req(valid, { "x-forwarded-for": "203.0.113.9", "user-agent": "UA" }));
    expect(res.status).toBe(204);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.secret, "`secret` would be accepted by the old enquiry script").toBeUndefined();
    expect(sent.clickSecret).toBe("test-secret");
    expect(Object.keys(sent).sort()).toEqual(["at", "clickSecret", "kind", "lang", "post", "tour"]);
  });

  it("rejects unknown posts, tours and locales without writing", async () => {
    for (const bad of [
      { ...valid, post: "not-a-post" },
      { ...valid, tour: "not-a-tour" },
      { ...valid, lang: "xx" },
      { lang: "en" },
    ]) {
      expect((await POST(req(bad))).status).toBe(400);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refuses cross-site requests", async () => {
    expect((await POST(req(valid, { "sec-fetch-site": "cross-site" }))).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
