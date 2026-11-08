import { describe, expect, it } from "vitest";
import { enquiryTourInfo, findEnquiryTour, ONE_DAY_SUFFIX } from "@/lib/enquiry-tour";
import { toursFor } from "@/lib/tours-i18n";

/**
 * 2026-11-08: a booking enquiry arrived as "Booking Inquiry: Marrakech to
 * Merzouga — 3-Day Desert Tour". The owner could not tell whether the visitor
 * wanted the private tour or the shared one ("Merzouga Desert from Marrakech —
 * 3-Day Shared Tour"), because the form sends only the title and the email
 * repeated it alone. Nothing failed: the build, the types and the email were
 * all fine; only the person quoting the client was missing the one fact that
 * sets the price.
 *
 * The email now says PRIVATE or SHARED, links the page and gives the page's
 * price for the group. This holds for every tour in every language, because
 * a title that stops resolving (a rename, a new translation) silently drops
 * the email back to "which one was it?".
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

describe("booking enquiries say which tour, private or shared", () => {
  it("the incident: the private 3-day Merzouga enquiry says PRIVATE, its page and price for 2", () => {
    const info = enquiryTourInfo("Marrakech to Merzouga — 3-Day Desert Tour", 2);
    expect(info.tag).toBe("PRIVATE");
    expect(info.lines.join("\n")).toContain("/en/tours/sahara-3day-marrakech");
    expect(info.lines.join("\n")).toMatch(/Website price for 2: €\d/);
  });

  it("every tour title, in every language, resolves to its tour and type", () => {
    const unresolved: string[] = [];
    const wrongType: string[] = [];
    for (const locale of LOCALES) {
      for (const t of toursFor(locale)) {
        const found = findEnquiryTour(t.title);
        if (!found) { unresolved.push(`${locale}: ${t.title}`); continue; }
        const en = toursFor("en").find((x) => x.id === t.id)!;
        if ((found.tour.tourType ?? "private") !== (en.tourType ?? "private")) wrongType.push(`${locale}: ${t.title}`);
      }
    }
    expect(unresolved,
      "These titles no longer resolve, so their enquiry emails would say\n" +
      "'Tour type: UNKNOWN'. Check lib/enquiry-tour.ts titleIndex():\n  " + unresolved.join("\n  ")).toEqual([]);
    expect(wrongType, "Same title, different tour type across languages:\n  " + wrongType.join("\n  ")).toEqual([]);
  });

  it("shared tours say SHARED, everything else PRIVATE", () => {
    for (const t of toursFor("en")) {
      expect(enquiryTourInfo(t.title, 2).tag, t.title).toBe(t.tourType === "shared" ? "SHARED" : "PRIVATE");
    }
  });

  it("a translated title links the page in that language", () => {
    const fr = toursFor("fr").find((t) => t.id === "2")!;
    const info = enquiryTourInfo(fr.title, 2);
    if (fr.title !== toursFor("en").find((t) => t.id === "2")!.title) {
      expect(info.lines.join("\n")).toContain("/fr/tours/");
      expect(info.lines.join("\n")).toContain("In English:");
    }
  });

  it("the one-day summit option is called out, not priced as the 2-day trek", () => {
    const refugeTour = toursFor("en").find((t) => /toubkal/i.test(t.title))!;
    const info = enquiryTourInfo(refugeTour.title + ONE_DAY_SUFFIX, 2);
    expect(info.lines.join("\n")).toContain("ONE-DAY SUMMIT");
  });

  it("anything that is not one of our titles says UNKNOWN instead of guessing", () => {
    const info = enquiryTourInfo("Visit http://scam.example", 2);
    expect(info.tag).toBe("");
    expect(info.lines[0]).toMatch(/UNKNOWN/);
  });
});

describe("the owner's email itself (route run with every outgoing call intercepted)", () => {
  it("subject and body say PRIVATE, link the page and give the price; the sheet row is tagged", async () => {
    const { vi } = await import("vitest");
    vi.resetModules();
    const calls: { url: string; body: Record<string, unknown> }[] = [];
    vi.stubGlobal("fetch", async (url: string, init: { body?: string }) => {
      calls.push({ url: String(url), body: init?.body ? JSON.parse(init.body) : {} });
      return { ok: true, status: 200, text: async () => "", json: async () => ({ id: "x" }) };
    });
    process.env.RESEND_API_KEY = "test-key";
    process.env.SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/abc/exec";
    process.env.SHEET_WEBHOOK_SECRET = "test-secret";
    try {
      const { POST } = await import("@/app/api/contact/route");
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", origin: "http://localhost:3000", "x-forwarded-for": "203.0.113.77" },
        body: JSON.stringify({ type: "booking", name: "Genevieve Example", email: "g@example.com", tour: "Marrakech to Merzouga — 3-Day Desert Tour", date: "2027-01-04", people: 2, lang: "en" }),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await POST(req as any);
      expect(res.status).toBe(200);
      const owner = calls.find((c) => c.url.includes("resend.com") && String(c.body.subject).startsWith("Booking Inquiry"));
      expect(owner, "no email to the owner was sent").toBeTruthy();
      expect(owner!.body.subject).toBe("Booking Inquiry (PRIVATE): Marrakech to Merzouga — 3-Day Desert Tour from Genevieve Example");
      expect(String(owner!.body.text)).toContain("Tour type: PRIVATE");
      expect(String(owner!.body.text)).toContain("https://marrakechecotours.com/en/tours/sahara-3day-marrakech");
      expect(String(owner!.body.text)).toMatch(/Website price for 2: €[\d,]+ per person \(€[\d,]+ total\)/);
      const sheet = calls.find((c) => c.url.includes("script.google.com"));
      expect(sheet!.body.tour).toBe("Marrakech to Merzouga — 3-Day Desert Tour (private)");
    } finally {
      vi.unstubAllGlobals();
      delete process.env.RESEND_API_KEY;
      delete process.env.SHEET_WEBHOOK_URL;
      delete process.env.SHEET_WEBHOOK_SECRET;
    }
  });
});
