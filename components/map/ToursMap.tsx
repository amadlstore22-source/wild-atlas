"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import L from "leaflet";
// Imported here, not in the root layout: from the layout it shipped a
// render-blocking 10 KB stylesheet to all 802 pages — every blog post and legal
// page included — and partly defeated the IntersectionObserver deferral, since
// the JS waited but the CSS still blocked first paint. Next scopes it to the
// chunks that actually load a map.
import "leaflet/dist/leaflet.css";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import type { MapTour } from "@/lib/map-tours";
import type { CategoryText, PlaceText } from "@/lib/map-places-i18n";
import { useCurrency } from "@/lib/currency";
import Image from "next/image";

interface Destination {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
  color: string;
  image: string;
  description: string;
  known: string[];
  category: string;
  slug: string;
  destSlug: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    subtitle: "The Red City",
    lat: 31.6295,
    lng: -7.9811,
    color: "#C1693A",
    image: "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
    description:
      "Morocco's most electric city, a thousand-year-old labyrinth of souks, palaces, and street theatre in the shadow of the Atlas Mountains.",
    known: [
      "Djemaa el-Fna, the world's greatest open-air theatre",
      "14-guild souk network & ancient medina",
      "Koutoubia Mosque & Saadian Tombs",
      "Majorelle Garden & hidden riads",
      "Gateway to the High Atlas",
    ],
    category: "Cultural",
    slug: "cultural",
    destSlug: "marrakech",
  },
  {
    id: "toubkal",
    name: "Jbel Toubkal",
    subtitle: "Roof of North Africa",
    lat: 31.0573,
    lng: -7.9149,
    color: "#4B7A3A",
    image: "/gallery/category-hero-atlas-ridge.jpg",
    description:
      "The definitive High Atlas challenge: ascend through Berber villages and glacial valleys to the highest summit in all of North Africa at 4,167 m.",
    known: [
      "Highest peak in North Africa at 4,167 m",
      "Imlil valley & Berber mountain villages",
      "Alpine refuges & pristine glacial lakes",
      "Year-round trekking, snow in winter",
      "Views spanning Morocco to the Sahara",
    ],
    category: "Trekking",
    slug: "trekking",
    destSlug: "high-atlas",
  },
  {
    id: "sahara",
    name: "Erg Chebbi",
    subtitle: "The Golden Sahara",
    lat: 31.1513,
    lng: -3.9785,
    color: "#B8722A",
    // Was destinations-sahara.jpg, which is a photograph of Monument Valley in
    // Arizona — the American southwest standing in for Erg Chebbi.
    image: "/gallery/tours-desert-4day-marrakech.jpg",
    description:
      "An ocean of golden dunes stretching to the Algerian border. Arrive by camel, sleep in a Berber camp, and watch sunrise paint the Sahara copper and gold.",
    known: [
      "Dunes rising up to 150 m above the desert floor",
      "Camel trekking at sunrise & sunset",
      "Authentic Berber nomadic desert camps",
      "Milky Way stargazing in absolute silence",
      "Quad biking & 4x4 desert excursions",
    ],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "fes",
    name: "Fes el-Bali",
    subtitle: "The Living Medieval City",
    lat: 34.0545,
    lng: -4.9815,
    color: "#8B6914",
    image: "/gallery/destinations-fes.jpg",
    description:
      "The most intact medieval city on earth: 9,000+ alleyways, the world's oldest university, and the legendary Chouara Tannery unchanged since the 11th century.",
    known: [
      "World's largest car-free urban zone",
      "Chouara Tannery, operated since the 11th century",
      "University of al-Qarawiyyin, founded 859 AD",
      "Bou Inania Madrasa & royal palace gates",
      "UNESCO World Heritage medina",
    ],
    category: "Cultural",
    slug: "cultural",
    destSlug: "fes",
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    subtitle: "The Blue Pearl",
    lat: 35.1688,
    lng: -5.2689,
    color: "#3B7A9E",
    image: "/gallery/destinations-chefchaouen.jpg",
    description:
      "Nestled in the Rif Mountains, every wall in Chefchaouen's medina is washed in blue, serene and photogenic, unlike anywhere else in Morocco.",
    known: [
      "Medina painted entirely in blue & white",
      "Rif Mountain setting with hiking trails",
      "Ras el-Ma river walk & waterfall",
      "Artisan wool weaving & café culture",
      "Photography paradise, every alley is a frame",
    ],
    category: "Cultural",
    slug: "cultural",
    destSlug: "chefchaouen",
  },
  {
    id: "agadir",
    name: "Agadir & Taghazout",
    subtitle: "Atlantic Coast & Surf",
    lat: 30.4278,
    lng: -9.5981,
    color: "#5E7460",
    image: "/gallery/blog-taghazout-surf-guide-morocco.jpg",
    description:
      "Morocco's southern beach hub with 9 km of white Atlantic sand, world-class surf breaks at Taghazout, and the Anti-Atlas mountains rising behind the city.",
    known: [
      "9 km of pristine Atlantic beach",
      "World-class surf at Taghazout village",
      "Souss-Massa National Park & flamingos",
      "Argan oil cooperatives & Paradise Valley",
      "Sunset from the ancient Kasbah hilltop",
    ],
    category: "Day Tours",
    slug: "day-tours",
    destSlug: "agadir",
  },
  {
    id: "ouzoud",
    name: "Ouzoud Falls",
    subtitle: "Morocco's Natural Wonder",
    lat: 32.0187,
    lng: -6.7188,
    color: "#3D7D5C",
    image: "/gallery/destinations-ouzoud.jpg",
    description:
      "A triple cascade plunging 110 m into a turquoise pool. Wild Barbary macaques, rainbow mist, and some of Morocco's most breathtaking gorge scenery.",
    known: [
      "110 m waterfall, most spectacular in Morocco",
      "Wild Barbary macaque colony",
      "Hidden gorge hike to the thundering base pool",
      "Rainbow mist visible at midday sun",
      "Traditional Berber olive mills & olive groves",
    ],
    category: "Hiking",
    slug: "hiking",
    destSlug: "ouzoud",
  },
  {
    id: "essaouira",
    name: "Essaouira",
    subtitle: "The Windy Walled City",
    lat: 31.5085,
    lng: -9.7595,
    color: "#5E7460",
    image: "/gallery/destinations-essaouira.jpg",
    description:
      "A whitewashed Atlantic port with 18th-century Portuguese ramparts, constant wind, Gnawa music, and a medina that feels entirely its own.",
    known: [
      "UNESCO-listed medina & 18th-century sea walls",
      "World-class kitesurfing & windsurfing",
      "Gnawa music capital of Morocco",
      "Blue fishing boats & fresh seafood market",
      "Jimi Hendrix famously visited in 1969",
    ],
    category: "Day Tours",
    slug: "day-tours",
    destSlug: "essaouira",
  },
  // Added 2026-10-13. Positions from OpenStreetMap; photos opened one by one
  // (gallery filenames are not trusted); text from the site's own guides.
  {
    id: "ait-ben-haddou",
    name: "Aït Ben Haddou",
    subtitle: "The Film-Set Ksar",
    lat: 31.0452,
    lng: -7.131,
    color: "#B8722A",
    image: "/gallery/blog-ait-benhaddou-guide.jpg",
    description:
      "A UNESCO-listed fortified village of earthen kasbahs near Ouarzazate, used in dozens of films, and the first great stop on the road to the Sahara.",
    known: ["UNESCO World Heritage ksar", "Film location for dozens of productions", "Earthen kasbahs above the river", "On every desert tour from Marrakech"],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "dades",
    name: "Dades Gorges",
    subtitle: "Road of a Thousand Kasbahs",
    lat: 31.4823,
    lng: -5.9569,
    color: "#B8722A",
    image: "/gallery/blog-dades-valley-gorges-guide.jpg",
    description:
      "Switchback roads, rose-red rock and kasbahs built into the cliffs: the most dramatic stretch of the drive to the Sahara, and where desert tours spend their first night.",
    known: ["The famous hairpin road", "Rose-red rock formations", "Kasbahs built into the cliffs", "First night on the 3-day desert tours"],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "todra",
    name: "Todra Gorge",
    subtitle: "300 m Canyon Walls",
    lat: 31.5885,
    lng: -5.5938,
    color: "#B8722A",
    image: "/gallery/todra-gorge-red-walls-road.jpg",
    description:
      "A limestone canyon with walls 300 metres high, on the way to Merzouga. Every desert tour slows down here for a walk along the canyon floor.",
    known: ["Canyon walls 300 m high", "Short walk along the canyon floor", "On the road to Merzouga"],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "zagora",
    name: "Zagora",
    subtitle: "The Draa Valley Palms",
    lat: 30.3279,
    lng: -5.837,
    color: "#B8722A",
    image: "/gallery/kasbah-palm-oasis-draa.jpg",
    description:
      "The closest slice of desert to Marrakech: a two-day dune escape through the palm groves of the Draa Valley, with a night in a desert camp.",
    known: ["Two-day desert trip from Marrakech", "Draa Valley palm oasis", "Night in a desert camp"],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "chegaga",
    name: "Erg Chegaga",
    subtitle: "The Remote Sand Sea",
    lat: 29.8492,
    lng: -6.2095,
    color: "#B8722A",
    image: "/gallery/tours-erg-chegaga-3day-marrakech.jpg",
    description:
      "Morocco's other great sand sea, reached beyond the end of the road at M'hamid. Remote enough that you may see no other camp at all.",
    known: ["Morocco's second great sand sea", "Beyond the road's end at M'hamid", "Few other camps in sight"],
    category: "Desert",
    slug: "desert",
    destSlug: "sahara",
  },
  {
    id: "agafay",
    name: "Agafay Desert",
    subtitle: "The Stone Desert",
    lat: 31.4872,
    lng: -8.1971,
    color: "#B8722A",
    image: "/gallery/agafay-camel-caravan-golden-hour.jpg",
    description:
      "A vast landscape of stone and silence about 40 km from Marrakech: sunset camel rides, dinner at a camp and the Atlas on the horizon, back the same night.",
    known: ["About 40 km from Marrakech", "Sunset camel rides", "Dinner and music at a camp", "Back in Marrakech the same night"],
    category: "Day Tours",
    slug: "day-tours",
    destSlug: "marrakech",
  },
  {
    id: "ourika",
    name: "Ourika Valley",
    subtitle: "The Closest High Atlas",
    lat: 31.2211,
    lng: -7.6712,
    color: "#3D7D5C",
    image: "/gallery/ourika-valley-cascade-cafe.jpg",
    description:
      "About 60 km from Marrakech, the closest real High Atlas scenery to the city: Berber villages, a working river and a waterfall hike at Setti Fatma.",
    known: ["About 60 km from Marrakech", "Waterfall hike at Setti Fatma", "Berber villages along the river"],
    category: "Hiking",
    slug: "hiking",
    destSlug: "high-atlas",
  },
  {
    id: "mgoun",
    name: "M'Goun Massif",
    subtitle: "Morocco's Second Summit",
    lat: 31.5091,
    lng: -6.4442,
    color: "#4B7A3A",
    image: "/gallery/category-hero-mgoun-massif.jpg",
    description:
      "Morocco's second-highest peak, with a fraction of Toubkal's traffic. A multi-day traverse with homestays, camping and a full mule team.",
    known: ["Jebel M'Goun, 4,071 m", "Far quieter than Toubkal", "Homestays, camping and mule team"],
    category: "Trekking",
    slug: "trekking",
    destSlug: "high-atlas",
  },
  {
    id: "tafraoute",
    name: "Tafraoute",
    subtitle: "The Anti-Atlas",
    lat: 29.7231,
    lng: -8.9762,
    color: "#4B7A3A",
    image: "/gallery/tafraoute-painted-rocks.jpg",
    description:
      "The heart of the Anti-Atlas, a range older than the Himalayas and far less visited than the High Atlas: the painted rocks, the Ameln Valley and almond blossom.",
    known: ["The painted rocks", "Ameln Valley villages", "Almond blossom in season"],
    category: "Trekking",
    slug: "trekking",
    destSlug: "agadir",
  },
  {
    id: "souss-massa",
    name: "Souss-Massa",
    subtitle: "National Park",
    lat: 30.0885,
    lng: -9.6483,
    color: "#3D7D5C",
    image: "/gallery/wild-ostrich-souss-massa.jpg",
    description:
      "Half an hour south of Agadir: one of the last strongholds of the northern bald ibis, and flamingos wading the Massa estuary.",
    known: ["Northern bald ibis", "Flamingos on the Massa estuary", "Half an hour from Agadir"],
    category: "Day Tours",
    slug: "day-tours",
    destSlug: "agadir",
  },
  {
    id: "rabat",
    name: "Rabat",
    subtitle: "The Capital",
    lat: 34.0241,
    lng: -6.8228,
    color: "#8B6914",
    image: "/gallery/rabat-hassan-tower-columns.jpg",
    description:
      "A UNESCO-listed medina, a 12th-century kasbah above the Atlantic and the Hassan Tower, with almost none of the crowds of Marrakech or Fes.",
    known: ["Hassan Tower", "Kasbah des Oudayas", "Chellah necropolis and its storks"],
    category: "Cultural",
    slug: "cultural",
    destSlug: "fes",
  },
  {
    id: "volubilis",
    name: "Volubilis",
    subtitle: "Roman Morocco",
    lat: 34.0735,
    lng: -5.5554,
    color: "#8B6914",
    image: "/gallery/volubilis-columns-over-zerhoun-plain.jpg",
    description:
      "The best-preserved Roman site in Morocco, near Meknes, and the only one where the mosaics are still in the floors they were laid in.",
    known: ["Mosaics still in their floors", "Arch of Caracalla", "Near Meknes, on the imperial cities route"],
    category: "Cultural",
    slug: "cultural",
    destSlug: "fes",
  },
];

// The map opens framed on the places themselves. It was a fixed centre at
// zoom 5.5, which showed half of Spain and Algeria and squeezed every pin
// around Marrakech into one spot.
const PLACES_BOUNDS = L.latLngBounds(DESTINATIONS.map((d) => [d.lat, d.lng] as [number, number]));
const HOME_PADDING: L.PointExpression = [40, 40];

/**
 * A round pin with its name beside it. Teardrop pins 28 px wide with a label
 * underneath covered each other once the map had 20 places (owner,
 * 2026-10-13); dots stay clear of each other, and declutter() moves or hides
 * the names.
 */
function makeDivIcon(dest: Destination, active = false): L.DivIcon {
  const d = active ? 20 : 14;
  return L.divIcon({
    html: `<div class="map-pin" style="box-sizing:border-box;width:${d}px;height:${d}px;border-radius:50%;background:${dest.color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.6);cursor:pointer;position:relative;">
      <span class="map-pin-label" style="position:absolute;white-space:nowrap;font-size:10.5px;font-weight:700;color:#fff;background:rgba(0,0,0,0.74);border-radius:3px;padding:1px 6px;pointer-events:none;letter-spacing:0.01em;">${dest.name}</span>
    </div>`,
    className: "",
    iconSize: [d, d],
    iconAnchor: [d / 2, d / 2],
  });
}

const LABEL_SIDES: Partial<CSSStyleDeclaration>[] = [
  { left: "calc(100% + 4px)", top: "50%", transform: "translateY(-50%)" },
  { right: "calc(100% + 4px)", top: "50%", transform: "translateY(-50%)" },
  { bottom: "calc(100% + 3px)", left: "50%", transform: "translateX(-50%)" },
  { top: "calc(100% + 3px)", left: "50%", transform: "translateX(-50%)" },
  { bottom: "calc(100% - 2px)", left: "calc(100% - 2px)" },
  { top: "calc(100% - 2px)", left: "calc(100% - 2px)" },
  { bottom: "calc(100% - 2px)", right: "calc(100% - 2px)" },
  { top: "calc(100% - 2px)", right: "calc(100% - 2px)" },
];

const overlaps = (a: DOMRect, b: DOMRect, gap = 0) =>
  a.left < b.right + gap && a.right + gap > b.left && a.top < b.bottom + gap && a.bottom + gap > b.top;

/**
 * Keep the map readable at every zoom. In order (the selected place first,
 * then DESTINATIONS order):
 *  1. a pin that would sit on a pin already shown is hidden until the map
 *     zooms in far enough to separate them (on a phone, Agafay sat on
 *     Marrakech); it stays in the list under the map;
 *  2. each shown pin's name takes the first of eight positions where it
 *     covers no pin and no name already placed, inside the map, or is hidden
 *     and shows on hover.
 */
function declutter(map: L.Map, markers: Record<string, L.Marker>, selectedId: string | null) {
  // Ids only: the order is the same whatever the page language.
  const frame = map.getContainer().getBoundingClientRect();
  const order = [...DESTINATIONS].sort((a, b) => Number(b.id === selectedId) - Number(a.id === selectedId));
  const shown: { id: string; r: DOMRect }[] = [];
  for (const dest of order) {
    const root = markers[dest.id]?.getElement();
    const pin = root?.querySelector<HTMLElement>(".map-pin");
    if (!root || !pin) continue;
    root.style.visibility = "visible";
    root.style.pointerEvents = "";
    const r = pin.getBoundingClientRect();
    if (dest.id !== selectedId && shown.some((p) => overlaps(r, p.r, 2))) {
      root.style.visibility = "hidden";
      root.style.pointerEvents = "none";
      continue;
    }
    shown.push({ id: dest.id, r });
  }
  const placed: DOMRect[] = [];
  for (const { id } of shown) {
    const label = markers[id]?.getElement()?.querySelector<HTMLElement>(".map-pin-label");
    if (!label) continue;
    label.style.visibility = "visible";
    let ok = false;
    for (const side of LABEL_SIDES) {
      for (const k of ["left", "right", "top", "bottom", "transform"] as const) label.style[k] = "";
      Object.assign(label.style, side);
      const r = label.getBoundingClientRect();
      const inside = r.left >= frame.left && r.right <= frame.right && r.top >= frame.top && r.bottom <= frame.bottom;
      if (inside && !shown.some((p) => p.id !== id && overlaps(r, p.r)) && !placed.some((q) => overlaps(r, q))) {
        placed.push(r);
        ok = true;
        break;
      }
    }
    if (!ok) label.style.visibility = "hidden";
  }
}

/**
 * Text colours for the panel's two grounds. The desktop sidebar is navy
 * (#141d33) and the phone card is white; the text was set for white only, so
 * on desktop the place name and description were dark on dark (owner's
 * screenshots, 2026-10-13).
 */
const INK = {
  light: { title: "#181818", sub: "#6b6b6b", body: "#3d3d3d", label: "#707070", item: "#333", meta: "#555" },
  dark: { title: "#FBF8F3", sub: "rgba(251,248,243,0.75)", body: "rgba(251,248,243,0.9)", label: "rgba(251,248,243,0.65)", item: "rgba(251,248,243,0.9)", meta: "rgba(251,248,243,0.78)" },
};

function DetailBody({ dest, lang, dict, tours, category, dark = false }: { dest: Destination; lang: Locale; dict: Dictionary; tours: MapTour[]; category: CategoryText; dark?: boolean }) {
  const { format } = useCurrency();
  const ink = dark ? INK.dark : INK.light;
  return (
    <div style={{ padding: "14px 16px 20px" }}>
      <span
        style={{
          display: "inline-block",
          background: dest.color + "18",
          color: dest.color,
          border: `1px solid ${dest.color}44`,
          borderRadius: 999,
          padding: "2px 10px",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 8,
        }}
      >
        {category.pill}
      </span>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: ink.title, margin: "0 0 2px", lineHeight: 1.2 }}>
        {dest.name}
      </h3>
      <p style={{ fontSize: 12, color: ink.sub, margin: "0 0 8px" }}>{dest.subtitle}</p>
      <p style={{ fontSize: 12.5, color: ink.body, lineHeight: 1.58, margin: "0 0 12px" }}>{dest.description}</p>
      {/* The tours that go here, with their price, so a visitor exploring the
          map reaches a bookable trip from the panel (lib/map-tours.ts). They
          come straight after the description: below "Known for" they sat
          under the fold of the desktop panel (owner, 2026-10-13). */}
      {tours.length > 0 && (
        <>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: ink.label,
              margin: "0 0 6px",
            }}
          >
            {dict.map.toursHere}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {tours.map((t) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  style={{
                    display: "block",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${dest.color}33`,
                    background: dest.color + "0d",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: ink.title, lineHeight: 1.35 }}>
                    {t.title}
                  </span>
                  <span style={{ display: "block", fontSize: 11.5, color: ink.meta, marginTop: 2 }}>
                    {t.duration} · {dict.common.from}{" "}
                    <strong style={{ color: ink.title }}>{format(t.priceEur)}</strong>{" "}
                    {t.minPeople > 1 ? dict.common.perPersonGroup.replace("{count}", String(t.minPeople)) : dict.common.perPerson}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <a
        href={`/${lang}/tours?place=${dest.id}`}
        style={{
          display: "block",
          marginTop: 14,
          padding: "9px 0",
          background: dest.color,
          color: "#fff",
          borderRadius: 10,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        {/* Every tour that goes here, on the tours page (?place=). It linked to
            the destination page, which the owner found was not what a visitor
            pressing "Browse" wants. The arrow is in the dictionary string,
            pointing the right way for RTL. */}
        {dict.map.allToursHere}
      </a>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: ink.label,
          margin: "16px 0 6px",
        }}
      >
        {dict.map.knownFor}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
        {dest.known.map((item, i) => (
          <li
            key={i}
            style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: ink.item, lineHeight: 1.45 }}
          >
            <span style={{ color: dest.color, flexShrink: 0, fontSize: 9, marginTop: 2 }}>&#9658;</span>
            {item}
          </li>
        ))}
      </ul>
      {/* A fade at the foot of the dark sidebar, so it reads as scrollable. */}
      {dark && (
        <div
          aria-hidden
          style={{ position: "sticky", bottom: -20, height: 32, marginTop: -12, background: "linear-gradient(rgba(20,29,51,0), #141d33)", pointerEvents: "none" }}
        />
      )}
    </div>
  );
}

export default function ToursMap({ lang, dict, tours, placeText, categoryText }: {
  lang: Locale;
  dict: Dictionary;
  tours: Record<string, MapTour[]>;
  /** This locale's names and descriptions (lib/map-places-i18n.ts); English when absent. */
  placeText?: Record<string, PlaceText>;
  categoryText: Record<string, CategoryText>;
}) {
  const places = useMemo(
    () => DESTINATIONS.map((d) => ({ ...d, ...(placeText?.[d.id] ?? {}) })),
    [placeText],
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const [selected, setSelected] = useState<Destination | null>(null);
  // For the map's own event handlers, which outlive any one render.
  const selectedRef = useRef<string | null>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      // Fractional zoom, so fitting the places does not snap to a whole level
      // and leave the pins bunched in the middle.
      zoomSnap: 0.25,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });
    map.fitBounds(PLACES_BOUNDS, { padding: HOME_PADDING });

    // Satellite imagery (ArcGIS — already in CSP img-src)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        tileSize: 256,
        maxZoom: 18,
        attribution:
          "Tiles &copy; <a href='https://www.esri.com'>Esri</a> &mdash; Source: Esri, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP",
      }
    ).addTo(map);

    // Place name labels overlay (ArcGIS — same domain, already in CSP)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { tileSize: 256, maxZoom: 18 }
    ).addTo(map);

    // Controls
    L.control.zoom({ position: "topleft" }).addTo(map);
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    // Markers
    places.forEach((dest) => {
      const marker = L.marker([dest.lat, dest.lng], { icon: makeDivIcon(dest, false), riseOnHover: true });

      marker.on("click", () => {
        setSelected((prev) => {
          const next = prev?.id === dest.id ? null : dest;
          if (next) {
            map.flyTo([dest.lat, dest.lng], 10, { animate: true, duration: 1.4 });
          } else {
            map.flyToBounds(PLACES_BOUNDS, { padding: HOME_PADDING, duration: 1.2 });
          }
          return next;
        });
      });

      marker.addTo(map);
      markerRefs.current[dest.id] = marker;
    });

    mapRef.current = map;
    map.on("zoomend moveend", () => declutter(map, markerRefs.current, selectedRef.current));
    // Re-measure after React paint to catch any layout reflow on mobile
    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(PLACES_BOUNDS, { padding: HOME_PADDING });
      declutter(map, markerRefs.current, selectedRef.current);
    }, 100);
    return () => {
      map.remove();
      mapRef.current = null;
      markerRefs.current = {};
    };
  }, []);

  // Update active pin icon when selection changes
  useEffect(() => {
    selectedRef.current = selected?.id ?? null;
    places.forEach((dest) => {
      const marker = markerRefs.current[dest.id];
      if (marker) {
        marker.setIcon(makeDivIcon(dest, selected?.id === dest.id));
      }
    });
    if (mapRef.current) declutter(mapRef.current, markerRefs.current, selectedRef.current);
  }, [selected]);

  // Scroll mobile info card into view when a destination is selected
  useEffect(() => {
    if (selected && mobileCardRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        mobileCardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    }
  }, [selected]);

  const pick = (dest: Destination) => {
    const next = selected?.id === dest.id ? null : dest;
    setSelected(next);
    if (next) {
      mapRef.current?.flyTo([dest.lat, dest.lng], 10, { animate: true, duration: 1.4 });
    } else {
      mapRef.current?.flyToBounds(PLACES_BOUNDS, { padding: HOME_PADDING, duration: 1.2 });
    }
  };

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg,#1B2645 0%,#141d33 100%)" }}
    >
      <style>{`
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(0,0,0,0.55) !important; color: rgba(255,255,255,0.6) !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.7) !important; }
        .leaflet-control-zoom { border-radius: 8px !important; overflow: hidden; border: none !important; }
        .leaflet-control-zoom a { background: rgba(20,30,20,0.85) !important; color: #fff !important; border-color: rgba(255,255,255,0.12) !important; }
        .leaflet-control-zoom a:hover { background: rgba(40,55,40,0.95) !important; }
        .map-pin:hover .map-pin-label { visibility: visible !important; z-index: 2; }
        .dest-scroll::-webkit-scrollbar { display: none; }
        .dest-row { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 12px; padding: 11px 16px; }
        .dest-row:hover { background: rgba(255,255,255,0.05) !important; }
        .mob-chips::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#FBF8F3" }}
          >
            {dict.map.sectionTitle}
          </h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: "rgba(251,248,243,0.6)" }}>
            {dict.map.sectionSubtitle}
          </p>
        </div>

        {/* Outer shell: stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">

          {/* Desktop sidebar — hidden on mobile */}
          <div
            className="hidden lg:flex flex-col w-[288px] shrink-0 overflow-hidden"
            style={{ background: "#141d33", borderRight: "1px solid rgba(255,255,255,0.07)", height: 560 }}
          >
            {selected ? (
              <div className="flex flex-col h-full overflow-hidden">
                <button
                  onClick={() => pick(selected)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    flexShrink: 0,
                    textAlign: "left",
                  }}
                >
                  {dict.map.allDestinations}
                </button>
                {/* The destination pages' own photos, resized. These were
                    Unsplash stock links until 2026-10-13: two had died (Ouzoud,
                    Chefchaouen) and Fes showed a café that is not in Fes. */}
                <div style={{ position: "relative", height: 140, overflow: "hidden", flexShrink: 0 }}>
                  <Image src={selected.image} alt={selected.name} fill sizes="360px" style={{ objectFit: "cover" }} />
                </div>
                <div className="dest-scroll overflow-y-auto flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.28) transparent" }}>
                  <DetailBody dest={selected} lang={lang} dict={dict} tours={tours[selected.id] ?? []} category={categoryText[selected.slug] ?? { pill: selected.category }} dark />
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                <div
                  style={{
                    padding: "10px 16px",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    // Raised from 0.28: at 10px on #141D33 that failed WCAG AA
                    // contrast (Lighthouse). 0.70 keeps it a quiet label while
                    // staying legible.
                    color: "rgba(255,255,255,0.70)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {dict.map.destinationsCount.replace("{count}", String(places.length))}
                </div>
                <div className="dest-scroll overflow-y-auto flex-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.28) transparent" }}>
                  {places.map((dest) => (
                    <button key={dest.id} className="dest-row" onClick={() => pick(dest)}>
                      <span
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: dest.color,
                          flexShrink: 0,
                          display: "block",
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                          {dest.name}
                        </div>
                        <div
                          style={{
                            // Raised from 0.36 — failed WCAG AA on this ground.
                            // Still visibly secondary to the white name above.
                            color: "rgba(255,255,255,0.72)",
                            fontSize: 11,
                            lineHeight: 1.3,
                            marginTop: 1,
                          }}
                        >
                          {dest.subtitle}
                        </div>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 18, flexShrink: 0, lineHeight: 1 }}>
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map canvas — on mobile use explicit height (flex-1 overrides height in flex-col); on desktop flex-1 fills the row */}
          <div className="relative h-[360px] lg:flex-1 lg:h-[560px]">
            <div ref={containerRef} className="absolute inset-0" />
          </div>
        </div>

        {/* Mobile: horizontal scrollable chips */}
        <div
          className="mob-chips lg:hidden flex overflow-x-auto gap-2 mt-4 pb-1 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {places.map((dest) => {
            const active = selected?.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => pick(dest)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1.5px solid ${active ? dest.color : "rgba(255,255,255,0.12)"}`,
                  background: active ? dest.color + "22" : "rgba(255,255,255,0.05)",
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.15s ease",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: dest.color,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {dest.name}
              </button>
            );
          })}
        </div>

        {/* Mobile: info card below chips */}
        {selected && (
          <div
            ref={mobileCardRef}
            className="lg:hidden mt-3 rounded-2xl overflow-hidden shadow-xl"
            style={{ background: "#fff" }}
          >
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", height: 160 }}>
                <Image src={selected.image} alt={selected.name} fill sizes="100vw" style={{ objectFit: "cover" }} />
              </div>
              <button
                onClick={() => pick(selected)}
                aria-label={dict.map.close}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.52)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
            <DetailBody dest={selected} lang={lang} dict={dict} tours={tours[selected.id] ?? []} category={categoryText[selected.slug] ?? { pill: selected.category }} />
          </div>
        )}
      </div>
    </section>
  );
}
