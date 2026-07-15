// Live weather for the regions our tours cover, via Open-Meteo (free, no API key).
// Cached server-side so we make only a few calls per day regardless of traffic.

export interface RegionWeather {
  name: string;
  tagline: string;
  tempC: number;
  highC: number;
  lowC: number;
  code: number;
  label: string;
  icon: string;
}

export interface WeatherResult {
  regions: RegionWeather[];
  error: boolean;
}

const LOCATIONS = [
  { name: "Marrakech", tagline: "City base", lat: 31.63, lon: -7.98 },
  { name: "High Atlas", tagline: "Imlil · Toubkal", lat: 31.14, lon: -7.92 },
  { name: "Sahara", tagline: "Merzouga dunes", lat: 31.1, lon: -4.01 },
  { name: "Agadir", tagline: "Atlantic coast", lat: 30.42, lon: -9.6 },
];

// WMO weather codes → friendly label + emoji.
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)
function describe(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Clear", icon: "☀️" };
  if (code <= 2) return { label: "Mostly clear", icon: "🌤️" };
  if (code === 3) return { label: "Overcast", icon: "☁️" };
  if (code <= 48) return { label: "Fog", icon: "🌫️" };
  if (code <= 57) return { label: "Drizzle", icon: "🌦️" };
  if (code <= 67) return { label: "Rain", icon: "🌧️" };
  if (code <= 77) return { label: "Snow", icon: "🌨️" };
  if (code <= 82) return { label: "Showers", icon: "🌦️" };
  if (code <= 86) return { label: "Snow showers", icon: "🌨️" };
  if (code <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "—", icon: "🌡️" };
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
        const { label, icon } = describe(code);
        return {
          name: loc.name,
          tagline: loc.tagline,
          tempC: Math.round(data.current?.temperature_2m ?? data.daily?.temperature_2m_max?.[0] ?? 0),
          highC: Math.round(data.daily?.temperature_2m_max?.[0] ?? 0),
          lowC: Math.round(data.daily?.temperature_2m_min?.[0] ?? 0),
          code,
          label,
          icon,
        } satisfies RegionWeather;
      }),
    );
    return { regions: results, error: false };
  } catch {
    return { regions: [], error: true };
  }
}
