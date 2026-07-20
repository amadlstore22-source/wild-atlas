import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import NewsSection from "@/components/sections/NewsSection";
import NewsSectionSkeleton from "@/components/sections/NewsSectionSkeleton";
import CTABanner from "@/components/sections/CTABanner";
import { getDictionary, hasLocale } from "../dictionaries";
import { STATS } from "@/lib/stats";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.news.title} — Marrakech Eco Tours`,
    description: dict.news.subtitle,
  };
}

export default async function NewsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <div className="bg-forest py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {dict.news.eyebrow}
          </p>
          <h1
            className="hero-title font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {dict.news.title}
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">{dict.news.subtitle}</p>
        </div>
      </div>

      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsSection lang={lang} dict={dict} showViewAll={false} />
      </Suspense>

      <CTABanner lang={lang} dict={dict} tourCount={STATS.tourCount} />
    </>
  );
}
