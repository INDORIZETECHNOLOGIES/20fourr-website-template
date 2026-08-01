/**
 * Cloudflare sits in front of Netlify and injects a managed robots.txt when the
 * origin serves none — which is why the live file today is a wall of
 * content-signal comments with no User-agent line and, more to the point, no
 * Sitemap. Serving our own from the origin gives crawlers something to act on;
 * Cloudflare appends its signal block to it rather than replacing it.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Sorting re-orders an identical result set. The listing page already
        // canonicalises sortBy away, but keeping crawlers off those URLs saves
        // the budget for pages that hold different providers.
        disallow: ['/*?*sortBy='],
      },
    ],
    sitemap: 'https://20fourr.com/sitemap.xml',
    host: 'https://20fourr.com',
  };
}
