export interface EonetCategory {
  id: string;
  title: string;
}

export interface EonetGeometry {
  magnitudeValue: number | null;
  magnitudeUnit: string | null;
  date: string;
  type: "Point" | "Polygon";
  coordinates: number[] | number[][][];
}

export interface EonetEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  categories: EonetCategory[];
  geometries: EonetGeometry[];
  closed: string | null;
}

interface EonetApiResponse {
  title: string;
  description: string;
  link: string;
  events: EonetEvent[];
}

export interface EonetResult {
  events: EonetEvent[];
  error: boolean;
}

// Morocco + Western Sahara bounding box: west, south, east, north
const MOROCCO_BBOX = "-17,21,-1,36";

const RELEVANT_CATEGORIES = new Set([
  "severeStorms",
  "wildfires",
  "dustHaze",
  "floods",
  "landslides",
  "tempExtremes",
]);

export async function fetchMoroccoEvents(): Promise<EonetResult> {
  const url = `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20&days=14&bbox=${MOROCCO_BBOX}`;
  try {
    const res = await fetch(url, { next: { revalidate: 10800 } }); // cache 3 h
    if (!res.ok) return { events: [], error: true };
    const data: EonetApiResponse = await res.json();
    const events = data.events.filter((e) =>
      e.categories.some((c) => RELEVANT_CATEGORIES.has(c.id))
    );
    return { events, error: false };
  } catch {
    return { events: [], error: true };
  }
}

export type AlertLevel = "clear" | "advisory" | "warning";

export function getAlertLevel(events: EonetEvent[]): AlertLevel {
  if (events.length === 0) return "clear";
  const isSevere = events.some((e) =>
    e.categories.some((c) =>
      ["severeStorms", "wildfires", "floods"].includes(c.id)
    )
  );
  return isSevere ? "warning" : "advisory";
}

const CATEGORY_LABELS: Record<string, string> = {
  severeStorms: "Severe Storm",
  wildfires: "Wildfire",
  dustHaze: "Dust & Haze",
  floods: "Flooding",
  landslides: "Landslide",
  tempExtremes: "Extreme Heat",
};

const CATEGORY_ICONS: Record<string, string> = {
  severeStorms: "⛈",
  wildfires: "🔥",
  dustHaze: "💨",
  floods: "🌊",
  landslides: "⛰",
  tempExtremes: "🌡",
};

export function formatEvent(event: EonetEvent): {
  label: string;
  icon: string;
  date: string;
} {
  const cat = event.categories.find((c) => RELEVANT_CATEGORIES.has(c.id));
  const catId = cat?.id ?? "";
  const lastGeom = event.geometries[event.geometries.length - 1];
  return {
    label: CATEGORY_LABELS[catId] ?? cat?.title ?? "Natural Event",
    icon: CATEGORY_ICONS[catId] ?? "⚠",
    date: lastGeom
      ? new Date(lastGeom.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })
      : "",
  };
}
