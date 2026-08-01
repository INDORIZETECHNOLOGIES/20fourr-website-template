import { ORG_ID, SITE_URL } from '@/app/site';
import { BADGE_LABEL, CATEGORY_LABEL, CATEGORY_PLURAL, displayName } from './data';

/**
 * Ratings in structured data.
 *
 * Every rating on this site comes out of the hand-compiled array in data.js, not
 * from bookings that happened. Marking those up as `aggregateRating` would put
 * star ratings for named individuals into Google's results on the strength of
 * sample data — which is the definition of the review-spam policy, and the kind
 * of thing that costs a domain its rich results across the board rather than
 * just on the offending page.
 *
 * Flip this to true once the directory is fed by the booking platform and each
 * rating traces to a paid, completed shift. Nothing else has to change.
 */
const RATINGS_ARE_REAL = false;

const CATEGORY_SERVICE_TYPE = {
  guard: 'Security guard service',
  bouncer: 'Crowd control and door supervision',
  gunman: 'Armed security service',
  pso: 'Close protection service',
};

function providerUrl(p) {
  return `${SITE_URL}/security-providers/${p.id}`;
}

function areaServed(p) {
  return p.cities.map((name) => ({ '@type': 'City', name, addressCountry: 'IN' }));
}

/**
 * PSARA and firearms clearances are the load-bearing claims on these pages, so
 * they are the ones worth expressing as credentials rather than leaving as chip
 * text a crawler has to infer meaning from. Only badges the provider actually
 * carries are emitted — the badge list is the same one the page renders.
 */
function credentials(p) {
  const CREDENTIALED = {
    psara_verified: 'PSARA licence, verified against the issuing state authority',
    firearms_authorized: 'Firearm licence, re-checked before every armed assignment',
    verified_identity: 'Government photo ID matched to a live selfie at onboarding',
    background_verified: 'Background verification',
  };

  return p.badges
    .filter((b) => b in CREDENTIALED)
    .map((b) => ({
      '@type': 'EducationalOccupationalCredential',
      name: BADGE_LABEL[b],
      description: CREDENTIALED[b],
      credentialCategory: 'certification',
      recognizedBy: { '@id': ORG_ID },
    }));
}

/**
 * The day rate is what the provider sets, which is *not* what the client pays —
 * the page says so directly, and the platform fee and GST land on the booking
 * screen. `valueAddedTaxIncluded: false` is how that gets stated in a way a
 * crawler can act on, rather than quietly presenting a pre-tax number as final.
 */
function offer(p, category) {
  return {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.dailyRate,
      priceCurrency: 'INR',
      valueAddedTaxIncluded: false,
      unitText: 'day',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'day' },
    },
    eligibleRegion: areaServed(p),
    category: CATEGORY_LABEL[category],
    seller: { '@id': ORG_ID },
  };
}

/**
 * An individual is a Person; an agency is a business. Modelling both as one type
 * would mean either giving a human an address it does not have, or describing a
 * registered firm as a person. Agencies stay anonymised here exactly as they are
 * on the page — the markup must not leak a name the page withholds.
 */
function providerNode(p) {
  const url = providerUrl(p);
  const id = `${url}#provider`;
  const name = displayName(p);

  const shared = {
    '@id': id,
    name,
    url,
    areaServed: areaServed(p),
    hasCredential: credentials(p),
    ...(RATINGS_ARE_REAL && p.ratingCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: p.rating,
            reviewCount: p.ratingCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  if (p.agency) {
    return {
      ...shared,
      '@type': 'ProfessionalService',
      description: `PSARA-licensed security agency operating in ${p.cities.join(', ')}.`,
      address: { '@type': 'PostalAddress', addressLocality: p.city, addressCountry: 'IN' },
      priceRange: '₹₹',
    };
  }

  return {
    ...shared,
    '@type': 'Person',
    jobTitle: CATEGORY_LABEL[p.categories[0]],
    workLocation: { '@type': 'City', name: p.city, addressCountry: 'IN' },
    hasOccupation: p.categories.map((c) => ({
      '@type': 'Occupation',
      name: CATEGORY_LABEL[c],
      occupationLocation: areaServed(p),
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: p.experienceYears * 12,
      },
    })),
  };
}

/** Mirrors the visible "Providers ›" crumb in the page header. */
function breadcrumb(p) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Security providers',
        item: `${SITE_URL}/security-providers`,
      },
      { '@type': 'ListItem', position: 3, name: displayName(p), item: providerUrl(p) },
    ],
  };
}

/** Everything one profile page declares, as a single connected graph. */
export function providerJsonLd(p) {
  const node = providerNode(p);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      node,
      ...p.categories.map((c) => ({
        '@type': 'Service',
        '@id': `${providerUrl(p)}#service-${c}`,
        name: `${CATEGORY_LABEL[c]} in ${p.city}`,
        serviceType: CATEGORY_SERVICE_TYPE[c],
        provider: { '@id': node['@id'] },
        areaServed: areaServed(p),
        offers: offer(p, c),
        isRelatedTo: { '@id': ORG_ID },
      })),
      breadcrumb(p),
    ],
  };
}

/**
 * The directory itself. ItemList is what tells Google these result pages are one
 * ordered set rather than N unrelated pages that happen to share a template —
 * `position` is offset by the page number so page 3 does not claim to start at 1.
 */
export function listingJsonLd({ providers, category, city, page, pageSize, canonical }) {
  const what = category ? CATEGORY_PLURAL[category] : 'security providers';
  const where = city ? `in ${city}` : 'across India';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${canonical}`,
        url: `${SITE_URL}${canonical}`,
        name: `Verified ${what} ${where}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': ORG_ID },
        mainEntity: {
          // No itemListOrder: the indexed order is "Most relevant", which is the
          // array's own order, not an ascending or descending sort on any
          // property. `position` already carries the ranking; claiming a
          // direction on top of it would be claiming something untrue.
          '@type': 'ItemList',
          numberOfItems: providers.length,
          itemListElement: providers.map((p, i) => ({
            '@type': 'ListItem',
            position: (page - 1) * pageSize + i + 1,
            name: displayName(p),
            url: providerUrl(p),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Security providers',
            item: `${SITE_URL}/security-providers`,
          },
        ],
      },
    ],
  };
}
