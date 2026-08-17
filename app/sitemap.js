import {
  CATEGORY_ORDER,
  FILTER_CITIES,
  PROVIDERS,
  queryProviders,
} from './security-providers/data';
import { SITE_URL } from './site';

const BASE = SITE_URL;

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
 * A filter view is only worth submitting once it holds enough distinct
 * providers to be a page in its own right. Below this, the view is a near-
 * duplicate of the broader category page and of the providers' own pages — a
 * "bouncer in Indore" listing that is really a doorway to one provider. Those
 * are exactly the URLs Search Console reports as "Discovered — currently not
 * indexed": Google finds them in the sitemap and declines to spend an index
 * slot on them. Raise this as inventory grows; lower it toward 1 to submit
 * more of the long tail once the domain has the authority to get it indexed.
 */
const MIN_PROVIDERS_FOR_LISTING = 3;

/**
 * At most one entry per filter — page 1. An empty or thin combination (say,
 * gunmen in Dehradun) still renders a real page, but submitting it is how a
 * small site earns that not-indexed pile. Deeper pages of a filter are near-
 * duplicates of one another and the thinnest thing we could submit; they stay
 * crawlable through the on-page pagination links, they just don't belong in the
 * sitemap.
 */
function listingEntry(filter, priority) {
  const { total } = queryProviders({ ...filter, page: 1 });
  if (total < MIN_PROVIDERS_FOR_LISTING) return [];

  return [
    {
      url: listingUrl({ ...filter, page: 1 }),
      changeFrequency: 'weekly',
      priority,
    },
  ];
}

export default function sitemap() {
  // Static marketing site: this runs once, at build time. Redeploying is what
  // refreshes lastModified, which is exactly what it should mean.
  const lastModified = new Date();

  const entries = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/join`, changeFrequency: 'monthly', priority: 0.8 },
    // The Hindi provider page is its own URL, so it is its own sitemap entry.
    // Same priority as the English one — it is the same page, not a lesser
    // version of it, and for a large part of this audience it is the primary.
    { url: `${BASE}/join/hi`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faqs`, changeFrequency: 'monthly', priority: 0.7 },

    ...listingEntry({}, 0.9),
    ...CATEGORY_ORDER.flatMap((category) => listingEntry({ category }, 0.8)),
    ...FILTER_CITIES.flatMap((city) => listingEntry({ city }, 0.8)),

    // Category × city is the long tail people actually search for
    // ("bouncer in Mumbai"), so it is worth listing every combination that
    // clears the threshold above — the ones thin enough to go unindexed are
    // held back until they have the providers to earn the slot.
    ...CATEGORY_ORDER.flatMap((category) =>
      FILTER_CITIES.flatMap((city) => listingEntry({ category, city }, 0.7))
    ),

    ...PROVIDERS.map((p) => ({
      url: `${BASE}/security-providers/${p.id}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ];

  return entries.map((e) => ({ lastModified, ...e }));
}
