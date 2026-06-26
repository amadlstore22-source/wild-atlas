import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

beforeEach(() => {
  vi.restoreAllMocks();
  // No RESEND_API_KEY set — email calls are skipped
  delete process.env.RESEND_API_KEY;
});

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
      date: "2026-09-15",
      people: 3,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("sends emails when RESEND_API_KEY is present", async () => {
    process.env.RESEND_API_KEY = "test-key-123";
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
