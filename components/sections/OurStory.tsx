import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function OurStory({ dict, lang = "en" }: Props) {
  return (
    <section className="py-28 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: large editorial intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end mb-20">
          <div className="max-w-2xl">
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {dict.ourStory.eyebrow}
            </p>
            <h2 className="font-serif text-charcoal font-bold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
              {dict.ourStory.title}
            </h2>
          </div>

          {/* Pull stat — right side */}
          <div className="text-right shrink-0">
            <div className="font-serif text-forest/10 font-bold leading-none select-none"
                 style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}>
              {SITE.experienceYears}
            </div>
            <div className="text-charcoal/40 text-xs font-semibold uppercase tracking-widest -mt-3">
              Years guiding
            </div>
          </div>
        </div>

        {/* Main: asymmetric image + text grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-stretch">

          {/* Left: tall image with floating card */}
          <div className="relative rounded-2xl overflow-hidden min-h-[500px] lg:min-h-[620px] reveal-scale">
            <Image
              src="https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=900&q=85"
              alt="Berber guides leading a trek through the High Atlas Mountains"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Floating stat card */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-xl">
                <div className="font-serif text-forest text-3xl font-bold leading-none">{SITE.clientCount}</div>
                <div className="text-charcoal/55 text-xs mt-1">{dict.ourStory.stat2Label}</div>
              </div>
              <div className="bg-forest rounded-xl px-5 py-4 shadow-xl text-right">
                <div className="font-serif text-white text-3xl font-bold leading-none">{SITE.countryCount}+</div>
                <div className="text-white/55 text-xs mt-1">Countries</div>
              </div>
            </div>
          </div>

          {/* Right: stacked text + second image */}
          <div className="flex flex-col gap-6">
            <div className="bg-sand rounded-2xl p-8 flex-1 reveal-up">
              <div className="space-y-4 text-charcoal/65 leading-relaxed mb-8">
                <p>{dict.ourStory.body1}</p>
                <p>{dict.ourStory.body2}</p>
              </div>

              {/* Quick facts */}
              <div className="space-y-3 pt-6 border-t border-sand-dark">
                {[
                  { label: "Local guides, born in the Atlas", check: true },
                  { label: "Private & custom group tours available", check: true },
                  { label: "Licensed by Morocco Ministry of Tourism", check: true },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-forest/12 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-forest" />
                    </div>
                    <span className="text-charcoal/70 text-sm">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Second image — shorter */}
            <div className="relative rounded-2xl overflow-hidden h-52 reveal-scale">
              <Image
                src="https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=600&q=85"
                alt="Sahara desert dunes at sunset"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <Link
                  href={`/${lang}/about`}
                  className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:gap-3 transition-all duration-300"
                >
                  Our full story <ArrowRight className="w-4 h-4" weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
