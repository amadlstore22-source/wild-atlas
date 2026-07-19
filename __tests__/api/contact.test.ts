import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

beforeEach(() => {
  vi.restoreAllMocks();
  // Default: email is configured and sends succeed. Individual tests override
  // this to exercise the missing-key (503) or Resend-failure paths.
  process.env.RESEND_API_KEY = "test-key-123";
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(new Response(JSON.stringify({ id: "abc" }), { status: 200 }))),
  );
});

/** ISO date N days from now. Relative so these tests never go stale. */
function futureDate(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns 200 for a valid general inquiry", async () => {
    const req = makeRequest({
      type: "general",
      name: "Ahmed",
      email: "ahmed@example.com",
      subject: "Trek inquiry",
      message: "I want to book a trek.",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("returns 400 when name is missing", async () => {
    const req = makeRequest({ type: "general", email: "ahmed@example.com", message: "Hi" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is missing", async () => {
    const req = makeRequest({ type: "general", name: "Ahmed", message: "Hi" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid email format", async () => {
    const req = makeRequest({ type: "general", name: "Ahmed", email: "not-an-email", message: "Hi" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 for a valid booking inquiry", async () => {
    const req = makeRequest({
      type: "booking",
      name: "Fatima",
      email: "fatima@example.com",
      tour: "Toubkal Summit Trek",
      date: futureDate(60),
      people: 3,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  // The date picker sets min/max in the browser, but that is bypassable. A bad
  // date must never cost us the enquiry — it is dropped, not rejected.
  describe("departure date handling", () => {
    async function sentBody(date: unknown): Promise<string> {
      const res = await POST(
        makeRequest({ type: "booking", name: "Sam", email: "sam@example.com", tour: "Toubkal", date }),
      );
      expect(res.status).toBe(200);
      const calls = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls;
      return String(JSON.parse(String(calls[0][1].body)).text);
    }

    it("keeps a plausible future date", async () => {
      const d = futureDate(30);
      expect(await sentBody(d)).toContain(d);
    });

    it("accepts today", async () => {
      const d = futureDate(0);
      expect(await sentBody(d)).toContain(d);
    });

    it("drops a past date and marks the request flexible", async () => {
      expect(await sentBody(futureDate(-30))).toContain("flexible");
    });

    it("drops a date beyond two years", async () => {
      expect(await sentBody(futureDate(900))).toContain("flexible");
    });

    it.each([["not-a-date"], ["2026-13-45"], [""], [null], [12345]])(
      "drops malformed input %p without failing the request",
      async (bad) => {
        expect(await sentBody(bad)).toContain("flexible");
      },
    );
  });

  // The sheet is an internal convenience. If it breaks, the customer must still
  // get their confirmation and we must still get the email.
  it("still succeeds when the enquiry sheet is unreachable", async () => {
    process.env.SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/x/exec";
    process.env.SHEET_WEBHOOK_SECRET = "s";
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Emails succeed; only the sheet call fails.
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) =>
        String(url).includes("script.google.com")
          ? Promise.reject(new Error("sheet down"))
          : Promise.resolve(new Response(JSON.stringify({ id: "abc" }), { status: 200 })),
      ),
    );

    const res = await POST(
      makeRequest({
        type: "booking",
        name: "Fatima",
        email: "fatima@example.com",
        tour: "Toubkal",
        date: futureDate(30),
        people: 2,
      }),
    );

    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);

    delete process.env.SHEET_WEBHOOK_URL;
    delete process.env.SHEET_WEBHOOK_SECRET;
  });

  it("returns 503 (not a false success) when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const req = makeRequest({
      type: "general",
      name: "Ahmed",
      email: "ahmed@example.com",
      message: "I want to book a trek.",
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.ok).toBeUndefined();
    expect(json.error).toBeTruthy();
  });

  it("sends emails when RESEND_API_KEY is present", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ id: "abc" }), { status: 200 }))
    );
    vi.stubGlobal("fetch", fetchMock);

    const req = makeRequest({
      type: "general",
      name: "Test",
      email: "test@example.com",
      subject: "Hello",
      message: "Test message",
    });
    await POST(req);

    // Should call fetch twice: once for admin email, once for confirmation
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("returns 200 even if Resend API fails", async () => {
    process.env.RESEND_API_KEY = "test-key-123";
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 500 }))));

    const req = makeRequest({
      type: "general",
      name: "Test",
      email: "test@example.com",
      message: "Hello",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("clamps people count to valid range", async () => {
    const req = makeRequest({
      type: "booking",
      name: "Test",
      email: "test@example.com",
      tour: "Desert Tour",
      people: 999,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("sanitizes overly long fields", async () => {
    const req = makeRequest({
      type: "general",
      name: "A".repeat(500),
      email: "test@example.com",
      message: "Hello",
    });
    const res = await POST(req);
    // Should still succeed — sanitize trims to max length, doesn't reject
    expect(res.status).toBe(200);
  });
});
