import { ORG_ID, SITE_URL } from '@/app/site';

/* Structured data for the service and city landing pages.

   These mirror the discipline in security-providers/schema.js: the offer states
   a "from" price as a lower bound only, marks VAT as not included (the platform
   fee and GST land on the booking screen), and never emits an aggregateRating —
   the directory's ratings are sample data until the booking platform feeds them,
   so no star markup goes out for a marketplace-level page either. */

const SERVICE_TYPE = {
  guard: 'Security guard service',
  bouncer: 'Crowd control and door supervision',
  gunman: 'Armed security service',
  pso: 'Close protection service',
};

function offerFrom(price, category) {
  if (price == null) return undefined;
  return {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price,
      priceCurrency: 'INR',
      valueAddedTaxIncluded: false,
      unitText: 'day',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'day' },
    },
    category: category,
    seller: { '@id': ORG_ID },
  };
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

function faqNode(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** One service page as a connected graph: the service, its FAQ, its crumb. */
export function serviceJsonLd({ service, canonical, fromPrice }) {
  const url = `${SITE_URL}${canonical}`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `Verified ${service.what} in India`,
      serviceType: SERVICE_TYPE[service.category],
      description: service.lede,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'India' },
      url,
      ...(offerFrom(fromPrice, service.category) ? { offers: offerFrom(fromPrice, service.category) } : {}),
    },
    breadcrumb([
      { name: 'Home', item: SITE_URL },
      { name: 'Services', item: `${SITE_URL}/services` },
      { name: service.title, item: url },
    ]),
  ];
  const faq = faqNode(service.faqs);
  if (faq) graph.push(faq);
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** One city page graph: a place-scoped service collection and its crumb. */
export function cityJsonLd({ city, canonical, fromPrice }) {
  const url = `${SITE_URL}${canonical}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Private security services in ${city}`,
        serviceType: 'Private security service',
        description: `PSARA-verified security guards, bouncers, armed security and personal security officers in ${city}.`,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city, addressCountry: 'IN' },
        url,
        ...(offerFrom(fromPrice, 'Private security') ? { offers: offerFrom(fromPrice, 'Private security') } : {}),
      },
      breadcrumb([
        { name: 'Home', item: SITE_URL },
        { name: 'Cities', item: `${SITE_URL}/cities` },
        { name: city, item: url },
      ]),
    ],
  };
}
