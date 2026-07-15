import Link from "next/link";
import { Envelope, Phone, MapPin, PersonSimpleBike, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SITE, SOCIAL, TRIPADVISOR, SISTER_SITE } from "@/lib/constants";
import { STATS } from "@/lib/stats";
import NewsletterForm from "@/components/ui/NewsletterForm";
import TripAdvisorBadge from "@/components/ui/TripAdvisorBadge";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const SOCIAL_ICONS = [
  {
    href: SOCIAL.instagram,
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: SOCIAL.facebook,
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: `https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20tour`,
    label: "WhatsApp",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ lang, dict }: Props) {
  const ADVENTURES = [
    { label: dict.categories.trekking, href: `/${lang}/categories/trekking` },
    { label: dict.categories.desertTours, href: `/${lang}/categories/desert` },
    { label: dict.categories.dayTours, href: `/${lang}/categories/day-tours` },
    { label: dict.categories.culturalTours, href: `/${lang}/categories/cultural` },
    { label: dict.hero.fromMarrakech, href: `/${lang}/tours?origin=marrakech` },
    { label: dict.hero.fromAgadir, href: `/${lang}/tours?origin=agadir` },
  ];

  const DESTINATIONS_LINKS = [
    { label: "Marrakech", href: `/${lang}/destinations/marrakech` },
    { label: "Jbel Toubkal", href: `/${lang}/destinations/high-atlas` },
    { label: "Sahara Desert", href: `/${lang}/destinations/sahara` },
    { label: "Fes el-Bali", href: `/${lang}/destinations/fes` },
    { label: "Chefchaouen", href: `/${lang}/destinations/chefchaouen` },
    { label: "Agadir", href: `/${lang}/destinations/agadir` },
    { label: "Ouzoud Falls", href: `/${lang}/destinations/ouzoud` },
    { label: "Essaouira", href: `/${lang}/destinations/essaouira` },
  ];

  const COMPANY = [
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.tours, href: `/${lang}/tours` },
    { label: dict.nav.gallery, href: `/${lang}#gallery` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
    { label: "FAQ", href: `/${lang}/contact#faq` },
    { label: "Privacy Policy", href: `/${lang}/privacy` },
    { label: "Terms & Conditions", href: `/${lang}/terms` },
    { label: "Cookie Policy", href: `/${lang}/cookies` },
  ];

  return (
    <footer className="tex-indigo text-cream relative">
      {/* Saffron hairline where the page meets the footer */}
      <div className="h-px w-full bg-saffron/40" />
      {/* Top bar — trust */}
      <div className="border-b border-saffron/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-cream/70">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1.5">
                <span className="text-brass-glow">★★★★★</span>
                <span>{TRIPADVISOR.rating.toFixed(1)} average rating</span>
              </span>
              <span className="hidden sm:block text-cream/25">·</span>
              <span>{STATS.travellers} happy travellers</span>
              <span className="hidden sm:block text-cream/25">·</span>
              <span>Licensed tour operator since {SITE.foundedYear}</span>
              <span className="hidden sm:block text-cream/25">·</span>
              <span>Certified Berber guides</span>
            </div>
            <span className="text-cream/45 hidden md:block">Marrakech, Morocco</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-[3px] bg-saffron/15 text-brass-glow font-display text-lg font-bold" aria-hidden>
                ⵣ
              </span>
              <span className="font-display font-semibold text-2xl text-cream">Marrakech <span className="text-brass-glow">Eco Tours</span></span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed mb-5 max-w-xs">
              {dict.footer.tagline}
            </p>
            <div className="flex gap-2.5 mb-6">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-[3px] bg-saffron/12 flex items-center justify-center text-cream/65 hover:text-brass-glow hover:bg-saffron/20 transition-all"
                >
                  {s.svg}
                </a>
              ))}
            </div>
            <div className="flex items-start gap-2 text-xs text-cream/60">
              <MapPin className="w-3.5 h-3.5 text-brass-glow shrink-0 mt-0.5" />
              <span>Marrakech, Morocco<br />Open daily, 08:00 to 20:00</span>
            </div>
            <TripAdvisorBadge variant="dark" className="mt-5" />
          </div>

          {/* Adventures */}
          <div>
            <h3 className="font-semibold text-cream text-xs mb-4 uppercase tracking-[0.18em] font-body">{dict.footer.explore}</h3>
            <ul className="space-y-2.5 text-sm text-cream/65">
              {ADVENTURES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-glow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-cream text-xs mb-4 uppercase tracking-[0.18em] font-body">{dict.footer.destinations}</h3>
            <ul className="space-y-2.5 text-sm text-cream/65">
              {DESTINATIONS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-glow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-cream text-xs mb-4 uppercase tracking-[0.18em] font-body">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2.5 text-sm text-cream/65">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brass-glow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-cream text-xs mb-4 uppercase tracking-[0.18em] font-body">{dict.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-cream/65">
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20tour`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 hover:text-brass-glow transition-colors"
                >
                  <Envelope className="w-4 h-4 text-brass-glow shrink-0 mt-0.5" />
                  <span className="break-all">{SITE.emailDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneDial}`}
                  className="flex items-center gap-2.5 hover:text-brass-glow transition-colors"
                >
                  <Phone className="w-4 h-4 text-brass-glow shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li className="pt-1 text-cream/60 text-xs leading-relaxed">
                {dict.contact.responseValue}<br />
                English · French · Arabic · Spanish
              </li>
            </ul>
          </div>
        </div>

        {/* Sister brand — same team, different sport. Full-width related-service band. */}
        <a
          href={SISTER_SITE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-[4px] border border-saffron/25 bg-saffron/[0.06] px-5 py-4 mb-4 hover:border-saffron/50 hover:bg-saffron/10 transition-colors"
        >
          <span className="grid place-items-center w-11 h-11 rounded-[3px] bg-saffron/15 text-brass-glow shrink-0">
            <PersonSimpleBike className="w-6 h-6" weight="duotone" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-cream text-sm sm:text-base font-semibold leading-tight">{SISTER_SITE.name}</span>
              <span className="text-cream/40 text-[0.6rem] uppercase tracking-wider border border-cream/20 rounded-[2px] px-1.5 py-0.5 hidden sm:inline">Sister brand</span>
            </div>
            <p className="text-cream/60 text-xs sm:text-sm leading-snug mt-0.5">{SISTER_SITE.blurb}</p>
          </div>
          <span className="flex items-center gap-1.5 text-brass-glow text-xs font-semibold shrink-0 group-hover:gap-2.5 transition-all">
            <span className="hidden sm:inline">Visit site</span>
            <ArrowUpRight className="w-4 h-4" weight="bold" />
          </span>
        </a>

        {/* Newsletter */}
        <div className="border-t border-brass/15 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <p className="text-cream text-sm font-semibold">{dict.footer.newsletter}</p>
            <p className="text-cream/60 text-xs mt-0.5">No spam. Occasional travel tips and exclusive offers. Unsubscribe anytime.</p>
          </div>
          <div className="sm:min-w-[340px]">
            <NewsletterForm placeholder="your@email.com" buttonLabel={dict.footer.newsletterBtn} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brass/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${lang}/privacy`} className="hover:text-brass-glow transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-brass-glow transition-colors">{dict.footer.terms}</Link>
            <Link href={`/${lang}/cookies`} className="hover:text-brass-glow transition-colors">Cookies</Link>
            <a href={`mailto:${SITE.email}`} className="hover:text-brass-glow transition-colors">{dict.footer.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
