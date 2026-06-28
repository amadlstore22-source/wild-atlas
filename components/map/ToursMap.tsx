"use client";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import type { Locale } from "@/app/[lang]/dictionaries";

// ─── Destination data ─────────────────────────────────────────────────────────
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
      "Morocco's most electric city — a thousand-year-old labyrinth of souks, palaces, and street theatre in the shadow of the Atlas Mountains.",
    known: [
      "Djemaa el-Fna — the world's greatest open-air theatre",
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
      "The definitive High Atlas challenge — ascend through Berber villages and glacial valleys to the highest summit in all of North Africa at 4,167 m.",
    known: [
      "Highest peak in North Africa at 4,167 m",
      "Imlil valley & Berber mountain villages",
      "Alpine refuges & pristine glacial lakes",
      "Year-round trekking — snow in winter",
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
      "Quad biking & 4×4 desert excursions",
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
      "The most intact medieval city on earth — 9,000+ alleyways, the world's oldest university, and the legendary Chouara Tannery unchanged since the 11th century.",
    known: [
      "World's largest car-free urban zone",
      "Chouara Tannery — operated since the 11th century",
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
      "Nestled in the Rif Mountains, every wall in Chefchaouen's medina is washed in blue — serene, photogenic, and unlike anywhere else in Morocco.",
    known: [
      "Medina painted entirely in blue & white",
      "Rif Mountain setting with hiking trails",
      "Ras el-Ma river walk & waterfall",
      "Artisan wool weaving & café culture",
      "Photography paradise — every alley is a frame",
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
      "Morocco's southern beach hub — 9 km of white Atlantic sand, world-class surf breaks at Taghazout, and the Anti-Atlas mountains rising behind the city.",
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
      "A triple cascade plunging 110 m into a turquoise pool — wild Barbary macaques, rainbow mist, and some of Morocco's most breathtaking gorge scenery.",
    known: [
      "110 m waterfall — most spectacular in Morocco",
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

// ─── Custom pin icon ──────────────────────────────────────────────────────────
const iconCache: Record<string, L.DivIcon> = {};
function makeIcon(color: string): L.DivIcon {
  if (!iconCache[color]) {
    iconCache[color] = L.divIcon({
      html: `<div style="
        width:16px;height:16px;border-radius:50%;
        background:${color};border:2.5px solid white;
        box-shadow:0 2px 10px rgba(0,0,0,0.55),0 0 0 4px ${color}55;
        cursor:pointer;
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      className: "",
    });
  }
  return iconCache[color]!;
}

// ─── Fly-to controller ────────────────────────────────────────────────────────
function FlyController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  const prev = useRef<string>("");
  useEffect(() => {
    if (!target) {
      prev.current = "";
      map.flyTo([29.5, -6.0], 5, { duration: 1.2, easeLinearity: 0.25 });
      return;
    }
    const key = target.join(",");
    if (key === prev.current) return;
    prev.current = key;
    map.flyTo(target, 11, { duration: 1.4, easeLinearity: 0.22 });
  }, [target, map]);
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ToursMap({ lang }: { lang: Locale }) {
  const [selected, setSelected] = useState<Destination | null>(null);

  const pick = (dest: Destination) =>
    setSelected((prev) => (prev?.id === dest.id ? null : dest));

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg,#0D150D 0%,#111711 100%)" }}
    >
      {/* Tooltip label styles */}
      <style>{`
        .leaflet-tooltip.dest-lbl {
          background: rgba(0,0,0,0.75);
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          letter-spacing: 0.01em;
        }
        .leaflet-tooltip.dest-lbl::before {
          border-right-color: rgba(0,0,0,0.75);
        }
        .dest-panel::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#D4A853" }}
          >
            Discover Morocco
          </p>
          <h2
            className="font-serif text-white font-bold mb-3"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Where the Adventures Happen
          </h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">
            Satellite view — tap any pin to explore what each destination is
            known for.
          </p>
        </div>

        {/* Map */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ height: "clamp(480px, 58vw, 660px)" }}
        >
          <MapContainer
            center={[31.8, -6.5]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl
          >
            {/* Esri satellite tiles — free, no API key */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong)"
              maxZoom={18}
            />
            <FlyController
              target={selected ? [selected.lat, selected.lng] : null}
            />

            {DESTINATIONS.map((dest) => (
              <Marker
                key={dest.id}
                position={[dest.lat, dest.lng]}
                icon={makeIcon(dest.color)}
                eventHandlers={{ click: () => pick(dest) }}
              >
                <Tooltip
                  permanent
                  direction="right"
                  offset={[10, 0]}
                  className="dest-lbl"
                >
                  {dest.name}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>

          {/* ── Info panel overlay ── */}
          {selected && (
            <div
              className="dest-panel"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: "min(316px, calc(100% - 24px))",
                maxHeight: "calc(100% - 24px)",
                overflowY: "auto",
                zIndex: 1001,
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                scrollbarWidth: "none",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close panel"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 2,
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
                ×
              </button>

              {/* Hero image */}
              <div
                style={{
                  height: 158,
                  overflow: "hidden",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.image}
                  alt={selected.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: "14px 18px 20px" }}>
                {/* Category badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: selected.color + "18",
                    color: selected.color,
                    border: `1px solid ${selected.color}44`,
                    borderRadius: 999,
                    padding: "2px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  {selected.category}
                </span>

                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#181818",
                    margin: "0 0 2px",
                    fontFamily: "var(--font-cormorant, Georgia, serif)",
                    lineHeight: 1.2,
                  }}
                >
                  {selected.name}
                </h3>
                <p style={{ fontSize: 12, color: "#999", margin: "0 0 9px" }}>
                  {selected.subtitle}
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "#555",
                    lineHeight: 1.58,
                    margin: "0 0 13px",
                  }}
                >
                  {selected.description}
                </p>

                {/* Known for */}
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#aaa",
                    margin: "0 0 7px",
                  }}
                >
                  Known for
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {selected.known.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 7,
                        fontSize: 12,
                        color: "#444",
                        lineHeight: 1.45,
                      }}
                    >
                      <span
                        style={{
                          color: selected.color,
                          flexShrink: 0,
                          fontSize: 9,
                          marginTop: 2,
                        }}
                      >
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`/${lang}/destinations/${selected.destSlug}`}
                  style={{
                    display: "block",
                    marginTop: 15,
                    padding: "10px 0",
                    background: selected.color,
                    color: "#fff",
                    borderRadius: 10,
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  Browse {selected.category} tours →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── Destination chips ── */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
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
                  padding: "5px 14px",
                  borderRadius: 999,
                  border: `1.5px solid ${
                    active ? dest.color : "rgba(255,255,255,0.12)"
                  }`,
                  background: active
                    ? dest.color + "22"
                    : "rgba(255,255,255,0.05)",
                  color: active ? "#fff" : "rgba(255,255,255,0.48)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
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
                  }}
                />
                {dest.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
