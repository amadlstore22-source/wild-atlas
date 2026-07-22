import type { Tour } from "./tours";

export const TOURS: Tour[] = [
  // ─────────────────────────────────────────────
  // TOUR DA MARRAKECH
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "toubkal-summit-trek-4day",
    title: "Da Marrakech alla vetta del Toubkal — Trekking di 4 giorni",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "4 giorni / 3 notti",
    groupSize: "2–10 people",
    reviewCount: 48,
    rating: 4.9,
    price: 380,
    depositAmount: 95,
    heroImage: "/gallery/toubkal-summit-guide-thumbs-up.jpg",
    gallery: [
      "/gallery/toubkal-summit-guide-thumbs-up.jpg",
      "/gallery/toubkal-group-snow-ascent.jpg",
      "/gallery/toubkal-predawn-summit-start-crampons.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "Conquista il Jbel Toubkal (4.167 m) — il tetto del Nord Africa — attraverso villaggi berberi e alte vallate alpine.",
    description:
      "Il Trekking alla Vetta del Toubkal è la classica avventura dell'Alto Atlante. Percorri antichi sentieri per muli, dormi nei rifugi di montagna e raggiungi il punto più alto del Nord Africa mentre l'alba si diffonde sul Marocco. Quattro giorni che cambiano la prospettiva, impegnativi ma senza necessità di tecniche di arrampicata.",
    highlights: [
      "Vetta del Jbel Toubkal a 4.167 m — la più alta del Nord Africa",
      "Notte nei tradizionali rifugi berberi di montagna a 3.207 m",
      "Partenza dal villaggio di Imlil, nel cuore dell'Atlante",
      "Panorami che spaziano tra Marocco e Algeria",
    ],
    includes: [
      "Professional licensed mountain guide",
      "3 nights mountain refuge accommodation",
      "All meals during the trek",
      "Mule porter for group gear",
      "National park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Imlil (1.740 m)",
        description:
          "Trasferimento da Marrakech a Imlil (1h30), il villaggio di partenza per il Toubkal. Sistemazione, incontro con la guida e breve camminata di acclimatamento tra i campi terrazzati berberi. Cena di benvenuto.",
      },
      {
        day: 2,
        title: "Imlil → Rifugio Toubkal (3.207 m)",
        description:
          "Salita lungo la valle di Mizane, oltre il santuario di Sidi Chamharouch, fino al rifugio di montagna. Passeggiata di acclimatamento nel pomeriggio sopra il campo. A letto presto prima del giorno della vetta.",
      },
      {
        day: 3,
        title: "Giorno della vetta — Toubkal (4.167 m)",
        description:
          "Partenza prima dell'alba alle 5:00. Salita ripida lungo il pietrisco del Circo Sud. Vetta all'alba. Discesa al rifugio per la cena di festeggiamento.",
      },
      {
        day: 4,
        title: "Rifugio → Imlil → Marrakech",
        description:
          "Discesa mattutina tra prati fioriti. Trasferimento di ritorno a Marrakech. Il tour termina nel primo pomeriggio.",
      },
    ],
    faq: [
      { q: "Il trekking di 4 giorni è meglio del 2 giorni per un primo tentativo sul Toubkal?", a: "Per la maggior parte delle persone, sì. I giorni extra servono ad acclimatarsi, non a coprire più terreno, e l'altitudine — non la forma fisica — è di solito il motivo per cui ci si trova in difficoltà vicino alla vetta. Se non sei mai stato vicino ai 4.000 metri, questa è la versione da scegliere." },
      { q: "Come sono le sistemazioni durante questo trekking?", a: "Un mix tra guesthouse di villaggio e il Rifugio Toubkal a 3.207 metri. Il rifugio è una vera casa di montagna: camerate condivise, letti a castello con materassi e coperte, pasti in comune e notti fredde. Porta un sacco lenzuolo, una torcia frontale e i tappi per le orecchie." },
      { q: "Devo portare il mio zaino?", a: "Solo uno zaino da giornata con acqua, strati e macchina fotografica. I muli trasportano il bagaglio principale tra una tappa e l'altra, il che rende gestibili giornate di cammino consecutive anche per chi non ha mai fatto trekking in quota." },
      { q: "A che ora inizia il giorno della vetta?", a: "Prima dell'alba. La salita finale dal rifugio richiede circa tre ore, e partire presto significa raggiungere la cima per il sorgere del sole e scendere prima che il meteo peggiori nel pomeriggio. È il momento più freddo della giornata, quindi lo strato caldo che hai portato con te finalmente torna utile." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking Vetta Toubkal 4 Giorni — Scala la Cima più Alta del Nord Africa | Marrakech Eco Tours",
    seoDescription: "Conquista il Jbel Toubkal (4.167 m) con una guida berbera autorizzata. Trekking di 4 giorni da Marrakech — rifugi, tutti i pasti e trasferimento incluso. Da $380.",
    featured: true,
  },
  {
    id: "2",
    slug: "sahara-3day-marrakech",
    title: "Da Marrakech a Merzouga — Tour del Deserto di 3 Giorni",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 giorni / 2 notti",
    groupSize: "2–12 people",
    reviewCount: 124,
    rating: 4.8,
    price: 245,
    depositAmount: 65,
    heroImage:
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
    ],
    shortDescription:
      "Cavalca i cammelli tra le dorate dune dell'Erg Chebbi e dormi sotto un milione di stelle in un campo berbero di lusso nel deserto.",
    description:
      "Tre giorni da Marrakech al Sahara e ritorno. Attraversa l'Alto Atlante, fermati al Ksar patrimonio UNESCO di Aït Ben Haddou, percorri la Valle del Draa e cavalca il cammello nell'Erg Chebbi mentre il sole si scioglie tra le dune. Una notte sotto le stelle in un tradizionale campo di lusso.",
    highlights: [
      "Trekking in cammello tra le dune dell'Erg Chebbi al tramonto",
      "Notte in un campo berbero di lusso nel deserto",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Osservazione delle stelle senza inquinamento luminoso",
      "Sandboard sulle grandi dune",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Sunset camel ride",
      "1 night luxury desert camp (dinner + breakfast)",
      "1 night hotel in Ouarzazate or Merzouga",
      "Experienced desert guide",
      "Sandboarding equipment",
    ],
    excludes: [
      "Lunches on days 1 and 3",
      "Personal expenses and tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate",
        description:
          "Partenza da Marrakech alle 7:00. Attraversamento del passo Tizi n'Tichka (2.260 m). Visita di Aït Ben Haddou. Notte a Ouarzazate — la porta del deserto.",
      },
      {
        day: 2,
        title: "Ouarzazate → Valle del Draa → Campo dell'Erg Chebbi",
        description:
          "Percorso lungo la palmeria della Valle del Draa. Arrivo a Merzouga nel primo pomeriggio. Trekking in cammello nell'Erg Chebbi al tramonto. Cena e musica gnawa sotto le stelle.",
      },
      {
        day: 3,
        title: "Alba nel Sahara → Gola del Todra → Marrakech",
        description:
          "Sveglia prima dell'alba per ammirare il sole che sorge sulle dune. Rientro in cammello e colazione. Ritorno via la Gola del Todra. Arrivo a Marrakech in serata.",
      },
    ],
    faq: [
      { q: "Perché questo viaggio dura tre giorni?", a: "Perché Merzouga e le dune dell'Erg Chebbi si trovano oltre l'Atlante. Tre giorni sono quanto richiede la distanza — qualsiasi soluzione più breve porta altrove, non nel vero Sahara, oppure passa quasi tutto il tempo in auto." },
      { q: "Cosa vediamo durante il tragitto?", a: "Il percorso attraversa il passo del Tizi n'Tichka e comprende Aït Ben Haddou e la regione delle gole, quindi il viaggio ha un valore in sé invece di essere tempo perso per arrivare da qualche parte. Il tragitto è suddiviso in tappe con soste, non percorso tutto d'un fiato." },
      { q: "Com'è la notte nel campo nel deserto?", a: "Letti con coperte in tenda, cena insieme e silenzio assoluto una volta spenti i generatori. Le dune sono davvero buie, motivo per cui la maggior parte dei viaggiatori ricorda il cielo stellato più della cavalcata in cammello. Porta uno strato caldo — le notti nel deserto sono fredde fuori dall'estate." },
      { q: "Devo per forza cavalcare un cammello?", a: "No. Il tratto in cammello verso il campo è breve e facoltativo, e camminare al suo posto è abbastanza comune che le guide se lo aspettino. Tutta la vera distanza viene coperta in veicolo." },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Tour del Deserto del Sahara 3 Giorni da Marrakech — Cammelli, Dune e Campo nel Deserto | Marrakech Eco Tours",
    seoDescription: "Trekking in cammello nell'Erg Chebbi al tramonto e notte sotto le stelle. Tour di 3 giorni da Marrakech al Sahara con Aït Ben Haddou, Valle del Draa e campo berbero di lusso. Da $245.",
    featured: true,
  },
  {
    id: "3",
    slug: "ourika-valley-day-hike",
    title: "Da Marrakech alla Valle dell'Ourika — Escursione Giornaliera",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 giorno",
    groupSize: "2–15 people",
    reviewCount: 203,
    rating: 4.7,
    price: 35,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1739464889400-e87ec57f246d?w=1200&q=85",
      "https://images.unsplash.com/photo-1568241360857-e23e825c4e08?w=1200&q=85",
      "https://images.unsplash.com/photo-1597823262196-cc7e878d73ce?w=1200&q=85",
    ],
    shortDescription:
      "Un'escursione di un'intera giornata tra noceti, villaggi berberi e torrenti di montagna a soli 45 minuti da Marrakech.",
    description:
      "La Valle dell'Ourika è un mondo a parte rispetto alla città — campi terrazzati aggrappati a colline di roccia rossa, donne berbere che tessono tappeti davanti alle proprie case, torrenti di montagna che scorrono impetuosi tra i sentieri. Perfetta per famiglie ed escursionisti alle prime armi. Le cascate di Setti Fatma, in cima alla valle, sono il momento clou.",
    highlights: [
      "Escursione alle cascate di Setti Fatma (7 salti d'acqua)",
      "Passeggiata tra villaggi berberi raramente visitati dai turisti",
      "Bagno nelle piscine naturali di montagna",
      "Pranzo berbero tradizionale con una famiglia locale",
    ],
    includes: [
      "Certified hiking guide",
      "Round-trip transport from Marrakech",
      "Traditional Berber lunch",
      "Mineral water throughout",
    ],
    excludes: ["Personal hiking gear", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Valle dell'Ourika",
        description:
          "Partenza da Marrakech alle 8:30. Inizio dell'escursione alle 9:30 tra villaggi e campi terrazzati. Bagno alle cascate. Pranzo berbero tradizionale. Rientro a Marrakech per le 17:00.",
      },
    ],
    meetingPoint: { lat: 31.3489, lng: -7.7411, name: "Ourika Valley, High Atlas" },
    seoTitle: "Escursione alla Valle dell'Ourika da Marrakech — Cascate e Villaggi Berberi | Marrakech Eco Tours",
    seoDescription: "Escursione alle cascate di Setti Fatma tra villaggi berberi e torrenti di montagna, a soli 45 minuti da Marrakech. Gita giornaliera guidata con pranzo berbero incluso. Da $35.",
    featured: true,
  },
  {
    id: "4",
    slug: "ouzoud-waterfalls-day-trip",
    title: "Da Marrakech alle Cascate di Ouzoud — Gita Giornaliera",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 giorno",
    groupSize: "2–15 people",
    reviewCount: 167,
    rating: 4.8,
    price: 30,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1683028094236-7e5655c6607b?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1683028094236-7e5655c6607b?w=1200&q=85",
      "https://images.unsplash.com/photo-1768498681713-e100323adb3c?w=1200&q=85",
      "https://images.unsplash.com/photo-1603982626518-eff2f11a4e70?w=1200&q=85",
    ],
    shortDescription:
      "Le cascate più spettacolari del Marocco — 110 m di acqua che precipita, macachi della Barberia selvatici e una gola mozzafiato.",
    description:
      "Con i suoi 110 metri, le cascate di Ouzoud sono le più alte del Nord Africa. La gola avvolta nella foschia ospita gruppi di macachi della Barberia allo stato selvatico, piscine attraversate dall'arcobaleno alla base e antichi mulini ancora in funzione per la macinazione dell'argan. Due ore di auto da Marrakech, e ne vale assolutamente la pena.",
    highlights: [
      "Le cascate di Ouzoud — 110 m di salto, le più alte del Nord Africa",
      "Macachi della Barberia selvatici nel loro habitat naturale",
      "Giro in barca alla base delle cascate",
      "Visita a un mulino ad acqua tradizionale",
      "Passeggiata panoramica nella gola con guida locale",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "Certified guide",
      "Boat ride at the falls",
      "Mineral water",
    ],
    excludes: ["Lunch", "Tips", "Personal purchases"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Cascate di Ouzoud",
        description:
          "Partenza da Marrakech alle 7:30. Arrivo a Ouzoud entro le 9:30. Passeggiata guidata fino alle cascate, sentiero nella gola, giro in barca, avvistamento dei macachi. Tempo libero per il pranzo. Rientro a Marrakech per le 18:00.",
      },
    ],
    meetingPoint: { lat: 32.0061, lng: -6.7200, name: "Ouzoud Falls, Middle Atlas" },
    seoTitle: "Gita alle Cascate di Ouzoud da Marrakech — Macachi della Barberia e 110m di Cascate | Marrakech Eco Tours",
    seoDescription: "Visita la cascata più alta del Marocco — 110 metri di acqua che precipita, macachi della Barberia selvatici e un giro in barca nella gola. Gita giornaliera da Marrakech con guida inclusa. Da $30.",
    featured: false,
  },
  {
    id: "5",
    slug: "agafay-desert-sunset",
    title: "Da Marrakech al Deserto di Agafay — Tramonto e Cena",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    duration: "1 giorno (pomeriggio–sera)",
    groupSize: "2–20 people",
    reviewCount: 89,
    rating: 4.6,
    price: 75,
    depositAmount: 20,
    heroImage:
      "https://images.unsplash.com/photo-1535191059345-c16453b851b2?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1535191059345-c16453b851b2?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1743890914315-b53fb9e704cf?w=1200&q=85",
    ],
    shortDescription:
      "Il Sahara in 30 minuti — quad al tramonto, cavalcate in cammello e una cena berbera tradizionale nel deserto roccioso di Agafay.",
    description:
      "Non servono tre giorni per sentire il deserto. L'Agafay — un vasto paesaggio lunare di hammada rocciosa a soli 30 km da Marrakech — regala una vera atmosfera sahariana al tramonto. Guida un quad sull'altopiano, cavalca un cammello fino al campo e siediti per un banchetto berbero tradizionale con vista sull'Atlante.",
    highlights: [
      "Quad nel deserto roccioso di Agafay",
      "Cavalcata in cammello fino al punto panoramico del tramonto",
      "Cena berbera tradizionale in un campo nel deserto",
      "Monti Atlante all'orizzonte al crepuscolo",
      "A soli 30 minuti da Marrakech",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "1-hour quad biking",
      "Camel ride",
      "Traditional Berber dinner",
      "Mint tea ceremony",
    ],
    excludes: ["Alcoholic drinks", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Pomeriggio nel Deserto di Agafay",
        description:
          "Ritiro da Marrakech alle 15:00. Arrivo ad Agafay entro le 15:30. Sessione di quad, cavalcata in cammello al tramonto (17:30–18:30). Cena berbera tradizionale sotto le stelle. Rientro a Marrakech per le 22:00.",
      },
    ],
    meetingPoint: { lat: 31.4969, lng: -8.1073, name: "Agafay Desert, Marrakech Region" },
    seoTitle: "Tour al Tramonto nel Deserto di Agafay da Marrakech — Quad, Cammelli e Cena Berbera | Marrakech Eco Tours",
    seoDescription: "Vivi il Sahara in 30 minuti — quad, cavalcata in cammello al tramonto e una cena berbera tradizionale nel deserto roccioso di Agafay vicino a Marrakech. Da $75.",
    featured: false,
  },
  {
    id: "6",
    slug: "marrakech-medina-cultural-tour",
    title: "Medina di Marrakech — Tour Culturale",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Mezza giornata (4 ore)",
    groupSize: "2–8 people",
    reviewCount: 97,
    rating: 4.9,
    price: 45,
    depositAmount: 12,
    heroImage:
      "https://images.unsplash.com/photo-1722180862276-970599009d51?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1722180862276-970599009d51?w=1200&q=85",
      "https://images.unsplash.com/photo-1772580310425-63f2290c2ba7?w=1200&q=85",
      "https://images.unsplash.com/photo-1653260137243-2b3daabf9aab?w=1200&q=85",
    ],
    shortDescription:
      "Naviga nei labirintici souk di Marrakech con un esperto locale — spezie, conce, artigiani e giardini nascosti nei riad.",
    description:
      "La medina di Marrakech è un sito patrimonio UNESCO e uno dei labirinti urbani più vivaci del pianeta. La tua guida locale ti condurrà tra gli antichi souk, oltre montagne di spezie e ceramiche dipinte a mano, dentro le conce artigianali in funzione, fino a una terrazza sopra la moschea della Koutoubia.",
    highlights: [
      "Piazza Jemaa el-Fna nel suo momento più vivace",
      "Conce artigianali viste da una terrazza privata",
      "Madrasa Ben Youssef — collegio islamico del XVI secolo",
      "Souk delle spezie e cooperativa dell'olio di argan",
      "Giardino nascosto di un riad e tè alla menta tradizionale",
    ],
    includes: [
      "Private English/French/Spanish/Arabic guide",
      "Entrance fees to monuments",
      "Traditional mint tea ceremony",
      "4-hour guided walking tour",
    ],
    excludes: ["Lunch", "Shopping and souvenirs", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Immersione completa nella Medina",
        description:
          "Inizio alle 9:00 presso la moschea della Koutoubia. Passeggiata attraverso il Mellah, la Madrasa Ben Youssef, i souk artigianali, le conce e Jemaa el-Fna. Tè alla menta in un riad nascosto. Termine alle 13:00.",
      },
    ],
    meetingPoint: { lat: 31.6295, lng: -7.9811, name: "Koutoubia Mosque, Marrakech" },
    seoTitle: "Tour Culturale della Medina di Marrakech — Souk, Concerie e Riad | Marrakech Eco Tours",
    seoDescription: "Esplora la medina UNESCO di Marrakech con una guida locale — conce artigianali, Madrasa Ben Youssef, Jemaa el-Fna e giardini nascosti nei riad. Tour privato di mezza giornata. Da $45.",
    featured: false,
  },
  {
    id: "7",
    slug: "marrakech-to-fes-3day",
    title: "Da Marrakech a Fes — Tour delle Città Imperiali di 3 Giorni",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "3 giorni / 2 notti",
    groupSize: "2–12 people",
    reviewCount: 61,
    rating: 4.7,
    price: 290,
    depositAmount: 75,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
    ],
    shortDescription:
      "Due delle più grandi città del Marocco in tre giorni — passo dell'Alto Atlante, Ifrane, foresta di cedri e l'antica medina di Fes.",
    description:
      "La strada da Marrakech a Fes è una delle più spettacolari dell'Africa. Attraversa l'Alto Atlante via Tizi n'Tichka, fermati al Ksar patrimonio UNESCO di Aït Ben Haddou, percorri le foreste di cedri del Medio Atlante dove vagano i macachi della Barberia selvatici, e arriva a Fes el-Bali — la più grande città medievale ancora abitata al mondo.",
    highlights: [
      "Passo di montagna del Tizi n'Tichka (2.260 m)",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Ifrane — il villaggio alpino del Marocco",
      "Foresta di cedri di Azrou e macachi della Barberia",
      "Medina di Fes el-Bali e concerie Chouara",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "2 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Fes"],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Partenza alle 7:30. Salita sull'Atlante via Tizi n'Tichka. Visita di Aït Ben Haddou. Proseguimento attraverso la Valle dello Ziz fino a Midelt per la notte.",
      },
      {
        day: 2,
        title: "Midelt → Ifrane → Foresta di Cedri di Azrou → Fes",
        description:
          "Attraversamento del Medio Atlante. Sosta a Ifrane e nella foresta di cedri di Azrou per avvistare i macachi della Barberia selvatici. Arrivo a Fes nel pomeriggio. Check-in al riad.",
      },
      {
        day: 3,
        title: "Giornata intera nella Medina di Fes",
        description:
          "Esplorazione guidata di Fes el-Bali: concerie Chouara, Università Al-Qarawiyyin, Medersa Bou Inania e i labirintici souk. Il tour si conclude a Fes.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Tour di 3 Giorni da Marrakech a Fes — Città Imperiali e Alto Atlante | Marrakech Eco Tours",
    seoDescription: "Viaggia da Marrakech a Fes via Tizi n'Tichka, Aït Ben Haddou e le foreste di cedri del Medio Atlante. Tour privato 4x4 di 3 giorni con alloggio in riad. Da $290.",
    featured: false,
  },
  {
    id: "8",
    slug: "mgoun-massif-trek",
    title: "Da Marrakech al Massiccio del M'Goun — Traversata di 7 Giorni",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "7 giorni / 6 notti",
    groupSize: "2–8 people",
    reviewCount: 31,
    rating: 5.0,
    price: 820,
    depositAmount: 200,
    heroImage:
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1575064038796-5f31308aa3e9?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
    ],
    shortDescription:
      "Il trekking più selvaggio del Marocco — 7 giorni attraverso il remoto Massiccio del M'Goun (4.068 m) senza altri turisti in vista.",
    description:
      "La Traversata del Massiccio del M'Goun è pensata per trekker esperti che vogliono andare oltre i sentieri battuti. Sette giorni di wilderness d'alta quota, valicando passi oltre i 3.600 m, dormendo presso famiglie berbere e salendo sul Jbel M'Goun — la seconda vetta più alta del Marocco — con a malapena un altro viaggiatore in vista.",
    highlights: [
      "Vetta del Jbel M'Goun — la 2ª cima più alta del Marocco a 4.068 m",
      "Completamente fuori dai sentieri turistici",
      "Pernottamenti presso famiglie berbere in villaggi remoti",
      "Attraversamento delle gole di Tessaoute e M'Goun",
      "7 giorni di pura wilderness d'alta quota",
    ],
    includes: [
      "Expert licensed high-mountain guide",
      "All meals throughout",
      "Mule team for equipment",
      "Berber family homestays and camping",
      "Emergency satellite communication",
      "National park fees",
    ],
    excludes: [
      "Travel and medical insurance (mandatory)",
      "Technical mountaineering equipment",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Marrakech → Aït M'hamed", description: "Trasferimento verso il punto di partenza. Incontro con la squadra di muli e l'equipaggio. Prima notte presso una famiglia berbera." },
      { day: 2, title: "Aït M'hamed → Agouti (2.600 m)", description: "Trekking attraverso la 'Valle Felice' di Aït Bouguemez. Campo ad Agouti." },
      { day: 3, title: "Agouti → Tizi n'Ait Imi (3.650 m) → Tarkeddit", description: "Primo passo in quota. Panorami mozzafiato. Campo selvaggio a Tarkeddit." },
      { day: 4, title: "Vetta del M'Goun (4.068 m)", description: "Partenza prima dell'alba. Vetta del Jbel M'Goun. Discesa al campo della gola di Tessaoute." },
      { day: 5, title: "Attraversamento della Gola di Tessaoute", description: "Cammino nella spettacolare gola dalle pareti rosse. Bagno nel fiume in piena natura." },
      { day: 6, title: "Uscita dalla gola → Bou Tharar", description: "Uscita dalla gola. Notte a Bou Tharar presso una famiglia locale." },
      { day: 7, title: "Bou Tharar → Marrakech", description: "Trasferimento di ritorno a Marrakech attraverso la valle delle rose. Il tour si conclude entro le 16:00." },
    ],
    faq: [
      { q: "Il M'Goun è più difficile del Toubkal?", a: "Su una settimana, sì. Classifichiamo questo trekking come expert contro challenging per gli itinerari del Toubkal — non perché una singola giornata sia tecnica, ma perché sono sette giorni consecutivi in territorio remoto con meno punti dove fermarsi o tornare indietro. È uno sforzo prolungato più che una singola giornata dura." },
      { q: "Quanto è remoto questo trekking?", a: "Davvero remoto. Il percorso attraversa alte quote e gole, passando per villaggi dove i gruppi di trekking sono ancora rari. Questo è il fascino, ed è anche il motivo per cui il percorso richiede una guida che conosca le fonti d'acqua e i modelli meteorologici." },
      { q: "Che esperienza serve per la traversata del M'Goun?", a: "Trekking di più giorni già svolti in precedenza. Non è una prima grande camminata: dovresti già sapere come il tuo corpo reagisce a giorni consecutivi su terreno accidentato e come rispondi all'altitudine. Se hai completato il Toubkal senza difficoltà, hai una base ragionevole per questo trekking." },
    ],
    meetingPoint: { lat: 31.6558, lng: -6.4561, name: "Aït M'hamed, Mgoun Massif" },
    seoTitle: "Trekking Massiccio del M'Goun 7 Giorni — La Traversata d'Alta Quota più Selvaggia del Marocco | Marrakech Eco Tours",
    seoDescription: "Trekking expert di 7 giorni attraverso il remoto Massiccio del M'Goun — vetta del Jbel M'Goun (4.068 m), passi in quota e notti presso famiglie berbere senza altri turisti. Da $820.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // TOUR DA AGADIR
  // ─────────────────────────────────────────────
  {
    id: "9",
    slug: "paradise-valley-agadir",
    title: "Da Agadir alla Paradise Valley e alle Cascate di Immouzer",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 giorno",
    groupSize: "2–15 people",
    reviewCount: 142,
    rating: 4.8,
    price: 30,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1200&q=85",
      "https://images.unsplash.com/photo-1701793347370-bde5c22670e9?w=1200&q=85",
      "https://images.unsplash.com/photo-1777815966041-7d8a58fb7fad?w=1200&q=85",
    ],
    shortDescription:
      "Un paradiso nascosto fatto di gole punteggiate di palme, piscine naturali e torrenti cristallini a 35 km da Agadir.",
    description:
      "La Paradise Valley è uno dei segreti meglio custoditi del Marocco — un lussureggiante canyon di palme scavato dal fiume Tamraght a soli 35 km a nord di Agadir. Cammina tra piscine naturali di roccia alimentate da sorgenti di montagna gelide, nuota sotto pareti rocciose a strapiombo e fai un picnic all'ombra di alte palme. Una fuga perfetta dalla spiaggia.",
    highlights: [
      "Piscine naturali in una gola di palme",
      "Escursione tra scenari da canyon spettacolari",
      "Cascata di Immouzer (stagionale)",
      "Foresta selvaggia di palme e alberi di argan",
      "Aria di montagna fresca, zero folla",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Certified local guide",
      "Traditional Berber lunch",
      "Mineral water",
    ],
    excludes: ["Personal swimming gear", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Paradise Valley",
        description:
          "Partenza da Agadir alle 9:00. Arrivo alla Paradise Valley entro le 10:00. Escursione guidata nella gola, bagno nelle piscine naturali, pranzo berbero all'ombra delle palme. Rientro ad Agadir per le 17:00.",
      },
    ],
    faq: [
      { q: "Ci sarà acqua nelle piscine?", a: "Dipende dalla stagione. I livelli variano molto: dopo le piogge invernali le piscine sono al meglio, e dopo un lungo periodo di siccità alcune si riducono o scompaiono. La primavera è il periodo più affidabile. Ti diremo con onestà quali sono le condizioni attuali prima della partenza." },
      { q: "I bambini possono fare questa gita?", a: "Sì, è una delle nostre gite giornaliere più adatte alle famiglie. Il cammino fino alle piscine principali è breve e semplice, e nuotare è il punto centrale dell'esperienza. I tuffi dalle rocce sono facoltativi e c'è comunque molto da fare senza di essi." },
      { q: "Quanto presto dovremmo partire?", a: "Presto. La Paradise Valley è a circa novanta minuti da Agadir, e arrivare prima della folla di metà mattina cambia notevolmente l'esperienza — la differenza tra avere una piscina quasi tutta per sé e condividerla con molte altre persone." },
    ],
    meetingPoint: { lat: 30.5376, lng: -9.5000, name: "Paradise Valley, Tamraght" },
    seoTitle: "Gita alla Paradise Valley da Agadir — Piscine Naturali e Gola di Palme | Marrakech Eco Tours",
    seoDescription: "Gola di palme nascosta con piscine naturali a 35 km da Agadir. Escursione guidata tra scenari da canyon, cascata di Immouzer e pranzo berbero incluso. Da $30.",
    featured: true,
  },
  {
    id: "10",
    slug: "sous-massa-national-park",
    title: "Da Agadir al Parco Nazionale di Souss-Massa — Tour Naturalistico",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 giorno",
    groupSize: "2–12 people",
    reviewCount: 58,
    rating: 4.7,
    price: 70,
    depositAmount: 18,
    heroImage:
      "https://images.unsplash.com/photo-1593253029968-940e0625b482?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1593253029968-940e0625b482?w=1200&q=85",
      "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=1200&q=85",
      "https://images.unsplash.com/photo-1697703297863-26350bad726b?w=1200&q=85",
    ],
    shortDescription:
      "Avvista l'Ibis eremita, specie in pericolo critico, e i fenicotteri nella più importante riserva naturale del Marocco.",
    description:
      "Il Parco Nazionale di Souss-Massa si estende per 70 km di costa atlantica ed estuario a sud di Agadir. È uno degli ultimi rifugi dell'Ibis eremita — uno degli uccelli più rari al mondo — e ospita fenicotteri, falchi pescatori, beccacce di mare e lontre africane. Una tappa imperdibile per gli amanti della natura.",
    highlights: [
      "Ibis eremita — uno dei 10 uccelli più rari al mondo",
      "Colonie di fenicotteri sull'estuario del Massa",
      "Dune atlantiche e sentiero costiero",
      "Birdwatching sul fiume Souss da capanni di osservazione",
      "Passeggiata nel bosco di argan e acacie",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Expert naturalist guide",
      "National park entrance fee",
      "Binoculars provided",
      "Picnic lunch",
    ],
    excludes: ["Personal camera equipment", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Souss-Massa",
        description:
          "Partenza da Agadir alle 8:00. Sessione mattutina all'estuario del Massa per ibis e fenicotteri. Sentiero costiero e passeggiata tra le dune atlantiche dopo pranzo. Rientro ad Agadir per le 17:00.",
      },
    ],
    meetingPoint: { lat: 30.0559, lng: -9.6320, name: "Souss-Massa National Park, Massa" },
    seoTitle: "Tour Naturalistico al Parco Nazionale di Souss-Massa da Agadir — Il Raro Ibis Eremita | Marrakech Eco Tours",
    seoDescription: "Avvista l'Ibis eremita, in pericolo critico, e i fenicotteri nella riserva naturale più importante del Marocco. Guida naturalistica esperta, binocolo e picnic inclusi. Da $70.",
    featured: true,
  },
  {
    id: "11",
    slug: "taroudant-day-trip-agadir",
    title: "Da Agadir a Taroudant — Gita Giornaliera",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 giorno",
    groupSize: "2–14 people",
    reviewCount: 84,
    rating: 4.6,
    price: 40,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1778339517491-167ba786167b?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1778339517491-167ba786167b?w=1200&q=85",
      "https://images.unsplash.com/photo-1598590971729-d3040c9112cb?w=1200&q=85",
      "https://images.unsplash.com/photo-1573133001449-a19835a04971?w=1200&q=85",
    ],
    shortDescription:
      "La 'nonna di Marrakech' — antiche mura color rosa, souk delle spezie e un mercato berbero non toccato dal turismo di massa.",
    description:
      "Taroudant è ciò che era Marrakech 50 anni fa — la piena esperienza della medina medievale senza le folle turistiche. Le mura ocra del XVI secolo sono tra le meglio conservate del Marocco. Le concerie, il souk delle spezie e il mercato dell'argenteria sono autentici e senza fretta. A soli 80 km da Agadir.",
    highlights: [
      "Mura del XVI secolo — le meglio conservate del Marocco",
      "Autentico mercato berbero e souk delle spezie",
      "Concerie di Taroudant (più piccole e meno affollate di quelle di Fes)",
      "Oasi e kasbah di Tiout (facoltativo)",
      "Argenteria tradizionale del Souss",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Local expert guide",
      "Rampart walk",
      "Mint tea in a riad",
    ],
    excludes: ["Lunch", "Shopping", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Taroudant",
        description:
          "Partenza da Agadir alle 8:30. Arrivo a Taroudant entro le 9:30. Passeggiata guidata nella medina, sulle mura, tra souk e concerie. Sosta facoltativa all'oasi di Tiout. Rientro ad Agadir per le 17:00.",
      },
    ],
    meetingPoint: { lat: 30.4702, lng: -8.8773, name: "Taroudant, Souss Valley" },
    seoTitle: "Gita a Taroudant da Agadir — Antiche Mura e Mercato Berbero | Marrakech Eco Tours",
    seoDescription: "Scopri le mura del XVI secolo meglio conservate del Marocco e gli autentici mercati berberi di Taroudant — a 80 km da Agadir, senza le folle turistiche. Da $40.",
    featured: false,
  },
  {
    id: "12",
    slug: "agadir-surf-lesson",
    title: "Lezione di Surf sulla Spiaggia di Agadir",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "Mezza giornata (2–3 ore)",
    groupSize: "2–8 people",
    reviewCount: 211,
    rating: 4.7,
    price: 28,
    depositAmount: 8,
    heroImage:
      "https://images.unsplash.com/photo-1537174621888-eba6137cf6c9?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537174621888-eba6137cf6c9?w=1200&q=85",
      "https://images.unsplash.com/photo-1553458287-b25ff2a8a778?w=1200&q=85",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=85",
    ],
    shortDescription:
      "Impara a surfare sulle calde onde atlantiche di Agadir — istruzione professionale, tavola e muta incluse.",
    description:
      "La baia di Agadir offre onde atlantiche costanti e adatte ai principianti e acqua calda tutto l'anno, il che ne fa uno dei posti migliori del Marocco per imparare a surfare. I nostri istruttori certificati lavorano con principianti assoluti e surfisti di livello intermedio. Tavola, muta e tutta l'attrezzatura sono forniti.",
    highlights: [
      "Istruttori di surf professionisti certificati",
      "Tavola e muta incluse",
      "Livelli principiante e intermedio",
      "Calde onde atlantiche sulla baia di Agadir",
      "Condizioni di surf tutto l'anno",
    ],
    includes: [
      "2-hour surf lesson",
      "Surfboard and wetsuit rental",
      "Certified ISA instructor",
      "Warm-up and safety briefing",
    ],
    excludes: ["Transport to beach (5-min walk from centre)", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Sessione di Surf — Baia di Agadir",
        description:
          "Incontro con l'istruttore in spiaggia all'orario concordato. 30 minuti di lezione a terra (tecnica e sicurezza), 90 minuti in acqua. Sessioni disponibili ogni giorno al mattino e al pomeriggio.",
      },
    ],
    meetingPoint: { lat: 30.4206, lng: -9.5981, name: "Agadir Beach, Agadir Bay" },
    seoTitle: "Lezione di Surf ad Agadir — Impara a Surfare sulla Costa Atlantica del Marocco | Marrakech Eco Tours",
    seoDescription: "Impara a surfare sulle calde onde atlantiche della baia di Agadir con un istruttore certificato ISA. Tavola, muta e briefing sulla sicurezza inclusi. Livelli principiante e intermedio. Da $28.",
    featured: false,
  },
  {
    id: "13",
    slug: "anti-atlas-trekking-agadir",
    title: "Da Agadir ai Monti Anti-Atlante — Trekking di 3 Giorni",
    category: "trekking",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 giorni / 2 notti",
    groupSize: "2–8 people",
    reviewCount: 29,
    rating: 4.8,
    price: 280,
    depositAmount: 70,
    heroImage:
      "https://images.unsplash.com/photo-1517227062101-68105352ffc7?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1517227062101-68105352ffc7?w=1200&q=85",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
      "https://images.unsplash.com/photo-1729442045686-fe062f3c6c16?w=1200&q=85",
    ],
    shortDescription:
      "Tre giorni nell'antico Anti-Atlante — valli dipinte, gole in fiore di mandorli e villaggi berberi senza altri turisti.",
    description:
      "L'Anti-Atlante è la catena montuosa più sottovalutata del Marocco — più antica dell'Atlante, dalle forme più insolite e completamente estranea al turismo. Vette di granito rosa, gole color zafferano, mandorli in fiore e villaggi berberi dove la vita non è cambiata da secoli. Partendo da Agadir, questo è il vero Marocco.",
    highlights: [
      "Antiche vette di granito rosa dell'Anti-Atlante",
      "Tafraoute — la valle delle rocce dipinte",
      "Gole in fiore di mandorli (febbraio–marzo)",
      "Villaggi berberi senza altri turisti",
      "Splendide vedute sulla valle al tramonto",
    ],
    includes: [
      "Certified mountain guide",
      "2 nights Berber guesthouse accommodation",
      "All meals",
      "Round-trip transport from Agadir",
      "Mule for equipment",
    ],
    excludes: ["Travel insurance (recommended)", "Personal hiking gear", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Tafraoute → Primo Campo",
        description:
          "Trasferimento a Tafraoute (2h30). Visita alle rocce dipinte. Inizio del trekking nelle gole dei mandorli. Notte in una guesthouse berbera.",
      },
      {
        day: 2,
        title: "Traversata dell'Alta Cresta",
        description:
          "Giornata intera di trekking tra creste di granito rosa con vista sulla Valle dell'Ameln sottostante. Notte in campeggio o guesthouse in un villaggio remoto.",
      },
      {
        day: 3,
        title: "Discesa nella Valle → Agadir",
        description:
          "Discesa mattutina attraverso la foresta di argan. Pranzo tradizionale in un villaggio. Ritorno in auto ad Agadir. Arrivo nel tardo pomeriggio.",
      },
    ],
    meetingPoint: { lat: 29.7231, lng: -8.9762, name: "Tafraoute, Anti-Atlas Mountains" },
    seoTitle: "Trekking nei Monti Anti-Atlante 3 Giorni da Agadir — Granito Rosa e Rocce Dipinte | Marrakech Eco Tours",
    seoDescription: "Trekking di 3 giorni nella catena montuosa più sottovalutata del Marocco — vette di granito rosa, gole in fiore di mandorli e remoti villaggi berberi. Tour privato da Agadir. Da $280.",
    featured: true,
  },
  {
    id: "14",
    slug: "sahara-2day-agadir",
    title: "Da Agadir al Sahara — Tour del Deserto di 2 Giorni",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 giorni / 1 notte",
    groupSize: "2–10 people",
    reviewCount: 47,
    rating: 4.9,
    price: 195,
    depositAmount: 50,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
    ],
    shortDescription:
      "Attraversa l'Anti-Atlante e la Valle del Draa verso il Sahara — trekking in cammello, campo nel deserto e un'alba sull'Erg Chegaga.",
    description:
      "La maggior parte dei tour nel Sahara parte da Marrakech — questo invece ti porta lungo la meno battuta rotta meridionale via la Valle del Draa e l'Erg Chegaga, il campo di dune più grande e remoto del Marocco. Una fuga di due giorni da Agadir che sembra una settimana lontano dal mondo.",
    highlights: [
      "Erg Chegaga — il campo di dune remoto raggiunto da meno turisti",
      "Palmeria della Valle del Draa e antiche kasbah",
      "Trekking in cammello al tramonto e all'alba",
      "Campo berbero di lusso nel deserto sotto la Via Lattea",
      "Rotta meridionale attraverso Tata e Foum Zguid",
    ],
    includes: [
      "4x4 transport throughout",
      "Experienced desert guide",
      "1 night luxury desert camp (dinner + breakfast)",
      "All camel rides",
    ],
    excludes: ["Lunch on day 1", "Personal items and tips"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Tata → Foum Zguid → Erg Chegaga",
        description:
          "Partenza da Agadir alle 6:30. Discesa verso sud attraverso le pendici dell'Anti-Atlante via Tata. Attraversamento dell'hammada fino a Foum Zguid. Trekking in cammello nell'Erg Chegaga al tramonto. Cena al campo berbero.",
      },
      {
        day: 2,
        title: "Alba → Valle del Draa → Agadir",
        description:
          "Trekking in cammello all'alba per ammirare il sole che sorge sulle dune. Colazione al campo. Percorso verso nord attraverso le magnifiche palmerie della Valle del Draa. Arrivo ad Agadir in serata.",
      },
    ],
    meetingPoint: { lat: 29.8671, lng: -7.9386, name: "Erg Chegaga, Western Sahara" },
    seoTitle: "Tour nel Sahara 2 Giorni da Agadir — Campo nel Deserto dell'Erg Chegaga e Valle del Draa | Marrakech Eco Tours",
    seoDescription: "Le remote dune dell'Erg Chegaga via la rotta meridionale della Valle del Draa — trekking in cammello, campo di lusso nel deserto e un'alba sul Sahara. Tour di 2 giorni da Agadir. Da $195.",
    featured: true,
  },
  {
    id: "15",
    slug: "souss-valley-cultural-tour",
    title: "Da Agadir alla Valle del Souss — Tour dell'Argan e della Cultura Berbera",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    isDayTour: true,
    duration: "1 giorno",
    groupSize: "2–14 people",
    reviewCount: 73,
    rating: 4.7,
    price: 38,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1593253029656-9aaee080fb29?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1593253029656-9aaee080fb29?w=1200&q=85",
      "https://images.unsplash.com/photo-1750981081058-acc10295bc11?w=1200&q=85",
      "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=1200&q=85",
    ],
    shortDescription:
      "Visita una cooperativa dell'argan gestita da donne, un villaggio del miele e un pranzo con una famiglia berbera nella Valle del Souss.",
    description:
      "La Valle del Souss a sud di Agadir è il cuore della produzione marocchina di argan — una biosfera protetta dall'UNESCO dove le donne berbere gestiscono le cooperative che producono l'olio più pregiato al mondo. Visita la cooperativa, osserva il processo di estrazione tradizionale, assaggia i prodotti puri all'argan e condividi un pranzo fatto in casa con una famiglia berbera.",
    highlights: [
      "Visita e degustazione presso una cooperativa dell'argan gestita da donne",
      "Villaggio del miele — dimostrazione con un apicoltore locale",
      "Pranzo berbero tradizionale con una famiglia",
      "Punto panoramico sulla Valle del Souss",
      "Mercato di Aït Baha (nei giorni di mercato)",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "Bilingual guide (English/French)",
      "Argan cooperative entrance and tasting",
      "Traditional Berber lunch",
      "Honey tasting",
    ],
    excludes: ["Argan product purchases", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Giornata intera — Valle del Souss",
        description:
          "Partenza da Agadir alle 9:00. Visita alla cooperativa dell'argan (10:00). Trasferimento al villaggio del miele. Pranzo con la famiglia berbera (13:00). Visita pomeridiana ad Aït Baha o al punto panoramico della valle. Rientro ad Agadir per le 17:00.",
      },
    ],
    meetingPoint: { lat: 30.0667, lng: -8.6500, name: "Souss Valley, Aït Baha Region" },
    seoTitle: "Gita all'Argan e alla Cultura della Valle del Souss da Agadir — Cooperativa Femminile | Marrakech Eco Tours",
    seoDescription: "Visita una cooperativa dell'argan gestita da donne, un apicoltore in un villaggio del miele e condividi un pranzo con una famiglia berbera nella Valle del Souss — il cuore dell'argan marocchino. Da $38.",
    featured: false,
  },
  {
    id: "16",
    slug: "agadir-to-essaouira-day-trip",
    title: "Da Agadir a Essaouira — Gita Giornaliera",
    category: "day-tours",
    origin: "agadir",
    difficulty: "easy",
    duration: "1 giorno",
    groupSize: "2–14 people",
    reviewCount: 118,
    rating: 4.8,
    price: 40,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=1200&q=85",
      "https://images.unsplash.com/photo-1624802746702-60ca95bdb605?w=1200&q=85",
      "https://images.unsplash.com/photo-1538053367502-742497073841?w=1200&q=85",
    ],
    shortDescription:
      "La città più magica della costa atlantica — barche blu, antiche mura e il pesce più fresco del Marocco.",
    description:
      "Essaouira si trova a due ore a nord di Agadir lungo la costa atlantica. La sua medina blu e bianca, patrimonio UNESCO, si tuffa direttamente tra le onde dell'oceano che si infrangono. Passeggia sulle mura portoghesi del XVIII secolo, acquista gioielli d'argento berberi dagli artigiani, mangia sardine alla griglia sul molo del porto e senti il celebre vento di Essaouira.",
    highlights: [
      "Mura portoghesi del XVIII secolo sul lungomare",
      "Medina patrimonio UNESCO e porto di pescatori blu",
      "Pranzo di pesce fresco sul molo del porto",
      "Botteghe artigiane: legno, gioielli, tessuti",
      "Il celebre vento atlantico di Essaouira",
    ],
    includes: [
      "Round-trip transport from Agadir",
      "English-speaking guide",
      "2-hour guided medina walk",
    ],
    excludes: ["Lunch and personal purchases", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Essaouira → Agadir",
        description:
          "Partenza da Agadir alle 8:00. Arrivo a Essaouira entro le 10:00. Passeggiata guidata nella medina, sulle mura e nel porto. Tempo libero per il pranzo e l'esplorazione. Partenza alle 16:30. Rientro ad Agadir per le 18:30.",
      },
    ],
    meetingPoint: { lat: 31.5085, lng: -9.7595, name: "Essaouira Medina, Atlantic Coast" },
    seoTitle: "Gita a Essaouira da Agadir — Medina UNESCO e Mura Atlantiche | Marrakech Eco Tours",
    seoDescription: "Gita giornaliera da Agadir alla medina blu e bianca di Essaouira, patrimonio UNESCO — mura portoghesi del XVIII secolo, pesce fresco sul porto e botteghe artigiane. Da $40.",
    featured: false,
  },
  {
    id: "17",
    slug: "marrakech-to-chefchaouen-4day",
    title: "Da Marrakech a Chefchaouen — Tour della Città Blu di 4 Giorni",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 giorni / 3 notti",
    groupSize: "2–12 people",
    reviewCount: 43,
    rating: 4.9,
    price: 340,
    depositAmount: 85,
    heroImage:
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1200&q=85",
      "https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?w=1200&q=85",
      "https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=1200&q=85",
    ],
    shortDescription:
      "Quattro giorni tra le città imperiali più iconiche del Marocco — con arrivo finale tra le magiche vie blu di Chefchaouen, nei Monti Rif.",
    description:
      "Questo tour collega tre delle destinazioni più fotogeniche del Marocco in quattro giorni. Guida verso nord da Marrakech attraverso le foreste di cedri del Medio Atlante, trascorri una giornata esplorando Fes el-Bali — la più grande città medievale al mondo — poi prosegui verso Chefchaouen, la leggendaria Città Blu che scende lungo i fianchi dei Monti Rif. Muri color cobalto, torrenti di montagna e zero turismo di massa.",
    highlights: [
      "Chefchaouen — la Città Blu dei Monti Rif",
      "Medina UNESCO di Fes el-Bali e concerie Chouara",
      "Foresta di cedri di Azrou e macachi della Barberia selvatici",
      "Rovine romane di Volubilis (patrimonio UNESCO)",
      "Meknes — la Versailles del Marocco",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "3 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Chefchaouen"],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Ifrane → Fes",
        description:
          "Partenza da Marrakech alle 7:00. Attraversamento del Medio Atlante. Sosta a Ifrane e nella foresta di cedri di Azrou per i macachi della Barberia. Arrivo a Fes in serata. Check-in al riad.",
      },
      {
        day: 2,
        title: "Giornata intera nella Medina di Fes",
        description:
          "Giornata intera guidata a Fes el-Bali: concerie Chouara, Università Al-Qarawiyyin, Medersa Bou Inania e gli antichi souk. Passeggiata serale sulle mura della medina.",
      },
      {
        day: 3,
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Visita mattutina a Volubilis — le rovine romane meglio conservate del Marocco. Trasferimento a Meknes (la Versailles del Marocco). Proseguimento verso Chefchaouen nei Monti Rif. Arrivo in serata.",
      },
      {
        day: 4,
        title: "Giornata intera a Chefchaouen",
        description:
          "Giornata intera nella Città Blu. Passeggiata guidata tra le vie blu della medina, il punto panoramico della Moschea Spagnola e la cascata di Ras El-Maa. Il tour si conclude a Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Tour di 4 Giorni da Marrakech a Chefchaouen — Fes, Volubilis e Monti Rif | Marrakech Eco Tours",
    seoDescription: "Tour di 4 giorni da Marrakech alle vie blu di Chefchaouen via Fes, le rovine romane di Volubilis e Meknes. 4x4 privato con alloggio in riad. Da $340.",
    featured: false,
  },
  {
    id: "18",
    slug: "marrakech-imperial-cities-5day",
    title: "Marrakech — Tutte e 4 le Città Imperiali — Grand Tour di 5 Giorni",
    category: "cultural",
    origin: "marrakech",
    difficulty: "easy",
    duration: "5 giorni / 4 notti",
    groupSize: "2–12 people",
    reviewCount: 27,
    rating: 4.8,
    price: 480,
    depositAmount: 120,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=85",
    ],
    shortDescription:
      "Le quattro capitali imperiali del Marocco in cinque giorni — Marrakech, Meknes, Fes e Rabat — da un paese che da mille anni ha avuto quattro sedi di potere.",
    description:
      "Le quattro città imperiali del Marocco — Marrakech, Meknes, Fes e Rabat — raccontano ciascuna un diverso capitolo della storia del paese. Questo grande circuito di cinque giorni le attraversa tutte: la labirintica medina di Fes, le monumentali porte di Meknes, la capitale costiera patrimonio UNESCO di Rabat, e il ritorno alla città rosa di Marrakech. Uno dei grandi viaggi via terra dell'Africa.",
    highlights: [
      "Tutte e 4 le Città Imperiali: Marrakech, Meknes, Fes, Rabat",
      "Rovine romane di Volubilis (patrimonio UNESCO)",
      "Moschea Hassan II a Rabat",
      "Concerie Chouara a Fes",
      "Bab Mansour — la più grande porta del Nord Africa",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French/Spanish-speaking guide",
      "4 nights riad accommodation",
      "Breakfast daily",
      "All transfers, tolls, and entrance fees",
    ],
    excludes: ["Lunches and dinners", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Percorso verso nord da Marrakech attraverso l'Atlante. Sosta ad Aït Ben Haddou. Proseguimento fino a Midelt per la notte, sugli altipiani tra le due catene dell'Atlante.",
      },
      {
        day: 2,
        title: "Midelt → Volubilis → Meknes",
        description:
          "Mattinata alle rovine romane di Volubilis. Pomeriggio a Meknes: porta Bab Mansour, i granai reali e i souk della medina. Notte a Meknes.",
      },
      {
        day: 3,
        title: "Meknes → Giornata intera a Fes",
        description:
          "Giornata intera a Fes el-Bali con una guida esperta. Concerie Chouara, Al-Qarawiyyin, Medersa Bou Inania e l'antico souk dei gioiellieri. Notte a Fes.",
      },
      {
        day: 4,
        title: "Fes → Rabat",
        description:
          "Trasferimento verso ovest fino a Rabat, sulla costa atlantica. Visita alla Torre Hassan e al Mausoleo di Mohammed V, alla Kasbah degli Udaya e alla medina fortificata. Notte a Rabat.",
      },
      {
        day: 5,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Sosta facoltativa alla Moschea Hassan II a Casablanca (esterno — la più grande moschea del mondo fuori dall'Arabia Saudita). Proseguimento verso sud fino a Marrakech. Arrivo in serata.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Tutte e 4 le Città Imperiali del Marocco in 5 Giorni — Marrakech, Meknes, Fes e Rabat | Marrakech Eco Tours",
    seoDescription: "Grande circuito tra le quattro capitali imperiali del Marocco in 5 giorni. Rovine romane di Volubilis, concerie Chouara, Bab Mansour e Torre Hassan. 4x4 privato da Marrakech. Da $480.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // TOUR DEL DESERTO DA MARRAKECH (nuovi)
  // ─────────────────────────────────────────────
  {
    id: "23",
    slug: "zagora-2day-marrakech",
    title: "Da Marrakech a Zagora — Tour del Deserto di 2 Giorni",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 giorni / 1 notte",
    groupSize: "2–12 people",
    reviewCount: 143,
    rating: 4.8,
    price: 149,
    depositAmount: 38,
    heroImage:
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
    ],
    shortDescription:
      "La via più rapida al Sahara da Marrakech — attraverso Aït Ben Haddou e i 200 km di palmeria della Valle del Draa fino a un campo nel deserto sotto le stelle vicino a Zagora.",
    description:
      "Due giorni verso il deserto e ritorno. Zagora offre una vera esperienza sahariana — trekking in cammello, una notte in un campo berbero e un cielo immenso pieno di stelle — senza il tragitto più lungo verso Merzouga. Il percorso attraverso la Valle del Draa è tra i più belli del Marocco: 200 km di oasi di palme da dattero, antiche kasbah e villaggi berberi lungo il fiume. Le dune dell'Erg Lehoudi sono più tranquille e meno affollate di quelle dell'Erg Chebbi, rendendo questo il viaggio perfetto per chi ha poco tempo ma vuole comunque vivere l'esperienza completa del deserto.",
    highlights: [
      "Valle del Draa — l'oasi più lunga del Marocco, 200 km di palme da dattero e kasbah",
      "Trekking in cammello sulle dune dell'Erg Lehoudi al tramonto",
      "Notte in un campo berbero nel deserto con musica tradizionale",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Tamegroute — una biblioteca coranica del XIV secolo ancora aperta ai visitatori",
      "Meno affollato di Merzouga — un'esperienza del deserto più intima",
    ],
    includes: [
      "Air-conditioned minibus transport throughout",
      "English-speaking driver-guide",
      "1 night Berber desert camp (dinner + breakfast)",
      "Sunset camel trek",
      "Mineral water and tea",
    ],
    excludes: [
      "Lunches on both days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Valle del Draa → Campo di Zagora",
        description:
          "Ritiro presso il tuo alloggio a Marrakech alle 7:00. Attraversamento del passo Tizi n'Tichka e sosta al Ksar patrimonio UNESCO di Aït Ben Haddou. Pranzo a Ouarzazate. Discesa verso sud lungo tutta l'oasi della Valle del Draa — palmeti, villaggi in mattoni di fango e antiche kasbah-granaio lungo la strada. Sosta a Tamegroute per vedere la biblioteca del XIV secolo e i celebri laboratori di ceramica verde. Arrivo al campo nel deserto vicino a Zagora nel tardo pomeriggio. Salita in sella al cammello per la cavalcata al tramonto tra le dune. Cena berbera tradizionale e musica attorno al fuoco.",
      },
      {
        day: 2,
        title: "Alba sulle Dune → Valle del Draa → Marrakech",
        description:
          "Passeggiata mattutina o cavalcata in cammello facoltativa per l'alba nel deserto. Colazione al campo. Partenza alle 8:30 attraverso l'oasi della Valle del Draa nella luce del mattino — un'atmosfera molto diversa da quella pomeridiana. Sosta pranzo a Ouarzazate o lungo il tragitto. Nuovo attraversamento dell'Alto Atlante. Arrivo a Marrakech per le 18:30.",
      },
    ],
    meetingPoint: { lat: 30.3323, lng: -5.8366, name: "Zagora, Draa Valley" },
    featured: false,
    seoTitle: "Tour del Deserto 2 Giorni da Marrakech a Zagora — Valle del Draa, Trekking in Cammello e Campo Berbero | Marrakech Eco Tours",
    seoDescription: "La via più rapida al Sahara — Aït Ben Haddou, i 200 km di palmeria della Valle del Draa e un trekking in cammello tra le dune. Tour del deserto di 2 giorni da Marrakech con campo berbero. Da $149.",
  },
  {
    id: "24",
    slug: "erg-chegaga-3day-marrakech",
    title: "Erg Chegaga — Spedizione nel Deserto Remoto di 3 Giorni",
    category: "desert",
    origin: "marrakech",
    difficulty: "moderate",
    duration: "3 giorni / 2 notti",
    groupSize: "2–8 people",
    reviewCount: 64,
    rating: 4.9,
    price: 320,
    depositAmount: 80,
    heroImage:
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
    ],
    shortDescription:
      "Il deserto più remoto del Marocco — l'Erg Chegaga richiede un viaggio fuoristrada in 4x4 oltre l'ultima strada asfaltata per raggiungere dune alte 120 m che si innalzano su un vasto mare di sabbia disabitato.",
    description:
      "L'Erg Chegaga è il Sahara che la maggior parte dei turisti non trova mai. A differenza dell'Erg Chebbi vicino a Merzouga — dove le carovane di cammelli si incrociano a vista d'hotel — Chegaga richiede un viaggio fuoristrada in 4x4 oltre la fine dell'asfalto a M'Hamid, l'ultimo villaggio prima del vero Sahara. Il campo di dune si estende per chilometri con a malapena un'altra anima in vista. Tre giorni da Marrakech attraverso Aït Ben Haddou, la Valle dello Zafferano di Taliouine e il limite del mondo conosciuto — poi due notti nel profondo del deserto dove l'unico suono è il silenzio.",
    highlights: [
      "Erg Chegaga — meno turisti, dune alte 120 m, silenzio profondo",
      "Attraversamento fuoristrada in 4x4 da M'Hamid nel campo di dune",
      "2 notti in un campo nel deserto senza altri campi in vista",
      "Valle dello Zafferano di Taliouine — la capitale marocchina delle spezie",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Trekking in cammello all'alba e al tramonto in un angolo privato del Sahara",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Experienced desert guide with off-road expertise",
      "1 night hotel in M'Hamid or Dades Valley",
      "2 nights Berber desert camp (all meals)",
      "All camel treks",
      "Mineral water and mint tea",
    ],
    excludes: [
      "Lunches on day 1 and day 3",
      "Personal travel insurance",
      "Tips",
      "Optional quad biking near M'Hamid (available on site)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Taliouine → M'Hamid",
        description:
          "Ritiro alle 7:00. Attraversamento del passo Tizi n'Tichka e visita ad Aït Ben Haddou. Proseguimento verso sud attraverso Ouarzazate e nella Valle dello Zafferano vicino a Taliouine — la capitale marocchina dello zafferano — per una breve sosta. Proseguimento fino a M'Hamid, l'ultima cittadina prima del Sahara aperto. Cena e pernottamento a M'Hamid.",
      },
      {
        day: 2,
        title: "M'Hamid → Erg Chegaga (Attraversamento in 4x4)",
        description:
          "Dopo la colazione, si sale sul 4x4 — la strada asfaltata finisce qui. Due o tre ore di guida fuoristrada nel deserto aperto, tra campi nomadi sparsi e pianure hammada ricche di fossili. Arrivo al margine dell'Erg Chegaga verso mezzogiorno. Trekking in cammello nel profondo del campo di dune. Il campo viene allestito nel cuore dell'erg — senza strade, senza altri campi, senza inquinamento luminoso. Tramonto sulle dune. Cena tradizionale e un cielo che esplode di stelle.",
      },
      {
        day: 3,
        title: "Alba nel Sahara → M'Hamid → Marrakech",
        description:
          "Sveglia prima dell'alba per salire sulla cresta della duna e ammirare il sorgere del sole. Colazione al campo. Il 4x4 riattraversa il deserto fino a M'Hamid. Inizio del lungo e splendido viaggio verso nord attraverso Zagora, la Valle del Draa e di nuovo sull'Alto Atlante. Arrivo a Marrakech per le 19:30.",
      },
    ],
    faq: [
      { q: "In cosa l'Erg Chegaga è diverso da Merzouga?", a: "Chegaga è più remoto e silenzioso. Il campo di dune è più esteso ma più basso dell'Erg Chebbi, e l'avvicinamento finale avviene in 4x4 attraverso il deserto aperto anziché su strada asfaltata. Potresti non vedere alcun altro campo, il che è proprio il motivo per sceglierlo." },
      { q: "Perché questo viaggio è classificato come moderate anziché easy?", a: "È l'accesso. Raggiungere Chegaga significa un trasferimento in 4x4 attraverso deserto aperto, un tragitto più impegnativo della strada verso Merzouga. Il cammino in sé non è faticoso — la classificazione riflette il viaggio più che lo sforzo fisico." },
      { q: "L'Erg Chegaga vale lo sforzo extra rispetto a Merzouga?", a: "Se cerchi davvero solitudine, sì. Se vuoi le alte dune scolpite delle fotografie con un accesso più semplice, Merzouga è il modo migliore di usare gli stessi tre giorni. Nessuna delle due è un ripiego; sono esperienze diverse." },
    ],
    meetingPoint: { lat: 29.8250, lng: -5.7246, name: "M'Hamid, Gateway to Erg Chegaga" },
    featured: true,
    seoTitle: "Tour del Deserto Erg Chegaga 3 Giorni da Marrakech — Dune Remote e Spedizione Sahariana in 4x4 | Marrakech Eco Tours",
    seoDescription: "L'esperienza del deserto più remota del Marocco — 3 giorni da Marrakech all'Erg Chegaga via attraversamento fuoristrada in 4x4, 2 notti in un campo berbero privato. Nessuna folla, dune di 120 m. Da $320.",
  },
  {
    id: "25",
    slug: "desert-4day-marrakech",
    title: "Grand Tour del Deserto da Marrakech — 4 Giorni",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "4 giorni / 3 notti",
    groupSize: "2–10 people",
    reviewCount: 98,
    rating: 4.9,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
    ],
    shortDescription:
      "Quattro giorni attraverso l'intero sud del Marocco — montagne, canyon, studi cinematografici, una notte nel deserto e la Strada delle Mille Kasbah — fino all'Erg Chebbi e ritorno.",
    description:
      "Questo è il circuito del deserto da Marrakech per eccellenza. Quattro giorni per vivere tutto ciò che il sud del Marocco offre: la drammaticità dell'Alto Atlante, la grandiosità cinematografica di Aït Ben Haddou (usata in Game of Thrones, Il Gladiatore e Lawrence d'Arabia), le pareti alte 400 m della Gola del Todra, una notte intera in un campo nel deserto dell'Erg Chebbi e il viaggio di ritorno via la leggendaria Strada delle Mille Kasbah. Un tour con abbastanza tempo per respirare, esplorare e assorbire davvero uno dei paesaggi più spettacolari della Terra.",
    highlights: [
      "Notte intera in un campo nel deserto dell'Erg Chebbi — trekking in cammello al tramonto e all'alba",
      "Gola del Todra — il canyon più spettacolare del Marocco (pareti di 400 m, 4 km di cammino)",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO — location di Il Gladiatore e Game of Thrones",
      "Valle del Dades — la Valle delle Mille Kasbah",
      "Oasi di Skoura — un mare di palme da dattero e antiche kasbah di terra",
      "Ritorno via la Strada delle Mille Kasbah — corridoio della Valle del Draa",
    ],
    includes: [
      "Air-conditioned minibus/4x4 transport throughout",
      "Professional bilingual driver-guide (English/French)",
      "1 night hotel in Dades Valley (dinner + breakfast)",
      "1 night traditional Berber desert camp (dinner + breakfast)",
      "1 night hotel in Ouarzazate (breakfast)",
      "Sunset and sunrise camel treks at Erg Chebbi",
      "All transfers and access fees",
      "Mineral water and tea throughout",
    ],
    excludes: [
      "Lunches (recommended budget: €12–15 per meal)",
      "Atlas Film Studios entry ticket (optional, ~€7)",
      "Alcoholic beverages",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Valle del Dades",
        description:
          "Ritiro alle 7:00. Salita sul passo Tizi n'Tichka attraverso l'Alto Atlante (2.260 m). Sosta al Ksar patrimonio UNESCO di Aït Ben Haddou per 45 minuti di esplorazione completa. Pausa pranzo a Ouarzazate con possibilità di visitare gli Atlas Film Studios (dove sono stati girati Il Gladiatore e Game of Thrones). Proseguimento attraverso la spettacolare Valle del Dades — kasbah color rosa, villaggi oasi e le formazioni rocciose 'dita di scimmia'. Arrivo all'hotel nella Valle del Dades per le 17:00. Cena e pernottamento.",
      },
      {
        day: 2,
        title: "Valle del Dades → Gola del Todra → Campo nel Deserto di Merzouga",
        description:
          "Colazione in hotel. Cammino nel punto più stretto della Gola del Todra — un corridoio largo 40 m tra pareti calcaree alte 400 m con un fiume limpido sotto i piedi. Proseguimento verso est attraverso le pianure pre-sahariane, tra città oasi e pascoli nomadi. Arrivo a Merzouga nel pomeriggio. Salita in sella al cammello per il trekking al tramonto tra le imponenti dune dell'Erg Chebbi. Arrivo al campo mentre il cielo si tinge di rosso. Tagine marocchino tradizionale per cena, musica berbera attorno al fuoco e un cielo pieno di stelle.",
      },
      {
        day: 3,
        title: "Alba nel Sahara → Villaggio di Merzouga → Ouarzazate",
        description:
          "Sveglia alle 5:30 per salire sulla duna e osservare il Sahara che si risveglia. Rientro in cammello al campo, colazione e momento di relax alla guesthouse di Merzouga. Inizio del ritorno via la 'Strada delle Mille Kasbah' — un percorso diverso, più meridionale, attraverso Tazarine e N'Kob, una serie di antiche kasbah di terra lungo un'antica rotta carovaniera. Arrivo a Ouarzazate in serata. Pernottamento in hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Marrakech",
        description:
          "Visita mattutina facoltativa alla Kasbah Taourirt a Ouarzazate. Breve sosta di ritorno ad Aït Ben Haddou per una seconda prospettiva nella luce del mattino. Nuova salita sul passo Tizi n'Tichka con vista panoramica sull'Atlante. Arrivo a Marrakech per le 17:00.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    featured: true,
    seoTitle: "Tour del Deserto 4 Giorni da Marrakech — Erg Chebbi, Gola del Todra e Strada delle Mille Kasbah | Marrakech Eco Tours",
    seoDescription: "Il circuito completo del deserto da Marrakech — 4 giorni tra Aït Ben Haddou, la Gola del Todra, un campo nel deserto dell'Erg Chebbi e la Strada delle Mille Kasbah. Da $360.",
  },

  // ─────────────────────────────────────────────
  // TOUR DEL DESERTO DA AGADIR (nuovi)
  // ─────────────────────────────────────────────
  {
    id: "26",
    slug: "merzouga-3day-agadir",
    title: "Da Agadir a Merzouga — Tour del Deserto del Sahara di 3 Giorni",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "3 giorni / 2 notti",
    groupSize: "2–10 people",
    reviewCount: 52,
    rating: 4.8,
    price: 295,
    depositAmount: 75,
    heroImage:
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
    ],
    shortDescription:
      "Dalla costa atlantica di Agadir al campo di dune più iconico del Sahara — attraverso Taroudant, Taliouine, Aït Ben Haddou e la Gola del Todra fino a un trekking in cammello al tramonto sull'Erg Chebbi.",
    description:
      "La maggior parte dei tour nel Sahara parte da Marrakech. Questo parte da Agadir — e la rotta meridionale aggiunge due luoghi che la maggior parte dei turisti si perde: Taroudant, la città dalle mura medievali meglio conservate del Marocco, e Taliouine, la capitale mondiale dello zafferano. Da lì l'itinerario segue la classica rotta verso est attraverso Ouarzazate, Aït Ben Haddou e la Gola del Todra prima di condurti all'Erg Chebbi — il campo di dune più spettacolare del Sahara — in tempo per il trekking in cammello al tramonto. Tre giorni che coprono l'intera ampiezza del sud del Marocco.",
    highlights: [
      "Erg Chebbi — trekking in cammello al tramonto tra dune di 160 m",
      "Notte in un campo berbero nel deserto sotto le stelle",
      "Taroudant — la più bella città medievale fortificata del Marocco",
      "Taliouine — la capitale mondiale dello zafferano",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Passeggiata nella Gola del Todra (pareti di 400 m)",
    ],
    includes: [
      "Air-conditioned 4x4 transport throughout",
      "English-speaking driver-guide",
      "1 night hotel in Dades Valley or Tinghir (dinner + breakfast)",
      "1 night Berber desert camp at Erg Chebbi (dinner + breakfast)",
      "Sunset and sunrise camel treks",
      "Mineral water and mint tea throughout",
    ],
    excludes: [
      "Lunches on all three days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Valle del Dades",
        description:
          "Ritiro anticipato dal tuo hotel ad Agadir alle 6:30. Trasferimento verso est a Taroudant (1 ora) — passeggiata sulle mura del XVI secolo e nel souk delle spezie di questa città medievale perfettamente conservata. Proseguimento verso Taliouine, il cuore marocchino della coltivazione dello zafferano, per una breve sosta. Attraversamento di Ouarzazate e visita al Ksar patrimonio UNESCO di Aït Ben Haddou. Proseguimento attraverso la Valle del Dades. Arrivo in hotel per le 18:00. Cena e pernottamento.",
      },
      {
        day: 2,
        title: "Valle del Dades → Gola del Todra → Campo dell'Erg Chebbi",
        description:
          "Colazione in hotel. Cammino sul fondo della Gola del Todra — pareti di calcare rosa alte 400 m che incorniciano uno stretto corridoio fluviale. Attraversamento verso est delle pianure desertiche fino a Merzouga. Salita in sella al cammello al tramonto e cavalcata tra le imponenti dune dell'Erg Chebbi. Il campo viene raggiunto mentre il cielo si oscura. Cena a base di tagine tradizionale, musica berbera e osservazione delle stelle nel buio sahariano.",
      },
      {
        day: 3,
        title: "Alba nel Sahara → Merzouga → Agadir",
        description:
          "Sveglia alle 5:30 per l'alba sulle dune. Rientro in cammello, colazione al campo, momento di relax a Merzouga. Inizio del lungo viaggio di ritorno verso ovest e sud — attraverso Rissani, Tazarine e le pianure desertiche, di nuovo sul passo Tizi n'Tichka e giù verso Agadir. Arrivo tra le 20:00 e le 21:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour del Deserto 3 Giorni da Agadir a Merzouga — Erg Chebbi, Taroudant e Taliouine | Marrakech Eco Tours",
    seoDescription: "Dalla costa atlantica di Agadir al Sahara — via Taroudant, Taliouine, Aït Ben Haddou e un trekking in cammello al tramonto sull'Erg Chebbi. Tour del deserto di 3 giorni con campo berbero. Da $295.",
  },
  {
    id: "27",
    slug: "zagora-2day-agadir",
    title: "Da Agadir a Zagora — Tour del Deserto di 2 Giorni",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "2 giorni / 1 notte",
    groupSize: "2–10 people",
    reviewCount: 41,
    rating: 4.7,
    price: 179,
    depositAmount: 45,
    heroImage:
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
    ],
    shortDescription:
      "Due giorni dalle spiagge atlantiche di Agadir al deserto — via la città fortificata di Taroudant, la capitale del tappeto di Taznakht e i 200 km di palmeria della Valle del Draa fino alle dune di Zagora.",
    description:
      "La rotta più rapida da Agadir al deserto non passa da Marrakech. Va verso est attraverso Taroudant e Taznakht, entrando nella Valle del Draa da sud — l'oasi più lunga del Marocco, un nastro di palme da dattero, antiche kasbah e insediamenti berberi che si estende per 200 km nel sud pre-sahariano. Le dune di Zagora sono più tranquille di quelle di Merzouga, l'atmosfera è più intima, e dopo una notte in un campo berbero tradizionale ad ascoltare musica sotto un cielo nero immenso, il viaggio di ritorno sembra assolutamente valere la pena.",
    highlights: [
      "Dune di Zagora — un'esperienza di campo nel deserto più tranquilla e intima",
      "Valle del Draa — 200 km di oasi di palme da dattero e antiche kasbah",
      "Taroudant — le mura medievali meglio conservate del Marocco",
      "Taznakht — capitale berbera della tessitura di tappeti",
      "Trekking in cammello al tramonto e osservazione delle stelle dal deserto",
      "Biblioteca coranica del XIV secolo di Tamegroute",
    ],
    includes: [
      "Air-conditioned transport throughout",
      "English-speaking driver-guide",
      "1 night Berber desert camp (dinner + breakfast)",
      "Sunset camel trek",
      "Mineral water and mint tea",
    ],
    excludes: [
      "Lunches on both days",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Taroudant → Taznakht → Valle del Draa → Zagora",
        description:
          "Ritiro dal tuo hotel ad Agadir alle 7:30. Trasferimento verso est a Taroudant — passeggiata sulle mura ocra del XVI secolo e nel mercato berbero. Proseguimento verso Taznakht, la capitale berbera della tessitura di tappeti. Ingresso nella Valle del Draa da ovest e percorso verso sud tra palmeti e antichi villaggi fino a Zagora. Arrivo al campo nel deserto in tempo per una cavalcata in cammello al tramonto tra le dune. Cena berbera tradizionale e musica sotto le stelle.",
      },
      {
        day: 2,
        title: "Alba → Tamegroute → Valle del Draa → Agadir",
        description:
          "Cavalcata mattutina facoltativa in cammello per l'alba. Colazione al campo. Sosta a Tamegroute — un villaggio con una biblioteca coranica del XIV secolo che custodisce manoscritti miniati a mano e una celebre cooperativa di ceramica smaltata verde. Percorso verso nord lungo tutta la Valle del Draa nella luce del mattino. Ritorno attraverso Ouarzazate fino ad Agadir. Arrivo per le 18:30.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour del Deserto 2 Giorni da Agadir a Zagora — Valle del Draa, Taroudant e Campo Berbero | Marrakech Eco Tours",
    seoDescription: "Dalla costa di Agadir al deserto di Zagora in 2 giorni — via Taroudant, i 200 km di palmeria della Valle del Draa e un trekking in cammello al tramonto. Campo berbero sotto le stelle. Da $179.",
  },
  {
    id: "28",
    slug: "erg-chegaga-3day-agadir",
    title: "Da Agadir all'Erg Chegaga — Tour del Deserto Remoto di 3 Giorni",
    category: "desert",
    origin: "agadir",
    difficulty: "moderate",
    duration: "3 giorni / 2 notti",
    groupSize: "2–8 people",
    reviewCount: 28,
    rating: 4.9,
    price: 345,
    depositAmount: 87,
    heroImage:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
    ],
    shortDescription:
      "La migliore rotta sahariana da Agadir — verso sud attraverso le pendici dell'Anti-Atlante e la Valle del Draa per raggiungere l'Erg Chegaga, il campo di dune più remoto del Marocco, in 4x4.",
    description:
      "Da Agadir, la rotta verso l'Erg Chegaga è la più naturale del Marocco. Si dirige verso sud attraverso le pendici dell'Anti-Atlante via Tata e Foum Zguid, entrando nel Sahara da ovest — un approccio molto diverso dalla rotta standard da Marrakech. L'Erg Chegaga è il Sahara per chi vuole meno turisti, dune più estese nel complesso, e una sensazione più autentica di wilderness. L'attraversamento in 4x4 da M'Hamid fa parte dell'avventura. Due notti nel profondo del deserto, lontano da tutto.",
    highlights: [
      "Erg Chegaga — il campo di dune più remoto del Marocco, raggiunto in 4x4",
      "Approccio meridionale unico via le pendici dell'Anti-Atlante e Tata",
      "2 notti in un campo berbero senza altri campi in vista",
      "Ritorno via la Valle del Draa — intero corridoio dell'oasi di 200 km",
      "Trekking in cammello al tramonto e all'alba su dune vaste e vuote",
      "Alcuni dei cieli più bui del Nord Africa per l'osservazione delle stelle",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "Experienced desert guide with off-road expertise",
      "1 night accommodation in Foum Zguid or M'Hamid",
      "2 nights Berber desert camp at Erg Chegaga (all meals)",
      "All camel treks",
      "Mineral water and tea throughout",
    ],
    excludes: [
      "Lunches on days 1 and 3",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Pendici dell'Anti-Atlante → Tata → Foum Zguid / M'Hamid",
        description:
          "Ritiro anticipato ad Agadir alle 6:30. Discesa verso sud attraverso le pendici dell'Anti-Atlante — la catena montuosa più antica del Marocco, dall'aspetto più insolito e ancestrale rispetto all'Alto Atlante. Attraversamento della città oasi di Tata e proseguimento fino a Foum Zguid o M'Hamid, gli ultimi insediamenti prima dell'Erg Chegaga. Cena e pernottamento.",
      },
      {
        day: 2,
        title: "Attraversamento in 4x4 verso l'Erg Chegaga",
        description:
          "Dopo la colazione, la strada asfaltata finisce. Si sale sul 4x4 per l'attraversamento fuoristrada — due o tre ore di guida nel deserto tra hammada aperta, pianure fossilifere e acacie sparse. Arrivo al margine dell'Erg Chegaga verso mezzogiorno. Trekking in cammello nel campo di dune. Il campo viene allestito nel profondo dell'erg. Tramonto sulle dune, cena a lume di fuoco, un silenzio che non dimenticherai.",
      },
      {
        day: 3,
        title: "Alba → M'Hamid → Valle del Draa → Agadir",
        description:
          "Sveglia prima dell'alba per l'alba completa sulle dune. Colazione al campo. Il 4x4 riattraversa il deserto fino a M'Hamid. Percorso verso nord attraverso la Valle del Draa — uno dei tragitti più belli del Marocco — e ritorno ad Agadir via Zagora e Ouarzazate. Arrivo ad Agadir per le 20:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour del Deserto 3 Giorni da Agadir all'Erg Chegaga — Sahara Remoto e Spedizione in 4x4 | Marrakech Eco Tours",
    seoDescription: "Il deserto più remoto del Marocco da Agadir — 3 giorni attraverso l'Anti-Atlante fino all'Erg Chegaga in 4x4, 2 notti in un campo berbero privato. Meno turisti, più silenzio. Da $345.",
  },
  {
    id: "29",
    slug: "desert-4day-agadir",
    title: "Grand Tour del Deserto da Agadir — 4 Giorni",
    category: "desert",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 giorni / 3 notti",
    groupSize: "2–10 people",
    reviewCount: 39,
    rating: 4.8,
    price: 420,
    depositAmount: 105,
    heroImage:
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1489573280374-2e193c63726c?w=1200&q=85",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=85",
      "https://images.unsplash.com/photo-1565458901745-4c797b564f73?w=1200&q=85",
    ],
    shortDescription:
      "Quattro giorni dalla costa atlantica al Sahara e ritorno — Taroudant, Aït Ben Haddou, la Gola del Todra, una notte intera in un campo nel deserto dell'Erg Chebbi e la Strada delle Mille Kasbah.",
    description:
      "Il circuito del deserto definitivo che parte da Agadir — con un vantaggio su tutti i tour da Marrakech: due destinazioni che i turisti di Marrakech si perdono. Le mura perfettamente conservate del XVI secolo di Taroudant e i campi di zafferano di Taliouine valgono la partenza anticipata. Da lì l'itinerario segue il grande arco meridionale: Aït Ben Haddou, Ouarzazate, la Valle del Dades, la Gola del Todra e l'Erg Chebbi — il campo di dune più iconico del Marocco. Quattro giorni che mostrano l'intera ampiezza e profondità del sud marocchino.",
    highlights: [
      "Campo nel deserto dell'Erg Chebbi — due trekking in cammello, una notte intera nel deserto",
      "Taroudant — città fortificata medievale unica alla rotta di Agadir",
      "Taliouine — la capitale mondiale dello zafferano (unica alla rotta di Agadir)",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Gola del Todra — cammino tra pareti di canyon alte 400 m",
      "Strada delle Mille Kasbah — ritorno via l'antica rotta carovaniera",
    ],
    includes: [
      "Air-conditioned 4x4 transport throughout",
      "Professional bilingual driver-guide (English/French)",
      "1 night hotel in Dades Valley (dinner + breakfast)",
      "1 night Berber desert camp at Erg Chebbi (dinner + breakfast)",
      "1 night hotel in Ouarzazate (breakfast)",
      "Sunset and sunrise camel treks",
      "Mineral water and mint tea throughout",
    ],
    excludes: [
      "Lunches throughout (budget €12–15 per meal)",
      "Atlas Film Studios entry (optional, ~€7)",
      "Alcoholic beverages",
      "Personal travel insurance",
      "Tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Taroudant → Taliouine → Aït Ben Haddou → Valle del Dades",
        description:
          "Ritiro dal tuo hotel ad Agadir alle 6:30. Trasferimento verso est a Taroudant — esplorazione delle mura del XVI secolo meglio conservate del Marocco e dell'antico mercato berbero delle spezie. Proseguimento verso Taliouine per una visita a una cooperativa dello zafferano. Attraversamento di Ouarzazate e sosta al Ksar patrimonio UNESCO di Aït Ben Haddou. Proseguimento attraverso la spettacolare Valle del Dades. Arrivo in hotel per le 18:00. Cena e pernottamento.",
      },
      {
        day: 2,
        title: "Valle del Dades → Gola del Todra → Campo dell'Erg Chebbi",
        description:
          "Colazione in hotel. Cammino sul fondo della Gola del Todra — pareti calcaree alte 400 m, un fiume sotto i piedi e quasi nessuna folla al primo mattino. Attraversamento verso est del paesaggio oasi pre-sahariano fino a Merzouga. Salita in sella al cammello al margine delle dune e cavalcata nell'Erg Chebbi mentre il sole tramonta. Arrivo al campo mentre cala il buio. Tagine tradizionale, musica gnawa, osservazione delle stelle nel cielo sahariano.",
      },
      {
        day: 3,
        title: "Alba nel Sahara → Strada delle Mille Kasbah → Ouarzazate",
        description:
          "Sveglia prima dell'alba per il sorgere del sole sulle dune. Rientro in cammello al campo. Colazione e momento di relax. Percorso lungo la Strada delle Mille Kasbah — una rotta di ritorno meridionale attraverso Tazarine, N'Kob e il corridoio della Valle del Draa, costeggiata da antiche kasbah di terra che un tempo servivano le carovane transahariane. Arrivo a Ouarzazate in serata. Pernottamento in hotel.",
      },
      {
        day: 4,
        title: "Ouarzazate → Aït Ben Haddou → Tizi n'Tichka → Agadir",
        description:
          "Visita mattutina facoltativa agli Atlas Film Studios o alla Kasbah Taourirt a Ouarzazate. Breve sosta ad Aït Ben Haddou nella luce del mattino. Attraversamento di Marrakech e dell'Anti-Atlante fino ad Agadir. Arrivo per le 20:00.",
      },
    ],
    meetingPoint: { lat: 30.4202, lng: -9.5981, name: "Agadir City Centre" },
    featured: false,
    seoTitle: "Tour del Deserto 4 Giorni da Agadir — Erg Chebbi, Taroudant, Gola del Todra e Strada delle 1000 Kasbah | Marrakech Eco Tours",
    seoDescription: "Il grand tour completo del deserto da Agadir — 4 giorni tra Taroudant, Aït Ben Haddou, la Gola del Todra, un campo dell'Erg Chebbi e la Strada delle Mille Kasbah. Da $420.",
  },

  // ─────────────────────────────────────────────
  // CITTÀ IMPERIALI DA AGADIR
  // ─────────────────────────────────────────────
  {
    id: "19",
    slug: "agadir-to-fes-4day",
    title: "Da Agadir a Fes — Tour delle Città Imperiali di 4 Giorni",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "4 giorni / 3 notti",
    groupSize: "2–12 people",
    reviewCount: 34,
    rating: 4.7,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1604569251410-025ed59f126a?w=1200&q=85",
    ],
    shortDescription:
      "Dalla costa atlantica al cuore medievale del Marocco — Marrakech, l'Alto Atlante, le foreste di cedri e l'antica medina di Fes.",
    description:
      "Partendo da Agadir, questo viaggio di quattro giorni sale dalla costa atlantica attraverso Marrakech e sopra l'Alto Atlante prima di raggiungere Fes el-Bali — la più grande città medievale ancora abitata al mondo. Attraversa il passo Tizi n'Tichka, fermati al Ksar patrimonio UNESCO di Aït Ben Haddou, esplora le foreste di cedri del Medio Atlante dove vagano i macachi della Barberia selvatici e perditi nei labirintici souk di Fes.",
    highlights: [
      "Passo di montagna del Tizi n'Tichka (2.260 m)",
      "Ksar di Aït Ben Haddou, patrimonio UNESCO",
      "Ifrane — il villaggio alpino del Marocco",
      "Foresta di cedri di Azrou e macachi della Barberia",
      "Medina di Fes el-Bali e concerie Chouara",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "3 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Fes"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Marrakech",
        description:
          "Partenza da Agadir al mattino. Percorso verso nord lungo la pianura atlantica fino a Marrakech (3h). Pomeriggio libero o passeggiata facoltativa nella medina. Notte in un riad a Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt",
        description:
          "Salita sull'Atlante via Tizi n'Tichka. Visita di Aït Ben Haddou. Proseguimento attraverso la Valle dello Ziz fino a Midelt per la notte.",
      },
      {
        day: 3,
        title: "Midelt → Ifrane → Foresta di Cedri di Azrou → Fes",
        description:
          "Attraversamento del Medio Atlante. Sosta a Ifrane e nella foresta di cedri di Azrou per avvistare i macachi della Barberia selvatici. Arrivo a Fes nel pomeriggio. Check-in al riad.",
      },
      {
        day: 4,
        title: "Giornata intera nella Medina di Fes",
        description:
          "Esplorazione guidata di Fes el-Bali: concerie Chouara, Università Al-Qarawiyyin, Medersa Bou Inania e i labirintici souk. Il tour si conclude a Fes.",
      },
    ],
    meetingPoint: { lat: 34.0331, lng: -5.0003, name: "Fes el-Bali, Imperial City" },
    seoTitle: "Tour di 4 Giorni da Agadir a Fes — Alto Atlante, Aït Ben Haddou e Città Imperiale | Marrakech Eco Tours",
    seoDescription: "Viaggia da Agadir a Fes via Marrakech, Tizi n'Tichka e le foreste di cedri del Medio Atlante. Tour privato 4x4 di 4 giorni con alloggio in riad. Da $360.",
    featured: false,
  },
  {
    id: "20",
    slug: "agadir-to-chefchaouen-5day",
    title: "Da Agadir a Chefchaouen — Tour della Città Blu di 5 Giorni",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "5 giorni / 4 notti",
    groupSize: "2–12 people",
    reviewCount: 22,
    rating: 4.9,
    price: 420,
    depositAmount: 105,
    heroImage:
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=1200&q=85",
      "https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?w=1200&q=85",
      "https://images.unsplash.com/photo-1707400015348-b0a5851ab163?w=1200&q=85",
    ],
    shortDescription:
      "Cinque giorni dalla costa atlantica alle vie blu di Chefchaouen — via Marrakech, Fes e le rovine romane di Volubilis.",
    description:
      "Questo circuito di cinque giorni parte da Agadir e collega le destinazioni più fotogeniche del Marocco. Sali fino a Marrakech, attraversa le foreste di cedri del Medio Atlante, esplora Fes el-Bali — la più grande città medievale al mondo — visita le rovine romane di Volubilis e le porte imperiali di Meknes, poi concludi a Chefchaouen, la leggendaria Città Blu che scende lungo i fianchi dei Monti Rif.",
    highlights: [
      "Chefchaouen — la Città Blu dei Monti Rif",
      "Medina UNESCO di Fes el-Bali e concerie Chouara",
      "Foresta di cedri di Azrou e macachi della Barberia selvatici",
      "Rovine romane di Volubilis (patrimonio UNESCO)",
      "Meknes — la Versailles del Marocco",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French-speaking guide",
      "4 nights riad accommodation",
      "Breakfast daily",
      "All transfers and tolls",
    ],
    excludes: ["Lunches and dinners", "Tips", "Return transport from Chefchaouen"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Marrakech",
        description:
          "Partenza da Agadir al mattino. Percorso verso nord fino a Marrakech (3h). Pomeriggio libero. Notte in un riad a Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Ifrane → Fes",
        description:
          "Partenza anticipata da Marrakech. Attraversamento del Medio Atlante. Sosta a Ifrane e nella foresta di cedri di Azrou per i macachi della Barberia. Arrivo a Fes in serata. Check-in al riad.",
      },
      {
        day: 3,
        title: "Giornata intera nella Medina di Fes",
        description:
          "Giornata intera guidata a Fes el-Bali: concerie Chouara, Università Al-Qarawiyyin, Medersa Bou Inania e gli antichi souk. Passeggiata serale sulle mura della medina.",
      },
      {
        day: 4,
        title: "Fes → Volubilis → Meknes → Chefchaouen",
        description:
          "Visita mattutina a Volubilis — le rovine romane meglio conservate del Marocco. Trasferimento a Meknes (la Versailles del Marocco). Proseguimento verso Chefchaouen nei Monti Rif. Arrivo in serata.",
      },
      {
        day: 5,
        title: "Giornata intera a Chefchaouen",
        description:
          "Giornata intera nella Città Blu. Passeggiata guidata tra le vie blu della medina, il punto panoramico della Moschea Spagnola e la cascata di Ras El-Maa. Il tour si conclude a Chefchaouen.",
      },
    ],
    meetingPoint: { lat: 35.1688, lng: -5.2636, name: "Chefchaouen, Rif Mountains" },
    seoTitle: "Tour di 5 Giorni da Agadir a Chefchaouen — Fes, Volubilis e Città Blu | Marrakech Eco Tours",
    seoDescription: "Tour di 5 giorni da Agadir alla Città Blu del Marocco via Marrakech, le rovine romane di Volubilis e le porte imperiali di Meknes. 4x4 privato con riad. Da $420.",
    featured: false,
  },
  {
    id: "21",
    slug: "agadir-imperial-cities-6day",
    title: "Agadir — Tutte e 4 le Città Imperiali — Grand Tour di 6 Giorni",
    category: "cultural",
    origin: "agadir",
    difficulty: "easy",
    duration: "6 giorni / 5 notti",
    groupSize: "2–12 people",
    reviewCount: 18,
    rating: 4.8,
    price: 560,
    depositAmount: 140,
    heroImage:
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=1200&q=85",
      "https://images.unsplash.com/photo-1697028733028-e2a104b952b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=85",
    ],
    shortDescription:
      "Le quattro capitali imperiali del Marocco in sei giorni dalla costa atlantica — Marrakech, Meknes, Fes e Rabat.",
    description:
      "Partendo da Agadir, questo grande circuito di sei giorni percorre tutte e quattro le città imperiali del Marocco — Marrakech, Meknes, Fes e Rabat — ciascuna un diverso capitolo della storia millenaria del paese. Dalla città rosa di Marrakech alla labirintica medina di Fes, dalle monumentali porte di Meknes alla capitale costiera patrimonio UNESCO di Rabat. Uno dei grandi viaggi via terra dell'Africa.",
    highlights: [
      "Tutte e 4 le Città Imperiali: Marrakech, Meknes, Fes, Rabat",
      "Rovine romane di Volubilis (patrimonio UNESCO)",
      "Moschea Hassan II a Rabat",
      "Concerie Chouara a Fes",
      "Bab Mansour — la più grande porta del Nord Africa",
    ],
    includes: [
      "Private 4x4 transport throughout",
      "English/French/Spanish-speaking guide",
      "5 nights riad accommodation",
      "Breakfast daily",
      "All transfers, tolls, and entrance fees",
    ],
    excludes: ["Lunches and dinners", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Agadir → Marrakech",
        description:
          "Partenza da Agadir al mattino. Percorso verso nord fino a Marrakech (3h). Passeggiata pomeridiana nella medina o tempo libero. Notte in un riad a Marrakech.",
      },
      {
        day: 2,
        title: "Marrakech → Aït Ben Haddou → Ouarzazate → Midelt",
        description:
          "Percorso verso nord da Marrakech attraverso l'Atlante. Sosta ad Aït Ben Haddou. Proseguimento fino a Midelt per la notte, sugli altipiani tra le due catene dell'Atlante.",
      },
      {
        day: 3,
        title: "Midelt → Volubilis → Meknes",
        description:
          "Mattinata alle rovine romane di Volubilis. Pomeriggio a Meknes: porta Bab Mansour, i granai reali e i souk della medina. Notte a Meknes.",
      },
      {
        day: 4,
        title: "Meknes → Giornata intera a Fes",
        description:
          "Giornata intera a Fes el-Bali con una guida esperta. Concerie Chouara, Al-Qarawiyyin, Medersa Bou Inania e l'antico souk dei gioiellieri. Notte a Fes.",
      },
      {
        day: 5,
        title: "Fes → Rabat",
        description:
          "Trasferimento verso ovest fino a Rabat, sulla costa atlantica. Visita alla Torre Hassan e al Mausoleo di Mohammed V, alla Kasbah degli Udaya e alla medina fortificata. Notte a Rabat.",
      },
      {
        day: 6,
        title: "Rabat → Casablanca → Marrakech",
        description:
          "Sosta facoltativa alla Moschea Hassan II a Casablanca (esterno — la più grande moschea del mondo fuori dall'Arabia Saudita). Proseguimento verso sud fino a Marrakech. Trasferimento successivo ad Agadir o pernottamento. Il tour si conclude.",
      },
    ],
    meetingPoint: { lat: 34.0209, lng: -6.8416, name: "Rabat, Atlantic Capital" },
    seoTitle: "Tutte e 4 le Città Imperiali del Marocco in 6 Giorni da Agadir — Marrakech, Meknes, Fes e Rabat | Marrakech Eco Tours",
    seoDescription: "Grande circuito di 6 giorni da Agadir attraverso le quattro città imperiali del Marocco — Marrakech, Meknes, Fes e Rabat. 4x4 privato con alloggio in riad. Da $560.",
    featured: false,
  },

  // ─────────────────────────────────────────────
  // NUOVI TREKKING ALTO ATLANTE / TOUBKAL
  // ─────────────────────────────────────────────
  {
    id: "30",
    slug: "toubkal-circuit-ifni-lake-6day",
    title: "Circuito del Toubkal e Lago Ifni — Trekking di 6 Giorni",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "6 giorni / 5 notti",
    groupSize: "2–12 people",
    reviewCount: 21,
    rating: 4.9,
    price: 620,
    depositAmount: 155,
    heroImage: "/gallery/ifni-lake-from-the-pass.jpg",
    gallery: [
      "/gallery/ifni-lake-from-the-pass.jpg",
      "/gallery/ifni-mule-approach-toubkal-behind.jpg",
      "/gallery/ifni-cattle-stream-azib.jpg",
      "/gallery/ifni-loaded-mule-high-scree.jpg",
      "/gallery/toubkal-trekkers-below-summit.jpg",
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "Il giro completo intorno al Jbel Toubkal — remoti villaggi berberi, passi in quota oltre i 3.600 m, il turchese Lago Ifni e una vetta finale a 4.167 m.",
    description:
      "Il Circuito del Toubkal è la traversata completa dell'Alto Atlante — un anello intero attorno al massiccio che pochi trekker completano mai. In sei giorni attraversi quattro passi principali, cammini tra i remoti pascoli e villaggi del Parco Nazionale del Toubkal, accampi accanto allo straordinario Lago Ifni color turchese e concludi salendo sul Jbel Toubkal stesso. Molto più vario e remoto della classica salita alla vetta, è il Toubkal per intenditori.",
    highlights: [
      "Campo accanto al turchese Lago Ifni (2.295 m), il lago più bello dell'Atlante",
      "Attraversamento di quattro passi in quota, tra cui Tizi n'Ouanoums (3.664 m) e Tizi Likemt (3.555 m)",
      "Vetta del Jbel Toubkal (4.167 m) — la più alta del Nord Africa",
      "Notti in remoti villaggi berberi raramente raggiunti da altri trekker",
    ],
    includes: [
      "Professional licensed mountain guide",
      "5 nights accommodation (refuges, village gîtes, and camping)",
      "All meals during the trek",
      "Mules and muleteers for group gear and camp",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment and sleeping bag",
      "Tips for guide, cook, and muleteers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Imlil → Tachedirt (2.300 m)",
        description:
          "Trasferimento da Marrakech a Imlil (1h30). Trekking nella Valle dell'Imenane, tra campi terrazzati e villaggi berberi, fino a Tachedirt. Circa 5 ore di cammino.",
      },
      {
        day: 2,
        title: "Tachedirt → Tizi Likemt (3.555 m) → Azib Likemt (2.250 m)",
        description:
          "Salita al passo di Tizi Likemt con ampie vedute sull'Alto Atlante, poi discesa negli alti pascoli estivi di Azib Likemt. 6–7 ore.",
      },
      {
        day: 3,
        title: "Azib Likemt → Tizi n'Ourai → Amsouzart (1.740 m)",
        description:
          "Percorso lungo il fiume Ourai, attraversamento di un passo panoramico e discesa fino all'accogliente villaggio di Amsouzart per il pernottamento in un gîte familiare. Circa 6 ore.",
      },
      {
        day: 4,
        title: "Amsouzart → Lago Ifni (2.295 m)",
        description:
          "Una salita graduale conduce al turchese Lago Ifni, incastonato in modo spettacolare tra picchi ripidi. Pomeriggio libero sulle rive del lago. 4–5 ore.",
      },
      {
        day: 5,
        title: "Lago Ifni → Tizi n'Ouanoums (3.664 m) → Rifugio Toubkal (3.207 m)",
        description:
          "Una ripida salita rocciosa fino al passo di Ouanoums, con vista sul lago, poi discesa al Rifugio Toubkal. Notte anticipata prima del giorno della vetta. Circa 6 ore.",
      },
      {
        day: 6,
        title: "Vetta del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Salita prima dell'alba via il Circo Sud fino al tetto del Nord Africa al sorgere del sole. Discesa a Imlil e trasferimento di ritorno a Marrakech. Un'ultima giornata lunga e gratificante.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking Circuito del Toubkal 6 Giorni via Lago Ifni da Marrakech — Vetta e Circuito | Marrakech Eco Tours",
    seoDescription: "Il circuito completo del Toubkal di 6 giorni da Marrakech — passi in quota, il turchese Lago Ifni e la vetta del Jbel Toubkal (4.167 m). Guida berbera autorizzata, tutti i pasti e trasferimenti. Da $620.",
    featured: false,
  },
  {
    id: "31",
    slug: "toubkal-summit-2day-marrakech",
    title: "Toubkal Express — Vetta in 2 Giorni da Marrakech",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "2 giorni / 1 notte",
    groupSize: "2–12 people",
    reviewCount: 34,
    rating: 4.7,
    price: 210,
    depositAmount: 55,
    heroImage: "/gallery/toubkal-summit-ridge-climbers.jpg",
    gallery: [
      "/gallery/toubkal-summit-ridge-climbers.jpg",
      "/gallery/toubkal-trekker-snow-slope.jpg",
      "/gallery/toubkal-final-snow-slope-dawn.jpg",
      "/gallery/toubkal-summit-panorama-high-atlas.jpg",
    ],
    shortDescription:
      "Il modo più rapido di raggiungere il tetto del Nord Africa — vetta del Jbel Toubkal (4.167 m) in un'ascensione mirata di due giorni da Marrakech.",
    description:
      "Poco tempo a disposizione ma determinato a salire sul punto più alto del Nord Africa? L'ascensione di 2 giorni al Toubkal è la via più diretta verso la vetta. Guida da Marrakech a Imlil, sali fino al Rifugio Toubkal oltre il santuario di Sidi Chamharouch il primo giorno, poi affronta la salita alla vetta prima dell'alba il secondo giorno, per poi scendere fino a Marrakech. È impegnativa — senza giornata di acclimatamento — quindi è essenziale un buon livello di forma fisica, ma offre l'intera esperienza del Toubkal in un solo weekend.",
    highlights: [
      "Vetta del Jbel Toubkal (4.167 m) in soli due giorni da Marrakech",
      "Notte nel Rifugio Toubkal a 3.207 m",
      "Passaggio dal santuario di Sidi Chamharouch e dalla sua cascata",
      "Panorama all'alba su tutto l'Alto Atlante",
    ],
    includes: [
      "Professional licensed mountain guide",
      "1 night in the Toubkal Refuge",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
      "Crampons and ice axe in winter (rental available)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Imlil → Rifugio Toubkal (3.207 m)",
        description:
          "Trasferimento anticipato da Marrakech a Imlil (1h30). Salita lungo la valle dell'Aït Mizane, oltre il santuario di Sidi Chamharouch, fino al Rifugio Toubkal. 4–5 ore di cammino. Cena e notte anticipata.",
      },
      {
        day: 2,
        title: "Vetta del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Partenza prima dell'alba per la vetta via il Circo Sud (circa 3 ore di salita). Alba dal tetto del Nord Africa, poi discesa al rifugio per il pranzo e proseguimento fino a Imlil (4–5 ore di discesa totale). Trasferimento di ritorno a Marrakech.",
      },
    ],
    faq: [
      { q: "Due giorni bastano davvero per scalare il Toubkal?", a: "Bastano per raggiungere la vetta, e i camminatori allenati lo fanno regolarmente. Ciò che non ti dà è il tempo di acclimatarti — passi da Marrakech a 4.167 metri in circa trenta ore. Se hai esperienza di camminate in montagna e poco tempo a disposizione funziona; per una prima volta in quota il 4 giorni è la scelta più sicura." },
      { q: "Cosa comporta il primo giorno?", a: "Un trasferimento mattutino da Marrakech a Imlil, circa un'ora e mezza, poi quattro o cinque ore di cammino lungo la valle dell'Aït Mizane oltre il santuario di Sidi Chamharouch fino al Rifugio Toubkal a 3.207 metri. Cena al rifugio e notte anticipata prima della partenza per la vetta." },
      { q: "Quanto è dura la discesa?", a: "Più lunga di quanto ci si aspetti. Dopo la vetta si torna al rifugio e si prosegue fino a Imlil — quattro o cinque ore di discesa totale, su terreno instabile, con le gambe stanche. È qui che le ginocchia si fanno sentire, e vale la pena allenarsi specificamente per questo." },
      { q: "Posso fare questo trekking in inverno?", a: "Solo con attrezzatura invernale e una guida qualificata per quelle condizioni. Da circa novembre a marzo il tratto superiore è innevato e richiede ramponi, piccozza e la capacità di usarli. Diventa un'escursione alpinistica più che una camminata." },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking Toubkal 2 Giorni da Marrakech — Vetta Express 4.167 m | Marrakech Eco Tours",
    seoDescription: "Scala il Jbel Toubkal (4.167 m) in 2 giorni da Marrakech — la via più rapida verso la cima più alta del Nord Africa. Notte in rifugio, tutti i pasti, guida berbera autorizzata e trasferimenti. Da $210.",
    featured: false,
  },
  {
    id: "32",
    slug: "toubkal-aguelzim-pass-3day",
    title: "Vetta del Toubkal via il Passo di Aguelzim — Trekking di 3 Giorni",
    category: "trekking",
    origin: "marrakech",
    difficulty: "challenging",
    duration: "3 giorni / 2 notti",
    groupSize: "2–12 people",
    reviewCount: 18,
    rating: 4.8,
    price: 330,
    depositAmount: 85,
    heroImage:
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
    ],
    shortDescription:
      "La via panoramica verso la vetta — attraverso la Valle dell'Azzaden, oltre le cascate di Ighouliden, sopra il Passo di Aguelzim (3.560 m) fino al Toubkal.",
    description:
      "Questo percorso di tre giorni prende la via posteriore più tranquilla e panoramica verso il Toubkal. Invece della diretta valle dell'Aït Mizane, entri nella selvaggia Valle dell'Azzaden, oltre le cascate di Ighouliden e i prati di Azib Tamsoult, poi attraversi il drammatico Passo di Aguelzim (3.560 m) per raggiungere il Rifugio Toubkal. L'ultimo giorno è la salita alla vetta. È un approccio più gratificante e panoramico rispetto al percorso standard, con vera varietà d'alta montagna. Nota: il passo di Aguelzim è transitabile solo indicativamente da maggio a ottobre.",
    highlights: [
      "Trekking nella selvaggia Valle dell'Azzaden — più tranquilla e verde del percorso standard",
      "Passaggio dalle spettacolari cascate di Ighouliden (Tamsoult)",
      "Attraversamento dell'alto Passo di Aguelzim a 3.560 m",
      "Vetta del Jbel Toubkal (4.167 m), la più alta del Nord Africa",
    ],
    includes: [
      "Professional licensed mountain guide",
      "2 nights accommodation (mountain refuges)",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Imlil → Valle dell'Azzaden (Azib Tamsoult)",
        description:
          "Trasferimento da Marrakech a Imlil. Attraversamento del passo Tizi n'Mzik (2.450 m) nella Valle dell'Azzaden, oltre le cascate di Ighouliden, fino al rifugio vicino ad Azib Tamsoult. Circa 6 ore.",
      },
      {
        day: 2,
        title: "Azzaden → Passo di Aguelzim (3.560 m) → Rifugio Toubkal (3.207 m)",
        description:
          "Una salita impegnativa fuori dalla Valle dell'Azzaden sopra il Passo di Aguelzim, con grandi vedute sull'Atlante occidentale, poi discesa al Rifugio Toubkal. Circa 6–7 ore. Notte anticipata prima della vetta.",
      },
      {
        day: 3,
        title: "Vetta del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Salita prima dell'alba via il Circo Sud fino alla vetta al sorgere del sole. Lunga discesa fino a Imlil (passando dal rifugio), poi trasferimento a Marrakech. Un'ultima giornata impegnativa ma indimenticabile.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Trekking Toubkal 3 Giorni via Passo di Aguelzim da Marrakech — Percorso della Valle dell'Azzaden | Marrakech Eco Tours",
    seoDescription: "Scala il Toubkal (4.167 m) per la via panoramica — 3 giorni via la Valle dell'Azzaden, le cascate di Ighouliden e il Passo di Aguelzim (3.560 m). Guida autorizzata, rifugi, tutti i pasti e trasferimenti. Da $330.",
    featured: false,
  },
  {
    id: "33",
    slug: "toubkal-three-peaks-4000m-3day",
    title: "Toubkal Tre Vette Oltre i 4.000 m — Sfida di 3 Giorni",
    category: "trekking",
    origin: "marrakech",
    difficulty: "expert",
    duration: "3 giorni / 2 notti",
    groupSize: "2–10 people",
    reviewCount: 12,
    rating: 4.9,
    price: 360,
    depositAmount: 90,
    heroImage:
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
      "https://images.unsplash.com/photo-1766680460144-56a2937a5433?w=1200&q=85",
      "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=1200&q=85",
    ],
    shortDescription:
      "Conquista tre delle vette oltre i 4.000 m dell'Alto Atlante in tre giorni — Ras Ouanoukrim, Timesguida e Jbel Toubkal.",
    description:
      "Per trekker forti ed esperti, questa è la sfida definitiva dell'Alto Atlante: tre vette oltre i 4.000 metri in tre giorni. Dal Rifugio Toubkal sali le vette gemelle dell'Ouanoukrim — Timesguida (4.089 m) e Ras (4.083 m) — prima del gran finale sul Jbel Toubkal (4.167 m) stesso. Con poco tempo per acclimatarti e 1.000 m di dislivello in giorni consecutivi, richiede vera forma fisica ed esperienza di montagna, ma ricompensa con tre dei punti più alti del Nord Africa.",
    highlights: [
      "Vetta di tre picchi oltre i 4.000 m: Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) e Toubkal (4.167 m)",
      "Uno dei trekking più duri e gratificanti dell'Alto Atlante",
      "Base al Rifugio Toubkal a 3.207 m",
      "Vette all'alba e vaste vedute fino al Sahara e all'Anti-Atlante",
    ],
    includes: [
      "Professional licensed mountain guide (high-altitude qualified)",
      "2 nights in the Toubkal Refuge",
      "All meals during the trek",
      "Mule porter for group gear",
      "Toubkal National Park entrance fees",
      "Round-trip transfer from Marrakech",
    ],
    excludes: [
      "Travel insurance with altitude cover (mandatory)",
      "Personal trekking equipment",
      "Tips for guide and porter",
      "Crampons and ice axe in winter (rental available)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Imlil → Rifugio Toubkal (3.207 m)",
        description:
          "Trasferimento da Marrakech a Imlil. Salita lungo la valle dell'Aït Mizane oltre Sidi Chamharouch fino al Rifugio Toubkal. 4–5 ore. Acclimatamento e riposo prima di due grandi giornate di vetta.",
      },
      {
        day: 2,
        title: "Ouanoukrim — Timesguida (4.089 m) e Ras (4.083 m)",
        description:
          "Salita fino all'area del Tizi n'Ouanoums e scalata delle due vette gemelle dell'Ouanoukrim, Timesguida e Ras, entrambe oltre i 4.000 m. Ritorno al Rifugio Toubkal per la notte. Una giornata intensa e impegnativa.",
      },
      {
        day: 3,
        title: "Vetta del Toubkal (4.167 m) → Imlil → Marrakech",
        description:
          "Salita finale sul Jbel Toubkal via il Circo Sud al sorgere del sole — la più alta delle tre. Lunga discesa fino a Imlil e trasferimento di ritorno a Marrakech.",
      },
    ],
    meetingPoint: { lat: 31.1369, lng: -7.9169, name: "Imlil Village, Atlas Mountains" },
    seoTitle: "Sfida Toubkal Tre Vette Oltre i 4.000 m — Trekking di 3 Giorni nell'Alto Atlante | Marrakech Eco Tours",
    seoDescription: "Sali su tre vette dell'Alto Atlante oltre i 4.000 m in 3 giorni — Timesguida (4.089 m), Ras Ouanoukrim (4.083 m) e Toubkal (4.167 m). Trekking di livello esperto da Marrakech con guida autorizzata. Da $360.",
    featured: false,
  },
  {
    id: "34",
    slug: "marrakech-food-market-tour",
    title: "Tour del Cibo e dei Mercati di Marrakech — Passeggiata Culinaria di Mezza Giornata",
    category: "day-tours",
    origin: "marrakech",
    difficulty: "easy",
    isDayTour: true,
    duration: "Mezza giornata (4 ore)",
    groupSize: "2–8 people",
    reviewCount: 34,
    rating: 4.9,
    price: 45,
    depositAmount: 10,
    heroImage:
      "https://images.unsplash.com/photo-1761255240953-c571ba0b98d7?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1761255240953-c571ba0b98d7?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1661083098412-054431ab7112?w=1200&q=85",
      "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=1200&q=85",
    ],
    shortDescription:
      "Cammina tra i souk delle spezie e le bancarelle del mercato della medina con una guida locale, assaggiando lungo il percorso, poi cucina un tagine da zero.",
    description:
      "Marrakech è la capitale culinaria del Marocco, e questa passeggiata di mezza giornata è costruita attorno a questo fatto. Inizia a Rahba Kedima, la piazza delle spezie, imparando a distinguere lo zafferano vero da quello colorato artificialmente e le oltre dodici spezie che compongono il ras el hanout. Prosegui tra i souk alimentari assaggiando olive, datteri, msemen e succo d'arancia appena spremuto dalle bancarelle di Jemaa el-Fna. Concludi nella cucina di una famiglia locale per una lezione pratica di preparazione del tagine e del tè alla menta marocchino — mangi ciò che cucini.",
    highlights: [
      "Piazza delle spezie di Rahba Kedima — zafferano vero contro imitazioni colorate",
      "Degustazioni guidate tra i souk alimentari in attività della medina",
      "Lezione pratica di cucina del tagine con una famiglia locale",
      "Cerimonia del tè alla menta marocchino, fatta come si deve",
    ],
    includes: [
      "Local English-speaking food guide",
      "All tastings along the route",
      "Cooking class ingredients and instruction",
      "Full tagine lunch you help prepare",
      "Mint tea ceremony",
    ],
    excludes: ["Hotel pickup outside the medina", "Tips for guide and host family"],
    itinerary: [
      {
        day: 1,
        title: "Mezza giornata — Mercati della Medina e Lezione di Cucina",
        description:
          "Incontro alla piazza delle spezie di Rahba Kedima alle 9:30. Passeggiata guidata tra i souk delle spezie e del cibo con degustazioni (90 minuti). Proseguimento verso la cucina di una famiglia locale per una lezione pratica di cucina del tagine. Ci si siede a tavola per gustare il tagine cucinato, concluso con il tè alla menta. Termine entro le 13:30.",
      },
    ],
    meetingPoint: { lat: 31.6316, lng: -7.9868, name: "Rahba Kedima Spice Square, Marrakech Medina" },
    seoTitle: "Tour del Cibo e dei Mercati di Marrakech — Passeggiata nel Souk delle Spezie e Lezione di Cucina | Marrakech Eco Tours",
    seoDescription: "Tour gastronomico di mezza giornata a Marrakech: assapora il tuo percorso tra i souk delle spezie, poi cucina un vero tagine con una famiglia locale. Piccolo gruppo, guida locale. Da $45.",
    faq: [
      { q: "Questo tour è adatto ai vegetariani?", a: "Sì. La lezione di cucina e le degustazioni possono essere completamente vegetariane su richiesta — faccelo sapere al momento della prenotazione. La maggior parte delle degustazioni nei souk (olive, datteri, spezie, succo fresco) sono vegetariane di default." },
      { q: "Dobbiamo arrivare affamati?", a: "Vieni con appetito ma non a stomaco vuoto — la passeggiata include una dozzina di piccole degustazioni prima ancora di raggiungere la lezione di cucina, quindi dosa le forze e salta una colazione abbondante." },
      { q: "In cosa è diverso da un normale tour della medina?", a: "Un tour generico della medina copre monumenti e storia. Questo è costruito interamente attorno al cibo — dove i locali fanno davvero la spesa e mangiano, non le bancarelle rivolte ai turisti vicino a Jemaa el-Fna — e si conclude con te che cucini, non solo guardi." },
    ],
    featured: false,
  },
  {
    id: "35",
    slug: "merzouga-stargazing-desert-tour",
    title: "Osservazione delle Stelle nel Sahara di Merzouga — Tour del Deserto Dark Sky di 2 Giorni",
    category: "desert",
    origin: "marrakech",
    difficulty: "easy",
    duration: "2 giorni / 1 notte",
    groupSize: "2–10 people",
    reviewCount: 21,
    rating: 4.9,
    price: 210,
    depositAmount: 55,
    heroImage:
      "https://images.unsplash.com/photo-1683138155815-d7edd806d8a3?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1683138155815-d7edd806d8a3?w=1200&q=85",
      "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=1200&q=85",
      "https://images.unsplash.com/photo-1685311572420-513619470404?w=1200&q=85",
      "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=85",
    ],
    shortDescription:
      "Trekking in cammello nell'Erg Chebbi al tramonto, seguito da una sessione guidata di osservazione delle stelle a occhio nudo e con telescopio sotto uno dei cieli più bui del Nord Africa.",
    description:
      "L'Erg Chebbi si trova abbastanza lontano da qualsiasi città che la Via Lattea è visibile a occhio nudo in una notte serena — questo viaggio è costruito su questo fatto, non trattato come un semplice bonus. Dopo il trekking in cammello al tramonto e la cena al campo, una guida astronomica locale allestisce un telescopio e conduce il gruppo attraverso i pianeti visibili, le costellazioni e gli oggetti del cielo profondo, spiegati in un linguaggio semplice anziché tecnico. Periodo migliore: da ottobre a maggio, quando il cielo notturno del deserto è più limpido e il caldo è sceso abbastanza da poter stare seduti all'aperto comodamente per ore.",
    highlights: [
      "Sessione guidata di osservazione delle stelle a occhio nudo e con telescopio con una guida astronomica",
      "Trekking in cammello al tramonto tra le dune dell'Erg Chebbi",
      "Una notte in un tradizionale campo berbero nel deserto, lontano da ogni inquinamento luminoso",
      "Il miglior cielo notturno del deserto in Marocco — nessun bagliore di città in nessuna direzione",
    ],
    includes: [
      "Round-trip transport from Marrakech",
      "Camel trek at sunset",
      "1 night desert camp accommodation",
      "Telescope and guided stargazing session",
      "Dinner and breakfast at camp",
    ],
    excludes: [
      "Travel insurance",
      "Lunch en route (stops available)",
      "Tips for guide and camp crew",
    ],
    itinerary: [
      {
        day: 1,
        title: "Marrakech → Campo nel Deserto dell'Erg Chebbi",
        description:
          "Partenza da Marrakech al mattino presto, attraversando l'Alto Atlante e la Valle del Draa fino a Merzouga. Trekking in cammello al tramonto tra le dune dell'Erg Chebbi. Cena al campo, seguita dalla sessione guidata di osservazione delle stelle una volta calata l'oscurità completa.",
      },
      {
        day: 2,
        title: "Alba → Merzouga → Marrakech",
        description:
          "Osservazione facoltativa dell'alba sulle dune. Colazione al campo, trasferimento in cammello o 4x4 di ritorno a Merzouga, e viaggio di ritorno a Marrakech, con arrivo in serata.",
      },
    ],
    meetingPoint: { lat: 31.0580, lng: -4.0127, name: "Merzouga, Erg Chebbi Sahara" },
    seoTitle: "Tour di Osservazione delle Stelle a Merzouga — Viaggio nel Deserto Dark Sky del Sahara di 2 Giorni | Marrakech Eco Tours",
    seoDescription: "Tour di 2 giorni da Marrakech a Merzouga per osservare le stelle — trekking in cammello al tramonto, sessione notturna guidata con telescopio e una notte in un campo nell'Erg Chebbi. Da $210.",
    faq: [
      { q: "Ho bisogno di conoscenze o attrezzatura astronomica personale?", a: "No. La guida fornisce il telescopio e spiega tutto da zero — pensato tanto per principianti assoluti quanto per chi ha già interesse per l'astronomia." },
      { q: "Qual è il periodo migliore dell'anno per questo tour?", a: "Da ottobre a maggio. Il cielo è più limpido e la notte nel deserto è abbastanza fresca da poter stare seduti all'aperto comodamente; le notti estive sono comunque stellate ma molto più calde." },
      { q: "Cosa succede se è nuvoloso?", a: "Il cielo sereno all'Erg Chebbi è la norma, a parte rari sistemi di tempesta invernali, ma se la copertura nuvolosa impedisce la sessione di osservazione delle stelle, l'esperienza del campo, il trekking in cammello e la cena proseguono comunque come previsto." },
    ],
    featured: false,
  },
];
