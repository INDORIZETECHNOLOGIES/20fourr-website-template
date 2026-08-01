'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The platform tour from the design project's MarketingReel, rebuilt for this site.
 *
 * The source cycles ten app pages by loading each one into an iframe at 920px and
 * scaling it down. That cannot come across: those pages are `.dc.html` files that
 * need the design runtime, and neither exists here. What ports is the presentation —
 * device frame, caption pill with its pulsing dot, progress dots, a timed cross-fade.
 *
 * The screens themselves are drawn from the site's own `.scr` primitives, for the
 * reason AppPreview already gives: a screenshot of a product still being built goes
 * stale silently, and drawn screens inherit the palette so the marketing page and
 * the product cannot drift apart. Four screens, not ten — this sits in the provider
 * section, so it shows the four that answer "what happens after I join".
 */

const DWELL = 3600; // ms per screen, matching the source reel
const RATE = '₹2,000'; // one day rate, so every figure below reconciles

const SCREENS = [
  {
    label: 'Job request',
    node: (
      <>
        <div className="scr__eyebrow scr__eyebrow--amber">New request &middot; SC-4471</div>
        <div className="scr__title">Security guard</div>
        <div className="scr__meta">
          Mon 12 Aug &middot; 2 days
          <br />
          Andheri East, Mumbai
        </div>
        <div className="scr__card">
          <div className="scr__who">
            <span className="scr__av" />
            <span>Meera S.</span>
          </div>
          <div className="scr__ok">Payment secured</div>
          <div className="scr__rate">{RATE} / day &middot; your rate</div>
        </div>
        <div className="scr__cta">Accept duty</div>
      </>
    ),
  },
  {
    label: 'Duty started',
    node: (
      <>
        <div className="scr__eyebrow">Start code &middot; SC-4471</div>
        <div className="scr__title">Read it back</div>
        <div className="scr__digits">
          {['4', '9', '2', '7', '1', '6'].map((d, k) => (
            <span className="scr__digit" key={`${d}-${k}`}>
              {d}
            </span>
          ))}
        </div>
        <div className="scr__stamp">
          <span className="scr__dot" />
          Verified 09:02
        </div>
        <div className="scr__payout">30% released &middot; &#8377;1,200</div>
      </>
    ),
  },
  {
    label: 'Earnings',
    node: (
      <>
        <div className="scr__eyebrow">Earnings</div>
        <div className="scr__title">Duty SC-4471</div>
        <div className="scr__rows">
          <div className="scr__row">
            <span>2 days &times; {RATE}</span>
            <span>&#8377;4,000</span>
          </div>
          <div className="scr__row">
            <span>Released on start code</span>
            <span>&#8377;1,200</span>
          </div>
          <div className="scr__row">
            <span>Balance, T+2</span>
            <span>&#8377;2,800</span>
          </div>
          <div className="scr__row scr__row--total">
            <span>Paid to you</span>
            <span>&#8377;4,000</span>
          </div>
        </div>
        <div className="scr__stamp">
          <span className="scr__dot" />
          Settled 14 Aug
        </div>
      </>
    ),
  },
  {
    label: 'Provider profile',
    node: (
      <>
        <div className="scr__eyebrow scr__eyebrow--amber">Provider profile</div>
        <div className="scr__title">R. Kumar</div>
        <div className="scr__meta">
          Mumbai &middot; 9 years&rsquo; experience
          <br />
          128 completed duties
        </div>
        <div className="scr__card">
          <div className="scr__ok">PSARA verified</div>
          <div className="scr__ok">Background checked</div>
          <div className="scr__ok">Top rated</div>
        </div>
        <div className="scr__cta">Edit your rate</div>
      </>
    ),
  },
];

export default function ProviderReel() {
  const ref = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // A loop nobody is looking at is a timer running for nothing, and an
    // animation a reduced-motion user did not ask for. Both are handled here
    // rather than by hiding the reel — the first screen still reads as a phone.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = null;
    const stop = () => {
      clearInterval(timer);
      timer = null;
    };
    const play = () => {
      if (timer) return;
      timer = setInterval(() => setI((n) => (n + 1) % SCREENS.length), DWELL);
    };

    if (!('IntersectionObserver' in window)) {
      play();
      return stop;
    }

    const io = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? play() : stop())), {
      threshold: 0.25,
    });
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <div className="reel" ref={ref} aria-hidden="true">
      <div className="phones phones--reel">
        <div className="phone">
          <div className="phone__screen">
            {SCREENS.map((s, k) => (
              <div className={`scr reel__scr${k === i ? ' is-on' : ''}`} key={s.label}>
                <div className="scr__bar">
                  <span>9:41</span>
                  <span className="scr__sig" />
                </div>
                {s.node}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reel__cap">
        <span className="reel__pip" />
        <span className="reel__label">{SCREENS[i].label}</span>
      </div>

      <div className="reel__dots">
        {SCREENS.map((s, k) => (
          <span className={`reel__dot${k === i ? ' is-on' : ''}`} key={s.label} />
        ))}
      </div>
    </div>
  );
}
