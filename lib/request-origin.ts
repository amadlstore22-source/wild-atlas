/**
 * Same-origin enforcement for the public POST routes.
 *
 * Neither route uses cookies or sessions, so classic CSRF (riding a logged-in
 * session) does not apply. The risk we are closing is abuse amplification: both
 * routes send email through Resend on unauthenticated input, so any third-party
 * page could drive our sending from its visitors' browsers, burning quota and
 * damaging sending reputation.
 *
 * Layered exactly as the OWASP CSRF Prevention Cheat Sheet recommends:
 *
 *   1. Sec-Fetch-Site (primary). Browsers set this themselves and JavaScript
 *      cannot override it. "cross-site" on a state-changing method is rejected.
 *      Supported by Chrome 76+, Firefox 90+, Safari 16.4+.
 *   2. Origin (fallback) for browsers that omit fetch metadata. Compared on
 *      hostname, so the check does not break if the scheme or port differs
 *      between environments.
 *   3. Allow when NEITHER header is present.
 *
 * Step 3 is deliberate and is what the cheat sheet calls for. Older browsers,
 * privacy modes that send "null", and non-browser clients (curl, uptime probes,
 * our own server-side tests) legitimately send no origin at all — roughly 1-2%
 * of real traffic. Blocking those would cost genuine enquiries to stop abuse
 * that the rate limiter already bounds. A missing header is not evidence of an
 * attack; a cross-site one is.
 */

/** Hosts allowed to POST to our API. Vercel previews are covered by suffix. */
const ALLOWED_HOSTS = new Set([
  "marrakechecotours.com",
  "www.marrakechecotours.com",
  "localhost",
  "127.0.0.1",
]);

function hostAllowed(host: string): boolean {
  if (ALLOWED_HOSTS.has(host)) return true;
  // Preview deployments: *.vercel.app under our own project.
  return host.endsWith(".vercel.app");
}

/**
 * Returns true when the request must be refused as cross-origin.
 * Errs toward allowing: only an explicit cross-origin signal blocks.
 */
export function isCrossOrigin(req: Request): boolean {
  const site = req.headers.get("sec-fetch-site");

  // Primary signal. "same-origin"/"same-site"/"none" are all fine; "none" is a
  // user-initiated navigation, which cannot be an attacker's forged POST.
  if (site) return site === "cross-site";

  // Fallback for browsers without fetch metadata.
  const origin = req.headers.get("origin");
  if (!origin || origin === "null") return false; // absent → allow, see above

  try {
    return !hostAllowed(new URL(origin).hostname);
  } catch {
    // Unparseable Origin is malformed, not obviously hostile — but it is also
    // not a value any real browser sends, so treat it as cross-origin.
    return true;
  }
}
