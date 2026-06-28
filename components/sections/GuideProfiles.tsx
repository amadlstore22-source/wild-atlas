import Link from "next/link";
import { MapPin, Translate, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { GUIDES } from "@/lib/guides";
import type { Locale } from "@/app/[lang]/dictionaries";

interface Props {
  lang: Locale;
}

export default function GuideProfiles({ lang }: Props) {
  const featured = GUIDES.filter((g) => g.isFounder);

  return (
    <section className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">Your guides</p>
            <h2
              className="font-serif text-charcoal font-bold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              The people who know<br className="hidden sm:block" /> this land by heart
            </h2>
            <p className="text-charcoal/50 text-sm mt-3 max-w-sm leading-relaxed">
              Not agency hires. Born and raised in the mountains, valleys, and medinas they lead.
            </p>
          </div>
          <Link
            href={`/${lang}/guides`}
            className="inline-flex items-center gap-2 text-forest font-bold text-sm hover:gap-3 transition-all group shrink-0"
          >
            Meet the full team
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((guide, i) => {
            const initials = guide.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            const accentColor = i === 0 ? "#4B5D3A" : "#8B5E3C";

            return (
              <Link
                key={guide.id}
                href={`/${lang}/guides/${guide.id}`}
                className="group bg-white rounded-3xl border border-sand-dark overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Avatar column */}
                <div
                  className="relative w-full sm:w-40 shrink-0 h-52 sm:h-auto flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}35 100%)` }}
                >
                  {/* TODO: replace with <Image src={`/images/guides/${guide.id}.jpg`} fill className="object-cover" ...> once real photo is ready */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #2d3a22 100%)` }}
                  >
                    {initials}
                  </div>
                  {guide.isFounder && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-4 sm:left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-bold text-forest shadow whitespace-nowrap">
                      Co-founder
                    </div>
                  )}
                </div>

                {/* Info column */}
                <div className="p-7 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-serif text-charcoal text-xl font-bold mb-1 group-hover:text-forest transition-colors">
                      {guide.name}
                    </h3>
                    <p className="text-charcoal/55 text-xs mb-4">{guide.role}</p>
                    <p className="text-charcoal/65 text-sm leading-relaxed line-clamp-3">{guide.shortBio}</p>
                  </div>

                  <div className="mt-5 space-y-2 text-xs text-charcoal/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sunset shrink-0" weight="fill" />
                      <span className="truncate">{guide.regions.slice(0, 3).join(" · ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Translate className="w-3.5 h-3.5 text-forest shrink-0" weight="fill" />
                      <span className="truncate">{guide.languages.slice(0, 4).join(", ")}</span>
                    </div>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-forest font-bold text-xs group-hover:gap-3 transition-all">
                    View profile →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legacy callout */}
        <div className="mt-8 bg-charcoal rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
               style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            LA
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-sm">Lahsen Aitidar — The first guide</div>
            <div className="text-white/50 text-xs mt-0.5 leading-relaxed">
              Father of Smail and Mohamed. One of the first licensed Berber mountain guides in the High Atlas (1980s).
              Every route we run today was walked first by him.
            </div>
          </div>
          <Link
            href={`/${lang}/guides/lahsen-aitidar`}
            className="shrink-0 text-sunset font-semibold text-xs hover:underline whitespace-nowrap"
          >
            His story →
          </Link>
        </div>

      </div>
    </section>
  );
}
