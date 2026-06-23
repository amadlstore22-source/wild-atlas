import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABanner from "@/components/sections/CTABanner";
import WhyUs from "@/components/sections/WhyUs";
import AboutStory from "@/components/sections/AboutStory";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Our Story — Marrakech Eco Tours | Born in the Atlas Mountains",
    description: "Marrakech Eco Tours was founded by Berber guides who grew up in the High Atlas. We run ethical, small-group adventures through Morocco's most remote landscapes — no middlemen, no greenwashing.",
  };
}

export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative h-[65vh] min-h-[440px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=1920&q=80"
          alt="High Atlas Mountains at sunrise, Morocco"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-4">Our Story</p>
          <h1 className="font-serif text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            Born in the Atlas.<br />Built for the World.
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            A team of licensed Berber guides who grew up in Morocco's wildest places — sharing them honestly, sustainably, and without the middlemen.
          </p>
        </div>
      </div>

      {/* ── Intro stat bar ── */}
      <div className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/15">
            {[
              { value: `${SITE.experienceYears}+`, label: "Years guiding" },
              { value: SITE.clientCount, label: "Happy travellers" },
              { value: SITE.tourCount.toString(), label: "Tours available" },
              { value: SITE.countryCount, label: "Countries represented" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <div className="font-serif text-3xl font-bold text-white leading-none">{s.value}</div>
                <div className="text-white/55 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Origin story + animated content ── */}
      <AboutStory lang={lang} />

      {/* ── Three pillars ── */}
      <section className="py-24 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">What makes us different</p>
            <h2 className="font-serif text-charcoal font-bold" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
              No Shortcuts. No Greenwashing. No Middlemen.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Rooted in Local Knowledge",
                body: "Every guide on our team was born or raised in Morocco's mountain communities. We don't hire staff from travel agencies — we work with the people who actually know these mountains, valleys, and deserts by name.",
                image: "/images/guides-local-knowledge.jpeg",
                alt: "Berber guides preparing a meal at a mountain camp in the High Atlas",
              },
              {
                num: "02",
                title: "Ethical, Community-First Travel",
                body: "A significant portion of every booking goes directly to the local families, mule handlers, and guesthouses we work with. We don't use large hotel chains or international catering — we keep money in the communities we visit.",
                image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
                alt: "Traditional Moroccan mint tea being poured",
              },
              {
                num: "03",
                title: "No Booking Platforms, No Mark-Ups",
                body: "When you book directly with us, you pay us — not a commission layer on top. That means better prices for you and better income for our guides. We've deliberately stayed off the big aggregators since day one.",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
                alt: "Sahara desert dunes at golden hour",
              },
            ].map((p) => (
              <div key={p.num} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-dark">
                <div className="relative h-52">
                  <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-mono text-white/50 text-xs font-bold tracking-widest">{p.num}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-charcoal text-lg font-bold mb-3">{p.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us (existing component) ── */}
      <WhyUs dict={dict} />

      {/* ── Pull quote + tours CTA ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-6">Our promise</p>
          <blockquote className="font-serif text-charcoal font-bold leading-[1.15] mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            &ldquo;We don&apos;t just show you Morocco. We take you into it — the same way we&apos;ve been doing it for the people we love.&rdquo;
          </blockquote>
          <p className="text-charcoal/55 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            Every tour we offer is one we&apos;ve done ourselves, with our own families, before we ever offered it to a guest. That&apos;s the standard we hold ourselves to.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/tours`}
              className="px-8 py-3.5 rounded-full bg-forest text-white font-bold text-sm hover:bg-moss transition-colors shadow-lg shadow-forest/20"
            >
              Browse All {SITE.tourCount} Tours
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-3.5 rounded-full border-2 border-charcoal/20 text-charcoal font-bold text-sm hover:border-forest hover:text-forest transition-colors"
            >
              Ask Us Anything
            </Link>
          </div>
        </div>
      </section>

      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
