"use client";
import { useState } from "react";
import { CaretDown, ForkKnife, Bed, Car } from "@phosphor-icons/react";
import type { ItineraryDay } from "@/lib/tours";

export default function TourItinerary({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number>(1);
  if (!itinerary.length) return null;

  return (
    <section>
      <h2 className="font-display text-ink text-3xl font-bold mb-6 reveal-up">Day-by-Day Itinerary</h2>
      <div className="space-y-3">
        {itinerary.map((day) => {
          const isOpen = openDay === day.day;
          return (
            <div
              key={day.day}
              className={`rounded-[4px] border transition-all duration-200 overflow-hidden reveal-up stagger-child ${
                isOpen ? "border-indigo/30 shadow-sm" : "border-rule"
              }`}
              style={{ animationDelay: `${(day.day - 1) * 70}ms` }}
            >
              <button
                onClick={() => setOpenDay(isOpen ? -1 : day.day)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-sunk/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-[3px] flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 ${
                  isOpen ? "bg-indigo text-white shadow-sm" : "bg-surface-sunk text-ink-soft"
                }`}>
                  {day.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink text-sm leading-snug">{day.title}</div>
                </div>
                <CaretDown className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="pl-14">
                    <p className="text-ink-soft text-sm leading-relaxed mb-4">{day.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-ink-soft bg-surface-sunk/60 px-3 py-1.5 rounded-[3px]">
                        <ForkKnife className="w-3.5 h-3.5 text-saffron" /> Meals included
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-ink-soft bg-surface-sunk/60 px-3 py-1.5 rounded-[3px]">
                        <Car className="w-3.5 h-3.5 text-saffron" /> Transport included
                      </span>
                      {day.day > 1 && (
                        <span className="flex items-center gap-1.5 text-xs text-ink-soft bg-surface-sunk/60 px-3 py-1.5 rounded-[3px]">
                          <Bed className="w-3.5 h-3.5 text-saffron" /> Accommodation included
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
