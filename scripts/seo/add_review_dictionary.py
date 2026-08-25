# -*- coding: utf-8 -*-
"""Add the `review` block to all six dictionaries.

app/[lang]/review/page.tsx already reads `dict.review.*` with English
fallbacks, but no dictionary defined the key, so every locale silently fell
back to English -- the page shipped in English on all six, and its <title> was
one of the duplicate titles the metadata audit flagged.

This page is short UI copy (a thank-you, two CTAs, a sign-off), not legal text,
so translating it is honest and complete. The legal pages are deliberately NOT
touched: their BODIES are English-only, and translating just the <title> would
advertise French content that does not exist.

Names are kept as-is (Lahsen, Mohamed, Smail) and so is "Bslama" -- the Berber
goodbye is the point of the sign-off, not a word to localise.
"""
import io, json, collections

D = "—"  # em dash, matching the English copy

REVIEW = {
"en": {
  "metaTitle": "Leave a Review %s Marrakech Eco Tours" % D,
  "metaDesc": "Loved your Morocco tour? Share a review %s it means the world to our small family team of Berber guides." % D,
  "eyebrow": "Thank you for travelling with us",
  "heading": "How was your adventure?",
  "sub": "Your happiness is the whole reason we do this. If our guides and the trip made your Morocco memorable, a few words would mean everything to our small family team %s and it helps other travellers find us." % D,
  "matterTitle": "Why it matters",
  "matterBody": "We're a family of licensed Berber guides, not a booking platform. We don't spend on advertising %s travellers find us through the stories of travellers who came before. Your review is how the next family, couple, or solo adventurer decides to trust us." % D,
  "tripadvisor": "Review us on Tripadvisor",
  "google": "Review us on Google",
  "whatsapp": "Send us a private message instead",
  "thanks": "From Lahsen, Mohamed, Smail and the whole team %s thank you. Bslama!" % D,
},
"fr": {
  "metaTitle": "Laisser un avis %s Marrakech Eco Tours" % D,
  "metaDesc": "Votre voyage au Maroc vous a plu ? Laissez un avis %s cela compte énormément pour notre petite équipe familiale de guides berbères." % D,
  "eyebrow": "Merci d'avoir voyagé avec nous",
  "heading": "Comment s'est passée votre aventure ?",
  "sub": "Votre satisfaction est la raison d'être de notre travail. Si nos guides et le voyage ont rendu votre Maroc mémorable, quelques mots compteraient beaucoup pour notre petite équipe familiale %s et ils aident d'autres voyageurs à nous trouver." % D,
  "matterTitle": "Pourquoi c'est important",
  "matterBody": "Nous sommes une famille de guides berbères agréés, pas une plateforme de réservation. Nous ne dépensons rien en publicité %s les voyageurs nous trouvent grâce aux récits de ceux qui sont venus avant eux. Votre avis, c'est ce qui décide la prochaine famille, le prochain couple ou le prochain voyageur solo à nous faire confiance." % D,
  "tripadvisor": "Donnez votre avis sur Tripadvisor",
  "google": "Donnez votre avis sur Google",
  "whatsapp": "Envoyez-nous plutôt un message privé",
  "thanks": "De la part de Lahsen, Mohamed, Smail et de toute l'équipe %s merci. Bslama !" % D,
},
"es": {
  "metaTitle": "Deja tu opinión %s Marrakech Eco Tours" % D,
  "metaDesc": "¿Te encantó tu viaje por Marruecos? Deja tu opinión %s significa muchísimo para nuestro pequeño equipo familiar de guías bereberes." % D,
  "eyebrow": "Gracias por viajar con nosotros",
  "heading": "¿Qué tal fue tu aventura?",
  "sub": "Tu satisfacción es la razón por la que hacemos esto. Si nuestros guías y el viaje hicieron que tu Marruecos fuera memorable, unas pocas palabras significarían muchísimo para nuestro pequeño equipo familiar %s y ayudan a que otros viajeros nos encuentren." % D,
  "matterTitle": "Por qué importa",
  "matterBody": "Somos una familia de guías bereberes con licencia, no una plataforma de reservas. No gastamos en publicidad %s los viajeros nos encuentran por lo que cuentan quienes vinieron antes. Tu opinión es lo que hace que la próxima familia, pareja o viajero en solitario decida confiar en nosotros." % D,
  "tripadvisor": "Opina sobre nosotros en Tripadvisor",
  "google": "Opina sobre nosotros en Google",
  "whatsapp": "Prefiero enviaros un mensaje privado",
  "thanks": "De parte de Lahsen, Mohamed, Smail y de todo el equipo %s gracias. ¡Bslama!" % D,
},
"de": {
  "metaTitle": "Bewertung abgeben %s Marrakech Eco Tours" % D,
  "metaDesc": "Hat Ihnen Ihre Marokko-Reise gefallen? Hinterlassen Sie eine Bewertung %s sie bedeutet unserem kleinen Familienteam aus Berberführern sehr viel." % D,
  "eyebrow": "Danke, dass Sie mit uns gereist sind",
  "heading": "Wie war Ihr Abenteuer?",
  "sub": "Ihre Zufriedenheit ist der ganze Grund, warum wir das tun. Wenn unsere Guides und die Reise Ihr Marokko unvergesslich gemacht haben, würden ein paar Worte unserem kleinen Familienteam sehr viel bedeuten %s und sie helfen anderen Reisenden, uns zu finden." % D,
  "matterTitle": "Warum das zählt",
  "matterBody": "Wir sind eine Familie lizenzierter Berberführer, keine Buchungsplattform. Wir geben kein Geld für Werbung aus %s Reisende finden uns durch die Erzählungen derer, die vor ihnen hier waren. Ihre Bewertung entscheidet darüber, ob die nächste Familie, das nächste Paar oder der nächste Alleinreisende uns vertraut." % D,
  "tripadvisor": "Bewerten Sie uns auf Tripadvisor",
  "google": "Bewerten Sie uns auf Google",
  "whatsapp": "Lieber eine private Nachricht senden",
  "thanks": "Von Lahsen, Mohamed, Smail und dem ganzen Team %s danke. Bslama!" % D,
},
"it": {
  "metaTitle": "Lascia una recensione %s Marrakech Eco Tours" % D,
  "metaDesc": "Ti è piaciuto il tuo viaggio in Marocco? Lascia una recensione %s significa moltissimo per il nostro piccolo team familiare di guide berbere." % D,
  "eyebrow": "Grazie per aver viaggiato con noi",
  "heading": "Com'è andata la tua avventura?",
  "sub": "La tua soddisfazione è il motivo per cui facciamo questo lavoro. Se le nostre guide e il viaggio hanno reso il tuo Marocco indimenticabile, poche parole significherebbero moltissimo per il nostro piccolo team familiare %s e aiutano altri viaggiatori a trovarci." % D,
  "matterTitle": "Perché è importante",
  "matterBody": "Siamo una famiglia di guide berbere autorizzate, non una piattaforma di prenotazione. Non spendiamo in pubblicità %s i viaggiatori ci trovano grazie ai racconti di chi è venuto prima. La tua recensione è ciò che convince la prossima famiglia, coppia o viaggiatore solitario a fidarsi di noi." % D,
  "tripadvisor": "Recensiscici su Tripadvisor",
  "google": "Recensiscici su Google",
  "whatsapp": "Preferisco inviarvi un messaggio privato",
  "thanks": "Da Lahsen, Mohamed, Smail e da tutto il team %s grazie. Bslama!" % D,
},
"ar": {
  "metaTitle": "اترك تقييمًا %s مراكش إيكو تورز" % D,
  "metaDesc": "هل أعجبتك رحلتك في المغرب؟ شاركنا تقييمك %s فهو يعني الكثير لفريقنا العائلي الصغير من المرشدين الأمازيغ." % D,
  "eyebrow": "شكرًا لسفرك معنا",
  "heading": "كيف كانت مغامرتك؟",
  "sub": "رضاك هو سبب عملنا كله. إذا جعل مرشدونا ورحلتنا إقامتك في المغرب لا تُنسى، فإن بضع كلمات منك تعني الكثير لفريقنا العائلي الصغير %s وتساعد مسافرين آخرين على الوصول إلينا." % D,
  "matterTitle": "لماذا يهمّ هذا",
  "matterBody": "نحن عائلة من المرشدين الأمازيغ المرخّصين، ولسنا منصة حجوزات. لا ننفق على الإعلانات %s يجدنا المسافرون من خلال قصص من سبقوهم. تقييمك هو ما يجعل العائلة أو الثنائي أو المسافر المنفرد القادم يثق بنا." % D,
  "tripadvisor": "قيّمنا على تريب أدفايزر",
  "google": "قيّمنا على جوجل",
  "whatsapp": "أفضّل إرسال رسالة خاصة",
  "thanks": "من لحسن ومحمد وسماعيل ومن الفريق بأكمله %s شكرًا لك. بسلامة!" % D,
},
}


def run():
    for loc, block in REVIEW.items():
        path = "dictionaries/%s.json" % loc
        # object_pairs_hook keeps the file's existing key order intact
        data = json.load(io.open(path, encoding="utf-8"),
                         object_pairs_hook=collections.OrderedDict)
        data["review"] = collections.OrderedDict(
            (k, block[k]) for k in
            ["metaTitle", "metaDesc", "eyebrow", "heading", "sub",
             "matterTitle", "matterBody", "tripadvisor", "google",
             "whatsapp", "thanks"]
        )
        out = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        io.open(path, "w", encoding="utf-8", newline="\n").write(out)
        print("  %-24s review block added (%d fields)" % (path, len(block)))


run()
