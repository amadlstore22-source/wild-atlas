import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE } from "@/lib/constants";
import { CONFIRMATION_LANGS, confirmationEmail, confirmationLang } from "@/lib/enquiry-confirmation";

/**
 * 2026-10-23: the owner had answered many enquiries and heard nothing back.
 * Gmail sent info@ through Resend, mail-tester scored it 10/10 and Resend
 * showed every reply delivered, yet a Yahoo client found our replies in his
 * spam folder twice. A domain a few months old writing to a new address is
 * exactly what Yahoo files as spam, and no setting on our side fixes that.
 *
 * The visitor can: add info@ to their contacts and look in spam. Nothing told
 * them to. The automatic confirmation, the first email they get from us, said
 * nothing about where our reply would come from, and it was English only even
 * for a visitor writing from the French or Spanish site. No build or typecheck
 * catches a missing sentence, so this pins it in every language, together
 * with the page language actually reaching the route.
 */

const SPAM_WORD: Record<string, RegExp> = {
  en: /spam or junk/,
  fr: /indésirable \(spam\)/,
  es: /spam o correo no deseado/,
  de: /Spam-Ordner/,
  it: /spam o posta indesiderata/,
  ar: /غير المرغوب فيها/,
};

describe("enquiry confirmation email", () => {
  it("names info@ and the spam folder, and gives WhatsApp, in every language and both form types", () => {
    const missing: string[] = [];
    for (const lang of CONFIRMATION_LANGS) {
      for (const type of ["booking", "general"]) {
        const { text } = confirmationEmail({ lang, type, greet: "Amina", tour: "", date: "", email: "a@example.com" });
        if (!text.includes(SITE.email)) missing.push(`${lang}/${type}: reply address ${SITE.email}`);
        if (!SPAM_WORD[lang].test(text)) missing.push(`${lang}/${type}: spam-folder sentence`);
        if (!text.includes(SITE.phone)) missing.push(`${lang}/${type}: WhatsApp number`);
        if (/\b24\b/.test(text)) missing.push(`${lang}/${type}: promises 24 hours (the promise is one hour)`);
      }
    }
    expect(missing, "every language must tell the visitor where our reply comes from and to check spam").toEqual([]);
  });

  it("writes in the page language and falls back to English for anything else", () => {
    expect(confirmationLang("fr")).toBe("fr");
    expect(confirmationLang("ar")).toBe("ar");
    for (const bad of [undefined, "", "pt", "EN", "../x", 3]) expect(confirmationLang(bad)).toBe("en");
  });

  it("quotes the tour and the date in the visitor's language", () => {
    const fr = confirmationEmail({ lang: "fr", type: "booking", greet: "Anna", tour: "Excursion", date: "2026-11-23", email: "a@example.com" });
    expect(fr.text.startsWith("Bonjour Anna,")).toBe(true);
    expect(fr.text).toContain("« Excursion »");
    expect(fr.text).toContain("23 novembre 2026");
    expect(fr.subject).toBe("Nous avons bien reçu votre demande de réservation — Excursion");

    const en = confirmationEmail({ lang: "en", type: "booking", greet: "", tour: "", date: "", email: "a@example.com" });
    expect(en.text.startsWith("Hello,")).toBe(true);
    expect(en.subject).toBe("We received your booking inquiry");
  });

  it("the form sends the page language with every enquiry", () => {
    const hook = readFileSync(join(__dirname, "..", "..", "hooks", "useFormSubmit.ts"), "utf8");
    expect(hook, "hooks/useFormSubmit.ts must send lang from the URL").toMatch(/lang:\s*window\.location\.pathname\.split\("\/"\)\[1\]/);
  });
});

describe("contact route sends the confirmation in the page language", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.RESEND_API_KEY = "re_test";
    delete process.env.SHEET_WEBHOOK_URL;
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.RESEND_API_KEY;
  });

  let ip = 0;
  async function confirmationFor(body: object) {
    const { POST } = await import("@/app/api/contact/route");
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", origin: "http://localhost:3000", "x-forwarded-for": `203.0.113.${++ip}` },
      body: JSON.stringify(body),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(req as any);
    const mails = fetchMock.mock.calls
      .filter((c) => String(c[0]).includes("api.resend.com"))
      .map((c) => JSON.parse(c[1].body) as { to: string[]; subject: string; text: string });
    return mails.find((m) => !m.to.includes(SITE.emailInbox));
  }

  it("French page: French confirmation; the email to us stays English", async () => {
    const mail = await confirmationFor({ lang: "fr", type: "general", name: "Anna", email: "anna@example.com", message: "Bonjour" });
    expect(mail?.subject).toBe("Nous avons bien reçu votre message — Marrakech Eco Tours");
    expect(mail?.text).toContain(SITE.email);
    const admin = fetchMock.mock.calls.map((c) => JSON.parse(c[1].body)).find((m) => m.to.includes(SITE.emailInbox));
    expect(admin.subject.startsWith("Contact:")).toBe(true);
  });

  it("no or unknown language: English, as before", async () => {
    const mail = await confirmationFor({ lang: "xx", type: "general", name: "Sam", email: "sam@example.com", message: "Hi" });
    expect(mail?.text.startsWith("Hi Sam,")).toBe(true);
  });
});
