import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DutyTicket from '@/components/DutyTicket';
import AppPreview from '@/components/AppPreview';

const CREDENTIALS = [
  'PSARA-licensed providers only',
  'KYC verified before onboarding',
  'Address hidden until payment',
  'Threat brief released on assignment',
  'GST-compliant, itemised billing',
];

const SERVICES = [
  {
    code: 'GRD',
    name: 'Security guard',
    body: 'Static post and gate duty for buildings, sites, warehouses and offices. Available as a single shift or a standing weekly deployment.',
    req: 'PSARA licence · Govt ID · Live selfie',
  },
  {
    code: 'BNC',
    name: 'Bouncer',
    body: 'Crowd control and door management for clubs, concerts, weddings and large private functions.',
    req: 'PSARA licence · Govt ID · Live selfie',
  },
  {
    code: 'GUN',
    name: 'Armed gunman',
    body: 'Licensed armed protection for cash movement, industrial sites and elevated-risk premises.',
    req: 'Firearm licence verified per booking · PSARA',
  },
  {
    code: 'PSO',
    name: 'Personal security officer',
    body: 'Dedicated close protection and travel escort for individuals facing a named or credible threat.',
    req: 'Highest tier · PSARA re-checked per booking',
  },
];

// The booking's actual state machine. These are the names the platform uses
// internally, which is the point — the log is a record, not a retelling.
const LIFECYCLE = [
  {
    state: 'Requested',
    d: <>You send a booking with the category, dates, address and purpose &mdash; wedding, industrial site, travel, a named threat &mdash; so it routes to someone who has done it before.</>,
  },
  {
    state: 'Accepted',
    d: <>A provider takes the job or declines it with a reason. No silent expiry, no waiting to find out.</>,
  },
  {
    state: 'Paid',
    d: <>Only now do you get the guard&rsquo;s number and address, and only now do they see your threat brief. Before payment, both sides stay private.</>,
  },
  {
    state: 'Duty started',
    d: <>A six-digit code appears on your phone. You read it out on arrival, they enter it. That is the attendance record &mdash; and it releases the first <code>30%</code>.</>,
  },
  {
    state: 'Duty ended',
    d: <>The same again at the end of the shift. The duty closes and the remaining <code>70%</code> is scheduled.</>,
  },
  {
    state: 'Rated',
    d: <>Both sides rate each other. Reputation follows the account, so repeat behaviour is visible before anyone accepts again.</>,
  },
];

// Same row pattern, money in the key column.
const TRANCHES = [
  {
    n: '30%',
    when: 'On start code verified',
    verified: true,
    d: <>The guard is paid the moment they are confirmed on site. It costs them nothing to show up on time.</>,
  },
  {
    n: '70%',
    when: 'Two days after end code',
    d: <>The balance settles on T+2, which leaves a window to raise a dispute before the money is gone.</>,
  },
  {
    n: '0%',
    when: 'If nobody arrives',
    d: <>No start code means no duty, no payout, and an automatic penalty on the provider&rsquo;s record.</>,
  },
];

// The compliance guarantees, run through the same log.
const COMPLIANCE = [
  {
    state: 'Tax collected at source',
    d: <>Withheld from registered-firm providers at 1% and filed with the department in GSTR-8 by the 10th of the following month. You never touch it.</>,
  },
  {
    state: 'Reverse charge',
    d: <>If you&rsquo;re a registered business hiring an unregistered provider, we don&rsquo;t collect service GST from you &mdash; the invoice says so plainly, so your accountant isn&rsquo;t guessing.</>,
  },
  {
    state: 'Licences per booking',
    d: <>PSARA status and, for armed duty, the firearm licence are re-verified at the point of assignment &mdash; not once at signup and then forgotten.</>,
  },
];

const TRUST = [
  {
    k: 'Contact privacy',
    h: 'Numbers stay hidden until you pay',
    b: <>A provider cannot see your address and you cannot see their number until the booking is paid. It keeps deals on the platform &mdash; which is what keeps the licence checks, the insurance trail and the dispute route intact.</>,
  },
  {
    k: 'Threat brief',
    h: 'They arrive knowing what they’re walking into',
    b: <>If you&rsquo;ve been threatened or attacked before, you record it once in your profile. It&rsquo;s released to the assigned provider <b>after payment only</b> &mdash; late enough to protect you, early enough for them to prepare.</>,
  },
  {
    k: 'Verification',
    h: 'KYC reviewed by a person',
    b: <>Documents are uploaded, then approved or rejected with a written reason by our compliance team. <b>Unverified providers cannot accept a single booking.</b> Gunmen need a current firearm licence on top.</>,
  },
  {
    k: 'Cancellation',
    h: 'Refunds on a published clock',
    b: <>Cancel more than 24 hours out and <b>90%</b> comes back to your wallet. Between 12 and 24 hours, <b>50%</b>. Inside 12 hours, nothing &mdash; because by then the guard has already turned down other work.</>,
  },
  {
    k: 'Disputes',
    h: 'A ticket, an owner, an outcome',
    b: <>Raise a dispute and it becomes a tracked ticket with an assigned reviewer, a full chat record, and a resolution type &mdash; refund, credit, replacement or penalty. Not an inbox.</>,
  },
  {
    k: 'Ratings',
    h: 'Both directions',
    b: <>You rate the guard on professionalism, punctuality, communication and compliance. They rate you too. Ratings follow the account, so repeat behaviour is visible before anyone accepts.</>,
  },
];

const INVOICE_ROWS = [
  ['Service charge', 'Paid to the provider', '₹4,000.00'],
  ['Platform commission', '15%', '₹600.00'],
  ['Convenience fee', 'Waived on membership', '₹50.00'],
  ['GST on platform fee', '18%', '₹117.00'],
  ['GST on service', '18%', '₹720.00'],
];

const BUSINESS_CHECKS = [
  <><b>GSTIN-addressed invoices</b> on every booking, with reverse charge applied correctly when it applies to you.</>,
  <><b>Recurring rosters</b> &mdash; daily, weekdays, weekly or a custom pattern, with the same guard each time.</>,
  <><b>An attendance record you can audit</b> &mdash; every arrival and departure timestamped against a code your site manager issued.</>,
  <><b>Preferred and blocked lists</b>, so the people who know your site keep coming back and the ones who didn&rsquo;t work out don&rsquo;t.</>,
];

const PERKS = [
  ['30%', 'Paid to you the minute the client’s start code is verified — before the shift is even over.'],
  ['T+2', 'The remaining 70% lands two days after you close the duty. Every time, no chasing.'],
  ['Your rate', 'You set the day rate, the hourly rate and what a vehicle costs. We don’t set your price.'],
  ['₹200 / ₹500', 'Bonuses at 10 and 50 completed jobs, plus a Trusted and Elite badge clients can see.'],
  ['Appeal', 'Every penalty can be contested with your side of the story. A human reads it.'],
  ['₹300', 'For each guard you bring on who completes their first job, with more at 3, 5 and 10.'],
];

const FAQ = [
  {
    q: 'What happens if the guard doesn’t show up?',
    a: 'Report it in the app and the penalty is calculated from how close to the start time it happened. Inside two hours, the provider forfeits the entire booking value, is suspended for fifteen days and has their PSARA privileges blocked. A support case is opened for you at the same time — you don’t have to chase anyone.',
  },
  {
    q: 'Can I meet or verify the guard before the shift?',
    a: 'You can see their profile, ratings, experience, badges and verification status before booking. Their phone number and address unlock once payment is made, and you can message them in the app from that point until the booking closes.',
  },
  {
    q: 'Is the armed guard’s firearm licence actually checked?',
    a: 'Yes, and not just once. The provider uploads it during KYC and it is verified by our compliance team, then re-confirmed at the point the booking is assigned. A gunman booking cannot proceed without a current verified licence on file.',
  },
  {
    q: 'How do I get my money back if I cancel?',
    a: 'Refunds go to your SecureCoins balance, usually within 24 hours: 90% if you cancel more than 24 hours before the start, 50% between 12 and 24 hours, nothing inside 12 hours. Coins are worth ₹1 each and can be spent on any future booking with no cap.',
  },
  {
    q: 'Do you give a GST invoice I can claim?',
    a: 'Every booking generates an itemised tax invoice the moment payment is captured. If your account is registered as a business with a GSTIN, the invoice is addressed to it and states the applicable regime — forward charge or reverse charge — explicitly.',
  },
  {
    q: 'I run a security agency. Can I put my whole team on this?',
    a: 'Yes. Register as a firm, complete the agency KYC once, then assign staff per booking with their credentials attached. Registered firms have TCS withheld at 1% and appear in our monthly GSTR-8 filing, so your tax position is documented rather than reconstructed later.',
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.4 6.4 12 13 4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <header className="hero" id="top">
        <div className="hero__glow" />
        <div className="wrap hero__in">
          <div className="stack g-28">
            <p className="eyebrow">For clients &middot; PSARA-licensed providers</p>
            <h1>
              Book a guard you can <em>verify</em>, not just hope shows up.
            </h1>
            <p className="hero__sub">
              Every provider is PSARA-licensed and KYC-checked before you ever see their profile.
              Your address and threat details stay sealed until payment is secured &mdash; so only a
              committed provider ever sees them.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href="#book">Book verified security</Link>
              <Link className="btn btn--ghost" href="#trust">See how we verify</Link>
            </div>
            <p className="hero__fine">No cash at the gate &middot; Itemised tax invoice on every booking</p>
          </div>

          <DutyTicket />
        </div>
      </header>

      {/* ---------- credential ticker ---------- */}
      <section className="creds">
        <div className="wrap creds__in">
          {CREDENTIALS.map((c) => (
            <span className="cred" key={c}>{c}</span>
          ))}
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className="band band--paper" id="services">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What you can book</p>
            <h2>Four categories. Each with its own bar to clear.</h2>
            <p className="lede">
              A gate guard and an armed PSO are not the same hire, so we don&rsquo;t verify them the
              same way. The heavier the responsibility, the more paperwork a provider has to satisfy
              before they appear in your search results.
            </p>
          </Reveal>

          <Reveal className="svcs">
            {SERVICES.map((s) => (
              <article className="svc" key={s.code}>
                <span className="svc__code">{s.code}</span>
                <h3>{s.name}</h3>
                <p className="svc__body">{s.body}</p>
                <p className="svc__req">{s.req}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- lifecycle ---------- */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The duty log</p>
            <h2>One booking, six proven states.</h2>
            <p className="lede">
              Every duty moves through the same verified sequence &mdash; nothing skips a step, and
              nothing is marked done without proof.
            </p>
          </Reveal>

          <Reveal as="ol" className="log">
            {LIFECYCLE.map((s, i) => (
              <li className="log__row" key={s.state}>
                <span className="log__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="log__state">{s.state}</span>
                <p className="log__d">{s.d}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="subhead">
            <p className="eyebrow">Payment release</p>
            <h3>Money moves only when the state before it is proven.</h3>
          </Reveal>

          <Reveal className="log log--money">
            {TRANCHES.map((t) => (
              <div
                className={`log__row${t.verified ? ' log__row--verified' : ''}`}
                key={t.when}
              >
                <span className="log__n">{t.n}</span>
                <span className="log__state">{t.when}</span>
                <p className="log__d">{t.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- trust ---------- */}
      <section className="band band--paper" id="trust">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Trust &amp; compliance</p>
            <h2>The rules are in the software, not in a policy document.</h2>
            <p className="lede">
              A promise you have to enforce by hand is not a protection. These are constraints the
              platform applies on every single booking, whether or not anyone is watching.
            </p>
          </Reveal>

          <Reveal className="trust">
            {TRUST.map((t) => (
              <article className="tcard" key={t.k}>
                <span className="tcard__k">{t.k}</span>
                <h3>{t.h}</h3>
                <p className="tcard__b">{t.b}</p>
              </article>
            ))}
          </Reveal>

          <Reveal style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>If a guard doesn&rsquo;t turn up</p>
            <h3 style={{ fontSize: 'clamp(1.35rem,2.4vw,1.75rem)', maxWidth: '24ch' }}>
              Consequences are automatic and scaled to how much notice you were given.
            </h3>
            <div className="tiers">
              <div className="tier">
                <span className="tier__l">Level 1 &middot; Late arrival</span>
                <div className="tier__h">20% deducted, minimum &#8377;300</div>
                <p className="tier__d">A formal warning on the provider&rsquo;s record. No suspension.</p>
              </div>
              <div className="tier tier--l2">
                <span className="tier__l">Level 2 &middot; No-show, over 2 hours&rsquo; notice</span>
                <div className="tier__h">50% deducted</div>
                <p className="tier__d">Account suspended for three days while the case is reviewed.</p>
              </div>
              <div className="tier tier--l3">
                <span className="tier__l">Level 3 &middot; No-show inside 2 hours</span>
                <div className="tier__h">100% deducted</div>
                <p className="tier__d">
                  Fifteen-day suspension, PSARA privileges blocked, and a support case opened for you
                  automatically.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section className="band band--ink-2" id="pricing">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Pricing</p>
            <h2>Every rupee on the invoice, named.</h2>
            <p className="lede">
              The guard sets their own day rate. We add a platform fee and the tax we are legally
              required to collect &mdash; and we show you all of it before you pay, not after.
            </p>
          </Reveal>

          <div className="inv-grid">
            <Reveal className="invoice">
              <div className="invoice__hd">
                <span className="invoice__ttl">Sample tax invoice</span>
                <span className="invoice__ref">Guard &middot; 2 days &middot; &#8377;2,000/day</span>
              </div>
              <div className="rows">
                {INVOICE_ROWS.map(([k, sub, v]) => (
                  <div className="row" key={k}>
                    <span className="row__k">
                      {k}
                      <small>{sub}</small>
                    </span>
                    <span className="row__v">{v}</span>
                  </div>
                ))}
                <div className="row row--total">
                  <span className="row__k">Total payable</span>
                  <span className="row__v">&#8377;5,487.00</span>
                </div>
              </div>
              <div className="invoice__ft">
                <p>
                  Night shift or under four hours&rsquo; notice adds a 20% surcharge each. Registered
                  businesses get a GSTIN-addressed invoice they can claim against.
                </p>
              </div>
            </Reveal>

            <Reveal className="split">
              <div>
                <p className="eyebrow" style={{ marginBottom: 12 }}>The other side of the same invoice</p>
                <p className="split__note">
                  On that booking the guard receives <b>&#8377;3,292</b> &mdash; <b>&#8377;987.60</b>{' '}
                  the moment their start code is verified, and <b>&#8377;2,304.40</b> two days after
                  the shift ends. We publish this because a guard who knows exactly what they&rsquo;re
                  taking home is a guard who turns up.
                </p>
              </div>

              <div>
                <p className="eyebrow" style={{ marginBottom: 12 }}>Two kinds of credit, deliberately kept apart</p>
                <div className="wallet">
                  <div className="coin">
                    <span className="coin__n">SecureCoins</span>
                    <p className="coin__d">
                      What a cancellation refund comes back as. &#8377;1 each, no cap, applied to your
                      total like cash.
                    </p>
                  </div>
                  <div className="coin">
                    <span className="coin__n">SecurePoints</span>
                    <p className="coin__d">
                      Earned from referrals and loyalty. Applied before tax, so they cut your GST too
                      &mdash; up to 20% of a booking.
                    </p>
                  </div>
                </div>
                <p className="split__note" style={{ marginTop: 14 }}>
                  They are not interchangeable, and that is on purpose: one is a discount in the eyes
                  of the tax law, the other is a way to pay. Merging them would quietly misstate what
                  you owe.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- business ---------- */}
      <section className="band" id="business">
        <div className="wrap biz">
          <Reveal className="stack g-28">
            <p className="eyebrow">For business</p>
            <h2>Standing deployments, one invoice trail.</h2>
            <p className="lede">
              Malls, warehouses, hospitals, construction sites and event companies run security as a
              schedule, not a one-off. Set it once and let the compliance take care of itself.
            </p>
            <div className="checks">
              {BUSINESS_CHECKS.map((c, i) => (
                <div className="check" key={i}>
                  <Tick />
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href="#book">Talk to our business team</Link>
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 20 }}>Compliance handled for you</p>
            <div className="log log--narrow">
              {COMPLIANCE.map((c) => (
                <div className="log__row" key={c.state}>
                  <span className="log__state">{c.state}</span>
                  <p className="log__d">{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- provider teaser ---------- */}
      <section className="band band--paper" id="providers">
        <div className="wrap join">
          <Reveal className="stack g-28">
            <p className="eyebrow">For guards, bouncers and agencies</p>
            <h2>Get paid in two days. Not in ninety.</h2>
            <p className="lede">
              Set your own rate, pick your own days, and get paid on a schedule you can actually plan
              around. Joining is free &mdash; you clear KYC once and start taking work.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href="/join">Join as a provider</Link>
              <Link className="btn btn--outline" href="#faq">How the payouts work</Link>
            </div>
            <p className="eyebrow">Hindi &amp; English &middot; WhatsApp support during onboarding</p>
          </Reveal>

          <Reveal className="perks">
            {PERKS.map(([n, d]) => (
              <div className="perk" key={n}>
                <span className="perk__n">{n}</span>
                <p className="perk__d">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="band band--ink-2" id="faq">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Questions</p>
            <h2>Before you book.</h2>
          </Reveal>
          <Reveal className="faq">
            {FAQ.map((f) => (
              <details className="qa" key={f.q}>
                <summary>{f.q}</summary>
                <p className="qa__a">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- final cta ---------- */}
      <section className="band" id="book">
        <Reveal className="wrap final">
          <div className="final__copy">
            <p className="eyebrow">Get started</p>
            <h2 style={{ maxWidth: '18ch' }}>Put a verified guard on your gate this week.</h2>
            <p className="lede">
              Download the app, tell us what you need, and we&rsquo;ll match you with licensed
              providers in your city. You approve the provider, you pay in the app, and you
              issue the code that starts the duty.
            </p>
            <div className="final__ctas">
              <a className="btn btn--primary" href="#">Download for iPhone</a>
              <a className="btn btn--ghost" href="#">Download for Android</a>
            </div>
            <p className="hero__fine">
              Are you a guard or an agency?{' '}
              <Link href="/join" style={{ color: 'var(--amber)' }}>Join as a provider</Link>
            </p>
          </div>

          <AppPreview />
        </Reveal>
      </section>
    </>
  );
}
