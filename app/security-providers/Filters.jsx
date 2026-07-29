'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { CATEGORY_LABEL, CATEGORY_ORDER, FILTER_CITIES, SORT_OPTIONS } from './data';

/**
 * Filters live in the URL rather than in component state, so a filtered listing is
 * shareable, bookmarkable, and survives a back-navigation from a provider page.
 */
export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const setParam = (key, value) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    // Any filter change invalidates the current page number.
    next.delete('page');
    startTransition(() => router.push(`${pathname}?${next}`, { scroll: false }));
  };

  return (
    <div className="filters" aria-busy={pending}>
      <div className="filters__f">
        <label htmlFor="fService">Service</label>
        <select
          id="fService"
          value={params.get('category') ?? 'all'}
          onChange={(e) => setParam('category', e.target.value)}
        >
          <option value="all">All services</option>
          {CATEGORY_ORDER.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__f">
        <label htmlFor="fCity">City</label>
        <select
          id="fCity"
          value={params.get('city') ?? 'all'}
          onChange={(e) => setParam('city', e.target.value)}
        >
          <option value="all">All cities</option>
          {FILTER_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__f">
        <label htmlFor="fSort">Sort by</label>
        <select
          id="fSort"
          value={params.get('sortBy') ?? 'relevance'}
          onChange={(e) => setParam('sortBy', e.target.value)}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
