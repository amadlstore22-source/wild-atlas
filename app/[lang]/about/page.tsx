import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import OurStory from "@/components/sections/OurStory";
import CTABanner from "@/components/sections/CTABanner";
import WhyUs from "@/components/sections/WhyUs";
import { getDictionary, hasLocale } from "../dictionaries";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.about.pageTitle,
    description: dict.about.pageSubtitle,
  };
}

export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&q=80"
          alt="Atlas Mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <h1 className="font-serif text-white text-6xl lg:text-7xl font-bold leading-tight">
            {dict.about.pageTitle}
          </h1>
          <p className="text-white/70 mt-3 text-xl">{dict.about.pageSubtitle}</p>
        </div>
      </div>

      <OurStory dict={dict} lang={lang} />
      <WhyUs dict={dict} />
      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
