import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import BookingSidebar from "@/components/tours/BookingSidebar";
import CurrencyProvider from "@/components/ui/CurrencyProvider";
import { TOURS } from "@/lib/tours";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import en from "@/dictionaries/en.json";

/**
 * THE INCIDENT (found 2026-11-06 on the local preview): the date picker's
 * latest date was built as a LOCAL midnight two years ahead and then printed
 * with toISOString(), which is UTC. Wherever the clock runs ahead of UTC
 * (most of Europe, where many visitors are) local midnight is still the
 * previous day in UTC, so the
 * server, rendering in UTC, wrote max="2028-11-06" and the visitor's browser
 * computed max="2028-11-05". React reported a hydration mismatch on every
 * tour page and left the server's attribute in place.
 *
 * Nothing else catches it: it type-checks, the build passes, the page looks
 * right, and the only symptom is a console error that depends on the
 * timezone of whoever opens the page. So this renders the booking box under
 * several timezones at a moment close to midnight UTC, and requires the
 * date bounds to come out identical in all of them.
 */
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const dict = en as unknown as Dictionary;
const ZONES = ["UTC", "Europe/Paris", "Africa/Casablanca", "Pacific/Auckland", "America/Los_Angeles"];
const tour = TOURS.find((t) => t.slug === "sahara-3day-marrakech")!;

function bounds(zone: string) {
  process.env.TZ = zone;
  const { container } = render(
    <CurrencyProvider>
      <BookingSidebar tour={tour} lang="en" dict={dict} />
    </CurrencyProvider>,
  );
  const input = container.querySelector<HTMLInputElement>("#booking-date")!;
  const out = `${input.getAttribute("min")}..${input.getAttribute("max")}`;
  cleanup();
  return out;
}

describe("booking date bounds do not depend on the viewer's timezone", () => {
  it.each(["2026-11-06T00:30:00Z", "2026-11-06T23:30:00Z"])("at %s", (now) => {
    const original = process.env.TZ;
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(now));
    try {
      const seen = Object.fromEntries(ZONES.map((z) => [z, bounds(z)]));
      expect(new Set(Object.values(seen)).size, JSON.stringify(seen, null, 2)).toBe(1);
    } finally {
      process.env.TZ = original;
    }
  });
});
