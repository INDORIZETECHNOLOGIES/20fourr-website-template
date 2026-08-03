import Link from 'next/link';
import Reveal from '@/components/Reveal';
import DutyTicket from '@/components/DutyTicket';
import AppPreview from '@/components/AppPreview';
import ProviderReel from '@/components/ProviderReel';

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

/* The complete badge vocabulary — these seven are exactly BADGE_LABEL in
   security-providers/data.js, so a visitor who clicks through to the directory
   meets the same words on the provider chips. The eighth card is the absent
   badge: a list of things we check reads as a list of things every provider has
   unless the page says otherwise, and it does not.
   `m` is the provenance line — who did the checking and when, which is the part
   that makes a badge a claim about a document rather than about a person. */
const BADGES = [
  {
    k: 'Verified identity',
    b: <>Government photo ID checked against the person or entity applying, and approved by our compliance team.</>,
    m: <>Checked by <b>compliance team</b> &middot; at onboarding</>,
  },
  {
    k: 'Background verified',
    b: <>Police verification on file and read by an admin before the provider is allowed to appear in search results.</>,
    m: <>Checked by <b>admin review</b> &middot; before listing</>,
  },
  {
    k: 'PSARA verified',
    b: <>Holds a current licence under the Private Security Agencies (Regulation) Act, 2005, with expiry tracked on a rolling basis.</>,
    m: <>Checked by <b>compliance team</b> &middot; re-checked on expiry</>,
  },
  {
    k: 'Firearms authorised',
    b: <>Holds a valid individual weapon licence, verified separately from the agency licence. Required for any armed booking.</>,
    m: <>Checked <b>independently</b> &middot; per officer</>,
  },
  {
    k: 'Ex-serviceman',
    b: <>Discharge or retirement certificate from the armed forces or police on file and verified.</>,
    m: <>Checked by <b>compliance team</b> &middot; document-backed</>,
  },
  {
    k: 'Top rated',
    b: <>Averages 4.5 or higher across at least five completed bookings. It cannot be bought, and it is removed automatically if the average drops.</>,
    m: <>Computed from <b>client ratings</b> &middot; live</>,
  },
  {
    k: 'Elite protection',
    b: <>Our highest verification tier, reserved for close-protection specialists who clear every check above plus an assignment history review.</>,
    m: <>Highest tier &middot; <b>manual approval</b></>,
  },
  {
    k: 'No badge shown',
    b: <>If a badge is absent, that check has not been cleared. We show what has been verified rather than implying everything has.</>,
    m: <>Absence is <b>information</b>, not an oversight</>,
  },
];

/* The badge section's three claims, set beside the lede. Deliberately blunt and
   unqualified — every one of them is discharged by a card in the grid below, so
   the column states the promise and the grid shows the receipts. */
const CLAIMS = [
  <><em>Verified</em> means verified.</>,
  <>Checked before they&rsquo;re listed.</>,
  <>We check the papers, not just the profile.</>,
];

// The compliance guarantees, run through the same log.
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

/* Escalation and statute, in the same card grid the provider perks use. The key
   is a mono tag rather than a figure here — these are named consequences, not
   amounts, and the column is short either way. */
const ACCOUNTABILITY = [
  ['Falsified', 'Falsified documents result in immediate and permanent removal from the platform.'],
  ['Delisting', 'Repeated no-shows or persistently poor ratings lead to delisting.'],
  [
    'Evidence',
    'Check-in and check-out are recorded against the shift you paid for, so attendance is evidence rather than opinion.',
  ],
  [
    'PSARA 2005',
    'The Private Security Agencies (Regulation) Act, 2005 governs who may lawfully supply private security personnel in India.',
  ],
  [
    'Pre-listing',
    '20fourr verifies each provider’s PSARA licence before listing them, and re-checks expiry on a rolling basis.',
  ],
  [
    'On lapse',
    'When a licence lapses, the provider is blocked from search and from accepting new bookings automatically — not at an admin’s discretion — until the renewed licence is verified.',
  ],
];

/* Title and description are inherited from the root layout; this exists so the
   home page states its own canonical like every other route does. Without it a
   crawler that arrives on a tracking-parameter variant has nothing telling it
   which URL is the real one. */
export const metadata = {
  alternates: { canonical: '/' },
};

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
              One platform to hire <em>verified</em>, security guards, bouncers and armed personnel anywhere in India.
            </h1>
            <p className="hero__sub">
              Ten calls, four quotes, zero paperwork — that’s how security gets hired today. <b>20fourr</b> puts every PSARA-verified agency and officer in one place, so you see the price upfront and book in minutes.
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

          {/* The lede caps at 62ch, which left the right half of this row empty on
              anything wider than a laptop. These three claims fill it — and they
              are the paragraph's argument stated flat, so the column earns its
              width rather than padding it. */}
          <Reveal className="subhead subhead--split">
            <div className="subhead__copy">
              <p className="eyebrow">Trust badges</p>
              <h3>Badges are earned, never self-declared.</h3>
              <p className="lede">
                Every badge below is computed from documents a 20fourr admin has reviewed and
                approved. A provider cannot switch one on for themselves, and a badge disappears
                automatically the moment the underlying document expires or is revoked.
              </p>
            </div>

            <ul className="claims">
              {CLAIMS.map((c, i) => (
                <li className="claim" key={i}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="badges">
            {BADGES.map((b) => (
              <article className="bcard" key={b.k}>
                <h3 className="bcard__k">{b.k}</h3>
                <p className="bcard__b">{b.b}</p>
                <p className="bcard__m">{b.m}</p>
              </article>
            ))}
          </Reveal>

          {/* Closes the badge grid with the one thing the grid implies but never
              says: the badges are on the listings, so go read them. Centred and
              ruled off — the only centred block on the page, which is what makes
              it read as a stop rather than another row. */}
          <Reveal className="pricecta">
            <h2>
              Know the price. <em>Then decide.</em>
            </h2>
            <p className="lede">
              Compare ratings. Pick your agency or individuals. Set your dates. See just the price
              &mdash; in <b>seconds</b>.
            </p>
            <Link className="btn btn--primary btn--lg" href="/security-providers">
              Compare security agencies
            </Link>
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
            <p className="eyebrow" style={{ marginBottom: 14 }}>Read this before you book</p>
            <h3 style={{ fontSize: 'clamp(1.35rem,2.4vw,1.75rem)', maxWidth: '24ch' }}>
              What verification does not mean.
            </h3>
            <p className="lede" style={{ marginTop: 12, maxWidth: '62ch' }}>
              Being straight about the limits is part of being trustworthy. Verification is a check
              on documents and history &mdash; it is not a guarantee of future conduct, and no
              platform can honestly claim otherwise.
            </p>
            {/* Three limits, not three severities — see the note on .tier--note. */}
            <div className="tiers">
              <div className="tier tier--note">
                <span className="tier__l">Who performs the duty</span>
                <div className="tier__h">20fourr is a technology platform</div>
                <p className="tier__d">
                  The security services themselves are performed by independent, PSARA-licensed
                  agencies and their personnel, and responsibility for their conduct on duty sits
                  with them.
                </p>
              </div>
              <div className="tier tier--note">
                <span className="tier__l">Emergencies</span>
                <div className="tier__h">We are not an emergency service</div>
                <p className="tier__d">
                  In an emergency, contact the police on 112 first, then raise an incident on your
                  booking so the record, the agency and our compliance team stay aligned.
                </p>
              </div>
              <div className="tier tier--note">
                <span className="tier__l">What a badge proves</span>
                <div className="tier__h">A document was checked on a date</div>
                <p className="tier__d">
                  A verified badge does not predict behaviour. Ratings, check-in records and the
                  incident process exist precisely because paperwork alone is not enough.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- accountability ----------
          Follows the verification limits deliberately: having just said what a
          badge does not prove, this is the route when the gap shows up on a real
          booking, and the statute the whole listing rests on. */}
      <section className="band band--ink-2" id="report">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Report a concern &middot; PSARA compliance</p>
            <h2>If something is wrong, there is one route.</h2>
            <p className="lede">
              An officer who did not report, conduct you are unhappy with, or a document you believe
              is not genuine &mdash; raise it against the booking. It reaches our compliance team
              and the agency at the same time, with the booking record attached.
            </p>
          </Reveal>

          <Reveal className="perks perks--wide">
            {ACCOUNTABILITY.map(([n, d]) => (
              <div className="perk" key={n}>
                <span className="perk__n">{n}</span>
                <p className="perk__d">{d}</p>
              </div>
            ))}
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
              {/* The FAQ moved to its own route; this lands on the agency group
                  rather than the top of a seven-section page. */}
              <Link className="btn btn--outline" href="/faqs#for-providers">Questions from agencies</Link>
            </div>
            <p className="eyebrow">Hindi &amp; English &middot; WhatsApp support during onboarding</p>
          </Reveal>

          <Reveal>
            <ProviderReel />
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
