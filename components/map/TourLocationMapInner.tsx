"use client";
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import {
  activeStops,
  hasTransferLeg,
  offRoadConnectors,
  routeLegs,
  splitGeometry,
} from "@/lib/route-legs";

/**
 * Tour map: either a single meeting-point pin, or — when `stops` are provided —
 * the numbered itinerary route, each stop pinned and connected in walking or
 * driving order.
 *
 * Renders with MapLibre GL (WebGL vector rendering) over Esri satellite imagery.
 * The imagery is deliberately kept from the previous Leaflet implementation: on
 * a trekking site the terrain itself is the useful content, and a flat vector
 * basemap would show a Toubkal route as empty beige. OpenFreeMap supplies the
 * vector place labels on top, which stay crisp at every zoom and rotate with
 * the map rather than being baked into the raster.
 *
 * OpenFreeMap publishes no raster-dem source, so there is no 3D terrain here —
 * pitch and rotation are enabled, but the relief you see is the satellite
 * imagery, not a height model.
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
  /**
   * Departure city ("marrakech" | "agadir"). Drives the transfer/active split:
   * the drive to and from the hub is transport, not the tour, and framing on it
   * rendered the Erg Chegaga dunes at 0.5% of the map. See lib/route-legs.ts.
   */
  origin?: string;
  /**
   * Translated map-key labels. Hardcoding English here would leak untranslated
   * copy onto all five locale tour pages — the exact defect
   * __tests__/lib/locale-english-leak.test.ts exists to prevent.
   */
  mapKey?: { tour: string; transfer: string; offRoad: string };
  /** Precomputed road-snapped route polyline ([lat,lng] pairs) for driving
   *  tours, built offline by scripts/build-tour-routes.mjs. When present the
   *  line follows real roads; when absent the stops are joined by straight
   *  segments (correct for off-road trekking, where there is no road to snap). */
  routeGeometry?: [number, number][];
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

/** Teardrop pin as a DOM element. MapLibre markers take an element, not HTML. */
function pinElement(color: string, label: string, wide: boolean, title: string) {
  const el = document.createElement("div");
  el.style.cssText = "position:relative;display:inline-block;cursor:pointer;";
  // A merged range ("2-3") needs a wider well than a single digit.
  const long = label.length > 1;
  const rx = long ? 11 : 6;
  const fontSize = long ? 8.5 : 9;
  el.innerHTML = `
    <svg width="34" height="44" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
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
        ? `<span style="position:absolute;left:50%;transform:translateX(-50%);top:46px;white-space:nowrap;font-size:11px;font-weight:700;color:#fff;background:rgba(0,0,0,0.68);border-radius:3px;padding:1px 8px;pointer-events:none;">${title}</span>`
        : ""
    }`;
  return el;
}

export default function TourLocationMapInner({
  lat,
  lng,
  name,
  color = "#C1693A",
  stops,
  routeGeometry,
  origin = "",
  mapKey,
}: TourLocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // The key is rendered from the same functions that draw the lines, so it can
  // never advertise a line style the map does not contain.
  const keyStops = Array.isArray(stops) ? mergeStopsAtSameLocation(stops) : [];
  const showTransferKey = keyStops.length >= 2 && hasTransferLeg(keyStops, origin);
  const showOffRoadKey =
    keyStops.length >= 2 &&
    Array.isArray(routeGeometry) &&
    routeGeometry.length >= 2 &&
    offRoadConnectors(routeGeometry, keyStops).length > 0;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Merge before deciding whether this is a route: a "4-day" itinerary whose
    // stops sit at two locations is a two-pin map, and the straight-line
    // fallback should be drawn between those two, not between four coincident
    // points.
    const merged = Array.isArray(stops) ? mergeStopsAtSameLocation(stops) : [];
    const hasRoute = merged.length >= 2;
    const points: RouteStop[] = hasRoute ? merged : [{ name, lat, lng }];

    const map = new maplibregl.Map({
      container: containerRef.current,
      center: [lng, lat],
      zoom: 8,
      attributionControl: false,
      // Wheel-zoom stays off so the page still scrolls past the map on a laptop.
      scrollZoom: false,
      style: {
        version: 8,
        glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            maxzoom: 18,
            attribution:
              "Tiles &copy; <a href='https://www.esri.com'>Esri</a> &mdash; Source: Esri, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP",
          },
          openmaptiles: {
            type: "vector",
            url: "https://tiles.openfreemap.org/planet",
            attribution:
              "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
          },
        },
        layers: [
          { id: "bg", type: "background", paint: { "background-color": "#1a1a17" } },
          { id: "satellite", type: "raster", source: "satellite" },
          // Vector place labels over the imagery. Esri's own label layer is
          // baked into raster tiles and blurs when zoomed between levels; these
          // stay sharp and can be styled to sit legibly on dark terrain.
          {
            id: "place-labels",
            type: "symbol",
            source: "openmaptiles",
            "source-layer": "place",
            filter: ["in", ["get", "class"], ["literal", ["city", "town", "village"]]],
            layout: {
              "text-field": ["coalesce", ["get", "name:latin"], ["get", "name"]],
              "text-font": ["Noto Sans Regular"],
              "text-size": ["interpolate", ["linear"], ["zoom"], 6, 10, 12, 14],
              "text-anchor": "top",
              "text-offset": [0, 0.4],
            },
            paint: {
              "text-color": "#ffffff",
              "text-halo-color": "rgba(0,0,0,0.85)",
              "text-halo-width": 1.4,
            },
          },
        ],
      },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-left");
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    // Fit BEFORE the style loads. fitBounds only needs the viewport, not the
    // style, and keeping it out of the load handler means a cached style that
    // resolves before the listener attaches cannot leave the map sitting at the
    // default zoom-8 country view — which is exactly what it did.
    // FRAME ON THE EXPERIENCE, NOT ON THE DRIVE TO IT.
    //
    // This used to extend the bounds over every stop AND the full road
    // geometry, which meant the 218 km transfer from Marrakech decided the
    // zoom. Measured across the catalogue, that rendered the actual tour at
    // 0.5% of the frame on erg-chegaga-3day-marrakech, 2.7% on
    // agadir-to-chefchaouen-5day and under 10% on four more.
    //
    // The transfer is still drawn and still reachable by zooming out — it just
    // no longer dictates the view. activeStops falls back to every stop when a
    // tour is all-transfer (the city-to-city cultural trips, where the drive is
    // the product), so those frame exactly as they did before.
    if (hasRoute) {
      const framed = activeStops(points, origin);
      const bounds = new maplibregl.LngLatBounds();
      for (const p of framed) bounds.extend([p.lng, p.lat]);

      // Include road geometry only where it belongs to a framed leg, so a
      // transfer's road does not drag the bounds back out to the hub.
      if (Array.isArray(routeGeometry)) {
        const runs = splitGeometry(routeGeometry, points, origin);
        if (runs.length) {
          for (const run of runs) {
            if (run.transfer) continue;
            // splitGeometry returns slices of routeGeometry, which is stored
            // [lat, lng] — NOT [lng, lat]. Reading it the other way round put
            // the bounds off the coast of west Africa and framed the whole
            // continent. LngLatBounds.extend takes [lng, lat].
            for (const [la, ln] of run.coords) bounds.extend([ln, la]);
          }
        } else {
          for (const [la, ln] of routeGeometry) bounds.extend([ln, la]);
        }
      }
      map.fitBounds(bounds, { padding: 42, maxZoom: 13, duration: 0 });
    }

    // Route line. Prefer the precomputed road-snapped geometry (driving tours)
    // so the line follows the actual roads through the passes and valleys;
    // otherwise join the stops directly, which is the honest shape for an
    // off-road mountain trek. A road route is drawn solid (it IS the road);
    // the straight fallback is dashed to read as "direct line, not a road".
    const drawRoute = () => {
      if (!hasRoute) return;
      // addSource throws if the style is not ready or the id already exists.
      // Both are recoverable and neither should take the whole map down, but a
      // silent catch is how this went unnoticed the first time — so it logs.
      if (map.getSource("route")) return;
      try {
        const road = Array.isArray(routeGeometry) && routeGeometry.length >= 2;

        // THREE KINDS OF GROUND, DRAWN DIFFERENTLY.
        //
        // It was all one cream line, which is why these maps did not read as
        // tours. A customer needs to tell apart:
        //
        //   TRANSFER  the minibus to and from the hub city. Drawing a 218 km
        //             drive exactly like a camel trek was actively misleading.
        //   ACTIVE    the tour itself — the reason for the trip.
        //   OFF-ROAD  where the tarmac ends. Erg Chegaga has no road; OSRM
        //             stops 17.6 km short and the pin sat in blank sand with
        //             nothing joining it. Dashes say "4x4 and camel from here"
        //             rather than leaving it looking like a broken map.
        const features: GeoJSON.Feature[] = [];

        const runs = road ? splitGeometry(routeGeometry!, points, origin) : [];
        if (runs.length) {
          for (const run of runs) {
            features.push({
              type: "Feature",
              properties: { transfer: run.transfer, offroad: false },
              geometry: {
                type: "LineString",
                coordinates: run.coords.map(([la, ln]) => [ln, la]),
              },
            });
          }
        } else {
          // No usable split: fall back to the previous whole-line behaviour,
          // marking hub legs from the stops where we can.
          const legs = routeLegs(points, origin);
          if (road) {
            features.push({
              type: "Feature",
              properties: { transfer: false, offroad: false },
              geometry: {
                type: "LineString",
                coordinates: routeGeometry!.map(([la, ln]) => [ln, la]),
              },
            });
          } else {
            for (const leg of legs) {
              features.push({
                type: "Feature",
                properties: { transfer: leg.transfer, offroad: false },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [leg.from.lng, leg.from.lat],
                    [leg.to.lng, leg.to.lat],
                  ],
                },
              });
            }
          }
        }

        if (road) {
          for (const c of offRoadConnectors(routeGeometry!, points)) {
            features.push({
              type: "Feature",
              properties: { transfer: false, offroad: true },
              geometry: { type: "LineString", coordinates: c.coords },
            });
          }
        }

        map.addSource("route", {
          type: "geojson",
          data: { type: "FeatureCollection", features },
        });

        // Transfers first so the active line always draws on top where they
        // share ground.
        map.addLayer({
          id: "route-transfer",
          type: "line",
          source: "route",
          filter: ["==", ["get", "transfer"], true],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#B9B2A6",
            "line-width": 2.5,
            "line-opacity": 0.75,
            "line-dasharray": [2, 2.5],
          },
        });

        map.addLayer({
          id: "route-offroad",
          type: "line",
          source: "route",
          filter: ["==", ["get", "offroad"], true],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#FBF3E4",
            "line-width": 2.5,
            "line-opacity": 0.9,
            "line-dasharray": [1, 2],
          },
        });

        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          filter: [
            "all",
            ["==", ["get", "transfer"], false],
            ["==", ["get", "offroad"], false],
          ],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#FBF3E4",
            "line-width": road ? 3.5 : 3,
            "line-opacity": 0.95,
            ...(road ? {} : { "line-dasharray": [1, 2.5] as [number, number] }),
          },
        });
      } catch (err) {
        console.error("[tour map] route layer failed", err);
      }
    };

    // Three ways in, because only one of them fires reliably. `load` does not
    // fire for a style object that is already parsed, isStyleLoaded() can still
    // be false at this point, and `styledata` fires on every style mutation —
    // between them the route always gets drawn exactly once (drawRoute is
    // idempotent via the getSource guard above).
    map.on("load", drawRoute);
    map.on("styledata", drawRoute);
    if (map.isStyleLoaded()) drawRoute();

    // Markers can be added before load; MapLibre positions them on first render.
    points.forEach((p, i) => {
      const label = hasRoute ? stopLabel(p) || String(i + 1) : "";
      const dayText = label.includes("-") ? `Days ${label}` : `Day ${label}`;
      const title = hasRoute ? `${dayText}: ${p.name}` : p.name;

      new maplibregl.Marker({
        element: pinElement(color, label, !hasRoute, hasRoute ? p.name : name),
        anchor: "bottom",
      })
        .setLngLat([p.lng, p.lat])
        .setPopup(
          new maplibregl.Popup({ closeButton: false, offset: 26 }).setHTML(
            `<strong>${hasRoute ? `${dayText} · ` : ""}${p.name}</strong>`
          )
        )
        .addTo(map);

      // The marker element carries the accessible name; without it a screen
      // reader announces a bare digit with no indication of what it marks.
      const el = document.querySelector<HTMLElement>(`[aria-label="${title}"]`);
      if (el) el.setAttribute("role", "img");
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, name, color, stops, routeGeometry]);

  return (
    <>
      <style>{`
        .maplibregl-ctrl-attrib { font-size: 9px !important; background: rgba(0,0,0,0.55) !important; }
        .maplibregl-ctrl-attrib a { color: rgba(255,255,255,0.7) !important; }
        .maplibregl-ctrl-attrib.maplibregl-compact { background: rgba(0,0,0,0.55) !important; }
        .maplibregl-ctrl-group { border-radius: 8px !important; overflow: hidden; border: none !important; background: rgba(20,30,20,0.85) !important; }
        .maplibregl-ctrl-group button { background: transparent !important; }
        .maplibregl-ctrl-group button + button { border-top: 1px solid rgba(255,255,255,0.12) !important; }
        .maplibregl-ctrl-group button .maplibregl-ctrl-icon { filter: invert(1); }
        .maplibregl-ctrl-group button:hover { background: rgba(40,55,40,0.95) !important; }
        .maplibregl-popup-content { border-radius: 6px !important; margin: 0 !important; padding: 8px 12px !important; font-size: 12px !important; }
      `}</style>
      {/* `isolate` is load-bearing, not decorative. MapLibre's own stylesheet
          puts its controls at z-index 800 and the zoom bar at 1000, while the
          site header is z-50 (components/layout/Header.tsx:116). Without a
          stacking context here the zoom buttons paint straight over the sticky
          nav as soon as the map scrolls under it. `isolate` makes every
          MapLibre z-index resolve INSIDE this wrapper, so the whole map sits
          below the header as one unit — one class, rather than re-numbering
          the library's layers. */}
      <div className="isolate">
        <div
          ref={containerRef}
          className="h-[340px] w-full rounded-[4px] overflow-hidden shadow-sm"
          aria-label={stops && stops.length >= 2 ? `Route map for ${name}` : `Map showing ${name}`}
        />

        {(showTransferKey || showOffRoadKey) && (
          <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-ink-soft">
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-0 w-6 shrink-0 border-t-[3px] border-[#C9BFAE]" />
              {mapKey?.tour ?? "Your tour"}
            </li>
            {showTransferKey && (
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-0 w-6 shrink-0 border-t-[2px] border-dashed border-[#B9B2A6]" />
                {mapKey?.transfer ?? "Transfer by road"}
              </li>
            )}
            {showOffRoadKey && (
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-0 w-6 shrink-0 border-t-[2px] border-dotted border-[#C9BFAE]" />
                {mapKey?.offRoad ?? "Off-road by 4x4 or camel"}
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
