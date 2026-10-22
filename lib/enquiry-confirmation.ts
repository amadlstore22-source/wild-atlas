import { SITE } from "@/lib/constants";

/**
 * The email a visitor gets straight after sending the enquiry form, in the
 * language of the page they sent it from.
 *
 * Until 2026-10-23 it was English only, so a French family enquiring from a
 * French page got an English acknowledgement followed by a French reply. And it
 * never said where our real reply would come from. Several clients answered
 * days later that our reply had been in their spam folder (a Yahoo client
 * twice), although mail-tester scored the domain 10/10 and Resend showed every
 * reply delivered: a young domain writing to Yahoo for the first time. The one
 * thing the visitor can do about it, add info@ to their contacts and check
 * spam, now sits in the first email they read from us.
 *
 * Only safe values reach this function: the route has already replaced a
 * link-like name with "" (safeGreetingName) and an unknown tour with ""
 * (isRealTourTitle). See __tests__/lib/contact-route-abuse.test.ts.
 */

export const CONFIRMATION_LANGS = ["en", "fr", "es", "de", "it", "ar"] as const;
export type ConfirmationLang = (typeof CONFIRMATION_LANGS)[number];

/** The page language the form sent, or English for anything else. */
export function confirmationLang(v: unknown): ConfirmationLang {
  return typeof v === "string" && (CONFIRMATION_LANGS as readonly string[]).includes(v)
    ? (v as ConfirmationLang)
    : "en";
}

const DATE_LOCALE: Record<ConfirmationLang, string> = {
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
  it: "it-IT",
  ar: "ar-MA",
};

/** "2026-11-23" as "23 November 2026" in the visitor's language. */
function formatDate(iso: string, lang: ConfirmationLang): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${iso}T00:00:00Z`));
}

interface Input {
  lang: ConfirmationLang;
  type: string;
  /** Safe greeting name, or "". */
  greet: string;
  /** One of our real tour titles, or "". */
  tour: string;
  /** ISO date, or "". */
  date: string;
  email: string;
}

interface Copy {
  hi: (name: string) => string;
  bookingSubject: (tour: string) => string;
  generalSubject: string;
  booking: (tour: string, date: string) => string;
  general: (email: string) => string;
  spam: string;
  whatsappBooking: string;
  whatsappGeneral: string;
  signOff: string;
}

const FROM = SITE.email;
const WA = SITE.phone;

const COPY: Record<ConfirmationLang, Copy> = {
  en: {
    hi: (n) => (n ? `Hi ${n},` : "Hello,"),
    bookingSubject: (t) => `We received your booking inquiry${t ? ` — ${t}` : ""}`,
    generalSubject: "We received your message — Marrakech Eco Tours",
    booking: (t, d) =>
      `Thank you for your booking inquiry${t ? ` for "${t}"` : ""}.\n\n` +
      `We've received your request${d ? ` for ${d}` : ""} and one of our guides will get back to you within the hour (8:00–20:00 Morocco time) to confirm your dates and go through the details.\n\n` +
      `We run private departures, so we build the trip around the dates you want.`,
    general: (e) =>
      `Thank you for getting in touch with Marrakech Eco Tours.\n\n` +
      `We've received your message and will reply to ${e} within the hour (8:00–20:00 Morocco time).`,
    spam: `Our reply will come from ${FROM}. Please add this address to your contacts, and if you don't see our reply, check your spam or junk folder.`,
    whatsappBooking: `For faster responses, you can also reach us on WhatsApp: ${WA}.`,
    whatsappGeneral: `For urgent inquiries, WhatsApp is the fastest way to reach us: ${WA}.`,
    signOff: "Best regards,\nThe Marrakech Eco Tours Team",
  },
  fr: {
    hi: (n) => (n ? `Bonjour ${n},` : "Bonjour,"),
    bookingSubject: (t) => `Nous avons bien reçu votre demande de réservation${t ? ` — ${t}` : ""}`,
    generalSubject: "Nous avons bien reçu votre message — Marrakech Eco Tours",
    booking: (t, d) =>
      `Merci pour votre demande de réservation${t ? ` pour « ${t} »` : ""}.\n\n` +
      `Nous avons bien reçu votre demande${d ? ` pour le ${d}` : ""}, et l'un de nos guides vous répondra dans l'heure (de 8 h à 20 h, heure du Maroc) pour confirmer vos dates et voir les détails avec vous.\n\n` +
      `Nous organisons des départs privés : le voyage se construit autour des dates que vous choisissez.`,
    general: (e) =>
      `Merci d'avoir contacté Marrakech Eco Tours.\n\n` +
      `Nous avons bien reçu votre message et nous vous répondrons à ${e} dans l'heure (de 8 h à 20 h, heure du Maroc).`,
    spam: `Notre réponse viendra de l'adresse ${FROM}. Ajoutez-la à vos contacts et, si vous ne voyez pas notre réponse, pensez à vérifier votre dossier de courrier indésirable (spam).`,
    whatsappBooking: `Pour une réponse plus rapide, vous pouvez aussi nous écrire sur WhatsApp : ${WA}.`,
    whatsappGeneral: `Pour une demande urgente, WhatsApp est le moyen le plus rapide de nous joindre : ${WA}.`,
    signOff: "Bien cordialement,\nL'équipe Marrakech Eco Tours",
  },
  es: {
    hi: (n) => (n ? `Hola, ${n}:` : "Hola:"),
    bookingSubject: (t) => `Hemos recibido tu solicitud de reserva${t ? ` — ${t}` : ""}`,
    generalSubject: "Hemos recibido tu mensaje — Marrakech Eco Tours",
    booking: (t, d) =>
      `Gracias por tu solicitud de reserva${t ? ` para «${t}»` : ""}.\n\n` +
      `Hemos recibido tu solicitud${d ? ` para el ${d}` : ""} y uno de nuestros guías te responderá en menos de una hora (de 8:00 a 20:00, hora de Marruecos) para confirmar las fechas y repasar los detalles contigo.\n\n` +
      `Organizamos salidas privadas, así que el viaje se adapta a las fechas que elijas.`,
    general: (e) =>
      `Gracias por ponerte en contacto con Marrakech Eco Tours.\n\n` +
      `Hemos recibido tu mensaje y te responderemos a ${e} en menos de una hora (de 8:00 a 20:00, hora de Marruecos).`,
    spam: `Nuestra respuesta llegará desde ${FROM}. Añade esta dirección a tus contactos y, si no ves nuestra respuesta, revisa la carpeta de spam o correo no deseado.`,
    whatsappBooking: `Para una respuesta más rápida, también puedes escribirnos por WhatsApp: ${WA}.`,
    whatsappGeneral: `Si es urgente, WhatsApp es la forma más rápida de contactarnos: ${WA}.`,
    signOff: "Un saludo,\nEl equipo de Marrakech Eco Tours",
  },
  de: {
    hi: (n) => (n ? `Hallo ${n},` : "Hallo,"),
    bookingSubject: (t) => `Wir haben Ihre Buchungsanfrage erhalten${t ? ` — ${t}` : ""}`,
    generalSubject: "Wir haben Ihre Nachricht erhalten — Marrakech Eco Tours",
    booking: (t, d) =>
      `vielen Dank für Ihre Buchungsanfrage${t ? ` für „${t}“` : ""}.\n\n` +
      `Wir haben Ihre Anfrage${d ? ` für den ${d}` : ""} erhalten. Einer unserer Guides meldet sich innerhalb einer Stunde bei Ihnen (8:00–20:00 Uhr marokkanischer Zeit), um Ihre Termine zu bestätigen und die Einzelheiten zu besprechen.\n\n` +
      `Wir bieten private Touren an, daher planen wir die Reise rund um Ihre Wunschtermine.`,
    general: (e) =>
      `vielen Dank für Ihre Nachricht an Marrakech Eco Tours.\n\n` +
      `Wir haben sie erhalten und antworten Ihnen innerhalb einer Stunde (8:00–20:00 Uhr marokkanischer Zeit) an ${e}.`,
    spam: `Unsere Antwort kommt von ${FROM}. Bitte fügen Sie diese Adresse zu Ihren Kontakten hinzu und sehen Sie in Ihrem Spam-Ordner nach, falls Sie unsere Antwort nicht finden.`,
    whatsappBooking: `Noch schneller erreichen Sie uns über WhatsApp: ${WA}.`,
    whatsappGeneral: `In dringenden Fällen erreichen Sie uns am schnellsten über WhatsApp: ${WA}.`,
    signOff: "Viele Grüße\nIhr Team von Marrakech Eco Tours",
  },
  it: {
    hi: (n) => (n ? `Buongiorno ${n},` : "Buongiorno,"),
    bookingSubject: (t) => `Abbiamo ricevuto la Sua richiesta di prenotazione${t ? ` — ${t}` : ""}`,
    generalSubject: "Abbiamo ricevuto il Suo messaggio — Marrakech Eco Tours",
    booking: (t, d) =>
      `grazie per la Sua richiesta di prenotazione${t ? ` per «${t}»` : ""}.\n\n` +
      `Abbiamo ricevuto la Sua richiesta${d ? ` per il ${d}` : ""} e una delle nostre guide Le risponderà entro un'ora (dalle 8:00 alle 20:00, ora del Marocco) per confermare le date e definire i dettagli.\n\n` +
      `Organizziamo partenze private: costruiamo il viaggio intorno alle date che preferisce.`,
    general: (e) =>
      `grazie per aver contattato Marrakech Eco Tours.\n\n` +
      `Abbiamo ricevuto il Suo messaggio e Le risponderemo a ${e} entro un'ora (dalle 8:00 alle 20:00, ora del Marocco).`,
    spam: `La nostra risposta arriverà da ${FROM}. La preghiamo di aggiungere questo indirizzo ai Suoi contatti e, se non vede la nostra risposta, di controllare la cartella spam o posta indesiderata.`,
    whatsappBooking: `Per una risposta più rapida può scriverci anche su WhatsApp: ${WA}.`,
    whatsappGeneral: `Per le richieste urgenti, WhatsApp è il modo più rapido per contattarci: ${WA}.`,
    signOff: "Cordiali saluti,\nIl team di Marrakech Eco Tours",
  },
  ar: {
    hi: (n) => (n ? `مرحباً ${n}،` : "مرحباً،"),
    bookingSubject: (t) => `استلمنا طلب الحجز الخاص بك${t ? ` — ${t}` : ""}`,
    generalSubject: "استلمنا رسالتك — Marrakech Eco Tours",
    booking: (t, d) =>
      `شكراً على طلب الحجز${t ? ` الخاص بـ «${t}»` : ""}.\n\n` +
      `لقد استلمنا طلبك${d ? ` ليوم ${d}` : ""}، وسيتواصل معك أحد مرشدينا خلال ساعة (من 8:00 إلى 20:00 بتوقيت المغرب) لتأكيد التواريخ ومراجعة التفاصيل معك.\n\n` +
      `ننظّم رحلات خاصة، لذلك نبني الرحلة حول التواريخ التي تختارها.`,
    general: (e) =>
      `شكراً لتواصلك مع Marrakech Eco Tours.\n\n` +
      `لقد استلمنا رسالتك وسنردّ عليك على ${e} خلال ساعة (من 8:00 إلى 20:00 بتوقيت المغرب).`,
    spam: `سيصلك ردّنا من العنوان ${FROM}. يُرجى إضافة هذا العنوان إلى جهات الاتصال لديك، وإذا لم تجد ردّنا فتحقّق من مجلد الرسائل غير المرغوب فيها (Spam).`,
    whatsappBooking: `للحصول على ردّ أسرع، يمكنك أيضاً التواصل معنا عبر واتساب: ${WA}.`,
    whatsappGeneral: `للاستفسارات العاجلة، واتساب هو أسرع طريقة للتواصل معنا: ${WA}.`,
    signOff: "مع أطيب التحيات،\nفريق Marrakech Eco Tours",
  },
};

/** Subject and plain-text body of the visitor's confirmation email. */
export function confirmationEmail({ lang, type, greet, tour, date, email }: Input): { subject: string; text: string } {
  const c = COPY[lang];
  const booking = type === "booking";
  const body = booking ? c.booking(tour, formatDate(date, lang)) : c.general(email);
  return {
    subject: booking ? c.bookingSubject(tour) : c.generalSubject,
    text: [c.hi(greet), body, c.spam, booking ? c.whatsappBooking : c.whatsappGeneral, c.signOff].join("\n\n"),
  };
}
