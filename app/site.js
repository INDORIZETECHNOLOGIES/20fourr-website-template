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
