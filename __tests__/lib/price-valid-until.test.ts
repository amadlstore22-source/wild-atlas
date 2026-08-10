import { describe, expect, it } from "vitest";
import { priceValidUntil } from "@/lib/seo/schema";

describe("priceValidUntil", () => {
  it("returns a bare ISO date, which is the format Google expects", () => {
    expect(priceValidUntil(new Date("2026-08-10T14:33:00Z"))).toBe("2027-08-10");
  });

  it("is one year ahead, so a fresh build always ships a future date", () => {
    const now = new Date();
    const until = new Date(priceValidUntil(now));
    expect(until.getTime()).toBeGreaterThan(now.getTime());
  });

  it("does not mutate the date it is given", () => {
    const from = new Date("2026-08-10T00:00:00Z");
    priceValidUntil(from);
    expect(from.toISOString()).toBe("2026-08-10T00:00:00.000Z");
  });

  it("handles 29 February, where the target year has no matching day", () => {
    // setFullYear CLAMPS to the last valid day (2029-02-28) rather than
    // rolling into March. Either would be fine for a validity horizon, but it
    // is pinned so a future refactor to date arithmetic that rolls forward
    // instead shows up as a deliberate change rather than a silent one.
    expect(priceValidUntil(new Date("2028-02-29T00:00:00Z"))).toBe("2029-02-28");
  });
});
