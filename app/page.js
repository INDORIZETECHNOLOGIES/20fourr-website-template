import Link from 'next/link';
import { CLIENT_APP_URL, CLIENT_PLAY_URL, PROVIDER_APP_URL, PROVIDER_PLAY_URL } from '@/app/site';
import PlayStoreButton from '@/components/PlayStoreButton';
import Reveal from '@/components/Reveal';
import DutyTicket from '@/components/DutyTicket';
import AppPreview from '@/components/AppPreview';
import BookingSteps from '@/components/BookingSteps';
import DutySteps from '@/components/DutySteps';
import ProviderReel from '@/components/ProviderReel';
import HeroBooking from '@/components/HeroBooking';
import StickyBookBar from '@/components/StickyBookBar';
import HomeFaq from '@/components/HomeFaq';
import {
  LockIcon,
  BriefingIcon,
  ClockIcon,
  ScaleIcon,
  BadgeIcon,
  SirenIcon,
  DocStampIcon,
} from '@/components/TrustIcons';

/* Merged: was two separate arrays (SERVICE_INTENTS for search cards + SERVICES
   for the badge/req cards). Now one source of truth per category. The duplicate
   section has been removed from the JSX — all four fields render in one grid. */
const MERGED_SERVICES = [
  {
    code: 'GRD',
    title: 'Private security agency services',
    name: 'Security guard',
    body: 'Static post and gate duty for buildings, sites, warehouses and offices. Compare PSARA-verified agencies for manned guarding, gate security and warehouse protection.',
    req: 'PSARA licence · Govt ID · Live selfie',
    href: '/security-providers?category=guard',
    label: 'Browse security guards',
  },
  {
    code: 'BNC',
    title: 'Event security services',
    name: 'Bouncer',
    body: 'Crowd control and door management for clubs, concerts, weddings and large private functions.',
    req: 'PSARA licence · Govt ID · Live selfie',
    href: '/security-providers?category=bouncer',
    label: 'Browse event security',
  },
  {
    code: 'GUN',
    title: 'Armed security and gunman services',
    name: 'Armed gunman',
    body: 'Licensed armed protection for cash movement, industrial sites and elevated-risk premises. Firearm licence checked separately from PSARA credentials.',
    req: 'Firearm licence verified per booking · PSARA',
    href: '/security-providers?category=gunman',
    label: 'Browse armed security',
  },
  {
    code: 'PSO',
    title: 'Executive protection',
    name: 'Personal security officer',
    body: 'Dedicated close protection and travel escort for individuals facing a named or credible threat.',
    req: 'Highest tier · PSARA re-checked per booking',
    href: '/security-providers?category=pso',
    label: 'Browse personal security officers',
  },
];

// Every city here has to clear app/sitemap.js's MIN_PROVIDERS_FOR_LISTING
// gate — Jaipur used to be listed here but only has 2 primary-city providers,
// so the homepage was linking to a page the sitemap deliberately excludes as
// too thin to index. Kolkata has 3 and is already in the sitemap.
const COVERAGE_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

/* Trust chips shown inline under the hero CTA — same claims as the old
   credentials ticker but surfaced at point-of-action, not two scrolls below. */
const HERO_CHIPS = [
  'PSARA-licensed providers only',
  'KYC verified',
  'Address hidden until payment',
  'GST invoice on every booking',
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

// The compliance guarantees, run through the same log. "Verification" and
// "Disputes" used to be their own cards here — the first said nothing BADGES
// doesn't already prove, and the second said nothing ACCOUNTABILITY doesn't
// already own; both were cut rather than repeated. See ACCOUNTABILITY's
// "Evidence" entry for where the dispute-process specifics live now.
const TRUST = [
  {
    k: 'Contact privacy',
    h: 'Numbers stay hidden until you pay',
    b: <>A provider cannot see your address and you cannot see their number until the booking is paid. That keeps deals on the platform, which is what keeps the licence checks, the insurance trail and the dispute route intact.</>,
    Icon: LockIcon,
  },
  {
    k: 'Threat brief',
    h: 'They arrive knowing what they’re walking into',
    b: <>If you&rsquo;ve been threatened or attacked before, you record it once in your profile. It&rsquo;s released to the assigned provider <b>after payment only</b>: late enough to protect you, early enough for them to prepare.</>,
    Icon: BriefingIcon,
  },
  {
    k: 'Cancellation',
    h: 'Refunds on a published clock',
    b: <>Cancel more than 24 hours out and <b>90%</b> comes back to your wallet; between 12 and 24 hours, <b>50%</b>. Inside 12 hours there is no refund, because by then the guard has already turned down other work.</>,
    Icon: ClockIcon,
  },
  {
    k: 'Ratings',
    h: 'Both directions',
    b: <>You rate the guard on professionalism, punctuality, communication and compliance, and they rate you too. Ratings follow the account, so repeat behaviour is visible before anyone accepts.</>,
    Icon: ScaleIcon,
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
    'Check-in and check-out are recorded against the shift you paid for. Raise a dispute and it becomes a tracked ticket with an assigned reviewer, the full chat record, and a resolution: refund, credit, replacement or penalty.',
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
    'When a licence lapses, the provider is blocked from search and from accepting new bookings automatically, without waiting on an admin’s discretion, until the renewed licence is verified.',
  ],
];

/* Title and description are inherited from the root layout; this exists so the
   home page states its own canonical like every other route does. Without it a
   crawler that arrives on a tracking-parameter variant has nothing telling it
   which URL is the real one. */
export const metadata = {
  title: 'Private Security Services in India | Verified Guards, Bouncers & PSOs',
  description:
    'Find PSARA-verified private security agency services in India: manned guarding, event security, armed security and executive protection. Compare providers and book online.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Private Security Services in India | 20fourr',
    description:
      'Compare PSARA-verified security guards, bouncers, armed security providers and personal security officers across India.',
  },
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
              Private security services with <em>verified</em> guards, bouncers and armed personnel anywhere in India.
            </h1>
            <p className="hero__sub">
              Ten calls, four quotes, zero paperwork. That’s how security gets hired today. <b>20fourr</b> puts every provider licensed under <abbr title="Private Security Agencies (Regulation) Act, 2005">PSARA</abbr>, India’s law on who may supply private security, in one place, so you see the price upfront and book in minutes.
            </p>
            <HeroBooking cities={COVERAGE_CITIES} />
            {/* Trust chips: same claims as the credentials ticker, now at
                point-of-action — trust and CTA in the same viewport. */}
            <ul className="hero__chips" aria-label="Platform guarantees">
              {HERO_CHIPS.map((c) => (
                <li className="hero__chip" key={c}>{c}</li>
              ))}
            </ul>
            <p className="hero__fine">No cash at the gate</p>
          </div>

          <DutyTicket />
        </div>
      </header>

      <StickyBookBar />

      {/* Credentials ticker removed — the same claims now live as chips
          directly under the hero CTA (see hero__chips above), so repeating
          them in a separate band two sections later was pure duplication. */}

      {/* ---------- services (merged) ----------
          One card per category: code badge, name, description, verification
          requirements, and the browse link — previously split across two
          separate sections (SERVICE_INTENTS cards + SERVICES cards). */}
      <section className="band" id="services">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Security services</p>
            <h2>Four categories. Each with its own bar to clear.</h2>
            <p className="lede">
              A gate guard and an armed PSO are not the same hire, so we don&rsquo;t verify them the
              same way. The heavier the responsibility, the more paperwork a provider has to satisfy
              before they appear in your search results.
            </p>
          </Reveal>

          <Reveal className="svcs">
            {MERGED_SERVICES.map((s, i) => (
              <article className={`svc svc--l${i + 1}`} key={s.code}>
                <span className="svc__code">{s.code}</span>
                <h3>{s.name}</h3>
                <p className="svc__body">{s.body}</p>
                <p className="svc__req">{s.req}</p>
                <Link className="text-link" href={s.href}>{s.label} &rarr;</Link>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- how it works ----------
          Sits between "what you can hire" and "what happens on duty", because
          that is the order the question arrives in: the visitor now knows the
          categories and wants to see what booking one actually looks like. */}
      <section className="band band--ink-2" id="app">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">How it works</p>
            <h2>Every screen between search and payment.</h2>
            <p className="lede">
              These are the client app&rsquo;s own screens, in the order you meet them. A booking
              is priced before it is placed, and it does not move past the two disclaimer
              screens until you have read and ticked both.
            </p>
          </Reveal>

          <Reveal>
            <BookingSteps />
          </Reveal>
        </div>
      </section>

      {/* ---------- trust sequence, part 1: what's checked ----------
          The duty log, the badges that gate a listing, and the guarantees that
          apply on every booking, in one continuous band rather than three
          separately-introduced ones — they are one argument (what is checked
          and enforced before and during a duty), not three. */}
      <section className="band" id="how">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The duty log</p>
            <h2>One booking, proven at every state.</h2>
            <p className="lede">
              Requesting and paying happen on the screens above. From there the duty runs on
              proof: a provider accepts it, a code opens and closes the shift, and both
              sides rate each other. Nothing skips a step, and nothing is marked done without
              a record.
            </p>
          </Reveal>

          <Reveal>
            <DutySteps />
          </Reveal>

          <Reveal className="subhead anchor" id="trust">
            <p className="eyebrow">Trust badges</p>
            <h3>Badges are earned, never self-declared.</h3>
            <p className="lede">
              Every badge below is computed from documents a 20fourr admin has reviewed and
              approved. A provider cannot switch one on for themselves, and a badge disappears
              automatically the moment the underlying document expires or is revoked.
            </p>
          </Reveal>

          {/* Badges → accordion: 8 full-height cards replaced by a compact
              list, one expanded at a time. First item open by default. */}
          <Reveal className="acc-list">
            {BADGES.map((b, i) => (
              <details className="acc" key={b.k} open={i === 0 || undefined}>
                <summary className="acc__sum">
                  <span className="acc__label">{b.k}</span>
                  <span className="acc__meta">{b.m}</span>
                </summary>
                <p className="acc__body">{b.b}</p>
              </details>
            ))}
          </Reveal>

          <Reveal className="subhead">
            <p className="eyebrow">Enforced on every booking</p>
            <h3>The rules are in the software, not in a policy document.</h3>
            <p className="lede">
              A promise you have to enforce by hand is not a protection. These run on every
              single booking, whether or not anyone is watching.
            </p>
          </Reveal>

          {/* Trust guarantees → accordion: 4 full-height cards replaced by
              a compact list matching the badge accordion pattern above. */}
          <Reveal className="acc-list">
            {TRUST.map((t, i) => (
              <details className="acc" key={t.k} open={i === 0 || undefined}>
                <summary className="acc__sum">
                  <span className="acc__sum-left">
                    <span className="acc__icon"><t.Icon /></span>
                    <span className="acc__label">{t.h}</span>
                  </span>
                  <span className="acc__tag">{t.k}</span>
                </summary>
                <p className="acc__body">{t.b}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- trust sequence, part 2: what we don't promise ----------
          Named as its own band head rather than a caveat nested inside the
          section above it — being straight about the limits is what makes the
          checks above credible, not a disclaimer to get through. */}
      <section className="band band--paper" id="limits">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Read this before you book</p>
            <h2 style={{ maxWidth: '24ch' }}>What verification does not mean.</h2>
            <p className="lede">
              Being straight about the limits is part of being trustworthy. Verification is a check
              on documents and history. It is not a guarantee of future conduct, and no
              platform can honestly claim otherwise.
            </p>
          </Reveal>

          {/* Tiers → accordion: same three FAQ-shaped items, now collapsed
              by default except the first, matching the badge/trust pattern. */}
          <Reveal className="acc-list">
            {[
              {
                label: 'Who performs the duty',
                tag: '20fourr is a technology platform',
                body: 'The security services themselves are performed by independent, PSARA-licensed agencies and their personnel, and responsibility for their conduct on duty sits with them.',
                Icon: BadgeIcon,
              },
              {
                label: 'Emergencies',
                tag: 'We are not an emergency service',
                body: 'In an emergency, contact the police on 112 first, then raise an incident on your booking so the record, the agency and our compliance team stay aligned.',
                Icon: SirenIcon,
              },
              {
                label: 'What a badge proves',
                tag: 'A document was checked on a date',
                body: 'A verified badge does not predict behaviour. Ratings, check-in records and the incident process exist precisely because paperwork alone is not enough.',
                Icon: DocStampIcon,
              },
            ].map((item, i) => (
              <details className="acc" key={item.label} open={i === 0 || undefined}>
                <summary className="acc__sum">
                  <span className="acc__sum-left">
                    <span className="acc__icon"><item.Icon /></span>
                    <span className="acc__label">{item.tag}</span>
                  </span>
                  <span className="acc__tag">{item.label}</span>
                </summary>
                <p className="acc__body">{item.body}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- trust sequence, part 3: what happens if it's wrong ----------
          Follows the verification limits deliberately: having just said what a
          badge does not prove, this is the route when the gap shows up on a real
          booking, and the statute the whole listing rests on. Closes the whole
          sequence on the price CTA — the one centred block on the page — because
          by here there is nothing left to prove, only a decision to make. */}
      <section className="band band--ink-2" id="report">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Report a concern &middot; PSARA compliance</p>
            <h2>If something is wrong, there is one route.</h2>
            <p className="lede">
              If an officer did not report, you are unhappy with someone&rsquo;s conduct, or you believe
              a document is not genuine, raise it against the booking. It reaches our compliance team
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

          <Reveal className="pricecta">
            <h2>
              Know the price. <em>Then decide.</em>
            </h2>
            <p className="lede">
              Compare ratings. Pick your agency or individuals. Set your dates. See the price
              in <b>seconds</b>.
            </p>
            <Link className="btn btn--primary btn--lg" href="/security-providers">
              Compare security agencies
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="band" id="coverage">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Local coverage</p>
            <h2>Browse verified security providers by city.</h2>
            <p className="lede">
              Check live provider coverage in major Indian cities. Select a city to compare the
              security services currently available there.
            </p>
          </Reveal>
          <Reveal className="city-links">
            {COVERAGE_CITIES.map((city) => (
              <Link className="city-link" href={`/security-providers?city=${encodeURIComponent(city)}`} key={city}>
                Security services in {city} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <HomeFaq />

      {/* ---------- provider aside ----------
          Moved out from between the accountability section and the coverage
          links, where it interrupted a client's trust-arc reading with an
          unrelated recruitment pitch — and reweighted to read as a brief
          mention rather than a section with equal standing to the client
          content around it: half the band rhythm, an h3 instead of an h2,
          plain ink instead of a paper "document" band. */}
      <section className="band band--ink-2 band--aside" id="providers">
        <div className="wrap join">
          <Reveal className="stack g-16">
            <p className="eyebrow">For guards, bouncers and agencies</p>
            <h3>Get paid in two days. Not in ninety.</h3>
            <p className="lede">
              Set your own rate, pick your own days, and get paid on a schedule you can actually plan
              around. Joining is free. You clear KYC once and start taking work.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--outline" href="/join">Join as a provider</Link>
              <Link className="text-link" href="/faqs#for-providers">Questions from agencies &rarr;</Link>
            </div>
            <p className="eyebrow">Hindi &amp; English &middot; Help with your documents during onboarding</p>
          </Reveal>

          <Reveal>
            <ProviderReel />
          </Reveal>
        </div>
      </section>

      {/* ---------- final cta ----------
          Both buttons are the client app — web and Play — so the provider
          path still steps down to the fine-print line "Join as a provider"
          sits on rather than competing for the highest-intent moment. */}
      <section className="band" id="book">
        <Reveal className="wrap final">
          <div className="final__copy">
            <p className="eyebrow">Get started</p>
            <h2 style={{ maxWidth: '18ch' }}>Put a verified guard on your gate this week.</h2>
            <p className="lede">
              Get the app, tell us what you need, and we&rsquo;ll match you with
              licensed providers in your city. You approve the provider, you pay in the app, and
              you issue the code that starts the duty.
            </p>
            <div className="final__ctas">
              <a
                className="btn btn--primary btn--lg"
                href={CLIENT_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the client app
              </a>
              <PlayStoreButton href={CLIENT_PLAY_URL} />
            </div>
            <p className="hero__fine">
              On Google Play for Android, and in any phone browser. The iPhone app is in App Store review.
              <br />
              Are you a guard or an agency?{' '}
              <Link href="/join">Join as a provider</Link>
              {' '}&middot;{' '}
              <a href={PROVIDER_PLAY_URL} target="_blank" rel="noopener noreferrer">
                Provider app on Google Play
              </a>
              {' '}&middot;{' '}
              <a href={PROVIDER_APP_URL} target="_blank" rel="noopener noreferrer">
                Open in browser
              </a>
            </p>
          </div>

          <AppPreview />
        </Reveal>
      </section>
    </>
  );
}
