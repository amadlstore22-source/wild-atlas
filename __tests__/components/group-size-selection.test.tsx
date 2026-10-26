import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import BookingSidebar from "@/components/tours/BookingSidebar";
import CurrencyProvider from "@/components/ui/CurrencyProvider";
import { groupPriceTiers, lowestGroupPrice, type Tour } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import en from "@/dictionaries/en.json";

/**
 * THE INCIDENT (owner, 2026-10-26): when a visitor chose how many were
 * travelling, the matching row in the "Price per person by group size" table
 * only took a 40% tint of indigo-wash (#E8EBF2), a near-white on a near-white
 * card. Visitors could not tell which group size they had selected.
 *
 * Worse, when the chosen row was also the "Best value" row, the best-value
 * styling replaced the selected styling outright, so it showed NO selection at
 * all. Every tour's cheapest bracket is the one large groups pick.
 *
 * Nothing else catches it: aria-pressed was always right, it type-checks and
 * renders, and only a person looking at the screen could see the difference.
 * The rule now: exactly one row is selected, and the selected row, best value
 * or not, carries the solid indigo fill and a check mark.
 */
afterEach(cleanup);

const dict = en as unknown as Dictionary;
const withTable = (t: Tour) => groupPriceTiers(t).length > 1;

describe("the chosen group size is unmistakable in the price table", () => {
  const tours = toursFor("en").filter(withTable);

  it("has tours with a price table to check", () => {
    expect(tours.length).toBeGreaterThan(0);
  });

  it.each(tours.map((t) => [t.slug, t] as const))("%s", (_s, tour) => {
    const { container } = render(
      <CurrencyProvider>
        <BookingSidebar tour={tour} lang="en" dict={dict} />
      </CurrencyProvider>,
    );
    const rows = () => [...container.querySelectorAll<HTMLButtonElement>("ul button[aria-pressed]")];
    const best = lowestGroupPrice(tour).minPeople;

    groupPriceTiers(tour).forEach((tier, i) => {
      fireEvent.click(rows()[i]);
      const pressed = rows().filter((r) => r.getAttribute("aria-pressed") === "true");
      const where = `${tour.slug} @${tier.minPeople}${tier.minPeople === best ? " (best value)" : ""}`;
      expect(pressed, `${where}: exactly one row should be selected`).toHaveLength(1);
      const row = pressed[0];
      expect(
        row.className,
        `${where}: the selected row lost its solid fill. Keep "bg-indigo text-white" on the ` +
          `active branch in BookingSidebar, and let it win over the best-value styling.`,
      ).toMatch(/(^|\s)bg-indigo(\s|$)/);
      expect(row.querySelector("svg"), `${where}: the selected row has no check mark`).not.toBeNull();
      for (const other of rows().filter((r) => r !== row)) {
        expect(other.className, `${where}: an unselected row is filled like a selected one`).not.toMatch(
          /(^|\s)bg-indigo(\s|$)/,
        );
      }
    });
  });
});
