import Link from "next/link";
import { SITE, SISTER_SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function privacyEs({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Política de privacidad",
    metaDescription: "Cómo Marrakech Eco Tours recopila, utiliza y protege tus datos personales conforme a la Ley marroquí 09-08.",
    title: "Política de privacidad",
    intro: "Cómo recopilamos, utilizamos y protegemos tus datos personales, y los derechos que tienes sobre ellos según la Ley marroquí 09-08.",
    sections: [
      {
        id: "who-we-are",
        title: "Quiénes somos",
        body: (
          <>
            <p>
              Marrakech Eco Tours («nosotros») es un operador turístico con sede en Marruecos que ofrece rutas
              guiadas de trekking, desierto, cultura y aventura con salida desde Marrakech y Agadir. Nuestro sitio
              web es <a href="https://marrakechecotours.com">marrakechecotours.com</a>.
            </p>
            <p>
              Somos el <strong>responsable del tratamiento</strong> de los datos personales descritos en esta
              política. Para contactarnos al respecto —incluido el ejercicio de cualquiera de los derechos que se
              indican más abajo— escribe a {mail}, llama al <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a> o
              escríbenos a {SITE.address}.
            </p>
            <p>
              También gestionamos una marca hermana,{" "}
              <a href={SISTER_SITE.url} target="_blank" rel="noopener noreferrer">{SISTER_SITE.name}</a>{" "}
              ({SISTER_SITE.url.replace("https://", "")}), dirigida por el mismo equipo. Esta política cubre
              marrakechecotours.com; el sitio de la marca hermana publica su propio aviso.
            </p>
            <p>
              Esta política explica qué datos personales recopilamos, cómo los usamos y qué derechos tienes.
              Tratamos los datos personales de acuerdo con la Ley marroquí n.º 09-08 relativa a la protección de las
              personas físicas en lo que respecta al tratamiento de datos de carácter personal, supervisada por la
              CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Cuando
              atendemos a visitantes de la Unión Europea, aplicamos además estándares alineados con el RGPD.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Datos que recopilamos",
        body: (
          <>
            <p>Solo recopilamos la información que nos facilitas voluntariamente cuando:</p>
            <ul>
              <li>Envías una consulta o solicitud de reserva a través de nuestro formulario de contacto (nombre, correo electrónico, teléfono, ruta de interés, fechas de viaje, tamaño del grupo y mensaje)</li>
              <li>Nos contactas directamente por WhatsApp, correo electrónico o teléfono</li>
              <li>Te suscribes a nuestro boletín (solo la dirección de correo electrónico)</li>
              <li>Completas una reserva y el pago de un depósito (el pago lo procesa PayPal; no recibimos, almacenamos ni tenemos acceso a los datos de tu tarjeta o cuenta bancaria)</li>
              <li>Apareces en fotografías tomadas durante una ruta, cuando te hemos pedido y has dado tu permiso para publicarlas</li>
            </ul>
            <p>
              También tratamos automáticamente una pequeña cantidad de datos técnicos y de preferencias; consulta{" "}
              <a href="#cookies">Cookies y tecnologías similares</a> y{" "}
              <Link href={`/${lang}/cookies`}>nuestra Política de cookies</Link> para todos los detalles.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "Cómo usamos tus datos",
        body: (
          <>
            <p>Utilizamos la información que nos facilitas únicamente para:</p>
            <ul>
              <li>Responder a tu consulta y gestionar tu reserva</li>
              <li>Enviar confirmaciones de reserva, itinerarios e información previa a la salida</li>
              <li>Contactarte sobre cambios en tu reserva o en la ruta</li>
              <li>Enviar boletines, solo si te has suscrito expresamente (puedes darte de baja en cualquier momento)</li>
              <li>Cumplir las obligaciones legales y contables previstas en la legislación marroquí</li>
            </ul>
            <p>
              Nunca utilizaremos tu información para marketing no solicitado sin tu consentimiento explícito. No
              vendemos, alquilamos, compartimos ni intercambiamos tus datos personales con terceros con fines de
              marketing.
            </p>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Cookies y tecnologías similares",
        body: (
          <>
            <p>
              Nuestro sitio utiliza un número reducido de cookies. <strong>No</strong> utilizamos píxeles de redes
              sociales ni rastreadores publicitarios entre sitios. Las cookies que instalamos son:
            </p>
            <ul>
              <li><strong>Consentimiento (met-cookie-consent)</strong>: recuerda tu elección sobre las cookies para no volver a preguntarte. Estrictamente necesaria.</li>
              <li><strong>Moneda (met_currency)</strong>: recuerda la moneda de visualización que elijas (EUR, USD, GBP o MAD). Preferencia funcional; solo se instala si cambias de moneda.</li>
              <li><strong>Google Analytics (_ga, _gid y relacionadas)</strong>: nos ayudan a entender, de forma agregada, cómo usan los visitantes el sitio y si nuestra publicidad llega a las personas adecuadas. <strong>Solo se instalan si eliges «Aceptar todo»</strong>; si eliges «Solo necesarias», nunca se instalan y Google Analytics no se carga.</li>
              <li><strong>Microsoft Clarity (_clck, _clsk y relacionadas)</strong>: nos muestran, de forma agregada y mediante grabaciones de sesión enmascaradas, dónde hacen clic y desplazan los visitantes. <strong>Solo se instalan si eliges «Aceptar todo»</strong>; de lo contrario, Clarity no se carga.</li>
            </ul>
            <p>
              También usamos una medición de rendimiento respetuosa con la privacidad y sin cookies (consulta{" "}
              <a href="#third-party">Servicios de terceros</a>). El desglose completo, incluido cómo rechazar o
              borrar las cookies, está en nuestra <Link href={`/${lang}/cookies`}>Política de cookies</Link>. En tu
              primera visita, un banner te permite aceptar todas las cookies o conservar solo las estrictamente
              necesarias. La base legal de las cookies de analítica es tu <strong>consentimiento</strong>, que puedes
              retirar en cualquier momento borrando las cookies de este sitio.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Servicios de terceros",
        body: (
          <>
            <p>
              Para hacer funcionar nuestro sitio y gestionar las reservas, utilizamos los siguientes encargados del
              tratamiento. Cada uno trata los datos según sus propias condiciones de privacidad:
            </p>
            <ul>
              <li>
                <strong>Vercel</strong>: alojamiento web y analítica respetuosa con la privacidad. Vercel Analytics y
                Speed Insights recopilan datos de tráfico y rendimiento anonimizados y agregados (páginas vistas,
                número de visitantes, Core Web Vitals) sin cookies ni identificadores personales. Vercel puede
                registrar datos estándar del servidor (dirección IP, marcas de tiempo de las solicitudes) por
                seguridad. Consulta la{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de privacidad de Vercel</a>.
              </li>
              <li>
                <strong>Google (Analytics y Ads)</strong>: <strong>solo si aceptas todas las cookies</strong>,
                usamos Google Analytics 4 para medir el uso agregado del sitio y Google Ads para medir el rendimiento
                de nuestra publicidad. Google puede tratar estos datos (incluida tu dirección IP, para la que
                activamos la anonimización) fuera de Marruecos. No se carga si eliges «Solo necesarias». Consulta la{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidad de Google</a>.
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong>: <strong>solo si aceptas todas las cookies</strong>, usamos
                Microsoft Clarity para ver cómo usan los visitantes nuestras páginas (clics, desplazamiento,
                grabaciones de sesión enmascaradas) y corregir lo que confunde. El texto que escribes en los
                formularios queda enmascarado. No se carga si eliges «Solo necesarias». Consulta la{" "}
                <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">declaración de privacidad de Microsoft</a>.
              </li>
              <li>
                <strong>PayPal</strong>: procesamiento seguro de los pagos de depósitos y pagos completos. PayPal
                gestiona directamente todos los datos de tarjeta y bancarios; nunca recibimos tus credenciales de
                pago.
              </li>
              <li>
                <strong>Resend</strong>: envío de correos electrónicos transaccionales. Cuando envías nuestro
                formulario de contacto o de suscripción, tu nombre y tu correo pasan por Resend hasta nuestra bandeja
                de entrada. Consulta la{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de privacidad de Resend</a>.
              </li>
              <li>
                <strong>Cloudflare</strong>: DNS, seguridad de red y enrutamiento de correo. Los mensajes enviados a
                nuestra dirección {SITE.emailDisplay} se reenvían mediante Cloudflare Email Routing a la bandeja del
                equipo que revisamos, por lo que el contenido de tu correo pasa por Cloudflare en tránsito. Como capa
                de DNS y seguridad, Cloudflare también trata datos de conexión estándar (dirección IP, metadatos de
                las solicitudes) para proteger el sitio frente a abusos. Consulta la{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">política de privacidad de Cloudflare</a>.
              </li>
              <li>
                <strong>WhatsApp / Meta</strong>: si nos contactas por WhatsApp, tus mensajes están sujetos a la
                política de privacidad y las condiciones de Meta.
              </li>
              <li>
                <strong>Editores de RSS de terceros</strong>: los artículos de nuestra página de Noticias se obtienen
                en el servidor a partir de fuentes RSS públicas (The Guardian, BBC, NYT Travel y otras). No se envía a
                estos editores ninguna información que te identifique.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "retention",
        title: "Conservación de los datos",
        body: (
          <p>
            Conservamos tus datos personales durante el tiempo necesario para cumplir tu reserva y hasta{" "}
            <strong>5 años</strong> después por obligaciones contables y legales según la legislación marroquí. Las
            consultas que no terminan en reserva se eliminan en un plazo de <strong>12 meses</strong> desde nuestro
            último contacto contigo. Las suscripciones al boletín se mantienen hasta que te des de baja.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Tus derechos",
        body: (
          <>
            <p>Según la Ley marroquí 09-08 (y el RGPD cuando sea aplicable), tienes derecho a:</p>
            <ul>
              <li>Solicitar una copia de los datos personales que tenemos sobre ti (derecho de acceso)</li>
              <li>Solicitar la corrección de cualquier dato inexacto o incompleto (derecho de rectificación)</li>
              <li>Solicitar la supresión de tus datos, cuando la ley no nos obligue a conservarlos</li>
              <li>Oponerte al tratamiento de tus datos o limitarlo en determinadas circunstancias</li>
              <li>Retirar en cualquier momento tu consentimiento para cualquier comunicación que no hayas aceptado contractualmente</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a {mail}. Responderemos en un plazo de{" "}
              <strong>30 días</strong>. También tienes derecho a presentar una reclamación ante la CNDP si consideras
              que tus datos no se han tratado correctamente.
            </p>
          </>
        ),
      },
      {
        id: "security",
        title: "Seguridad",
        body: (
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger tus datos contra el acceso, la
            pérdida o la divulgación no autorizados. Nuestro sitio se sirve exclusivamente por HTTPS con una
            política de seguridad de contenidos (CSP) estricta. Todos los pagos los gestiona PayPal: nunca
            recibimos, transmitimos ni almacenamos datos de tarjetas. Los envíos del formulario de contacto se
            entregan a través de Resend mediante conexiones cifradas.
          </p>
        ),
      },
      {
        id: "international",
        title: "Transferencias internacionales",
        body: (
          <p>
            Nuestras operaciones y datos se encuentran principalmente en Marruecos. Nuestro alojamiento (Vercel), el
            envío de correos (Resend) y —si has aceptado las cookies de analítica— la infraestructura de Google
            Analytics/Ads y Microsoft Clarity pueden tratar datos en Estados Unidos o en la Unión Europea. Cuando se
            transfieren datos personales fuera de Marruecos, tomamos medidas para garantizar protecciones adecuadas,
            de acuerdo con la Ley marroquí 09-08 y las orientaciones de la CNDP.
          </p>
        ),
      },
      {
        id: "children",
        title: "Privacidad de los menores",
        body: (
          <p>
            Nuestros servicios no están dirigidos a menores de 16 años y no recopilamos conscientemente sus datos
            personales. Los menores que participen en una ruta deben ir acompañados de un adulto responsable que
            acepte estas condiciones y esta política en su nombre. Si crees que un menor nos ha enviado datos
            personales, contáctanos y los eliminaremos de inmediato.
          </p>
        ),
      },
      {
        id: "external-links",
        title: "Enlaces externos",
        body: (
          <p>
            Nuestro sitio enlaza a sitios externos, como artículos de noticias y nuestra marca hermana. Cuando sales
            de nuestro sitio, esta política deja de aplicarse y no somos responsables de las prácticas de privacidad
            de sitios de terceros.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Cambios en esta política",
        body: (
          <p>
            Podemos actualizar esta política periódicamente para reflejar cambios en nuestros servicios o en la
            legislación aplicable. La fecha que figura al principio de esta página indica la última revisión. El uso
            continuado de nuestro sitio tras una revisión implica la aceptación de la política actualizada.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contacto",
        body: (
          <p>
            Para cualquier pregunta sobre privacidad o para ejercer tus derechos, contáctanos en {mail}.
          </p>
        ),
      },
    ],
  };
}
