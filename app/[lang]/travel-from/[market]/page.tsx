import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { breadcrumbDocument } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { ArabesqueDivider } from "@/components/ui/MoroccanMotifs";
import { WhatsAppLink } from "@/components/ui/ContactLinks";
import TourCard from "@/components/ui/TourCard";
import { ogBase } from "@/lib/seo/open-graph";
import { MARKETS, MARKETS_CHECKED, marketFor, marketPath, type RouteLine } from "@/lib/markets";
import { getFeaturedToursFor } from "@/lib/tours-i18n";
import { toCardData } from "@/lib/tours";
import { GUIDES } from "@/lib/guides";
import { getGuideFor } from "@/lib/guides-i18n";
import { formatDate, intlLocale } from "@/lib/format-date";

type Params = { params: Promise<{ lang: string; market: string }> };

/* Each market page exists in ONE locale (see lib/markets.ts). Any other
   lang/market pair is a 404 rather than an English fallback. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return MARKETS.map((m) => ({ lang: m.lang, market: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, market } = await params;
  const m = marketFor(lang, market);
  if (!m) return {};
  const url = `https://marrakechecotours.com${marketPath(m)}`;
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    // Self-canonical and no hreflang: the five pages are written for different
    // travellers, not translations of one page.
    alternates: { canonical: url },
    openGraph: { ...ogBase(lang), title: m.metaTitle, description: m.metaDescription, url },
  };
}

function Routes({ title, lines }: { title: string; lines: RouteLine[] }) {
  return (
    <div className="rounded-[4px] border border-rule bg-card p-5">
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <dl className="mt-3 flex flex-col gap-2 text-sm">
        {lines.map((l) => (
          <div key={l.airline} className="grid grid-cols-[8.5rem_1fr] gap-3">
            <dt className="font-semibold text-ink">{l.airline}</dt>
            <dd className="text-ink-soft">{l.from}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function TravelFromPage({ params }: Params) {
  const { lang, market } = await params;
  if (!hasLocale(lang)) notFound();
  const m = marketFor(lang, market);
  if (!m) notFound();
  const dict = await getDictionary(lang);

  // Guides who speak this market's language, from their own profiles.
  const speakers = GUIDES.filter((g) => g.languages.includes(m.guideLanguage)).map(
    (g) => getGuideFor(lang, g.id) ?? g,
  );
  const names = new Intl.ListFormat(intlLocale(lang), { style: "long", type: "conjunction" }).formatToParts(
    speakers.map((g) => g.name),
  );

  // The owner's own `featured` picks, three per base.
  const featured = getFeaturedToursFor(lang);
  const byOrigin = (o: string) => featured.filter((t) => t.origin === o).slice(0, 3);

  const breadcrumb = breadcrumbDocument([
    { name: "Home", path: `/${lang}` },
    { name: m.labels.breadcrumb, path: marketPath(m) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <header className="bg-indigo text-cream pt-28 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brass-glow">
            {m.labels.breadcrumb}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mt-3 text-balance text-white">
            {m.h1}
          </h1>
          <p className="text-cream/75 text-lg mt-4 leading-relaxed">{m.intro}</p>
        </div>
      </header>

      <main className="bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-12">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{m.entryHeading}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {m.entry.map((e) => (
                <div key={e.who} className="rounded-[4px] border border-rule bg-card p-5">
                  <h3 className="font-semibold text-ink">{e.who}</h3>
                  <p className="text-ink-soft leading-relaxed mt-1">{e.text}</p>
                  <p className="text-xs text-ink-muted mt-2">
                    {m.labels.source}:{" "}
                    <a href={e.source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                      {e.source.label}
                    </a>{" "}
                    · {m.labels.checked} {formatDate(MARKETS_CHECKED, lang)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-ink-soft leading-relaxed mt-4">{m.entryAdvice}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{m.timeHeading}</h2>
            {m.time.map((t) => (
              <p key={t} className="text-ink-soft leading-relaxed mt-3">{t}</p>
            ))}
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{m.flightsHeading}</h2>
            <p className="text-ink-muted text-sm mt-2">{m.flightsNote}</p>
            <div className="mt-4 grid gap-4">
              <Routes title={m.labels.rak} lines={m.rak} />
              <Routes title={m.labels.aga} lines={m.aga} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{m.basesHeading}</h2>
            <p className="text-ink-soft leading-relaxed mt-3">{m.marrakechBase}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {byOrigin("marrakech").map((t) => (
                <TourCard key={t.id} tour={toCardData(t)} lang={lang} dict={dict} />
              ))}
            </div>
            <p className="text-ink-soft leading-relaxed mt-8">{m.agadirBase}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {byOrigin("agadir").map((t) => (
                <TourCard key={t.id} tour={toCardData(t)} lang={lang} dict={dict} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">{m.guidesHeading}</h2>
            <p className="text-ink-soft leading-relaxed mt-3">
              {speakers.length === 0
                ? m.guidesNo
                : (() => {
                    const [before, after] = m.guidesYes.split("{names}");
                    let i = 0;
                    return (
                      <>
                        {before}
                        {names.map((part, k) =>
                          part.type === "element" ? (
                            <Link key={k} href={`/${lang}/guides/${speakers[i++].id}`} className="font-semibold text-indigo underline underline-offset-2 hover:text-terracotta">
                              {part.value}
                            </Link>
                          ) : (
                            <span key={k}>{part.value}</span>
                          ),
                        )}
                        {after}
                      </>
                    );
                  })()}
            </p>
          </section>

          <ArabesqueDivider />

          <section className="rounded-[4px] border border-rule bg-card p-6 sm:p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">{m.ctaHeading}</h2>
            <p className="text-ink-soft mt-2">{m.ctaBody}</p>
            <div className="flex flex-wrap gap-3 justify-center mt-5">
              <WhatsAppLink
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#075E54] text-white font-bold text-sm shadow-lg"
              >
                {m.labels.whatsapp}
              </WhatsAppLink>
              <Link href={`/${lang}/contact`} className="btn-brass !px-5 !py-2.5 !text-sm">
                {m.labels.ask}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
