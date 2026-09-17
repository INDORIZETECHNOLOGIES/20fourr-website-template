import { IBM_Plex_Sans_Devanagari } from 'next/font/google';

/**
 * The display face has no Devanagari, and Plex does — metrically related to the
 * body face, so Hindi copy never falls back to a broken stack.
 *
 * Scoped to this one nested layout (not app/layout.js) so only this route's
 * request preloads it. It used to live in the root layout, which meant every
 * English-language page on the site — every provider profile, every city/
 * category facet, the homepage — downloaded and preloaded 3 unused Devanagari
 * weights too.
 */
const deva = IBM_Plex_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-deva',
  display: 'swap',
});

export default function JoinHindiLayout({ children }) {
  return <div className={deva.variable}>{children}</div>;
}
