import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Translate, Certificate, ArrowLeft, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { GUIDES, getGuide } from "@/lib/guides";
import { TOURS } from "@/lib/tours";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";
import TourCard from "@/components/ui/TourCard";
import { whatsappUrl } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";

type GuideParams = { params: Promise<{ lang: string; id: string }> };

export async function generateStaticParams() {
  return GUIDES.flatMap((g) =>
    LOCALES.map((lang) => ({ lang, id: g.id }))
  );
}

export async function generateMetadata({ params }: GuideParams): Promise<Metadata> {
  const { id, lang } = await params;
  const guide = getGuide(id);
  if (!guide) return {};
  return {
    title: `${guide.name} — Licensed Guide | Marrakech Eco Tours`,
    description: guide.shortBio,
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/guides/${id}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/guides/${id}`])),
    },
  };
}

export default async function GuideProfilePage({ params }: GuideParams) {
  const { id, lang } = await params;
  if (!hasLocale(lang)) notFound();
  const guide = getGuide(id);
  if (!guide) notFound();
  const dict = await getDictionary(lang);

  const guidedTours = TOURS.filter((t) => guide.routesLed.includes(t.slug));

  const guideJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guide.name,
    jobTitle: guide.role,
    worksFor: { "@type": "TravelAgency", name: "Marrakech Eco Tours", url: "https://marrakechecotours.com" },
    knowsLanguage: guide.languages,
    description: guide.shortBio,
    url: `https://marrakechecotours.com/${lang}/guides/${id}`,
  };

  return (
    <>
      <JsonLd data={guideJsonLd} />

      {/* ── Back link ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href={`/${lang}/guides`}
          className="inline-flex items-center gap-2 text-ink-soft hover:text-forest text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All guides
        </Link>
      </div>

      {/* ── Profile hero ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

          {/* Left: avatar + quick facts */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-card rounded-[4px] border border-sand-deep overflow-hidden shadow-sm">
              {/* Avatar */}
              <div className="relative h-72 bg-gradient-to-br from-indigo/10 to-forest/25 flex items-center justify-center">
                {/* TODO: replace with <Image src={`/images/guides/${guide.id}.jpg`} ...> once real photo is available */}
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center text-white font-bold text-6xl shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #2B3A67 0%, #1B2645 100%)" }}
                >
                  {guide.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {guide.isFounder && (
                  <div className="absolute top-4 right-4 bg-sunset/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Co-founder
                  </div>
                )}
                {guide.isLegacy && (
                  <div className="absolute top-4 right-4 tex-emerald/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Legacy
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h1 className="font-display text-charcoal text-2xl font-bold">{guide.name}</h1>
                  <div className="text-forest text-sm font-medium mt-1">{guide.role}</div>
                </div>

                <div className="space-y-3 text-sm text-ink-soft">
                  <div className="flex items-start gap-2.5">
                    <Certificate className="w-4 h-4 text-forest shrink-0 mt-0.5" weight="fill" />
                    <span>{guide.yearsGuiding}+ years guiding · Licensed guide</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sunset shrink-0 mt-0.5" weight="fill" />
                    <span>{guide.regions.join(", ")}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Translate className="w-4 h-4 text-forest shrink-0 mt-0.5" weight="fill" />
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                </div>

                {!guide.isLegacy && (
                  <a
                    href={whatsappUrl(`Hello! I'd like to request ${guide.name} as my guide. Could you let me know their availability?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-green-500 transition-colors"
                  >
                    <WhatsappLogo className="w-4 h-4" weight="fill" />
                    Request this guide
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: bio + specialties + tours */}
          <div className="space-y-12">

            {/* Bio */}
            <div>
              <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-5">About</p>
              <div className="prose prose-charcoal max-w-none space-y-4">
                {guide.longBio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-ink-soft leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div>
              <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-5">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 rounded-full bg-forest/8 border border-forest/15 text-forest text-sm font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tours this guide leads */}
            {guidedTours.length > 0 && (
              <div>
                <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-5">Tours led by {guide.name.split(" ")[0]}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guidedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />
                  ))}
                </div>
              </div>
            )}

            {/* If legacy guide, link to about page */}
            {guide.isLegacy && (
              <div className="tex-emerald rounded-[4px] p-8 text-white">
                <h3 className="font-display text-xl font-bold mb-3">The story behind the guides</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5">
                  Read the full history of how Lahsen&apos;s work in the 1980s became the foundation
                  for everything Marrakech Eco Tours does today.
                </p>
                <Link
                  href={`/${lang}/about`}
                  className="inline-flex items-center gap-2 text-sunset font-semibold text-sm hover:gap-3 transition-all"
                >
                  Read our story →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
