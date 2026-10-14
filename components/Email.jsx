/**
 * An email address Cloudflare leaves alone.
 *
 * 20fourr.com sits behind Cloudflare with Email Address Obfuscation on, which
 * rewrites every address in the HTML into a link to /cdn-cgi/l/email-protection
 * and injects a render-blocking decoder script. Crawlers don't run the decoder,
 * so to them every page carrying the address links to a 404 — Semrush counted
 * 55 broken internal links from this one address. Cloudflare skips anything
 * between <!--email_off--> markers, and React can only emit comments through
 * raw HTML, hence dangerouslySetInnerHTML. The address is a fixed string from
 * our own code, never user input.
 */
export default function Email({ address = 'privacy@20fourr.com', link = false }) {
  const inner = link ? `<a href="mailto:${address}">${address}</a>` : address;
  return <span dangerouslySetInnerHTML={{ __html: `<!--email_off-->${inner}<!--/email_off-->` }} />;
}
