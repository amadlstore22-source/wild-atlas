"use client";
import Link from "next/link";
import Image from "next/image";
import { Envelope, WhatsappLogo, ArrowRight, ShieldCheck, Clock, Star } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import { SITE, TRIPADVISOR, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
  tourCount: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTABanner({ dict, lang = "en", tourCount }: Props) {
  const TRUST = [
    { icon: ShieldCheck, text: dict.cta.trust1 },
    { icon: Clock, text: dict.cta.trust2.replace("{hours}", String(SITE.responseHours)) },
    { icon: Star, text: dict.cta.trust3 },
  ];

  return (
    <section className="tex-plaster py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimateInView variant="scale-in">
          <div className="tex-indigo tadelakt relative rounded-[4px] overflow-hidden ring-1 ring-saffron/25 shadow-[var(--shadow-riad-lg)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[420px]">

              {/* Left: text content */}
              <div className="p-10 sm:p-14 flex flex-col justify-center">
                <motion.h2
                  className="font-display text-cream font-semibold leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                >
                  {dict.cta.title}
                </motion.h2>
                <motion.p
                  className="text-cream/75 leading-relaxed mb-8 max-w-md text-[0.95rem]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 }}
                >
                  {dict.cta.subtitle.replace("{tourCount}", String(tourCount))}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 mb-10"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease, delay: 0.3 }}
                >
                  <Link href={`/${lang}/tours`} className="btn-brass !text-sm">
                    {dict.cta.browseAll}
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </Link>
                  <a
                    href={whatsappUrl(WHATSAPP_MESSAGES.custom)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[2px] bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20ba5a] active:scale-[0.98] transition-all"
                  >
                    <WhatsappLogo className="w-4 h-4" weight="fill" />
                    {dict.cta.whatsapp}
                  </a>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.45 }}
                >
                  {TRUST.map((t) => (
                    <div key={t.text} className="flex items-center gap-2 text-cream/65 text-xs">
                      <t.icon className="w-3.5 h-3.5 text-brass-glow shrink-0" weight="duotone" />
                      {t.text}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-cream/65 text-xs">
                    <Envelope className="w-3.5 h-3.5 text-brass-glow shrink-0" weight="duotone" />
                    <a href={`mailto:${SITE.email}`} className="hover:text-cream transition-colors">
                      {SITE.emailDisplay}
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right: image panel */}
              <div className="relative hidden lg:block overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=840&q=85"
                    alt="Sahara desert at sunset"
                    fill
                    className="object-cover"
                    sizes="420px"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep via-indigo-deep/25 to-transparent" />
                {/* Floating rating chip — the honest aggregate, not a copied quote */}
                <motion.div
                  className="glass-dark absolute bottom-8 right-8 rounded-[3px] px-4 py-3.5 max-w-[210px]"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.5 }}
                >
                  <div className="flex items-center gap-1 mb-1.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-brass-glow" weight="fill" />
                    ))}
                  </div>
                  <p className="text-cream text-sm font-semibold leading-tight">
                    {TRIPADVISOR.rating.toFixed(1)} on TripAdvisor
                  </p>
                  <p className="text-cream/65 text-xs mt-0.5">{TRIPADVISOR.reviewCount} traveller reviews</p>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
