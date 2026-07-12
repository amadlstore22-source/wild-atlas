import React from "react";
import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieBanner from "@/components/ui/CookieBanner";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { LOCALES, DEFAULT_LOCALE, hasLocale, getDictionary, type Locale } from "./dictionaries";

// Manrope — clean geometric sans, closest free match to Samsung's SamsungOne.
// Used for both body and headings (the two CSS vars below both point here).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marrakech Eco Tours — Trekking, Desert Tours & Cultural Excursions",
    template: "%s | Marrakech Eco Tours",
  },
  description:
    "Discover world-class trekking, hiking, cultural tours and excursions with Marrakech Eco Tours. Professional guides, breathtaking landscapes, unforgettable experiences.",
  metadataBase: new URL("https://marrakechecotours.com"),
  openGraph: {
    type: "website",
    siteName: "Marrakech Eco Tours",
  },
  twitter: {
    card: "summary_large_image",
    site: "@marrakechecotours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // NOTE: hreflang/canonical alternates are intentionally NOT set here.
  // Layout metadata can't know the current path, so a static mapping would
  // wrongly point every page's alternates at the locale homepage. Each page's
  // own generateMetadata defines path-correct alternates instead.
};

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${manrope.variable}${isRtl ? ` ${ibmPlexArabic.variable}` : ""} h-full`}
    >
      <head>
        {LOCALES.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://marrakechecotours.com/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://marrakechecotours.com/en" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <SmoothScroll />
        <ScrollProgress />
        {/* Third atmospheric orb — mid-page forest green */}
        <div className="orb-mid" aria-hidden="true" />
        <Header lang={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} dict={dict} />
        <WhatsAppButton />
        <CookieBanner />
        <Toaster richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
