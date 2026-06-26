"use client";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { TOURS } from "@/lib/tours";
import type { Locale } from "@/app/[lang]/dictionaries";

const CATEGORY_COLORS: Record<string, string> = {
  trekking:    "#4B5D3A",
  hiking:      "#6B7F4E",
  desert:      "#8B5E3C",
  cultural:    "#C1693A",
  "day-tours": "#5E7460",
  imperial:    "#7B5C40",
};

const CATEGORY_LABEL: Record<string, string> = {
  all:         "All Tours",
  trekking:    "Trekking",
  hiking:      "Hiking",
  desert:      "Desert",
  cultural:    "Cultural",
  "day-tours": "Day Tours",
  imperial:    "Imperial",
};

const FILTERS = ["all", "trekking", "hiking", "desert", "cultural", "day-tours", "imperial"] as const;

const iconCache: Partial<Record<string, L.DivIcon>> = {};
function getIcon(category: string): L.DivIcon {
  if (!iconCache[category]) {
    const color = CATEGORY_COLORS[category] ?? "#4B5D3A";
    iconCache[category] = L.divIcon({
      html: `<svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 23 15 23S30 25.5 30 15C30 6.716 23.284 0 15 0z"
          fill="${color}" stroke="white" stroke-width="2.5"
          filter="drop-shadow(0 2px 5px rgba(0,0,0,0.28))"/>
        <circle cx="15" cy="14" r="5" fill="white" opacity="0.95"/>
      </svg>`,
      iconSize:    [30, 38],
      iconAnchor:  [15, 38],
      popupAnchor: [0, -42],
      className:   "",
    });
  }
  return iconCache[category]!;
}

function FlyController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  const prev = useRef<string>("");
  useEffect(() => {
    if (!target) return;
    const key = target.join(",");
    if (key === prev.current) return;
    prev.current = key;
    map.flyTo(target, 9, { duration: 1.0, easeLinearity: 0.3 });
  }, [target, map]);
  return null;
}

export default function ToursMap({ lang }: { lang: Locale }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

  const visible =
    activeFilter === "all"
      ? TOURS
      : TOURS.filter((t) => t.category === activeFilter);

  const categoriesWithTours = Object.keys(CATEGORY_COLORS).filter((cat) =>
    TOURS.some((t) => t.category === cat)
  );

  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(180deg, #f5f1ea 0%, #faf9f6 60%, #fff 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Explore Morocco
          </p>
          <h2
            className="font-serif text-charcoal font-bold mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Where We Take You
          </h2>
          <p className="text-charcoal/50 text-sm max-w-md mx-auto mb-8">
            {visible.length} tour{visible.length !== 1 ? "s" : ""} across Morocco
            {activeFilter !== "all" ? ` · ${CATEGORY_LABEL[activeFilter]}` : ""}
            {" — "}click any pin to preview.
          </p>

          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => {
              const count =
                f === "all"
                  ? TOURS.length
                  : TOURS.filter((t) => t.category === f).length;
              if (f !== "all" && count === 0) return null;
              const active = activeFilter === f;
              const color = f === "all" ? "#4B5D3A" : (CATEGORY_COLORS[f] ?? "#4B5D3A");
              return (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setFlyTarget(null); }}
                  className="text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
                  style={
                    active
                      ? { background: color, color: "#fff", borderColor: color, boxShadow: `0 2px 12px ${color}50` }
                      : { background: "#fff", color: "#333", borderColor: "#D8C9AC" }
                  }
                >
                  {CATEGORY_LABEL[f]}
                  {f !== "all" && (
                    <span style={{ opacity: 0.6, marginLeft: 4 }}>({count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map container */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl border border-sand-dark/30"
          style={{ height: "clamp(380px, 48vw, 600px)" }}
        >
          <MapContainer
            center={[30.5, -7.0]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
              subdomains="abcd"
              maxZoom={19}
            />
            <FlyController target={flyTarget} />

            {visible.map((tour) => (
              <Marker
                key={tour.id}
                position={[tour.meetingPoint.lat, tour.meetingPoint.lng]}
                icon={getIcon(tour.category)}
                eventHandlers={{
                  click: () =>
                    setFlyTarget([tour.meetingPoint.lat, tour.meetingPoint.lng]),
                }}
              >
                <Popup className="atlas-popup" maxWidth={260} minWidth={252}>
                  <div className="atlas-popup-inner">
                    <div className="atlas-popup-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tour.heroImage} alt={tour.title} />
                    </div>
                    <div className="atlas-popup-body">
                      <span
                        className="atlas-popup-badge"
                        style={{
                          background:  (CATEGORY_COLORS[tour.category] ?? "#4B5D3A") + "1a",
                          color:       CATEGORY_COLORS[tour.category] ?? "#4B5D3A",
                          borderColor: (CATEGORY_COLORS[tour.category] ?? "#4B5D3A") + "44",
                        }}
                      >
                        {CATEGORY_LABEL[tour.category]}
                      </span>
                      <div className="atlas-popup-title">{tour.title}</div>
                      <div className="atlas-popup-meta">
                        <span className="atlas-popup-rating">★ {tour.rating}</span>
                        <span className="atlas-popup-review-count">({tour.reviewCount})</span>
                        <span className="atlas-popup-dot">·</span>
                        <span className="atlas-popup-duration">{tour.duration}</span>
                      </div>
                      <div className="atlas-popup-footer">
                        <span className="atlas-popup-price">
                          From <strong>${tour.price}</strong>
                        </span>
                        <a href={`/${lang}/tours/${tour.slug}`} className="atlas-popup-cta">
                          View tour →
                        </a>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 text-xs text-charcoal/45">
          {categoriesWithTours.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setFlyTarget(null); }}
              className="flex items-center gap-1.5 hover:text-charcoal transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: CATEGORY_COLORS[cat] }}
              />
              {CATEGORY_LABEL[cat]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
