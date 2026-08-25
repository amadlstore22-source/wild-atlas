# -*- coding: utf-8 -*-
"""Add the `events` block to all six dictionaries.

Written in all six up front rather than shipping English and back-filling: the
review page proved that an English fallback renders perfectly and so hides the
gap indefinitely. See __tests__/lib/title-brand-suffix.test.ts.

`bookAhead` carries a {weeks} placeholder the page substitutes, so the number
lives in lib/events.ts (one place) and the sentence lives here (per language).
"""
import io, json, collections

D = "—"  # em dash

EVENTS = {
"en": {
  "metaTitle": "Festival Departures & Upcoming Events",
  "metaDesc": "Moroccan festivals worth planning a trip around %s the Gnaoua festival, the rose harvest, the Imilchil moussem %s and the tours we run to reach them." % (D, D),
  "eyebrow": "Plan around the calendar",
  "heading": "Upcoming events and festival departures",
  "sub": "Some of the best days in Morocco are fixed to a calendar we do not control: a harvest, a moon sighting, a mountain fair. These are the ones worth building a trip around, with the departures we run to reach them.",
  "confirmed": "Dates confirmed by the organisers",
  "estimated": "Dates not yet confirmed",
  "lunar": "Date set by moon sighting",
  "bookAhead": "Book around {weeks} weeks ahead — accommodation near these events fills early.",
  "seeDepartures": "See departures",
  "departuresHeading": "Tours we run for this",
  "officialSource": "Official festival site",
  "allEvents": "All upcoming events",
  "disclaimer": "Festival dates in Morocco move. Harvest festivals follow the crop, religious dates follow the moon sighting announced by the Ministry of Endowments and Islamic Affairs, and village moussems are set locally, sometimes only weeks ahead. We mark clearly which dates the organisers have confirmed and which are still our best estimate — and we will tell you before you book flights.",
},
"fr": {
  "metaTitle": "Départs festivals et événements à venir",
  "metaDesc": "Les festivals marocains autour desquels organiser un voyage %s le festival Gnaoua, la récolte des roses, le moussem d'Imilchil %s et les circuits que nous proposons pour y assister." % (D, D),
  "eyebrow": "Organisez selon le calendrier",
  "heading": "Événements à venir et départs festivals",
  "sub": "Certains des plus beaux jours au Maroc dépendent d'un calendrier que nous ne maîtrisons pas : une récolte, une observation de la lune, une foire de montagne. Voici ceux qui méritent qu'on construise un voyage autour, avec les départs que nous organisons pour s'y rendre.",
  "confirmed": "Dates confirmées par les organisateurs",
  "estimated": "Dates non encore confirmées",
  "lunar": "Date fixée par l'observation de la lune",
  "bookAhead": "Réservez environ {weeks} semaines à l'avance — les hébergements près de ces événements se remplissent tôt.",
  "seeDepartures": "Voir les départs",
  "departuresHeading": "Nos circuits pour cet événement",
  "officialSource": "Site officiel du festival",
  "allEvents": "Tous les événements à venir",
  "disclaimer": "Les dates des festivals marocains changent. Les fêtes de récolte suivent la culture, les dates religieuses suivent l'observation de la lune annoncée par le ministère des Habous et des Affaires islamiques, et les moussems villageois sont fixés localement, parfois quelques semaines seulement à l'avance. Nous indiquons clairement quelles dates sont confirmées par les organisateurs et lesquelles restent notre meilleure estimation — et nous vous préviendrons avant que vous ne réserviez vos vols.",
},
"es": {
  "metaTitle": "Salidas para festivales y próximos eventos",
  "metaDesc": "Festivales marroquíes que merecen un viaje %s el festival Gnaoua, la cosecha de rosas, el moussem de Imilchil %s y los circuitos que organizamos para llegar." % (D, D),
  "eyebrow": "Planifica según el calendario",
  "heading": "Próximos eventos y salidas para festivales",
  "sub": "Algunos de los mejores días en Marruecos dependen de un calendario que no controlamos: una cosecha, el avistamiento de la luna, una feria de montaña. Estos son los que merecen que organices un viaje a su alrededor, con las salidas que hacemos para llegar.",
  "confirmed": "Fechas confirmadas por los organizadores",
  "estimated": "Fechas aún sin confirmar",
  "lunar": "Fecha fijada por el avistamiento de la luna",
  "bookAhead": "Reserva unas {weeks} semanas antes — el alojamiento cerca de estos eventos se llena pronto.",
  "seeDepartures": "Ver salidas",
  "departuresHeading": "Circuitos que hacemos para esto",
  "officialSource": "Web oficial del festival",
  "allEvents": "Todos los próximos eventos",
  "disclaimer": "Las fechas de los festivales en Marruecos cambian. Las fiestas de cosecha siguen al cultivo, las fechas religiosas siguen el avistamiento de la luna que anuncia el Ministerio de Habices y Asuntos Islámicos, y los moussems de pueblo se fijan localmente, a veces con solo unas semanas de antelación. Señalamos con claridad qué fechas han confirmado los organizadores y cuáles siguen siendo nuestra mejor estimación — y te avisaremos antes de que reserves vuelos.",
},
"de": {
  "metaTitle": "Festival-Termine und kommende Veranstaltungen",
  "metaDesc": "Marokkanische Feste, für die sich eine Reise lohnt %s das Gnaoua-Festival, die Rosenernte, das Moussem von Imilchil %s und die Touren, mit denen wir hinfahren." % (D, D),
  "eyebrow": "Nach dem Kalender planen",
  "heading": "Kommende Veranstaltungen und Festival-Termine",
  "sub": "Einige der schönsten Tage in Marokko hängen an einem Kalender, den wir nicht bestimmen: eine Ernte, eine Mondsichtung, ein Bergmarkt. Das sind die Anlässe, um die sich eine Reise wirklich lohnt — mit den Touren, die wir dorthin führen.",
  "confirmed": "Termine vom Veranstalter bestätigt",
  "estimated": "Termine noch nicht bestätigt",
  "lunar": "Termin durch Mondsichtung festgelegt",
  "bookAhead": "Buchen Sie rund {weeks} Wochen im Voraus — Unterkünfte in der Nähe sind früh ausgebucht.",
  "seeDepartures": "Termine ansehen",
  "departuresHeading": "Unsere Touren dafür",
  "officialSource": "Offizielle Festival-Website",
  "allEvents": "Alle kommenden Veranstaltungen",
  "disclaimer": "Festivaltermine in Marokko verschieben sich. Erntefeste richten sich nach der Ernte, religiöse Termine nach der Mondsichtung, die das Ministerium für Stiftungen und islamische Angelegenheiten bekannt gibt, und Dorf-Moussems werden vor Ort festgelegt, manchmal erst wenige Wochen vorher. Wir kennzeichnen klar, welche Termine der Veranstalter bestätigt hat und welche unsere beste Schätzung sind — und wir sagen Ihnen Bescheid, bevor Sie Flüge buchen.",
},
"it": {
  "metaTitle": "Partenze per i festival ed eventi in arrivo",
  "metaDesc": "Feste marocchine per cui vale la pena organizzare un viaggio %s il festival Gnaoua, la raccolta delle rose, il moussem di Imilchil %s e i tour con cui ci arriviamo." % (D, D),
  "eyebrow": "Pianifica sul calendario",
  "heading": "Eventi in arrivo e partenze per i festival",
  "sub": "Alcuni dei giorni più belli in Marocco dipendono da un calendario che non decidiamo noi: un raccolto, l'avvistamento della luna, una fiera di montagna. Questi sono quelli per cui vale la pena costruire un viaggio, con le partenze che organizziamo per arrivarci.",
  "confirmed": "Date confermate dagli organizzatori",
  "estimated": "Date non ancora confermate",
  "lunar": "Data fissata dall'avvistamento della luna",
  "bookAhead": "Prenota circa {weeks} settimane prima — gli alloggi vicino a questi eventi si riempiono presto.",
  "seeDepartures": "Vedi le partenze",
  "departuresHeading": "I nostri tour per questo evento",
  "officialSource": "Sito ufficiale del festival",
  "allEvents": "Tutti gli eventi in arrivo",
  "disclaimer": "Le date dei festival in Marocco cambiano. Le feste del raccolto seguono la coltura, le date religiose seguono l'avvistamento della luna annunciato dal Ministero degli Habous e degli Affari islamici, e i moussem di villaggio si fissano localmente, a volte solo poche settimane prima. Indichiamo chiaramente quali date sono confermate dagli organizzatori e quali restano la nostra stima migliore — e ve lo diremo prima che prenotiate i voli.",
},
"ar": {
  "metaTitle": "مواعيد المهرجانات والفعاليات القادمة",
  "metaDesc": "مهرجانات مغربية تستحق تنظيم رحلة حولها %s مهرجان كناوة، موسم جني الورد، موسم إميلشيل %s والجولات التي ننظمها للوصول إليها." % (D, D),
  "eyebrow": "خطّط وفق التقويم",
  "heading": "الفعاليات القادمة ومواعيد المهرجانات",
  "sub": "بعض أجمل الأيام في المغرب مرتبطة بتقويم لا نتحكم فيه: موسم حصاد، رؤية هلال، أو سوق جبلي. هذه هي المناسبات التي تستحق أن تُبنى حولها رحلة، مع الجولات التي ننظمها للوصول إليها.",
  "confirmed": "مواعيد مؤكدة من المنظمين",
  "estimated": "المواعيد غير مؤكدة بعد",
  "lunar": "الموعد يُحدَّد برؤية الهلال",
  "bookAhead": "احجز قبل نحو {weeks} أسبوعًا — أماكن الإقامة قرب هذه الفعاليات تمتلئ مبكرًا.",
  "seeDepartures": "اطّلع على المواعيد",
  "departuresHeading": "جولاتنا لهذه المناسبة",
  "officialSource": "الموقع الرسمي للمهرجان",
  "allEvents": "كل الفعاليات القادمة",
  "disclaimer": "مواعيد المهرجانات في المغرب تتغيّر. مواسم الحصاد تتبع المحصول، والمواعيد الدينية تتبع رؤية الهلال التي تعلنها وزارة الأوقاف والشؤون الإسلامية، ومواسم القرى تُحدَّد محليًا، أحيانًا قبل أسابيع قليلة فقط. نوضّح بجلاء أي المواعيد أكّدها المنظمون وأيها ما زال تقديرنا الأفضل — وسنخبرك قبل أن تحجز تذاكر الطيران.",
},
}

ORDER = ["metaTitle", "metaDesc", "eyebrow", "heading", "sub", "confirmed",
         "estimated", "lunar", "bookAhead", "seeDepartures",
         "departuresHeading", "officialSource", "allEvents", "disclaimer"]


def run():
    for loc, block in EVENTS.items():
        path = "dictionaries/%s.json" % loc
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        data["events"] = collections.OrderedDict((k, block[k]) for k in ORDER)
        io.open(path, "w", encoding="utf-8", newline="\n").write(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print("  %-24s events block added (%d fields)" % (path, len(ORDER)))


run()
