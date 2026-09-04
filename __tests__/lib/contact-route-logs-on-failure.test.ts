import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * The behavioural half of contact-route-logging-order.test.ts.
 *
 * That test asserts on source order; this one runs the route with
 * RESEND_API_KEY absent — the real 503 branch — and asserts the enquiry still
 * reaches the sheet. Against the original code this fails with "expected [] to
 * have a length of 1": zero sheet writes, the lead gone with no record.
 *
 * Kept alongside the source-order test because they fail for different reasons.
 * A refactor that moved delivery into a helper could satisfy the ordering check
 * while still skipping the log; this one would catch that.
 */

const fetchMock = vi.fn();

beforeEach(() => {
  vi.resetModules();
  vi.spyOn(console, "error").mockImplementation(() => {});
  delete process.env.RESEND_API_KEY; // force the 503 branch
  process.env.SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
  process.env.SHEET_WEBHOOK_SECRET = "test-secret";
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => "" });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.SHEET_WEBHOOK_URL;
  delete process.env.SHEET_WEBHOOK_SECRET;
});

describe("contact route, Resend not configured", () => {
  it("returns 503 AND still writes the enquiry to the sheet", async () => {
    const { POST } = await import("@/app/api/contact/route");

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", origin: "http://localhost:3000" },
      body: JSON.stringify({
        type: "booking",
        name: "Proof Test",
        email: "proof@example.com",
        tour: "Test Tour",
        people: 2,
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(req as any);
    expect(res.status).toBe(503);

    const sheetCalls = fetchMock.mock.calls.filter((c) =>
      String(c[0]).includes("script.google.com"),
    );
    // THE ASSERTION: the sheet was written even though delivery failed.
    expect(sheetCalls).toHaveLength(1);

    const body = JSON.parse(String(sheetCalls[0][1].body));
    expect(body.name).toBe("Proof Test");
    expect(body.email).toBe("proof@example.com");
  });
});
