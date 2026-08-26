# -*- coding: utf-8 -*-
"""Re-append a price sentence to the descriptions the trimmer stripped.

WHAT HAPPENED
-------------
scripts/seo/trim_serp_lengths.py cuts descriptions at a sentence boundary to
fit 160 characters. Most tour descriptions END with their price sentence
("From $99."), so the price was the sentence that fell off -- on all 23
descriptions it trimmed. __tests__/lib/currency.test.ts caught it immediately:

    ourika-valley-day-hike: quotes a price that is neither the solo rate (€86)
    nor the cheapest group tier (€26)

A price in the SERP snippet is one of the strongest click signals a tour
listing has, so dropping it to gain 12 characters is a bad trade.

WHICH PRICE
-----------
The GROUP rate with its qualifier -- "From $99 pp for 4+" -- matching the three
hand-written priority pages and AggregateOffer.lowPrice. `tour.price` is the
solo rate and is the most expensive per-person figure a tour has; leading with
it makes every listing look worse than the competition. Leading with the group
rate unlabelled would promise a price the page does not charge a solo traveller.

Prices are written in USD with a "$" because localisePrice() in the tour page
rewrites `/\\$[\\d,]+/` into the display currency at render time. Writing "€"
here would bypass that conversion and hard-code a rate that drifts -- the exact
bug that made articles quote €245 beside a booking page saying €225.

BUDGET
------
The price sentence is appended only if it fits in 160. Where it does not, an
earlier whole sentence is dropped to make room, because the price outranks a
descriptive clause in a snippet.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/readd_meta_prices.py
"""
import io
import re

DESC_MAX = 160
PAT = re.compile(r'\n    seoDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"')
# Any currency, not just "$". An earlier version matched only \$\d and so
# treated a description already quoting "€153 pp for 6+" or "€30 per person" as
# priceless, appending a SECOND price: "From €153 pp for 6+. From $176 pp for
# 6+." and "€30 per person. From $35.".
HAS_PRICE = re.compile(r"[$€£]\s?\d")
SENTENCES = re.compile(r"[^.!?]*[.!?]+\s*|[^.!?]+$")


def load_tours():
    """Slug -> (solo price, cheapest tier price, minPeople for that tier).

    Mirrors groupPriceTiers()/lowestGroupPrice() in lib/tours.ts closely enough
    for the price SENTENCE: explicit groupPricing when present, otherwise the
    documented multiplier ladder. Shared departures are sold per seat and have
    no ladder, so they keep the solo price with no qualifier.
    """
    src = io.open("lib/tours.ts", encoding="utf-8").read()
    out = {}
    for block in src.split('\n    slug: "')[1:]:
        slug = block[: block.index('"')]
        m = re.search(r"\n    price: (\d+)", block)
        if not m:
            continue
        price = int(m.group(1))

        gp = re.search(r"\n    groupPricing: \[(.*?)\n    \]", block, re.S)
        tiers = []
        if gp:
            tiers = [(int(a), int(b)) for a, b in
                     re.findall(r"minPeople: (\d+), price: (\d+)", gp.group(1))]

        shared = '\n    tourType: "shared"' in block
        if shared or not tiers:
            # Derived ladders exist for private tours, but their cheapest tier
            # is a multiplier of price and the sentence reads better with the
            # real stored number. Only explicit ladders get a qualifier.
            out[slug] = (price, price, 1)
        else:
            low = min(tiers, key=lambda t: t[1])
            out[slug] = (price, low[1], low[0])
    return out


def price_sentence(low, min_people):
    if min_people > 1:
        return "From $%d pp for %d+." % (low, min_people)
    return "From $%d." % low


def fit(body, sentence):
    """Append `sentence`, dropping whole leading sentences until it fits."""
    if len(body) + 1 + len(sentence) <= DESC_MAX:
        return body + " " + sentence
    parts = [s for s in SENTENCES.findall(body) if s.strip()]
    while len(parts) > 1:
        parts.pop()  # drop the last descriptive sentence, keep the opener
        trimmed = "".join(parts).strip()
        if len(trimmed) + 1 + len(sentence) <= DESC_MAX:
            return trimmed + " " + sentence
    return body  # cannot fit without gutting the description


def run():
    prices = load_tours()
    path = "lib/tours.ts"
    src = io.open(path, encoding="utf-8").read()
    blocks = src.split('\n    slug: "')
    fixed = 0

    for i, block in enumerate(blocks[1:], 1):
        slug = block[: block.index('"')]
        m = PAT.search(block)
        if not m or slug not in prices:
            continue
        body = m.group(1)
        if HAS_PRICE.search(body):
            continue  # already quotes a price

        _, low, min_people = prices[slug]
        new = fit(body.rstrip(), price_sentence(low, min_people))
        if new == body:
            print("  SKIP %-32s no room for a price sentence" % slug)
            continue

        blocks[i] = (block[: m.start()] + '\n    seoDescription:\n      "'
                     + new + '"' + block[m.end():])
        fixed += 1
        print("  %-32s %3d chars  %s" % (slug, len(new), new[-24:]))

    io.open(path, "w", encoding="utf-8", newline="\n").write('\n    slug: "'.join(blocks))
    print("re-added price to %d descriptions" % fixed)


run()
