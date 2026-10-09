import { describe, it, expect } from "vitest";
import { EVENTS, priceToursForEvent, toursForEvent } from "@/lib/events";
import { eventsFor } from "@/lib/events.i18n";
import { lowestGroupPrice, TOURS } from "@/lib/tours";

/**
 * The 8-Day Morocco Highlights departures page said "Trips from €120 /
 * person" in its header and sidebar, while the trip itself sells at €889 a
 * seat on its own tour page. The owner spotted the two pages disagreeing
 * (2026-10-07).
 *
 * The headline took the cheapest of ALL the event's linked tours, and for a
 * set departure those include cheaper alternatives (the shared 3-day desert
 * tour at €120) for people the dates do not suit. Right for a festival, where
 * any linked trip is a way to see it; wrong for our own departure, where the
 * price is the seat price.
 *
 * Nothing else catches it: both numbers are real prices of real tours.
 */
describe("event headline price", () => {
  it("every set-departure event is headed by its own trip's price", () => {
    const wrong = EVENTS.filter((e) => e.departureDates?.length).flatMap((event) => {
      const own = priceToursForEvent(event);
      return own
        .filter((t) => !t.fixedDeparture?.dates.some((d) => event.departureDates!.includes(d)))
        .map((t) => `${event.slug}: headline uses ${t.slug} (€${lowestGroupPrice(t).price}), not the departure trip`);
    });
    expect(
      wrong,
      `A set-departure event must quote the seat price of the trip that runs on\n` +
        `its dates. Give that tour a fixedDeparture with the same dates, or fix\n` +
        `priceToursForEvent:\n  ` + wrong.join("\n  "),
    ).toEqual([]);
  });

  // Compared against the tour's own seat price rather than a literal: the
  // owner reprices this trip (889 -> 1067 on 2026-10-09), and a hard-coded
  // figure made this test fail on a correct change.
  it("the 8-day Highlights page quotes the same price as its tour page", () => {
    const seat = TOURS.find((t) => t.slug === "morocco-highlights-toubkal-sahara-8day")!.price;
    for (const lang of ["en", "fr", "es", "de", "it", "ar"] as const) {
      const event = eventsFor(lang).find((e) => e.slug === "morocco-highlights-8day-departures");
      expect(event, `${lang}: event missing`).toBeDefined();
      const prices = priceToursForEvent(event!).map((t) => lowestGroupPrice(t).price);
      expect(prices, `${lang}: headline price`).toEqual([seat]);
    }
  });

  it("festivals still quote the cheapest linked trip", () => {
    for (const event of EVENTS.filter((e) => !e.departureDates?.length)) {
      expect(priceToursForEvent(event).map((t) => t.slug), event.slug).toEqual(
        toursForEvent(event).map((t) => t.slug),
      );
    }
  });
});
