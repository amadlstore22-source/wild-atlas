# -*- coding: utf-8 -*-
"""Add the 8-day Toubkal + Sahara fixed-departure trip to the catalogue.

WHY THIS TOUR IS SHAPED DIFFERENTLY FROM EVERY OTHER ENTRY
----------------------------------------------------------
Every other tour in TOURS is sold as a private trip: `groupPricing` states the
per-person rate at each group size, because the guide and vehicle are a fixed
cost shared across whoever books. This one is a FIXED DEPARTURE -- set dates,
individual seats, strangers travelling together -- so the seat price is flat
and `groupPricing` is deliberately absent. The new `fixedDeparture` field on
Tour is what marks the difference; see its docblock in lib/tours.ts.

PRICES ARE STORED IN USD, DISPLAYED IN EUR
------------------------------------------
lib/currency-core.ts converts at 0.86693. The customer-facing figures are
EUR 889 (discounted) and EUR 921 (list), so the stored USD values are solved
backwards from those:

    1025 * 0.86693 = 888.6  -> rounds to EUR 889
    1062 * 0.86693 = 920.7  -> rounds to EUR 921

Writing 889 or 921 directly into `price` would render EUR 771 / EUR 798.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_highlights_grand_tour.py
"""
import io

PATH = "lib/tours.ts"

TOUR = '''  {
    id: "47",
    slug: "morocco-highlights-toubkal-sahara-8day",
    title: "8-Day Morocco Highlights: Toubkal Summit and Sahara Desert",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "8 days / 7 nights",
    groupSize: "Up to 14 people",
    // Shared, not private: this is a set-date departure sold by the seat.
    tourType: "shared",
    reviewCount: 0,
    rating: 0,
    // EUR 889 at the rate in lib/currency-core.ts (1025 * 0.86693 = 888.6).
    // No groupPricing: the seat price is flat by design -- see fixedDeparture
    // on the Tour interface for why the ladder does not apply here.
    price: 1025,
    fixedDeparture: {
      dates: ["2027-03-05"],
      seatsTotal: 14,
      // EUR 921 -- the standard rate this trip sells at outside the launch
      // promotion. A real price, not an invented anchor: if the discount ever
      // becomes the permanent rate, delete this field rather than keep showing
      // a figure nobody pays.
      listPrice: 1062,
    },
    depositAmount: 225,
    heroImage: "/gallery/toubkal-summit-guide-thumbs-up.jpg",
    gallery: [
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-refuge-summer-approach.jpg",
      "/gallery/blog-ait-benhaddou-guide.jpg",
      "/gallery/blog-dades-valley-gorges-guide.jpg",
      "/gallery/camel-caravan-dune-crest-sand-sea.jpg",
      "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
    ],
    shortDescription:
      "North Africa's highest summit and the dunes of Erg Chebbi in one 8-day trip, on a set departure with 14 seats.",
    description:
      "This is the trip that puts Morocco's two extremes in a single week: Jbel Toubkal at 4,167 m, and the sand sea at Erg Chebbi. You start and finish in a Marrakech riad, climb to the Toubkal refuge and summit at sunrise, then drop out of the mountains and drive south through Ait Ben Haddou, the Dades and Todra gorges to the desert, riding camels into the dunes for a night under canvas. It is one continuous route with one guide, which is why it works as eight days and not as two separate tours bolted together. Unlike our private departures, this one runs on a set date with a fixed number of seats.",
    highlights: [
      "Summit Jbel Toubkal at 4,167 m -- the highest peak in North Africa",
      "Sleep at the Toubkal refuge (3,207 m) and at Gite Panorama in Imlil",
      "Ait Ben Haddou, the UNESCO-listed earthen kasbah on the old caravan road",
      "The Dades and Todra gorges on the drive south",
      "Camel ride into Erg Chebbi and a night in a desert camp",
      "Guided walk through the Marrakech medina on the final full day",
    ],
    includes: [
      "All airport transfers, arrival and departure",
      "Full meals throughout the trek",
      "Accommodation on half board -- riad, gite, refuge and desert camp",
      "Licensed mountain guide",
      "Mules on the trek and the camel ride at Erg Chebbi",
      "Lunches during the desert leg",
    ],
    excludes: [
      "Dinner in Marrakech",
      "Travel insurance",
      "Tips for guide, muleteers and camp staff",
    ],
    itinerary: [
      {
        day: 1,
        stay: "Riad, Marrakech",
        title: "Arrival in Marrakech",
        description:
          "Airport transfer to your riad in the medina. The rest of the day is yours to settle in and adjust. Dinner in Marrakech is not included, so you are free to eat where you like.",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
      },
      {
        day: 2,
        meals: "B,L,D",
        stay: "Toubkal Refuge",
        driving: "1.5 h",
        walking: "5 h",
        ascent: "+1,470 m",
        title: "Marrakech to Imlil, then up to the Toubkal Refuge (3,207 m)",
        description:
          "Drive to Imlil (1,740 m), the trailhead village, and meet the mules. Trek up the Mizane Valley past the Sidi Chamharouch shrine to the refuge. Early night before summit day.",
        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },
      },
      {
        day: 3,
        meals: "B,L,D",
        stay: "Gite Panorama, Imlil",
        walking: "8-9 h",
        ascent: "+960 m / -2,430 m",
        title: "Toubkal summit (4,167 m), then down to Imlil",
        description:
          "A pre-dawn start for the summit, on the top for sunrise over the Atlas and the Sahara haze beyond. Descend all the way to Imlil and sleep at Gite Panorama -- a real bed and a hot shower after two days on the mountain.",
        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },
      },
      {
        day: 4,
        meals: "B,D",
        stay: "Hotel, Dades",
        driving: "7-8 h",
        distance: "~330 km",
        title: "Imlil to Ait Ben Haddou and the Dades Gorges",
        description:
          "Leave the mountains over the Tizi n'Tichka pass and stop at Ait Ben Haddou, the UNESCO-listed kasbah on the old Saharan caravan route. Continue through Ouarzazate to the Dades Gorges for the night.",
        stop: { name: "Ait Ben Haddou", lat: 31.0472, lng: -7.1319 },
      },
      {
        day: 5,
        meals: "B,L,D",
        stay: "Desert camp, Erg Chebbi",
        driving: "5-6 h",
        distance: "~290 km",
        title: "Dades to Todra Gorge, then camels into Erg Chebbi",
        description:
          "Walk into the Todra Gorge, where the walls close to a few metres apart and rise 300 m. Drive on to Merzouga and swap the vehicle for camels, riding into the dunes to reach camp before sunset.",
        stop: { name: "Erg Chebbi", lat: 31.1000, lng: -3.9833 },
      },
      {
        day: 6,
        meals: "B,L,D",
        stay: "Riad, Marrakech",
        driving: "9-10 h",
        distance: "~560 km",
        title: "Merzouga back to Marrakech",
        description:
          "Sunrise over the dunes, then the long drive back across the Draa Valley and over the High Atlas to Marrakech. It is a full day on the road -- the trade-off for reaching the real sand sea rather than the nearer dunes.",
        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },
      },
      {
        day: 7,
        meals: "B",
        stay: "Riad, Marrakech",
        walking: "3-4 h",
        title: "Guided medina tour and a free evening",
        description:
          "A guided walk through the Marrakech medina -- the souks, the tanners' quarter and the historic core -- ending in the early afternoon. The evening is yours; dinner in Marrakech is not included.",
        stop: { name: "Marrakech Medina", lat: 31.6258, lng: -7.9891 },
      },
      {
        day: 8,
        meals: "B",
        title: "Departure",
        description: "Transfer to Marrakech Menara airport in time for your flight.",
      },
    ],
    faq: [
      { q: "How fit do I need to be for the Toubkal section?", a: "Fit enough for two long consecutive days, the second of which is roughly nine hours with a pre-dawn start. There is no technical climbing, no rope and no scrambling -- it is a long walk at altitude. If you can walk six hours in hill country without dreading the next day, you are ready." },
      { q: "Is this a private trip?", a: "No. This is a set-date departure with 14 seats, so you travel with other people who booked the same date. That is what makes the per-person price flat rather than dependent on your group size. If you would rather have the route to yourselves, ask us and we will quote it privately." },
      { q: "What is the weather like in early March?", a: "Toubkal is a winter mountain in March -- expect snow on the upper slopes and sub-zero temperatures at the summit at dawn, with crampons and an ice axe supplied where conditions require them. The desert leg is the opposite: warm days and cold, clear nights." },
      { q: "Why is day 6 such a long drive?", a: "Because Erg Chebbi is the real sand sea, roughly 560 km from Marrakech. Operators who promise a short desert transfer are usually going to the much smaller dunes at Zagora. We think the extra hours buy something worth having." },
      { q: "What does the 14-seat limit actually mean?", a: "The departure closes when 14 seats are sold. We cap it there because the Toubkal refuge and the desert camp both have finite space, and because a guide can only look after so many people on a summit morning." },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Marrakech Menara Airport -- we collect you" },
    seoTitle: "8-Day Toubkal Summit and Sahara Desert Tour",
    seoDescription:
      "Toubkal (4,167 m) and the Erg Chebbi dunes in one 8-day trip from Marrakech. Set departure 5 March 2027, 14 seats, EUR 889 per person including transfers and half board.",
    featured: true,
  },
]'''

def run():
    src = io.open(PATH, encoding="utf-8").read()
    marker = "    featured: false,\n  },\n];\n\nexport function getTour("
    assert src.count(marker) == 1, "expected exactly one TOURS array terminator"
    assert '"morocco-highlights-toubkal-sahara-8day"' not in src, "tour already present"
    src = src.replace(
        marker,
        "    featured: false,\n  },\n" + TOUR + ";\n\nexport function getTour(",
    )
    io.open(PATH, "w", encoding="utf-8", newline="\n").write(src)
    print("added morocco-highlights-toubkal-sahara-8day")


run()
