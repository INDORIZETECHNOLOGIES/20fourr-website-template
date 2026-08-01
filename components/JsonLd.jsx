/**
 * One place that serialises structured data into the document.
 *
 * The payload is always built server-side from our own data, never from user
 * input, which is what makes dangerouslySetInnerHTML the right tool here: JSON-LD
 * has to reach the page as raw text, and React's normal escaping would turn the
 * quotes into entities and hand crawlers an unparseable block.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
