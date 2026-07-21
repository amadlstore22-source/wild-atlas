import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactForm from "@/components/sections/ContactForm";
import { Envelope, Phone, MapPin, Clock, WhatsappLogo, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import { ZelligeBand, ZelligeField } from "@/components/ui/MoroccanMotifs";
import JsonLd from "@/components/seo/JsonLd";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageSubtitle,
    openGraph: {
      title: dict.contact.pageTitle,
      description: dict.contact.pageSubtitle,
      url: `https://marrakechecotours.com/${lang}/contact`,
      images: [{ url: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&q=80", width: 1200, height: 630, alt: "Contact Marrakech Eco Tours" }],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/contact`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/contact`])),
    },
  };
}

export default async function ContactPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contact;

  const CONTACT_INFO = [
    { icon: Envelope, label: c.email, value: SITE.emailDisplay, href: `mailto:${SITE.email}` },
    { icon: Phone, label: c.phone, value: SITE.phone, href: `tel:${SITE.phoneDial}` },
    { icon: MapPin, label: c.basedIn, value: "Marrakech, Morocco", href: null },
    { icon: Clock, label: c.responseTime, value: c.responseValue, href: null },
  ];

  const FAQ = [
    { q: c.faq1Q, a: c.faq1A },
    { q: c.faq2Q, a: c.faq2A },
    { q: c.faq3Q, a: c.faq3A },
    { q: c.faq4Q, a: c.faq4A },
    { q: c.faq5Q, a: c.faq5A },
    { q: c.faq6Q, a: c.faq6A },
    { q: c.faq7Q, a: c.faq7A },
    { q: c.faq8Q, a: c.faq8A },
    { q: c.faq9Q, a: c.faq9A },
    { q: c.faq10Q, a: c.faq10A },
    { q: c.faq11Q, a: c.faq11A },
    { q: c.faq12Q, a: c.faq12A },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
    <JsonLd data={faqJsonLd} />
    <div className="moroccan-bg">
      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-[420px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=80"
          alt="Traditional Moroccan mint tea being poured in a riad"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/35 to-indigo-deep/15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.getInTouchEyebrow}</p>
          <h1 className="hero-title font-display font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            {c.pageTitle}
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">{c.pageSubtitle}</p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ZelligeField tone="clay" opacity={0.08} scale={140} />
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* WhatsApp CTA — primary action */}
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20tour`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-[#25D366] rounded-[4px] text-white hover:bg-[#1ebe5a] transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <WhatsappLogo className="w-5 h-5 text-white" weight="fill" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-0.5">{c.fastestReply}</div>
                <div className="font-bold text-base">{c.chatOnWhatsapp}</div>
                <div className="text-white/70 text-xs mt-0.5">{c.typicallyReplies.replace("{hours}", String(SITE.responseHours))}</div>
              </div>
            </a>

            {/* Contact info cards */}
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-card rounded-[4px] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink-soft uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-charcoal hover:text-forest transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-medium text-charcoal">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Custom trip nudge */}
            <div className="p-5 bg-forest/5 border border-forest/15 rounded-[4px]">
              <ChatCircleText className="w-6 h-6 text-forest mb-3" weight="duotone" />
              <p className="text-charcoal font-semibold text-sm mb-1">{c.customTripNudgeTitle}</p>
              <p className="text-ink-soft text-xs leading-relaxed">
                {c.customTripNudgeBody}
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <ContactForm lang={lang} dict={dict} />
          </div>
        </div>

        <div id="faq" className="mt-20">
          <h2 className="font-display text-charcoal text-4xl font-bold mb-10">
            {c.faqTitle}
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-card rounded-[4px] shadow-sm group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-charcoal hover:text-forest transition-colors list-none">
                  {item.q}
                  <span className="text-ink-muted group-open:rotate-45 transition-transform text-xl ml-4 shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-ink-soft leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
