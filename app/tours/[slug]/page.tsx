import { redirect } from "next/navigation";
export default async function TourSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/en/tours/${slug}`);
}
