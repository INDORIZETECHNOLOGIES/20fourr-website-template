import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import PhoneFrame from '@/components/PhoneFrame';
import HowItWorks from '@/components/HowItWorks';
import TrustStrip from '@/components/TrustStrip';
import ProviderPreview from '@/components/ProviderPreview';
import StickyCta from '@/components/StickyCta';
import { SERVICES, findService } from '@/app/lib/services';
import { serviceJsonLd } from '@/app/lib/landing-schema';
import { minRate, providerCount } from '@/app/lib/catalog';
import { inr } from '@/app/security-providers/data';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const from = minRate(service.category);
  return {
    title: `${service.title} in India | Verified & PSARA-Licensed`,
    description: `${service.headline} ${from ? `From ${inr(from)}/day. ` : ''}Compare verified providers, see the price upfront, book online.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} in India | 20fourr`, description: service.headline },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const from = minRate(service.category);
  const canonical = `/services/${service.slug}`;
  const directoryHref = `/security-providers?category=${service.category}`;

  return (
    <>
      <JsonLd data={serviceJsonLd({ service, canonical, fromPrice: from })} />

      {/* ---------- 1 · hero ---------- */}
      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="wrap hero__in">
          <div className="stack g-28 hero__copy">
            <p className="eyebrow">
              <Link href="/services" className="lhero__crumb">Services</Link> &middot; {service.code}
            </p>
            <h1>{service.headline}</h1>
            <p className="hero__sub">{service.lede}</p>
            <div className="hero__ctas">
              <Link className="btn btn--primary btn--lg" href={directoryHref}>Find Security</Link>
              <Link className="btn btn--ghost" href="#how-it-works">See how it works</Link>
            </div>
            <TrustStrip badges={service.badges} />
            {from != null && (
              <p className="hero__fine">
                <span className="gold">From {inr(from)} / day</span> &middot; {providerCount({ category: service.category })} verified providers
              </p>
            )}
          </div>
          <figure className="hero__shot">
            <PhoneFrame src={service.screenshot.src} alt={service.screenshot.alt} priority sizes="(max-width: 980px) 70vw, 320px" />
          </figure>
        </div>
      </header>

      {/* ---------- 2 · how it works ---------- */}
      <section className="band band--paper" id="how-it-works">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">How it works</p>
            <h2>Search to shift, in four screens.</h2>
          </Reveal>
          <Reveal><HowItWorks /></Reveal>
        </div>
      </section>

      {/* ---------- 3 · why verified matters for this buyer ---------- */}
      <section className="band" id="why">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Why verified matters</p>
            <h2>Where {service.what} get booked.</h2>
            <p className="lede">{service.whyVerified}</p>
          </Reveal>
          <Reveal className="uses">
            {service.use.map(([k, d]) => (
              <div className="use" key={k}>
                <h3 className="use__k">{k}</h3>
                <p className="use__d">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 4 · pricing ---------- */}
      <section className="band band--paper" id="pricing">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Pricing</p>
            <h2>{from != null ? <>From <span className="gold">{inr(from)}</span> / day.</> : 'Priced upfront.'}</h2>
            <p className="lede">The provider’s day rate is shown before you book; platform fee and GST are itemised on the booking screen. Real listings, live prices:</p>
          </Reveal>
          <Reveal>
            <ProviderPreview filter={{ category: service.category }} href={directoryHref} seeAllLabel={`Browse all ${service.what}`} />
          </Reveal>
        </div>
      </section>

      {/* ---------- 5 · trust badges for this service ---------- */}
      <section className="band" id="trust">
        <div className="wrap">
          <div className="showcase">
            <Reveal className="showcase__copy">
              <p className="eyebrow">Verified before listing</p>
              <h2>Badges are earned, never self-declared.</h2>
              <p className="lede">Every badge is computed from documents our compliance team reviewed, and disappears when the document expires.</p>
              <TrustStrip badges={service.badges} />
            </Reveal>
            <Reveal className="showcase__shots">
              <PhoneFrame src="/app/provider-documents.png" alt="Provider Documents screen with credentials verified" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 6 · faq ---------- */}
      {service.faqs.length > 0 && (
        <section className="band band--paper" id="faq">
          <div className="wrap">
            <Reveal className="head">
              <p className="eyebrow">Questions</p>
              <h2>Good to know.</h2>
            </Reveal>
            <Reveal className="faq">
              {service.faqs.map(([q, a]) => (
                <details className="qa" key={q}>
                  <summary>{q}</summary>
                  <p className="qa__a">{a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- 7 · final cta ---------- */}
      <section className="band" id="book">
        <div className="wrap">
          <Reveal className="stack g-20 finalcta">
            <h2>Book verified {service.what} <em>today</em>.</h2>
            <p className="lede">See the rate upfront, compare providers, and confirm in minutes.</p>
            <div><Link className="btn btn--primary btn--lg" href={directoryHref}>Find Security</Link></div>
          </Reveal>
        </div>
      </section>

      <StickyCta href={directoryHref} label="Find Security" />
    </>
  );
}
