"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import {
  List, X, CaretDown, Globe, CurrencyCircleDollar,
  SunHorizon, Footprints, Tent, Compass,
} from "@phosphor-icons/react";
import { useCurrency, CURRENCIES, CURRENCY_SYMBOL, type Currency } from "@/lib/currency";
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
  const [curOpen, setCurOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency } = useCurrency();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    setScrolled((prev) => (prev !== next ? next : prev));
  });

  const NAV_ADVENTURES = [
    { label: dict.categories.dayTours, href: `/${lang}/categories/day-tours`, Icon: SunHorizon },
    { label: dict.categories.trekking, href: `/${lang}/categories/trekking`, Icon: Footprints },
    { label: dict.categories.desertTours, href: `/${lang}/categories/desert`, Icon: Tent },
    { label: dict.categories.culturalTours, href: `/${lang}/categories/cultural`, Icon: Compass },
  ];

  const NAV = [
    { label: dict.nav.tours, href: `/${lang}/tours` },
    { label: dict.nav.destinations, href: `/${lang}/destinations` },
    { label: dict.nav.gallery, href: `/${lang}#gallery` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  useEffect(() => { setOpen(false); setDropdown(false); setLangOpen(false); setCurOpen(false); }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (curRef.current && !curRef.current.contains(e.target as Node)) setCurOpen(false);
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

  function chooseCurrency(c: Currency) {
    setCurrency(c);
    setCurOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const currentLocale = LOCALES.find((l) => l.code === lang)!;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-7xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "mt-2 px-3 sm:px-4" : "mt-3 sm:mt-5 px-3 sm:px-6"
        }`}
      >
        <div
          className={`glass flex items-center justify-between rounded-[4px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "h-14 px-3 sm:px-4 shadow-[0_8px_30px_rgba(31,26,22,0.12)]" : "h-16 lg:h-[4.5rem] px-4 sm:px-6"
          }`}
        >
          {/* Wordmark — with the Amazigh yaz (ⵣ) mark */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5 shrink-0 group">
            <span className="grid place-items-center w-9 h-9 rounded-[3px] bg-indigo text-brass-glow shadow-[0_2px_8px_rgba(43,58,103,0.28)]">
              <span className="font-display text-lg font-bold leading-none" aria-hidden>ⵣ</span>
            </span>
            <span className="font-display text-[1.35rem] leading-none font-semibold text-indigo hidden sm:block">
              Marrakech <span className="text-saffron">Eco Tours</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <button
                aria-expanded={dropdown}
                aria-haspopup="true"
                className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-ink rounded-[3px] transition-colors hover:text-indigo"
              >
                {dict.nav.adventures}
                <CaretDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <div
                className={`absolute top-full left-0 pt-3 transition-all duration-200 ${
                  dropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-card rounded-[4px] shadow-[0_12px_40px_rgba(31,26,22,0.16)] border border-rule p-2 min-w-[220px]">
                  {NAV_ADVENTURES.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setDropdown(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-[3px] text-sm font-medium transition-colors ${
                        isActive(child.href) ? "bg-indigo/8 text-indigo" : "text-ink hover:bg-surface-sunk/70 hover:text-indigo"
                      }`}
                    >
                      <child.Icon className="w-4 h-4 text-saffron" weight="duotone" />
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
                className={`relative px-3.5 py-2 text-sm font-medium rounded-[3px] transition-colors text-ink hover:text-indigo ${
                  isActive(item.href) ? "text-indigo" : ""
                }`}
              >
                {item.label}
                {isActive(item.href) && <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-saffron" />}
              </Link>
            ))}

            {/* Currency switcher */}
            <div className="relative ml-1" ref={curRef}>
              <button
                onClick={() => setCurOpen(!curOpen)}
                aria-expanded={curOpen}
                aria-label="Change currency"
                className="flex items-center gap-1 px-2.5 py-2 rounded-[3px] text-sm font-medium text-ink hover:text-indigo transition-colors"
              >
                <CurrencyCircleDollar className="w-4 h-4" weight="duotone" />
                <span className="font-semibold">{currency}</span>
                <CaretDown className={`w-3 h-3 transition-transform ${curOpen ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <div
                className={`absolute top-full right-0 pt-3 transition-all duration-200 ${
                  curOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-card rounded-[4px] shadow-[0_12px_40px_rgba(31,26,22,0.16)] border border-rule p-2 min-w-[150px]">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => chooseCurrency(c)}
                      className={`w-full flex items-center justify-between gap-2.5 px-4 py-2 rounded-[3px] text-sm transition-colors ${
                        c === currency ? "bg-indigo/8 text-indigo font-semibold" : "text-ink hover:bg-surface-sunk/70 hover:text-indigo"
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-ink-muted text-xs" aria-hidden>{CURRENCY_SYMBOL[c].trim()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-label="Change language"
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-[3px] text-sm font-medium text-ink hover:text-indigo transition-colors"
              >
                <Globe className="w-4 h-4" weight="duotone" />
                <span aria-hidden>{currentLocale.flag}</span>
                <CaretDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} weight="bold" />
              </button>
              <div
                className={`absolute top-full right-0 pt-3 transition-all duration-200 ${
                  langOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-card rounded-[4px] shadow-[0_12px_40px_rgba(31,26,22,0.16)] border border-rule p-2 min-w-[170px]">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] text-sm transition-colors ${
                        l.code === lang ? "bg-indigo/8 text-indigo font-semibold" : "text-ink hover:bg-surface-sunk/70 hover:text-indigo"
                      }`}
                    >
                      <span aria-hidden>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Link href={`/${lang}/contact`} className="btn-brass ml-2 !px-5 !py-2.5 !text-sm">
              {dict.nav.bookNow}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-[3px] text-indigo hover:bg-surface-sunk/70 transition-colors"
          >
            {open ? <X className="w-5.5 h-5.5" weight="bold" /> : <List className="w-5.5 h-5.5" weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-indigo-deep/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <motion.div
          initial={false}
          animate={{ y: open ? 0 : -16, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-2 left-2 right-2 rounded-[4px] bg-card border border-rule shadow-[0_20px_60px_rgba(31,26,22,0.28)] max-h-[92vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-rule">
            <span className="font-display text-xl font-semibold text-indigo flex items-center gap-2">
              <span aria-hidden className="text-saffron">ⵣ</span>
              Marrakech <span className="text-saffron">Eco Tours</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid place-items-center w-9 h-9 rounded-[3px] text-indigo hover:bg-surface-sunk/70">
              <X className="w-5 h-5" weight="bold" />
            </button>
          </div>
          <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            <Link href={`/${lang}/tours`} onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-[3px] font-semibold text-sm ${isActive(`/${lang}/tours`) ? "bg-indigo/8 text-indigo" : "text-ink hover:bg-surface-sunk/70"}`}>
              {dict.nav.tours}
            </Link>

            <div className="px-4 pt-3 pb-1">
              <div className="eyebrow mb-2">{dict.nav.adventures}</div>
              {NAV_ADVENTURES.map((child) => (
                <Link key={child.href} href={child.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-[3px] text-sm transition-colors ${isActive(child.href) ? "bg-indigo/8 text-indigo font-medium" : "text-ink hover:bg-surface-sunk/70 hover:text-indigo"}`}>
                  <child.Icon className="w-4 h-4 text-saffron" weight="duotone" />
                  {child.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-rule mx-4 my-1" />

            {[
              { label: dict.nav.destinations, href: `/${lang}/destinations` },
              { label: dict.nav.gallery, href: `/${lang}#gallery` },
              { label: dict.nav.blog, href: `/${lang}/blog` },
              { label: dict.nav.about, href: `/${lang}/about` },
              { label: dict.nav.contact, href: `/${lang}/contact` },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-[3px] font-semibold text-sm ${isActive(item.href) ? "bg-indigo/8 text-indigo" : "text-ink hover:bg-surface-sunk/70"}`}>
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-rule mx-4 my-1" />
            <div className="px-4 py-2">
              <div className="eyebrow mb-2">Currency</div>
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((c) => (
                  <button key={c} onClick={() => chooseCurrency(c)}
                    className={`px-3 py-1.5 rounded-[3px] text-xs font-semibold border transition-colors ${c === currency ? "bg-indigo text-cream border-indigo" : "bg-card text-ink border-rule hover:border-indigo hover:text-indigo"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="eyebrow mb-2">Language</div>
              <div className="flex flex-wrap gap-2">
                {LOCALES.map((l) => (
                  <button key={l.code} onClick={() => { switchLocale(l.code); setOpen(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-xs font-semibold border transition-colors ${l.code === lang ? "bg-indigo text-cream border-indigo" : "bg-card text-ink border-rule hover:border-indigo hover:text-indigo"}`}>
                    <span aria-hidden>{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 pb-2 px-1">
              <Link href={`/${lang}/contact`} onClick={() => setOpen(false)} className="btn-brass w-full">
                {dict.nav.bookNow}
              </Link>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
