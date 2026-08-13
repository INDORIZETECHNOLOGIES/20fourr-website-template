import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PhoneFrame from '@/components/PhoneFrame';
import HowItWorks from '@/components/HowItWorks';
import CompareAgency from '@/components/CompareAgency';
import TrustStrip from '@/components/TrustStrip';
import StickyCta from '@/components/StickyCta';
import { SERVICES } from '@/app/lib/services';

const FIND = '/security-providers';

const COVERAGE_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Jaipur', 'Ahmedabad'];

/* The three honesty blocks — kept, but placed deep so they build trust without
   competing with the hero. Verbatim intent from the spec. */
const HONESTY = [
  ['Who performs the duty', '20fourr is a technology platform', 'The security services are performed by independent, PSARA-licensed agencies and their personnel. Responsibility for their conduct on duty sits with them.'],
  ['Emergencies', 'We are not an emergency service', 'In an emergency, contact the police on 112 first, then raise an incident on your booking so the record, the agency and our compliance team stay aligned.'],
  ['What a badge proves', 'A document was checked on a date', 'A verified badge does not predict behaviour. Ratings, check-in records and the incident process exist precisely because paperwork alone is not enough.'],
];

export const metadata = {
  title: 'Private Security Services in India | Verified Guards, Bouncers & PSOs',
  description:
    'Book a PSARA-verified security guard, bouncer, armed officer or PSO in India. See the price upfront, pay in the app, and prove every shift with a code. No cash at the gate.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Private Security Services in India | 20fourr',
    description:
      'A verified guard on your gate this week, priced upfront. Compare PSARA-verified providers and book online.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* ---------- 1 · hero ---------- */}
      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="wrap hero__in">
          <div className="stack g-28 hero__copy">
            <p className="eyebrow">PSARA-verified &middot; priced upfront</p>
            <h1>A verified guard on your gate this week — price shown upfront.</h1>
            <p className="hero__sub">
              No cash at the gate. No ten-call runaround. Every PSARA-verified provider in one place,
              <b> priced before you book.</b>
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary btn--lg" href={FIND}>Find Security</Link>
              <Link className="btn btn--ghost" href="#how-it-works">See how it works</Link>
            </div>
            <p className="hero__fine">Itemised GST invoice on every booking &middot; <span className="gold">Total ₹9,910</span> — nothing hidden</p>
          </div>

          <figure className="hero__shot">
            <PhoneFrame src="/app/booking-request.png" alt="Booking Request screen with the full price breakdown" priority sizes="(max-width: 980px) 70vw, 320px" />
          </figure>
        </div>
      </header>

      {/* ---------- 2 · how it works ---------- */}
      <section className="band band--paper" id="how-it-works">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">How it works</p>
            <h2>Search to shift, in four screens.</h2>
            <p className="lede">The client app’s own screens, in the order you meet them.</p>
          </Reveal>
          <Reveal>
            <HowItWorks />
          </Reveal>
        </div>
      </section>

      {/* ---------- 3 · services ---------- */}
      <section className="band" id="services">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Services</p>
            <h2>Pick the protection you need.</h2>
            <p className="lede">Four services, each verified before listing and priced upfront.</p>
          </Reveal>
          <Reveal className="svc-cards">
            {SERVICES.map((s) => (
              <Link className="svc-card" href={`/services/${s.slug}`} key={s.slug}>
                <PhoneFrame src={s.screenshot.src} alt={s.screenshot.alt} className="pf--sm" sizes="(max-width: 700px) 60vw, 200px" />
                <h3 className="svc-card__t">{s.title}</h3>
                <p className="svc-card__b">{s.lede.split('.')[0]}.</p>
                <span className="svc-card__go">Browse &rarr;</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 4 · why 20fourr vs a traditional agency ---------- */}
      <section className="band band--paper" id="why">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Why 20fourr</p>
            <h2>The old way, and the better way.</h2>
          </Reveal>
          <Reveal>
            <CompareAgency />
          </Reveal>
        </div>
      </section>

      {/* ---------- 5 · trust & verification ---------- */}
      <section className="band" id="trust">
        <div className="wrap">
          <div className="showcase">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Trust &amp; verification</p>
              <h2>Badges are earned, never self-declared.</h2>
              <p className="lede">
                Every badge is computed from documents our compliance team reviewed. It disappears
                automatically the moment the document expires.
              </p>
              <TrustStrip badges={['elite_protection', 'ex_serviceman', 'psara_verified', 'verified_identity', 'background_verified']} />
            </Reveal>
            <Reveal className="showcase__shots">
              <PhoneFrame src="/app/provider-documents.png" alt="Provider Documents screen — PSARA, Government ID, Training Certificate and Arms Licence all verified" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 6 · proof / OTP (the differentiator) ---------- */}
      <section className="band band--paper" id="proof">
        <div className="wrap">
          <div className="showcase showcase--reverse">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Proof of duty</p>
              <h2>One booking, proven at every step.</h2>
              <p className="lede">
                A code opens and closes the shift. The first <b>30%</b> releases at start, the rest
                after completion. Nothing is marked done without a record.
              </p>
            </Reveal>
            <Reveal className="showcase__shots phones-duo">
              <PhoneFrame src="/app/duty-otp.png" alt="Duty OTP screen — a code shared to start the shift" />
              <PhoneFrame src="/app/booking-detail.png" alt="Booking Detail screen showing the lifecycle stepper" className="phones-duo__back" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 7 · pricing transparency ---------- */}
      <section className="band" id="pricing">
        <div className="wrap">
          <div className="showcase">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Pricing</p>
              <h2>Know the price. Then decide.</h2>
              <p className="lede">
                Provider charge, platform fee and GST — each on its own line. An itemised tax invoice
                on every booking.
              </p>
            </Reveal>
            <Reveal className="showcase__shots phones-duo">
              <PhoneFrame src="/app/payment.png" alt="Payment screen with the itemised charge" />
              <PhoneFrame src="/app/invoice.png" alt="Tax invoice screen" className="phones-duo__back" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 8 · safety honesty (deep, not early) ---------- */}
      <section className="band band--paper" id="honesty">
        <div className="wrap">
          <div className="showcase showcase--reverse">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Read this before you book</p>
              <h2>What verification does not mean.</h2>
              <p className="lede">
                Being straight about the limits is part of being trustworthy. Verification checks
                documents and history — not future conduct, and no platform can honestly claim otherwise.
              </p>
            </Reveal>
            <Reveal className="showcase__shots phones-duo">
              <PhoneFrame src="/app/risk-acknowledgement.png" alt="Risk Acknowledgement waiver screen" />
              <PhoneFrame src="/app/safety-disclaimer.png" alt="Safety Disclaimer waiver screen" className="phones-duo__back" />
            </Reveal>
          </div>
          <Reveal className="tiers" style={{ marginTop: 'clamp(32px,4vw,52px)' }}>
            {HONESTY.map(([l, h, d]) => (
              <div className="tier tier--note" key={l}>
                <span className="tier__l">{l}</span>
                <div className="tier__h">{h}</div>
                <p className="tier__d">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 9 · city coverage ---------- */}
      <section className="band" id="coverage">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Local coverage</p>
            <h2>Verified security, city by city.</h2>
          </Reveal>
          <Reveal className="city-links">
            {COVERAGE_CITIES.map((city) => (
              <Link className="city-link" href={`/cities/${city.toLowerCase()}`} key={city}>
                Security in {city} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 10 · final cta ---------- */}
      <section className="band band--paper" id="book">
        <div className="wrap">
          <div className="showcase">
            <Reveal className="showcase__copy finalcta">
              <h2>Your security shouldn&rsquo;t be complicated.</h2>
              <p className="lede">
                Tell us what you need. Approve the provider. Pay in the app. Issue the code that
                starts the duty.
              </p>
              <div>
                <Link className="btn btn--primary btn--lg" href={FIND}>Find Security</Link>
              </div>
              <p className="hero__fine">
                Are you a guard or an agency? <Link href="/join" className="gold">Join as a provider</Link>
              </p>
            </Reveal>
            <Reveal className="showcase__shots">
              <PhoneFrame src="/app/home.png" alt="Client app home — find security services near you, with upcoming and active bookings at a glance" />
            </Reveal>
          </div>
        </div>
      </section>

      <StickyCta href={FIND} label="Find Security" />
    </>
  );
}
