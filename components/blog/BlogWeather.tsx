import { fetchRegionWeather, fetchToubkalAltitudes } from "@/lib/weather";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * Wide, in-prose live conditions panel for blog posts. Distinct from
 * TourWeather (narrow sidebar card, derives its region from a Tour) — this
 * takes an explicit region name because a post has no Tour to derive from.
 * Both share the same 3-hour-cached Open-Meteo fetch in lib/weather.ts.
 *
 * `altitudes` adds the Toubkal refuge and summit forecast under the valley
 * reading (the Toubkal weather post: its searchers want the mountain, not
 * Imlil). If that fetch fails the valley panel still renders on its own.
 *
 * Returns null on fetch failure, so surrounding prose must stand on its own.
 */
export default async function BlogWeather({
  region,
  dict,
  altitudes = false,
}: {
  region: string;
  dict: Dictionary;
  altitudes?: boolean;
}) {
  const [w, alt] = await Promise.all([
    fetchRegionWeather(region),
    altitudes ? fetchToubkalAltitudes() : Promise.resolve(null),
  ]);
  if (!w) return null;

  return (
    <figure className="my-10 rounded-[4px] border border-rule bg-surface-sunk/40 p-6 not-prose">
      <figcaption className="eyebrow mb-4">{dict.weather.conditionsNowLong}</figcaption>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl leading-none" aria-hidden>{w.icon}</span>
          <div>
            <div className="font-display text-ink text-lg font-bold leading-tight">{w.name}</div>
            <div className="text-ink-muted text-xs">{dict.weather.taglines[w.regionKey]}</div>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-indigo text-4xl font-bold leading-none">{w.tempC}°</span>
          <span className="text-ink-soft text-sm">{dict.weather.conditions[w.conditionKey]}</span>
        </div>
        <div className="text-ink-soft text-sm">
          {dict.weather.high} <strong className="text-ink">{w.highC}°</strong> · {dict.weather.low} <strong className="text-ink">{w.lowC}°</strong>
        </div>
      </div>
      {alt && (
        <div className="mt-5 grid gap-3 border-t border-rule pt-4 sm:grid-cols-2">
          {alt.map((a) => (
            <div key={a.key} className="flex items-center gap-3">
              <span className="text-2xl leading-none" aria-hidden>{a.icon}</span>
              <div>
                <div className="font-display text-ink text-sm font-bold leading-tight">
                  {a.key === "summit" ? dict.weather.summitLabel : dict.weather.refugeLabel}
                </div>
                <div className="text-ink-soft text-sm">
                  <span className="whitespace-nowrap">
                    <strong className="text-indigo">{a.tempC}°</strong> {dict.weather.conditions[a.conditionKey]}
                  </span>{" "}
                  ·{" "}
                  <span className="whitespace-nowrap">
                    {dict.weather.high} <strong className="text-ink">{a.highC}°</strong>
                  </span>{" "}
                  ·{" "}
                  <span className="whitespace-nowrap">
                    {dict.weather.low} <strong className="text-ink">{a.lowC}°</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <p className="text-ink-muted text-[0.7rem] sm:col-span-2">{dict.weather.altitudeNote}</p>
        </div>
      )}
      <p className="text-ink-muted text-[0.7rem] mt-4">
        {dict.weather.validReading}{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
          Open-Meteo
        </a>
        . {dict.weather.summitColder}
      </p>
    </figure>
  );
}
