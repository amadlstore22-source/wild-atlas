import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDictionary, hasLocale } from "../dictionaries";
import ToursClient from "./ToursClient";

export default async function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ToursClient lang={lang} dict={dict} />
    </Suspense>
  );
}
