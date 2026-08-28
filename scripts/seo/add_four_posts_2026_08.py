# -*- coding: utf-8 -*-
"""Four new posts: the 8-day cost guide, Tibherine, March Toubkal, Aguelzim.

WHY THESE FOUR
--------------
Measured against the catalogue rather than guessed. Counting how many times
each tour is mentioned across lib/blog.ts gives:

    sahara-3day-marrakech          66
    toubkal-summit-trek-4day       44
    toubkal-circuit-ifni-lake-6day 15
    morocco-highlights-...-8day     0   <- newest, most expensive product
    toubkal-aguelzim-pass-3day      1

The tours that rank are the ones the blog votes for. Two of these posts exist
to fix that; the other two target demand the competition has not written up.

FACT-CHECKING NOTE (Tibherine)
------------------------------
Secondary travel sources say the crash killed "four crew". The Bureau of
Aircraft Accidents Archives record says EIGHT. We publish eight, because the
accident record is primary and the travel blogs are not -- the same rule
lib/events.ts enforces with sourceUrl, and the same reason.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_four_posts_2026_08.py
"""
import io

PATH = "lib/blog.ts"

POSTS = []

# ---------------------------------------------------------------------------
# 1. The 8-day cost guide -- the proven "cost" format, and the orphan fix.
# ---------------------------------------------------------------------------
POSTS.append({
    "slug": "toubkal-sahara-8-day-tour-cost",
    "title": "What Does the 8-Day Toubkal and Sahara Tour Cost? (2027 Departures)",
    "excerpt": "Eight days, two objectives: the highest summit in North Africa and the dunes of Erg Chebbi. Here is what a set-date departure actually costs, how it compares with booking the parts separately, and why the seat price does not change with group size.",
    "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
    "category": "trekking",
    "region": "atlas-mountains",
    "readTime": 8,
    "tags": ["Toubkal", "Sahara", "Erg Chebbi", "trekking", "Morocco"],
    "seoTitle": "8-Day Toubkal and Sahara Tour Cost — 2027 Departures",
    "seoDescription": "What the 8-day Toubkal summit and Sahara desert trip costs: EUR889 per person on set departures, versus EUR1,413 booking the same ground separately.",
    "relatedTours": ["morocco-highlights-toubkal-sahara-8day", "toubkal-summit-sahara-5day", "toubkal-summit-trek-4day"],
    "faq": [
        ("How much is the 8-day Toubkal and Sahara tour?", "EUR889 per person on the 2027 set departures, discounted from a list price of EUR921. That covers all airport transfers, half-board accommodation throughout, every meal on the trek, the licensed mountain guide, mules on the mountain and the camel ride at Erg Chebbi. Dinner in Marrakech, travel insurance and tips are not included, which is a deliberate choice rather than an oversight -- see the breakdown below."),
        ("Why does the price not change with group size?", "Because this is a set-date departure sold by the seat, not a private trip. On our private tours the guide and vehicle are a fixed cost divided among your party, so six people each pay much less than one person does. Here the trip runs on its published date regardless, and what varies is how many of the 14 seats are left. Two friends pay the same per person as a solo traveller, which is unusual in Morocco and is the main reason this itinerary suits people travelling alone."),
        ("What does 14 seats actually mean?", "The departure closes when 14 seats are sold. We cap it there for two practical reasons rather than as a sales tactic: the Toubkal refuge and the desert camp both have finite space on a given night, and a guide can only look after so many people on a summit morning in the dark. If a date shows as sold, the next one is genuinely the next one."),
        ("Is it cheaper to book the parts separately?", "No, and it is not close. Booking comparable trips from our own catalogue -- the 4-day Toubkal summit trek, a 3-day private Sahara tour and a guided medina day -- comes to roughly EUR1,413 at the solo rate. The combined itinerary is EUR889 because it is one continuous route with one guide and one vehicle, rather than three separate trips each carrying its own transfers and its own guiding day."),
        ("What is not included, and what will it cost me?", "Dinner in Marrakech on the two riad nights, because the medina is full of places worth choosing yourself and a fixed hotel dinner is the worst way to eat in that city -- budget 100-250 MAD a head. Travel insurance is mandatory and yours to arrange, since cover for trekking above 4,000 m varies by policy. Tips are customary: 150-200 MAD a day for the guide and 70-100 MAD for the muleteers, from the group, in cash at the end."),
        ("Do I need to be an experienced trekker?", "No, but you need to be fit for two long consecutive days. Summit day is roughly nine hours with a start before dawn, and there is no technical climbing on the standard route -- no rope, no scrambling beyond the odd rocky step. What it asks for is hillwalking stamina at altitude. If you can walk six hours in hill country without dreading the next morning, you have the engine for it."),
    ],
    "content": """
Two objectives that most people treat as separate trips: Jbel Toubkal at 4,167 m, and
the sand sea at Erg Chebbi. This is what putting them in one eight-day route costs, and
where the money goes.

## The headline number

**EUR889 per person**, on the 2027 set departures, down from a list price of EUR921.

That is a flat seat price. It does not fall if you bring friends and it does not rise if
you come alone, which is the opposite of how almost every other trip in Morocco is
priced -- including ours.

## Why the price does not move with group size

On a private tour the guide, the vehicle and the driver are a fixed cost divided among
whoever books. One person pays for all of it; six people split it six ways. That is why
our [4-day Toubkal trek](/en/tours/toubkal-summit-trek-4day) runs from EUR650 solo down
to EUR260 each at six people.

A set departure inverts that. The trip runs on its published date whether four people or
fourteen have booked, so the seat price is flat and what varies is availability. For a
solo traveller this is straightforwardly better value; for a group of six it is worth
comparing against the private version.

## What it costs to book the same ground separately

Taken from our own catalogue, at the solo rate:

| Component | Comparable tour | Solo price |
|---|---|---|
| Toubkal summit | 4-day Toubkal trek | EUR650 |
| Sahara / Erg Chebbi | 3-day private Sahara tour | EUR690 |
| Marrakech medina | Guided cultural tour | EUR73 |
| **Total** | | **EUR1,413** |

The combined trip is EUR889 for the same ground. The saving is not a discount -- it is
what disappears when three separate trips become one route: two sets of return transfers
from Marrakech, two extra guiding days, and the empty vehicle days between them.

## What is included

- All airport transfers, arrival and departure
- Seven nights: riad, gite, mountain refuge and desert camp
- Half board throughout, and **all** meals during the trek
- Licensed mountain guide for the whole trip
- Mules on the mountain, camels at Erg Chebbi
- National park fees

## What is not, and why

- **Dinner in Marrakech** on the two riad nights. This is deliberate. The medina has
  more places worth eating in than any itinerary should choose for you, and a fixed
  hotel dinner is the worst possible way to eat in that city. Budget 100-250 MAD.
- **Travel insurance.** Mandatory, and yours to arrange, because cover for trekking
  above 4,000 m varies enormously between policies and we would rather you read yours
  than trust ours.
- **Tips.** 150-200 MAD a day for the guide, 70-100 MAD for the muleteers, from the
  group, cash at the end.

## The departures

Five dates, March and April 2027, 14 seats each. The March departures are winter
conditions on the summit -- see [climbing Toubkal in March](/en/blog/climbing-toubkal-in-march)
before choosing, because the mountain in early March and the same mountain in mid-April
are meaningfully different propositions.

## The short version

EUR889 buys eight days, two of Morocco's landmark objectives, one guide and one
continuous route. Booking the same ground as separate trips costs around EUR1,413. The
seat price does not change with group size, which makes it unusually good value for
solo travellers and worth comparing carefully if you are a group of six.
""",
})

# ---------------------------------------------------------------------------
# 2. Tibherine -- near-zero competition, and we have the facts right.
# ---------------------------------------------------------------------------
POSTS.append({
    "slug": "tibherine-plane-wreck-toubkal",
    "title": "The Plane Wreck on Tibherine: Morocco's Highest Crash Site",
    "excerpt": "An aircraft engine sits embedded in a summit beside Toubkal, with wreckage scattered down the west face. It has been there since 1969, and most accounts of it get the details wrong.",
    "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
    "category": "trekking",
    "region": "atlas-mountains",
    "readTime": 6,
    "tags": ["Toubkal", "Tibherine", "High Atlas", "history", "Morocco"],
    "seoTitle": "The Tibherine Plane Wreck Above Toubkal — What Happened",
    "seoDescription": "A Lockheed Constellation struck Tibherine East at 3,880 m in November 1969, carrying ammunition to Biafra. The wreck was not found for eight months.",
    "relatedTours": ["toubkal-summit-trek-4day", "morocco-highlights-toubkal-sahara-8day", "toubkal-circuit-ifni-lake-6day"],
    "faq": [
        ("Where exactly is the Tibherine plane wreck?", "On Tibherine East, a summit of 3,880 m in the Toubkal massif, roughly north of Toubkal itself. Tibherine is a twin peak -- East at 3,880 m and West at 3,887 m, similar enough in height and shape that they are known locally as the twins. The wreck is on the eastern top, with debris scattered down the west face and one engine embedded in the summit rocks."),
        ("What aircraft was it and what happened?", "A Lockheed L-749A Constellation, flying at night from Faro in Portugal towards Sao Tome, carrying ammunition bound for Biafra during the Nigerian civil war. On 28 November 1969 the crew reported engine problems and asked to divert to the nearest airport, but the aircraft lost height and struck the mountain. All eight people on board were killed."),
        ("How long before the wreck was found?", "Nearly eight months. It went down on 28 November 1969 and was not located until 18 July 1970, when mountaineers climbing in the Toubkal region came across the debris. That gap is why many accounts date the crash to 1970 -- they are citing the discovery rather than the accident."),
        ("Do Toubkal treks visit the wreck?", "Not on the standard route. Our Toubkal treks summit Toubkal itself and return to the refuge; Tibherine is a separate objective reached by a different, less-travelled line. It can be added for experienced trekkers with a guide who knows the approach, but it does not fit a two-day itinerary and should never be treated as a casual detour."),
        ("Is it safe to visit?", "The ground is the issue, not the wreckage. The approach is unwaymarked, loose underfoot and exposed in places, and the north side of the massif is steeper than the tourist route. It is terrain for experienced hillwalkers with a guide, in settled conditions -- and since 2018 a licensed guide has been a legal requirement anywhere in Toubkal National Park anyway."),
        ("Why do sources disagree about the number killed?", "Several travel articles say four crew died. The Bureau of Aircraft Accidents Archives record -- the primary accident record -- says eight. We publish eight for that reason. The elevation is similarly muddled: figures of 3,886 and 3,887 m appear because writers quote Tibherine West for a wreck that is on Tibherine East, at 3,880 m."),
    ],
    "content": """
Walk the northern side of the Toubkal massif and you come across something that stops
most people mid-step: an aircraft engine, sitting in the rocks of a 3,880 m summit, with
metal scattered down the slope below it.

It has been there since 1969. Most accounts of it get at least one detail wrong, so here
is what the record actually says.

## What happened

On the night of **28 November 1969**, a Lockheed L-749A Constellation was flying from
Faro in Portugal towards Sao Tome. Its cargo was ammunition, and its eventual destination
was Biafra -- the territory that had seceded from Nigeria in 1967 and was, by late 1969,
in the final months of a losing war.

Over Morocco the crew hit engine trouble and told air traffic control they wanted to
divert to the nearest airport. The aircraft lost height instead, and struck Tibherine
East. All eight people aboard were killed.

## Eight months before anyone found it

The wreck was not located until **18 July 1970**, when mountaineers climbing in the
Toubkal region came across the debris at around 3,900 m.

That eight-month gap explains a persistent confusion: articles that date the crash to
1970 are citing the discovery, not the accident. Both dates are real, and they are not
the same event.

## Where it actually is

Tibherine is a **twin summit**: East at 3,880 m and West at 3,887 m, close enough in
height and profile that they are known locally as the twins. The wreck is on the
**eastern** top.

This is the source of the other common error. Accounts quoting 3,886 or 3,887 m are
giving the west summit's height for a wreck that lies on the east one.

Debris runs down the west face and into the couloir below. One of the engines is embedded
in the summit itself, which is the piece most trekkers photograph.

## What most articles get wrong

The number of dead is the one worth correcting. Several travel write-ups say four crew.
The Bureau of Aircraft Accidents Archives -- the primary accident record -- says **eight**.
We publish eight.

It matters beyond pedantry. This is a war-cargo flight that killed everyone aboard and
lay unfound on a mountainside for most of a year. Halving the casualty figure turns it
into a curiosity.

## Can you go and see it?

Not on the standard Toubkal route, and we would rather say so plainly than imply
otherwise.

Our [Toubkal treks](/en/tours/toubkal-summit-trek-4day) go to Toubkal's own summit at
4,167 m and return to the refuge. Tibherine is a separate objective on a different,
much less travelled line. The approach is unwaymarked, loose, and steeper than anything
on the tourist path.

It can be added for experienced trekkers, with a guide who knows the ground and in
settled conditions. It does not fit a two-day itinerary. If seeing it matters to you,
say so when you enquire and we will tell you honestly whether it works with the trip you
are considering -- often the answer is that you need an extra day.

Since 2018, a licensed guide has been a legal requirement anywhere in Toubkal National
Park, so this is not a route to attempt alone in any case.
""",
})

# ---------------------------------------------------------------------------
# 3. March Toubkal -- ranks, and pre-qualifies buyers for our own departures.
# ---------------------------------------------------------------------------
POSTS.append({
    "slug": "climbing-toubkal-in-march",
    "title": "Climbing Toubkal in March: What You Are Actually Signing Up For",
    "excerpt": "March is the month people book expecting spring and arrive to find winter. Here is what the mountain is really like, what kit it demands, and when April is the better answer.",
    "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
    "category": "trekking",
    "region": "atlas-mountains",
    "readTime": 7,
    "tags": ["Toubkal", "winter trekking", "High Atlas", "Morocco", "seasons"],
    "seoTitle": "Climbing Toubkal in March — Snow, Kit and Honest Advice",
    "seoDescription": "March on Toubkal is still winter above 3,000 m: snow, crampons and an ice axe. What to expect, what you need, and when to choose April instead.",
    "relatedTours": ["toubkal-summit-trek-4day", "morocco-highlights-toubkal-sahara-8day", "toubkal-summit-2day-marrakech"],
    "faq": [
        ("Is Toubkal still snowy in March?", "Yes, above roughly 3,000 m. March sits at the tail of the winter season, and the summit cone typically carries snow into April in a normal year. The valley at Imlil can be in shirtsleeves while the top is well below freezing at dawn -- the two are 2,400 m apart in height, which is most of the explanation."),
        ("Do I need crampons and an ice axe in March?", "In most years, yes, and you need to know how to use them rather than merely carry them. The final slopes turn from a walk into a snow climb when they are frozen, and that is exactly when they are hardest. Both can be hired in Imlil for 100-150 MAD a day. On our guided departures they are supplied when conditions require them."),
        ("Is March more dangerous than summer?", "It is a different mountain rather than simply a harder one. Heavy snowfall between January and March brings genuine avalanche risk on the loaded slopes, and weather turns faster than in summer. That is why a guide matters more in March than in July -- the judgement about whether today is the day is the part you are paying for."),
        ("Is March or April better for climbing Toubkal?", "April, for most people. The snowline has usually retreated, the walking is easier and the days are longer, while the crowds have not yet arrived. Choose March if you actively want the mountain in winter condition and are comfortable on snow -- it is quieter and the summit views in cold clear air are the best of the year."),
        ("How cold does it get on summit morning?", "Below freezing, reliably, and with wind chill on the summit ridge it feels considerably colder than the thermometer suggests. You start in the dark, which is the coldest part of the day. A proper insulated jacket, warm gloves plus a spare pair, and something covering your face are not optional in March."),
        ("Can a beginner climb Toubkal in March?", "A fit beginner can, with a guide, in settled conditions -- but it is an honestly harder proposition than the same trek in June, and the summit success rate is lower. If this is your first big mountain and reaching the top matters to you, April onwards is the kinder introduction. If you have winter hillwalking experience, March is a rewarding month to be up there."),
    ],
    "content": """
March is the month that catches people out. The flights are cheap, Marrakech is warm,
and the mountain looks close enough on the map to feel like a spring walk. Above 3,000 m
it is still winter.

## What March is actually like

Imlil at 1,740 m can be pleasant in March -- sun, shirtsleeves in the afternoon, almond
blossom in the valleys. The summit is 2,427 m higher, and that difference is the whole
story.

Above roughly 3,000 m the mountain carries snow, and in a normal year the summit cone
holds it into April. On summit morning you leave the refuge in the dark, at
sub-zero temperatures, on ground that froze overnight.

## The kit that stops being optional

- **Crampons and an ice axe** -- and the knowledge to use them. Frozen snow is when the
  final slopes stop being a walk, which is also when they are hardest. Hire in Imlil runs
  100-150 MAD a day; on our guided departures they are supplied when conditions require.
- **Stiff boots** that will actually take a crampon. A soft trail shoe will not, which
  is the single most common gear mistake we see in March.
- **Insulation and a spare pair of gloves.** You start in the dark and the wind on the
  summit ridge does the rest.

## The risk nobody advertises

Heavy snowfall between January and March loads the slopes, and that brings real
avalanche risk on certain aspects in certain conditions. Weather also turns considerably
faster than in summer.

This is why a guide is worth more in March than in July. The value is not route-finding
on a path you could follow yourself -- it is the judgement about whether today is the day
to go up, and the willingness to turn around. Since 2018 a licensed guide has been a
legal requirement in Toubkal National Park in any case.

## March or April?

**Choose April** if you want the most straightforward version: the snowline has usually
retreated, walking is easier, the days are longer, and the summer crowds have not
arrived. For a first big mountain, April onwards is the kinder introduction and the
success rate is meaningfully higher.

**Choose March** if you actively want the mountain in winter condition and are
comfortable on snow. It is quieter, and the summit views in cold clear air are the best
of the year.

Our [8-day Toubkal and Sahara departures](/en/tours/morocco-highlights-toubkal-sahara-8day)
run on both sides of that line -- three dates in March, two in April -- which is
deliberate. If you are choosing between them, the paragraph above is the decision.

## Give yourself the extra day

Whatever the month, altitude decides more summits than fitness does. The
[4-day itinerary](/en/tours/toubkal-summit-trek-4day) walks in gradually with a night to
acclimatise; the 2-day version goes from 1,740 m to 4,167 m in about thirty hours. In
March, when the summit push is harder and slower anyway, that extra day is worth more
than it is in July.
""",
})

# ---------------------------------------------------------------------------
# 4. Aguelzim -- the next-worst orphan (1 mention).
# ---------------------------------------------------------------------------
POSTS.append({
    "slug": "toubkal-aguelzim-pass-trek-cost",
    "title": "What Does the 3-Day Toubkal Aguelzim Trek Cost?",
    "excerpt": "The Aguelzim pass is the quiet way onto Toubkal -- a high crossing that skips the crowded Mizane valley entirely. Here is what the three-day version costs and who it actually suits.",
    "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
    "category": "trekking",
    "region": "atlas-mountains",
    "readTime": 6,
    "tags": ["Toubkal", "Aguelzim", "High Atlas", "trekking", "Morocco"],
    "seoTitle": "3-Day Toubkal Aguelzim Pass Trek — Cost and Route",
    "seoDescription": "What the 3-day Aguelzim pass route up Toubkal costs, how it differs from the standard Mizane valley approach, and who the quieter line suits.",
    "relatedTours": ["toubkal-aguelzim-pass-3day", "toubkal-summit-trek-4day", "toubkal-circuit-ifni-lake-6day"],
    "faq": [
        ("What is the Aguelzim pass route?", "An alternative approach to the Toubkal refuge that crosses the Tizi n'Aguelzim at around 3,560 m instead of walking up the Mizane valley. It is longer and higher than the standard line, and considerably quieter -- most Toubkal traffic never sees it. The trade-off is a serious pass on day one rather than a gradual valley walk."),
        ("Is Aguelzim harder than the normal Toubkal route?", "Yes, meaningfully. The standard approach gains height steadily along a valley floor; Aguelzim puts a 3,560 m pass in your way before you have slept at altitude at all. It suits people with hillwalking experience who want the quieter line, rather than anyone attempting their first mountain."),
        ("Why choose Aguelzim over the standard route?", "Solitude, and better views. The Mizane valley path is the busiest trail in the Atlas in summer, with mule trains and day walkers most of the way to the refuge. The Aguelzim crossing is empty by comparison, and the pass itself gives you the whole massif laid out in a way the valley approach never does."),
        ("How fit do I need to be?", "Fit enough for a long day with a high pass on it, on consecutive days. This is not a technical route in summer -- no rope, no scrambling -- but the day-one crossing is a genuine effort at altitude before you have acclimatised. If you regularly walk hill days of six or seven hours, you are in the right range."),
    ],
    "content": """
Almost everyone who climbs Toubkal walks up the Mizane valley from Imlil. In summer that
path carries mule trains, day walkers and a steady file of trekkers all the way to the
refuge.

The Aguelzim pass is the other way in.

## The route

Instead of following the valley floor, this line crosses the **Tizi n'Aguelzim at around
3,560 m** and drops to the refuge from above. It is longer, higher, and empty by
comparison -- and the view from the pass gives you the whole massif at once, which the
valley approach never does.

## What it costs

Our [3-day Aguelzim trek](/en/tours/toubkal-aguelzim-pass-3day) is priced per person on
a sliding group scale, like all our private departures: the guide and transport are a
fixed cost divided among your party, so the per-person rate falls as the group grows.
Current prices are on the tour page and include the licensed guide, refuge nights, all
meals on the mountain, mule support and return transport from Marrakech.

## Who it suits, honestly

**Not** a first mountain. The standard route gains its height gradually along a valley;
Aguelzim puts a 3,560 m pass in front of you on day one, before you have slept at
altitude at all. That is a real difference in how the trip feels, and in how likely you
are to summit feeling well.

It suits experienced hillwalkers who have done multi-day trips before and would rather
have the mountain to themselves than take the easiest line. If this is your first big
summit, the [4-day standard route](/en/tours/toubkal-summit-trek-4day) is the better
choice and we will say so if you ask.

## What is included

The same as our other Toubkal treks: licensed mountain guide, refuge accommodation, all
meals on the mountain, mules for group gear, national park fees, and return transport
from Marrakech. Travel insurance, personal kit and tips are not included.

## The short version

Aguelzim is the connoisseur's approach to Toubkal -- higher, longer, quieter, and better
looking. It costs broadly what the standard three-day trek costs, because the difference
is the line rather than the logistics. Take it if you have the legs and want the
solitude; take the valley if this is your first Atlas summit.
""",
})


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def render(p):
    faq = "".join(
        '      { q: "%s", a: "%s" },\n' % (esc(q), esc(a)) for q, a in p["faq"]
    )
    tags = ", ".join('"%s"' % t for t in p["tags"])
    rel = ", ".join('"%s"' % t for t in p["relatedTours"])
    return (
        "  {\n"
        '    slug: "%s",\n'
        '    region: "%s",\n'
        "    author: MET_TEAM,\n"
        '    title: "%s",\n'
        "    excerpt:\n      \"%s\",\n"
        '    heroImage: "%s",\n'
        '    category: "%s",\n'
        "    readTime: %d,\n"
        '    publishedAt: "2026-08-28",\n'
        '    updatedAt: "2026-08-28",\n'
        "    tags: [%s],\n"
        '    seoTitle: "%s",\n'
        "    seoDescription:\n      \"%s\",\n"
        "    relatedTours: [%s],\n"
        "    faq: [\n%s    ],\n"
        "    content: `%s`,\n"
        "  },\n"
        % (
            p["slug"], p["region"], esc(p["title"]), esc(p["excerpt"]),
            p["heroImage"], p["category"], p["readTime"], tags,
            esc(p["seoTitle"]), esc(p["seoDescription"]), rel, faq,
            p["content"],
        )
    )


def run():
    src = io.open(PATH, encoding="utf-8").read()
    # Anchor on the end of BLOG_POSTS specifically. src.rindex("\n];\n") finds
    # the LAST array in the file, which is BLOG_CATEGORIES -- appending posts
    # there parses fine but fails tsc with "'slug' does not exist in type
    # { id; label; icon }". Take the terminator immediately before that array.
    cats = src.index("export const BLOG_CATEGORIES")
    at = src.rindex("\n];\n", 0, cats)
    add = ""
    for p in POSTS:
        assert '"%s"' % p["slug"] not in src, "%s already present" % p["slug"]
        add += render(p)
        print("  + %s" % p["slug"])
    src = src[:at] + "\n" + add + src[at + 1:]
    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("\nadded %d posts" % len(POSTS))


run()
