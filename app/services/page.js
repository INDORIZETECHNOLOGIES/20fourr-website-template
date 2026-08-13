import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PhoneFrame from '@/components/PhoneFrame';
import StickyCta from '@/components/StickyCta';
import { SERVICES } from '@/app/lib/services';
import { minRate, providerCount } from '@/app/lib/catalog';
import { inr } from '@/app/security-providers/data';

export const metadata = {
  title: 'Security Services in India | Guards, Bouncers, Armed & PSO',
  description:
    'Every private security service on 20fourr: verified security guards, bouncers and event security, armed security and executive protection. Priced upfront, booked online.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  return (
    <>
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Services</p>
            <h1>Every security service, <em>verified</em>.</h1>
            <p className="lede">
              Pick the service you need. Each is PSARA-checked before listing, priced upfront, and
              bookable online across India.
            </p>
          </div>
        </div>
      </header>

      <section className="band band--paper">
        <div className="wrap">
          <Reveal className="svc-cards">
            {SERVICES.map((s) => {
              const from = minRate(s.category);
              return (
                <Link className="svc-card" href={`/services/${s.slug}`} key={s.slug}>
                  <PhoneFrame src={s.screenshot.src} alt={s.screenshot.alt} className="pf--sm" sizes="(max-width: 700px) 60vw, 200px" />
                  <h3 className="svc-card__t">{s.title}</h3>
                  <p className="svc-card__b">{s.lede.split('.')[0]}.</p>
                  <span className="svc-card__go">
                    {from != null && <span className="gold">from {inr(from)}/day</span>} &middot; {providerCount({ category: s.category })} verified &rarr;
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      <StickyCta href="/security-providers" label="Find Security" />
    </>
  );
}
