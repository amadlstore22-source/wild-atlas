"use client";
import Link from "next/link";
import Image from "next/image";
import { Envelope, WhatsappLogo, ArrowRight, ShieldCheck, Clock, Star } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTABanner({ dict, lang = "en" }: Props) {
  const TRUST = [
    { icon: ShieldCheck, text: dict.cta.trust1 },
    { icon: Clock, text: dict.cta.trust2.replace("{hours}", String(SITE.responseHours)) },
    { icon: Star, text: dict.cta.trust3 },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateInView variant="scale-in">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #253018 0%, #2d3a22 50%, #3a4a2c 100%)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[420px]">

              {/* Left: text content */}
              <div className="p-10 sm:p-14 flex flex-col justify-center">
                <motion.h2
                  className="font-serif text-white font-bold leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                >
                  {dict.cta.title}
                </motion.h2>
                <motion.p
                  className="text-white/75 leading-relaxed mb-8 max-w-md text-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease, delay: 0.2 }}
                >
                  {dict.cta.subtitle.replace("{tourCount}", String(SITE.tourCount))}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 mb-10"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease, delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`/${lang}/tours`}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sunset text-white font-bold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all shadow-xl shadow-sunset/25"
                    >
                      {dict.cta.browseAll}
                      <ArrowRight className="w-4 h-4" weight="bold" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <a
                      href={whatsappUrl(WHATSAPP_MESSAGES.custom)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba5a] active:scale-[0.98] transition-all"
                    >
                      <WhatsappLogo className="w-4 h-4" weight="fill" />
                      {dict.cta.whatsapp}
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.45 }}
                >
                  {TRUST.map((t) => (
                    <div key={t.text} className="flex items-center gap-2 text-white/65 text-xs">
                      <t.icon className="w-3.5 h-3.5 text-[#d4956a] shrink-0" weight="duotone" />
                      {t.text}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-white/65 text-xs">
                    <Envelope className="w-3.5 h-3.5 text-[#d4956a] shrink-0" weight="duotone" />
                    <a href={`mailto:${SITE.email}`} className="hover:text-white/75 transition-colors">
                      {SITE.email}
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
                <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/20 to-transparent" />
                {/* Floating review badge */}
                <motion.div
                  className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl max-w-[200px]"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.5 }}
                >
                  <div className="flex mb-2">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-sunset" weight="fill" />
                    ))}
                  </div>
                  <p className="text-charcoal text-xs leading-relaxed font-medium italic">
                    &ldquo;Best trip of my life. Do not hesitate.&rdquo;
                  </p>
                  <p className="text-charcoal/40 text-xs mt-2 font-semibold">- Verified Traveller</p>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
