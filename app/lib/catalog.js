/* ============================================================
   Catalog derivations
   ------------------------------------------------------------
   Pure read helpers over the same static PROVIDERS array the
   directory renders. Nothing here holds its own copy of a number
   a visitor could later check against the listing — the "from
   ₹X", the provider counts and the city coverage are all computed
   off the one dataset, so the marketing pages and the directory
   can never quote each other different figures.

   Money is in RUPEES, matching data.js. These are the provider's
   own day rates, not the price a client pays (platform fee and GST
   land on the booking screen), so every surface that prints a
   figure from here also carries "from" and "/ day".
   ============================================================ */

import {
  CATEGORY_LABEL,
  CATEGORY_PLURAL,
  FILTER_CITIES,
  PROVIDERS,
  queryProviders,
} from '@/app/security-providers/data';

/**
 * Lowest day rate among providers offering a category, optionally within a city.
 * Returns null when nothing matches, so callers can hide the "from" line rather
 * than print a stray dash.
 */
export function minRate(category, city) {
  const rates = PROVIDERS.filter(
    (p) => p.categories.includes(category) && (!city || p.cities.includes(city)),
  ).map((p) => p.dailyRate);
  return rates.length ? Math.min(...rates) : null;
}

/** Lowest day rate on the whole platform — the single "from ₹X" the hero uses. */
export function minRateOverall() {
  return Math.min(...PROVIDERS.map((p) => p.dailyRate));
}

/** How many listed providers match a filter. Same query the directory runs. */
export function providerCount(filter = {}) {
  return queryProviders({ ...filter, page: 1 }).total;
}

/** The first N providers of a filter in the directory's own relevance order. */
export function topProviders(filter = {}, n = 4) {
  return queryProviders({ ...filter, page: 1 }).providers.slice(0, n);
}

/** Cities that actually have a provider covering them, largest coverage first. */
export function citiesByCoverage() {
  return FILTER_CITIES.map((city) => ({ city, count: providerCount({ city }) }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}

/** Which categories have at least one provider in a given city. */
export function categoriesInCity(city) {
  return ['guard', 'bouncer', 'gunman', 'pso'].filter(
    (category) => providerCount({ category, city }) > 0,
  );
}

/** Distinct cities touched by the whole roster — the "N cities" coverage figure. */
export function cityCoverageCount() {
  const set = new Set();
  PROVIDERS.forEach((p) => p.cities.forEach((c) => set.add(c)));
  return set.size;
}

export { CATEGORY_LABEL, CATEGORY_PLURAL };
