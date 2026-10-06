"use client";
import { useCurrency } from "@/lib/currency";

/** A EUR price in the visitor's chosen currency, for server-rendered event pages. */
export default function EventPrice({ eur }: { eur: number }) {
  const { format } = useCurrency();
  return <>{format(eur)}</>;
}
