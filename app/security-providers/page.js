import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import CityGuide from './CityGuide';
import { CITY_GUIDES, cityGuideFor } from './cityGuides';
import Filters from './Filters';
import Pager from './Pager';
import ProviderCard from './ProviderCard';
import { CLIENT_APP_URL, OG_BASE } from '@/app/site';
import { listingJsonLd } from './schema';
import {
  CATEGORY_LABEL,
  CATEGORY_PLURAL,
  CATEGORY_SERVICE_PHRASE,
  PAGE_SIZE,
  cityLabel,
  listingHeading,
  parseSearchParams,
  queryProviders,
} from './data';

/**
 * The provider dataset is a static array (data.js) that only changes on
 * redeploy, but this route reads `searchParams`, which by default makes every
 * request a fresh, uncached render — measured at 719ms-1.0s TTFB on faceted
 * URLs vs. 116-254ms on the fully static pages. ISR caches each distinct
 * query-string combination for an hour; a new deploy still invalidates the
 * cache immediately, so this never serves stale data past the next release.
 */
export const revalidate = 3600;

const GUIDED_CITIES = Object.keys(CITY_GUIDES);

/**
 * Canonical for a filtered view. `sortBy` is excluded on purpose: it re-orders an
 * identical result set, so every sort of the same filter is one page as far as search
 * engines are concerned. Category, city and page each change *which* providers appear,
 * so they stay — a paginated page that canonicalises to page 1 tells Google the deeper
 * results do not exist.
 */
function canonicalFor({ category, city, page }) {
  const q = new URLSearchParams();
  if (category) q.set('category', category);
  if (city) q.set('city', city);
  if (page > 1) q.set('page', String(page));
  const s = q.toString();
  return `/security-providers${s ? `?${s}` : ''}`;
}

export async function generateMetadata({ searchParams }) {
  const view = parseSearchParams(await searchParams);
  if (view.unknownCity) notFound();
  const { category, city } = view;
  // The page actually shown: ?page=99 on a two-page filter renders page 2, so it
  // canonicalises to page 2 rather than minting a duplicate URL for it.
  const { total, page } = queryProviders(view);

  // The <title>/H1 use buyer-facing service phrasing (see listingHeading in data.js):
  // the plain "{category} in {city}" form this replaced reads like a job
  // posting to both searchers and Google. The meta description keeps the
  // "hire {category-plural} in {city}" verb-phrase form — that one already
  // matches buyer intent.
  const { what: serviceWhat, where } = listingHeading(view);
  const hireWhat = category ? CATEGORY_PLURAL[category] : 'security agencies, companies and guards';
  const suffix = page > 1 ? `, page ${page}` : '';
  // Page 2+ needs its own description too: Semrush flagged ?category=bouncer and
  // its page 2 as duplicate meta descriptions when only the title changed.
  const pagePrefix = page > 1 ? `Page ${page}. ` : '';

  return {
    title: `${serviceWhat} ${where}${suffix}`,
    description: city
      ? `${pagePrefix}Hire PSARA-verified ${hireWhat} in ${cityLabel(city)}. Compare day rates, check verification badges and price a specific date range with no account, phone number or sales call.`
      : `${pagePrefix}Browse PSARA-verified ${hireWhat} by service and city across India. Compare day rates and price a specific date range with no account, phone number or sales call.`,
    alternates: { canonical: canonicalFor({ ...view, page }) },
    // A filter with no providers still renders, with a
    // "can't see your city" prompt, but an empty listing is not a page to index.
    ...(total === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      ...OG_BASE,
      title: `${serviceWhat} ${where}`,
      description: `PSARA-licensed, identity-checked providers. Compare day rates by service and city.`,
    },
  };
}

export default async function ProvidersPage({ searchParams }) {
  const view = parseSearchParams(await searchParams);
  if (view.unknownCity) notFound();
  const { category, city, sortBy } = view;
  const { providers, total, page, pages } = queryProviders(view);
  const heading = listingHeading(view);
  const otherCities = GUIDED_CITIES.filter(
    (c) => c !== city && (!category || queryProviders({ category, city: c }).total > 0),
  );
  const otherCitiesHeading = category
    ? `${CATEGORY_SERVICE_PHRASE[category]} in ${city ? 'other cities' : 'each city'}`
    : city
      ? 'Security services in other cities'
      : 'Security services by city';

  const countLine = `${total} example listing${total === 1 ? '' : 's'}${
    category ? ` offering ${CATEGORY_LABEL[category]}` : ''
  }${city ? ` operating in ${city}` : ''}`;

  // The guide belongs to the city, not to a filtered or paginated slice of it.
  const guide = !category && page === 1 ? cityGuideFor(city) : undefined;

  return (
    <>
      {/* Built from the same canonicalFor() the metadata uses, so the graph's @id
          and the page's canonical can never drift apart. */}
      <JsonLd
        data={listingJsonLd({
          providers,
          category,
          city,
          page,
          pageSize: PAGE_SIZE,
          canonical: canonicalFor({ ...view, page }),
          faqs: guide?.faqs,
        })}
      />

      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">Providers</p>
            {/* The H1 tracks the filters for the same reason the <title> does: on
                ?city=Dehradun the page really is about Dehradun, and a generic
                "across India" heading contradicts both the title and the results.
                Worded by listingHeading() in data.js, the same as the <title>. */}
            <h1>
              <em>{heading.what}</em> {heading.where}
            </h1>
            <p className="lede">
              Every provider on 20fourr has had their identity and PSARA licence checked by our
              compliance team before appearing. Filter by service and city, compare day rates, and
              price a specific date range with no account, phone number or sales call.
            </p>
            {/* The directory is sample data until the platform exports real listings
                (see RATINGS_ARE_REAL in schema.js), so say so where it is read. */}
            <div className="callout">
              <p>
                <b>Example listings.</b> The providers below show how the directory works. Their
                names, ratings and rates are samples, not live providers. To see and book verified
                providers near you,{' '}
                <a href={CLIENT_APP_URL} target="_blank" rel="noopener noreferrer">
                  open the client app
                </a>
                .
              </p>
            </div>
          </Reveal>

          {/* Filters read the query string, so they have to sit behind a Suspense
              boundary or the whole route opts out of static rendering. */}
          <Suspense fallback={<div className="filters" />}>
            <Filters />
          </Suspense>
        </div>
      </header>

      {/* ---------- listing ---------- */}
      <section className="band band--ink-2" id="providers-list">
        <div className="wrap">
          {/* The cards are h3s; without an h2 above them the outline jumps from the
              page's h1 straight to h3. The count line already says it visually. */}
          <h2 className="visually-hidden">Listings{city ? ` in ${city}` : ''}</h2>
          <p className="count">{countLine}</p>

          {providers.length === 0 ? (
            <p className="empty-state">
              <b>No verified providers match those filters yet.</b> Coverage expands as agencies
              clear verification. Try a different city or service, or tell us what you need
              and we will place it with a PSARA-licensed provider near you.
            </p>
          ) : (
            <>
              <div className="pgrid">
                {providers.map((p) => (
                  <ProviderCard key={p.id} provider={p} selectedCity={city} />
                ))}
              </div>
              <Pager page={page} pages={pages} params={{ category, city, sortBy }} />
            </>
          )}

          <p className="coverage-note">
            A provider that lists more than one city appears under each of them, as long as a
            current PSARA licence covers that state. Agencies are listed as{' '}
            <b>Security agency in {'{city}'}</b> with their rating and day rate. The agency&rsquo;s
            name and contact details are released to you once a booking is confirmed. That is
            deliberate, so pricing stays comparable and nobody gets pulled into an off-platform
            negotiation before anything is on record.
          </p>
        </div>
      </section>

      {guide && <CityGuide city={city} guide={guide} />}

      {/* ---------- cta ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="stack g-20 cta-city">
            <h2>
              Can&rsquo;t see your city <em>yet</em>?
            </h2>
            <p className="lede">
              Coverage expands as verified agencies join. Tell us what you need and we will place it
              with a PSARA-licensed provider near you.
            </p>
            <div>
              <Link className="btn btn--primary" href="/#how">
                See how it works
              </Link>
            </div>
          </Reveal>

          {/* The filters are <select>s, which crawlers don't follow, so a city
              outside a same-state pair (Bengaluru, Hyderabad, Chennai...) was
              linked from the homepage and nowhere else. Every directory view now
              links every guided city. A service view links the same service in
              the other cities instead: those pages ("gunmen in Hyderabad") earn
              most of the site's clicks, and the city guide alone gave each one
              link (Semrush, 14 Oct 2026). Only cities with listings, so no link
              lands on an empty, noindex filter. */}
          <div className="subhead">
            <h3>{otherCitiesHeading}</h3>
          </div>
          <div className="city-links">
            {otherCities.map((c) => (
              <Link
                className="city-link"
                href={`/security-providers?${category ? `category=${category}&` : ''}city=${encodeURIComponent(c)}`}
                key={c}
              >
                {category ? CATEGORY_SERVICE_PHRASE[category] : 'Security services'} in {c}{' '}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
