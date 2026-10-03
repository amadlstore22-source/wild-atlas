import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { formatDate } from "@/lib/format-date";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

/** One legal document in one language. `updated` is an ISO date. */
export interface LegalDoc {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

/** What a per-locale content file needs from the page to build its sections. */
export interface LegalCtx {
  lang: string;
  mail: ReactNode;
}

/**
 * The page chrome around the document. These were hardcoded English, so the
 * French, Spanish, German, Italian and Arabic legal pages opened with "Back
 * to home" and "Last updated" even where the body was translated.
 */
const LABELS: Record<string, { eyebrow: string; back: string; updated: string; toc: string }> = {
  en: { eyebrow: "Legal", back: "Back to home", updated: "Last updated:", toc: "On this page" },
  fr: { eyebrow: "Mentions légales", back: "Retour à l’accueil", updated: "Dernière mise à jour :", toc: "Sur cette page" },
  es: { eyebrow: "Legal", back: "Volver al inicio", updated: "Última actualización:", toc: "En esta página" },
  de: { eyebrow: "Rechtliches", back: "Zur Startseite", updated: "Zuletzt aktualisiert:", toc: "Auf dieser Seite" },
  it: { eyebrow: "Note legali", back: "Torna alla home", updated: "Ultimo aggiornamento:", toc: "In questa pagina" },
  ar: { eyebrow: "قانوني", back: "العودة إلى الرئيسية", updated: "آخر تحديث:", toc: "في هذه الصفحة" },
};

/**
 * Shared chrome for legal documents (privacy, terms, cookies). A cold-palette
 * header, a sticky table-of-contents on the left, and consistently styled prose
 * on the right. Sections are passed in as data so each page just supplies its
 * content; layout + typography stay identical across all legal pages.
 */
export default function LegalPage({
  lang,
  title,
  intro,
  updated,
  sections,
}: {
  lang: string;
  title: string;
  intro?: ReactNode;
  /** ISO date, formatted in the page's language. */
  updated: string;
  sections: LegalSection[];
}) {
  const t = LABELS[lang] ?? LABELS.en;
  return (
    <div className="tex-plaster">
      {/* Header band */}
      <header className="border-b border-rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-indigo transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" /> {t.back}
          </Link>
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h1 className="font-display text-ink font-bold leading-[1.05] mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {title}
          </h1>
          {intro && <p className="text-ink-soft text-lg leading-relaxed max-w-2xl">{intro}</p>}
          <p className="text-ink-muted text-sm mt-6">{t.updated} {formatDate(updated, lang)}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">

          {/* Sticky table of contents */}
          <nav aria-label={t.toc} className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted mb-4">{t.toc}</p>
              <ol className="space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-2.5 text-ink-soft hover:text-indigo transition-colors leading-snug"
                    >
                      <span className="text-ink-muted tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Document body */}
          <div className="legal-prose max-w-[68ch]">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 mb-10">
                <h2 className="font-display text-ink text-2xl font-bold mb-3 flex items-baseline gap-3">
                  <span className="text-saffron text-base tabular-nums font-body font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="text-ink-soft leading-relaxed space-y-3">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
