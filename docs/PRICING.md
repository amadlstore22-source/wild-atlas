# Group pricing — how the numbers were chosen

The per-person price falls as a group grows. This documents where the curve came
from, what it assumes, and what to check before changing it.

## The mechanism

On a private multi-day tour the vehicle and driver-guide cost the same whether
one person travels or six. Moroccan operators therefore quote per vehicle and
divide by headcount. Everything below follows from that.

Shared departures work the opposite way — you buy a seat, and a seat costs the
same however many book it. They get **no group discount**; a discount there is
lost margin, not persuasion.

## What competitors actually charge

Most operators hide their tiers behind "contact us for a quote". These three are
published in full by marrakech-desert-trips.com (verified August 2026):

| Pax | 3-day Merzouga | 4-day Merzouga | 4-day Mkch→Fes | % of solo |
|-----|---------------:|---------------:|---------------:|----------:|
| 1   | €790 | €915 | €1,135 | 100% |
| 2   | €435 | €515 | €635 | **~56%** |
| 3   | €365 | €435 | €545 | ~47% |
| 4   | €325 | €395 | €495 | ~43% |
| 5   | €295 | €365 | €465 | ~39% |
| 6   | €265 | €345 | €415 | ~36% |
| 7–9 | €245 | €325 | €395 | ~34% |
| 10–13 | €215 | €295 | €345 | ~30% |
| 14–17 | €195 | €275 | €315 | ~27% |

Three different tours, near-identical curves — a deliberate formula.

Fitting a line through their 3-day totals gives **≈€585 fixed + ≈€172 per head**.

> Note their advertised "from €195" is the **14–17 person** rate. A couple pays
> €435. Our headline is the price a solo traveller actually pays.

## Our cost model

Assembled from published Moroccan rates, not from internal figures — **replace
these with real numbers when you have them.**

| Item | Source range | Used |
|---|---|---|
| 4x4 + driver, per day | €150–300 | €150 (multi-day rate) |
| Desert camp, per person | 400–1,200 MAD (€37–111) | €37 |
| Dades hotel, per person | 150–300 MAD (€14–28) | €14 |

For a 3-day departure that is roughly **€270 fixed + €51 per head** at the lean
end, and about €450 + €98 at the expensive end.

## What that implies

At €320 solo the lean model gives a profit of about **zero**. The margin on a
booking is carried almost entirely by travellers 2 and up.

Profit per booking under three candidate curves (lean cost model):

| Pax | Flat 2.5%/head | **Current** | Market-matching |
|-----|---------------:|------------:|----------------:|
| 2 | €252 | **€224** | €172 |
| 4 | €714 | **€602** | €422 |
| 6 | €1,116 | **€942** | €654 |

Matching the market curve costs roughly a third of profit per booking, so it only
pays if it wins **47–71% more bookings**. That is a large bet on price
sensitivity that has not been measured. The current curve keeps ~84% of a flat
curve's profit while still undercutting the published competitor table at every
group size.

## The curve

Defined in `groupPriceTiers()` in `lib/tours.ts`.

```
multi-day   100 / 93 / 88 / 84 / 81 / 79%   (21% off at six)
single-day  100 / 96 / 94 / 92 / 91 / 90%   (10% off at six)
```

Duration decides the depth because a day tour's cost is mostly per-head — the
guide's fee barely shrinks per person. Applying the multi-day curve to a €35
private day tour took it to €22pp at six, which is a loss, not a saving.

A tour can override everything by setting `groupPricing` explicitly.

## The floor: never more than 15% under

Our price must not sit more than **15% below the cheapest comparable competitor**.

Undercutting is intended — it is the whole position. Undercutting by a third is
giving the trip away, and the modelled cost base leaves little room for it.

The floor is measured against the **cheapest** rival at each group size, not an
average. Fifteen percent under the mean can still be thirty percent under the
cheapest option a customer will actually find, which is the price they compare
against.

Encoded in `lib/competitor-prices.ts` (`MAX_UNDERCUT = 0.15`) and enforced by
`__tests__/lib/price-floor.test.ts`. The same file also guards the other
direction: `MAX_PREMIUM = 0.02` fails the build if we drift *above* a rival
selling the same trip.

Current position — every benchmarked tour sits at 10% under, comfortably inside
the floor:

| Tour | Ours @2 | Cheapest rival | Under by |
|---|---:|---:|---:|
| Sahara 3-day (Marrakech) | €392 | €435 | 10% |
| Marrakech → Fes 3-day | €572 | €635 | 10% |
| Erg Chigaga 3-day (Marrakech) | €459 | €510 | 10% |
| Erg Chigaga 3-day (Agadir) | €473 | €525 | 10% |
| Agadir → Fes 4-day | €567 | €630 | 10% |
| Family desert 4-day | €446 | €495 | 10% |
| Toubkal + Sahara 5-day | €644 | €715 | 10% |

**These tests fail when a competitor moves, not only when we do.** If a rival
cuts prices we can end up above the market without touching our own data. That
should surface as a failed build rather than as lost bookings, so re-check the
source pages roughly twice a year and update the table.

## Before you change it

Pull from the enquiry Google Sheet (every enquiry records `people`):

1. **Distribution of group size.** If 70% are couples, the 2-person tier is the
   only one that materially matters and the rest is decoration.
2. **Conversion by group size.** If 4–6 person enquiries convert *worse* than
   couples, price is plausibly the reason and a deeper 4+ tier is justified.
3. **Your real cost per departure.** One accurate number here replaces the whole
   published-rate model above.

Then re-run the profit table with real figures. The multipliers are the only
thing that needs to change.

## Guardrails

`__tests__/lib/group-pricing.test.ts` enforces:

- the solo price always equals the advertised headline price
- per-person price never rises with group size
- booking totals never fall as the group grows
- the marginal cost of adding a traveller stays within a 1.6× spread
- shared tours get no discount
- day tours discount less steeply than multi-day tours
