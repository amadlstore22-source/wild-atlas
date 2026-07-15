"use client";
import { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import TourCard from "@/components/ui/TourCard";
import { TOURS, CATEGORIES, durationBucket, type Category, type Difficulty, type Origin, type DurationBucket } from "@/lib/tours";
import { whatsappUrl } from "@/lib/constants";
import { useCurrency } from "@/lib/currency";
import { MagnifyingGlass, Sliders, X, WhatsappLogo, UsersThree } from "@phosphor-icons/react";
import type { Dictionary, Locale } from "../dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
  initialSearch?: string;
  initialOrigin?: string;
  initialCategory?: string;
  initialDifficulty?: string;
  initialDuration?: string;
  initialPrice?: string;
}

// Price bands operate on the stored USD price so URLs stay stable across currencies.
type PriceBand = "all" | "low" | "mid" | "high";
const PRICE_BANDS: { id: PriceBand; maxUsd: number | null; minUsd: number }[] = [
  { id: "all", minUsd: 0, maxUsd: null },
  { id: "low", minUsd: 0, maxUsd: 100 },
  { id: "mid", minUsd: 100, maxUsd: 250 },
  { id: "high", minUsd: 250, maxUsd: null },
];

const DURATIONS: { id: DurationBucket | "all"; label: string }[] = [
  { id: "all", label: "Any length" },
  { id: "day", label: "1 day" },
  { id: "short", label: "2 to 3 days" },
  { id: "long", label: "4+ days" },
];

export default function ToursClient({
  lang, dict,
  initialSearch = "", initialOrigin = "", initialCategory = "", initialDifficulty = "",
  initialDuration = "", initialPrice = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { format } = useCurrency();

  const [search, setSearchState] = useState(initialSearch);
  const [category, setCategoryState] = useState<Category | "all">((initialCategory as Category) || "all");
  const [difficulty, setDifficultyState] = useState<Difficulty | "all">((initialDifficulty as Difficulty) || "all");
  const [origin, setOriginState] = useState<Origin | "all">((initialOrigin as Origin) || "all");
  const [duration, setDurationState] = useState<DurationBucket | "all">((initialDuration as DurationBucket) || "all");
  const [price, setPriceState] = useState<PriceBand>((initialPrice as PriceBand) || "all");

  const pushURL = useCallback(
    (q: string, cat: string, diff: string, orig: string, dur: string, pr: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat !== "all") params.set("cat", cat);
      if (diff !== "all") params.set("diff", diff);
      if (orig !== "all") params.set("origin", orig);
      if (dur !== "all") params.set("dur", dur);
      if (pr !== "all") params.set("price", pr);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  function setSearch(v: string) { setSearchState(v); pushURL(v, category, difficulty, origin, duration, price); }
  function setCategory(v: Category | "all") { setCategoryState(v); pushURL(search, v, difficulty, origin, duration, price); }
  function setDifficulty(v: Difficulty | "all") { setDifficultyState(v); pushURL(search, category, v, origin, duration, price); }
  function setOrigin(v: Origin | "all") { setOriginState(v); pushURL(search, category, difficulty, v, duration, price); }
  function setDuration(v: DurationBucket | "all") { setDurationState(v); pushURL(search, category, difficulty, origin, v, price); }
  function setPrice(v: PriceBand) { setPriceState(v); pushURL(search, category, difficulty, origin, duration, v); }

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

  const priceLabels: Record<PriceBand, string> = {
    all: "Any price",
    low: `Under ${format(100)}`,
    mid: `${format(100)} to ${format(250)}`,
    high: `${format(250)}+`,
  };

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
        const matchDuration = duration === "all" || durationBucket(t) === duration;
        const band = PRICE_BANDS.find((b) => b.id === price)!;
        const matchPrice = price === "all" || (t.price >= band.minUsd && (band.maxUsd === null || t.price < band.maxUsd));
        return matchSearch && matchCat && matchDiff && matchOrigin && matchDuration && matchPrice;
      }),
    [search, category, difficulty, origin, duration, price]
  );

  const hasFilters = search !== "" || category !== "all" || difficulty !== "all" || origin !== "all" || duration !== "all" || price !== "all";

  function clearAll() {
    setSearchState(""); setCategoryState("all"); setDifficultyState("all");
    setOriginState("all"); setDurationState("all"); setPriceState("all");
    router.replace(pathname, { scroll: false });
  }

  const toursFoundText = filtered.length === 1
    ? dict.tours.toursFound.replace("{count}", String(filtered.length))
    : dict.tours.toursFoundPlural.replace("{count}", String(filtered.length));

  const chip = (activeState: boolean) =>
    `px-3 py-1.5 rounded-[3px] text-xs font-semibold transition-colors border ${
      activeState
        ? "bg-indigo text-cream border-indigo"
        : "bg-surface-raised text-ink border-rule hover:border-indigo/50 hover:text-indigo"
    }`;

  return (
    <div>
      <div className="relative h-[52vh] min-h-[360px] flex items-end">
        <Image src="https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1920&q=80" alt="Morocco tours" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/82 via-indigo-deep/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <h1 className="font-display text-white text-5xl lg:text-6xl font-bold leading-tight">{dict.tours.pageTitle}</h1>
          <p className="text-white/75 mt-3 text-lg">{dict.tours.pageSubtitle.replace("{count}", String(TOURS.length))}</p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Origin tabs */}
        <div className="flex gap-2 mb-6 border-b border-rule pb-4">
          {ORIGIN_TABS.map((tab) => (
            <button key={tab.id} onClick={() => setOrigin(tab.id)}
              className={`px-5 py-2 rounded-[3px] text-sm font-semibold transition-all ${origin === tab.id ? "bg-indigo text-cream shadow-sm" : "bg-card text-ink border border-rule hover:border-indigo/40 hover:text-indigo"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter panel */}
        <div className="bg-card rounded-[4px] border border-rule p-5 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <Sliders className="w-5 h-5 text-ink-muted shrink-0 hidden lg:block" />
            <div className="relative flex-1 w-full">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input type="text" placeholder={dict.tours.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-[3px] border border-rule bg-surface-raised text-ink placeholder:text-ink-muted focus:outline-none focus:border-indigo text-sm" />
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-terracotta transition-colors shrink-0">
                <X className="w-3.5 h-3.5" /> {dict.tours.clear}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-3">
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">Category</div>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setCategory("all")} className={chip(category === "all")}>{dict.tours.all}</button>
                {CATEGORIES.map((cat) => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)} className={chip(category === cat.id)}>{cat.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">Difficulty</div>
              <div className="flex flex-wrap gap-1.5">
                {DIFFICULTIES.map((d) => (
                  <button key={d.id} onClick={() => setDifficulty(d.id)} className={chip(difficulty === d.id)}>{d.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">Duration</div>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map((d) => (
                  <button key={d.id} onClick={() => setDuration(d.id)} className={chip(duration === d.id)}>{d.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">Price</div>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_BANDS.map((b) => (
                  <button key={b.id} onClick={() => setPrice(b.id)} className={chip(price === b.id)}>{priceLabels[b.id]}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom-trip banner */}
        <div className="mb-8 rounded-[4px] bg-indigo p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-[3px] bg-white/15 flex items-center justify-center shrink-0"><UsersThree className="w-5 h-5 text-white" /></div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm leading-tight">{dict.tours.customBannerTitle}</p>
            <p className="text-white/70 text-xs mt-0.5">{dict.tours.customBannerDesc}</p>
          </div>
          <a href={whatsappUrl("Hello! I'd like to plan a custom Morocco adventure for my group.")} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[3px] bg-card text-indigo font-semibold text-xs whitespace-nowrap hover:bg-surface-sunk transition-colors shrink-0">
            <WhatsappLogo className="w-4 h-4" /> {dict.tours.planCustomTrip}
          </a>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl font-semibold text-ink-muted">{dict.tours.noToursFound}</p>
            <p className="mt-2 text-ink-muted text-sm">{dict.tours.tryAdjusting}</p>
            <button onClick={clearAll} className="mt-4 text-indigo font-semibold text-sm hover:underline">{dict.tours.clearFilters}</button>
          </div>
        ) : (
          <>
            <p className="text-ink-muted text-sm mb-6">{toursFoundText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tour) => <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
