import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, GoogleLogo, WhatsappLogo, Heart } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE, TRIPADVISOR, GOOGLE_REVIEW_URL, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { hreflangForPath } from "@/lib/seo/hreflang";

type LangParams = { params: Promise<{ lang: string }> };

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = fallback(await getDictionary(lang));
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    // This is a thank-you / share page handed out after a tour — it should not
    // compete in search or dilute the commercial pages, so keep it out of the
    // index while staying followable.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/review`,
      languages: hreflangForPath(LOCALES, "/review"),
    },
  };
}

// The review page copy lives here with an English fallback, mirroring how the
// rest of the site degrades gracefully before a locale string exists.
type ReviewCopy = {
  metaTitle: string; metaDesc: string;
  eyebrow: string; heading: string; sub: string;
  matterTitle: string; matterBody: string;
  tripadvisor: string; google: string; whatsapp: string;
  thanks: string;
};
function fallback(dict: unknown): ReviewCopy {
  const d = (dict as { review?: Partial<ReviewCopy> }).review ?? {};
  return {
    metaTitle: d.metaTitle ?? "Leave a Review — Marrakech Eco Tours",
    metaDesc: d.metaDesc ?? "Loved your Morocco tour? Share a review — it means the world to our small family team of Berber guides.",
    eyebrow: d.eyebrow ?? "Thank you for travelling with us",
    heading: d.heading ?? "How was your adventure?",
    sub: d.sub ?? "Your happiness is the whole reason we do this. If our guides and the trip made your Morocco memorable, a few words would mean everything to our small family team — and it helps other travellers find us.",
    matterTitle: d.matterTitle ?? "Why it matters",
    matterBody: d.matterBody ?? "We're a family of licensed Berber guides, not a booking platform. We don't spend on advertising — travellers find us through the stories of travellers who came before. Your review is how the next family, couple, or solo adventurer decides to trust us.",
    tripadvisor: d.tripadvisor ?? "Review us on Tripadvisor",
    google: d.google ?? "Review us on Google",
    whatsapp: d.whatsapp ?? "Send us a private message instead",
    thanks: d.thanks ?? "From Lahsen, Mohamed, Smail and the whole team — thank you. Bslama!",
  };
}

export default async function ReviewPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = fallback(await getDictionary(lang));
  const wa = whatsappUrl(WHATSAPP_MESSAGES.general);

  return (
    <main className="min-h-[100dvh] bg-cream flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        {/* Card */}
        <div className="bg-card rounded-[6px] border border-sand-dark shadow-riad overflow-hidden">
          <div className="bg-forest px-8 pt-10 pb-8 text-center text-white">
            <p className="text-white/85 text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t.eyebrow}</p>
            <div className="flex justify-center gap-1 mb-4" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} weight="fill" className="w-7 h-7 text-sunset" />
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{t.heading}</h1>
            <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-md mx-auto">{t.sub}</p>
          </div>

          <div className="px-8 py-8 space-y-3">
            {/* Tripadvisor — the real, verified listing */}
            <Link
              href={TRIPADVISOR.writeReviewUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-[#34e0a1] text-[#000] font-bold text-sm hover:brightness-95 transition"
            >
              <Star weight="fill" className="w-5 h-5" />
              {t.tripadvisor}
            </Link>

            {/* Google — only shown once a real review URL is configured */}
            {GOOGLE_REVIEW_URL ? (
              <Link
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-white border border-sand-dark text-charcoal font-bold text-sm hover:bg-sand-light transition"
              >
                <GoogleLogo weight="bold" className="w-5 h-5" />
                {t.google}
              </Link>
            ) : null}

            {/* Private fallback for anyone not comfortable posting publicly */}
            <Link
              href={wa}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-full bg-transparent border border-forest/25 text-forest font-semibold text-sm hover:bg-forest/5 transition"
            >
              <WhatsappLogo weight="fill" className="w-5 h-5" />
              {t.whatsapp}
            </Link>
          </div>

          {/* Why it matters */}
          <div className="px-8 pb-8">
            <div className="rounded-[4px] bg-sand-light border border-sand-dark p-5">
              <p className="text-charcoal text-xs font-bold uppercase tracking-widest mb-2">{t.matterTitle}</p>
              <p className="text-ink-soft text-sm leading-relaxed">{t.matterBody}</p>
            </div>
          </div>

          {/* Signature */}
          <div className="px-8 pb-9 text-center">
            <p className="inline-flex items-center gap-2 text-forest text-sm font-medium">
              <Heart weight="fill" className="w-4 h-4 text-sunset" />
              {t.thanks}
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href={`/${lang}`} className="text-ink-muted text-sm hover:text-forest transition-colors">
            {SITE.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
