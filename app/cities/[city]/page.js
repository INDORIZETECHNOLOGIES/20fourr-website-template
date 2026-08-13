import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import PhoneFrame from '@/components/PhoneFrame';
import HowItWorks from '@/components/HowItWorks';
import TrustStrip from '@/components/TrustStrip';
import ProviderPreview from '@/components/ProviderPreview';
import StickyCta from '@/components/StickyCta';
import { cityJsonLd } from '@/app/lib/landing-schema';
import { categoriesInCity, providerCount } from '@/app/lib/catalog';
import { CATEGORY_LABEL, FILTER_CITIES, PROVIDERS, inr } from '@/app/security-providers/data';

export function generateStaticParams() {
  return FILTER_CITIES.map((c) => ({ city: c.toLowerCase() }));
}

function cityFromSlug(slug) {
  return FILTER_CITIES.find((c) => c.toLowerCase() === decodeURIComponent(slug).toLowerCase());
}

function cityMinRate(city) {
  const rates = PROVIDERS.filter((p) => p.cities.includes(city)).map((p) => p.dailyRate);
  return rates.length ? Math.min(...rates) : null;
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = cityFromSlug(slug);
  if (!city) return {};
  const from = cityMinRate(city);
  return {
    title: `Private Security Services in ${city} | Verified Guards & Bouncers`,
    description: `Hire PSARA-verified security guards, bouncers, armed security and PSOs in ${city}${from ? ` from ${inr(from)}/day` : ''}. Priced upfront, booked online.`,
    alternates: { canonical: `/cities/${city.toLowerCase()}` },
    openGraph: { title: `Private Security in ${city} | 20fourr`, description: `Verified, PSARA-licensed security providers in ${city}. Priced upfront.` },
  };
}

export default async function CityPage({ params }) {
  const { city: slug } = await params;
  const city = cityFromSlug(slug);
  if (!city) notFound();

  const canonical = `/cities/${city.toLowerCase()}`;
  const from = cityMinRate(city);
  const total = providerCount({ city });
  const cats = categoriesInCity(city);
  const otherCities = FILTER_CITIES.filter((c) => c !== city && providerCount({ city: c }) > 0).slice(0, 8);

  return (
    <>
      <JsonLd data={cityJsonLd({ city, canonical, fromPrice: from })} />

      {/* ---------- 1 · hero ---------- */}
      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="wrap hero__in">
          <div className="stack g-28 hero__copy">
            <p className="eyebrow">Coverage &middot; {city}</p>
            <h1>Verified security providers in {city} — priced upfront.</h1>
            <p className="hero__sub">
              {total} PSARA-verified provider{total === 1 ? '' : 's'} covering {city} — guards, bouncers,
              armed security and PSOs. <b>Compare, see the price, book online.</b>
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary btn--lg" href={`/security-providers?city=${encodeURIComponent(city)}`}>Find Security</Link>
              <Link className="btn btn--ghost" href="#how-it-works">See how it works</Link>
            </div>
            <TrustStrip />
            {from != null && <p className="hero__fine"><span className="gold">From {inr(from)} / day</span> in {city}</p>}
          </div>
          <figure className="hero__shot">
            <PhoneFrame src="/app/find-providers.png" alt={`Find Security Providers screen showing verified providers in ${city}`} priority sizes="(max-width: 980px) 70vw, 320px" />
          </figure>
        </div>
      </header>

      {/* ---------- 2 · services available in this city ---------- */}
      <section className="band band--paper" id="services">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Services in {city}</p>
            <h2>Every service, verified locally.</h2>
          </Reveal>
          {cats.length > 0 && (
            <Reveal className="city-links" style={{ marginBottom: 'clamp(32px,4vw,48px)' }}>
              {cats.map((c) => (
                <Link className="city-link" href={`/security-providers?category=${c}&city=${encodeURIComponent(city)}`} key={c}>
                  {CATEGORY_LABEL[c]} in {city} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </Reveal>
          )}
          <Reveal>
            <ProviderPreview filter={{ city }} selectedCity={city} href={`/security-providers?city=${encodeURIComponent(city)}`} seeAllLabel={`Browse all providers in ${city}`} />
          </Reveal>
        </div>
      </section>

      {/* ---------- 3 · how it works ---------- */}
      <section className="band" id="how-it-works">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">How it works</p>
            <h2>Search to shift, in four screens.</h2>
          </Reveal>
          <Reveal><HowItWorks /></Reveal>
        </div>
      </section>

      {/* ---------- 4 · trust / PSARA ---------- */}
      <section className="band band--paper" id="trust">
        <div className="wrap">
          <div className="showcase">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Trust &amp; PSARA</p>
              <h2>Every {city} provider is checked before listing.</h2>
              <p className="lede">
                PSARA licence, government ID and background — verified by our compliance team, and
                re-checked as documents expire. Badges are computed, never self-declared.
              </p>
              <TrustStrip />
            </Reveal>
            <Reveal className="showcase__shots">
              <PhoneFrame src="/app/provider-documents.png" alt="Provider Documents screen with credentials verified" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 5 · final cta + other cities ---------- */}
      <section className="band" id="book">
        <div className="wrap">
          <Reveal className="stack g-20 finalcta">
            <h2>Book verified security in {city} <em>today</em>.</h2>
            <p className="lede">See the rate upfront, compare providers, and confirm in minutes.</p>
            <div><Link className="btn btn--primary btn--lg" href={`/security-providers?city=${encodeURIComponent(city)}`}>Find Security</Link></div>
          </Reveal>
          {otherCities.length > 0 && (
            <Reveal className="city-links" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
              {otherCities.map((c) => (
                <Link className="city-link" href={`/cities/${c.toLowerCase()}`} key={c}>
                  Security in {c} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <StickyCta href={`/security-providers?city=${encodeURIComponent(city)}`} label="Find Security" />
    </>
  );
}
