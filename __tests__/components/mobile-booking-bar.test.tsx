import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import BookingSidebar from "@/components/tours/BookingSidebar";
import CurrencyProvider from "@/components/ui/CurrencyProvider";
import { groupPriceTiers, lowestGroupPrice, perPersonPrice, type Tour } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import { formatPrice, formatAmount, priceIn, CURRENCIES, CURRENCY_COOKIE, type Currency } from "@/lib/currency-core";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import de from "@/dictionaries/de.json";
import es from "@/dictionaries/es.json";
import it_ from "@/dictionaries/it.json";
import ar from "@/dictionaries/ar.json";

/**
 * THE INCIDENT (2026-09-29, reported by the owner from a phone): on a tour
 * page the visitor tapped "3 people" in the group price table — the row lit
 * up at €320 per person — but the sticky bar at the bottom of the screen still
 * said "From €260 / person, 6+". The bar is the last thing a mobile visitor
 * reads before tapping Book, and it quoted a price for a group they had just
 * said they were not.
 *
 * Nothing else catches it: the bar and the table are the same component, it
 * type-checks, it renders, and the table itself was right. The rule is:
 *   - before any choice, the bar leads with the cheapest rate (deliberate —
 *     see the comment on the bar, and the owner asked for it to stay);
 *   - after a choice, it quotes that group size, its per-person rate and the
 *     total.
 *
 * Second defect found while checking it on a phone: in GBP the bar read
 * "3 people · £280 / person · Total £839". The total was converted from USD in
 * one go and rounded once, the per-person rate rounded separately, so the sum
 * a visitor can do in their head did not match. The same figure fed the
 * estimate inside the enquiry form. Totals now multiply the rounded
 * per-person figure; the assertion below checks the exact sum.
 *
 * The owner asked for this to hold in every locale and every currency. The
 * real CurrencyProvider is used (reading the same cookie the site sets), so a
 * bar that formatted with a hardcoded currency would fail here. Every tour is
 * checked in English/EUR, and each tour is ALSO checked in one other
 * locale × currency pair, rotating so every pair is exercised — the full
 * 6 × 4 × catalogue product would take minutes for no extra coverage of the
 * bar's logic, which has no per-locale or per-currency branch.
 */
afterEach(() => {
  cleanup();
  document.cookie = `${CURRENCY_COOKIE}=; path=/; max-age=0`;
});

const DICTS: Record<Locale, Dictionary> = { en, fr, de, es, it: it_, ar } as unknown as Record<
  Locale,
  Dictionary
>;
const LOCALES = Object.keys(DICTS) as Locale[];

const hasTierTable = (t: Tour) => {
  const tiers = groupPriceTiers(t);
  return tiers.length > 1 && tiers[tiers.length - 1].price < tiers[0].price;
};

function checkBar(tour: Tour, lang: Locale, currency: Currency) {
  document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/`;
  const b = DICTS[lang].booking;
  const fmt = (n: number) => formatPrice(n, currency);
  const where = `${lang}/${currency}/${tour.slug}`;

  const { container } = render(
    <CurrencyProvider>
      <BookingSidebar tour={tour} lang={lang} dict={DICTS[lang]} />
    </CurrencyProvider>,
  );
  const bar = () => container.querySelector<HTMLElement>('[data-testid="mobile-bar-quote"]')!.textContent ?? "";

  expect(bar(), `${where}: before a choice the bar must lead with the cheapest rate`).toContain(
    fmt(lowestGroupPrice(tour).price),
  );
  expect(bar(), `${where}: bar showed a total before anything was chosen`).not.toContain(b.groupPricingTotal);

  const rows = [...container.querySelectorAll<HTMLButtonElement>("button[aria-pressed]")];
  for (const tier of groupPriceTiers(tour)) {
    // Arabic writes the open-ended row as "+6", every other locale as "6+".
    const row = rows.find((r) => new RegExp(`^\\+?${tier.minPeople}(?!\\d)`).test(r.textContent?.trim() ?? ""));
    expect(row, `${where}: no price-table row for ${tier.minPeople}`).toBeTruthy();
    fireEvent.click(row!);

    const per = perPersonPrice(tour, tier.minPeople);
    const word = tier.minPeople === 1 ? b.groupPricingPerson : b.groupPricingPeopleWord;
    const text = bar();
    const msg = `${where} @${tier.minPeople}: the bar did not follow the row the visitor tapped`;
    expect(text, msg).toContain(`${tier.minPeople} ${word}`);
    expect(text, msg).toContain(fmt(per));
    expect(text, msg).toContain(b.groupPricingTotal);
    // The total must be exactly the per-person figure ON SCREEN times the
    // group. Converting the USD total instead showed "£280 / person" and
    // "Total £839" for three people (see formatGroupTotal).
    expect(text, `${where} @${tier.minPeople}: total is not per-person × travellers`).toContain(
      `${b.groupPricingTotal} ${formatAmount(priceIn(per, currency) * tier.minPeople, currency)}`,
    );
  }
}

describe("mobile booking bar follows the chosen group size", () => {
  const english = toursFor("en").filter(hasTierTable);

  it("has tours with a price table to check", () => {
    expect(english.length).toBeGreaterThan(0);
  });

  it.each(english.map((t) => [t.slug, t] as const))("en/EUR %s", (_s, tour) => checkBar(tour, "en", "EUR"));

  const pairs = LOCALES.flatMap((l) => CURRENCIES.map((c) => [l, c] as const));
  it.each(pairs)("%s / %s", (lang, currency) => {
    const idx = pairs.findIndex(([l, c]) => l === lang && c === currency);
    const tours = toursFor(lang).filter(hasTierTable).filter((_, i) => i % pairs.length === idx);
    // Pairs past the catalogue size fall back to the first tour so none is skipped.
    for (const tour of tours.length ? tours : toursFor(lang).filter(hasTierTable).slice(0, 1)) {
      checkBar(tour, lang, currency);
    }
  });
});
