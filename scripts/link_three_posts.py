# -*- coding: utf-8 -*-
"""Give the three new posts inbound internal links.

__tests__/lib/orphan-posts.test.ts failed on all three, which is the test
working: a post nothing links to has nothing on the site voting for it, and
that guard exists because four commercial pages once sat at positions 48-73
for exactly this reason.

Each link below is added to a post ALREADY discussing the topic, in a sentence
that earns its place. A link block bolted to the end of an unrelated article
passes the test and helps nobody.
"""
import io

# (host slug, anchor text to find, sentence to append after that paragraph)
LINKS = [
    # --- festivals calendar ---
    ("visiting-morocco-during-ramadan",
     "\n\nRamadan is one of several Moroccan dates that move from year to year. "
     "Our [festivals calendar by month](/en/blog/morocco-festivals-calendar-by-month) "
     "sets out which are fixed, which follow a harvest, and which are decided "
     "by moon sighting.\n"),

    ("best-time-to-visit-morocco",
     "\n\nIf a particular festival is what you are travelling for, the timing "
     "question changes shape — see our "
     "[festivals calendar by month](/en/blog/morocco-festivals-calendar-by-month) "
     "for which dates are confirmed and which are still a window.\n"),

    # --- transport guide ---
    ("marrakech-to-fes-road-trip-guide",
     "\n\nIf you are weighing this against the train, or wondering which parts "
     "of Morocco the railway actually reaches, see "
     "[getting around Morocco](/en/blog/getting-around-morocco-transport-guide) "
     "— trains, buses, grands taxis and where each stops being useful.\n"),

    ("how-many-days-do-you-need-in-morocco",
     "\n\nHow far you get in the time you have depends heavily on how you move. "
     "[Getting around Morocco](/en/blog/getting-around-morocco-transport-guide) "
     "has the real journey times: 2h10 Tangier to Casablanca by high-speed rail, "
     "but no train at all to the desert.\n"),

    # --- sahara weather ---
    ("what-to-pack-desert-tour-morocco",
     "\n\nWhat you need depends enormously on the month. "
     "[Sahara weather month by month](/en/blog/sahara-desert-weather-what-to-expect) "
     "has the temperatures — 19°C days in January against 43°C in July, and "
     "nights that fall close to freezing in winter.\n"),

    ("sahara-desert-morocco-what-to-expect",
     "\n\nFor the numbers behind that — highs, lows and the best months to come — "
     "see [Sahara weather month by month](/en/blog/sahara-desert-weather-what-to-expect).\n"),

    ("merzouga-vs-zagora-which-desert-tour",
     "\n\nWhichever you choose, the season matters as much as the destination: "
     "[Sahara weather month by month](/en/blog/sahara-desert-weather-what-to-expect) "
     "covers when to go and what the nights actually do.\n"),
]


def run():
    path = "lib/blog.ts"
    src = io.open(path, encoding="utf-8").read()
    added = 0

    for slug, sentence in LINKS:
        marker = 'slug: "%s"' % slug
        i = src.find(marker)
        if i < 0:
            print("  host not found:", slug)
            continue

        # Bound to this post: find its content template literal and its end.
        c = src.find("content: " + chr(96), i)
        if c < 0:
            print("  no content block:", slug)
            continue
        end = src.find(chr(96) + ",", c + 10)
        if end < 0:
            print("  unterminated content:", slug)
            continue

        body = src[c:end]
        target = sentence.strip().split("](")[1].split(")")[0]
        if target in body:
            print("  already linked:", slug)
            continue

        src = src[:end] + sentence + src[end:]
        added += 1
        print("  linked %-44s -> %s" % (slug, target))

    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("added %d inbound links" % added)


run()
