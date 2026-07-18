/**
 * Renders a JSON-LD script tag.
 *
 * The `<` escape is a real XSS mitigation, not decoration: without it a string
 * inside the data could close the script tag early. Centralising it here means
 * no call site can forget it.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
