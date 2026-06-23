import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LOCALES, DEFAULT_LOCALE, hasLocale, getDictionary, type Locale } from "./dictionaries";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
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
  alternates: {
    canonical: "https://marrakechecotours.com",
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}`])
    ),
  },
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
      className={`${dmSans.variable} ${cormorant.variable} h-full`}
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
        <Header lang={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={locale} dict={dict} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
