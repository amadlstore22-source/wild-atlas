import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "../dictionaries";
import { DESTINATIONS } from "@/lib/destinations";
import { ZelligeBand, ZelligeField } from "@/components/ui/MoroccanMotifs";
import type { Locale } from "@/app/[lang]/dictionaries";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Morocco Destinations — Atlas, Sahara, Medinas & Coast | Marrakech Eco Tours",
    description:
      "Explore Morocco's most extraordinary destinations: High Atlas trekking, Sahara desert, Marrakech medina, Fes, Chefchaouen, Agadir surf, Ouzoud waterfalls, and Essaouira. Find guided tours for every destination.",
    openGraph: {
      title: "Morocco Destinations — Marrakech Eco Tours",
      description: "From Atlas peaks to Atlantic surf — discover where our adventures take you.",
      url: `https://marrakechecotours.com/${lang}/destinations`,
    },
    alternates: { canonical: `https://marrakechecotours.com/${lang}/destinations` },
  };
}

const REGION_COLORS: Record<string, string> = {
  "Marrakech-Safi": "#C1693A",
  "Drâa-Tafilalet": "#B8722A",
  "Fès-Meknès": "#8B6914",
  "Tanger-Tétouan-Al Hoceïma": "#3B7A9E",
  "Souss-Massa": "#5E7460",
  "Béni Mellal-Khénifra": "#3D7D5C",
};

export default async function DestinationsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-32 bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1920&q=80"
            alt="Morocco landscapes"
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-saffron text-xs font-bold uppercase tracking-[0.2em] mb-4">
            From Atlas to Atlantic
          </p>
          <h1
            className="font-serif text-white font-bold mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Where the Adventures Happen
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Eight extraordinary destinations across Morocco — each with its own character, climate,
            and story. Click any destination to discover tours, travel tips, and what makes it unmissable.
          </p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      {/* Destination grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ZelligeField tone="clay" opacity={0.08} scale={140} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => {
            const color = REGION_COLORS[dest.region] ?? "#4B5D3A";
            return (
              <Link
                key={dest.slug}
                href={`/${lang}/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-charcoal flex flex-col min-h-[340px] hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute inset-0">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                </div>

                <div className="relative mt-auto p-6 z-10">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full mb-3 border"
                    style={{ color, borderColor: color + "60", background: color + "20" }}
                  >
                    {dest.region.split("-")[0]}
                  </span>
                  <h2 className="font-serif text-white font-bold text-xl leading-tight mb-1 group-hover:text-sand transition-colors">
                    {dest.name}
                  </h2>
                  <p className="text-white/55 text-sm mb-4">{dest.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.knownFor.slice(0, 2).map((k, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-white/50 bg-white/8 border border-white/10 rounded-full px-2 py-0.5 leading-tight"
                      >
                        {k.split("—")[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
