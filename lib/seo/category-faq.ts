import type { Faq } from "./types";

/**
 * FAQ per tour category. Rendered visibly on the category page and emitted as
 * FAQPage schema — the two must always ship together.
 *
 * Answers avoid quoting prices: tours store USD and pages render EUR via
 * priceIn(), so a figure in prose would contradict the cards beside it.
 * Cost questions point at the tour page instead.
 *
 * Keyed loosely rather than by Category so a category with no FAQ simply
 * renders nothing.
 */
export const CATEGORY_FAQ: Record<string, Faq[]> = {
  trekking: [
    {
      q: "Do I need a guide to trek in the Moroccan Atlas?",
      a: "In the Toubkal massif, yes — since 2018 foreign trekkers are required to be accompanied by a qualified mountain guide, and this is checked at Imlil. Elsewhere in the Atlas it is not a legal requirement, but the paths are unmarked and the villages are spread out, so most people take one anyway.",
    },
    {
      q: "How fit do I need to be for a multi-day trek?",
      a: "Enough to walk uphill for five to six hours on consecutive days carrying a daypack. These are long walks rather than technical climbs, so stamina matters far more than climbing experience. Our tour pages give each trek a difficulty rating, and moderate routes are realistic for a regular hillwalker.",
    },
    {
      q: "Do I carry all my own gear?",
      a: "No. On our multi-day treks mules carry the main baggage, camping equipment and food between stops, so you walk with a daypack holding water, layers and a camera. That is what makes a six or seven day traverse manageable for people who have never camped at altitude.",
    },
    {
      q: "What is the best season for trekking in Morocco?",
      a: "April to October for the High Atlas, when the high passes are clear of snow. Winter trekking there is genuine mountaineering and needs crampons, an ice axe and experience. The Anti-Atlas flips this: late winter and spring are ideal, and summer is too hot and exposed.",
    },
    {
      q: "Where do we sleep on a multi-day trek?",
      a: "A mix of mountain refuges, village guesthouses and gites depending on the route, with some nights under canvas on the longer traverses. Expect shared rooms, simple food cooked fresh, and cold nights at altitude. Each itinerary lists the accommodation night by night.",
    },
  ],

  desert: [
    {
      q: "Can I visit the Sahara as a day trip?",
      a: "Not the real dunes. Erg Chebbi and Erg Chegaga are on the far side of the Atlas, which is why we run them over two to four days. The one-day desert experience near Marrakech is Agafay, a rocky desert rather than sand dunes — good for a sunset, but it is not the Sahara.",
    },
    {
      q: "What is the difference between Merzouga, Zagora and Erg Chegaga?",
      a: "Merzouga sits beside Erg Chebbi, the tall classic dunes most people picture, and needs three days. Zagora is closer and doable in two, with smaller dunes. Erg Chegaga is the remote option, reached by 4x4, where you see far fewer other camps. Distance and solitude both rise in that order.",
    },
    {
      q: "What is the desert camp like — is there a bathroom?",
      a: "Our standard camps have proper beds with blankets, shared bathroom facilities and lighting; the luxury camps add private tents with hot showers. Either way the dunes are genuinely dark and quiet at night, which is what most people remember rather than the camel ride.",
    },
    {
      q: "What should I pack for a desert tour?",
      a: "A small overnight bag for the camp — your main luggage stays in the vehicle — plus a warm layer, something to cover your head, sunglasses and sunscreen. Desert nights get cold outside summer, and people consistently underpack for that rather than for the heat.",
    },
    {
      q: "Do I have to ride a camel?",
      a: "No. The camel leg into the camp is short and entirely optional, and walking that stretch instead is common enough that guides expect it. The vehicle covers all the real distance; the camels are the last stretch into the dunes.",
    },
  ],

  cultural: [
    {
      q: "What does a cultural tour actually involve?",
      a: "Walking the medinas, souks and historic quarters with a guide who can explain what you are looking at and negotiate the parts that are hard to navigate alone. Depending on the route it takes in the imperial cities, Ait Ben Haddou, artisan workshops and food, rather than a fixed list of monuments.",
    },
    {
      q: "Is a guide worth it in Marrakech or Fes?",
      a: "In the Fes medina especially, yes. It is the largest car-free urban area in the world and genuinely disorienting on a first visit. A guide is the difference between seeing the tanneries and workshops and spending the afternoon trying to find your way back out.",
    },
    {
      q: "What should I wear when visiting medinas and religious sites?",
      a: "Covering shoulders and knees is the practical baseline for both men and women, and it draws noticeably less attention in the older quarters. Nothing more formal is expected. Comfortable shoes matter more than anything else, since medina streets are uneven and you will be on foot for hours.",
    },
    {
      q: "Can cultural tours be combined with desert or trekking trips?",
      a: "Yes, and most of our longer itineraries already do. The road between Marrakech and the Sahara passes Ait Ben Haddou and the gorges, so the cultural stops are built into the drive rather than bolted on. Tell us what you want to see and we can route around it.",
    },
  ],

  "day-tours": [
    {
      q: "What day trips are worth doing from Marrakech?",
      a: "The Ourika Valley and Atlas foothills for mountains and waterfalls, Ouzoud for the falls themselves, Agafay for a desert sunset without the long drive, and Essaouira for the coast. Each is a full day; the mountain trips get you into real Atlas scenery within about an hour of the city.",
    },
    {
      q: "Are day tours private or shared?",
      a: "We run both. Shared departures keep the cost down and put you with a small group; private trips let you set the departure time and pace, which is worth it with children or if you want to linger somewhere. The tour pages list the group size for each.",
    },
    {
      q: "What time do day tours start and finish?",
      a: "Most leave early morning and return late afternoon or early evening, since the destinations are one to three hours out. Early starts genuinely pay off at popular spots like Paradise Valley and Ouzoud, where the difference between arriving at nine and at eleven is substantial.",
    },
    {
      q: "Is hotel pickup included?",
      a: "Yes, from central accommodation in the departure city. If you are staying outside the centre or in a riad down a pedestrian alley, we will arrange a nearby meeting point instead — the guides know the medinas and will tell you exactly where to stand.",
    },
  ],
};
