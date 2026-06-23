import Link from "next/link";
import Image from "next/image";
import { Envelope, WhatsappLogo, ArrowRight, ShieldCheck, Clock, Star } from "@phosphor-icons/react/dist/ssr";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function CTABanner({ dict, lang = "en" }: Props) {
  const TRUST = [
    { icon: ShieldCheck, text: dict.cta.trust1 },
    { icon: Clock, text: dict.cta.trust2.replace("{hours}", String(SITE.responseHours)) },
    { icon: Star, text: dict.cta.trust3 },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[420px]">

            {/* Left: text content */}
            <div className="p-10 sm:p-14 flex flex-col justify-center">
              <h2 className="font-serif text-white font-bold leading-[1.05] mb-4 reveal-up"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                {dict.cta.title}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md text-sm">
                {dict.cta.subtitle.replace("{tourCount}", String(SITE.tourCount))}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href={`/${lang}/tours`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sunset text-white font-bold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all shadow-xl shadow-sunset/25"
                >
                  {dict.cta.browseAll}
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Link>
                <a
                  href={whatsappUrl(WHATSAPP_MESSAGES.custom)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba5a] active:scale-[0.98] transition-all"
                >
                  <WhatsappLogo className="w-4 h-4" weight="fill" />
                  {dict.cta.whatsapp}
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {TRUST.map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-white/45 text-xs">
                    <t.icon className="w-3.5 h-3.5 text-sunset/70 shrink-0" weight="duotone" />
                    {t.text}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-white/45 text-xs">
                  <Envelope className="w-3.5 h-3.5 text-sunset/70 shrink-0" weight="duotone" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-white/75 transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: image panel */}
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=840&q=85"
                alt="Sahara desert at sunset"
                fill
                className="object-cover"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/20 to-transparent" />
              {/* Floating review badge */}
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl max-w-[200px]">
                <div className="flex mb-2">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-sunset" weight="fill" />
                  ))}
                </div>
                <p className="text-charcoal text-xs leading-relaxed font-medium italic">
                  &ldquo;Best trip of my life. Do not hesitate.&rdquo;
                </p>
                <p className="text-charcoal/40 text-xs mt-2 font-semibold">- Verified Traveller</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
