import Link from "next/link";
import { Mountains, Envelope, Phone } from "@phosphor-icons/react/dist/ssr";
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
    href: SOCIAL.youtube,
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
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
    { label: "Day Tours", href: `/${lang}/categories/day-tours` },
    { label: "Trekking", href: `/${lang}/categories/trekking` },
    { label: "Desert Tours", href: `/${lang}/categories/desert` },
    { label: "Imperial Cities", href: `/${lang}/categories/imperial` },
    { label: "Cultural Tours", href: `/${lang}/categories/cultural` },
    { label: dict.hero.fromMarrakech, href: `/${lang}/tours?origin=marrakech` },
    { label: dict.hero.fromAgadir, href: `/${lang}/tours?origin=agadir` },
  ];

  const COMPANY = [
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.tours, href: `/${lang}/tours` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
    { label: "FAQ", href: `/${lang}/contact#faq` },
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-serif font-bold text-xl text-white mb-4">
              <Mountains className="w-6 h-6 text-sunset shrink-0" />
              {SITE.name}
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              {dict.footer.tagline}
            </p>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/50 hover:text-sunset hover:bg-white/15 transition-all"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Adventures */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-widest">{dict.footer.explore}</h3>
            <ul className="space-y-2.5 text-sm text-white/55">
              {ADVENTURES.map((l) => (
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
            <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-widest">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2.5 text-sm text-white/55">
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
            <h3 className="font-semibold text-white text-sm mb-4 uppercase tracking-widest">{dict.footer.contact}</h3>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 hover:text-sunset transition-colors group"
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
              <li className="text-white/35 text-xs leading-relaxed pt-1">
                {dict.contact.responseValue}.<br />
                We speak English, French, Arabic &amp; Spanish.
              </li>
            </ul>

            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/35">
                <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</span>
                Private & custom group adventures
              </div>
              <div className="flex items-center gap-2 text-xs text-white/35">
                <span className="w-4 h-4 rounded-full bg-sunset/20 flex items-center justify-center text-sunset">✓</span>
                {dict.cta.trust1}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} {SITE.name}. {dict.footer.rights}</p>
          <div className="flex gap-5">
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{dict.footer.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
