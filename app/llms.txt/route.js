import { CITY_GUIDES } from '../security-providers/cityGuides';
import { CLIENT_APP_URL, LEGAL_NAME, SITE_URL } from '../site';

/**
 * /llms.txt — a plain-text map of the site for AI assistants (llmstxt.org).
 * Google ignores it; ChatGPT, Perplexity and similar tools may read it. Every
 * line repeats a claim the pages themselves make, and the city list comes from
 * CITY_GUIDES so a new guide shows up here on the next deploy. No counts, no
 * ratings: the directory is still sample data.
 */
export const dynamic = 'force-static';

export function GET() {
  const cities = Object.keys(CITY_GUIDES)
    .map(
      (city) =>
        `- [Security services in ${city}](${SITE_URL}/security-providers?city=${encodeURIComponent(city)}): which licence applies in ${CITY_GUIDES[city].state}, the state's PSARA rules, and common hiring questions`,
    )
    .join('\n');

  const body = `# 20fourr

> On-demand booking for PSARA-licensed security guards, bouncers, armed gunmen and personal security officers across India. Every duty is verified with a code, and every booking comes with an itemised GST invoice.

20fourr is built by ${LEGAL_NAME} Bookings are made in the 20fourr client app (${CLIENT_APP_URL}). Providers on the public directory are example listings that show how the directory works; their names, ratings and rates are samples, not live providers.

## Key pages

- [Home](${SITE_URL}/): how booking, verification and duty codes work
- [Security providers](${SITE_URL}/security-providers): the directory, filterable by service (guards, bouncers, gunmen, PSOs) and city
- [FAQs](${SITE_URL}/faqs): PSARA verification, what a badge proves, GST-inclusive pricing, cancellations, what happens on duty
- [Support](${SITE_URL}/support): contact, booking issues, account deletion

## City hiring guides

${cities}

## Optional

- [Work as a provider (Hindi)](${SITE_URL}/join/hi): joining 20fourr as a guard, bouncer, gunman, PSO or agency
- [Privacy policy](${SITE_URL}/privacy)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
