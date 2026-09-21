# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Clients** — individuals and businesses in India who need to hire private security (a
gate guard, event bouncers, an armed gunman for cash/industrial risk, or a personal
security officer for close protection). They are buying *safety* from a stranger they've
never met and need to be reassured before they'll pay. Today they hire security by making
"ten calls, four quotes, zero paperwork" — the product replaces that with one place to
compare PSARA-verified providers, see the price upfront, and book in minutes.

**Providers** — guards, bouncers, armed gunmen, PSOs and the agencies that employ them.
They are buying *income* and need the numbers (payout speed, take rate, how fast they get
paid) up front, not reassurance. Per `README.md`: "The two funnels are deliberately
different in register... Do not merge them into one page." `/join` is the dedicated
supply-funnel page (bilingual EN/हिंदी, mobile-first, WhatsApp CTA); the homepage is the
client-facing demand funnel and currently carries only a small provider teaser band
linking out to `/join`.

## Product Purpose

20fourr is a marketplace that lets a client hire PSARA-licensed private security
personnel — guards, bouncers, armed gunmen, personal security officers — with the
provider's licence, identity, and background verified before they're bookable, the price
shown before booking, payment and an OTP-gated duty log (start/end codes) replacing cash
and informal hiring, and a tracked dispute process if something goes wrong. Success is a
client completing a booking with justified confidence in who is showing up, and a
provider getting paid reliably and quickly for real duty performed.

## Positioning

The mechanism a competitor can't casually copy: verification is enforced by the platform,
not promised in a policy document. A provider cannot appear in search without PSARA
licence + KYC + police verification cleared by a human compliance reviewer; a lapsed
licence auto-blocks new bookings without waiting on admin discretion; a duty only starts
and ends against OTP codes, so "the guard showed up" and "the guard left" are logged
events, not someone's word; disputes become tracked tickets with an assigned reviewer,
not an inbox. The site's own stated design principle (`app/globals.css`, code comments)
is to show this mechanism as real product screens — including the two disclaimer/risk-
acknowledgment screens with disabled Continue buttons — rather than assert it in
marketing copy.

## Operating Context

- Legal basis: the Private Security Agencies (Regulation) Act, 2005 (PSARA) governs who
  may lawfully supply private security personnel in India; the site cites it directly
  (accountability section, badge provenance).
- Two live product surfaces the marketing site talks to (as external links only, no
  shared backend): `client.20fourr.com` and `provider.20fourr.com` — both are browser web
  apps standing in for native apps still in App Store / Play review, so on-site copy says
  "open in browser," not "download."
- Company: Indorize Technologies Pvt. Ltd., Miyawala, Dehradun, Uttarakhand — 248001.
- Coverage cities gate on a minimum-provider-count threshold in `app/sitemap.js`
  (`MIN_PROVIDERS_FOR_LISTING`) before a city is linked from the homepage or indexed —
  currently Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad.
- Cancellation policy is on a published clock: >24h out = 90% refund, 12–24h = 50%,
  <12h = 0%.

## Capabilities and Constraints

- Stack: Next.js 15 (App Router), React 19, plain CSS (no Tailwind) — a hand-built token
  system in `app/globals.css`. Every page prerenders to static HTML; the marketing site
  has no backend of its own.
- Booking flow shown on-site: search → price shown → two mandatory disclaimer screens
  (Continue is genuinely disabled until acknowledged) → payment → OTP starts duty → OTP
  ends duty → payout. This is real product UI (screenshots), not illustration.
- Badge vocabulary (Verified identity, Background verified, PSARA verified, Firearms
  authorised, Ex-serviceman, Top rated, Elite protection, "no badge shown") is shared
  verbatim between the homepage and the live provider-directory chips — a visitor who
  clicks through must meet the same words, not a marketing paraphrase of them.
- Native iOS/Android apps are in store review; the web apps are the only "get the app"
  destination right now. This is a temporary constraint, not a permanent architecture
  decision — copy and CTAs should stay easy to update when native apps ship.
- Undecided/not yet supplied: a real WhatsApp support number for `/join` (currently a
  placeholder, `910000000000`, in `app/join/content.js` — do not treat as real or ship
  further UI implying it works until the client supplies a real one).

## Brand Commitments

- Visual system is fixed and out of scope for the redesign: ink ground / paper bands /
  amber as the single saturated accent, green reserved exclusively for "verified" states,
  Big Shoulders (display, light/uppercase) + IBM Plex Sans (body) + IBM Plex Mono (every
  code, timestamp, OTP digit, and **every button label**) + IBM Plex Sans Devanagari for
  `[lang="hi"]`. Full token table lives in `README.md` and `app/globals.css`.
- Voice: terse, legalistic-precise, unafraid of naming its own limits ("We are not an
  emergency service," "A verified badge does not predict behaviour"). Candor about limits
  is treated as a trust-building device, not a liability to soften.
- Standing client instruction (confirmed in a prior session, not to be re-litigated
  without the client's explicit input): sell the real mechanism, never fabricate scale or
  social proof. No invented stats, review counts, or testimonial quotes may ship before
  the client supplies real ones.

## Evidence on Hand

- Real app screenshots for the booking flow and duty lifecycle exist under `public/`
  (bookings, duty) and are already used on the homepage — this is genuine product
  evidence, not staged photography, and should be preserved/reused rather than replaced
  with stock imagery.
- No real user counts, review counts, or testimonial quotes exist yet. Per the standing
  instruction above, these sections were deliberately left out of the 2026-09 redesign
  pass rather than filled with placeholders, and remain blocked on the client supplying
  real numbers/quotes.
- A prior UX critique of this homepage (`.impeccable/critique/2026-09-18T20-15-18Z__app-page-js.md`)
  is on file, scoring the page 24/32 on Nielsen heuristics — strong on domain-specific
  copy and mechanism-honesty, weak on page-level information architecture (four
  non-cumulative trust sections, three unranked audiences sharing one scroll, an
  undifferentiated final CTA).

## Product Principles

1. Verification is a platform-enforced mechanism, not a marketing claim — every trust
   assertion on the site should be traceable to an actual system behavior (compliance
   review, OTP gate, auto-block on licence lapse), not an unverifiable adjective.
2. Candor about limits builds more trust than a wall of checkmarks — for a client hiring
   an armed stranger, admitting what verification does *not* guarantee is core content,
   not a legal-team afterthought to bury.
3. Clients and providers are different audiences buying different things (safety vs.
   income) and should not be forced through the same register on the same page — the
   homepage is the demand funnel; `/join` is the supply funnel.
4. Never fabricate scale, social proof, or completion to fill a gap — an honest absence
   beats an invented number, always.
5. Show the real product wherever possible instead of describing it — actual app screens,
   actual disabled-button states, actual OTP flow — because the product's own honesty is
   the strongest marketing asset it has.

## Accessibility & Inclusion

No formal standard mandated beyond WCAG AA baseline. Current implementation (confirmed
live via automated + manual pass) already provides: labeled form controls, correct
heading order, descriptive alt text on all images, and visible focus rings on every
interactive element checked — these should be preserved, not just inherited, through any
redesign work.
