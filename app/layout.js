import './globals.css';
import {
  Big_Shoulders,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Devanagari,
} from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* Self-hosted at build time by next/font — no third-party request at runtime,
   and no layout shift, which a <link> to fonts.googleapis.com cannot promise.
   Google folded "Big Shoulders Display" into "Big Shoulders" with an optical-size
   axis; opsz is what makes it behave at both headline and card-title size. */
const display = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
  // No published fallback metrics for this family; pick a condensed stand-in
  // ourselves rather than let it swap against a normal-width grotesque.
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

// The display face has no Devanagari. Plex does, and it is metrically related
// to the body face, so Hindi on /join never falls back to a broken stack.
const deva = IBM_Plex_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-deva',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://secureconnect.in'),
  title: {
    default: 'SecureConnect — Verified security, dispatched on demand',
    template: '%s | SecureConnect',
  },
  description:
    'Book a PSARA-licensed security guard, bouncer, armed gunman or personal security officer from your phone. Every duty is verified with a code, and every booking comes with an itemised GST invoice.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SecureConnect',
    title: 'SecureConnect — Verified security, dispatched on demand',
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${mono.variable} ${deva.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

