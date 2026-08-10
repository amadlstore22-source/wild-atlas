"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
// Imported here rather than the root layout — see the note in ToursMap.tsx.
import "leaflet/dist/leaflet.css";

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
  /** Last day of a multi-night stay, set by mergeStopsAtSameLocation so one pin
   *  can read "2-3". Equal to `day` for a single-night stop. */
  dayEnd?: number;
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
  // A merged range ("2-3") needs a wider well than a single digit, and the
  // glyphs must shrink to fit inside it. Sized so three characters clear the
  // circle edge at the same visual weight a lone digit has.
  const long = label.length > 1;
  const rx = long ? 11 : 6;
  const fontSize = long ? 8.5 : 9;
  return L.divIcon({
    html: `<div style="position:relative;display:inline-block;">
      <svg width="${w}" height="${h}" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>
        ${
          long
            ? `<rect x="${14 - rx}" y="8" width="${rx * 2}" height="12" rx="6" fill="white" fill-opacity="0.95"/>`
            : `<circle cx="14" cy="14" r="${rx}" fill="white" fill-opacity="0.95"/>`
        }
        <text x="14" y="${long ? 17.5 : 18}" text-anchor="middle" font-size="${fontSize}" font-weight="700" fill="${color}" font-family="system-ui,sans-serif">${label}</text>
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

/**
 * Collapse stops that share a coordinate into a single pin.
 *
 * A multi-night stay repeats the same lat/lng for each night, so the map drew
 * one marker exactly on top of another: `marrakech-to-chefchaouen-4day` has
 * four stops at two locations and rendered as two pins with no indication that
 * either covers two days. Merging is also the more truthful label — you really
 * do spend days 2-3 in Fes, and "2-3" says so where a hidden duplicate did not.
 *
 * Grouped by rounded coordinate rather than exact equality: the same place is
 * sometimes entered at slightly different precision across itinerary entries.
 * ~50 m is far tighter than any two genuine stops on these routes.
 */
export function mergeStopsAtSameLocation(stops: RouteStop[]): RouteStop[] {
  const out: RouteStop[] = [];
  const indexByKey = new Map<string, number>();

  stops.forEach((s, i) => {
    const key = `${s.lat.toFixed(3)},${s.lng.toFixed(3)}`;
    const existing = indexByKey.get(key);
    if (existing === undefined) {
      indexByKey.set(key, out.length);
      out.push({ ...s, day: s.day ?? i + 1, dayEnd: s.day ?? i + 1 });
      return;
    }
    // Extend the run. Days on one route are ascending, so the later stop is
    // always the end of the range.
    out[existing].dayEnd = s.day ?? i + 1;
  });

  return out;
}

/** "3" for a single day, "2-3" for a stay spanning several. */
export function stopLabel(stop: RouteStop): string {
  const start = stop.day;
  const end = stop.dayEnd;
  if (start === undefined) return "";
  if (end === undefined || end === start) return String(start);
  return `${start}-${end}`;
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

    // Merge before deciding whether this is a route: a "4-day" itinerary whose
    // stops sit at two locations is a two-pin map, and the straight-line
    // fallback should be drawn between those two, not between four coincident
    // points.
    const merged = Array.isArray(stops) ? mergeStopsAtSameLocation(stops) : [];
    const hasRoute = merged.length >= 2;
    const points: RouteStop[] = hasRoute ? merged : [{ name, lat, lng }];

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
      const label = hasRoute ? stopLabel(p) || String(i + 1) : "";
      // "Day 2-3" reads correctly for a merged stay; "Day 2" for a single night.
      const dayText = label.includes("-") ? `Days ${label}` : `Day ${label}`;
      // `alt` becomes the marker's accessible name. Without it Leaflet renders
      // role="button" with only a digit inside, so a screen reader announces
      // "1, button" with no indication of what it marks. Lighthouse flags this
      // under "ARIA commands must have an accessible name".
      const marker = L.marker([p.lat, p.lng], {
        icon: hasRoute ? pinIcon(color, label) : pinIcon(color, "", true),
        alt: hasRoute ? `${dayText}: ${p.name}` : p.name,
      }).addTo(map);
      marker.bindPopup(
        `<strong>${hasRoute ? `${dayText} · ` : ""}${p.name}</strong>`,
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
      // maxZoom 11 was capping compact treks that could comfortably show real
      // terrain, while doing nothing for the long desert routes (Agadir to
      // Merzouga spans ~534 km and is bounds-limited far below any cap). Raising
      // it lets a tight route zoom in properly; the long ones are unaffected
      // because their own extent, not the cap, decides the zoom.
      map.fitBounds(L.latLngBounds(pts), { padding: [28, 28], maxZoom: 13 });
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
