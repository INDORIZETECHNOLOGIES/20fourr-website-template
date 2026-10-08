import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { CATEGORY_ORDER, CATEGORY_SERVICE_PHRASE, queryProviders } from './data';

/**
 * The written half of a city page — see cityGuides.js. Rendered on page 1 of an
 * unfiltered city view only: a category filter narrows the listing, not the law, and
 * repeating the guide on page 2+ would make every page of the city a near-duplicate.
 */
export default function CityGuide({ city, guide }) {
  // Only roles with at least one listing in this city get a link; a link to an empty,
  // noindex filter would send visitors and crawlers to a dead end.
  const roles = CATEGORY_ORDER.filter((category) => queryProviders({ category, city }).total > 0);

  return (
    <section className="band band--paper" id="hiring-in-city">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">Hiring in {city}</p>
          <h2>What applies when you hire security in {city}.</h2>
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

        {roles.length > 0 && (
          <p className="guide-roles">
            {roles.map((category) => (
              <Link
                key={category}
                className="text-link"
                href={`/security-providers?category=${category}&city=${encodeURIComponent(city)}`}
              >
                {CATEGORY_SERVICE_PHRASE[category]} in {city} &rarr;
              </Link>
            ))}
          </p>
        )}

        <div className="subhead">
          <h3>Questions about hiring in {city}</h3>
        </div>
        <Reveal className="faq">
          {guide.faqs.map((f, i) => (
            <details className="qa" key={f.q} open={i === 0 || undefined}>
              <summary>{f.q}</summary>
              <p className="qa__a">{f.a}</p>
            </details>
          ))}
        </Reveal>

        <div className="guide-sources">
          <p>
            Sources, last reviewed {guide.reviewed}. This is a summary, not legal advice; the
            controlling authority in {guide.state} has the final word.
          </p>
          <ul>
            {guide.sources.map((s) => (
              <li key={s.url}>
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
