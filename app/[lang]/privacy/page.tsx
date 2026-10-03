import type { Metadata } from "next";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import LegalPage, { type LegalCtx, type LegalDoc } from "@/components/legal/LegalPage";
import en from "./content/en";
import fr from "./content/fr";
import es from "./content/es";
import de from "./content/de";
import it from "./content/it";
import ar from "./content/ar";

type LangParams = { params: Promise<{ lang: string }> };

const UPDATED = "2026-09-28";

/**
 * One content file per language. Until 2026-10-03 the policy existed only in
 * English, so /fr, /es, /de, /it and /ar served English text under a
 * translated lang attribute and an identical title in every locale. The
 * Terms state that the English version prevails if translations differ.
 */
const CONTENT: Record<Locale, (ctx: LegalCtx) => LegalDoc> = { en, fr, es, de, it, ar };

/**
 * Per-locale metadata. This was a static `metadata` export, which cannot see
 * the locale — so all six language versions shipped with no canonical and no
 * hreflang, leaving six near-identical URLs competing as duplicates.
 *
 * follow: false is deliberate and preserved: legal boilerplate should not spend
 * link equity on outbound links.
 */
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
  const doc = CONTENT[lang]({ lang, mail: null });
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    robots: { index: true, follow: false },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/privacy`,
      languages: hreflangForPath(LOCALES, "/privacy"),
    },
  };
}

export default async function PrivacyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const mail = <a href={`mailto:${SITE.email}`}>{SITE.emailDisplay}</a>;
  const doc = CONTENT[lang]({ lang, mail });

  return <LegalPage lang={lang} title={doc.title} intro={doc.intro} updated={UPDATED} sections={doc.sections} />;
}
