import './globals.css';
import { Big_Shoulders, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { LEGAL_NAME, ORG_ID, SITE_URL } from './site';

/* Self-hosted at build time by next/font — no third-party request at runtime,
   and no layout shift, which a <link> to fonts.googleapis.com cannot promise.
   Google folded "Big Shoulders Display" into "Big Shoulders" with an optical-size
   axis; opsz is what makes it behave at both headline and card-title size. */
const display = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
  // adjustFontFallback: true was tried here (per a CLS finding: div.hero__glow
  // shifts ~0.169 on the homepage when this font swaps in) but Next.js's
  // automatic metric calculation fails for this specific variable font/axis
  // combination ("Failed to find font override values for font `Big
  // Shoulders`" at build time) — it silently produces no adjustment at all, so
  // flipping this to true doesn't fix the CLS issue, it just fails quietly.
  // Fixing this for real needs next/font/local with hand-measured
  // ascentOverride/descentOverride/lineGapOverride against the actual font
  // file, which needs visual verification this pass didn't include — flagging
  // for a follow-up rather than shipping a fallback change that doesn't work.
  adjustFontFallback: false,
  fallback: ['Arial Narrow', 'Helvetica Neue', 'sans-serif'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// The Devanagari face is loaded only in app/join/hi/layout.js — it's needed on
// that one route, and every other page (including all provider/facet pages)
// used to preload it too when it lived here, which was ~100-150KB of dead
// weight on every English-language request.

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '20fourr — Verified security, dispatched on demand',
    template: '%s | 20fourr',
  },
  description:
    'Book a PSARA-licensed security guard, bouncer, armed gunman or personal security officer from your phone. Every duty is verified with a code, and every booking comes with an itemised GST invoice.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: '20fourr',
    title: '20fourr — Verified security, dispatched on demand',
    description:
      'Licensed guards, bouncers, armed protection and PSOs. Duty proven with a code. Payment released against verified attendance.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

// One fixed scheme — the page ground is ink in every context, so the browser
// chrome matches it regardless of the visitor's OS preference.
export const viewport = {
  themeColor: '#12181B',
  colorScheme: 'dark',
};

/* Organization is what lets Google attach the name, logo and site to one entity
   instead of inferring three. Only claims that are true on the page are here —
   no address, no phone, no ratings, because unverifiable markup is the kind that
   gets a site a manual action rather than a rich result.

   20fourr is the product; Indorse Technologies Pvt. Ltd. is the company that
   builds it. Stating the parent explicitly is what keeps searches for either
   name resolving to the same entity instead of two disconnected ones. */
const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: '20fourr',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  description:
    'On-demand booking for PSARA-licensed security guards, bouncers, armed gunmen and personal security officers across India.',
  areaServed: { '@type': 'Country', name: 'India' },
  parentOrganization: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#parent-organization`,
    name: LEGAL_NAME,
    legalName: LEGAL_NAME,
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  },
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: '20fourr',
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

