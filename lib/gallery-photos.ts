// The homepage gallery's photographs, kept as data rather than inside the
// component so app/sitemap.ts can declare them for Google Images without
// importing a React tree (Gallery.tsx pulls in GalleryLightbox, which is a
// client component, and @phosphor-icons with it).
//
// `span` is a Tailwind grid class the gallery grid understands; it is
// presentation, and the sitemap ignores it.
export interface GalleryPhotoData {
  src: string;
  alt: string;
  span?: string;
}

// Photographs from our own trips, shot by us and by our guides on departures we
// ran. Every frame here is first-party: the summit shots are our own clients on
// the Toubkal pyramid, the camps are ours, the guide is one of ours.
//
// Three entries used to be images already carrying the rest of the site (one of
// them a medina doorway captioned as Sahara dunes), and the last was an external
// Unsplash file — a stock photo of a place we run trips to, loaded from someone
// else's CDN. Both were replaced: the point of this section is that these are
// real trips, and a stock reel undercuts the claim it is making.
export const GALLERY_PHOTOS: GalleryPhotoData[] = [
  { src: "/gallery/toubkal-national-park-peak-clouds.jpg", alt: "Jbel Toubkal massif under dramatic cloud, Toubkal National Park, High Atlas Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/toubkal-summit-group-pyramid.jpg", alt: "Our trekkers at the summit pyramid of Jbel Toubkal, 4,167 m, High Atlas Morocco" },
  { src: "/gallery/trek-camp-golden-hour-valley.jpg", alt: "Our trek camp pitched above a High Atlas valley at golden hour, Morocco" },
  { src: "/gallery/imlil-mule-trail-toubkal-behind.jpg", alt: "Riding the mule trail out of Imlil with the snow-covered Toubkal ridge behind, Morocco" },
  { src: "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg", alt: "Turquoise natural pool and waterfall on the Imlil to Sidi Chamharouch trail, Toubkal, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/berber-guide-waterfall-portrait.jpg", alt: "One of our certified Berber mountain guides at a High Atlas waterfall, Morocco" },
  { src: "/gallery/trek-camp-high-valley-dawn.jpg", alt: "Berber tents at our high-mountain trek camp at first light, High Atlas Morocco" },
  { src: "/gallery/imlil-village-green-valley.jpg", alt: "Imlil village terraced into its green High Atlas valley below the Toubkal peaks, Morocco" },
  { src: "/gallery/imlil-berber-village-kittens.jpg", alt: "Kittens on the stone steps of a Berber village in the High Atlas, Morocco" },
  { src: "/gallery/imlil-valley-night-stars.jpg", alt: "Imlil valley at night — village lights and stars below the High Atlas, Morocco" },
  { src: "/gallery/trek-winter-ascent-snow-traverse.jpg", alt: "Our group traversing a snow slope on a winter ascent in the High Atlas, Morocco", span: "col-span-1 row-span-2" },
  // The Sahara was missing entirely: eleven High Atlas frames and nothing from
  // the desert, on a site where the Merzouga and Chegaga trips are half the
  // catalogue. Each of these was opened and checked before being listed — the
  // gallery folder contains files whose names do not match their contents
  // (destinations-sahara.jpg is Monument Valley, in Arizona).
  { src: "/gallery/blog-hero-sahara-dunes-golden.jpg", alt: "Desert camp among the Erg Chebbi dunes at golden hour, Merzouga Sahara, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/tours-erg-chegaga-3day-marrakech.jpg", alt: "Berber tents pitched below the dunes of Erg Chegaga, Draa Valley, Morocco" },
  { src: "/gallery/tours-merzouga-stargazing-desert-tour.jpg", alt: "The night sky over a dune at Erg Chebbi, Merzouga — no artificial light for 50 km, Morocco" },
  // Atlantic coast trek, September 2018 — a multi-day walk the gallery had no
  // frames of at all. Same rule as the Sahara block above: every one of these
  // was opened and looked at before it was listed, and the filenames were
  // written from what is in the frame rather than from where we assumed it was
  // shot.
  { src: "/gallery/atlantic-coast-trek-beach-walkers.jpg", alt: "Our group walking the tideline of an empty beach below a headland on the Atlantic coast of Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/atlantic-coast-trek-argan-trail-group.jpg", alt: "Our trekkers on a stony trail through argan woodland above the Atlantic coast, Morocco" },
  { src: "/gallery/atlantic-coast-trek-camels-argan-track.jpg", alt: "One of our guides in a blue turban walking the baggage camels along an argan-lined track on the Atlantic coast of Morocco" },
  { src: "/gallery/atlantic-coast-sea-arch-cliff.jpg", alt: "Natural rock arch in the sea cliffs with Atlantic surf breaking below, on the coast of Morocco" },
  { src: "/gallery/coastal-desert-camp-dusk-tents.jpg", alt: "Our tents pitched among coastal dunes at dusk as the camels are unloaded, Morocco" },
  // Families on our own desert departures. The catalogue sells a family desert
  // tour and a family Atlas trek, and until now the gallery showed neither —
  // a parent deciding whether this trip suits a seven-year-old had nothing to
  // look at.
  { src: "/gallery/family-desert-camp-campfire-dusk.jpg", alt: "A family with young children around the campfire at our Sahara camp at dusk, guide tending the fire, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/family-desert-camel-caravan-dunes.jpg", alt: "Children riding in the camel caravan across the Erg Chebbi dunes with our guide leading on foot, Merzouga Morocco" },
  { src: "/gallery/family-camel-trek-palmeraie-children.jpg", alt: "Children in sun scarves riding camels past the palm groves and mud-brick walls of a Draa Valley village, Morocco" },
  // What a departure actually looks like: the meals, the mules, the refuge
  // table, the guide. The gallery was heavy on landscape and light on the
  // things a person is actually buying — every frame here has our guests or
  // our crew in it.
  { src: "/gallery/camel-caravan-sunset-riders.jpg", alt: "Our guests riding the camel caravan into the sunset across the Erg Chebbi dunes, Merzouga Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/trek-lunch-mint-tea-walnut-grove.jpg", alt: "Trailside lunch of Berber salad and mint tea spread on rugs under walnut trees, High Atlas Morocco" },
  { src: "/gallery/refuge-group-dinner-long-table.jpg", alt: "Our trekkers eating together at the long table of a mountain refuge, High Atlas Morocco" },
  { src: "/gallery/atlas-terraced-fields-sunrise.jpg", alt: "Terraced Berber fields catching first light across a High Atlas valley, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/atlas-mule-train-green-trail.jpg", alt: "Our mule train carrying kit up a green spring trail in the High Atlas, Morocco" },
  { src: "/gallery/camp-cook-preparing-vegetables.jpg", alt: "Our camp cook preparing fresh vegetables inside the mess tent on a desert departure, Morocco" },
  { src: "/gallery/desert-campfire-night-guests.jpg", alt: "Guests and guides around the campfire under a black desert sky, Sahara Morocco" },
  { src: "/gallery/trek-scramble-gorge-poles.jpg", alt: "Trekkers scrambling a rocky gorge step with poles on a High Atlas route, Morocco" },
  { src: "/gallery/winter-ascent-crampons-helmet.jpg", alt: "A trekker in helmet and crampons on a winter ascent in the snow-covered High Atlas, Morocco" },
  { src: "/gallery/camels-resting-acacia-tree.jpg", alt: "Baggage camels resting in the shade of a lone acacia on a desert crossing, Morocco" },
  { src: "/gallery/ait-ben-haddou-kasbah-wide.jpg", alt: "The earthen kasbah of Aït Ben Haddou rising above the palm groves, Ouarzazate Morocco" },
  { src: "/gallery/wild-ostrich-souss-massa.jpg", alt: "A wild ostrich on the coastal plain of Souss-Massa National Park, Morocco" },
  // The imperial north: Rabat and Volubilis. The gallery was entirely southern
  // -- Atlas, Sahara, Atlantic -- while the catalogue now sells a five-day tour
  // that opens with these two sites. Photographs are our own, taken on the
  // route we actually drive.
  { src: "/gallery/rabat-mausoleum-mohammed-v-columns.jpg", alt: "The Mausoleum of Mohammed V seen across the field of broken columns on the Hassan esplanade, Rabat Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/rabat-hassan-tower-columns.jpg", alt: "The unfinished Hassan Tower minaret rising above the ranks of stone column stumps left by the abandoned mosque, Rabat Morocco" },
  { src: "/gallery/volubilis-basilica-arches.jpg", alt: "The arched basilica of the Roman city of Volubilis with fallen Corinthian capitals in the foreground, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/volubilis-arch-of-caracalla-inscription.jpg", alt: "The Latin dedication inscription along the attic of the Arch of Caracalla at Volubilis, Morocco" },
  { src: "/gallery/rabat-mausoleum-carved-portal.jpg", alt: "Carved stucco portal and bronze door of the Mausoleum of Mohammed V beneath its green tiled roofline, Rabat Morocco" },
  { src: "/gallery/rabat-mausoleum-marble-arcade.jpg", alt: "Detail of the carved white marble arcade and interlaced arches at the Mausoleum of Mohammed V, Rabat Morocco" },
  { src: "/gallery/rabat-zellij-tile-fountain.jpg", alt: "A zellij mosaic tile fountain set into a carved stone wall on the Hassan esplanade, Rabat Morocco" },
  // Rabat in more detail, shot on the same departure. The Hassan esplanade and
  // the Mausoleum carry the first morning of the five-day circuit, and one
  // wide frame of each was not enough to show what an hour there is like.
  { src: "/gallery/rabat-hassan-esplanade-columns-walker.jpg", alt: "A visitor walking between the ranks of stone column stumps on the Hassan esplanade, with the Kasbah wall and Rabat beyond, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/rabat-mausoleum-green-roof-sunburst.jpg", alt: "The green pyramid roof of the Mausoleum of Mohammed V with the sun flaring past a column of the Hassan mosque, Rabat Morocco" },
  { src: "/gallery/rabat-royal-guard-horseback-mausoleum.jpg", alt: "A Royal Guard cavalryman in red tunic and white cloak on a grey horse at the entrance to the Mausoleum of Mohammed V, Rabat Morocco" },
  { src: "/gallery/rabat-hassan-tower-carved-facade-pigeons.jpg", alt: "The carved stone lattice of the Hassan Tower beside the eroded ochre wall of the ruined mosque, pigeons roosting in its nesting holes, Rabat Morocco" },
  { src: "/gallery/rabat-mausoleum-arcade-lantern-detail.jpg", alt: "Interlaced marble arches and a hanging bronze lantern along the upper arcade of the Mausoleum of Mohammed V, Rabat Morocco" },
  { src: "/gallery/rabat-mausoleum-brass-lantern-crenellations.jpg", alt: "A pierced brass lantern on its plinth below the crenellated white marble wall of the Mausoleum of Mohammed V, Rabat Morocco" },
  { src: "/gallery/rabat-hassan-esplanade-steps-city-beyond.jpg", alt: "The broad stone steps up to the Hassan esplanade with the ruined ochre mosque wall above and Rabat spread out behind, Morocco" },
  { src: "/gallery/rabat-hassan-esplanade-zellij-fountain-wide.jpg", alt: "The tiled fountain court below the Hassan esplanade, school groups along the balustrade and the ruined mosque columns above, Rabat Morocco" },
  { src: "/gallery/rabat-alaouite-state-treasury-doorway.jpg", alt: "The doorway of the Alaouite state treasury below the ochre wall of the unfinished Hassan mosque, Rabat Morocco" },
  // Volubilis proper. The Roman city is the second stop of the same morning and
  // the gallery had two frames of it; these show the basilica from inside, the
  // Arch of Caracalla, and the olive plain the city was built to farm.
  { src: "/gallery/volubilis-arch-of-caracalla-through-arch.jpg", alt: "The Arch of Caracalla at Volubilis with its Latin dedication above and the Zerhoun plain framed through the opening, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/volubilis-basilica-interior-long-shadows.jpg", alt: "Morning shadows across the paved floor inside the basilica of Volubilis, the arched wall standing to full height, Morocco" },
  { src: "/gallery/volubilis-columns-over-zerhoun-plain.jpg", alt: "Two standing columns of Volubilis above the olive groves and wheat fields of the Zerhoun plain, Morocco" },
  { src: "/gallery/volubilis-arch-of-caracalla-across-ruins.jpg", alt: "The Arch of Caracalla seen across the excavated street plan of Volubilis with the hills of the Rif behind, Morocco" },
  { src: "/gallery/volubilis-basilica-arcade-upward.jpg", alt: "The brick-and-stone arcade of the Volubilis basilica from below, carved Corinthian capitals along the cornice, Morocco" },
  { src: "/gallery/volubilis-basilica-capitals-foreground.jpg", alt: "Fallen Corinthian capitals in the foreground of the standing basilica arcade at Volubilis, Morocco" },
  // Fes: the medina as a place of work, which is the claim the Fes guide makes
  // and the gallery had no photograph of. The woodcarvers are in a workshop off
  // the Nejjarine, cutting cedar panels by hand.
  { src: "/gallery/fes-woodcarvers-workshop-artisans.jpg", alt: "Three craftsmen at work on a carved cedar panel in a woodcarving workshop in the Fes medina, finished mashrabiya screens covering the walls, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/fes-woodcarver-chisel-mallet-panel.jpg", alt: "A woodcarver cutting a geometric rosette into a cedar panel with chisel and mallet in his workshop, Fes medina Morocco" },
  { src: "/gallery/fes-kairaouine-minaret-lit-dusk.jpg", alt: "The lit minaret and green pyramid roof of the Kairaouine mosque above the rooftops of Fes el-Bali at dusk, Morocco" },
  { src: "/gallery/fes-carpet-shop-stacked-kilims.jpg", alt: "A carpet merchant at the back of his shop between walls of stacked kilims and folded Berber blankets, Fes medina Morocco" },
  { src: "/gallery/fes-leather-shop-hanging-bags.jpg", alt: "A leather shop in the Fes medina hung floor to ceiling with bags and satchels tanned at the Chouara tannery, Morocco" },
  { src: "/gallery/fes-carpet-store-window-grille.jpg", alt: "Stacked carpets and textiles seen through an iron window grille in the Fes medina, Morocco" },
  // The southern circuit: Todra and the Erg Chebbi approach. Todra is a stop on
  // three of the multi-day routes and had no frame at all.
  { src: "/gallery/todra-gorge-red-walls-road.jpg", alt: "The road running between the 300-metre limestone walls of the Todra Gorge, High Atlas Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/todra-gorge-walker-canyon-floor.jpg", alt: "A walker on the canyon floor of the Todra Gorge dwarfed by the red rock walls, Morocco" },
  { src: "/gallery/todra-gorge-stream-beside-road.jpg", alt: "The Todra river running shallow over stones beside the gorge road under overhanging cliffs, Morocco" },
  { src: "/gallery/merzouga-erg-chebbi-dune-ridge-wide.jpg", alt: "The full ridge of the Erg Chebbi dunes rising off the flat hammada plain outside Merzouga, Morocco" },
];
