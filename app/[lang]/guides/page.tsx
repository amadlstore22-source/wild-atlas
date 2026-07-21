import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Translate, Certificate, Star } from "@phosphor-icons/react/dist/ssr";
import { guidesFor } from "@/lib/guides-i18n";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import CTABanner from "@/components/sections/CTABanner";
import { ZelligeBand } from "@/components/ui/MoroccanMotifs";
import { STATS } from "@/lib/stats";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Meet Our Guides — Marrakech Eco Tours | Licensed Berber Mountain Guides",
    description:
      "Our guides are licensed Berber professionals who were born and raised in the landscapes they lead. No hired staff from agencies — these are the people who know Morocco's mountains and medinas by heart.",
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/guides`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/guides`])),
    },
  };
}

export default async function GuidesPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const g = dict.guidesPage;
  const guides = guidesFor(lang);

  const founders = guides.filter((guide) => guide.isFounder);
  const legacy = guides.filter((guide) => guide.isLegacy);

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative tex-emerald overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1920&q=60)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-5">{g.ourTeamEyebrow}</p>
          <h1
            className="hero-title font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {g.heroTitle}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {g.heroSubtitle}
          </p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      {/* ── Trust strip ── */}
      <div className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 divide-x divide-white/20">
            <div className="flex items-center gap-2 pr-6">
              <Certificate className="w-4 h-4 text-white" weight="fill" />
              <span>{g.trustLicensed}</span>
            </div>
            <div className="flex items-center gap-2 px-6">
              <Star className="w-4 h-4 text-sunset" weight="fill" />
              <span>{g.trustTrained}</span>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <MapPin className="w-4 h-4 text-white" weight="duotone" />
              <span>{g.trustBornAtlas}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Founder guides ── */}
        <div className="mb-6">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-3">{g.foundersEyebrow}</p>
          <h2 className="font-display text-charcoal font-bold mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            {g.foundersTitle}
          </h2>
          <p className="text-ink-soft text-sm max-w-2xl">
            {g.foundersBody}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {founders.map((guide) => (
            <Link
              key={guide.id}
              href={`/${lang}/guides/${guide.id}`}
              className="group bg-card rounded-[4px] border border-sand-dark overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar area */}
              <div className="relative h-64 bg-gradient-to-br from-indigo/10 to-forest/20 flex items-center justify-center">
                {/* TODO: replace with <Image> once real photo is at /public/images/guides/{guide.id}.jpg */}
                <div
                  className="w-36 h-36 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #2B3A67 0%, #1B2645 100%)" }}
                >
                  {guide.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow">
                  <div className="text-forest font-bold text-xs">{guide.role}</div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-display text-charcoal text-2xl font-bold mb-3 group-hover:text-forest transition-colors">
                  {guide.name}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed mb-6">{guide.shortBio}</p>

                <div className="space-y-3 text-xs text-ink-soft">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-sunset shrink-0 mt-0.5" weight="fill" />
                    <span>{guide.regions.join(" · ")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Translate className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" weight="fill" />
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Certificate className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" weight="fill" />
                    <span>{g.yearsGuidingLicensed.replace("{years}", String(guide.yearsGuiding))}</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-forest font-bold text-xs group-hover:gap-3 transition-all">
                  {g.viewFullProfile}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Legacy section ── */}
        <div className="border-t border-sand-dark pt-16 mb-12">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-3">{g.legacyEyebrow}</p>
          <h2 className="font-display text-charcoal font-bold mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            {g.legacyTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {legacy.map((guide) => (
            <div
              key={guide.id}
              className="bg-gradient-to-br from-charcoal/95 to-charcoal rounded-[4px] p-8 text-white"
            >
              <div className="flex items-center gap-5 mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  {guide.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-display text-xl font-bold">{guide.name}</div>
                  <div className="text-white/50 text-sm mt-0.5">{guide.role}</div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{guide.shortBio}</p>
              <div className="mt-6 text-xs text-white/40">
                {guide.yearsGuiding}+ · {guide.languages.join(", ")}
              </div>
            </div>
          ))}

          <div className="space-y-5 text-ink-soft leading-relaxed">
            <p>{g.legacyBody1}</p>
            <p>{g.legacyBody2}</p>
            <p className="font-semibold text-charcoal/80">{g.legacyBody3}</p>
          </div>
        </div>

        {/* ── Specialties grid ── */}
        <div className="mt-24 bg-offwhite rounded-[4px] p-10">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-3 text-center">{g.expertiseEyebrow}</p>
          <h2 className="font-display text-charcoal font-bold text-center mb-10" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {g.expertiseTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: g.specialty1Label, icon: "⛰️", desc: g.specialty1Desc },
              { label: g.specialty2Label, icon: "🏜️", desc: g.specialty2Desc },
              { label: g.specialty3Label, icon: "🕌", desc: g.specialty3Desc },
              { label: g.specialty4Label, icon: "🌊", desc: g.specialty4Desc },
            ].map((item) => (
              <div key={item.label} className="bg-card rounded-[4px] p-6 text-center shadow-sm border border-sand-dark">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold text-charcoal text-sm mb-1">{item.label}</div>
                <div className="text-ink-muted text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <CTABanner lang={lang} dict={dict} tourCount={STATS.tourCount} />
    </>
  );
}
