import type { CityName } from "./route-map-cities";

/**
 * Places the road-map route is drawn through because a day title names them
 * (owner, 2026-10-15: "make sure the route is correct"). Until then only each
 * day's stops were routed and OSRM took its own shortest road between them:
 * "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt" came out through Beni
 * Mellal, and the 3-day Sahara loop came home the way it went out instead of
 * by Alnif and Tazarine. scripts/build-route-maps.mjs routes through these;
 * RouteMap.tsx labels the ones that are not already a stop.
 *
 * Positions are OpenStreetMap's (Nominatim, checked 2026-10-15/16): the town
 * centre, and the pass itself for Tizi n'Tichka. The Dades is Aït Oudinar, on
 * the gorge road 25 km above Boumalne, where the tours' hotel stands (Riad
 * Luxury Dades: "Ait Oudinar 25 Km de Boumalne Dades vers Msemrir"), so the
 * route goes up the gorge rather than past its mouth. The "Dades Gorges" stop
 * in lib/tours*.ts was moved there too: it sat 4.4 km off any road, in the
 * mountains west of the gorge. Generic title words ("Draa Valley", "Road of a
 * Thousand Kasbahs", "Sunrise") are deliberately not here: they name no one
 * point. Marrakech and Agadir are not here either; the meeting point already
 * starts and ends the route there.
 */
export type ViaPlace = { lon: number; lat: number; name: CityName; match: RegExp };

const same = (latin: string, ar: string): CityName => ({ en: latin, fr: latin, es: latin, de: latin, it: latin, ar });

export const VIA_PLACES: Record<string, ViaPlace> = {
  // Where the Toubkal walk starts and ends on the trekking-and-Sahara tours:
  // "Summit Toubkal → Imlil" walks down to it, then the drive starts there.
  imlil: { lat: 31.1369, lon: -7.9169, name: same("Imlil", "إمليل"), match: /imlil/ },
  tichka: { lat: 31.2861, lon: -7.3811, name: same("Tizi n'Tichka", "تيزي ن تيشكا"), match: /tizi n'? ?tichka/ },
  "ait-ben-haddou": { lat: 31.0452, lon: -7.131, name: same("Aït Ben Haddou", "آيت بن حدو"), match: /ait ben haddou/ },
  ouarzazate: { lat: 30.9202, lon: -6.9109, name: { en: "Ouarzazate", fr: "Ouarzazate", es: "Uarzazate", de: "Ouarzazate", it: "Ouarzazate", ar: "ورزازات" }, match: /ouarzazate/ },
  "kalaat-mgouna": { lat: 31.2377, lon: -6.1293, name: same("Kalaat M'Gouna", "قلعة مكونة"), match: /kal?aa?t m'? ?gouna|kelaa/ },
  dades: { lat: 31.51, lon: -5.9424, name: { en: "Dades Gorges", fr: "Gorges du Dadès", es: "Gargantas del Dadès", de: "Dadès-Schlucht", it: "Gole del Dadès", ar: "مضايق دادس" }, match: /dades/ },
  todra: { lat: 31.5876, lon: -5.5919, name: { en: "Todra Gorge", fr: "Gorges du Todra", es: "Garganta del Todra", de: "Todra-Schlucht", it: "Gole del Todra", ar: "مضايق تودغى" }, match: /todg?ra/ },
  erfoud: { lat: 31.435, lon: -4.2328, name: same("Erfoud", "أرفود"), match: /erfoud/ },
  merzouga: { lat: 31.0999, lon: -4.0141, name: same("Merzouga", "مرزوكة"), match: /merzouga/ },
  alnif: { lat: 31.1163, lon: -5.1669, name: same("Alnif", "ألنيف"), match: /alnif/ },
  tazarine: { lat: 30.7831, lon: -5.5634, name: same("Tazarine", "تازارين"), match: /tazz?arine/ },
  zagora: { lat: 30.3279, lon: -5.837, name: same("Zagora", "زاكورة"), match: /zagora/ },
  tamegroute: { lat: 30.2619, lon: -5.6795, name: same("Tamegroute", "تامكروت"), match: /tamegroute|tamgrout/ },
  mhamid: { lat: 29.8273, lon: -5.7239, name: same("M'Hamid", "امحاميد"), match: /m'? ?hamid/ },
  "foum-zguid": { lat: 30.0859, lon: -6.8749, name: same("Foum Zguid", "فم زكيد"), match: /foum zguid/ },
  tata: { lat: 29.7464, lon: -7.9696, name: same("Tata", "طاطا"), match: /\btata\b/ },
  taznakht: { lat: 30.5773, lon: -7.2048, name: same("Taznakht", "تازناخت"), match: /tazn?akht|tazenakht/ },
  taliouine: { lat: 30.5315, lon: -7.9215, name: same("Taliouine", "تالوين"), match: /taliouine/ },
  taroudant: { lat: 30.4707, lon: -8.8779, name: same("Taroudant", "تارودانت"), match: /taroudant/ },
  "beni-mellal": { lat: 32.3342, lon: -6.3533, name: { en: "Beni Mellal", fr: "Béni Mellal", es: "Beni Mellal", de: "Beni Mellal", it: "Beni Mellal", ar: "بني ملال" }, match: /beni mellal/ },
  midelt: { lat: 32.6803, lon: -4.7399, name: same("Midelt", "ميدلت"), match: /midelt/ },
  azrou: { lat: 33.4417, lon: -5.2231, name: same("Azrou", "أزرو"), match: /azrou/ },
  ifrane: { lat: 33.5276, lon: -5.1074, name: same("Ifrane", "إفران"), match: /ifrane/ },
  meknes: { lat: 33.8984, lon: -5.5322, name: { en: "Meknes", fr: "Meknès", es: "Mequinez", de: "Meknès", it: "Meknès", ar: "مكناس" }, match: /meknes/ },
  volubilis: { lat: 34.0735, lon: -5.5554, name: same("Volubilis", "وليلي"), match: /volubilis/ },
  fes: { lat: 34.0347, lon: -5.0162, name: { en: "Fes", fr: "Fès", es: "Fez", de: "Fès", it: "Fès", ar: "فاس" }, match: /\bfe[sz]\b/ },
  chefchaouen: { lat: 35.1688, lon: -5.2683, name: same("Chefchaouen", "شفشاون"), match: /chefchaouen/ },
  rabat: { lat: 34.0218, lon: -6.8409, name: same("Rabat", "الرباط"), match: /rabat/ },
  casablanca: { lat: 33.5945, lon: -7.62, name: same("Casablanca", "الدار البيضاء"), match: /casablanca/ },
  essaouira: { lat: 31.5118, lon: -9.7621, name: same("Essaouira", "الصويرة"), match: /essaouira/ },
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’`]/g, "'").toLowerCase();

/** Words in stop names that say what a place is, not which one. */
const GENERIC = new Set(["valley", "gorge", "gorges", "desert", "dunes", "medina", "village", "mountains", "middle", "falls", "summit", "refuge", "trailhead"]);

function firstHit(text: string, re: RegExp) {
  const m = new RegExp(re.source, "g").exec(text);
  return m ? m.index : -1;
}

/**
 * The gazetteer places a day title names, split by where they fall against the
 * day's own stops: named before the first stop -> driven through on the way to
 * it; after the last -> on the way on. A day whose stops the title does not
 * name routes everything first. "A / B" means either, so it routes neither.
 */
export function viaInTitle(title: string, stopNames: string[]): { before: string[]; after: string[] } {
  const t = norm(title).replace(/[^→,]*\/[^→,]*/g, " ");
  const stopIds = new Set(
    stopNames.flatMap((n) => Object.keys(VIA_PLACES).filter((id) => VIA_PLACES[id].match.test(norm(n)))),
  );
  // A stop is found by any distinctive word of its name: the stop "Jbel Toubkal
  // Summit" is the "Summit Toubkal" of the title, so "→ Imlil" after it is
  // where the walk ends, not a detour before the climb.
  const stopAt: number[] = [];
  for (const n of stopNames) {
    for (const w of norm(n).split(/[^a-z']+/)) {
      if (w.length < 5 || GENERIC.has(w)) continue;
      const i = t.search(new RegExp(`\\b${w}\\b`));
      if (i >= 0) stopAt.push(i);
    }
  }
  const hits = Object.keys(VIA_PLACES)
    .map((id) => ({ id, at: firstHit(t, VIA_PLACES[id].match) }))
    .filter((h) => h.at >= 0)
    .sort((a, b) => a.at - b.at);
  for (const h of hits) if (stopIds.has(h.id)) stopAt.push(h.at);
  const first = stopAt.length ? Math.min(...stopAt) : Infinity;
  const last = stopAt.length ? Math.max(...stopAt) : Infinity;
  const free = hits.filter((h) => !stopIds.has(h.id));
  return {
    before: free.filter((h) => h.at < first).map((h) => h.id),
    after: free.filter((h) => h.at > last).map((h) => h.id),
  };
}
