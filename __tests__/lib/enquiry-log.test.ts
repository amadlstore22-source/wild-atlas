import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logEnquiry } from "@/lib/enquiry-log";

const RECORD = {
  type: "booking",
  name: "Sarah",
  email: "sarah@example.com",
  tour: "Toubkal Summit Trek",
  date: "2027-03-14",
  people: 4,
};

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env.SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
  process.env.SHEET_WEBHOOK_SECRET = "test-secret";
});

afterEach(() => {
  delete process.env.SHEET_WEBHOOK_URL;
  delete process.env.SHEET_WEBHOOK_SECRET;
});

describe("logEnquiry", () => {
  it("posts the record with the shared secret", async () => {
    const fetchMock = vi.fn(() => Promise.resolve(new Response("{}", { status: 200 })));
    vi.stubGlobal("fetch", fetchMock);

    await logEnquiry(RECORD);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(process.env.SHEET_WEBHOOK_URL);
    const sent = JSON.parse(String(init.body));
    expect(sent.secret).toBe("test-secret");
    expect(sent.name).toBe("Sarah");
    expect(sent.tour).toBe("Toubkal Summit Trek");
    expect(sent.receivedAt).toBeTruthy();
  });

  it("does nothing when the webhook is not configured", async () => {
    delete process.env.SHEET_WEBHOOK_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await logEnquiry(RECORD);

    // Unconfigured is a normal state — the site runs fine without a sheet.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does nothing when the secret is missing", async () => {
    delete process.env.SHEET_WEBHOOK_SECRET;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await logEnquiry(RECORD);

    // Posting without a secret would be rejected anyway, and would leak the
    // enquiry to an endpoint that cannot authenticate it.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // The whole point: a spreadsheet must never cost us a booking.
  describe("never throws, whatever goes wrong", () => {
    it("survives a network failure", async () => {
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("ENOTFOUND"))));
      await expect(logEnquiry(RECORD)).resolves.toBeUndefined();
    });

    it("survives a non-OK response", async () => {
      vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("nope", { status: 500 }))));
      await expect(logEnquiry(RECORD)).resolves.toBeUndefined();
    });

    it("survives a timeout", async () => {
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new DOMException("timed out", "TimeoutError"))));
      await expect(logEnquiry(RECORD)).resolves.toBeUndefined();
    });

    it("logs the enquiry when it fails, so it is recoverable from server logs", async () => {
      const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("down"))));

      await logEnquiry(RECORD);

      const logged = errSpy.mock.calls.flat().map(String).join(" ");
      expect(logged).toContain("sarah@example.com");
    });
  });
});
