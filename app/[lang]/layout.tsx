import React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
// leaflet.css is imported by the map components themselves (ToursMap,
// TourLocationMapInner) so Next scopes it to the chunks that load a map. From
// here it was a render-blocking stylesheet on all 802 pages.
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieBanner from "@/components/ui/CookieBanner";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CurrencyProvider from "@/components/ui/CurrencyProvider";
import VercelAnalytics from "@/components/ui/VercelAnalytics";
import { Toaster } from "@/components/ui/sonner";
import { LOCALES, DEFAULT_LOCALE, hasLocale, getDictionary, type Locale } from "./dictionaries";
import { ogBase } from "@/lib/seo/open-graph";

// Cormorant Garamond — the display serif. Elegant, high-contrast, editorial —
// the "riad luxury" voice for all headlines. Self-hosted via next/font (CSP-safe).
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Inter — the body/UI sans. Neutral, highly legible, carries the reading load.
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Must be generateMetadata, not a static `metadata` export: og:locale depends
// on which locale is rendering, and a static object cannot see `params`. Pages
// that declare their own `openGraph` replace this one wholesale (Next does not
// deep-merge), so they spread `ogBase(lang)` themselves — this covers the rest
// (guides, news, legal pages), which inherit the layout untouched.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: {
      default: "Marrakech Eco Tours — Trekking, Desert Tours & Cultural Excursions",
      template: "%s | Marrakech Eco Tours",
    },
    description:
      "Discover world-class trekking, hiking, cultural tours and excursions with Marrakech Eco Tours. Professional guides, breathtaking landscapes, unforgettable experiences.",
    metadataBase: new URL("https://marrakechecotours.com"),
    openGraph: {
      ...ogBase(lang),
      // Default share card for any page that doesn't set its own image (about,
      // contact, guides, destinations index, legal pages). Branded, on an
      // authentic first-party Toubkal summit photo. See scripts/build_og_image.mjs.
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Marrakech Eco Tours — trekking the High Atlas with certified Berber guides" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@marrakechecotours",
      images: ["/og-image.jpg"],
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
}

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
      className={`${cormorant.variable} ${inter.variable}${isRtl ? ` ${ibmPlexArabic.variable}` : ""} h-full`}
    >
      <head>
        {/* No arcgisonline preconnect here. Map tiles do come from ArcGIS, and
            the hint is worth ~300 ms of mobile LCP — but only on the tour pages,
            which are the only route that renders a map. In this shared layout it
            fired on all ~900 pages and Lighthouse flagged it as unused on the
            blog. It now lives in components/map/TourLocationMap.tsx, next to the
            component that actually requests the tiles.

            No preconnect to images.pexels.com / images.unsplash.com.
            Those were added on the theory that the browser reaches the origins
            directly, but next/image proxies every remote source through
            /_next/image on our own domain — the SERVER fetches the original,
            never the client. Lighthouse confirmed both connections were opened
            and then never used on the homepage and the tour pages alike.
            An unused preconnect is not free: it holds a socket and competes
            with real requests during the critical path.

            The remote-origin cost was real, but it landed on the Vercel image
            optimiser rather than the browser, so a client-side hint could never
            have fixed it. Every LCP-candidate image is now self-hosted from
            /public/gallery (see scripts/fetch-hero-images.ps1), which removes
            the hop at its source. Both origins are still allowed in
            next.config.ts remotePatterns for the lazy, below-the-fold images
            that remain remote — those load after paint and cost nothing. */}
        {/* NO hreflang here — see the note on the `metadata` export above. A
            layout cannot know the current path, so emitting alternates here
            pointed every one of the 802 pages at the locale HOMEPAGE, on top of
            the correct path-specific set from each page's generateMetadata.
            Google saw two conflicting hreflang="en" targets per page, and drops
            non-reciprocal clusters wholesale — so hreflang was doing nothing
            site-wide. Per-page generateMetadata already covers every route. */}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CurrencyProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Header lang={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={locale} dict={dict} />
          <WhatsAppButton dict={dict} />
          <CookieBanner lang={locale} dict={dict} />
          <GoogleAnalytics />
          <Toaster richColors />
          <VercelAnalytics />
        </CurrencyProvider>
      </body>
    </html>
  );
}
