import Link from "next/link";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function cookiesEs({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Política de cookies",
    metaDescription: "Las cookies y la medición respetuosa con la privacidad que usa Marrakech Eco Tours, y cómo controlarlas.",
    title: "Política de cookies",
    intro: "Las cookies y la medición respetuosa con la privacidad que utilizamos, por qué, y cómo puedes controlarlas.",
    sections: [
      {
        id: "what-are-cookies",
        title: "Qué son las cookies",
        body: (
          <p>
            Las cookies son pequeños archivos de texto que un sitio web guarda en tu navegador. Permiten que el sitio
            recuerde las elecciones que has hecho y funcione correctamente. Esta política explica qué cookies
            utilizamos, por qué y cómo controlarlas. Complementa nuestra{" "}
            <Link href={`/${lang}/privacy`}>Política de privacidad</Link>.
          </p>
        ),
      },
      {
        id: "our-approach",
        title: "Nuestro enfoque",
        body: (
          <>
            <p>
              Reducimos las cookies al mínimo y nunca vendemos los datos recopilados con ellas. Usamos{" "}
              <strong>Google Analytics</strong> y <strong>Microsoft Clarity</strong> para entender cómo encuentran y
              usan el sitio los visitantes, y <strong>solo</strong> si los aceptas: ambos permanecen desactivados
              hasta que eliges <strong>Aceptar todo</strong>. No utilizamos píxeles de redes sociales ni rastreadores
              publicitarios entre sitios.
            </p>
            <p>
              En tu primera visita, un banner te permite <strong>Aceptar todo</strong> o quedarte solo con las cookies{" "}
              <strong>necesarias</strong>. Si eliges «Solo necesarias», no se instala ninguna cookie de analítica y
              Google Analytics no llega a cargarse. Con cualquiera de las dos opciones puedes usar todo el sitio: no
              hay muro de cookies. Recordamos tu elección para no volver a preguntarte, y puedes cambiarla en
              cualquier momento borrando tus cookies.
            </p>
          </>
        ),
      },
      {
        id: "cookies-we-use",
        title: "Cookies que utilizamos",
        body: (
          <>
            <h3>Estrictamente necesarias</h3>
            <dl className="tier">
              <dt>met-cookie-consent</dt>
              <dd>Guarda tu elección sobre las cookies para que el banner no vuelva a aparecer. No requiere consentimiento (exenta). Duración: hasta 1 año.</dd>
            </dl>
            <h3>Funcionales (preferencias)</h3>
            <dl className="tier">
              <dt>met_currency</dt>
              <dd>Recuerda la moneda de visualización que elijas (EUR, USD, GBP o MAD). Solo se instala si cambias de moneda. Duración: hasta 1 año.</dd>
            </dl>
            <h3>Analítica: solo si eliges «Aceptar todo»</h3>
            <p>
              Las siguientes las instala <strong>Google Analytics (GA4)</strong>, y solo después de que elijas{" "}
              <strong>Aceptar todo</strong>. Si eliges <strong>Solo necesarias</strong>, ninguna se instala nunca. Nos
              ayudan a ver, de forma agregada, qué páginas y rutas interesan a los visitantes y si nuestros anuncios
              atraen a las personas adecuadas; no las usamos para identificarte personalmente.
            </p>
            <dl className="tier">
              <dt>_ga</dt>
              <dd>Distingue el navegador de un visitante del de otro para poder contar las visitas. La instala Google Analytics. Duración: hasta 2 años.</dd>
              <dt>_ga_&lt;container&gt;</dt>
              <dd>Mantiene el estado de tu sesión para Google Analytics 4. Duración: hasta 2 años.</dd>
              <dt>_gid</dt>
              <dd>Distingue a los visitantes durante un periodo corto. La instala Google Analytics. Duración: hasta 24 horas.</dd>
            </dl>
            <p>
              También solo después de <strong>Aceptar todo</strong>, <strong>Microsoft Clarity</strong> nos muestra,
              de forma agregada y mediante grabaciones anonimizadas, dónde hacen clic y desplazan los visitantes, para
              que podamos corregir las páginas que confunden. Clarity enmascara lo que escribes en los formularios.
              Sus cookies:
            </p>
            <dl className="tier">
              <dt>_clck</dt>
              <dd>Guarda el ID de usuario de Clarity y las preferencias para este sitio. La instala Microsoft Clarity.</dd>
              <dt>_clsk</dt>
              <dd>Une las páginas de una misma visita en una sola sesión. La instala Microsoft Clarity.</dd>
              <dt>CLID, MUID, ANONCHK, MR, SM</dt>
              <dd>Cookies de terceros en dominios de Microsoft que Clarity utiliza para reconocer un navegador; Clarity no las usa con fines publicitarios (ANONCHK siempre vale 0). Consulta la lista de cookies de Clarity de Microsoft.</dd>
            </dl>
          </>
        ),
      },
      {
        id: "measurement",
        title: "Medición sin cookies",
        body: (
          <>
            <p>
              También contamos los clics en las sugerencias de rutas que aparecen en nuestros artículos. De cada clic
              registramos solo la fecha, el idioma, el artículo y la ruta pulsada: <strong>ninguna cookie</strong>,
              ninguna dirección IP y nada que pueda identificarte, así que funciona elijas lo que elijas en el banner.
            </p>
            <p>
              Aparte de las cookies de analítica anteriores, utilizamos <strong>Vercel Analytics</strong> y{" "}
              <strong>Vercel Speed Insights</strong> para medir el rendimiento del sitio. Son herramientas respetuosas
              con la privacidad que <strong>no utilizan cookies</strong> ni huellas digitales: solo recopilan métricas
              anonimizadas y agregadas (páginas vistas, número de visitantes, Core Web Vitals), funcionan siempre y no
              pueden identificarte. Consulta la{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de privacidad de Vercel</a>.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Cookies de terceros",
        body: (
          <>
            <p>
              Cuando aceptas todas las cookies, <strong>Google</strong> (Google Analytics y la medición de
              conversiones de Google Ads) instala las cookies indicadas arriba y puede usarlas para medir el
              rendimiento de nuestra publicidad. Esto se rige por la{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">política de cookies de Google</a>{" "}
              y su{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidad</a>.
            </p>
            <p>
              Cuando aceptas todas las cookies, <strong>Microsoft</strong> (Clarity) instala las cookies indicadas
              arriba. Esto se rige por la{" "}
              <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">lista de cookies de Clarity</a>{" "}
              y la{" "}
              <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">declaración de privacidad de Microsoft</a>.
            </p>
            <p>
              Algunas páginas también integran o enlazan otros servicios de terceros que pueden instalar sus propias
              cookies cuando interactúas con ellos; por ejemplo, <strong>PayPal</strong> cuando sigues un enlace de
              pago que te enviamos, o <strong>WhatsApp / Meta</strong> si inicias un chat. Se rigen por las políticas
              de cookies y privacidad de esos proveedores, no por las nuestras.
            </p>
          </>
        ),
      },
      {
        id: "managing-cookies",
        title: "Gestionar y eliminar cookies",
        body: (
          <>
            <p>Siempre tienes el control:</p>
            <ul>
              <li>Elige <strong>Solo necesarias</strong> en el banner de consentimiento para evitar las cookies funcionales y de analítica: Google Analytics y Microsoft Clarity no se cargarán.</li>
              <li>Para retirar tu consentimiento después de aceptar, borra las cookies de este sitio en tu navegador; el banner volverá a aparecer y podrás elegir de nuevo. Al borrarlas también se restablece tu elección de moneda.</li>
              <li>Configura tu navegador para bloquear las cookies o avisarte. El sitio seguirá funcionando, aunque quizá no recuerde tu moneda.</li>
            </ul>
            <p>
              La mayoría de los navegadores explican cómo gestionar las cookies en su sección de ayuda (Chrome,
              Safari, Firefox, Edge).
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Cambios en esta política",
        body: (
          <p>
            Podemos actualizar esta Política de cookies a medida que evolucione nuestro sitio o cambie la ley. La
            fecha que figura al principio indica la última revisión.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contacto",
        body: <p>¿Tienes preguntas sobre las cookies? Escríbenos a {mail}.</p>,
      },
    ],
  };
}
