import { permanentRedirect } from "next/navigation";

// permanentRedirect (308), not redirect (307). The default locale is a
// permanent routing decision, and Google does not consolidate ranking signals
// through a temporary redirect — it keeps both URLs as separate candidates.
export default function RootPage() {
  permanentRedirect("/en");
}
