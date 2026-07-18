// permanentRedirect (308) not redirect (307): routing an unprefixed path
// to the default locale is permanent, and Google only consolidates ranking
// signals through a permanent redirect.
import { permanentRedirect } from "next/navigation";
export default function ContactRedirect() { permanentRedirect("/en/contact"); }
