import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { CITY_GUIDES } from './cityGuides';
import { CATEGORY_GUIDES_REVIEWED } from './categoryGuides';
import { CATEGORY_SERVICE_PHRASE, queryProviders } from './data';

/**
 * The written half of a service page — see categoryGuides.js. Same register as
 * CityGuide.jsx (hairline rules, FAQ, sources), so a service page and a city page
 * read as one site. Rendered on page 1 of a service view with no city only.
 */
export default function CategoryGuide({ category, guide }) {
  // The same service in each guided city, where it has listings: the service ×
  // city pages are the ones that rank, and this is their strongest inbound link.
  const cities = Object.keys(CITY_GUIDES).filter((city) => queryProviders({ category, city }).total > 0);

  return (
    <section className="band band--paper" id="about-service">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">{guide.eyebrow}</p>
          <h2>{guide.heading}</h2>
          {guide.intro.map((p) => (
            <p className="lede" key={p}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal className="guide-rules">
          {guide.rules.map((r) => (
            <div className="guide-rule" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </Reveal>

        <div className="subhead">
          <h3>Questions about {CATEGORY_SERVICE_PHRASE[category].toLowerCase()}</h3>
        </div>
        <Reveal className="faq">
          {guide.faqs.map((f, i) => (
            <details className="qa" key={f.q} open={i === 0 || undefined}>
              <summary>{f.q}</summary>
              <p className="qa__a">{f.a}</p>
            </details>
          ))}
        </Reveal>

        <p className="guide-roles">
          <Link className="text-link" href="/psara-license">
            How to check a PSARA licence &rarr;
          </Link>
          <Link className="text-link" href="/faqs">
            Booking, pricing and cancellation questions &rarr;
          </Link>
          {cities.map((c) => (
            <Link
              key={c}
              className="text-link"
              href={`/security-providers?category=${category}&city=${encodeURIComponent(c)}`}
            >
              {CATEGORY_SERVICE_PHRASE[category]} in {c} &rarr;
            </Link>
          ))}
        </p>

        <div className="guide-sources">
          <p>
            Sources, last reviewed {CATEGORY_GUIDES_REVIEWED}. This is a summary, not legal advice;
            the controlling authority in each state has the final word.
          </p>
          <ul>
            {guide.sources.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
