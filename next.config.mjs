// Cloudflare (the CDN in front of this site) injects its own RUM/analytics
// beacon into the response — script-src and connect-src have to allow it or
// the browser silently blocks Cloudflare's own beacon via CSP.
const CLOUDFLARE_BEACON = 'static.cloudflareinsights.com';

// Next.js's App Router bootstraps hydration with inline <script> tags carrying
// the RSC payload (`self.__next_f.push(...)`) — there's no static site-wide
// nonce to allow just those without 'unsafe-inline', short of wiring up
// middleware-based per-request nonces (a bigger change than this pass).
// 'unsafe-inline' is the practical baseline every default-config Next.js app
// ships with; it's still a real improvement over no CSP at all (locks down
// object-src, frame-ancestors, base-uri, and every other origin).
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLOUDFLARE_BEACON}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${CLOUDFLARE_BEACON}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Marketing pages are fully static — city and service pages added later
  // will be generated at build time by generateStaticParams().
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
