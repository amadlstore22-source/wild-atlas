import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Car,
  Tent,
  Mountains,
  CreditCard,
  ChatCircleDots,
  FirstAidKit,
} from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { faqPageDocument, breadcrumbDocument } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";
import { ArabesqueDivider } from "@/components/ui/MoroccanMotifs";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const h = dict.howWeOperate;
  return {
    title: h.pageTitle,
    description: h.pageSubtitle,
    openGraph: {
      title: `${h.pageTitle} — Marrakech Eco Tours`,
      description: h.pageSubtitle,
      url: `https://marrakechecotours.com/${lang}/how-we-operate`,
      images: [
        {
          url: "/gallery/toubkal-summit-guide-thumbs-up.jpg",
          width: 1200,
          height: 630,
          alt: "A Marrakech Eco Tours guide at the Toubkal summit marker, High Atlas, Morocco",
        },
      ],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/how-we-operate`,
      languages: hreflangForPath(LOCALES, "/how-we-operate"),
    },
  };
}

export default async function HowWeOperatePage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.howWeOperate;

  /* Each section is a question a sceptical traveller actually asks, so the
     content is genuinely FAQ-shaped and the schema mirrors what renders —
     Google's FAQPage guideline. The icons are decorative and hidden from
     assistive tech; the heading carries the meaning. */
  const sections = [
    { icon: ShieldCheck, title: h.guidesTitle, body: h.guidesBody, href: `/${lang}/guides`, link: h.guidesLink },
    { icon: Car, title: h.vehiclesTitle, body: h.vehiclesBody },
    { icon: Tent, title: h.campsTitle, body: h.campsBody },
    { icon: Mountains, title: h.safetyTitle, body: h.safetyBody },
    { icon: CreditCard, title: h.moneyTitle, body: h.moneyBody, href: `/${lang}/terms`, link: h.moneyLink },
    { icon: ChatCircleDots, title: h.bookingTitle, body: h.bookingBody },
    { icon: FirstAidKit, title: h.insuranceTitle, body: h.insuranceBody },
  ];

  const faqJsonLd = faqPageDocument(sections.map((s) => ({ q: s.title, a: s.body })));

  const breadcrumbJsonLd = breadcrumbDocument([
    { name: "Home", path: `/${lang}` },
    { name: h.pageTitle, path: `/${lang}/how-we-operate` },
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <header className="bg-indigo text-cream pt-28 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brass-glow">
            {h.eyebrow}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mt-3 text-balance">
            {h.pageTitle}
          </h1>
          <p className="text-cream/75 text-lg mt-4 leading-relaxed">{h.pageSubtitle}</p>
        </div>
      </header>

      <main className="bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-ink-soft text-lg leading-relaxed">{h.intro}</p>

          <ArabesqueDivider className="my-10" />

          <div className="flex flex-col gap-8">
            {sections.map(({ icon: Icon, title, body, href, link }) => (
              <section key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-11 h-11 rounded-[3px] bg-indigo-wash flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-indigo" weight="duotone" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold text-ink leading-snug">{title}</h2>
                  <p className="text-ink-soft leading-relaxed mt-2">{body}</p>
                  {href && link && (
                    <Link
                      href={href}
                      className="inline-block mt-2 text-sm font-semibold text-indigo underline underline-offset-4 hover:text-terracotta"
                    >
                      {link} →
                    </Link>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-[4px] border border-rule bg-card p-6 sm:p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">{h.ctaTitle}</h2>
            <p className="text-ink-soft mt-2">{h.ctaBody}</p>
            <div className="flex flex-wrap gap-3 justify-center mt-5">
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg"
              >
                {h.ctaButton}
              </a>
              <Link href={`/${lang}/contact`} className="btn-brass !px-5 !py-2.5 !text-sm">
                {h.ctaSecondary}
              </Link>
            </div>
            <p className="text-xs text-ink-muted mt-4">
              {SITE.phone}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
