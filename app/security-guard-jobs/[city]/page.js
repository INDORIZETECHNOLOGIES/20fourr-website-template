import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import PlayStoreButton from '@/components/PlayStoreButton';
import Reveal from '@/components/Reveal';
import { OG_BASE, PROVIDER_APP_URL, PROVIDER_PLAY_URL, SITE_URL } from '@/app/site';
import { WhatsAppIcon } from '@/app/join/JoinBody';
import joinContent, { JOIN_WHATSAPP_URL } from '@/app/join/content';
import { JOB_CITIES, cityFromJobsSlug, jobPage, jobsPath, jobsSlug } from '../content';

/* See ../content.js for what these pages are for and what they deliberately
   leave out (salary figures, JobPosting). */

export const dynamicParams = false;

export function generateStaticParams() {
  return JOB_CITIES.map((city) => ({ city: jobsSlug(city) }));
}

export async function generateMetadata({ params }) {
  const city = cityFromJobsSlug((await params).city);
  if (!city) notFound();
  const p = jobPage(city);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: jobsPath(city) },
    openGraph: { ...OG_BASE, title: `${p.title} | 20fourr`, description: p.description, url: jobsPath(city) },
  };
}

function jsonLd(p) {
  const url = `${SITE_URL}${jobsPath(p.city)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: p.title,
        description: p.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work as a provider', item: `${SITE_URL}/join` },
          { '@type': 'ListItem', position: 3, name: `Security guard jobs in ${p.city}`, item: url },
        ],
      },
    ],
  };
}

export default async function JobsCityPage({ params }) {
  const city = cityFromJobsSlug((await params).city);
  if (!city) notFound();
  const p = jobPage(city);
  const t = joinContent.en;

  return (
    <>
      <JsonLd data={jsonLd(p)} />

      {/* ---------- hero ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">
              <Link href="/join" className="crumb">
                Work as a provider
              </Link>
            </p>
            <h1>
              <em>Security guard jobs</em> in {p.where}
            </h1>
            <p className="lede">
              Guard, bouncer and gunman work in {city}, booked through the 20fourr provider app. Set
              your own rate, choose your own days, and get 30% the moment duty starts. Joining is
              free.
            </p>
            <div className="jhero__ctas">
              <a className="btn btn--lg btn--whatsapp" href={JOIN_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.ctaJoin}
              </a>
              <PlayStoreButton href={PROVIDER_PLAY_URL} />
            </div>
            <p className="hero__fine">
              {t.fine}.{' '}
              <Link href="/join/hi">हिंदी में पढ़ें</Link>
              <br />
              {t.iphone}{' '}
              <a href={PROVIDER_APP_URL} target="_blank" rel="noopener noreferrer">
                {t.ctaApp}
              </a>
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---------- the money ---------- */}
      <section className="band" style={{ paddingBlock: 'clamp(48px,6vw,80px)' }}>
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">{t.moneyHead}</p>
          </Reveal>
          <Reveal className="money">
            {t.money.map((m) => (
              <div className="money__cell" key={m.k}>
                <span className="money__n">{m.n}</span>
                <span className="money__k">{m.k}</span>
                <p className="money__d">{m.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- the city ---------- */}
      <section className="band band--paper">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Working in {city}</p>
            <h2>
              What you need to work security in {city}
              {p.state !== city ? `, ${p.state}` : ''}.
            </h2>
            <p className="lede">{p.demand}</p>
          </Reveal>
          <Reveal className="guide-rules">
            {p.needs.map((n) => (
              <div className="guide-rule" key={n.title}>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- how to join ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="head">
            <h2>{t.stepsHead}</h2>
          </Reveal>
          <Reveal as="ol" className="log">
            {t.steps.map((s, i) => (
              <li className="log__row" key={s.t}>
                <span className="log__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="log__state">{s.t}</span>
                <p className="log__d">{s.d}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="band band--ink-2">
        <div className="wrap">
          <Reveal className="head">
            <h2>Questions about security work in {city}</h2>
          </Reveal>
          <Reveal className="faq">
            {p.faqs.map((f, i) => (
              <details className="qa" key={f.q} open={i === 0 || undefined}>
                <summary>{f.q}</summary>
                <p className="qa__a">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- other cities ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="stack g-20 cta-city">
            <h2>{t.finalTitle}</h2>
            <p className="lede">{t.finalSub}</p>
            <div className="jhero__ctas">
              <a className="btn btn--lg btn--whatsapp" href={JOIN_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.ctaJoin}
              </a>
            </div>
          </Reveal>
          <div className="subhead">
            <h3>Security guard jobs in other cities</h3>
          </div>
          <div className="city-links">
            {JOB_CITIES.filter((c) => c !== city).map((c) => (
              <Link className="city-link" href={jobsPath(c)} key={c}>
                Security guard jobs in {c} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
