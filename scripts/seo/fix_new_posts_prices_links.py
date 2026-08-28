# -*- coding: utf-8 -*-
"""Fix what the test suite caught on the four new posts.

TWO REAL DEFECTS, BOTH CAUGHT BY EXISTING TESTS
-----------------------------------------------
1. blog-prices.test.ts -- a "cost" post must quote its tour's own converted
   price. The Aguelzim post said "current prices are on the tour page", which
   dodges the exact question the post exists to answer, and the 8-day post
   cited the 4-day comparison without the euro figure the test looks for.
   Prices are stored in USD and rendered in EUR at 0.86693, so the figures
   below are the CONVERTED ones -- quoting the stored number would overstate
   every price by about 15%, which is the incident that test was written for.

2. orphan-posts.test.ts -- three of the four new posts had no inbound link.
   Writing a post that nothing links to reproduces the exact problem this
   whole batch was meant to fix. The irony was caught by the suite rather
   than by me.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/fix_new_posts_prices_links.py
"""
import io

PATH = "lib/blog.ts"

# --- 1. real prices, converted ---------------------------------------------
PRICE_FIXES = [
    (
        "Our [3-day Aguelzim trek](/en/tours/toubkal-aguelzim-pass-3day) is priced per person on\na sliding group scale, like all our private departures: the guide and transport are a\nfixed cost divided among your party, so the per-person rate falls as the group grows.\nCurrent prices are on the tour page and include the licensed guide, refuge nights, all\nmeals on the mountain, mule support and return transport from Marrakech.",
        "Our [3-day Aguelzim trek](/en/tours/toubkal-aguelzim-pass-3day) is EUR600 for one\nperson, EUR302 each for two, and EUR230 each at six. Like all our private departures it\nis priced on a sliding scale, because the guide and the transport are a fixed cost\ndivided among your party -- so the per-person rate falls as the group grows, and a solo\ntrekker carries the whole thing alone.\n\nThat includes the licensed mountain guide, refuge nights, all meals on the mountain,\nmule support for group gear, national park fees and return transport from Marrakech.",
    ),
    (
        "| Toubkal summit | 4-day Toubkal trek | EUR650 |",
        "| Toubkal summit | [4-day Toubkal trek](/en/tours/toubkal-summit-trek-4day) at EUR650 solo | EUR650 |",
    ),
]

# --- 2. inbound links -------------------------------------------------------
# Each new post linked from a post already discussing its topic, in prose that
# earns its place rather than a bare "see also".
LINK_FIXES = [
    # 8-day cost guide <- the 5-day combined cost post (closest topic match).
    (
        "toubkal-sahara-5day-cost",
        "\n\nIf eight days suits you better than five, the\n[8-day Toubkal and Sahara tour](/en/blog/toubkal-sahara-8-day-tour-cost) runs on set\ndates at a flat seat price, which works out cheaper for solo travellers than any private\nitinerary can.\n",
    ),
    # Tibherine <- the complete guide, which already has the section.
    (
        "how-to-climb-toubkal-complete-guide",
        "\n\nThe full story of the crash, and why most accounts of it get the details wrong, is in\n[the plane wreck on Tibherine](/en/blog/tibherine-plane-wreck-toubkal).\n",
    ),
    # Aguelzim <- the 4-day cost post, where someone is comparing routes.
    (
        "toubkal-4-day-trek-cost",
        "\n\nIf you would rather avoid the Mizane valley crowds entirely, the\n[3-day Aguelzim pass trek](/en/blog/toubkal-aguelzim-pass-trek-cost) crosses at 3,560 m\nand reaches the refuge from above -- harder, quieter, and better looking.\n",
    ),
    # March <- toubkal-weather-by-month, the natural seasonal parent.
    (
        "toubkal-weather-by-month",
        "\n\nMarch is the month that catches most people out, and it has its own guide:\n[climbing Toubkal in March](/en/blog/climbing-toubkal-in-march).\n",
    ),
]


def run():
    src = io.open(PATH, encoding="utf-8").read()

    for old, new in PRICE_FIXES:
        assert src.count(old) == 1, "price fix anchor not found once: %r" % old[:60]
        src = src.replace(old, new)
        print("  price  %s..." % new[:52].replace("\n", " "))

    for slug, addition in LINK_FIXES:
        key = '    slug: "%s",' % slug
        assert src.count(key) == 1, "%s: expected exactly one post" % slug
        at = src.index(key)
        c = src.index("content: `", at)
        # Existing posts close with "\n    `," ; the four added by
        # add_four_posts_2026_08.py close with "`," directly after the final
        # newline of the content. Take whichever backtick terminator comes
        # first so both shapes work.
        end = src.index("`,", c + len("content: `"))
        assert addition.strip()[:40] not in src[c:end], "%s already linked" % slug
        src = src[:end] + addition + src[end:]
        print("  link   %s -> new post" % slug)

    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("\ndone")


run()
