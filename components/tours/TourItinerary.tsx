"use client";
import { useState } from "react";
import { CaretDown, ForkKnife, Bed, Car } from "@phosphor-icons/react";
import type { ItineraryDay } from "@/lib/tours";

export default function TourItinerary({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number>(1);
  if (!itinerary.length) return null;

  return (
    <section>
      <h2 className="font-serif text-charcoal text-3xl font-bold mb-6 reveal-up">Day-by-Day Itinerary</h2>
      <div className="space-y-3">
        {itinerary.map((day) => {
          const isOpen = openDay === day.day;
          return (
            <div
              key={day.day}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden reveal-up stagger-child ${
                isOpen ? "border-forest/30 shadow-sm" : "border-sand-dark"
              }`}
              style={{ animationDelay: `${(day.day - 1) * 70}ms` }}
            >
              <button
                onClick={() => setOpenDay(isOpen ? -1 : day.day)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-sand/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 ${
                  isOpen ? "bg-forest text-white scale-110 shadow-lg shadow-forest/25" : "bg-sand text-charcoal/60"
                }`}>
                  {day.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-charcoal text-sm leading-snug">{day.title}</div>
                </div>
                <CaretDown className={`w-5 h-5 text-charcoal/40 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="pl-14">
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{day.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-charcoal/50 bg-sand/50 px-3 py-1.5 rounded-full">
                        <ForkKnife className="w-3.5 h-3.5" /> Meals included
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-charcoal/50 bg-sand/50 px-3 py-1.5 rounded-full">
                        <Car className="w-3.5 h-3.5" /> Transport included
                      </span>
                      {day.day > 1 && (
                        <span className="flex items-center gap-1.5 text-xs text-charcoal/50 bg-sand/50 px-3 py-1.5 rounded-full">
                          <Bed className="w-3.5 h-3.5" /> Accommodation included
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
