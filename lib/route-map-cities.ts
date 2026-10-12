/**
 * Major cities shown on the route map's opening whole-Morocco view, before it
 * zooms to the route (owner, 2026-10-12). Positions are the city centres;
 * `side` is where the name sits, chosen so Rabat and Casablanca, ~90 km apart,
 * do not collide. Names per locale in each language's usual spelling.
 */
export type CityName = Record<"en" | "fr" | "es" | "de" | "it" | "ar", string>;
export const MAP_CITIES: { lon: number; lat: number; side: "left" | "right" | "top"; name: CityName }[] = [
  { lon: -5.834, lat: 35.7595, side: "right", name: { en: "Tangier", fr: "Tanger", es: "Tánger", de: "Tanger", it: "Tangeri", ar: "طنجة" } },
  { lon: -6.8416, lat: 34.0209, side: "top", name: { en: "Rabat", fr: "Rabat", es: "Rabat", de: "Rabat", it: "Rabat", ar: "الرباط" } },
  { lon: -7.5898, lat: 33.5731, side: "left", name: { en: "Casablanca", fr: "Casablanca", es: "Casablanca", de: "Casablanca", it: "Casablanca", ar: "الدار البيضاء" } },
  { lon: -5.0078, lat: 34.0181, side: "right", name: { en: "Fes", fr: "Fès", es: "Fez", de: "Fès", it: "Fès", ar: "فاس" } },
  { lon: -1.9086, lat: 34.6814, side: "left", name: { en: "Oujda", fr: "Oujda", es: "Uchda", de: "Oujda", it: "Oujda", ar: "وجدة" } },
  { lon: -7.9811, lat: 31.6295, side: "left", name: { en: "Marrakech", fr: "Marrakech", es: "Marrakech", de: "Marrakesch", it: "Marrakech", ar: "مراكش" } },
  { lon: -9.5981, lat: 30.4278, side: "left", name: { en: "Agadir", fr: "Agadir", es: "Agadir", de: "Agadir", it: "Agadir", ar: "أكادير" } },
  { lon: -6.8934, lat: 30.9189, side: "right", name: { en: "Ouarzazate", fr: "Ouarzazate", es: "Uarzazate", de: "Ouarzazate", it: "Ouarzazate", ar: "ورزازات" } },
  { lon: -13.1625, lat: 27.1253, side: "right", name: { en: "Laayoune", fr: "Laâyoune", es: "El Aaiún", de: "Laâyoune", it: "Laayoune", ar: "العيون" } },
  { lon: -15.958, lat: 23.6848, side: "right", name: { en: "Dakhla", fr: "Dakhla", es: "Dajla", de: "Dakhla", it: "Dakhla", ar: "الداخلة" } },
];
