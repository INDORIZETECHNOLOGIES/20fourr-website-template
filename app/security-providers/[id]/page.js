import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { providerJsonLd } from '../schema';
import {
  badgeLabel,
  categoryList,
  displayName,
  findProvider,
  inr,
  PROVIDERS,
  ratingLabel,
} from '../data';

/* Every profile is prerendered at build time — the directory is static, so there is
   nothing to fetch and no reason to render any of this on demand. */
export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = findProvider(id);
  if (!p) return { title: 'Provider not found' };

  const name = displayName(p);
  return {
    title: `${name} — ${inr(p.dailyRate)}/day in ${p.city}`,
    description: `${name} is a PSARA-verified provider in ${p.city}, rated ${p.rating.toFixed(
      1
    )} across ${p.ratingCount} bookings. ${categoryList(p.categories)} from ${inr(
      p.dailyRate
    )} per day.`,
    alternates: { canonical: `/security-providers/${p.id}` },
    openGraph: {
      title: name,
      description: `PSARA-verified · ${p.city} · ${inr(p.dailyRate)} per day`,
    },
  };
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.4 6.4 12 13 4.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ProviderPage({ params }) {
  const { id } = await params;
  const provider = findProvider(id);
  if (!provider) notFound();

  const name = displayName(provider);
  const others = provider.cities.filter((c) => c !== provider.city);

  const CHECKS = [
    <>
      <b>PSARA licence</b> verified against the issuing state authority, and re-checked before
      every armed assignment.
    </>,
    <>
      <b>Government photo ID</b> matched to a live selfie taken at onboarding &mdash; not an
      uploaded photograph.
    </>,
    <>
      <b>Rating of {provider.rating.toFixed(1)}</b> earned across {provider.ratingCount} completed
      bookings. Only a client who paid for a shift can rate it.
    </>,
    provider.badges.includes('firearms_authorized') ? (
      <>
        <b>Firearm licence</b> checked per booking, not once at signup. An expired licence takes
        the provider off armed work the same day.
      </>
    ) : (
      <>
        <b>Address and threat brief stay sealed</b> until payment is secured, so only a committed
        provider ever sees them.
      </>
    ),
  ];

  return (
    <>
      <JsonLd data={providerJsonLd(provider)} />

      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">
              <Link href="/security-providers" className="crumb">
                Providers
              </Link>
            </p>
            <h1>{name}</h1>
            <p className="pdetail__meta num">
              {provider.city} &middot; {ratingLabel(provider.rating, provider.ratingCount)} &middot;{' '}
              {provider.experienceYears} years&rsquo; experience
            </p>
            <div className="chips">
              {provider.badges.map((b) => (
                <span className="chip" key={b}>
                  {badgeLabel(b)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- rate + verification ---------- */}
      <section className="band band--ink-2">
        <div className="wrap inv-grid">
          <Reveal className="invoice invoice--profile">
            <div className="invoice__hd">
              <span className="invoice__ttl">Day rate</span>
              <span className="invoice__ref">Before platform fee &amp; GST</span>
            </div>
            <div className="rows">
              <div className="row">
                <span className="row__k">
                  Services offered
                  <small>Each priced from the same day rate</small>
                </span>
                <span className="row__v">{categoryList(provider.categories)}</span>
              </div>
              <div className="row">
                <span className="row__k">
                  Based in
                  <small>Primary posting city</small>
                </span>
                <span className="row__v">{provider.city}</span>
              </div>
              <div className="row">
                <span className="row__k">
                  Also operates in
                  <small>Covered by the same PSARA licence</small>
                </span>
                <span className="row__v">{others.length ? others.join(' · ') : '—'}</span>
              </div>
              <div className="row row--total">
                <span className="row__k">Day rate</span>
                <span className="row__v">{inr(provider.dailyRate)}</span>
              </div>
            </div>
            <div className="invoice__ft">
              <p>
                The provider sets this rate themselves. Platform fee and GST are added on the
                booking screen and itemised on the invoice &mdash; you see the total before you pay,
                not after. Night shift or under four hours&rsquo; notice adds a 20% surcharge each.
              </p>
            </div>
          </Reveal>

          <Reveal className="stack g-28">
            <div className="stack g-16">
              <p className="eyebrow">What we checked before listing them</p>
              <div className="checks">
                {CHECKS.map((c, i) => (
                  <div className="check" key={i}>
                    <Tick />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {provider.agency && (
              <p className="split__note">
                This is a registered security agency. Its name and contact details are released to
                you once a booking is confirmed &mdash; that is deliberate, so pricing stays
                comparable and nobody gets pulled into an off-platform negotiation before anything is
                on record.
              </p>
            )}

            <div className="pdetail__ctas">
              <Link className="btn btn--primary" href="/#book">
                Book this provider
              </Link>
              <Link className="btn btn--ghost" href="/security-providers">
                Back to all providers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
