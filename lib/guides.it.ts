import type { Guide } from "./guides";

export const GUIDES: Guide[] = [
  {
    id: "smail-aitidar",
    name: "Smail Aitidar",
    role: "Co-fondatore e Guida Capo",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Arabo", "Berbero (Tachelhit)", "Francese", "Inglese", "Spagnolo"],
    regions: ["Alto Atlante", "Sahara", "Valle del Draa", "Medina di Marrakech"],
    specialties: ["Trekking in alta quota", "Vetta del Toubkal", "Traversate di più giorni", "Spedizioni nel deserto"],
    shortBio:
      "Nato ai piedi dell'Alto Atlante, Smail è cresciuto percorrendo gli stessi sentieri che oggi guida — erede di una tradizione familiare di guide che dura da oltre 30 anni. Ha co-fondato Marrakech Eco Tours nel 2010, proseguendo l'eredità di suo padre Lahsen.",
    longBio: `Smail Aitidar è cresciuto in un villaggio sui versanti meridionali dell'Alto Atlante, là dove iniziano i sentieri verso il Toubkal. Suo padre, Lahsen, fu tra le prime guide berbere autorizzate della regione, e Smail percorreva quei sentieri ancor prima di saper leggere una cartina.

Prima dei trent'anni aveva già raggiunto la vetta del Toubkal oltre cento volte, in ogni stagione — campi di neve primaverili, pietraie estive, nebbia autunnale e ghiaccio invernale. Nel 2010, insieme al fratello Mohamed, ha reso ufficiale quella che era sempre stata una vocazione di famiglia, fondando Marrakech Eco Tours e trasformandola nell'agenzia che è oggi.

Smail parla cinque lingue ed è autorizzato dall'Ufficio Nazionale Marocchino del Turismo. Guida personalmente gli itinerari più impegnativi dal punto di vista tecnico — i tentativi di vetta del Toubkal, la traversata del massiccio del M'Goun e le traversate dell'Alto Atlante di più settimane — e forma ogni guida che entra a far parte del team.

La sua filosofia di guida: "Il compito di una guida non è mostrare la montagna alle persone. È farla sentire loro."`,
    routesLed: [
      "toubkal-summit-trek-4day",
      "mgoun-massif-traverse-7day",
      "3-day-sahara-desert-tour-from-marrakech",
    ],
    isFounder: true,
  },
  {
    id: "mohamed-aitidar",
    name: "Mohamed Aitidar",
    role: "Co-fondatore e Guida Culturale",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Arabo", "Berbero (Tachelhit)", "Francese", "Inglese", "Tedesco"],
    regions: ["Medina di Marrakech", "Città Imperiali", "Contrafforti dell'Atlante", "Agadir e Anti-Atlante"],
    specialties: ["Tour culturali e del patrimonio", "Città imperiali", "Regione di Agadir", "Itinerari gastronomici e delle spezie"],
    shortBio:
      "Mohamed si occupa del lato culturale dell'agenzia — tour della medina, itinerari nelle città imperiali e la base di Agadir. La sua profonda conoscenza della storia e dell'architettura marocchine rende ogni visita alla medina una scoperta diversa.",
    longBio: `Mohamed Aitidar condivide le stesse radici nell'Alto Atlante di suo fratello Smail, ma la sua passione è il paesaggio umano del Marocco — le medine, i souk, i riad e le tradizioni che plasmano la vita in queste terre da secoli.

Dopo anni trascorsi a guidare tour culturali a Marrakech e nelle città imperiali, Mohamed ha aperto la base di Agadir nel 2018, estendendo l'attività di famiglia fino alla costa atlantica e aprendo l'Anti-Atlante, il Parco Nazionale di Souss-Massa e la Valle del Paradiso ai viaggiatori con base nel sud.

Guida personalmente i tour culturali e le visite alla medina, e forma le guide nelle città. La sua conoscenza dell'architettura marocchina, della ceramica, della storia tessile e della tradizione culinaria è enciclopedica — gli ospiti descrivono spesso i suoi tour della medina come la migliore ora trascorsa in Marocco.

Mohamed parla cinque lingue ed è titolare di una licenza ufficiale di guida rilasciata dall'Ufficio Nazionale Marocchino del Turismo.`,
    routesLed: [
      "marrakech-medina-cultural-tour",
      "fes-medina-full-day-tour",
      "chefchaouen-and-rif-mountains-day-tour",
    ],
    isFounder: true,
  },
  {
    id: "lahsen-aitidar",
    name: "Lahsen Aitidar",
    role: "Fondatore — La Prima Guida",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 40,
    languages: ["Arabo", "Berbero (Tachelhit)", "Francese"],
    regions: ["Alto Atlante", "Toubkal", "Valle dell'Ourika", "Aït Benhaddou"],
    specialties: ["Itinerari pionieristici dell'Alto Atlante", "Sapere berbero tradizionale", "Toubkal"],
    shortBio:
      "Lahsen è stato una delle prime guide di montagna berbere autorizzate nell'Alto Atlante — accompagnando escursionisti sul Toubkal e nelle valli dell'Atlante molto prima che il Marocco avesse un'industria turistica formale. Tutto ciò che Smail e Mohamed sanno, lo hanno imparato da lui.",
    longBio: `Lahsen Aitidar ha iniziato a fare la guida negli anni '80, quando i sentieri verso il Toubkal non comparivano ancora in nessuna guida turistica. Berbero nato nell'Alto Atlante, è stato tra i primi della regione a ricevere una licenza di guida ufficiale — un riconoscimento di una conoscenza costruita percorrendo ogni sentiero, in ogni stagione, per anni.

Ha condotto gruppi di viaggiatori attraverso l'Atlante in un'epoca in cui la logistica era interamente improvvisata: muli noleggiati nei villaggi vicini, cibo procurato dalle famiglie berbere lungo il percorso, riparo trovato in capanne di pietra dei pastori. Ha costruito la fiducia di ogni gruppo nell'unico modo che conosceva: conoscendo il territorio alla perfezione e trattando ogni ospite con la stessa ospitalità che avrebbe riservato a un membro della propria famiglia.

Ha trasmesso quello stesso standard — e ogni itinerario — ai suoi figli Smail e Mohamed. Lahsen è oggi ritirato dall'attività di guida, ma la sua conoscenza continua a ispirare ogni itinerario proposto dall'agenzia.`,
    routesLed: [],
    isFounder: false,
    isLegacy: true,
  },
];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}
