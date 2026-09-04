"use client";

import { useEffect, useState } from "react";
import { localeTag } from "@/lib/events-format";

/**
 * "Booking open now" badge for set-departure events.
 *
 * WHY THIS IS A CLIENT COMPONENT AND NOT A SERVER ONE
 * The events pages are SSG (`●` in the build output), so anything computed
 * from `new Date()` on the server freezes at BUILD time. A badge rendered that
 * way would keep saying "booking open — next departure 5 March" long after
 * 5 March had passed, on a page nobody rebuilt. That is worse than no badge:
 * it is a live-looking claim about availability that quietly becomes false.
 *
 * BookingSidebar already sets the precedent for exactly this reason — it
 * computes its date bounds "per render rather than at module load so a
 * long-lived tab does not go stale overnight".
 *
 * WHAT IT DOES AND DOES NOT CLAIM
 * It says booking is OPEN and names the next departure still in the future.
 * It does NOT say how many seats are left, because nothing in this codebase
 * knows that — seatsTotal is a cap, not live inventory, and a "3 seats left"
 * badge we cannot substantiate is both a lie and the exact false-urgency
 * pattern that makes a small operator look like an OTA. If real inventory ever
 * lands, this is where it goes.
 *
 * SSR/HYDRATION
 * Renders nothing on the server pass (`mounted` gate). The alternative —
 * rendering a build-time guess and correcting it on hydration — produces a
 * hydration mismatch on a date boundary and flashes a wrong status. An absent
 * badge for one paint is the cheaper failure.
 */

interface Props {
  /** ISO departure dates, ascending. */
  dates: string[];
  lang: string;
  labels: {
    /** e.g. "Booking open now" */
    open: string;
    /** e.g. "Next departure {date}" — {date} is substituted. */
    next: string;
    /** Shown when every departure has passed. */
    closed: string;
  };
}

export default function BookingStatus({ dates, lang, labels }: Props) {
  const [mounted, setMounted] = useState(false);
  // Deliberate mount gate. `mounted` MUST start false on both server and client
  // so hydration matches; the badge depends on the current date, and rendering a
  // build-time guess then correcting it flashes a wrong status on a date
  // boundary. One extra render is the cheaper failure — see the docblock above.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Compare date-only, in UTC, against the same YYYY-MM-DD shape the departures
  // use. Constructing a Date from the ISO string and comparing instants would
  // make a departure "past" during its own departure day for anyone west of
  // UTC — the trip leaves that morning, so the day itself still counts.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = dates.filter((d) => d >= today);

  if (upcoming.length === 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sand-dark)] px-3 py-1 font-body text-xs font-semibold text-[var(--color-ink-muted)]">
        {labels.closed}
      </span>
    );
  }

  const next = new Date(`${upcoming[0]}T00:00:00Z`).toLocaleDateString(
    localeTag(lang),
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-terracotta)] px-3 py-1 font-body text-xs font-semibold text-white">
      {/* Decorative only: the status is already in the text beside it, so the
          dot must not be announced twice to a screen reader. */}
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      {labels.open}
      <span className="font-normal opacity-90">
        {labels.next.replace("{date}", next)}
      </span>
    </span>
  );
}
