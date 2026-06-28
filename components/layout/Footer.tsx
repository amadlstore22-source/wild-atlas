import Link from "next/link";
import { Mountains, Envelope, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { SITE, SOCIAL } from "@/lib/constants";
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
    { label: "Trekking Tours", href: `/${lang}/categories/trekking` },
    { label: "Desert Tours", href: `/${lang}/categories/desert` },
    { label: "Hiking Trips", href: `/${lang}/categories/hiking` },
    { label: "Cultural Tours", href: `/${lang}/categories/cultural` },
    { label: "Day Tours", href: `/${lang}/categories/day-tours` },
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
    { label: dict.nav.contact, href: `/${lang}/contact` },
    { label: "FAQ", href: `/${lang}/contact#faq` },
    { label: "Privacy Policy", href: `/${lang}/privacy` },
    { label: "Terms & Conditions", href: `/${lang}/terms` },
  ];

  return (
    <footer className="bg-charcoal text-white">
      {/* Top bar — trust */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1.5">
                <span className="text-[#FFB800]">★★★★★</span>
                <span>4.7 average rating</span>
              </span>
              <span className="hidden sm:block text-white/15">·</span>
              <span>{SITE.clientCount} happy travelers</span>
              <span className="hidden sm:block text-white/15">·</span>
              <span>Licensed tour operator since {SITE.foundedYear}</span>
              <span className="hidden sm:block text-white/15">·</span>
              <span>Certified Berber guides</span>
              <span className="hidden sm:block text-white/15">·</span>
              <a
                href="https://www.tripadvisor.com/Search?q=marrakech+eco+tours"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00af87] transition-colors"
                aria-label="Read our reviews on TripAdvisor"
              >
                <svg viewBox="0 0 24 24" fill="#00af87" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16A8 8 0 0112 4zm-3 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3 4c-1.5 0-2.8.7-3.6 1.8l1.1.8c.5-.8 1.4-1.3 2.5-1.3s2 .5 2.5 1.3l1.1-.8C14.8 16.2 13.5 15.5 12 15.5z"/>
                </svg>
                <span>Reviews on TripAdvisor</span>
              </a>
            </div>
            <span className="text-white/25 hidden md:block">Marrakech · Morocco</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-serif font-bold text-xl text-white mb-4">
              <Mountains className="w-6 h-6 text-sunset shrink-0" />
              {SITE.name}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
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
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/16 transition-all"
                >
                  {s.svg}
                </a>
              ))}
            </div>
            <div className="flex items-start gap-2 text-xs text-white/35">
              <MapPin className="w-3.5 h-3.5 text-sunset shrink-0 mt-0.5" />
              <span>Marrakech, Morocco<br />Open Mon – Sun · 08:00 – 20:00</span>
            </div>
          </div>

          {/* Adventures */}
          <div>
            <h3 className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">{dict.footer.explore}</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              {ADVENTURES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-sunset transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">Destinations</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              {DESTINATIONS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-sunset transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-sunset transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white text-xs mb-4 uppercase tracking-widest">{dict.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-white/50">
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
                  className="flex items-start gap-2.5 hover:text-sunset transition-colors"
                >
                  <Envelope className="w-4 h-4 text-sunset shrink-0 mt-0.5" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneDial}`}
                  className="flex items-center gap-2.5 hover:text-sunset transition-colors"
                >
                  <Phone className="w-4 h-4 text-sunset shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li className="pt-1 text-white/28 text-xs leading-relaxed">
                {dict.contact.responseValue}<br />
                English · French · Arabic · Spanish
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/28">
          <p>© {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors">{dict.footer.terms}</Link>
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{dict.footer.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
