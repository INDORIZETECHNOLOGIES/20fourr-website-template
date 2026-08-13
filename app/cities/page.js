import Link from 'next/link';
import Reveal from '@/components/Reveal';
import StickyCta from '@/components/StickyCta';
import { citiesByCoverage } from '@/app/lib/catalog';
import { inr, PROVIDERS } from '@/app/security-providers/data';

export const metadata = {
  title: 'Private Security by City in India | Verified Providers',
  description:
    'Browse verified, PSARA-licensed security providers city by city across India. Compare day rates in Delhi, Mumbai, Bengaluru, Hyderabad, Pune and more.',
  alternates: { canonical: '/cities' },
};

function cityMinRate(city) {
  const rates = PROVIDERS.filter((p) => p.cities.includes(city)).map((p) => p.dailyRate);
  return rates.length ? Math.min(...rates) : null;
}

export default function CitiesIndex() {
  const cities = citiesByCoverage();

  return (
    <>
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Coverage</p>
            <h1>
              Verified security, <em>city by city</em>.
            </h1>
            <p className="lede">
              Pick your city to compare PSARA-verified providers, see live day rates, and book
              online &mdash; no account, no sales call.
            </p>
          </div>
        </div>
      </header>

      <section className="band band--paper">
        <div className="wrap">
          <Reveal className="scards">
            {cities.map(({ city, count }) => {
              const from = cityMinRate(city);
              return (
                <Link className="scard" href={`/cities/${city.toLowerCase()}`} key={city}>
                  <span className="scard__code">{count} verified</span>
                  <h3 className="scard__t">{city}</h3>
                  <p className="scard__b">Guards, bouncers, armed security &amp; PSOs.</p>
                  {from != null && (
                    <span className="scard__from">
                      <span className="scard__label">from</span>
                      <span className="num scard__n">{inr(from)}</span>
                      <span className="scard__unit">/ day</span>
                    </span>
                  )}
                  <span className="scard__go">Security in {city} &rarr;</span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      <StickyCta />
    </>
  );
}
