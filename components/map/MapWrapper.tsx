"use client";
import dynamic from "next/dynamic";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const ToursMap = dynamic(() => import("./ToursMap"), {
  ssr: false,
  loading: () => (
    <div
      className="py-20"
      style={{ background: "linear-gradient(180deg,#0D150D 0%,#111711 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="h-2.5 w-28 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 w-64 bg-white/8 rounded-xl mx-auto mb-3 animate-pulse" />
          <div className="h-2.5 w-44 bg-white/6 rounded-full mx-auto" />
        </div>
        <div
          className="rounded-3xl animate-pulse"
          style={{
            height: "clamp(480px, 58vw, 660px)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[80, 96, 88, 72, 104, 76, 88, 90].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-full animate-pulse"
              style={{ width: w, background: "rgba(255,255,255,0.07)" }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function MapWrapper({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return <ToursMap lang={lang} dict={dict} />;
}
