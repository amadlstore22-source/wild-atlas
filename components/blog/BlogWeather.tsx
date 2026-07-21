import { fetchRegionWeather } from "@/lib/weather";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * Wide, in-prose live conditions panel for blog posts. Distinct from
 * TourWeather (narrow sidebar card, derives its region from a Tour) — this
 * takes an explicit region name because a post has no Tour to derive from.
 * Both share the same 3-hour-cached Open-Meteo fetch in lib/weather.ts.
 *
 * Returns null on fetch failure, so surrounding prose must stand on its own.
 */
export default async function BlogWeather({ region, dict }: { region: string; dict: Dictionary }) {
  const w = await fetchRegionWeather(region);
  if (!w) return null;

  return (
    <figure className="my-10 rounded-[4px] border border-rule bg-surface-sunk/40 p-6 not-prose">
      <figcaption className="eyebrow mb-4">{dict.weather.conditionsNowLong}</figcaption>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl leading-none" aria-hidden>{w.icon}</span>
          <div>
            <div className="font-display text-ink text-lg font-bold leading-tight">{w.name}</div>
            <div className="text-ink-muted text-xs">{w.tagline}</div>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-indigo text-4xl font-bold leading-none">{w.tempC}°</span>
          <span className="text-ink-soft text-sm">{w.label}</span>
        </div>
        <div className="text-ink-soft text-sm">
          High <strong className="text-ink">{w.highC}°</strong> · Low <strong className="text-ink">{w.lowC}°</strong>
        </div>
      </div>
      <p className="text-ink-faint text-[0.7rem] mt-4">
        {dict.weather.validReading}{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink-muted">
          Open-Meteo
        </a>
        . {dict.weather.summitColder}
      </p>
    </figure>
  );
}
