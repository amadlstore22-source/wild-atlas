import { describe, expect, it } from "vitest";
import {
  mergeStopsAtSameLocation,
  stopLabel,
  type RouteStop,
} from "@/components/map/TourLocationMapInner";

describe("mergeStopsAtSameLocation", () => {
  it("collapses a real multi-night stay into one pin", () => {
    // marrakech-to-chefchaouen-4day: four itinerary stops at two locations.
    // Before the merge this drew four markers, two of which were completely
    // hidden underneath the other two.
    const stops: RouteStop[] = [
      { name: "Fes", lat: 34.033, lng: -5, day: 1 },
      { name: "Fes", lat: 34.033, lng: -5, day: 2 },
      { name: "Chefchaouen", lat: 35.169, lng: -5.263, day: 3 },
      { name: "Chefchaouen", lat: 35.169, lng: -5.263, day: 4 },
    ];
    const merged = mergeStopsAtSameLocation(stops);

    expect(merged).toHaveLength(2);
    expect(stopLabel(merged[0])).toBe("1-2");
    expect(stopLabel(merged[1])).toBe("3-4");
  });

  it("leaves a route with distinct stops untouched", () => {
    const stops: RouteStop[] = [
      { name: "Imlil", lat: 31.1369, lng: -7.9169, day: 1 },
      { name: "Refuge", lat: 31.0782, lng: -7.9192, day: 2 },
      { name: "Summit", lat: 31.0606, lng: -7.9153, day: 3 },
    ];
    const merged = mergeStopsAtSameLocation(stops);

    expect(merged).toHaveLength(3);
    expect(merged.map(stopLabel)).toEqual(["1", "2", "3"]);
  });

  it("merges coordinates that differ below ~50 m", () => {
    // The same village entered at different precision in different entries.
    const merged = mergeStopsAtSameLocation([
      { name: "Oulilimt", lat: 31.5, lng: -6.36, day: 6 },
      { name: "Oulilimt", lat: 31.5001, lng: -6.3601, day: 8 },
    ]);
    expect(merged).toHaveLength(1);
    expect(stopLabel(merged[0])).toBe("6-8");
  });

  it("keeps genuinely separate nearby stops apart", () => {
    // Toubkal Refuge to the summit is ~2 km — close, but two real places.
    const merged = mergeStopsAtSameLocation([
      { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192, day: 12 },
      { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153, day: 13 },
    ]);
    expect(merged).toHaveLength(2);
  });

  it("falls back to position when itinerary days are absent", () => {
    const merged = mergeStopsAtSameLocation([
      { name: "A", lat: 31, lng: -7 },
      { name: "B", lat: 32, lng: -8 },
    ]);
    expect(merged.map(stopLabel)).toEqual(["1", "2"]);
  });

  it("preserves the name of the first stop in a merged run", () => {
    const merged = mergeStopsAtSameLocation([
      { name: "Fes", lat: 34.033, lng: -5, day: 2 },
      { name: "Fes medina", lat: 34.033, lng: -5, day: 3 },
    ]);
    expect(merged[0].name).toBe("Fes");
  });
});

describe("stopLabel", () => {
  it("renders a single day as a bare number", () => {
    expect(stopLabel({ name: "x", lat: 0, lng: 0, day: 4, dayEnd: 4 })).toBe("4");
  });

  it("renders a span as a range", () => {
    expect(stopLabel({ name: "x", lat: 0, lng: 0, day: 2, dayEnd: 5 })).toBe("2-5");
  });

  it("returns empty for a stop with no day, so single-pin maps stay unlabelled", () => {
    expect(stopLabel({ name: "x", lat: 0, lng: 0 })).toBe("");
  });
});
