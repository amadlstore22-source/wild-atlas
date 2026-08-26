# -*- coding: utf-8 -*-
"""Add three English posts, chosen from measured gaps rather than intuition.

Counting mentions across all 87 existing posts (the same method that found the
shared-tour content gap) showed:

  festivals   Gnaoua 1 mention, Rose Festival 1, Imilchil 0, moussem 0
  transport   train 0, ONCF 0, car hire 0   <- complete hole
  conditions  sandstorm 0, "cold at night" 4

The festivals post also exists to feed internal links to the 42 new event
pages, which currently have almost nothing pointing at them --
__tests__/lib/orphan-posts.test.ts is the standing guard against exactly that.

EVERY FACTUAL CLAIM IS SOURCED:
  - Al Boraq 320 km/h, Tangier-Casablanca 2h10, opened Nov 2018: Wikipedia
    /wiki/Al_Boraq and seat61.com/train-travel-in-morocco.
  - Fares 99-224 MAD 2nd class, booking opens 3 months ahead, and NO train to
    Merzouga / Ouarzazate / Chefchaouen / Essaouira: seat61 (quoted directly).
  - Casablanca-Marrakech ~2h40, Casablanca-Fes ~3h45: seat61 / ONCF timetable.
  - Merzouga monthly highs 19C Jan to 43C Jul, night 6C Jan to 29C Jul:
    weather-and-climate.com. Elevation 730 m: Wikipedia /wiki/Erg_Chebbi --
    that altitude plus dry air is WHY nights collapse.
  - Sources disagree on January nights (6C vs "near 2C, sometimes below
    freezing"), so the post gives a RANGE and never a single false figure.
  - Gnaoua 2026 dates and Marrakech Marathon 31 Jan 2027 come from lib/
    events.ts, which cites the organisers' own sites.

Prices in prose are EUR and must match lib/tours.ts converted at
RATES.EUR = 0.86693 -- see __tests__/lib/blog-prices.test.ts, which exists
because eight cost posts once quoted USD figures with a euro sign.
"""
import io, re

BT = "~BT~"  # placeholder; real backticks are substituted at the end

POSTS = []

# ---------------------------------------------------------------- festivals
POSTS.append({
    "slug": "morocco-festivals-calendar-by-month",
    "title": "Morocco Festivals by Month: What Is Worth Planning a Trip Around",
    "excerpt": "Gnaoua on the Atlantic, the rose harvest in the Dades, a High Atlas betrothal fair, and Ramadan. Which dates are fixed, which move, and how far ahead to book.",
    "heroImage": "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
    "category": "culture",
    "region": "root",
    "readTime": 11,
    "tags": ["Morocco festivals", "Gnaoua festival", "Rose Festival Morocco", "Imilchil moussem", "Morocco events calendar"],
    "seoTitle": "Morocco Festivals by Month — Dates, and Which Ones Move",
    "seoDescription": "A month-by-month guide to Moroccan festivals: Gnaoua in Essaouira, the Kelaat M'Gouna rose harvest, the Imilchil moussem, Ramadan. Which dates are confirmed and which shift.",
    "relatedTours": ["shared-essaouira-day-trip", "shared-merzouga-3day-marrakech", "atlas-mountains-3day-trek", "marrakech-medina-cultural-tour"],
    "faq": [
        {"q": "What is the biggest festival in Morocco?",
         "a": "By international profile, the Gnaoua and World Music Festival in Essaouira — three days of free open-air concerts in late June that draw hundreds of thousands of people. By local significance it is arguably Ramadan and the Eid that closes it, which changes the rhythm of the entire country for a month."},
        {"q": "Do Moroccan festival dates change every year?",
         "a": "Most of them, yes, and for three different reasons. Religious dates follow the Hijri calendar and are fixed in Morocco by moon sighting through the Ministry of Endowments and Islamic Affairs, so they move about eleven days earlier each Gregorian year. Harvest festivals like the Rose Festival follow the crop. Village moussems are set locally, sometimes only weeks ahead. Only a handful — the Marrakech Marathon, for instance — are announced far in advance on a fixed date."},
        {"q": "When is the Rose Festival in Morocco?",
         "a": "Kelaat M'Gouna holds it at the peak of the damask rose harvest, which has fallen in the first two weeks of May every recent year — the 2026 edition ran 7–10 May. The organisers confirm the exact days only a few weeks ahead, so treat May as the window rather than booking flights to a specific date."},
        {"q": "Can you travel in Morocco during Ramadan?",
         "a": "Yes, and it is one of the more memorable times to come, but the day runs differently. Many restaurants stay closed until sunset, museums and offices keep shorter hours, and the medina properly wakes after the iftar cannon. Trekking is unaffected — guides plan food and water around it. Non-Muslim visitors are not expected to fast, and tourist restaurants in Marrakech and Agadir serve through the day."},
        {"q": "How far ahead should I book around a festival?",
         "a": "For Gnaoua, accommodation in Essaouira is reported to need nine to twelve months — which is why a day trip from Marrakech is often the realistic way to attend. Kelaat M'Gouna fills months ahead during the rose harvest. For everything else, six to ten weeks is usually enough."},
    ],
    "content": """
Morocco does not have one festival season. It has a religious calendar that
drifts by eleven days a year, a farming calendar tied to what is ripening, and
a handful of fixed-date events that behave like anything in Europe. Planning a
trip around any of them means knowing which kind you are dealing with.

## The short version

| Festival | Roughly when | How fixed is it? |
| --- | --- | --- |
| Marrakech Marathon | Late January | **Confirmed** far ahead |
| Almond blossom, Anti-Atlas | February–March | A season, not a date |
| Ramadan and Eid al-Fitr | Moves ~11 days earlier each year | Moon sighting |
| Rose Festival, Kelaat M'Gouna | First half of May | Follows the harvest |
| Gnaoua, Essaouira | Late June | Announced a few months ahead |
| Imilchil moussem | September | Set locally, often weeks ahead |

## January — the marathon, and the clearest air of the year

The [Marrakech International Marathon](/en/events/marrakech-international-marathon)
is the one genuinely fixed date on this list: the 37th edition runs on
**Sunday 31 January 2027**, announced well in advance on the organisers' own
site. A full and half marathon through the old city walls, the Palmeraie and
the avenues of Gueliz, with around 15,000 runners.

January is also, unexpectedly, one of the best months to be here. The air is
clear, the Atlas is under snow, and the desert days are pleasant even as the
nights turn very cold. A race weekend pairs naturally with a couple of days in
the mountains either side.

## February and March — blossom, and usually Ramadan

Between the winter rains and the spring heat, the almond terraces of the
Anti-Atlas around Tafraoute flower white and pink against pink granite. It is
[a season rather than a date](/en/events/almond-blossom-anti-atlas): lower
valleys turn first, higher villages up to three weeks later, and the timing
shifts with the winter rainfall.

**Ramadan** currently falls across this window and moves earlier each year. It
is worth understanding rather than avoiding — see
[visiting Morocco during Ramadan](/en/blog/visiting-morocco-during-ramadan)
for what actually changes day to day. The short answer: quiet days, and cities
that come alive after sunset.

## May — the rose harvest

The valley floor between Kelaat M'Gouna and Boumalne Dades grows damask roses
for rose water and oil. When the harvest peaks, the town holds a moussem:
floats, Ait Atta dancing, a rose queen, and souks selling the season's
distillate.

What makes this one practical is geography. Kelaat M'Gouna sits **directly on
the Marrakech-to-Sahara road**, so a [three-day desert
tour](/en/tours/shared-merzouga-3day-marrakech) timed for early May passes
through the harvest without any detour. You are driving that road anyway.

The catch: the organisers confirm dates only a few weeks ahead, because the
flowers decide. Treat the first half of May as the window. See the
[Rose Festival page](/en/events/rose-festival-kelaat-mgouna) for the current
state of the dates.

## June — Gnaoua in Essaouira

Three days of Gnaoua trance music on the Atlantic, in a walled town that
empties of cars and fills with drums. Maalems — Gnaoua master musicians —
play open stages across the city alongside jazz and world-music guests who
improvise with them. It is free, it is outdoors, and the medina stays awake
until dawn.

The practical problem is beds. Accommodation in Essaouira is reported to sell
out **nine to twelve months** ahead for the festival, and prices trip. This is
why a [day trip from Marrakech](/en/tours/shared-essaouira-day-trip) is often
the more realistic way to see it: three hours each way, and you sleep in a city
that still has rooms.

## September — the Imilchil moussem

Held on a plateau at around 2,200 m in the High Atlas, this is first a
livestock and goods fair for the surrounding Ait Haddidou villages, and second
the betrothal gathering it is famous for internationally.

It is remote. The approach is a long mountain drive, and it is a working
community event rather than a performance — which is exactly the reason to go.
The dates are set by the community and tied to the late-summer herding
calendar, announced locally and often only weeks ahead. It pairs with
[High Atlas village trekking](/en/tours/atlas-mountains-3day-trek), since you
are already deep in those mountains.

## The one thing to understand about dates

Anyone who prints a precise date for a Moroccan harvest festival or a moussem
eighteen months out is guessing. We publish what the organisers have actually
confirmed and clearly mark what is still a window — you can see the current
state of all of them on our [upcoming events page](/en/events).

If you are building a trip around one of these, tell us which and we will say
plainly how confident the date is before you book anything.
""",
})

# ---------------------------------------------------------------- transport
POSTS.append({
    "slug": "getting-around-morocco-transport-guide",
    "title": "Getting Around Morocco: Trains, Buses, Grands Taxis and When to Just Hire a Driver",
    "excerpt": "Al Boraq does Tangier to Casablanca in 2h10. But no train reaches Merzouga, Chefchaouen, Essaouira or Ouarzazate — and that is where most people actually want to go.",
    "heroImage": "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
    "category": "tips",
    "region": "root",
    "readTime": 12,
    "tags": ["Morocco transport", "Morocco trains", "ONCF", "Al Boraq", "getting around Morocco"],
    "seoTitle": "Getting Around Morocco — Trains, Buses and Real Journey Times",
    "seoDescription": "Morocco transport explained: Al Boraq high-speed rail, ONCF journey times and fares, CTM buses, grands taxis — and the destinations no train reaches.",
    "relatedTours": ["marrakech-to-fes-3day", "marrakech-to-chefchaouen-4day", "marrakech-imperial-cities-5day", "shared-essaouira-day-trip"],
    "faq": [
        {"q": "Does Morocco have good trains?",
         "a": "Between the cities on the northern line, yes — genuinely good. Al Boraq is Africa's first high-speed rail, running up to 320 km/h, and covers Tangier to Casablanca in 2h10. Classic ONCF Al Atlas trains continue to Marrakech in about 2h40 from Casablanca and to Fes in roughly 3h45. Comfortable, punctual and cheap."},
        {"q": "Can you take a train to the Sahara or Chefchaouen?",
         "a": "No. The rail network does not reach Merzouga, Ouarzazate, Chefchaouen or Essaouira. For the desert the nearest railhead leaves you several hundred kilometres and a full day of driving short. Those destinations are reached by bus, grand taxi, hired car or an organised tour."},
        {"q": "How much do Moroccan trains cost?",
         "a": "Cheap by European standards. Tangier to Casablanca on Al Boraq runs between 99 and 224 dirhams in second class and 129 to 292 in first, depending on how far ahead you book. Booking opens three months before departure."},
        {"q": "Is it safe to drive in Morocco?",
         "a": "The motorways are modern and easy. The difficulty is elsewhere: mountain roads like the Tizi n'Tichka are narrow with long drops and slow lorries, city traffic is assertive, and rural roads mix cars with mopeds, carts and livestock. Many visitors who are perfectly confident drivers at home find the Atlas passes more tiring than expected."},
        {"q": "What is a grand taxi?",
         "a": "A shared long-distance taxi, usually an old Mercedes, that runs a fixed route and leaves when it is full — typically six passengers. Very cheap and genuinely useful for short hops between towns. You can also pay for the empty seats to have it leave immediately, which is still inexpensive."},
    ],
    "content": """
Morocco's transport splits cleanly in two, and knowing where the line falls
saves a lot of wasted planning. The northern cities are joined by fast, cheap,
comfortable trains. Everywhere most visitors actually want to go — the desert,
the gorges, the blue city, the Atlantic — has no train at all.

## The trains, where they run

**Al Boraq** is Africa's first high-speed rail line, open since November 2018
and running up to **320 km/h** on the dedicated Tangier–Kenitra section. It cut
Tangier to Casablanca from 4h45 to **2h10**.

From Casablanca, classic **Al Atlas** expresses continue:

| Route | Journey time |
| --- | --- |
| Tangier → Casablanca (Al Boraq) | 2h10 |
| Tangier → Rabat (Al Boraq) | 1h20 |
| Casablanca → Marrakech | ~2h40 |
| Casablanca → Fes | ~3h45 |
| Marrakech → Tangier (one change) | ~5h30–6h |

Fares are low: Tangier–Casablanca costs **99 to 224 dirhams** in second class,
129 to 292 in first, depending on how early you book. **Booking opens three
months ahead.** First class gets you a six-seat air-conditioned compartment and
is worth the small premium in summer.

An extension of the high-speed line towards Marrakech is under construction,
which will eventually cut the Casablanca run substantially. It is not open yet.

## Where the trains do not go

This is the part that catches people out. **No railway reaches:**

- **Merzouga or the Erg Chebbi dunes** — the Sahara
- **Ouarzazate, Ait Ben Haddou, the Dades and Todra gorges**
- **Chefchaouen** — the blue city
- **Essaouira** — the Atlantic coast
- **Imlil and the Toubkal trailheads**

That is, more or less, the entire list of reasons people come to Morocco in the
first place. For these you need a bus, a grand taxi, a hire car, or a tour.

## Buses

**CTM** and **Supratours** are the two intercity operators worth using. Both
are modern, air-conditioned, run to a timetable and let you book online.
Supratours is run by the rail operator and connects to train stations, which
makes rail-plus-bus combinations straightforward — the standard way to reach
Essaouira is the train to Marrakech and a bus onward, roughly three hours, with
departures every two to three hours.

The cheaper local buses that leave from souk stations are an experience, but
they stop constantly and have no fixed departure time.

## Grands taxis

A shared long-distance taxi, usually an ageing Mercedes, running a fixed route
and leaving when six passengers have accumulated. They are cheap, frequent and
the normal way Moroccans move between neighbouring towns. If you do not want to
wait, buy the remaining seats — still inexpensive, and the taxi leaves at once.

Agree the fare before getting in. Rates on established routes are effectively
fixed and locals will tell you what they are.

## Hiring a car

Sensible if you want to explore the Atlantic coast or the Anti-Atlas at your
own pace. Less sensible than it looks for the mountain and desert routes.

The **Tizi n'Tichka** — the pass every Marrakech-to-Sahara journey crosses — is
a long climb of tight switchbacks with drops, slow lorries and, in winter,
snow. It is a genuinely demanding drive, and after seven or eight hours of it
you arrive at the dunes tired. Add that most desert accommodation is down
unsigned pistes that a standard hire car should not attempt, and the appeal
narrows.

Also budget for: a credit card deposit, careful photography of existing damage
at pickup, and police checkpoints where you simply slow down, say hello and
carry on.

## When a driver or a tour is genuinely the better answer

Not for everything. If you are moving between Marrakech, Casablanca, Rabat, Fes
and Tangier, take the train — it is faster, cheaper and more comfortable than
anything we could sell you.

It changes when the destination has no railway and the drive is the hard part:

- **Marrakech to the Sahara.** Two long driving days each way over the Tichka.
  Our [three-day Merzouga run](/en/tours/shared-merzouga-3day-marrakech) is
  €120 per person shared — less than hiring a car for the same days, and you
  are not the one driving the pass.
- **Marrakech to Chefchaouen.** [Four days](/en/tours/marrakech-to-chefchaouen-4day),
  because doing it in one is nine hours of motorway.
- **The imperial cities.** [Five days](/en/tours/marrakech-imperial-cities-5day)
  covering Fes, Meknes and Volubilis — the last of which has no public
  transport at all.
- **Marrakech to Fes overland**, via [Ait Ben Haddou and the
  gorges](/en/tours/marrakech-to-fes-3day) rather than the motorway, which is
  the whole point of going that way.

For a fuller cost comparison, see
[booking direct versus a platform](/en/blog/booking-morocco-tour-direct-vs-platform)
and [what group size does to the price](/en/blog/morocco-tour-price-group-size).

## A sensible default

Trains between the big northern cities. Tour or driver for the desert, the
gorges and the mountains. Grands taxis for short hops. Hire a car only if the
driving is the part you are looking forward to.
""",
})

# ------------------------------------------------------------------ weather
POSTS.append({
    "slug": "sahara-desert-weather-what-to-expect",
    "title": "Sahara Weather in Morocco: 43°C Days, Near-Freezing Nights, and What That Means for Packing",
    "excerpt": "Merzouga runs from 19°C in January to 43°C in July — and the nights collapse. The dunes sit at 730 m, which is why. Month by month, and what actually goes in the bag.",
    "heroImage": "/gallery/sahara-dunes-tamarisk-morning.jpg",
    "category": "desert",
    "region": "sahara-south",
    "readTime": 11,
    "tags": ["Sahara weather", "Merzouga temperature", "best time desert Morocco", "desert packing", "Erg Chebbi climate"],
    "seoTitle": "Sahara Desert Weather Morocco — Month by Month Temperatures",
    "seoDescription": "Merzouga and Erg Chebbi temperatures month by month: 19°C in January to 43°C in July, with nights near freezing in winter. When to go and what to pack.",
    "relatedTours": ["shared-merzouga-3day-marrakech", "merzouga-stargazing-desert-tour", "erg-chegaga-3day-marrakech", "family-desert-4day-marrakech"],
    "faq": [
        {"q": "How cold does the Sahara get at night in Morocco?",
         "a": "Cold enough to be genuinely uncomfortable if you have packed only for the daytime. Merzouga's January nights sit around 6°C on the averages, and clear still nights can run several degrees lower again — close to freezing. The dunes are at 730 m altitude and the air is extremely dry, so the heat escapes fast once the sun goes down."},
        {"q": "What is the best month to visit the Moroccan Sahara?",
         "a": "October, November, March and April. Daytime highs of 24–30°C are comfortable for camel trekking and dune walking, and the nights are cool rather than cold. Winter gives you the clearest skies and the emptiest camps but demands proper warm layers. July and August, at 42–43°C, are hard work."},
        {"q": "How hot is the Sahara in summer?",
         "a": "Average July highs at Merzouga reach 43°C, with August close behind at 42°C, and the nights stay around 29°C. Tours still run — camel treks shift to early morning and after sunset, and the middle of the day is spent in shade — but it is not the season for a first visit."},
        {"q": "Does it rain in the Moroccan Sahara?",
         "a": "Rarely, but it is not impossible. When it does rain it can be sudden and heavy, and dry riverbeds can flood fast — which is the reason guides avoid camping in a wadi. A few days a year, mostly in spring and autumn."},
        {"q": "What about sandstorms?",
         "a": "Most likely in spring, when the chergui wind blows. A real sandstorm cuts visibility and gets sand into everything; camps sit it out. It is uncomfortable rather than dangerous with a guide who knows the ground. A scarf you can wrap over your face is genuinely useful, not a souvenir."},
    ],
    "content": """
The single most common mistake on a Moroccan desert trip is packing for a
desert. People bring shorts and a sun hat, and then spend the night awake and
cold. Erg Chebbi sits at **730 metres** of altitude in extremely dry air, and
once the sun drops there is nothing to hold the heat in.

## Merzouga, month by month

Average daytime highs at Merzouga:

| Month | High | Notes |
| --- | --- | --- |
| January | 19°C | Nights near freezing. Clearest skies of the year. |
| February | 21°C | Still cold after dark. |
| March | 26°C | Excellent. Some wind. |
| April | 30°C | Arguably the best month. |
| May | 34°C | Getting hot by midday. |
| June | 39°C | Hard going. |
| July | 43°C | Nights stay around 29°C. |
| August | 42°C | As above. |
| September | 37°C | Cooling. |
| October | 30°C | Excellent. |
| November | 24°C | Excellent, cold nights returning. |
| December | 20°C | Cold nights, clear skies. |

Night-time lows run from about **6°C in January to 29°C in July** on the
averages — and on a still, cloudless winter night the reading at the camp can
be several degrees below that January figure. Different sources put it
anywhere from 6°C down to below zero, which tells you something in itself:
pack for the cold end, not the average.

## What the swing actually feels like

In November you can be walking a dune ridge in a t-shirt at four in the
afternoon, and reaching for a fleece, a hat and a second blanket by eight in
the evening. The drop is fast — most of it happens in the hour around sunset.

This is also why the winter desert is so good for stars. Cold, dry, still air
is exactly what you want, and there is no light pollution for a hundred
kilometres. Our
[Merzouga stargazing tour](/en/tours/merzouga-stargazing-desert-tour) exists
because those winter nights are genuinely exceptional.

## The best months

**October, November, March, April.** Days of 24–30°C, nights cool but not
punishing. This is when we run the most departures and when the camps are
fullest — book earlier than you think.

**December to February.** Cold nights, but the clearest skies, the emptiest
dunes and the sharpest light for photography. Entirely worth it if you bring
the right layers.

**May and September.** Shoulder months. Hot at midday, fine morning and
evening.

**July and August.** 42–43°C. Tours run — camel treks move to dawn and dusk,
the middle of the day is for shade — but it is not the season for a first
visit, and it is difficult with young children. If you are travelling with
kids, see our [family desert tour](/en/tours/family-desert-4day-marrakech) and
aim for spring or autumn.

## Wind and sand

Spring brings the **chergui**, the hot dry wind off the interior. Most days it
is just wind. Occasionally it lifts enough sand to cut visibility properly, at
which point camps stop and wait it out.

A sandstorm is uncomfortable rather than dangerous when you are with people who
know the terrain. Sand gets into cameras, bags and hair regardless. The
cotton scarf every guide wears is not decorative — wrapped over the nose and
mouth it is the single most useful thing you will own that day.

Rain is rare but real, mostly spring and autumn. When it comes it can be
sudden, and dry riverbeds flood quickly. That is why a good guide never camps
in a wadi, whatever the forecast says.

## What to actually pack

For the daytime, all year: loose long sleeves and long trousers (more
comfortable than shorts in real heat, and they stop you burning), a brimmed
hat, high-factor sunscreen, sunglasses, and more water than you think.

**For the nights, October through April, this is the part people get wrong:**

- A proper insulating layer — fleece or down, not a hoodie
- A windproof outer layer
- A hat and thin gloves for December to February
- Warm socks; camp floors are cold sand
- Closed shoes for the evening

Camps provide thick blankets and most have heaters in winter, but you will be
outside for dinner, for the stars, and for sunrise. That is when the cold
finds you.

For the full list, including what to leave behind, see
[what to pack for a desert tour](/en/blog/what-to-pack-desert-tour-morocco).

## Choosing your dates

If the weather is what decides your trip, aim for late October, November, March
or early April, and book the camp early because everyone else has worked this
out too. Our [three-day Merzouga
departure](/en/tours/shared-merzouga-3day-marrakech) runs daily year-round at
€120 per person, and we will tell you honestly if the month you are
considering is a bad one.

Not sure which desert to choose? [Merzouga versus
Zagora](/en/blog/merzouga-vs-zagora-which-desert-tour) compares the drives, the
dunes and the cost.
""",
})


def build(post):
    faq = "\n".join(
        '      { q: %s, a: %s },' % (json_str(f["q"]), json_str(f["a"]))
        for f in post["faq"]
    )
    tags = ", ".join(json_str(t) for t in post["tags"])
    rel = ", ".join(json_str(t) for t in post["relatedTours"])
    content = post["content"].strip("\n")
    return """  {
    slug: %s,
    author: MET_TEAM,
    title: %s,
    excerpt:
      %s,
    heroImage: %s,
    category: %s,
    region: %s,
    readTime: %d,
    publishedAt: "2026-08-26",
    updatedAt: "2026-08-26",
    tags: [%s],
    seoTitle: %s,
    seoDescription:
      %s,
    relatedTours: [%s],
    faq: [
%s
    ],
    content: %s%s%s,
  },
""" % (
        json_str(post["slug"]), json_str(post["title"]), json_str(post["excerpt"]),
        json_str(post["heroImage"]), json_str(post["category"]), json_str(post["region"]),
        post["readTime"], tags, json_str(post["seoTitle"]),
        json_str(post["seoDescription"]), rel, faq, BT, content, BT,
    )


def json_str(s):
    """Emit a TS double-quoted string with non-ASCII escaped, matching the file."""
    out = ['"']
    for ch in s:
        if ch == '"':
            out.append('\\"')
        elif ch == "\\":
            out.append("\\\\")
        elif ord(ch) < 128:
            out.append(ch)
        else:
            out.append("\\u%04x" % ord(ch))
    out.append('"')
    return "".join(out)


def run():
    path = "lib/blog.ts"
    src = io.open(path, encoding="utf-8").read()

    for p in POSTS:
        if '"%s"' % p["slug"] in src:
            print("  already present, skipping:", p["slug"])
            continue

    blocks = "".join(build(p) for p in POSTS if '"%s"' % p["slug"] not in src)
    if not blocks:
        print("nothing to add")
        return

    # Append before the closing "];" of BLOG_POSTS specifically.
    # NOT the last "];" in the file — that is BLOG_CATEGORIES, and appending
    # posts there typechecks as a category and fails with a confusing
    # "'slug' does not exist" error 200 lines from the real mistake.
    start = src.index("export const BLOG_POSTS")
    m = re.compile(r"\n\];").search(src, start)
    if not m:
        raise SystemExit("could not find the end of BLOG_POSTS")

    src = src[:m.start()] + "\n" + blocks.rstrip("\n") + src[m.start():]
    src = src.replace(BT, chr(96))
    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("added %d posts to %s" % (len(POSTS), path))


run()
