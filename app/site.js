/**
 * Single source of truth for the production origin and the stable @id values
 * that JSON-LD nodes point at.
 *
 * Canonicals, the sitemap and every structured-data @id have to agree on this
 * string exactly. A trailing slash or a www/bare mismatch between two of them is
 * enough for Google to treat one page as two entities, which is the failure mode
 * this file exists to prevent.
 */
export const SITE_URL = 'https://20fourr.com';

/** The company node, declared once in the root layout and referenced elsewhere. */
export const ORG_ID = `${SITE_URL}/#organization`;

/** Registered entity behind the product. */
export const LEGAL_NAME = 'Indorize Technologies Pvt. Ltd.';

/**
 * The two shipping web apps, on their own subdomains.
 *
 * Declared here rather than inline because they are the site's only outbound
 * product links and they appear in four places — the home CTA, both join CTAs
 * and the footer. The iPhone apps are still in App Store review, so the web
 * apps stay the universal "get the app" target; the Play links sit beside them.
 */
export const CLIENT_APP_URL = 'https://client.20fourr.com';
export const PROVIDER_APP_URL = 'https://provider.20fourr.com';

/** Android listings on Google Play. */
export const CLIENT_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.twentyfourr.client';
export const PROVIDER_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.secureconnect.provider';

/* The public contact address: the same one on both Play Store listings and on
   every directory listing (Google, Justdial, Sulekha, IndiaMART). Name, phone
   and email have to match everywhere they appear, or directories and Google
   treat the listings as different businesses. privacy@ stays on the privacy
   and legal pages, where it is the address for data requests. */
export const SUPPORT_EMAIL = 'support@20fourr.com';

/* The Google Business Profile (live 14 Oct 2026), by its Maps CID and place ID
   so the links survive a rename. GOOGLE_REVIEW_URL opens the review form
   directly (Google asks the reviewer to sign in first). */
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=3423478342846877344';
export const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJW1eRZRgpCTkRoI6hGWqjgi8';

/* The brand's own profiles, as clean URLs: no share, session or tracking
   parameters (the share links the platforms hand out carry them). The footer
   icons and the schema's sameAs both read these. LinkedIn is a showcase page,
   not a company page. Reddit is a personal account, so it gets a footer icon
   but stays out of the schema. */
export const X_URL = 'https://x.com/20_fourr';
export const INSTAGRAM_URL = 'https://www.instagram.com/20_fourr';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61592917686310';
export const LINKEDIN_URL = 'https://www.linkedin.com/showcase/20-fourr/';
export const REDDIT_URL = 'https://www.reddit.com/user/ArpitRautela01/';

/**
 * Company WhatsApp, used for provider onboarding on /join and listed on
 * /support. WHATSAPP_URL is the bare wa.me link; callers append ?text= when
 * they want to prefill a message.
 */
export const WHATSAPP_DISPLAY = '+91 92595 77593';
export const WHATSAPP_URL = 'https://wa.me/919259577593';
/** The same number in E.164, for structured data. */
export const WHATSAPP_TELEPHONE = '+919259577593';

/**
 * Open Graph fields every page shares. Next replaces, not merges, a page's
 * `openGraph` object with the layout's, so a page that sets its own title
 * would otherwise ship with no image, type or site name. Spread this first:
 * `openGraph: { ...OG_BASE, title, description }`.
 */
export const OG_BASE = {
  type: 'website',
  locale: 'en_IN',
  siteName: '20fourr',
  images: [
    {
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: '20fourr: Verified security, dispatched on demand. Guards, bouncers, armed guards and PSOs across India.',
    },
  ],
};
