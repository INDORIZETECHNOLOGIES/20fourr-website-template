import Link from 'next/link';
import ProviderCard from '@/app/security-providers/ProviderCard';
import { topProviders } from '@/app/lib/catalog';

/**
 * A live sample of the actual product: the same ProviderCard the directory
 * renders, pulled straight from the listing so what a visitor sees here is
 * exactly what they click into — real names, real day rates, real verification
 * chips. "Show the product" without a second, drifting copy of it.
 *
 * `filter` scopes the sample (a service page shows its own category; a city page
 * shows that city). `href` is where "See all" leads — the matching filtered view.
 */
export default function ProviderPreview({ filter = {}, href = '/security-providers', selectedCity, n = 4, seeAllLabel = 'See all providers' }) {
  const providers = topProviders(filter, n);
  if (providers.length === 0) return null;

  return (
    <>
      <div className="pgrid">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} selectedCity={selectedCity} />
        ))}
      </div>
      <div className="preview__more">
        <Link className="btn btn--outline" href={href}>{seeAllLabel} &rarr;</Link>
      </div>
    </>
  );
}
