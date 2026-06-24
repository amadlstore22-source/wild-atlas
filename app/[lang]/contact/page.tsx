import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/sections/ContactForm";
import { Envelope, Phone, MapPin, Clock, WhatsappLogo, ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
type LangParams = { params: Promise<{ lang: string }> };

const FAQ = [
  { q: "Do you provide private tours?", a: "Yes — all of our tours can be arranged as private departures. Contact us with your group size and preferred dates and we'll build a custom package." },
  { q: "How do I pay the deposit?", a: "We accept PayPal deposits to secure your booking. Full payment is due 14 days before your departure date." },
  { q: "What languages do your guides speak?", a: "Our guides speak Arabic, Berber (Tamazight), French, and English. Spanish-speaking guides available on request." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to 14 days before departure. Cancellations within 14 days are subject to a 50% fee. No-shows are charged in full." },
  { q: "Is travel insurance required?", a: "Travel insurance is not required but strongly recommended, especially for trekking tours. We suggest a policy that covers trip cancellation, medical expenses, and emergency evacuation." },
  { q: "What group sizes do you accommodate?", a: "Our tours run with a minimum of 2 participants. We offer both shared-group and fully private departures. Contact us with your group size and preferred dates and we'll build the right package — no upper limit for private bookings." },
  { q: "What fitness level do I need?", a: "It depends on the tour. Day trips and cultural tours suit all fitness levels. Trekking tours (Toubkal, High Atlas multi-day) require a good baseline of fitness — ability to walk 6–8 hours with a daypack. Each tour page has a difficulty rating to help you choose." },
  { q: "Do I need a visa to visit Morocco?", a: "Citizens of the EU, UK, USA, Canada, Australia, and most Western countries do not need a visa for stays under 90 days. Your passport should be valid for at least 6 months beyond your travel dates." },
  { q: "What should I pack for a Morocco tour?", a: "Light, breathable clothing for city and valley tours; warm layers for mountain treks. Modest dress is appreciated in medinas and villages. Good walking shoes are essential for almost every tour. A full packing list is included in your booking confirmation." },
  { q: "Can you accommodate dietary requirements?", a: "Yes. Please let us know about dietary requirements (vegetarian, vegan, gluten-free, halal, allergies) when booking and we will arrange suitable meals. Moroccan cuisine is naturally vegetarian-friendly." },
  { q: "Are your tours suitable for families with children?", a: "Many of our day tours and cultural tours are excellent for families with children aged 6 and above. Trekking tours are better suited to older children and teenagers." },
  { q: "What happens if weather forces a change of plan?", a: "Safety is always our first priority. If severe weather makes a planned route dangerous, our guides will adapt the itinerary to a safe alternative. In the rare case a tour must be cancelled entirely due to weather, you will receive a full refund or the option to reschedule." },
];

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
      images: [{ url: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=80", width: 1200, height: 630, alt: "Contact Marrakech Eco Tours" }],
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

  const CONTACT_INFO = [
    { icon: Envelope, label: dict.contact.email, value: "hello@marrakechecotours.com", href: "mailto:hello@marrakechecotours.com" },
    { icon: Phone, label: dict.contact.phone, value: "+212 600 000 000", href: "tel:+212600000000" },
    { icon: MapPin, label: dict.contact.basedIn, value: "Marrakech, Morocco", href: null },
    { icon: Clock, label: dict.contact.responseTime, value: dict.contact.responseValue, href: null },
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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    <div className="min-h-screen moroccan-bg">
      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-[420px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Marrakech rooftop terrace with Atlas Mountains view at sunset"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-4">Get in Touch</p>
          <h1 className="font-serif text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            {dict.contact.pageTitle}
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">{dict.contact.pageSubtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* WhatsApp CTA — primary action */}
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20tour`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-[#25D366] rounded-2xl text-white hover:bg-[#1ebe5a] transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <WhatsappLogo className="w-5 h-5 text-white" weight="fill" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-0.5">Fastest Reply</div>
                <div className="font-bold text-base">Chat on WhatsApp</div>
                <div className="text-white/70 text-xs mt-0.5">Typically replies within {SITE.responseHours}h</div>
              </div>
            </a>

            {/* Contact info cards */}
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mb-0.5">
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
            <div className="p-5 bg-forest/5 border border-forest/15 rounded-2xl">
              <ChatCircleText className="w-6 h-6 text-forest mb-3" weight="duotone" />
              <p className="text-charcoal font-semibold text-sm mb-1">Planning something custom?</p>
              <p className="text-charcoal/55 text-xs leading-relaxed">
                Tell us your dates, group size, and what matters most — we&apos;ll build an itinerary around you.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        <div id="faq" className="mt-20">
          <h2 className="font-serif text-charcoal text-4xl font-bold mb-10">
            {dict.contact.faqTitle}
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white rounded-2xl shadow-sm group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-charcoal hover:text-forest transition-colors list-none">
                  {item.q}
                  <span className="text-charcoal/40 group-open:rotate-45 transition-transform text-xl ml-4 shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
