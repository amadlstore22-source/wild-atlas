"use client";
import dynamic from "next/dynamic";
import type { Locale } from "@/app/[lang]/dictionaries";

const ToursMap = dynamic(() => import("./ToursMap"), {
  ssr: false,
  loading: () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-sand animate-pulse" style={{ height: 480 }} />
      </div>
    </div>
  ),
});

export default function MapWrapper({ lang }: { lang: Locale }) {
  return <ToursMap lang={lang} />;
}
