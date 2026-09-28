import type { Locale } from "@/app/[lang]/dictionaries";
import { MARKET_SLUG_BY_LANG } from "./market-slugs";

/**
 * "Morocco from <your country>" pages: one per source market, each in that
 * market's own language only (a page for German travellers is not translated
 * into Arabic). Built 2026-09-28 at the owner's request, for the markets
 * Search Console shows sending the most visitors after Morocco itself:
 * Germany (+ Austria, Switzerland), Spain, France, the UK and Italy.
 *
 * EVERY FACT HERE IS SOURCED. Do not add a rule, route or airline that is not.
 *  - Entry rules: each government's own travel advice, checked 2026-09-28.
 *    They genuinely differ (UK: passport valid 3 months after arrival;
 *    Germany/Austria: 6 months on entry; France/Italy: the whole stay), so each
 *    page quotes its own government rather than a blended rule.
 *  - Direct routes: the airline/destination tables for Marrakesh Menara (RAK)
 *    and Agadir–Al Massira (AGA) on Wikipedia, read 2026-09-28. Seasonal routes
 *    are labelled; routes change, so the page dates the list and says so.
 *  - Time: the IANA tz database (tzdata 2026b via Node Intl). Morocco is
 *    UTC+1 except during Ramadan, when it is UTC+0 (predicted 7 Feb – 14 Mar
 *    2027; Morocco confirms the dates each year).
 *  - Guide languages come from lib/guides.ts at render time, not from here.
 */

export interface RouteLine {
  airline: string;
  from: string;
}

export interface EntryRule {
  who: string;
  text: string;
  source: { label: string; url: string };
}

export interface Market {
  slug: string;
  lang: Locale;
  /** English name of the language whose speakers this page serves, matched
   *  against lib/guides.ts `languages` to name guides who speak it. */
  guideLanguage: string;
  /** Short link text for the footer of every page in this locale. */
  footerLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  entryHeading: string;
  entry: EntryRule[];
  entryAdvice: string;
  timeHeading: string;
  time: string[];
  flightsHeading: string;
  flightsNote: string;
  rak: RouteLine[];
  aga: RouteLine[];
  basesHeading: string;
  marrakechBase: string;
  agadirBase: string;
  guidesHeading: string;
  /** {names} is replaced with the guides who speak the language. */
  guidesYes: string;
  /** Used when no guide profile lists the language. */
  guidesNo: string;
  ctaHeading: string;
  ctaBody: string;
  labels: {
    rak: string;
    aga: string;
    source: string;
    checked: string;
    ask: string;
    whatsapp: string;
    breadcrumb: string;
  };
}

const CHECKED = "2026-09-28";
export const MARKETS_CHECKED = CHECKED;

export const MARKETS: Market[] = [
  {
    slug: MARKET_SLUG_BY_LANG.de!,
    lang: "de",
    footerLabel: "Anreise aus DE, AT, CH",
    guideLanguage: "German",
    metaTitle: "Marokko: Einreise & Flüge aus DACH",
    metaDescription:
      "Einreise mit Reisepass, Zeitverschiebung und Direktflüge nach Marrakesch und Agadir – für Reisende aus Deutschland, Österreich und der Schweiz.",
    h1: "Nach Marokko aus Deutschland, Österreich und der Schweiz",
    intro:
      "Wir sind eine Familie lizenzierter Berber-Guides aus Imlil im Hohen Atlas. Unsere Touren starten in Marrakesch und Agadir. Hier steht, was Sie vor der Anreise wissen müssen – mit Quellenangaben, damit Sie nichts davon ungeprüft glauben müssen.",
    entryHeading: "Einreise: Reisepass, kein Visum",
    entry: [
      {
        who: "Deutschland",
        text: "Kein Visum für touristische Aufenthalte bis 90 Tage. Nur mit Reisepass – der Personalausweis wird nicht akzeptiert. Der Pass muss bei Einreise noch mindestens sechs Monate gültig sein.",
        source: { label: "Auswärtiges Amt", url: "https://www.auswaertiges-amt.de/de/service/laender/marokko-node/marokkosicherheit-224080" },
      },
      {
        who: "Österreich",
        text: "Kein Visum bis 90 Tage. Reisepass erforderlich, bei Einreise mindestens sechs Monate gültig. Rückflugticket und ausreichende Geldmittel sollten nachweisbar sein.",
        source: { label: "BMEIA", url: "https://www.bmeia.gv.at/reise-services/reiseinformation/land/marokko" },
      },
      {
        who: "Schweiz",
        text: "Kein Visum bis 90 Tage. Reisepass, gültig für den gesamten Aufenthalt. Ohne Rück- oder Weiterreiseticket kann die Einreise verweigert werden. Verbindlich ist die Auskunft der marokkanischen Botschaft in Bern.",
        source: { label: "TCS", url: "https://www.tcs.ch/de/camping-reisen/reiseinformationen/laenderinfos/marokko.php" },
      },
    ],
    entryAdvice:
      "Unser Rat für alle drei Länder: ein Reisepass, der bei Einreise noch mindestens sechs Monate gültig ist. Damit erfüllen Sie die strengste der drei Regeln.",
    timeHeading: "Zeitverschiebung",
    time: [
      "Marokko liegt auf UTC+1. Im Winter gilt also dieselbe Uhrzeit wie in Deutschland, Österreich und der Schweiz; von Ende März bis Ende Oktober ist es in Marokko eine Stunde früher.",
      "Im Ramadan stellt Marokko die Uhr auf UTC+0 zurück – 2027 voraussichtlich vom 7. Februar bis 14. März. Dann ist es dort eine Stunde früher als bei Ihnen. Die genauen Daten legt Marokko jedes Jahr fest.",
    ],
    flightsHeading: "Direktflüge nach Marrakesch und Agadir",
    flightsNote:
      "Stand September 2026. Viele Verbindungen fliegen nur saisonal und Flugpläne ändern sich – bitte bei der Airline prüfen.",
    rak: [
      { airline: "Discover Airlines", from: "Frankfurt, München" },
      { airline: "Ryanair", from: "Berlin, Köln/Bonn, Frankfurt-Hahn, Weeze" },
      { airline: "easyJet", from: "Hamburg, Basel/Mulhouse, Genf" },
      { airline: "Eurowings", from: "Düsseldorf (saisonal)" },
      { airline: "Austrian Airlines", from: "Wien (saisonal)" },
      { airline: "Swiss", from: "Genf" },
      { airline: "Chair Airlines", from: "Zürich" },
      { airline: "Edelweiss", from: "Zürich (saisonal)" },
    ],
    aga: [
      { airline: "Condor", from: "Düsseldorf, Frankfurt, Hamburg, München (saisonal)" },
      { airline: "TUI fly", from: "Düsseldorf, Frankfurt (saisonale Charter)" },
      { airline: "Eurowings", from: "Düsseldorf, Stuttgart (saisonal)" },
      { airline: "Ryanair", from: "Frankfurt-Hahn, Weeze, Wien; Köln/Bonn (saisonal)" },
      { airline: "easyJet", from: "Berlin, Basel/Mulhouse, Genf" },
      { airline: "Transavia", from: "Berlin" },
      { airline: "Marabu", from: "Hamburg (saisonal)" },
      { airline: "Discover Airlines", from: "Frankfurt (saisonal, ab 26. Oktober 2026)" },
      { airline: "Edelweiss", from: "Zürich (saisonal)" },
    ],
    basesHeading: "Marrakesch oder Agadir?",
    marrakechBase:
      "Über Marrakesch erreichen Sie den Hohen Atlas mit dem Toubkal, unsere Heimat Imlil und die Sahara-Touren nach Merzouga und Erg Chegaga.",
    agadirBase:
      "Agadir ist der Ausgangspunkt für Paradise Valley, den Antiatlas, den Nationalpark Souss-Massa und Wüstentouren von der Küste aus – und wird aus Deutschland besonders gut angeflogen.",
    guidesHeading: "Guides, die Deutsch sprechen",
    guidesYes: "Deutsch spricht {names}.",
    guidesNo: "Unsere Guides sprechen Englisch und Französisch.",
    ctaHeading: "Fragen zur Anreise?",
    ctaBody: "Schreiben Sie uns. Wir antworten innerhalb einer Stunde (8–20 Uhr marokkanischer Zeit) und planen Ihre Tour um Ihre Flüge herum.",
    labels: {
      rak: "Nach Marrakesch (RAK)",
      aga: "Nach Agadir (AGA)",
      source: "Quelle",
      checked: "geprüft am",
      ask: "Anfrage senden",
      whatsapp: "WhatsApp",
      breadcrumb: "Anreise",
    },
  },
  {
    slug: MARKET_SLUG_BY_LANG.fr!,
    lang: "fr",
    footerLabel: "Venir de France",
    guideLanguage: "French",
    metaTitle: "Partir au Maroc : vols, passeport",
    metaDescription:
      "Passeport obligatoire, décalage horaire et vols directs vers Marrakech et Agadir depuis la France : ce qu'il faut savoir avant de partir.",
    h1: "Partir au Maroc depuis la France",
    intro:
      "Nous sommes une famille de guides berbères agréés, installée à Imlil dans le Haut Atlas. Nos circuits partent de Marrakech et d'Agadir. Voici l'essentiel avant votre départ, avec les sources officielles.",
    entryHeading: "Entrée au Maroc : le passeport est obligatoire",
    entry: [
      {
        who: "Ressortissants français",
        text: "Le passeport est obligatoire, y compris pour les voyages organisés en groupe : la carte nationale d'identité seule ne suffit plus. Il doit être valide pour toute la durée du séjour. Prévoyez votre billet de retour et des justificatifs de moyens de subsistance. Le séjour est limité à trois mois (90 jours).",
        source: { label: "France Diplomatie", url: "https://www.diplomatie.gouv.fr/fr/information-par-pays/maroc/conseils-aux-voyageurs-entree-sejour" },
      },
    ],
    entryAdvice:
      "À l'arrivée, vérifiez que votre passeport a bien reçu le cachet d'entrée. Pour toute question de visa, c'est le consulat du Maroc qui fait foi.",
    timeHeading: "Décalage horaire",
    time: [
      "Le Maroc est à UTC+1 : même heure qu'en France en hiver, une heure de moins de fin mars à fin octobre.",
      "Pendant le ramadan, le Maroc passe à UTC+0 – en 2027, probablement du 7 février au 14 mars. Il y a alors une heure de moins qu'en France. Les dates exactes sont fixées chaque année par le Maroc.",
    ],
    flightsHeading: "Vols directs vers Marrakech et Agadir",
    flightsNote:
      "Situation en septembre 2026. Certaines lignes sont saisonnières et les programmes changent : vérifiez auprès de la compagnie.",
    rak: [
      { airline: "Royal Air Maroc", from: "Paris-CDG, Paris-Orly, Bordeaux, Lyon, Marseille, Nantes, Nice, Toulouse" },
      { airline: "Air France", from: "Paris-CDG ; Nice (saisonnier)" },
      { airline: "Transavia", from: "Paris-Orly, Bordeaux, Brest, Lyon, Montpellier, Nantes, Rennes ; Marseille (saisonnier)" },
      { airline: "easyJet", from: "Paris-CDG, Bordeaux, Lille, Lyon, Nantes, Nice, Strasbourg, Toulouse, Bâle-Mulhouse" },
      { airline: "Ryanair", from: "Beauvais, Châlons-Vatry, Dole, Marseille, Nîmes, Perpignan, Toulouse, Tours ; La Rochelle, Limoges (saisonniers)" },
      { airline: "Volotea", from: "Nantes, Strasbourg ; Bordeaux, Lille, Lyon (saisonniers)" },
      { airline: "Vueling", from: "Paris-Orly (saisonnier)" },
    ],
    aga: [
      { airline: "Transavia", from: "Paris-Orly, Bordeaux, Brest, Lille, Lyon, Montpellier, Nantes, Rennes, Toulouse" },
      { airline: "Ryanair", from: "Beauvais, Marseille, Nantes, Toulouse" },
      { airline: "easyJet", from: "Nice, Bâle-Mulhouse ; Lyon, Paris-CDG (saisonniers) ; Bordeaux (à partir du 25 octobre 2026)" },
      { airline: "Royal Air Maroc", from: "Paris-Orly" },
      { airline: "Volotea", from: "Bordeaux, Lille, Nantes, Strasbourg (saisonniers)" },
      { airline: "Vueling", from: "Paris-Orly (saisonnier)" },
    ],
    basesHeading: "Marrakech ou Agadir ?",
    marrakechBase:
      "Marrakech ouvre sur le Haut Atlas et le Toubkal, sur Imlil où nous vivons, et sur les circuits du Sahara vers Merzouga et l'Erg Chegaga.",
    agadirBase:
      "Agadir est la porte de Paradise Valley, de l'Anti-Atlas, du parc national de Souss-Massa et des circuits désert au départ de la côte.",
    guidesHeading: "Des guides qui parlent français",
    guidesYes: "Parlent français : {names}.",
    guidesNo: "Nos guides parlent anglais.",
    ctaHeading: "Une question sur le voyage ?",
    ctaBody: "Écrivez-nous : nous répondons en moins d'une heure (de 8 h à 20 h, heure du Maroc) et construisons le circuit autour de vos vols.",
    labels: {
      rak: "Vers Marrakech (RAK)",
      aga: "Vers Agadir (AGA)",
      source: "Source",
      checked: "vérifié le",
      ask: "Nous écrire",
      whatsapp: "WhatsApp",
      breadcrumb: "Venir au Maroc",
    },
  },
  {
    slug: MARKET_SLUG_BY_LANG.es!,
    lang: "es",
    footerLabel: "Viajar desde España",
    guideLanguage: "Spanish",
    metaTitle: "Viajar a Marruecos: vuelos y pasaporte",
    metaDescription:
      "Pasaporte (el DNI no sirve), diferencia horaria y vuelos directos a Marrakech y Agadir desde España: lo que conviene saber antes de viajar.",
    h1: "Viajar a Marruecos desde España",
    intro:
      "Somos una familia de guías bereberes con licencia, de Imlil, en el Alto Atlas. Nuestros viajes salen de Marrakech y de Agadir. Esto es lo que necesitas saber antes de volar, con las fuentes oficiales.",
    entryHeading: "Entrada: pasaporte, no DNI",
    entry: [
      {
        who: "Ciudadanos españoles",
        text: "No necesitan visado para viajar por turismo. El DNI NO permite la entrada en Marruecos: hace falta pasaporte, con validez superior a seis meses. La estancia máxima es de 90 días en cada periodo de seis meses.",
        source: { label: "Ministerio de Asuntos Exteriores", url: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Marruecos" },
      },
    ],
    entryAdvice: "Es el error más habitual al volar desde España: viajar solo con el DNI. Lleva el pasaporte.",
    timeHeading: "Diferencia horaria",
    time: [
      "Marruecos está en UTC+1: la misma hora que la España peninsular en invierno y una hora menos de finales de marzo a finales de octubre. Con Canarias, al revés: una hora más en invierno y la misma hora en verano.",
      "Durante el ramadán, Marruecos pasa a UTC+0: en 2027, previsiblemente del 7 de febrero al 14 de marzo. Las fechas exactas las fija Marruecos cada año.",
    ],
    flightsHeading: "Vuelos directos a Marrakech y Agadir",
    flightsNote:
      "Datos de septiembre de 2026. Algunas rutas son de temporada y los horarios cambian: consulta con la aerolínea.",
    rak: [
      { airline: "Iberia", from: "Madrid" },
      { airline: "Air Europa", from: "Madrid" },
      { airline: "Ryanair", from: "Alicante, Barcelona, Girona, Gran Canaria, Madrid, Santander, Sevilla, Valencia, Zaragoza; Lanzarote, Palma, Tenerife Sur (temporada)" },
      { airline: "Vueling", from: "Barcelona; Bilbao, Santiago de Compostela (temporada)" },
      { airline: "Royal Air Maroc", from: "Barcelona" },
      { airline: "easyJet", from: "Málaga" },
      { airline: "Binter", from: "Tenerife Norte (temporada)" },
      { airline: "Volotea", from: "Bilbao (temporada)" },
    ],
    aga: [
      { airline: "Ryanair", from: "Madrid, Tenerife Sur" },
      { airline: "Binter", from: "Gran Canaria" },
      { airline: "Vueling", from: "Barcelona (temporada)" },
    ],
    basesHeading: "¿Marrakech o Agadir?",
    marrakechBase:
      "Desde Marrakech se llega al Alto Atlas y al Toubkal, a Imlil, donde vivimos, y a los viajes al Sáhara hacia Merzouga y Erg Chegaga.",
    agadirBase:
      "Agadir es la puerta de Paradise Valley, el Anti-Atlas, el parque nacional de Souss-Massa y los viajes al desierto desde la costa.",
    guidesHeading: "Guías que hablan español",
    guidesYes: "Habla español: {names}.",
    guidesNo: "Nuestros guías hablan inglés y francés.",
    ctaHeading: "¿Dudas sobre el viaje?",
    ctaBody: "Escríbenos: respondemos en menos de una hora (de 8:00 a 20:00, hora de Marruecos) y montamos el viaje en torno a tus vuelos.",
    labels: {
      rak: "A Marrakech (RAK)",
      aga: "A Agadir (AGA)",
      source: "Fuente",
      checked: "consultado el",
      ask: "Escríbenos",
      whatsapp: "WhatsApp",
      breadcrumb: "Cómo llegar",
    },
  },
  {
    slug: MARKET_SLUG_BY_LANG.it!,
    lang: "it",
    footerLabel: "Viaggiare dall'Italia",
    guideLanguage: "Italian",
    metaTitle: "Marocco dall'Italia: voli e passaporto",
    metaDescription:
      "Passaporto, fuso orario e voli diretti per Marrakech e Agadir dall'Italia: cosa sapere prima di partire, con le fonti ufficiali.",
    h1: "In Marocco dall'Italia",
    intro:
      "Siamo una famiglia di guide berbere con licenza, di Imlil, nell'Alto Atlante. I nostri tour partono da Marrakech e da Agadir. Ecco cosa sapere prima del volo, con le fonti ufficiali.",
    entryHeading: "Ingresso: serve il passaporto",
    entry: [
      {
        who: "Cittadini italiani",
        text: "Ingresso senza visto per soggiorni turistici fino a tre mesi. Serve il passaporto, valido almeno per tutta la durata del soggiorno in Marocco.",
        source: { label: "Viaggiare Sicuri (Farnesina)", url: "https://www.viaggiaresicuri.it/find-country/country/MAR" },
      },
    ],
    entryAdvice: "Per informazioni vincolanti sui documenti, la Farnesina rimanda all'Ambasciata del Regno del Marocco a Roma.",
    timeHeading: "Fuso orario",
    time: [
      "Il Marocco è a UTC+1: stessa ora dell'Italia in inverno, un'ora in meno da fine marzo a fine ottobre.",
      "Durante il Ramadan il Marocco passa a UTC+0: nel 2027, presumibilmente dal 7 febbraio al 14 marzo. Le date esatte vengono fissate ogni anno dal Marocco.",
    ],
    flightsHeading: "Voli diretti per Marrakech e Agadir",
    flightsNote:
      "Situazione a settembre 2026. Alcune rotte sono stagionali e gli orari cambiano: verificate con la compagnia aerea.",
    rak: [
      { airline: "Ryanair", from: "Bergamo, Milano Malpensa, Napoli, Pisa, Roma Ciampino, Treviso, Torino" },
      { airline: "easyJet", from: "Milano Malpensa, Napoli" },
      { airline: "Wizz Air", from: "Milano Malpensa, Palermo; Roma Fiumicino (stagionale)" },
      { airline: "TUI fly Belgium", from: "Bologna" },
    ],
    aga: [
      { airline: "Ryanair", from: "Bergamo; Milano Malpensa (dal 28 ottobre 2026)" },
      { airline: "Wizz Air", from: "Milano Malpensa" },
    ],
    basesHeading: "Marrakech o Agadir?",
    marrakechBase:
      "Da Marrakech si raggiungono l'Alto Atlante e il Toubkal, Imlil, dove viviamo, e i tour nel Sahara verso Merzouga ed Erg Chegaga.",
    agadirBase:
      "Agadir è la porta di Paradise Valley, dell'Anti-Atlante, del parco nazionale di Souss-Massa e dei tour nel deserto dalla costa.",
    guidesHeading: "Lingue delle nostre guide",
    guidesYes: "Parla italiano: {names}.",
    guidesNo: "Le nostre guide parlano inglese, francese e spagnolo, non italiano.",
    ctaHeading: "Domande sul viaggio?",
    ctaBody: "Scriveteci: rispondiamo entro un'ora (dalle 8:00 alle 20:00, ora del Marocco) e costruiamo il tour attorno ai vostri voli.",
    labels: {
      rak: "Per Marrakech (RAK)",
      aga: "Per Agadir (AGA)",
      source: "Fonte",
      checked: "verificato il",
      ask: "Scriveteci",
      whatsapp: "WhatsApp",
      breadcrumb: "Come arrivare",
    },
  },
  {
    slug: MARKET_SLUG_BY_LANG.en!,
    lang: "en",
    footerLabel: "Travelling from the UK",
    guideLanguage: "English",
    metaTitle: "Morocco from the UK: Flights, Passport",
    metaDescription:
      "UK passport rules, the time difference and direct flights to Marrakech and Agadir from UK airports: what to know before you book, with sources.",
    h1: "Travelling to Morocco from the UK",
    intro:
      "We are a family of licensed Berber guides from Imlil in the High Atlas, running tours from Marrakech and Agadir. Here is what to sort out before you fly, with the official sources.",
    entryHeading: "Entry: no visa, but check your passport date",
    entry: [
      {
        who: "British citizens",
        text: "No visa for tourist visits of up to 90 days. Your passport must have an expiry date at least 3 months after the day you arrive, and must not be damaged: Moroccan border staff have refused entry over damaged passports.",
        source: { label: "GOV.UK", url: "https://www.gov.uk/foreign-travel-advice/morocco/entry-requirements" },
      },
    ],
    entryAdvice: "Foreign currency worth 100,000 dirhams (about £8,000) or more must be declared on arrival and departure.",
    timeHeading: "Time difference",
    time: [
      "Morocco is on UTC+1: the same time as the UK in summer, one hour ahead in winter.",
      "During Ramadan Morocco switches to UTC+0, expected from 7 February to 14 March in 2027, so it matches UK time then. Morocco confirms the exact dates each year.",
    ],
    flightsHeading: "Direct flights to Marrakech and Agadir",
    flightsNote: "As of September 2026. Some routes are seasonal and schedules change, so check with the airline.",
    rak: [
      { airline: "British Airways", from: "London Gatwick, London Heathrow" },
      { airline: "easyJet", from: "Birmingham, Bristol, Liverpool, London Gatwick, London Luton, London Southend, Manchester; Belfast International, Edinburgh, Glasgow (seasonal)" },
      { airline: "Jet2", from: "Birmingham, Glasgow, London Stansted, Manchester, Newcastle; Leeds/Bradford (seasonal)" },
      { airline: "Ryanair", from: "Birmingham, Edinburgh, Liverpool, London Stansted, Manchester, Newcastle" },
      { airline: "TUI", from: "Birmingham, London Gatwick, Manchester; Bristol (seasonal)" },
      { airline: "Wizz Air", from: "London Gatwick" },
    ],
    aga: [
      { airline: "British Airways", from: "London Gatwick" },
      { airline: "easyJet", from: "Bristol, Edinburgh, London Gatwick, London Luton, Manchester; Glasgow (seasonal)" },
      { airline: "Jet2", from: "Birmingham, Bristol, Glasgow, Leeds/Bradford, London Stansted, Manchester; Bournemouth, East Midlands, Newcastle (seasonal); London Gatwick (from 26 October 2026)" },
      { airline: "Ryanair", from: "Birmingham, Edinburgh, London Stansted, Manchester" },
      { airline: "TUI", from: "Birmingham, London Gatwick, Manchester; Newcastle (seasonal)" },
    ],
    basesHeading: "Marrakech or Agadir?",
    marrakechBase:
      "Marrakech is the gateway to the High Atlas and Toubkal, to Imlil where we live, and to the Sahara tours to Merzouga and Erg Chegaga.",
    agadirBase:
      "Agadir is the base for Paradise Valley, the Anti-Atlas, Souss-Massa National Park and desert tours from the coast.",
    guidesHeading: "Guides who speak English",
    guidesYes: "English is spoken by {names}.",
    guidesNo: "Our guides speak French and Arabic.",
    ctaHeading: "Questions about getting here?",
    ctaBody: "Message us. We reply within the hour (8:00–20:00 Morocco time) and plan the tour around your flights.",
    labels: {
      rak: "To Marrakech (RAK)",
      aga: "To Agadir (AGA)",
      source: "Source",
      checked: "checked",
      ask: "Send an enquiry",
      whatsapp: "WhatsApp",
      breadcrumb: "Getting here",
    },
  },
];

export const marketFor = (lang: string, slug: string) => MARKETS.find((m) => m.lang === lang && m.slug === slug);
export const marketsIn = (lang: string) => MARKETS.filter((m) => m.lang === lang);
export const marketPath = (m: Market) => `/${m.lang}/travel-from/${m.slug}`;
