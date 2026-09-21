# Homepage Redesign Brief — app/page.js

Produced by `/impeccable shape`, following `/impeccable critique` (snapshot:
`.impeccable/critique/2026-09-18T20-15-18Z__app-page-js.md`, 24/32).

## 1. Job and audience

The homepage is 20fourr's client-facing demand funnel: a person or business in India who
needs to hire verified private security (guard, bouncer, armed gunman, or personal
security officer) and is currently doing it the old way — cold calls, informal quotes, no
paperwork. They land buying *safety* and need to be reassured before they'll pay; a small
subset are guards/agencies who'd rather work here (handled by a one-line teaser routing to
`/join`, the dedicated bilingual supply-funnel page — not by this page).

## 2. Outcome and proof

Primary action: book a verified provider (or reach `/security-providers` to compare).
Success is a client completing that booking with justified confidence in who is showing
up. Real proof on hand: actual client-app screenshots (search → price → two disclaimer
screens with genuinely disabled Continue → payment → OTP-gated duty start/end → payout),
the badge system shared verbatim with the live provider directory, and PSARA statute
citations. No fabricated stats, review counts, or testimonials — none exist yet and none
may be invented (standing client instruction, see `PRODUCT.md` § Product Principles).

## 3. Selected direction

**Visual authority:** unchanged. Ink/paper/amber token system, Big Shoulders/IBM Plex type
stack, one-accent-color discipline — all fixed per `PRODUCT.md` § Brand Commitments. This
is a structural redesign, not a visual-world replacement.

**Structural/interaction thesis:** the duty ticket becomes the spine. Instead of running
the hero's duty-ticket artifact and the trust content below as two unrelated systems, the
page argues its trust case as one continuous sequence anchored to what the ticket already
shows happening (checked → paid → started/ended → resolved-if-wrong), closing on the
site's most persuasive material — the "what verification does not mean" honesty content —
as the deliberate close of the argument rather than a card buried inside it.

**Sequence (preserves existing argument logic — badges → limits → accountability — per
confirmed scope; consolidates the *presentation*, not the underlying order):**

1. **Hero** — keep `HeroBooking` + `DutyTicket` + city picker as-is. Add one inline gloss
   for "PSARA" in the hero or credential strip so a first-time visitor isn't handed
   unexplained jargon before anything else (Jordan persona finding).
2. **Credential strip** — trim from 5 bullets to the 2–3 that earn a first read; the rest
   move into the trust sequence where they're actually substantiated, instead of being
   asserted twice.
3. **Service categories (4-up, `SERVICE_INTENTS`)** — unchanged content; card treatment
   should let visual weight escalate guard → bouncer → gunman → PSO so "the heavier the
   responsibility, the more paperwork" (the lede's own claim) is shown, not just stated in
   the `req` line.
4. **How it works (`BookingSteps`)** — same 8 real screenshots; desktop gets the paced,
   one-step narrative device mobile's `BookingCarousel` already has, replacing
   `PhoneSteps`' flat static grid.
5. **Trust sequence (replaces the current BADGES / limits / ACCOUNTABILITY as three
   separately-introduced same-weight bands with one visually continuous sequence, in
   their existing logical order):**
   a. What's checked — `DutySteps` + `BADGES`, tied explicitly back to duty-ticket rows.
   b. What we don't promise — the "what verification does not mean" tiers, promoted from
      a sub-block inside `#trust` to the sequence's closing, most emotionally weighted
      moment.
   c. What happens if it's wrong — `ACCOUNTABILITY` (PSARA statute, dispute route,
      delisting/falsification consequences), immediately following (b) since it's the
      route when that stated gap shows up on a real booking — this adjacency is
      intentional and already correct in the current code; keep it.
   `TRUST` (contact privacy, threat brief, KYC, cancellation, disputes, ratings) folds
   into this sequence rather than standing as a fourth separate gallery — group by which
   beat (a/b/c) each card actually supports.
6. **Pricing moment (`.pricecta`)** — move to *after* the trust sequence (currently sits
   mid-way, before trust/limits/accountability have been shown), so "know the price, then
   decide" lands as an actual decision moment instead of arriving before there's anything
   to decide with.
7. **Provider teaser** — reposition only (per confirmed scope: keep the teaser and its
   link to `/join`, don't cut it or build anything new). Move it out of the client trust
   arc — currently sits directly after `#report`/ACCOUNTABILITY, which interrupts a
   client's serious, careful moment with a recruitment pitch — to a position that doesn't
   break that arc (e.g., immediately before the final CTA, or folded into the footer-
   adjacent area). Reduce its visual weight relative to the client-facing sequence: it
   should read as a subordinate aside, not a same-weight `.band`.
8. **Coverage cities / FAQ** — content and routes unchanged; this is SEO-hub material
   that's acceptable to keep inline for now unless a later pass wants to relocate it
   (out of scope for this brief — flagged as a minor observation in the critique, not a
   P0/P1).
9. **Final CTA** — one dominant terminal action ("Open the client app" or "Book verified
   security," whichever the team prefers to standardize on); demote "Open the provider
   app" and "Join as a provider" to secondary/tertiary visual weight so the highest-intent
   moment on the page isn't split four ways, especially since the footer already carries
   both app links a third time.

## 4. Scope and boundaries

- **In scope:** section order, visual weight/hierarchy between sections, the trust
  content's structural consolidation (4 galleries → 1 sequence, same underlying logic),
  desktop pacing for `BookingSteps`, final-CTA hierarchy, provider-teaser repositioning,
  service-card visual escalation, hero/credential-strip jargon glosses.
- **Untouched:** visual token system (colors, type, spacing scale), `/join` page itself,
  `/security-providers`, `/faqs`, footer structure beyond CTA-weight changes, coverage-
  city links and FAQ content/placement, all copy voice and factual claims (PSARA
  citations, cancellation percentages, badge definitions) — restructure presentation,
  don't rewrite facts.
- **Explicit anti-goals:** no fabricated stats/testimonials/social proof; no hard fork
  into two separate homepages; no re-ordering of the badges → limits → accountability
  argument logic itself (only its visual consolidation); no changes to the fixed ink/
  paper/amber/type system.

## 5. States and ranges

No new dynamic states introduced — this is a static marketing page. Preserve existing
`Reveal` scroll-in behavior, `aria-live`/`aria-busy` on the carousel and city picker, and
the two genuinely-disabled disclaimer Continue buttons shown in the real screenshots.
Responsive behavior: mobile keeps its existing hamburger nav, sticky book bar, and
carousel pacing; desktop gains the equivalent paced treatment for `BookingSteps` it
currently lacks.

## 6. Interaction and layout

- Trust sequence should read as one continuous scroll argument (a → b → c) rather than
  three sections each restarting with their own eyebrow/h2/lede pattern at equal weight —
  visual continuity (e.g., a persistent side-rail or connective device tying back to the
  duty-ticket rows) is a layout/typeset decision for the implementation pass, not
  prescribed here.
- Desktop `BookingSteps` pacing: reuse or adapt `BookingCarousel`'s step-indicator pattern
  rather than inventing a new one — consistency between breakpoints is the goal, not two
  unrelated solutions.
- Final CTA hierarchy: one `btn--primary btn--lg`-equivalent action; others step down to
  `btn--outline`/text-link weight, matching the rationing pattern the nav already uses
  ("never both [CTAs] at once," per existing code comment).
- Provider teaser: visually distinguish from the client-facing `.band` rhythm (e.g.,
  smaller vertical rhythm, no full-width paper band) so its lighter weight is legible at a
  glance, not just implied by position.

## 7. Constraints and open decisions

- Platform/stack: Next.js 15 App Router, React 19, plain CSS — implementation must fit
  the existing component/CSS architecture in `components/` and `app/globals.css`, no new
  dependencies.
- Accessibility: preserve current baseline (labeled controls, correct heading order, alt
  text, visible focus rings) confirmed solid in the critique's Assessment B — a
  regression here would undo real, already-working accessibility work.
- Open decision for the implementation pass: exact final-CTA primary action wording
  ("Open the client app" vs. a booking-anchor scroll) — not resolved in this brief,
  left for `/impeccable layout` to decide against the existing CTA copy conventions.
- Not in scope for this brief, flagged for a later pass if the client wants it: moving
  coverage-city links and service-intent SEO content out of the main scroll entirely.

## Confirmed direction

This brief reflects the design direction already reviewed and accepted by the client in
this session (see the critique's Recommended Actions), refined against a full read of
`app/page.js` after the critique: the provider teaser already links to `/join` rather than
duplicating its content inline, so its fix is repositioning/reweighting, not extraction;
and the trust-content fix preserves the existing badges → limits → accountability logic
while consolidating its presentation into one sequence.

Next: `/impeccable distill` (trust-sequence consolidation) → `/impeccable layout` (desktop
booking-step pacing, final-CTA hierarchy, provider-teaser reweighting) →
`/impeccable typeset` (service-card visual escalation) → `/impeccable clarify` (PSARA/
jargon glosses) → `/impeccable polish`.
