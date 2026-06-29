"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

export default function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Appear 1.5 s after mount
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Track scroll activity — idle after 1.8 s of no scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolling(false), 1800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // fully off-screen when idle (button 56px + right-6 24px = need >80px to clear edge)
  const animate = {
    opacity: !shown ? 0 : scrolling ? 1 : 0,
    scale:   !shown ? 0.7 : scrolling ? 1 : 0.88,
    y:       !shown ? 20 : 0,
    x:       !shown ? 0  : scrolling ? 0 : 100,
  };

  return (
    <motion.a
      href={whatsappUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center group ${!scrolling ? "pointer-events-none" : ""}`}
      animate={animate}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 0, opacity: 1, scale: 1.05 }}
    >
      {/* Slide-out tooltip — only visible when active + hovered */}
      <span className={`mr-3 px-4 py-2 rounded-full bg-charcoal text-white text-sm font-semibold whitespace-nowrap pointer-events-none shadow-lg transition-all duration-200 ${
        scrolling
          ? "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          : "opacity-0"
      }`}>
        Need help? Chat now
      </span>

      {/* Button with pulse ring */}
      <motion.div
        className="relative shrink-0"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="whatsapp-pulse absolute inset-0 rounded-full" />
        <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:bg-[#20ba5a] transition-colors duration-200">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
            <path d={WA_PATH} />
          </svg>
        </div>
      </motion.div>
    </motion.a>
  );
}
