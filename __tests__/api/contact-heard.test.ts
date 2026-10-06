import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { ENQUIRY_SOURCE_KEYS } from "@/lib/enquiry-source";

/**
 * "How did you hear about us?" (added 2026-10-06, lib/enquiry-source.ts).
 *
 * The answer is only worth having if it reaches the inbox in one fixed
 * wording: the owner reads it from the admin email, and an answer typed in six
 * languages, or a value a script made up, would be noise. So the browser sends
 * a key, the server maps it, and anything unknown is dropped without failing
 * the enquiry. All three forms (booking sidebar, contact page, event planner)
 * must send it, and every locale must label every option — a missing label
 * renders as an empty <option>, which typecheck does not notice because the
 * Dictionary type comes from en.json alone.
 */
const ROOT = join(__dirname, "..", "..");

beforeEach(() => {
  vi.restoreAllMocks();
  process.env.RESEND_API_KEY = "test-key-123";
  vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response(JSON.stringify({ id: "abc" }), { status: 200 }))));
});

async function adminEmail(body: Record<string, unknown>): Promise<string> {
  (globalThis.fetch as ReturnType<typeof vi.fn>).mockClear();
  const res = await POST(new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Sam", email: "sam@example.com", ...body }),
  }));
  expect(res.status).toBe(200);
  const calls = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls;
  return String(JSON.parse(String(calls[0][1].body)).text);
}

describe("enquiry source", () => {
  it("puts a known answer in the admin email, for bookings and messages", async () => {
    expect(await adminEmail({ type: "booking", tour: "Toubkal", heard: "ai" })).toContain("Found us via: ChatGPT or another AI assistant");
    expect(await adminEmail({ type: "general", message: "Hi", heard: "google" })).toContain("Found us via: Google search");
  });

  it("drops an unknown or missing answer without failing the enquiry", async () => {
    for (const heard of ["<script>", "toString", "__proto__", 42, undefined]) {
      expect(await adminEmail({ type: "booking", tour: "Toubkal", heard })).not.toContain("Found us via");
    }
  });

  it("is sent by every enquiry form and labelled in every locale", () => {
    const forms = ["components/tours/BookingSidebar.tsx", "components/sections/ContactForm.tsx", "components/events/EventPlanner.tsx"];
    const silent = forms.filter((f) => !/<HeardAboutSelect/.test(readFileSync(join(ROOT, f), "utf8")));
    expect(silent, "These forms no longer ask how the visitor found us").toEqual([]);

    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      for (const k of ["label", "placeholder", ...ENQUIRY_SOURCE_KEYS]) if (!d.enquirySource?.[k]) missing.push(`${l}: enquirySource.${k}`);
    }
    expect(missing, "Add these dictionary keys:").toEqual([]);
  });
});
