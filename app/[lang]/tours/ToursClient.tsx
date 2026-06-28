"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import TourCard from "@/components/ui/TourCard";
import { TOURS, CATEGORIES, type Category, type Difficulty, type Origin } from "@/lib/tours";
import { whatsappUrl } from "@/lib/constants";
import { MagnifyingGlass, Sliders, X, WhatsappLogo, UsersThree } from "@phosphor-icons/react";
import type { Dictionary, Locale } from "../dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
  initialSearch?: string;
  initialOrigin?: string;
}

export default function ToursClient({ lang, dict, initialSearch = "", initialOrigin = "" }: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<Category | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [origin, setOrigin] = useState<Origin | "all">((initialOrigin as Origin) || "all");

  const DIFFICULTIES: { id: Difficulty | "all"; label: string }[] = [
    { id: "all", label: dict.tours.allLevels },
    { id: "easy", label: dict.tours.easy },
    { id: "moderate", label: dict.tours.moderate },
    { id: "challenging", label: dict.tours.challenging },
    { id: "expert", label: dict.tours.expert },
  ];

  const ORIGIN_TABS: { id: Origin | "all"; label: string }[] = [
    { id: "all", label: dict.hero.allTours },
    { id: "marrakech", label: dict.hero.fromMarrakech },
    { id: "agadir", label: dict.hero.fromAgadir },
  ];

  const filtered = useMemo(
    () =>
      TOURS.filter((t) => {
        const matchSearch =
          search === "" ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "all" || t.category === category;
        const matchDiff = difficulty === "all" || t.difficulty === difficulty;
        const matchOrigin = origin === "all" || t.origin === origin;
        return matchSearch && matchCat && matchDiff && matchOrigin;
      }),
    [search, category, difficulty, origin]
  );

  const hasFilters = search !== "" || category !== "all" || difficulty !== "all" || origin !== "all";

  function clearAll() {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
    setOrigin("all");
  }

  const toursFoundText = filtered.length === 1
    ? dict.tours.toursFound.replace("{count}", String(filtered.length))
    : dict.tours.toursFoundPlural.replace("{count}", String(filtered.length));

  return (
    <div className="min-h-screen">
      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image src="https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1920&q=80" alt="Morocco tours" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <h1 className="font-serif text-white text-6xl lg:text-7xl font-bold leading-tight">{dict.tours.pageTitle}</h1>
          <p className="text-white/70 mt-3 text-xl">{dict.tours.pageSubtitle.replace("{count}", String(TOURS.length))}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex gap-2 mb-6 border-b border-sand-dark pb-4">
          {ORIGIN_TABS.map((tab) => (
            <button key={tab.id} onClick={() => setOrigin(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${origin === tab.id ? "bg-forest text-white shadow-sm" : "bg-white text-charcoal border border-sand-dark hover:border-forest/40 hover:text-forest"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <Sliders className="w-5 h-5 text-charcoal/40 shrink-0 hidden lg:block" />
            <div className="relative flex-1 w-full">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input type="text" placeholder={dict.tours.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sand-dark bg-offwhite text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-forest text-sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCategory("all")} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${category === "all" ? "bg-forest text-white" : "bg-offwhite text-charcoal hover:bg-sand border border-sand-dark"}`}>{dict.tours.all}</button>
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${category === cat.id ? "bg-forest text-white" : "bg-offwhite text-charcoal hover:bg-sand border border-sand-dark"}`}>{cat.icon} {cat.label}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {DIFFICULTIES.map((d) => (
                <button key={d.id} onClick={() => setDifficulty(d.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${difficulty === d.id ? "bg-charcoal text-white" : "bg-offwhite text-charcoal hover:bg-sand border border-sand-dark"}`}>{d.label}</button>
              ))}
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-charcoal/50 hover:text-sunset transition-colors shrink-0">
                <X className="w-3.5 h-3.5" /> {dict.tours.clear}
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-forest to-moss p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><UsersThree className="w-5 h-5 text-white" /></div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm leading-tight">{dict.tours.customBannerTitle}</p>
            <p className="text-white/65 text-xs mt-0.5">{dict.tours.customBannerDesc}</p>
          </div>
          <a href={whatsappUrl("Hello! I'd like to plan a custom Morocco adventure for my group.")} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-forest font-semibold text-xs whitespace-nowrap hover:bg-sand transition-colors shadow-sm shrink-0">
            <WhatsappLogo className="w-4 h-4" /> {dict.tours.planCustomTrip}
          </a>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl font-semibold text-charcoal/40">{dict.tours.noToursFound}</p>
            <p className="mt-2 text-charcoal/30 text-sm">{dict.tours.tryAdjusting}</p>
            <button onClick={clearAll} className="mt-4 text-forest font-semibold text-sm hover:underline">{dict.tours.clearFilters}</button>
          </div>
        ) : (
          <>
            <p className="text-charcoal/40 text-sm mb-6">{toursFoundText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tour) => <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
