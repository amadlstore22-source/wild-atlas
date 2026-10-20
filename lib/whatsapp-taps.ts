/**
 * Anonymous WhatsApp tap counts (owner, 2026-10-20: "calculate how many people
 * send us via WhatsApp as well, just like emails").
 *
 * Email enquiries reach the sheet with the client's details because the client
 * types them into our form. A WhatsApp tap leaves the site, and what the client
 * writes happens inside WhatsApp, which we cannot see. So this counts the tap
 * itself: date, language, page and which button. Nothing about the person, no
 * cookie, no IP, so it runs whatever the visitor chose on the cookie banner,
 * like the blog trip-box counter (app/api/click).
 *
 * A tap is not a lead: some people open WhatsApp and never send anything.
 *
 * Shared by the client listener (components/analytics/WhatsAppTapCounter.tsx)
 * and the route (app/api/wa-tap), so a button name the route does not accept
 * cannot be shipped (see __tests__/lib/whatsapp-taps.test.ts).
 */

/** Where a WhatsApp link sits. Set with data-wa="..." on the link; links
 *  without it are named by where they sit (footer, header, or page). */
export const WA_BUTTONS = [
  "floating",
  "booking-form",
  "mobile-bar",
  "large-group",
  "deposit",
  "trust-strip",
  "footer",
  "header",
  "page",
] as const;
export type WaButton = (typeof WA_BUTTONS)[number];

export const isWaButton = (b: unknown): b is WaButton =>
  typeof b === "string" && (WA_BUTTONS as readonly string[]).includes(b);

/** A site path such as /it/tours/agafay-cena-cammello-spettacolo-fuoco. No
 *  query string, so nothing a visitor typed into a search box can end up in
 *  the sheet. */
const PATH_RE = /^\/(en|fr|es|de|it|ar)(\/[a-z0-9-]{1,80}){0,3}$/;
export const isSitePath = (p: unknown): p is string =>
  typeof p === "string" && p.length <= 200 && PATH_RE.test(p);
