"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";

/**
 * Single-marker location map for a tour detail page. Deliberately a lighter
 * sibling of ToursMap: no sidebar, no selection state, one pin at the tour's
 * meetingPoint. Reuses the same ArcGIS satellite + labels tiles (already in the
 * CSP img-src) and the same teardrop div-icon so the two maps read as one system.
 */
export interface TourLocationMapProps {
  lat: number;
  lng: number;
  name: string;
  color?: string;
}

export default function TourLocationMapInner({
  lat,
  lng,
  name,
  color = "#C1693A",
}: TourLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 9,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        tileSize: 256,
        maxZoom: 18,
        attribution:
          "Tiles &copy; <a href='https://www.esri.com'>Esri</a> &mdash; Source: Esri, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP",
      }
    ).addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { tileSize: 256, maxZoom: 18 }
    ).addTo(map);

    const icon = L.divIcon({
      html: `<div style="position:relative;display:inline-block;">
        <svg width="34" height="44" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>
          <circle cx="14" cy="14" r="5.5" fill="white" fill-opacity="0.92"/>
        </svg>
        <span style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 2px);white-space:nowrap;font-size:11px;font-weight:700;color:#fff;background:rgba(0,0,0,0.68);border-radius:3px;padding:1px 8px;pointer-events:none;letter-spacing:0.01em;">${name}</span>
      </div>`,
      className: "",
      iconSize: [34, 64],
      iconAnchor: [17, 44],
    });

    L.marker([lat, lng], { icon }).addTo(map);
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, name, color]);

  return (
    <>
      <style>{`
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(0,0,0,0.55) !important; color: rgba(255,255,255,0.6) !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.7) !important; }
        .leaflet-control-zoom { border-radius: 8px !important; overflow: hidden; border: none !important; }
        .leaflet-control-zoom a { background: rgba(20,30,20,0.85) !important; color: #fff !important; border-color: rgba(255,255,255,0.12) !important; }
        .leaflet-control-zoom a:hover { background: rgba(40,55,40,0.95) !important; }
      `}</style>
      <div
        ref={containerRef}
        className="h-[340px] w-full rounded-[4px] overflow-hidden shadow-sm"
        aria-label={`Map showing ${name}`}
      />
    </>
  );
}
