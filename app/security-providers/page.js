import Link from 'next/link';
import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import Filters from './Filters';
import Pager from './Pager';
import ProviderCard from './ProviderCard';
import { CATEGORY_LABEL, CATEGORY_PLURAL, parseSearchParams, queryProviders } from './data';

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
  const { category, city, page } = view;

  const what = category ? CATEGORY_PLURAL[category] : 'security providers';
  const where = city ? `in ${city}` : 'across India';
  const suffix = page > 1 ? ` — page ${page}` : '';

  return {
    title: `Verified ${what} ${where}${suffix}`,
    description: city
      ? `Hire PSARA-verified ${what} in ${city}. Compare day rates, check verification badges and price a specific date range — no account, no phone number, no sales call.`
      : `Browse PSARA-verified ${what} by service and city across India. Compare day rates and price a specific date range — no account, no phone number, no sales call.`,
    alternates: { canonical: canonicalFor(view) },
    openGraph: {
      title: `Verified ${what} ${where}`,
      description: `PSARA-licensed, identity-checked providers. Compare day rates by service and city.`,
    },
  };
}

export default async function ProvidersPage({ searchParams }) {
  const view = parseSearchParams(await searchParams);
  const { category, city, sortBy } = view;
  const { providers, total, page, pages } = queryProviders(view);

  const countLine = `${total} verified provider${total === 1 ? '' : 's'}${
    category ? ` offering ${CATEGORY_LABEL[category]}` : ''
  }${city ? ` operating in ${city}` : ''}`;

  return (
    <>
      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">Providers</p>
            {/* The H1 tracks the filters for the same reason the <title> does: on
                ?city=Dehradun the page really is about Dehradun, and a generic
                "across India" heading contradicts both the title and the results. */}
            <h1>
              Verified <em>{category ? CATEGORY_PLURAL[category] : 'security providers'}</em>{' '}
              {city ? `in ${city}` : 'across India'}
            </h1>
            <p className="lede">
              Every provider listed here has had their identity and PSARA licence checked by our
              compliance team before appearing. Filter by service and city, compare day rates, and
              price a specific date range &mdash; no account, no phone number, no sales call.
            </p>
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
          <p className="count">{countLine}</p>

          {providers.length === 0 ? (
            <p className="empty-state">
              <b>No verified providers match those filters yet.</b> Coverage expands as agencies
              clear verification &mdash; try a different city or service, or tell us what you need
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
            name and contact details are released to you once a booking is confirmed &mdash; that is
            deliberate, so pricing stays comparable and nobody gets pulled into an off-platform
            negotiation before anything is on record.
          </p>
        </div>
      </section>

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
        </div>
      </section>
    </>
  );
}
