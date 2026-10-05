import Link from 'next/link';
import Reveal from '@/components/Reveal';
import RoleFrames from '@/components/RoleFrames';
import content, { JOIN_EMAIL_URL } from './content';
import { PROVIDER_APP_URL, PROVIDER_PLAY_URL } from '@/app/site';
import PlayStoreButton from '@/components/PlayStoreButton';

/**
 * Both language versions of the provider page.
 *
 * The language used to be client state with the choice kept in localStorage,
 * which meant one URL rendering English on the server no matter what — so the
 * Hindi copy was unreachable by search entirely, for the audience most likely
 * to be searching in Hindi. It is now a route each (`/join`, `/join/hi`), the
 * toggle is two links, and this renders on the server in whichever language it
 * was asked for.
 *
 * Losing 'use client' also takes both languages of content.js out of the
 * browser bundle, which matters on the mid-range Android this page is written
 * for.
 */
const PATH = { en: '/join', hi: '/join/hi' };

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 9.4 7.2 13 14.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function JoinBody({ lang = 'en' }) {
  const t = content[lang];

  return (
    <div lang={lang === 'hi' ? 'hi' : undefined}>
      {/* ---------- language bar ---------- */}
      <div className="langbar">
        <div className="wrap langbar__in">
          {/* The note points at the other language, so it is also the link to
              it — a visitor who wants Hindi should not have to find the toggle
              to act on a line that just told them Hindi exists. */}
          <Link className="langbar__note" href={PATH[lang === 'hi' ? 'en' : 'hi']}>
            {t.langNote}
          </Link>
          <nav className="langtoggle" aria-label="Language">
            <Link href={PATH.en} aria-current={lang === 'en' ? 'page' : undefined} lang="en">
              English
            </Link>
            <Link href={PATH.hi} aria-current={lang === 'hi' ? 'page' : undefined} lang="hi">
              हिंदी
            </Link>
          </nav>
        </div>
      </div>

      {/* ---------- hero ---------- */}
      <header className="jhero">
        <div className="hero__glow" />
        <div className="wrap jhero__grid">
          <div className="jhero__in">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="jhero__sub">{t.sub}</p>
            <div className="jhero__ctas">
              <a className="btn btn--lg btn--primary" href={JOIN_EMAIL_URL}>
                <MailIcon />
                {t.ctaJoin}
              </a>
              <PlayStoreButton href={PROVIDER_PLAY_URL} />
            </div>
            <p className="hero__fine">
              {t.fine}
              <br />
              {t.iphone}{' '}
              <a href={PROVIDER_APP_URL} target="_blank" rel="noopener noreferrer">
                {t.ctaApp}
              </a>
            </p>
          </div>

          <RoleFrames roles={t.roles} />
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

      {/* ---------- worked example ---------- */}
      <section className="band band--paper">
        <div className="wrap">
          <Reveal className="head">
            <h2>{t.earnHead}</h2>
          </Reveal>

          <div className="inv-grid">
            <Reveal className="earn">
              <div className="earn__hd">{t.earnTitle}</div>
              <div className="earn__rows">
                {t.earnRows.map(([k, sub, v]) => (
                  <div className="row" key={k}>
                    <span className="row__k">
                      {k}
                      <small>{sub}</small>
                    </span>
                    <span className="row__v">{v}</span>
                  </div>
                ))}
              </div>
              <div className="earn__ft">
                <div className="row">
                  <span className="row__k" style={{ color: 'var(--text)', fontWeight: 600 }}>
                    {t.earnTotalK}
                  </span>
                  <span className="row__v" style={{ fontSize: '1.24rem' }}>
                    {t.earnTotalV}
                  </span>
                </div>
                <p className="earn__note">{t.earnFoot}</p>
              </div>
            </Reveal>

            <Reveal>
              <p className="split__note">{t.earnNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- how to join (a real sequence) ---------- */}
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

      {/* ---------- documents ---------- */}
      <section className="band band--paper">
        <div className="wrap">
          <Reveal className="head">
            <h2>{t.docsHead}</h2>
          </Reveal>
          <Reveal className="docs">
            {t.docs.map((d) => (
              <div className="doc" key={d.t}>
                <Tick />
                <div>
                  <div className="doc__t">{d.t}</div>
                  <p className="doc__d">{d.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- fairness ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="head">
            <h2>{t.fairHead}</h2>
            <p className="lede">{t.fairSub}</p>
          </Reveal>
          <Reveal className="fair">
            {t.fair.map((f) => (
              <div className="fair__c" key={f.k}>
                <span className="fair__k">{f.k}</span>
                <p className="fair__b">{f.b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="band band--ink-2">
        <div className="wrap">
          <Reveal className="head">
            <h2>{t.faqHead}</h2>
          </Reveal>
          <Reveal className="faq">
            {t.faq.map((f) => (
              <details className="qa" key={f.q}>
                <summary>{f.q}</summary>
                <p className="qa__a">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- final ---------- */}
      <section className="band">
        <Reveal className="wrap final final--solo">
          <div className="final__copy">
            <h2 style={{ maxWidth: '20ch' }}>{t.finalTitle}</h2>
            <p className="lede">{t.finalSub}</p>
            <div className="final__ctas">
              <a className="btn btn--lg btn--primary" href={JOIN_EMAIL_URL}>
                <MailIcon />
                {t.ctaJoin}
              </a>
              <PlayStoreButton href={PROVIDER_PLAY_URL} />
            </div>
            <p className="hero__fine">
              {t.iphone}{' '}
              <a href={PROVIDER_APP_URL} target="_blank" rel="noopener noreferrer">
                {t.ctaApp}
              </a>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- sticky action bar, small screens only ---------- */}
      <div className="jbar-spacer" aria-hidden="true" />
      <div className="jbar">
        <a className="btn btn--primary" href={JOIN_EMAIL_URL}>
          <MailIcon />
          {t.ctaJoin}
        </a>
      </div>
    </div>
  );
}
