"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { TOURS } from "@/lib/tours";
import type { Locale } from "@/app/[lang]/dictionaries";

// Fix leaflet default icon in Next.js
const icon = L.divIcon({
  html: `<div style="width:36px;height:36px;background:#E07B39;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  className: "",
});

export default function ToursMap({ lang }: { lang: Locale }) {
  useEffect(() => {
    // Ensure leaflet CSS loads client-side
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sunset text-sm font-semibold uppercase tracking-widest">
            Find Your Destination
          </span>
          <h2 className="font-serif text-charcoal text-4xl lg:text-5xl font-bold mt-2">
            Where We Take You
          </h2>
          <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
            Click any pin to explore a tour.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-lg" style={{ height: 480 }}>
          <MapContainer
            center={[31.0, -7.0]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={19}
            />
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution=""
              maxZoom={19}
            />
            {TOURS.map((tour) => (
              <Marker
                key={tour.id}
                position={[tour.meetingPoint.lat, tour.meetingPoint.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="text-sm min-w-[160px]">
                    <p className="font-bold text-base mb-1">{tour.title}</p>
                    <p className="text-gray-500 mb-2">{tour.meetingPoint.name}</p>
                    <p className="text-gray-700 mb-3">{tour.duration} · From ${tour.price}</p>
                    <Link
                      href={`/${lang}/tours/${tour.slug}`}
                      className="inline-block px-3 py-1.5 rounded-full bg-forest text-white text-xs font-semibold hover:bg-moss transition-colors"
                    >
                      View Tour
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
