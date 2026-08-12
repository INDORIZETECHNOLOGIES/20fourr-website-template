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
export const LEGAL_NAME = 'Indorse Technologies Pvt. Ltd.';

/**
 * The two shipping web apps, on their own subdomains.
 *
 * Declared here rather than inline because they are the site's only outbound
 * product links and they appear in four places — the home CTA, both join CTAs
 * and the footer. The native apps are still in App Store and Play review, so
 * these are what every "get the app" control on the site points at; the copy
 * around them says browser, not download, for the same reason.
 */
export const CLIENT_APP_URL = 'https://client.20fourr.com';
export const PROVIDER_APP_URL = 'https://provider.20fourr.com';
