import type { Guide } from "./guides";

export const GUIDES: Guide[] = [
  {
    id: "smail-aitidar",
    name: "Smail Aitidar",
    role: "Cofundador y guía principal",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Árabe", "Bereber (Tachelhit)", "Francés", "Inglés", "Español"],
    regions: ["Alto Atlas", "Sáhara", "Valle del Draa", "Medina de Marrakech"],
    specialties: ["Trekking de gran altitud", "Cima del Toubkal", "Travesías de varios días", "Expediciones al desierto"],
    shortBio:
      "Nacido en las estribaciones del Alto Atlas, Smail creció recorriendo a pie las rutas que hoy guía, dentro de una tradición familiar de guías que se remonta a más de 30 años. Cofundó Marrakech Eco Tours en 2010, construyendo sobre el legado de su padre, Lahsen.",
    longBio: `Smail Aitidar se crio en un pueblo en las laderas meridionales del Alto Atlas, donde comienzan las rutas hacia el Toubkal. Su padre, Lahsen, fue uno de los primeros guías bereberes con licencia de la región, y Smail recorría esas rutas antes de saber leer un mapa.

Antes de cumplir los treinta, ya había alcanzado la cima del Toubkal más de un centenar de veces, en todas las estaciones: nieves primaverales, pedregales de verano, niebla otoñal y hielo invernal. En 2010, junto a su hermano Mohamed, formalizó lo que siempre había sido una vocación familiar, fundando Marrakech Eco Tours y convirtiéndola en la operación que es hoy.

Smail habla cinco idiomas y cuenta con licencia de la Oficina Nacional Marroquí de Turismo. Guía personalmente las rutas más exigentes técnicamente —los intentos de cima del Toubkal, la travesía del macizo del M'Goun y las travesías del Alto Atlas de varias semanas— y forma a todos los guías que se incorporan al equipo.

Su filosofía como guía: "El trabajo de un guía no es mostrar la montaña a la gente. Es hacer que la sientan."`,
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
    role: "Cofundador y guía cultural",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 30,
    languages: ["Árabe", "Bereber (Tachelhit)", "Francés", "Inglés", "Alemán"],
    regions: ["Medina de Marrakech", "Ciudades imperiales", "Estribaciones del Atlas", "Agadir y Antiatlas"],
    specialties: ["Tours culturales y patrimoniales", "Ciudades imperiales", "Región de Agadir", "Rutas gastronómicas y de especias"],
    shortBio:
      "Mohamed se encarga del lado cultural de la operación: tours por la medina, rutas por las ciudades imperiales y la base de Agadir. Su profundo conocimiento de la historia y la arquitectura marroquíes convierte cada tour por la medina en un descubrimiento distinto.",
    longBio: `Mohamed Aitidar comparte las mismas raíces del Alto Atlas que su hermano Smail, pero su pasión es el paisaje humano de Marruecos: las medinas, los zocos, los riads y las tradiciones que han moldeado la vida aquí durante siglos.

Tras años dirigiendo tours culturales en Marrakech y las ciudades imperiales, Mohamed abrió la base de Agadir en 2018, extendiendo la operación familiar hasta la costa atlántica y abriendo el Antiatlas, el Parque Nacional de Souss-Massa y el Valle del Paraíso a los viajeros con base en el sur.

Dirige personalmente los tours culturales y de medina, y forma a los guías en las ciudades. Su conocimiento de la arquitectura marroquí, la cerámica, la historia textil y la tradición culinaria es enciclopédico; los huéspedes suelen describir sus tours por la medina como la mejor hora que pasaron en Marruecos.

Mohamed habla cinco idiomas y posee una licencia oficial de guía de la Oficina Nacional Marroquí de Turismo.`,
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
    role: "Fundador — El primer guía",
    photo: null,
    certificationNumber: null,
    yearsGuiding: 40,
    languages: ["Árabe", "Bereber (Tachelhit)", "Francés"],
    regions: ["Alto Atlas", "Toubkal", "Valle del Ourika", "Aït Benhaddou"],
    specialties: ["Rutas pioneras del Alto Atlas", "Saber bereber tradicional", "Toubkal"],
    shortBio:
      "Lahsen fue uno de los primeros guías de montaña bereberes con licencia del Alto Atlas, guiando a excursionistas por el Toubkal y los valles del Atlas mucho antes de que Marruecos contara con una industria turística formal. Todo lo que saben Smail y Mohamed lo aprendieron de él.",
    longBio: `Lahsen Aitidar comenzó a guiar en la década de 1980, antes de que los senderos hacia el Toubkal tuvieran nombre en ninguna guía de viaje. Bereber nacido en el Alto Atlas, fue uno de los primeros de la región en recibir una licencia oficial de guía, un reconocimiento a un conocimiento que había construido caminando cada ruta, en cada estación, durante años.

Guio a grupos de viajeros por el Atlas en una época en la que la logística era totalmente improvisada: mulas alquiladas en pueblos vecinos, comida obtenida de familias bereberes a lo largo de la ruta, refugio encontrado en cabañas de pastores de piedra. Construyó la confianza de cada grupo del único modo que conocía: conociendo el terreno a la perfección y tratando a cada huésped con la misma hospitalidad que ofrecería a un familiar.

Transmitió ese estándar —y cada ruta— a sus hijos Smail y Mohamed. Lahsen está ahora retirado del guiado activo, pero su conocimiento sigue guiando cada itinerario que ofrece la empresa.`,
    routesLed: [],
    isFounder: false,
    isLegacy: true,
  },
];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}
