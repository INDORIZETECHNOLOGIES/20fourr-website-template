import {
  CATEGORY_ORDER,
  FILTER_CITIES,
  PROVIDERS,
  queryProviders,
} from './security-providers/data';

const BASE = 'https://20fourr.com';

/**
 * Must stay byte-identical to canonicalFor() in security-providers/page.js — a
 * sitemap URL that differs from the page's own canonical is a URL we are asking
 * Google to crawl and then told it to ignore. Same reason sortBy is absent here.
 */
function listingUrl({ category, city, page = 1 }) {
  const q = new URLSearchParams();
  if (category) q.set('category', category);
  if (city) q.set('city', city);
  if (page > 1) q.set('page', String(page));
  const s = q.toString();
  // Next writes <loc> verbatim — it does not escape XML entities — so a raw "&"
  // between two params makes the whole document fail to parse and Google
  // rejects every URL in it, not just the offending one. Escaping here is the
  // only place it can happen. "&amp;" is what a parser turns back into "&", so
  // the URL a crawler fetches still matches the page's canonical exactly.
  const query = s ? `?${s.replace(/&/g, '&amp;')}` : '';
  return `${BASE}/security-providers${query}`;
}

/**
 * Every page of a filter view, but only for filters that actually match
 * providers. An empty combination (say, gunmen in Dehradun) renders a real page
 * with nothing on it; submitting those is how a small site earns a "crawled —
 * currently not indexed" pile in Search Console.
 */
function listingEntries(filter, priority) {
  const { total, pages } = queryProviders({ ...filter, page: 1 });
  if (total === 0) return [];

  return Array.from({ length: pages }, (_, i) => ({
    url: listingUrl({ ...filter, page: i + 1 }),
    changeFrequency: 'weekly',
    // Deeper pages of the same filter are worth less than its first page.
    priority: i === 0 ? priority : Math.max(0.3, priority - 0.2),
  }));
}

export default function sitemap() {
  // Static marketing site: this runs once, at build time. Redeploying is what
  // refreshes lastModified, which is exactly what it should mean.
  const lastModified = new Date();

  const entries = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/join`, changeFrequency: 'monthly', priority: 0.8 },

    ...listingEntries({}, 0.9),
    ...CATEGORY_ORDER.flatMap((category) => listingEntries({ category }, 0.8)),
    ...FILTER_CITIES.flatMap((city) => listingEntries({ city }, 0.8)),

    // Category × city is the long tail people actually search for
    // ("bouncer in Mumbai"), so it is worth listing every combination that
    // has providers behind it.
    ...CATEGORY_ORDER.flatMap((category) =>
      FILTER_CITIES.flatMap((city) => listingEntries({ category, city }, 0.7))
    ),

    ...PROVIDERS.map((p) => ({
      url: `${BASE}/security-providers/${p.id}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];

  return entries.map((e) => ({ lastModified, ...e }));
}
