import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Translate, Certificate, Star } from "@phosphor-icons/react/dist/ssr";
import { GUIDES } from "@/lib/guides";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import CTABanner from "@/components/sections/CTABanner";

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

  const founders = GUIDES.filter((g) => g.isFounder);
  const legacy = GUIDES.filter((g) => g.isLegacy);

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative bg-charcoal overflow-hidden">
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
          <p className="text-saffron text-xs font-bold uppercase tracking-[0.2em] mb-5">Our team</p>
          <h1
            className="font-serif text-white font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            The people who actually<br className="hidden sm:block" /> know Morocco
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Licensed Berber guides, born and raised in the landscapes they lead. Ask any traveller
            who&apos;s been to Morocco: the guide makes the trip. Meet ours.
          </p>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 divide-x divide-white/20">
            <div className="flex items-center gap-2 pr-6">
              <Certificate className="w-4 h-4 text-white" weight="fill" />
              <span>Officially licensed by Morocco&apos;s National Office for Tourism</span>
            </div>
            <div className="flex items-center gap-2 px-6">
              <Star className="w-4 h-4 text-sunset" weight="fill" />
              <span>Every guide trained on every route they lead</span>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <MapPin className="w-4 h-4 text-white" weight="duotone" />
              <span>Born in the Atlas — not hired from an agency</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Founder guides ── */}
        <div className="mb-6">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">Founders</p>
          <h2 className="font-serif text-charcoal font-bold mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Smail & Mohamed Aitidar
          </h2>
          <p className="text-charcoal/55 text-sm max-w-2xl">
            Brothers who grew up on these trails. They formalised the family guiding business in 2010 and have been
            building it ever since — one honest trip at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {founders.map((guide) => (
            <Link
              key={guide.id}
              href={`/${lang}/guides/${guide.id}`}
              className="group bg-white rounded-3xl border border-sand-dark overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar area */}
              <div className="relative h-64 bg-gradient-to-br from-forest/10 to-forest/20 flex items-center justify-center">
                {/* TODO: replace with <Image> once real photo is at /public/images/guides/{guide.id}.jpg */}
                <div
                  className="w-36 h-36 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #4B5D3A 0%, #2d3a22 100%)" }}
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
                <h3 className="font-serif text-charcoal text-2xl font-bold mb-3 group-hover:text-forest transition-colors">
                  {guide.name}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-6">{guide.shortBio}</p>

                <div className="space-y-3 text-xs text-charcoal/55">
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
                    <span>{guide.yearsGuiding}+ years guiding · Licensed guide</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-forest font-bold text-xs group-hover:gap-3 transition-all">
                  View full profile →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Legacy section ── */}
        <div className="border-t border-sand-dark pt-16 mb-12">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">Where it all began</p>
          <h2 className="font-serif text-charcoal font-bold mb-2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            The First Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {legacy.map((guide) => (
            <div
              key={guide.id}
              className="bg-gradient-to-br from-charcoal/95 to-charcoal rounded-3xl p-8 text-white"
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
                  <div className="font-serif text-xl font-bold">{guide.name}</div>
                  <div className="text-white/50 text-sm mt-0.5">{guide.role}</div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{guide.shortBio}</p>
              <div className="mt-6 text-xs text-white/40">
                {guide.yearsGuiding}+ years guiding · {guide.languages.join(", ")}
              </div>
            </div>
          ))}

          <div className="space-y-5 text-charcoal/65 leading-relaxed">
            <p>
              Every route we run today was walked first by Lahsen. The high passes of Toubkal, the mule
              tracks through Ourika, the stone-village paths of Aït Benhaddou — he mapped them in the 1980s,
              long before they appeared in any guidebook.
            </p>
            <p>
              Smail and Mohamed grew up walking beside him. When they took over in 2010, they inherited not
              just the routes, but the standard: deep local knowledge, total honesty with guests, and the
              belief that a guide&apos;s job is to make you feel the place, not just pass through it.
            </p>
            <p className="font-semibold text-charcoal/80">
              That inheritance is what makes Marrakech Eco Tours different from any agency that hires
              freelance guides off a list.
            </p>
          </div>
        </div>

        {/* ── Specialties grid ── */}
        <div className="mt-24 bg-offwhite rounded-3xl p-10">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3 text-center">Our expertise</p>
          <h2 className="font-serif text-charcoal font-bold text-center mb-10" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            What We Lead
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "High Atlas Trekking", icon: "⛰️", desc: "Toubkal, Mgoun, Jebel Saghro" },
              { label: "Sahara Expeditions", icon: "🏜️", desc: "Erg Chebbi, Draa Valley, Merzouga" },
              { label: "Medina & Culture", icon: "🕌", desc: "Marrakech, Fes, Chefchaouen" },
              { label: "Atlantic & Anti-Atlas", icon: "🌊", desc: "Agadir, Paradise Valley, Souss" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-sand-dark">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold text-charcoal text-sm mb-1">{item.label}</div>
                <div className="text-charcoal/45 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
