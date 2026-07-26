"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";

/**
 * Tour map: either a single meeting-point pin, or — when `stops` are provided —
 * the numbered itinerary route, each stop pinned and connected by a dashed line
 * in walking/driving order. Reuses ToursMap's ArcGIS satellite + labels tiles
 * (already in the CSP img-src) and the same teardrop icon family so the two maps
 * read as one system.
 */
export interface RouteStop {
  name: string;
  lat: number;
  lng: number;
  /** 1-based order label shown in the pin; omitted for a plain single marker. */
  day?: number;
}

export interface TourLocationMapProps {
  lat: number;
  lng: number;
  name: string;
  color?: string;
  /** Ordered itinerary stops. When 2+, the map plots the numbered route. */
  stops?: RouteStop[];
  /** Precomputed road-snapped route polyline ([lat,lng] pairs) for driving
   *  tours, built offline by scripts/build-tour-routes.mjs. When present the
   *  line follows real roads; when absent the stops are joined by straight
   *  segments (correct for off-road trekking, where there is no road to snap). */
  routeGeometry?: [number, number][];
}

function pinIcon(color: string, label: string, wide = false) {
  const w = 34;
  const h = 44;
  return L.divIcon({
    html: `<div style="position:relative;display:inline-block;">
      <svg width="${w}" height="${h}" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>
        <circle cx="14" cy="14" r="6" fill="white" fill-opacity="0.95"/>
        <text x="14" y="18" text-anchor="middle" font-size="9" font-weight="700" fill="${color}" font-family="system-ui,sans-serif">${label}</text>
      </svg>
      ${
        wide
          ? `<span style="position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 2px);white-space:nowrap;font-size:11px;font-weight:700;color:#fff;background:rgba(0,0,0,0.68);border-radius:3px;padding:1px 8px;pointer-events:none;">${label}</span>`
          : ""
      }
    </div>`,
    className: "",
    iconSize: [w, wide ? 64 : h],
    iconAnchor: [w / 2, h],
  });
}

export default function TourLocationMapInner({
  lat,
  lng,
  name,
  color = "#C1693A",
  stops,
  routeGeometry,
}: TourLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const hasRoute = Array.isArray(stops) && stops.length >= 2;
    const points: RouteStop[] = hasRoute ? stops! : [{ name, lat, lng }];

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

    // Route line. Prefer the precomputed road-snapped geometry (driving tours)
    // so the line follows the actual roads through the passes and valleys;
    // otherwise join the stops directly, which is the honest shape for an
    // off-road mountain trek. A road route is drawn solid (it IS the road); the
    // straight fallback stays dashed to read as "direct line, not a road".
    if (hasRoute) {
      const road = Array.isArray(routeGeometry) && routeGeometry.length >= 2;
      const latlngs = road
        ? routeGeometry!
        : points.map((p) => [p.lat, p.lng] as [number, number]);
      L.polyline(latlngs, {
        color: "#FBF3E4",
        weight: road ? 3.5 : 3,
        opacity: 0.95,
        dashArray: road ? undefined : "2 8",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    }

    // Markers
    points.forEach((p, i) => {
      const label = hasRoute ? String(p.day ?? i + 1) : "";
      const marker = L.marker([p.lat, p.lng], {
        icon: hasRoute ? pinIcon(color, label) : pinIcon(color, "", true),
      }).addTo(map);
      marker.bindPopup(
        `<strong>${hasRoute ? `Day ${p.day ?? i + 1} · ` : ""}${p.name}</strong>`,
        { closeButton: false }
      );
      if (!hasRoute) {
        // keep the single-marker's name label visible without a click
        marker.setIcon(pinIcon(color, "", true));
        marker.bindTooltip(name, { permanent: false });
      }
    });

    // Fit the route/point into view. Include the road geometry's own extent so
    // a route that loops out past its stops (a road detour, a gorge) stays fully
    // in frame rather than being clipped to the straight stop-to-stop bounds.
    if (hasRoute) {
      const pts: [number, number][] = points.map((p) => [p.lat, p.lng]);
      if (Array.isArray(routeGeometry) && routeGeometry.length >= 2) pts.push(...routeGeometry);
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 11 });
    }

    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, name, color, stops, routeGeometry]);

  return (
    <>
      <style>{`
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(0,0,0,0.55) !important; color: rgba(255,255,255,0.6) !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.7) !important; }
        .leaflet-control-zoom { border-radius: 8px !important; overflow: hidden; border: none !important; }
        .leaflet-control-zoom a { background: rgba(20,30,20,0.85) !important; color: #fff !important; border-color: rgba(255,255,255,0.12) !important; }
        .leaflet-control-zoom a:hover { background: rgba(40,55,40,0.95) !important; }
        .leaflet-popup-content-wrapper { border-radius: 6px !important; }
        .leaflet-popup-content { margin: 8px 12px !important; font-size: 12px !important; }
      `}</style>
      <div
        ref={containerRef}
        className="h-[340px] w-full rounded-[4px] overflow-hidden shadow-sm"
        aria-label={stops && stops.length >= 2 ? `Route map for ${name}` : `Map showing ${name}`}
      />
    </>
  );
}
