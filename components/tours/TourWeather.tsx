import { fetchRegionWeather, tourRegionName } from "@/lib/weather";
import type { Tour } from "@/lib/tours";

/**
 * Narrow, single-region weather card for the tour-detail sidebar. Shows current
 * conditions for the region the tour actually covers (derived via tourRegionName).
 * Server component — reuses the cached Open-Meteo fetch. Renders nothing on error.
 */
export default async function TourWeather({ tour }: { tour: Tour }) {
  const region = tourRegionName(tour);
  const w = await fetchRegionWeather(region);
  if (!w) return null;

  return (
    <div className="mt-4 bg-card border border-rule rounded-[4px] p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="eyebrow">Conditions now</div>
        <span className="text-2xl leading-none" aria-hidden>{w.icon}</span>
      </div>
      <div className="font-display text-ink text-lg font-bold leading-tight">{w.name}</div>
      <div className="text-ink-muted text-xs mb-3">{w.tagline}</div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-indigo text-3xl font-bold leading-none">{w.tempC}°</span>
        <span className="text-ink-soft text-sm">{w.label}</span>
      </div>
      <div className="text-ink-muted text-xs mt-2">
        High {w.highC}° · Low {w.lowC}°
      </div>
      <div className="text-ink-faint text-[0.65rem] mt-3">
        Live via{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-muted">
          Open-Meteo
        </a>
      </div>
    </div>
  );
}
