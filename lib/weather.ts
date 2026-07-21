// Live weather for the regions our tours cover, via Open-Meteo (free, no API key).
// Cached server-side so we make only a few calls per day regardless of traffic.

export type ConditionKey =
  | "clear" | "mostlyClear" | "overcast" | "fog" | "drizzle" | "rain"
  | "snow" | "showers" | "snowShowers" | "thunderstorm" | "unknown";

export type RegionKey = "marrakech" | "highAtlas" | "sahara" | "agadir";

export interface RegionWeather {
  name: string;
  regionKey: RegionKey;
  tempC: number;
  highC: number;
  lowC: number;
  code: number;
  conditionKey: ConditionKey;
  icon: string;
}

export interface WeatherResult {
  regions: RegionWeather[];
  error: boolean;
}

const LOCATIONS: { name: string; regionKey: RegionKey; lat: number; lon: number }[] = [
  { name: "Marrakech", regionKey: "marrakech", lat: 31.63, lon: -7.98 },
  { name: "High Atlas", regionKey: "highAtlas", lat: 31.14, lon: -7.92 },
  { name: "Sahara", regionKey: "sahara", lat: 31.1, lon: -4.01 },
  { name: "Agadir", regionKey: "agadir", lat: 30.42, lon: -9.6 },
];

// WMO weather codes → condition key + emoji. The key is resolved to a
// translated label via dict.weather.conditions[key] at render time.
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)
function describe(code: number): { conditionKey: ConditionKey; icon: string } {
  if (code === 0) return { conditionKey: "clear", icon: "☀️" };
  if (code <= 2) return { conditionKey: "mostlyClear", icon: "🌤️" };
  if (code === 3) return { conditionKey: "overcast", icon: "☁️" };
  if (code <= 48) return { conditionKey: "fog", icon: "🌫️" };
  if (code <= 57) return { conditionKey: "drizzle", icon: "🌦️" };
  if (code <= 67) return { conditionKey: "rain", icon: "🌧️" };
  if (code <= 77) return { conditionKey: "snow", icon: "🌨️" };
  if (code <= 82) return { conditionKey: "showers", icon: "🌦️" };
  if (code <= 86) return { conditionKey: "snowShowers", icon: "🌨️" };
  if (code <= 99) return { conditionKey: "thunderstorm", icon: "⛈️" };
  return { conditionKey: "unknown", icon: "🌡️" };
}

interface OpenMeteoResponse {
  current?: { temperature_2m?: number; weather_code?: number };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    weather_code?: number[];
  };
}

/**
 * Map a tour to one of the four weather regions above, so the tour-detail
 * sidebar can show conditions for the ground it actually covers. Tours have no
 * `region` field, so this derives it from category + origin + meetingPoint.
 * Returns a region `name` matching one in LOCATIONS.
 */
export function tourRegionName(tour: {
  category: string;
  origin: string;
  meetingPoint: { lat: number; lng: number };
}): string {
  if (tour.category === "desert") return "Sahara";
  if (tour.category === "trekking" || tour.category === "hiking") return "High Atlas";
  if (tour.origin === "agadir") return "Agadir";
  // Fall back to nearest region by meetingPoint latitude/longitude.
  let best = "Marrakech";
  let bestD = Infinity;
  for (const loc of LOCATIONS) {
    const d = (tour.meetingPoint.lat - loc.lat) ** 2 + (tour.meetingPoint.lng - loc.lon) ** 2;
    if (d < bestD) { bestD = d; best = loc.name; }
  }
  return best;
}

/** Fetch weather for a single region by name (sidebar variant). */
export async function fetchRegionWeather(regionName: string): Promise<RegionWeather | null> {
  const result = await fetchMoroccoWeather();
  if (result.error) return null;
  return result.regions.find((r) => r.name === regionName) ?? null;
}

export async function fetchMoroccoWeather(): Promise<WeatherResult> {
  try {
    const results = await Promise.all(
      LOCATIONS.map(async (loc) => {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}` +
          `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code` +
          `&timezone=auto&forecast_days=1`;
        const res = await fetch(url, { next: { revalidate: 10800 } }); // cache 3 h
        if (!res.ok) throw new Error(`weather ${res.status}`);
        const data: OpenMeteoResponse = await res.json();
        const code = data.current?.weather_code ?? data.daily?.weather_code?.[0] ?? 0;
        const { conditionKey, icon } = describe(code);
        return {
          name: loc.name,
          regionKey: loc.regionKey,
          tempC: Math.round(data.current?.temperature_2m ?? data.daily?.temperature_2m_max?.[0] ?? 0),
          highC: Math.round(data.daily?.temperature_2m_max?.[0] ?? 0),
          lowC: Math.round(data.daily?.temperature_2m_min?.[0] ?? 0),
          code,
          conditionKey,
          icon,
        } satisfies RegionWeather;
      }),
    );
    return { regions: results, error: false };
  } catch {
    return { regions: [], error: true };
  }
}
