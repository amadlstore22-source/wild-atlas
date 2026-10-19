import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Security audit, 2026-10-19. The contact route sends a confirmation email to
 * whatever address is typed into the form, and it used to repeat the typed
 * name and tour verbatim. So a script could post
 *   { email: "victim@example.com", name: "Your refund: http://scam.example" }
 * and our domain would mail the victim "Hi Your refund: http://scam.example".
 * Spam sent that way burns the domain's sending reputation, which is what
 * every real client email depends on. Typecheck, build and the logging tests
 * all passed with it.
 *
 * This runs the real route with delivery mocked and reads the email it would
 * send. It also pins the honeypot (a bot that fills the hidden field gets a
 * normal "ok" and nothing is sent) and the per-address cap on confirmations.
 */

const fetchMock = vi.fn();

beforeEach(() => {
  vi.resetModules();
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env.RESEND_API_KEY = "re_test";
  delete process.env.SHEET_WEBHOOK_URL;
  delete process.env.SHEET_WEBHOOK_SECRET;
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({ ok: true, status: 200, text: async () => "" });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.RESEND_API_KEY;
});

let ip = 0;
async function post(route: "contact" | "newsletter", body: object) {
  const { POST } = await import(`@/app/api/${route}/route`);
  const req = new Request(`http://localhost:3000/api/${route}`, {
    method: "POST",
    // A fresh IP per request, so the per-IP limiter never hides what the
    // per-address limits do.
    headers: { "Content-Type": "application/json", origin: "http://localhost:3000", "x-forwarded-for": `198.51.100.${++ip % 250}` },
    body: JSON.stringify(body),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return POST(req as any);
}

/** The emails the route asked Resend to send, as { to, subject, text }. */
function sent() {
  return fetchMock.mock.calls
    .filter((c) => String(c[0]).includes("api.resend.com"))
    .map((c) => JSON.parse(c[1].body) as { to: string[]; subject: string; text: string });
}
const toVisitor = (addr: string) => sent().filter((m) => m.to.includes(addr));

describe("contact form cannot be used to mail strangers our wording", () => {
  it("never repeats a link-like name or an invented tour to the typed address", async () => {
    const res = await post("contact", {
      type: "booking",
      name: "Your refund is ready: http://scam.example",
      email: "victim@example.com",
      tour: "Claim your prize at win-now.xyz",
      people: 2,
    });
    expect(res.status).toBe(200);
    const [mail] = toVisitor("victim@example.com");
    expect(mail, "a confirmation should still go out").toBeDefined();
    const all = mail.subject + "\n" + mail.text;
    expect(all, "the typed name must not be echoed").not.toContain("scam.example");
    expect(all, "an unknown tour must not be echoed").not.toContain("win-now");
    expect(mail.text.startsWith("Hello,"), "falls back to a plain greeting").toBe(true);
  });

  it("still greets a real visitor by name and quotes a real tour", async () => {
    await post("contact", { type: "booking", name: "Amina", email: "amina@example.com", tour: "Marrakech to Merzouga — 3-Day Desert Tour", people: 2 });
    const [mail] = toVisitor("amina@example.com");
    expect(mail.text.startsWith("Hi Amina,")).toBe(true);
    expect(mail.text).toContain("Marrakech to Merzouga — 3-Day Desert Tour");
  });

  it("caps confirmations to one address, while every enquiry still reaches us", async () => {
    for (let i = 0; i < 6; i++) await post("contact", { type: "general", name: "Sam", email: "same@example.com", message: "hi" });
    expect(toVisitor("same@example.com")).toHaveLength(3);
    expect(sent().filter((m) => m.subject.startsWith("Contact:"))).toHaveLength(6);
  });

  it("answers a filled honeypot with ok and sends nothing", async () => {
    const res = await post("contact", { type: "general", name: "Bot", email: "bot@example.com", message: "buy", website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("newsletter: honeypot sends nothing, and one address gets at most 2 welcomes a day", async () => {
    await post("newsletter", { email: "bot@example.com", website: "x" });
    expect(fetchMock).not.toHaveBeenCalled();
    for (let i = 0; i < 5; i++) await post("newsletter", { email: "target@example.com" });
    expect(toVisitor("target@example.com")).toHaveLength(2);
  });
});
