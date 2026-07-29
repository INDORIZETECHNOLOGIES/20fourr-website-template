import Link from 'next/link';
import { badgeLabel, categoryList, displayName, inr, ratingLabel } from './data';

export default function ProviderCard({ provider, selectedCity }) {
  // When a city filter is on and this provider covers it, lead with that city —
  // the visitor asked about Pune, so the card should answer about Pune.
  const shown =
    selectedCity && provider.cities.includes(selectedCity) ? selectedCity : provider.city;
  const others = provider.cities.filter((c) => c !== shown);

  const meta = [shown, ratingLabel(provider.rating, provider.ratingCount)]
    .filter(Boolean)
    .join(' · ');

  return (
    <Link className="pcard" href={`/security-providers/${provider.id}`}>
      {provider.agency && <span className="pcard__tag">Agency &middot; identity shown after booking</span>}

      <h3>{displayName(provider)}</h3>
      <div className="pcard__sub">{meta}</div>

      {/* An agency's roster covers everything, so listing categories on the card
          would say nothing — the categories are on the profile instead. */}
      {!provider.agency && provider.categories.length > 0 && (
        <div className="pcard__roles">{categoryList(provider.categories)}</div>
      )}

      {others.length > 0 && <div className="pcard__roles">Also operates in {others.join(' · ')}</div>}

      {provider.badges.length > 0 && (
        <div className="chips">
          {provider.badges.slice(0, 3).map((b) => (
            <span className="chip" key={b}>
              {badgeLabel(b)}
            </span>
          ))}
        </div>
      )}

      <div className="pcard__rate num">
        {inr(provider.dailyRate)} <span>/ day</span>
      </div>
    </Link>
  );
}
