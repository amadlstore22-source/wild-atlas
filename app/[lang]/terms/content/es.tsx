import { SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function termsEs({ mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Términos y condiciones",
    metaDescription: "Términos y condiciones de las reservas y rutas con Marrakech Eco Tours, regidos por la legislación marroquí.",
    title: "Términos y condiciones",
    intro: "Las condiciones que rigen las reservas y las rutas con Marrakech Eco Tours. Léelas antes de hacer una reserva.",
    sections: [
      {
        id: "about",
        title: "Sobre estas condiciones",
        body: (
          <>
            <p>
              Estos Términos y condiciones rigen todas las reservas realizadas con Marrakech Eco Tours («nosotros»),
              operador turístico con sede en {SITE.address}, que opera conforme a la legislación marroquí. Al enviar
              una solicitud de reserva, pagar un depósito o realizar el pago completo a través de{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>, aceptas estas condiciones en tu
              nombre y en el de todos los miembros de tu grupo.
            </p>
            <p>
              Nuestro sitio está disponible en inglés, francés, español, alemán, italiano y árabe como cortesía. En
              caso de discrepancia entre las traducciones, <strong>prevalece la versión en inglés</strong>.
            </p>
          </>
        ),
      },
      {
        id: "services",
        title: "Nuestros servicios",
        body: (
          <>
            <p>
              Ofrecemos rutas guiadas de trekking, desierto, cultura y aventura con salida desde Marrakech y Agadir:
              treks por el Alto Atlas, ascensiones al Toubkal, excursiones al Sáhara, paseos culturales por las
              medinas y aventuras de varios días en plena naturaleza. Todos los detalles —qué incluye y qué no, la
              forma física necesaria y la duración— figuran en la página de cada ruta.
            </p>
            <p>
              Las noticias y artículos de viaje de nuestro sitio se recopilan de fuentes RSS de terceros solo con fines
              informativos. No somos responsables de la exactitud, actualidad o contenido de esas fuentes externas.
            </p>
          </>
        ),
      },
      {
        id: "bookings",
        title: "Reservas y pagos",
        body: (
          <ul>
            <li>Una reserva queda confirmada cuando hemos recibido tu depósito y te hemos enviado una confirmación por escrito por correo electrónico.</li>
            <li>
              Se requiere un depósito para garantizar tu reserva. El importe exacto figura en la página de cada ruta y
              suele ser aproximadamente una cuarta parte del precio. Se aplica la cifra que aparece en la página de la
              ruta en el momento de la reserva.
            </li>
            <li>El saldo restante se paga <strong>a la llegada</strong>, al comienzo de la ruta, en efectivo o con tarjeta. No se cobra nada más antes de tu viaje.</li>
            <li>Las reservas de última hora se aceptan en las mismas condiciones, según disponibilidad: el depósito asegura las fechas y el saldo se paga a la llegada.</li>
            <li>Los depósitos y pagos se gestionan a través de <strong>PayPal</strong>. Cuando la página de la ruta no tiene un enlace de pago automático, te enviamos una solicitud de pago de PayPal por WhatsApp o correo electrónico una vez confirmados los datos de tu reserva, y tu depósito queda asegurado en cuanto se completa ese pago. No almacenamos ni tenemos acceso a los datos de tu tarjeta o cuenta bancaria. Se aplican las condiciones y comisiones propias de PayPal.</li>
            <li>Los precios se muestran en la moneda que elijas (EUR, USD, GBP o MAD) por comodidad; el precio contractual se acuerda por escrito en la confirmación. Las fluctuaciones del tipo de cambio corren de tu cuenta.</li>
            <li>Las reservas de grupos de 6 o más personas pueden estar sujetas a un presupuesto personalizado: contáctanos antes de reservar.</li>
          </ul>
        ),
      },
      {
        id: "cancellation",
        title: "Política de cancelación",
        body: (
          <>
            <h3>Cancelación por tu parte</h3>
            <dl className="tier">
              <dt>14 días o más antes de la salida</dt>
              <dd>Reembolso íntegro de todos los pagos realizados, incluido el depósito.</dd>
              <dt>Entre 8 y 13 días antes de la salida</dt>
              <dd>Se cobra el 50 % del precio total de la ruta; el resto se reembolsa.</dd>
              <dt>7 días o menos antes de la salida</dt>
              <dd>Sin reembolso. Se pierde el precio total de la ruta.</dd>
              <dt>No presentación</dt>
              <dd>Sin reembolso. Se pierde el precio total de la ruta.</dd>
            </dl>
            <p>
              Todas las solicitudes de cancelación deben hacerse por escrito a {mail}. La fecha en que recibimos tu
              cancelación por escrito determina qué tramo se aplica.
            </p>
            <h3>Cancelación por nuestra parte</h3>
            <p>
              Nos reservamos el derecho de cancelar una ruta por falta de reservas, condiciones meteorológicas
              adversas, problemas de seguridad, inestabilidad política, catástrofes naturales o fuerza mayor. En ese
              caso recibirás el reembolso íntegro de todos los pagos realizados. No somos responsables de los gastos
              adicionales en que incurras (vuelos internacionales, alojamiento, visados, seguro de viaje, etc.).
            </p>
          </>
        ),
      },
      {
        id: "changes-to-bookings",
        title: "Cambios en las reservas",
        body: (
          <p>
            Atenderemos las solicitudes de cambio de fecha siempre que sea posible, según disponibilidad y con al
            menos 14 días de antelación. Puede aplicarse un cargo administrativo de <strong>25 € por persona</strong>{" "}
            por el cambio de fecha. Nuestros guías pueden modificar el itinerario el mismo día por motivos de
            seguridad, meteorología o logística. No se realizan reembolsos por modificaciones del itinerario hechas de
            buena fe por estos motivos.
          </p>
        ),
      },
      {
        id: "responsibilities",
        title: "Tus responsabilidades",
        body: (
          <ul>
            <li>Debes tener un pasaporte válido y los visados necesarios para Marruecos antes de viajar.</li>
            <li>Debes contratar un seguro de viaje adecuado, con cobertura médica y de evacuación de emergencia. Lo <strong>recomendamos encarecidamente</strong> para todos los treks y rutas por el desierto.</li>
            <li>Debes informar en el momento de la reserva de cualquier problema de salud, necesidad alimentaria, discapacidad o limitación de movilidad relevante para la ruta.</li>
            <li>Debes seguir en todo momento las indicaciones de tu guía. Los guías pueden modificar o dar por terminada una ruta si es necesario para la seguridad del grupo.</li>
            <li>Cualquier participante cuyo comportamiento ponga en peligro a otros o que el guía considere inapropiado puede ser excluido de la ruta sin reembolso.</li>
            <li>Eres responsable de la seguridad de tus pertenencias personales durante toda la ruta.</li>
          </ul>
        ),
      },
      {
        id: "health-fitness",
        title: "Salud y forma física",
        body: (
          <p>
            Al completar una reserva, confirmas que tú y todos los miembros de tu grupo tenéis una salud física
            adecuada para la ruta elegida. Los treks —en especial las ascensiones al Toubkal y las rutas de varios días
            por el Alto Atlas— exigen una buena forma cardiovascular e implican un esfuerzo intenso en altitud (hasta
            4.167 m). No aceptamos ninguna responsabilidad por lesiones o enfermedades derivadas de no haber
            informado de problemas de salud relevantes antes de la reserva.
          </p>
        ),
      },
      {
        id: "included-excluded",
        title: "Servicios incluidos y excluidos",
        body: (
          <p>
            Lo que está incluido y excluido se indica en la página de cada ruta. Salvo que se indique expresamente lo
            contrario, quedan <strong>excluidos</strong> de todos los precios: vuelos internacionales, tasas de
            visado para Marruecos, seguro de viaje, traslados al aeropuerto (salvo que se indique), gastos
            personales, comidas no mencionadas en la descripción de la ruta, propinas para guías y conductores, y
            suplementos de habitación individual.
          </p>
        ),
      },
      {
        id: "eco",
        title: "Compromiso ecológico",
        body: (
          <p>
            Estamos comprometidos con un turismo responsable y sostenible en Marruecos. Pedimos a todos los
            participantes que respeten el entorno, las comunidades y las tradiciones locales: siguiendo los
            principios de «Leave No Trace» en los treks, respetando las normas de vestimenta locales en medinas y
            pueblos, y apoyando la economía local comprando a artesanos y comercios locales siempre que sea posible.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Responsabilidad",
        body: (
          <>
            <p>
              Tomamos todas las medidas razonables para garantizar la seguridad y la calidad de las rutas que
              organizamos. No obstante, no somos responsables de:
            </p>
            <ul>
              <li>Fallecimiento, lesiones, enfermedades, pérdidas o daños derivados de circunstancias ajenas a nuestro control razonable (fuerza mayor, condiciones meteorológicas extremas, catástrofes naturales, disturbios civiles, pandemias)</li>
              <li>La pérdida o el daño de pertenencias personales durante una ruta</li>
              <li>Los actos u omisiones de proveedores externos (alojamiento, transporte) cuando actuamos como intermediarios y no como prestadores principales</li>
              <li>Los gastos en que incurras como consecuencia de la cancelación o modificación de una ruta (vuelos, hoteles, tasas de visado, etc.)</li>
              <li>La exactitud de las noticias o contenidos de viaje procedentes de fuentes RSS de terceros</li>
            </ul>
            <p>
              Nuestra responsabilidad máxima frente a ti queda limitada, en cualquier circunstancia, al precio total
              pagado por tu ruta. Nada de lo dispuesto en estas condiciones excluye la responsabilidad que no pueda
              excluirse conforme a la legislación marroquí aplicable.
            </p>
          </>
        ),
      },
      {
        id: "photography",
        title: "Fotografía y medios",
        body: (
          <>
            <p>
              Nuestros guías pueden fotografiar o filmar las actividades de la ruta. Cuando seas identificable en una
              imagen, te pediremos permiso antes de publicarla en nuestro sitio o en redes sociales, y puedes negarte
              sin dar explicaciones. También puedes decirle a tu guía en cualquier momento de la ruta que prefieres no
              ser fotografiado.
            </p>
            <p>
              Si cambias de opinión después de haber dado tu permiso, escríbenos a {mail} y retiraremos la imagen de
              nuestros propios canales. Las imágenes ya compartidas o republicadas por terceros pueden quedar fuera de
              nuestro control.
            </p>
          </>
        ),
      },
      {
        id: "ip",
        title: "Propiedad intelectual",
        body: (
          <p>
            Los textos, el diseño y el código de este sitio son propiedad de Marrakech Eco Tours. No puedes
            reproducirlos, distribuirlos ni utilizarlos sin nuestro permiso expreso por escrito. Algunas fotografías
            se usan con licencia de bancos de imágenes y siguen siendo propiedad de sus fotógrafos según esas
            licencias. Los artículos de la página de Noticias proceden de fuentes de terceros y siguen siendo
            propiedad de sus editores.
          </p>
        ),
      },
      {
        id: "complaints",
        title: "Reclamaciones",
        body: (
          <p>
            Si tienes una reclamación durante la ruta, comunícasela de inmediato a tu guía para que podamos
            resolverla en el momento. Si no se resuelve, envía una reclamación por escrito a {mail} en un plazo de 28
            días desde el final de tu ruta. Acusaremos recibo en 5 días hábiles y responderemos de forma completa en
            14 días.
          </p>
        ),
      },
      {
        id: "governing-law",
        title: "Legislación aplicable",
        body: (
          <>
            <p>
              Estos Términos y condiciones se rigen por las leyes del Reino de Marruecos, y las controversias quedan
              sometidas a la jurisdicción de los tribunales de Marrakech.
            </p>
            <p>
              Si eres un consumidor residente en la Unión Europea o en el Reino Unido, esto no te priva de la
              protección de las disposiciones imperativas de la normativa de consumo de tu país de residencia, y
              conservas cualquier derecho que tengas a acudir a los tribunales de tu país.
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Cambios en estas condiciones",
        body: (
          <p>
            Podemos actualizar estas condiciones periódicamente. La fecha que figura al principio de esta página
            indica la última revisión. El uso continuado del sitio, o cualquier reserva realizada después de una
            revisión, implica la aceptación de las condiciones actualizadas.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Con quién contratas",
        body: (
          <>
            <p>
              Las rutas reservadas a través de este sitio las organiza <strong>Marrakech Eco Tours</strong>, operador
              turístico con sede en {SITE.address}, en activo desde {SITE.foundedYear}.
            </p>
            <p>
              Correo {mail} · Teléfono <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>
            </p>
            <p>
              Puedes enviar tus preguntas sobre estas condiciones, o sobre una reserva ya realizada, por cualquiera de
              estas vías. Respondemos en menos de una hora (de 8:00 a 20:00, hora de Marruecos).
            </p>
          </>
        ),
      },
    ],
  };
}
