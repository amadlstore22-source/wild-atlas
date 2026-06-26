"use client";
import dynamic from "next/dynamic";
import type { Locale } from "@/app/[lang]/dictionaries";

const ToursMap = dynamic(() => import("./ToursMap"), {
  ssr: false,
  loading: () => (
    <div className="py-20" style={{ background: "linear-gradient(180deg, #f5f1ea 0%, #faf9f6 60%, #fff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="h-3 w-28 bg-sand-dark/50 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 w-56 bg-sand-dark/35 rounded-xl mx-auto mb-3 animate-pulse" />
          <div className="h-3 w-44 bg-sand-dark/25 rounded-full mx-auto mb-8 animate-pulse" />
          <div className="flex flex-wrap justify-center gap-2">
            {[90, 72, 62, 68, 72, 76, 64].map((w, i) => (
              <div key={i} className="h-8 rounded-full bg-sand-dark/25 animate-pulse" style={{ width: w }} />
            ))}
          </div>
        </div>
        <div
          className="rounded-3xl bg-sand animate-pulse border border-sand-dark/30"
          style={{ height: "clamp(380px, 48vw, 600px)" }}
        />
      </div>
    </div>
  ),
});

export default function MapWrapper({ lang }: { lang: Locale }) {
  return <ToursMap lang={lang} />;
}
