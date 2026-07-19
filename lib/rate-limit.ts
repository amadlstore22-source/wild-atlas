/**
 * Minimal fixed-window rate limiter for the public API routes.
 *
 * Both routes call Resend on unauthenticated input, so without a limit a single
 * client can burn the send quota, damage our sending reputation, or use the
 * newsletter route to mail arbitrary addresses.
 *
 * Deliberately in-memory: the site runs as a small serverless deployment and
 * this needs no infrastructure. The trade-off is that each instance keeps its
 * own counter, so the effective limit is per-instance rather than global, and
 * counters reset on cold start. That is acceptable for slowing casual abuse.
 * If we ever need a hard global guarantee, swap the Map for Upstash/Redis and
 * keep this signature.
 *
 * The identity this buckets on is only as good as the IP header — see clientIp.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

// Bound the map so a flood of unique IPs can't grow it without limit.
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets. Send as Retry-After when ok is false. */
  retryAfter: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    if (buckets.size >= MAX_KEYS) {
      // Drop expired entries before admitting a new key.
      for (const [k, v] of buckets) if (now >= v.resetAt) buckets.delete(k);
      // Still full of live entries: fail closed rather than grow unbounded.
      if (buckets.size >= MAX_KEYS) return { ok: false, retryAfter: Math.ceil(windowMs / 1000) };
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Best-effort client IP, preferring the headers a client cannot forge.
 *
 * Vercel overwrites `x-forwarded-for` at the edge and does not forward external
 * IPs, specifically to prevent spoofing, so on this deployment XFF is already
 * trustworthy. `x-vercel-forwarded-for` is the same value but is NOT rewritten
 * when a proxy (e.g. Cloudflare) sits in front of Vercel, so it survives a
 * front-proxy that appends attacker-controlled entries to XFF. We read it first
 * for that reason; XFF and x-real-ip remain as fallbacks for local dev and any
 * non-Vercel host.
 *
 * Only the LEFT-MOST entry is used, and it must parse as an IP address: a
 * forged "X-Forwarded-For: not-an-ip" would otherwise become its own rate-limit
 * bucket and hand an attacker unlimited fresh budgets.
 *
 * Returns null when no IP can be determined. Callers must FAIL OPEN on null
 * rather than bucket every such request under one key: that would put every
 * visitor into a single shared budget and turn a missing header into a global
 * outage of the contact form.
 */
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

function validIp(raw: string | undefined): string | null {
  const ip = raw?.trim();
  if (!ip || ip.length > 45) return null;
  // IPv4: reject 999.999.999.999 and friends.
  if (IPV4.test(ip)) {
    return ip.split(".").every((o) => Number(o) <= 255) ? ip : null;
  }
  // IPv6: hex groups and colons only (accepts "::1" and IPv4-mapped forms).
  if (/^[0-9a-fA-F:]+$/.test(ip) && ip.includes(":")) return ip;
  return null;
}

export function clientIp(req: Request): string | null {
  const candidates = [
    req.headers.get("x-vercel-forwarded-for"),
    req.headers.get("x-forwarded-for"),
    req.headers.get("x-real-ip"),
  ];
  for (const header of candidates) {
    if (!header) continue;
    const ip = validIp(header.split(",")[0]);
    if (ip) return ip;
  }
  return null;
}

/**
 * Convenience wrapper: rate-limits by client IP, failing open when the IP is
 * unknown. Returns null when the request should proceed.
 */
export function limitByIp(
  req: Request,
  scope: string,
  limit: number,
  windowMs: number
): RateLimitResult | null {
  const ip = clientIp(req);
  if (!ip) return null; // fail open — see clientIp
  const res = rateLimit(`${scope}:${ip}`, limit, windowMs);
  return res.ok ? null : res;
}
