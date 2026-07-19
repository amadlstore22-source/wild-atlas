import { describe, it, expect, vi, afterEach } from "vitest";
import { rateLimit, clientIp, limitByIp } from "@/lib/rate-limit";

// Each test uses a unique key so the module-level bucket map can't leak state.
let n = 0;
const key = () => `test-key-${n++}`;

afterEach(() => vi.useRealTimers());

describe("rateLimit", () => {
  it("allows requests up to the limit", () => {
    const k = key();
    expect(rateLimit(k, 3, 60_000).ok).toBe(true);
    expect(rateLimit(k, 3, 60_000).ok).toBe(true);
    expect(rateLimit(k, 3, 60_000).ok).toBe(true);
  });

  it("blocks the request that exceeds the limit", () => {
    const k = key();
    for (let i = 0; i < 3; i++) rateLimit(k, 3, 60_000);
    const blocked = rateLimit(k, 3, 60_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("keeps separate counters per key", () => {
    const a = key();
    const b = key();
    rateLimit(a, 1, 60_000);
    expect(rateLimit(a, 1, 60_000).ok).toBe(false);
    // b is untouched by a's exhaustion.
    expect(rateLimit(b, 1, 60_000).ok).toBe(true);
  });

  it("allows again once the window has passed", () => {
    vi.useFakeTimers();
    const k = key();
    expect(rateLimit(k, 1, 1_000).ok).toBe(true);
    expect(rateLimit(k, 1, 1_000).ok).toBe(false);
    vi.advanceTimersByTime(1_001);
    expect(rateLimit(k, 1, 1_000).ok).toBe(true);
  });
});

describe("clientIp", () => {
  it("takes the left-most x-forwarded-for entry", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.5, 70.41.3.18" },
    });
    expect(clientIp(req)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("https://example.com", {
      headers: { "x-real-ip": "203.0.113.9" },
    });
    expect(clientIp(req)).toBe("203.0.113.9");
  });

  it("returns null when no ip header is present", () => {
    expect(clientIp(new Request("https://example.com"))).toBeNull();
  });

  it("prefers x-vercel-forwarded-for, which a front proxy cannot rewrite", () => {
    // If something sits in front of Vercel and appends to XFF, the Vercel
    // header still carries the edge's own view of the client.
    const req = new Request("https://example.com", {
      headers: {
        "x-vercel-forwarded-for": "203.0.113.5",
        "x-forwarded-for": "198.51.100.9",
      },
    });
    expect(clientIp(req)).toBe("203.0.113.5");
  });

  it("rejects a non-IP value instead of bucketing on it", () => {
    // A forged "X-Forwarded-For: <random string>" must not mint a fresh
    // rate-limit bucket. Unparseable means unknown, and unknown fails open.
    for (const bad of ["not-an-ip", "999.999.999.999", "<script>", "1.2.3", ""]) {
      const req = new Request("https://example.com", { headers: { "x-forwarded-for": bad } });
      expect(clientIp(req)).toBeNull();
    }
  });

  it("accepts IPv6", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "2001:db8::1" },
    });
    expect(clientIp(req)).toBe("2001:db8::1");
  });

  it("skips a junk header and uses the next valid one", () => {
    const req = new Request("https://example.com", {
      headers: { "x-vercel-forwarded-for": "garbage", "x-real-ip": "203.0.113.7" },
    });
    expect(clientIp(req)).toBe("203.0.113.7");
  });
});

describe("limitByIp", () => {
  const reqFrom = (ip: string) =>
    new Request("https://example.com", { headers: { "x-forwarded-for": ip } });

  it("returns null (allow) while under the limit", () => {
    expect(limitByIp(reqFrom("198.51.100.1"), `s${n++}`, 2, 60_000)).toBeNull();
  });

  it("returns a result (block) once over the limit", () => {
    const scope = `s${n++}`;
    const req = reqFrom("198.51.100.2");
    limitByIp(req, scope, 1, 60_000);
    const blocked = limitByIp(req, scope, 1, 60_000);
    expect(blocked).not.toBeNull();
    expect(blocked!.retryAfter).toBeGreaterThan(0);
  });

  it("fails OPEN when the client ip is unknown, rather than sharing one bucket", () => {
    const scope = `s${n++}`;
    const anon = new Request("https://example.com");
    // Far more calls than the limit — every one must be allowed through,
    // otherwise a missing header would take the contact form down globally.
    for (let i = 0; i < 20; i++) {
      expect(limitByIp(anon, scope, 1, 60_000)).toBeNull();
    }
  });
});
