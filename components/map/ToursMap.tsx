"use client";
import { useState, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import type { Locale } from "@/app/[lang]/dictionaries";

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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1548018560-c7cce1871f4e?w=500&q=80",
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
    name: "Agadir",
    subtitle: "Atlantic Coast & Surf",
    lat: 30.4278,
    lng: -9.5981,
    color: "#5E7460",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1569531736081-7fc92bbd2462?w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1597535973773-88ee12bb0046?w=500&q=80",
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
];

const INITIAL_CENTER: [number, number] = [-6.5, 31.8];
const INITIAL_ZOOM = 5.5;

function makePinEl(dest: Destination): HTMLDivElement {
  const el = document.createElement("div");
  el.dataset.id = dest.id;
  el.style.cssText = "cursor:pointer;transition:transform 0.2s ease;position:relative;";
  el.innerHTML = `
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${dest.color}"/>
      <circle cx="14" cy="14" r="5.5" fill="white" fill-opacity="0.92"/>
    </svg>
    <span style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 2px);white-space:nowrap;font-size:10px;font-weight:700;color:#fff;background:rgba(0,0,0,0.68);border-radius:3px;padding:1px 7px;pointer-events:none;letter-spacing:0.01em;">${dest.name}</span>
  `;
  return el;
}

function DetailBody({ dest, lang }: { dest: Destination; lang: Locale }) {
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
        {dest.category}
      </span>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#181818", margin: "0 0 2px", lineHeight: 1.2 }}>
        {dest.name}
      </h3>
      <p style={{ fontSize: 12, color: "#999", margin: "0 0 8px" }}>{dest.subtitle}</p>
      <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.58, margin: "0 0 12px" }}>{dest.description}</p>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#aaa",
          margin: "0 0 6px",
        }}
      >
        Known for
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
        {dest.known.map((item, i) => (
          <li
            key={i}
            style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: "#444", lineHeight: 1.45 }}
          >
            <span style={{ color: dest.color, flexShrink: 0, fontSize: 9, marginTop: 2 }}>&#9658;</span>
            {item}
          </li>
        ))}
      </ul>
      <a
        href={`/${lang}/destinations/${dest.destSlug}`}
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
        Browse {dest.category} tours &rarr;
      </a>
    </div>
  );
}

export default function ToursMap({ lang }: { lang: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const pinEls = useRef<Record<string, HTMLDivElement>>({});
  const [selected, setSelected] = useState<Destination | null>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          carto: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
              "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
              "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors © <a href='https://carto.com/attributions'>CARTO</a>",
          },
        },
        layers: [
          { id: "carto", type: "raster", source: "carto" },
        ],
      },
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      attributionControl: false,
    });

    map.scrollZoom.disable();
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

    DESTINATIONS.forEach((dest) => {
      const el = makePinEl(dest);
      pinEls.current[dest.id] = el;

      el.addEventListener("click", () => {
        setSelected((prev) => {
          const next = prev?.id === dest.id ? null : dest;
          if (next) {
            map.flyTo({
              center: [dest.lng, dest.lat],
              zoom: 10,
              duration: 1400,
              easing: (t) => 1 - Math.pow(1 - t, 3),
            });
          } else {
            map.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM, duration: 1200 });
          }
          return next;
        });
      });

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([dest.lng, dest.lat])
        .addTo(map);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Scale active pin up
  useEffect(() => {
    Object.entries(pinEls.current).forEach(([id, el]) => {
      const active = selected?.id === id;
      el.style.transform = active ? "scale(1.35)" : "scale(1)";
      el.style.zIndex = active ? "10" : "1";
    });
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
      mapRef.current?.flyTo({
        center: [dest.lng, dest.lat],
        zoom: 10,
        duration: 1400,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      mapRef.current?.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM, duration: 1200 });
    }
  };

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg,#0D150D 0%,#111711 100%)" }}
    >
      <style>{`
        .maplibregl-ctrl-attrib { font-size: 9px !important; }
        .maplibregl-ctrl-group { border-radius: 8px !important; overflow: hidden; }
        .dest-scroll::-webkit-scrollbar { display: none; }
        .dest-row { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; text-align: left; cursor: pointer; display: flex; align-items: center; gap: 12px; padding: 11px 16px; }
        .dest-row:hover { background: rgba(255,255,255,0.05) !important; }
        .mob-chips::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="font-serif text-white font-bold mb-3"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Where the Adventures Happen
          </h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">
            Select a destination to explore what it has to offer.
          </p>
        </div>

        {/* Outer shell: stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">

          {/* Desktop sidebar — hidden on mobile */}
          <div
            className="hidden lg:flex flex-col w-[288px] shrink-0 overflow-hidden"
            style={{ background: "#08100a", borderRight: "1px solid rgba(255,255,255,0.07)", height: 560 }}
          >
            {selected ? (
              /* Detail view */
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
                    color: "rgba(255,255,255,0.45)",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    flexShrink: 0,
                    textAlign: "left",
                  }}
                >
                  &larr; All destinations
                </button>
                <div style={{ height: 140, overflow: "hidden", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.image}
                    alt={selected.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div className="dest-scroll overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
                  <DetailBody dest={selected} lang={lang} />
                </div>
              </div>
            ) : (
              /* List view */
              <div className="flex flex-col h-full overflow-hidden">
                <div
                  style={{
                    padding: "10px 16px",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.28)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {DESTINATIONS.length} Destinations
                </div>
                <div className="dest-scroll overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
                  {DESTINATIONS.map((dest) => (
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
                            color: "rgba(255,255,255,0.36)",
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

          {/* Map canvas — single ref, responsive height */}
          <div className="relative flex-1 h-[360px] lg:h-[560px]">
            <div ref={containerRef} className="absolute inset-0" />
          </div>
        </div>

        {/* Mobile: horizontal scrollable chips */}
        <div
          className="mob-chips lg:hidden flex overflow-x-auto gap-2 mt-4 pb-1 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {DESTINATIONS.map((dest) => {
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt={selected.name}
                style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
              />
              <button
                onClick={() => pick(selected)}
                aria-label="Close"
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
            <DetailBody dest={selected} lang={lang} />
          </div>
        )}
      </div>
    </section>
  );
}
