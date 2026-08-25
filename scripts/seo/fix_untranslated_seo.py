# -*- coding: utf-8 -*-
"""Translate the 15 tour seoTitle/seoDescription values left in English.

The locale files DO carry these fields -- they were just copied from English
during translation and never localised. `title` was translated correctly, so
the on-page H1 has always been right; only the <title> tag and meta description
(what Google actually shows in the SERP) stayed English.

This hit all five SHARED tours, which are the cheapest, highest-volume
products, so it was costing us on exactly the queries we most want.

Prices inside the strings (EUR120, EUR85, EUR40, EUR30, "From $329") are
carried across VERBATIM -- they are the product's real numbers, not prose.
"""
import io, re, sys

E = "€"   # euro sign, kept out of the source literal for Windows consoles
D = "—"   # em dash, matching the existing files

# slug -> locale -> (seoTitle, seoDescription or None to leave alone)
T = {
"azzaden-valley-2day-trek": {
 "fr": ("Trek de 2 jours dans la vallée d'Azzaden %s randonnée tranquille dans l'Atlas depuis Marrakech" % D, None),
 "es": ("Trekking de 2 días por el valle de Azzaden %s ruta tranquila del Alto Atlas desde Marrakech" % D, None),
 "de": ("2-Tage-Trek im Azzaden-Tal %s ruhige Atlas-Wanderung ab Marrakesch" % D, None),
 "it": ("Trekking di 2 giorni nella valle di Azzaden %s escursione tranquilla nell'Atlante da Marrakech" % D, None),
 "ar": ("رحلة سير يومين في وادي أزادن %s مسار هادئ في الأطلس من مراكش" % D, None),
},
"atlas-mountains-3day-trek": {
 "fr": ("Trek de 3 jours dans l'Atlas %s villages berbères du Haut Atlas depuis Marrakech" % D, None),
 "es": ("Trekking de 3 días por el Atlas %s pueblos bereberes del Alto Atlas desde Marrakech" % D, None),
 "de": ("3-Tage-Trek im Atlasgebirge %s Berberdörfer des Hohen Atlas ab Marrakesch" % D, None),
 "it": ("Trekking di 3 giorni nell'Atlante %s villaggi berberi dell'Alto Atlante da Marrakech" % D, None),
 "ar": ("رحلة سير 3 أيام في الأطلس %s قرى أمازيغية في الأطلس الكبير من مراكش" % D, None),
},
"family-atlas-4day-trek": {
 "fr": ("Trek en famille dans l'Atlas 4 jours %s randonnée douce en villages berbères depuis Marrakech" % D, None),
 "es": ("Trekking familiar por el Atlas 4 días %s ruta suave por pueblos bereberes desde Marrakech" % D, None),
 "de": ("Familien-Trek im Atlasgebirge 4 Tage %s sanfte Berberdorf-Wanderung ab Marrakesch" % D, None),
 "it": ("Trekking in famiglia nell'Atlante 4 giorni %s escursione dolce tra villaggi berberi da Marrakech" % D, None),
 "ar": ("رحلة عائلية في الأطلس 4 أيام %s مسار سهل عبر القرى الأمازيغية من مراكش" % D, None),
},
"family-desert-4day-marrakech": {
 "fr": ("Circuit désert en famille 4 jours %s de Marrakech au Sahara avec enfants" % D, None),
 "es": ("Tour familiar al desierto 4 días %s de Marrakech al Sahara con niños" % D, None),
 "de": ("Familien-Wüstentour 4 Tage %s von Marrakesch in die Sahara mit Kindern" % D, None),
 "it": ("Tour del deserto in famiglia 4 giorni %s da Marrakech al Sahara con bambini" % D, None),
 "ar": ("جولة صحراوية عائلية 4 أيام %s من مراكش إلى الصحراء مع الأطفال" % D, None),
},
"high-atlas-grand-traverse-15day": {
 "fr": ("Grande Traversée du Haut Atlas 15 jours %s trek du M'Goun au Toubkal" % D, None),
 "es": ("Gran Travesía del Alto Atlas 15 días %s trekking del M'Goun al Toubkal" % D, None),
 "de": ("Große Hoher-Atlas-Durchquerung 15 Tage %s Trek vom M'Goun zum Toubkal" % D, None),
 "it": ("Grande Traversata dell'Alto Atlante 15 giorni %s trekking dal M'Goun al Toubkal" % D, None),
 "ar": ("عبور الأطلس الكبير 15 يومًا %s رحلة من مغون إلى توبقال" % D, None),
},
# ---- the five SHARED tours: prices are part of the string, keep them exact --
"shared-merzouga-3day-marrakech": {
 "fr": ("Désert de Merzouga circuit partagé 3 jours depuis Marrakech %s %s120" % (D, E),
        "Départ quotidien partagé de Marrakech vers les dunes de l'Erg Chebbi : Aït Ben Haddou, gorges du Dadès et du Todra, balade à dos de dromadaire et nuit en campement. %s120 par personne." % E),
 "es": ("Desierto de Merzouga tour compartido 3 días desde Marrakech %s %s120" % (D, E),
        "Salida diaria compartida desde Marrakech a las dunas de Erg Chebbi: Aït Ben Haddou, gargantas del Dades y del Todra, paseo en camello y noche en campamento. %s120 por persona." % E),
 "de": ("Merzouga-Wüste 3-Tage-Gruppentour ab Marrakesch %s %s120" % (D, E),
        "Tägliche Gruppenabfahrt ab Marrakesch zu den Dünen des Erg Chebbi: Aït Ben Haddou, Dades- und Todra-Schlucht, Kamelritt und Übernachtung im Wüstencamp. %s120 pro Person." % E),
 "it": ("Deserto di Merzouga tour condiviso 3 giorni da Marrakech %s %s120" % (D, E),
        "Partenza giornaliera condivisa da Marrakech verso le dune dell'Erg Chebbi: Aït Ben Haddou, gole del Dades e del Todra, giro in cammello e notte in campo tendato. %s120 a persona." % E),
 "ar": ("جولة جماعية 3 أيام إلى صحراء مرزوقة من مراكش %s %s120" % (D, E),
        "انطلاق يومي جماعي من مراكش إلى كثبان عرق الشبي: آيت بن حدو، مضايق دادس وتودغة، ركوب الجمال وليلة في مخيم صحراوي. %s120 للشخص." % E),
},
"shared-zagora-2day-marrakech": {
 "fr": ("Désert de Zagora circuit partagé 2 jours depuis Marrakech %s %s85" % (D, E),
        "Départ quotidien partagé vers les dunes de Zagora : Tizi n'Tichka, Aït Ben Haddou, vallée du Draâ, balade à dos de dromadaire et nuit en campement berbère. %s85 par personne." % E),
 "es": ("Desierto de Zagora tour compartido 2 días desde Marrakech %s %s85" % (D, E),
        "Salida diaria compartida a las dunas de Zagora: Tizi n'Tichka, Aït Ben Haddou, valle del Draa, paseo en camello y noche en campamento bereber. %s85 por persona." % E),
 "de": ("Zagora-Wüste 2-Tage-Gruppentour ab Marrakesch %s %s85" % (D, E),
        "Tägliche Gruppenabfahrt zu den Dünen von Zagora: Tizi n'Tichka, Aït Ben Haddou, Draa-Tal, Kamelritt und Übernachtung im Berbercamp. %s85 pro Person." % E),
 "it": ("Deserto di Zagora tour condiviso 2 giorni da Marrakech %s %s85" % (D, E),
        "Partenza giornaliera condivisa verso le dune di Zagora: Tizi n'Tichka, Aït Ben Haddou, valle del Draa, giro in cammello e notte in campo berbero. %s85 a persona." % E),
 "ar": ("جولة جماعية يومين إلى صحراء زاكورة من مراكش %s %s85" % (D, E),
        "انطلاق يومي جماعي إلى كثبان زاكورة: تيزي نتيشكا، آيت بن حدو، وادي درعة، ركوب الجمال وليلة في مخيم أمازيغي. %s85 للشخص." % E),
},
"shared-ouzoud-waterfalls-day-trip": {
 "fr": ("Cascades d'Ouzoud excursion partagée depuis Marrakech %s %s40" % (D, E),
        "Départ quotidien partagé vers les cascades d'Ouzoud : chutes de 110 m, magots en liberté, marche dans les gorges et tour en barque. Aller-retour depuis Marrakech, %s40 par personne." % E),
 "es": ("Cascadas de Ouzoud excursión compartida desde Marrakech %s %s40" % (D, E),
        "Salida diaria compartida a las cascadas de Ouzoud: saltos de 110 m, monos de Berbería en libertad, paseo por el desfiladero y paseo en barca. Ida y vuelta desde Marrakech, %s40 por persona." % E),
 "de": ("Ouzoud-Wasserfälle Gruppentagestour ab Marrakesch %s %s40" % (D, E),
        "Tägliche Gruppenabfahrt zu den Ouzoud-Wasserfällen: 110 m hohe Kaskaden, freilebende Berberaffen, Schluchtwanderung und Bootsfahrt. Hin- und Rückfahrt ab Marrakesch, %s40 pro Person." % E),
 "it": ("Cascate di Ouzoud escursione condivisa da Marrakech %s %s40" % (D, E),
        "Partenza giornaliera condivisa verso le cascate di Ouzoud: salti di 110 m, bertucce in libertà, passeggiata nella gola e giro in barca. Andata e ritorno da Marrakech, %s40 a persona." % E),
 "ar": ("شلالات أوزود رحلة يومية جماعية من مراكش %s %s40" % (D, E),
        "انطلاق يومي جماعي إلى شلالات أوزود: مساقط بارتفاع 110 متر، قرود مغربية طليقة، مسير في الوادي وجولة بالقارب. ذهابًا وإيابًا من مراكش، %s40 للشخص." % E),
},
"shared-agafay-dinner-camel-ride": {
 "fr": ("Désert d'Agafay dîner, dromadaire et spectacle de feu depuis Marrakech %s %s30" % (D, E),
        "Soirée dans le désert de pierre d'Agafay : balade à dos de dromadaire au coucher du soleil, dîner trois services, musique live et spectacle de feu, à 40 minutes de Marrakech. %s30 par personne." % E),
 "es": ("Desierto de Agafay cena, paseo en camello y espectáculo de fuego desde Marrakech %s %s30" % (D, E),
        "Velada en el desierto pétreo de Agafay: paseo en camello al atardecer, cena de tres platos, música en vivo y espectáculo de fuego, a 40 minutos de Marrakech. %s30 por persona." % E),
 "de": ("Agafay-Wüste Abendessen, Kamelritt und Feuershow ab Marrakesch %s %s30" % (D, E),
        "Abend in der Steinwüste Agafay: Kamelritt bei Sonnenuntergang, Drei-Gänge-Menü, Live-Musik und Feuershow, 40 Minuten von Marrakesch. %s30 pro Person." % E),
 "it": ("Deserto di Agafay cena, giro in cammello e spettacolo del fuoco da Marrakech %s %s30" % (D, E),
        "Serata nel deserto di pietra di Agafay: giro in cammello al tramonto, cena di tre portate, musica dal vivo e spettacolo del fuoco, a 40 minuti da Marrakech. %s30 a persona." % E),
 "ar": ("صحراء أكافاي: عشاء وركوب الجمال وعرض ناري من مراكش %s %s30" % (D, E),
        "أمسية في صحراء أكافاي الحجرية: ركوب الجمال عند الغروب، عشاء من ثلاثة أطباق، موسيقى حية وعرض ناري، على بعد 40 دقيقة من مراكش. %s30 للشخص." % E),
},
"shared-essaouira-day-trip": {
 "fr": ("Essaouira excursion partagée depuis Marrakech %s %s30" % (D, E),
        "Départ quotidien partagé vers Essaouira : médina classée à l'UNESCO, remparts du XVIIIe siècle, port de pêche bleu et coopérative d'argan en chemin. %s30 par personne." % E),
 "es": ("Essaouira excursión compartida desde Marrakech %s %s30" % (D, E),
        "Salida diaria compartida a Essaouira: medina Patrimonio de la Humanidad, murallas del siglo XVIII, puerto pesquero azul y cooperativa de argán en el camino. %s30 por persona." % E),
 "de": ("Essaouira Gruppentagestour ab Marrakesch %s %s30" % (D, E),
        "Tägliche Gruppenabfahrt nach Essaouira: UNESCO-Medina, Stadtmauern aus dem 18. Jahrhundert, blauer Fischerhafen und unterwegs eine Arganöl-Kooperative. %s30 pro Person." % E),
 "it": ("Essaouira escursione condivisa da Marrakech %s %s30" % (D, E),
        "Partenza giornaliera condivisa per Essaouira: medina patrimonio UNESCO, mura del XVIII secolo, porto peschereccio blu e cooperativa di argan lungo il percorso. %s30 a persona." % E),
 "ar": ("الصويرة رحلة يومية جماعية من مراكش %s %s30" % (D, E),
        "انطلاق يومي جماعي إلى الصويرة: مدينة عتيقة مصنفة عالميًا، أسوار من القرن الثامن عشر، ميناء صيد أزرق وتعاونية أركان في الطريق. %s30 للشخص." % E),
},
}

BRAND = " | Marrakech Eco Tours"


def blocks(text):
    """Return [(slug, start, end)] using the 4-space `slug:` marker only."""
    out = []
    idx = [m for m in re.finditer(r'\n    slug: "([^"]+)"', text)]
    for k, m in enumerate(idx):
        end = idx[k + 1].start() if k + 1 < len(idx) else len(text)
        out.append((m.group(1), m.start(), end))
    return out


def run():
    total = 0
    for loc in ["fr", "es", "de", "it", "ar"]:
        path = "lib/tours.%s.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        changed = 0
        # rewrite back-to-front so earlier offsets stay valid
        for slug, start, end in reversed(blocks(src)):
            if slug not in T or loc not in T[slug]:
                continue
            title, desc = T[slug][loc]
            block = src[start:end]
            new = block
            m = re.search(r'(\n    seoTitle: ")([^"]+)(")', new)
            if m:
                new = new[:m.start(2)] + title + BRAND + new[m.end(2):]
                changed += 1
            if desc:
                m2 = re.search(r'(\n    seoDescription: ")([^"]+)(")', new)
                if m2:
                    new = new[:m2.start(2)] + desc + new[m2.end(2):]
                    changed += 1
            src = src[:start] + new + src[end:]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("%s: %d fields translated" % (path, changed))
        total += changed
    print("TOTAL fields translated: %d" % total)


run()
