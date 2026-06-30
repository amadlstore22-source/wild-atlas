"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  List, X, Mountains, CaretDown, Globe,
  SunHorizon, Footprints, Tent, Compass,
} from "@phosphor-icons/react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
];

interface Props {
  lang: Locale;
  dict: Dictionary;
}

export default function Header({ lang, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_ADVENTURES = [
    { label: "Day Tours", href: `/${lang}/categories/day-tours`, Icon: SunHorizon },
    { label: "Trekking", href: `/${lang}/categories/trekking`, Icon: Footprints },
    { label: "Desert Tours", href: `/${lang}/categories/desert`, Icon: Tent },
    { label: "Cultural Tours", href: `/${lang}/categories/cultural`, Icon: Compass },
  ];

  const NAV = [
    { label: dict.nav.tours, href: `/${lang}/tours` },
    { label: "Destinations", href: `/${lang}/destinations` },
    { label: "Gallery", href: `/${lang}#gallery` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); setLangOpen(false); }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function switchLocale(newLang: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/") || `/${newLang}`);
    setLangOpen(false);
  }

  const isLight = scrolled || open || !pathname.match(/^\/[a-z]{2}(\/)?$/);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const currentLocale = LOCALES.find((l) => l.code === lang)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-sand-dark"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <Link
            href={`/${lang}`}
            className={`flex items-center gap-2 font-serif font-bold text-xl transition-colors ${
              isLight ? "text-forest" : "text-white"
            }`}
          >
            <Mountains className="w-6 h-6" weight="duotone" />
            <span>Marrakech Eco Tours</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">

            {/* Adventures dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <button
                aria-expanded={dropdown}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-sunset ${
                  isLight ? "text-charcoal" : "text-white/90"
                }`}
              >
                Adventures
                <CaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`}
                  weight="bold"
                />
              </button>
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  dropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-sand-dark p-2 min-w-[210px]">
                  {NAV_ADVENTURES.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setDropdown(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive(child.href)
                          ? "bg-forest/8 text-forest"
                          : "text-charcoal hover:bg-sand/60 hover:text-forest"
                      }`}
                    >
                      <child.Icon className="w-4 h-4 text-forest/60" weight="duotone" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isLight ? "text-charcoal hover:text-forest" : "text-white/90 hover:text-white"
                } ${isActive(item.href) ? (isLight ? "text-forest font-semibold" : "text-white font-semibold") : ""}`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-sunset" />
                )}
              </Link>
            ))}

            {/* Language switcher */}
            <div className="relative ml-1" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isLight ? "text-charcoal hover:text-forest" : "text-white/90 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" weight="duotone" />
                <span>{currentLocale.flag}</span>
                <CaretDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <div
                className={`absolute top-full right-0 pt-2 transition-all duration-200 ${
                  langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-sand-dark p-2 min-w-[160px]">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                        l.code === lang
                          ? "bg-forest/8 text-forest font-semibold"
                          : "text-charcoal hover:bg-sand/60 hover:text-forest"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={`/${lang}/contact`}
              className="ml-2 px-5 py-2.5 rounded-full bg-sunset text-white text-sm font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-sm"
            >
              {dict.nav.bookNow}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isLight ? "text-charcoal hover:bg-sand" : "text-white hover:bg-white/10"
            }`}
          >
            {open
              ? <X className="w-6 h-6" weight="bold" />
              : <List className="w-6 h-6" weight="bold" />
            }
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-white border-b border-sand-dark shadow-2xl transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="px-4 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
            <Link
              href={`/${lang}/tours`}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl font-semibold transition-colors text-sm ${
                isActive(`/${lang}/tours`) ? "bg-forest/8 text-forest" : "text-charcoal hover:bg-sand"
              }`}
            >
              {dict.nav.tours}
            </Link>

            <div className="px-4 pt-3 pb-1">
              <div className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-2">Adventures</div>
              {NAV_ADVENTURES.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive(child.href)
                      ? "bg-forest/8 text-forest font-medium"
                      : "text-charcoal hover:bg-sand hover:text-forest"
                  }`}
                >
                  <child.Icon className="w-4 h-4 text-forest/60" weight="duotone" />
                  {child.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-sand-dark mx-4 my-1" />

            {[
              { label: "Destinations", href: `/${lang}/destinations` },
              { label: "Gallery", href: `/${lang}#gallery` },
              { label: dict.nav.blog, href: `/${lang}/blog` },
              { label: dict.nav.about, href: `/${lang}/about` },
              { label: dict.nav.contact, href: `/${lang}/contact` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-colors text-sm ${
                  isActive(item.href) ? "bg-forest/8 text-forest" : "text-charcoal hover:bg-sand"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-sand-dark mx-4 my-1" />
            <div className="px-4 py-2">
              <div className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-2">Language</div>
              <div className="flex flex-wrap gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { switchLocale(l.code); setOpen(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      l.code === lang
                        ? "bg-forest text-white border-forest"
                        : "bg-white text-charcoal border-sand-dark hover:border-forest hover:text-forest"
                    }`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 pb-2">
              <Link
                href={`/${lang}/contact`}
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-3.5 rounded-full bg-sunset text-white font-bold hover:bg-orange-600 transition-colors text-sm"
              >
                {dict.nav.bookNow}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
