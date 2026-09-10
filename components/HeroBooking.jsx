'use client';

import { useId, useState } from 'react';
import Link from 'next/link';

/**
 * The hero's one CTA, plus the city picker beside it.
 *
 * Picking a city doesn't navigate on its own — it re-targets "Book verified
 * security" at the directory filtered to that city (`/security-providers?city=`,
 * which the directory already reads server-side). Leave it on "Choose your
 * city" and the button falls back to `#book`, same as before this existed.
 */
export default function HeroBooking({ cities, defaultHref = '#book' }) {
  const [city, setCity] = useState('');
  const selectId = useId();
  const href = city ? `/security-providers?city=${encodeURIComponent(city)}` : defaultHref;

  return (
    <div className="stack g-16">
      <div className="hero__ctas">
        <label className="visually-hidden" htmlFor={selectId}>Choose your city</label>
        <select
          id={selectId}
          className="hero__city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Choose your city</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Link className="btn btn--primary" href={href}>Book verified security</Link>
      </div>
      <Link className="hero__verify" href="#trust">See how we verify providers</Link>
    </div>
  );
}
