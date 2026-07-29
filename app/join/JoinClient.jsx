'use client';

import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import RoleFrames from '@/components/RoleFrames';
import ChatPreview from '@/components/ChatPreview';
import content, { WHATSAPP_URL } from './content';

const STORAGE_KEY = 'sc-join-lang';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.13.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
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

export default function JoinClient() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  // Remember the visitor's choice — most people arriving here in Hindi are
  // arriving more than once, often from a forwarded link.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'hi' || saved === 'en') setLang(saved);
  }, []);

  function choose(next) {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <div lang={lang === 'hi' ? 'hi' : undefined}>
      {/* ---------- language bar ---------- */}
      <div className="langbar">
        <div className="wrap langbar__in">
          <span className="langbar__note">{t.langNote}</span>
          <div className="langtoggle" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => choose('en')} lang="en">
              English
            </button>
            <button type="button" aria-pressed={lang === 'hi'} onClick={() => choose('hi')} lang="hi">
              हिंदी
            </button>
          </div>
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
              <a className="btn btn--lg btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.ctaWhatsapp}
              </a>
              <a className="btn btn--lg btn--ghost" href="#">
                {t.ctaApp}
              </a>
            </div>
            <p className="hero__fine">{t.fine}</p>
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
        <Reveal className="wrap final final--chat">
          <div className="final__copy">
            <h2 style={{ maxWidth: '20ch' }}>{t.finalTitle}</h2>
            <p className="lede">{t.finalSub}</p>
            <div className="final__ctas">
              <a className="btn btn--lg btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t.ctaWhatsapp}
              </a>
              <a className="btn btn--lg btn--ghost" href="#">
                {t.ctaApp}
              </a>
            </div>
          </div>

          <ChatPreview chat={t.chat} icon={<WhatsAppIcon />} />
        </Reveal>
      </section>

      {/* ---------- sticky action bar, small screens only ---------- */}
      <div className="jbar-spacer" aria-hidden="true" />
      <div className="jbar">
        <a className="btn btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          {t.ctaWhatsapp}
        </a>
      </div>
    </div>
  );
}
