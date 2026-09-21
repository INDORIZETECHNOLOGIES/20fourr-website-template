# 20fourr landing page — design & UX implementation spec

**Target file(s):** homepage (`20fourr.com` / `/`) — Next.js app, dark theme by default (`#12181B`)
**Author:** product/design review, prepared for implementation
**Status:** ready for build
**Scope:** visual design, UX, and information architecture only. No backend, pricing logic, or booking flow changes — those already work correctly and are out of scope.

---

## 1. Context for the implementer

20fourr is a marketplace connecting clients with PSARA-verified private security providers (guards, bouncers, armed gunmen, personal security officers) in India. The current landing page has strong copy and genuine trust-building content (verification badges, transparent pricing breakdown, an honest "what verification does not mean" section) but underperforms on conversion design: the hero splits attention across two CTAs, there's no social proof above the fold, the page is copy-dense without enough visual breathing room, and several strong existing assets (the duty-ticket animation, the 8-step booking flow) are visually undersold.

This spec assumes familiarity with the existing page sections, which currently run in this order:
`Nav → Hero → Service categories (4 cards) → How it works (8-step flow) → Duty log (3-stage) → Trust badges grid → Trust & compliance rules → "What verification does not mean" → Report a concern → For providers (join) → City coverage → Final CTA → Footer`

### Design constraints
- Keep the existing dark theme (`#12181B` background) as the base — do not flip to light mode. Use contrast and section-level surface changes as a rhythm device instead (see §5.3).
- Do not introduce a new type family; establish a clearer type **scale** using the existing font(s) (see §5.1).
- No stock illustration, no generic SaaS-card treatment (uniform rounded cards + soft grey shadow on everything). Structural devices (badges, dividers, numbering) should encode real information, not decorate.
- Avoid the AI-generated-design tells: no tracked-out all-caps eyebrows on every section, no unnecessary "01 / 02 / 03" step numbering unless content is a genuine sequence (the 8-step booking flow and the duty log ARE sequences — keep numbering there; do not add it elsewhere).
- Mobile-first: every change below must be specified for mobile (≤480px), tablet (481–1024px), and desktop (1025px+). Where a section's mobile behavior differs meaningfully from desktop, this is called out explicitly.
- Respect `prefers-reduced-motion` for all new animation.

### Non-goals (explicitly out of scope for this spec)
- No changes to the booking flow itself (the 8 screens inside the app) — only how it's *presented* on the landing page.
- No changes to pricing, GST calculation, or payment logic.
- No new backend endpoints beyond what's noted in §4.1 (pricing estimator) and §2.3 (city selector), both of which may need a lightweight read-only endpoint — flagged as an open question.
- No localization/i18n work in this pass, even though Hindi & English support is mentioned elsewhere on the site.
- No changes to the provider-side app screens (the "for providers" mockups) beyond the copy/layout changes in §6.

---

## 2. Hero section

### 2.1 Consolidate to a single CTA

**Problem:** The hero currently shows two CTAs of equal visual weight: "Book verified security" and "See how we verify." The second one plants doubt at the exact moment the page should be building confidence.

**Requirements:**
- Remove "See how we verify" from the hero button row entirely.
- "Book verified security" becomes the sole primary CTA in the hero, styled as the page's one accent-filled button (see §5.4 on button hierarchy — only one filled/primary button visible per viewport at a time).
- The trust-building content currently reachable via "See how we verify" is not deleted — it already exists further down the page in the Trust & compliance section. Add a small text link (not a button) below the CTA row: *"See how we verify providers"* styled as an underlined text link, `--text-secondary` color, 13px, so the information is still one click away without competing visually.

**Acceptance criteria:**
- [ ] Hero renders exactly one filled/accent button.
- [ ] The verification link is present but visually subordinate (text link, not button-styled) and scrolls to `#trust` on click.
- [ ] No layout shift or orphaned whitespace where the second button used to be.

---

### 2.2 Add social proof numbers above the fold

**Problem:** No credibility signal appears in the first viewport. Competitors (Learnyst) lead with "12,000+ institutes" in the hero.

**Requirements:**
- Add a row of 3 stat items directly below the hero CTA row (above the fold on both desktop and mobile at standard viewport heights).
- Stats to display (confirm real, current numbers before shipping — do not fabricate): e.g. `4,200+ duties completed`, `8 cities`, `₹2Cr+ paid to guards`. Use whichever three numbers are both true and most compelling; do not round up misleadingly.
- Each stat: large number (24–28px, `font-weight: 500`) + short label below (13px, `--text-secondary`). No icons, no borders — plain text in a row, separated by a thin vertical divider (`0.5px solid var(--border)`) between items, not full card treatment.
- **Mobile:** stack as 3 items in a single row if they fit (short labels only); if not, wrap to a 2+1 or 3-across grid with smaller font sizes (18–20px numbers) rather than stacking vertically, to avoid pushing the CTA below the fold.

**Acceptance criteria:**
- [ ] Stats row is visible without scrolling on a standard 375×667 mobile viewport and a 1440×900 desktop viewport, positioned below the hero CTA.
- [ ] Numbers are pulled from a single source of truth (config/constant, not hardcoded in 3 places) so they're easy to update.
- [ ] Divider between stats does not render on mobile if stats wrap to multiple rows (avoid orphaned dividers).

---

### 2.3 Inline city selector in the hero

**Problem:** The product is city-specific but the hero has no way to express "show me guards in my city" without navigating away first.

**Requirements:**
- Add a city selector (dropdown or typeahead) inline with or directly below the hero CTA — this is a new UI element, not a replacement for the CTA.
- Two acceptable implementations, pick based on effort:
  - **Simple (preferred for v1):** a `<select>` styled to match the design system, pre-populated with the 8 cities already listed in the City coverage section (Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Jaipur, Ahmedabad). On selection, either (a) navigates to `/security-providers?city={selected}` or (b) updates the primary CTA's `href` in place to include the city param, so "Book verified security" becomes city-aware without a page reload.
  - **Enhanced (if time allows):** typeahead input with autocomplete, same city list, same destination behavior.
- Default/placeholder state: "Choose your city" — do not pre-select a city (avoid assuming location without permission). Optionally, if browser geolocation is already used elsewhere on the site, pre-select the nearest match — flag as an open question if geolocation isn't already implemented (do not add new geolocation permission prompts as part of this spec without confirming that's wanted).

**Acceptance criteria:**
- [ ] City selector renders inline with the hero content on desktop; stacks above or below the CTA button on mobile without breaking the single-CTA rule in §2.1 (the selector itself is not a second CTA — it's an input, styled as `--fill-field`, not as a button).
- [ ] Selecting a city updates the destination of "Book verified security" (either via query param or client-side state) before the user clicks it.
- [ ] Keyboard-navigable, proper `<label>` association for accessibility.

**Open question (engineering):** Does `/security-providers?city=X` already support this query param server-side? If not, confirm scope — worst case, this ships as a client-side-only convenience that pre-fills a filter on the destination page.

---

### 2.4 Move the duty-ticket animation into the hero

**Problem:** The animated duty log (Booking requested → Provider PSARA-checked → Payment secured → Duty started (OTP) → Duty ended (OTP) → Payout released) is the single most distinctive visual asset on the page and it currently sits several sections down, after service cards and the 8-step flow.

**Requirements:**
- Relocate the existing duty-ticket animation component to the hero, positioned to the right of the headline/CTA column on desktop (standard split-hero layout: text left, visual right), and below the CTA + stats row on mobile.
- No redesign of the animation itself is required — reuse the existing component/states. If the animation currently autoplays on a loop, keep that behavior; if it's scroll-triggered, it needs to be re-triggered by hero visibility instead (since it's now in the first viewport).
- Ensure the animation doesn't compete with the CTA for attention — the CTA and headline should still be the first thing the eye lands on. Suggested treatment: slightly muted/contained in a card (`var(--surface-1)`, 12px radius) so it reads as supporting visual, not the hero's main subject.

**Acceptance criteria:**
- [ ] Duty ticket animation is visible in the hero viewport on desktop without scrolling.
- [ ] On mobile, it appears within the first two viewport-heights of scroll (i.e., directly after the CTA/stats block, not buried under service cards).
- [ ] The section it was removed from (wherever it currently lives) is checked for layout gaps and backfilled or removed cleanly — do not leave an empty section header.
- [ ] Animation respects `prefers-reduced-motion` (show static end-state if the user has reduced motion enabled).

---

## 3. Information architecture — audience split

### 3.1 Client vs. provider navigation

**Problem:** Clients (people booking security) and providers (guards/agencies looking for work) are different audiences with different goals, but the page interleaves their content in a single scroll — a provider has to scroll past most of the client-facing content to reach the "join as a provider" section.

**Requirements:**
- Add a persistent, lightweight toggle or pair of nav links near the top of the page (in the existing nav bar, which already has "Work as a guard" and "Book security" as separate links) that makes the split obvious *before* the user starts scrolling — not a new mechanism, but strengthen what already exists.
- Specifically: promote "Work as a guard" and "Book security" in the nav to visually distinct treatment — e.g. "Book security" as the filled/accent button (matching hero), "Work as a guard" as a secondary/outlined button, so the nav itself signals "pick your path" without requiring a scroll.
- **Do not build a full tabbed/filtered page experience in this pass** (e.g., don't hide provider content when "client" is selected) — that's a larger architectural change. This spec's scope is limited to strengthening the existing nav-level signal. Flag a full audience-split page architecture as a P2/future consideration (see §8).

**Acceptance criteria:**
- [ ] Nav bar visually distinguishes the two audience CTAs (one filled, one outlined) on both desktop and mobile (mobile: consider a persistent bottom bar or prominent placement in the hamburger menu — specify which before implementing).
- [ ] No content is hidden or removed; this is a visual/nav-level change only.

---

## 4. New content: pricing estimator

### 4.1 Interactive price estimator on the landing page

**Problem:** The existing booking flow shows itemized pricing (base rate + platform fee + GST) inside the app after multiple steps. The landing page only gestures at this with the copy "Know the price. Then decide." with no actual price shown. This is likely the single highest-leverage missing feature — it lets a visitor get real information without creating an account.

**Requirements:**
- Build a self-contained estimator widget, placed in the section that currently contains the "Know the price. Then decide." copy (replacing or supplementing it).
- Inputs: **city** (reuse the same 8-city list from §2.3), **service type** (Guard / Bouncer / Armed gunman / PSO — reuse copy and categories from the existing 4 service cards), **duration** (number of hours or a day/half-day toggle — confirm which unit matches actual pricing logic).
- Output: an estimated price range or itemized estimate (provider charge + platform fee + GST), styled consistently with the itemized breakdown already shown in the booking-flow screenshot (step 8, "Pay once, itemised").
- **This requires a data source.** Two options, in order of preference:
  1. If a public/read-only pricing or rate-card endpoint already exists (even an average/estimate endpoint, not the real-time booking price), wire the widget to it.
  2. If no such endpoint exists, this widget should NOT fabricate numbers. Either (a) scope this as a follow-up once a pricing API is exposed, or (b) ship a simplified static version using clearly-labeled *typical* rate ranges (e.g., "Guards typically start at ₹X/day in [city]") sourced from the existing pricing team, with a disclaimer that final price is confirmed at booking. Flag this as an **open question for the engineering/data team** before implementation begins — do not guess at numbers.
- Below the estimate, always show the existing CTA ("Book verified security" or "Compare providers in [city]") so the estimator funnels directly into conversion.

**Acceptance criteria:**
- [ ] Widget accepts all 3 inputs and produces an output without a page reload.
- [ ] If using real pricing data: output matches what a user would see in-app for equivalent inputs (within the tolerance the data source allows — e.g., "estimate" language if the API returns averages, not exact quotes).
- [ ] If using static ranges: every number is clearly labeled "typical" or "starting at," never presented as a firm quote, and a disclaimer sentence is present.
- [ ] CTA below the estimate carries forward the selected city/service (pre-fills the destination, same pattern as §2.3).
- [ ] Mobile: inputs stack vertically; output remains visible without requiring a second scroll after submitting.

**Open question (data/engineering):** Confirm whether a pricing estimate endpoint exists or needs to be built. This blocks whether §4.1 ships as a live calculator or a static-range version in v1.

---

## 5. Visual design system

### 5.1 Typography scale

**Problem:** Hero headline and section headings currently sit close in size, making the page feel visually flat when scrolling — there's no clear "big moment, then supporting detail" rhythm.

**Requirements:**
- Establish an explicit type scale (do not introduce a new typeface — work within the existing font):
  - Hero headline (H1): 44–56px desktop / 32–36px mobile, `font-weight: 500`
  - Section headings (H2): 28–32px desktop / 22–24px mobile, `font-weight: 500`
  - Subsection headings (H3): 18–20px, `font-weight: 500`
  - Body copy: 16px, `font-weight: 400`, `line-height: 1.6–1.7`
  - Supporting/caption text: 13–14px, `--text-secondary`
- Apply consistently across all existing sections — this is a global pass, not limited to the hero. Audit every heading currently in the page and reclassify into this scale.
- Avoid the generic AI-tell of all-caps tracked-out eyebrow labels above every section — where eyebrows exist (e.g., "For clients · PSARA-licensed providers" in the current hero), keep at most one per page, sentence case preferred over all-caps if changed.

**Acceptance criteria:**
- [ ] Every H1/H2/H3 on the page maps to one of the 4 defined sizes — no one-off font sizes remain.
- [ ] Hero headline is visibly, meaningfully larger than section headings when viewed side by side on a full page scroll.
- [ ] Mobile sizes maintain the same relative hierarchy (H1 still clearly larger than H2, etc.) even though absolute sizes shrink.

---

### 5.2 Trust section restructure — break up wall-to-wall copy

**Problem:** The "Trust & compliance" section (Contact privacy / Threat brief / Verification / Cancellation / Disputes / Ratings) currently presents as dense paragraph blocks. The content is good; the presentation doesn't let it be scanned.

**Requirements:**
- Convert each of the 6 trust rules into a consistent card or row pattern: short bold headline (already exists, e.g. "Numbers stay hidden until you pay") + one-line supporting sentence, with a leading icon.
- Icon choice should map to the concept (e.g., an eye-off/lock icon for contact privacy, a document-check icon for verification, a clock icon for cancellation windows) — do not use decorative or unrelated icons.
- Layout: 2-column grid on desktop (3 rows × 2 columns), single column stacked on mobile. Each item gets equal visual weight — no single item should be allowed to run noticeably longer than the others; trim copy to fit a consistent card height rather than letting cards resize unevenly.
- Apply the same "headline + one line + icon" pattern to the "What verification does not mean" section (Who performs the duty / We are not an emergency service / What a badge proves) — currently also dense prose.

**Acceptance criteria:**
- [ ] All 6 trust-rule items and all 3 "what verification does not mean" items follow one consistent card pattern (not 9 different one-off layouts).
- [ ] No paragraph in this section exceeds 2 sentences of body copy.
- [ ] Icons render correctly in both light and dark mode (use the existing icon system if one exists on the site; do not introduce a second icon library).

---

### 5.3 Section-level surface variation

**Problem:** The page is dark-mode by default throughout, with no intentional variation in surface tone between sections — everything reads at the same visual weight on scroll.

**Requirements:**
- Introduce subtle surface-level alternation between sections using the existing dark palette (do not flip any section to a fully light background — that would break brand consistency). E.g., alternate between the page's base background and a very slightly lighter/darker `--surface-1` or `--surface-2` tone per section, similar to how the duty-ticket animation is already contained in a slightly distinct card surface.
- Use this specifically to (a) separate the hero from the services section, and (b) give the trust section a distinct "weight" befitting its importance (slightly elevated surface, e.g. `--surface-1` background for the whole section rather than just individual cards).
- This is a subtle rhythm device, not a redesign — err on the side of too subtle rather than too dramatic. The goal is scroll-based visual pacing, not new color statements.

**Acceptance criteria:**
- [ ] At least 3 distinct surface levels are used across the page in a deliberate pattern (not randomly assigned per section).
- [ ] Contrast ratios remain WCAG AA compliant for all text against its section background in both the alternated and base states.

---

### 5.4 Button hierarchy audit

**Problem:** Related to §2.1 — ensure the "one accent-filled button per view" principle is applied page-wide, not just in the hero.

**Requirements:**
- Audit every CTA on the page. At any given scroll position (viewport), there should be at most one filled/primary-styled button visible. All other buttons in that viewport should use secondary (outlined) or ghost/text-link styling.
- Specific known offenders to check: the "How it works" section end, the final CTA section (currently shows both "Open the client app" and "Open the provider app" — these are two genuinely different actions, so keep both, but differentiate them: one filled, one outlined, not both filled).
- The `brand`/accent-filled treatment should be reserved for the single most important action in each section — typically "Book verified security" or its local equivalent, never used for secondary/informational actions like "Learn more" or "See how we verify."

**Acceptance criteria:**
- [ ] No viewport in the page shows 2+ filled/accent buttons simultaneously.
- [ ] Button style (filled / outlined / ghost) is applied consistently based on action priority, not per-section improvisation.

---

## 6. Content additions

### 6.1 Client testimonials

**Problem:** Zero named client testimonials currently exist on the page, despite the site clearly having real completed bookings (referenced via stats, duty logs, etc.).

**Requirements:**
- Add a testimonials section with 2–3 real client quotes. Each testimonial needs: name (first name + last initial is acceptable for privacy, matching the pattern already used elsewhere on the site, e.g. "R. Kumar"), a specific use case (e.g., "Wedding security, Pune, 150 guests"), and a short quote (1–2 sentences, specific rather than generic — avoid "great service!" style copy).
- Placement: after the trust badges section and before "For providers" — this is the natural point where a visitor has seen the verification system and is deciding whether to trust the platform with an actual booking.
- **Do not fabricate testimonials.** This section blocks on real client quotes being sourced (support/success team, or existing reviews if any exist). Flag as an **open question for content/marketing** if quotes aren't readily available — do not ship placeholder or synthetic testimonials.
- Visual treatment: simple card layout, no video requirement for v1 (video testimonials are a nice-to-have, not required — see §8).

**Acceptance criteria:**
- [ ] 2–3 testimonials present, each with name, use case, and quote sourced from real customers.
- [ ] No stock photography or generated avatars used for testimonial "authors" — use initials-in-circle avatars (consistent with the design system's existing avatar pattern) if photos aren't available/consented.

**Open question (content/marketing):** Source 2–3 real client testimonials with permission to publish. Blocking dependency for this section.

---

### 6.2 Provider-side social proof

**Problem:** The "For providers" section (get paid in 2 days, set your rate, etc.) has no testimonial from an actual guard or agency, making the pitch to providers feel one-sided.

**Requirements:**
- Add a single quote from a provider (guard or agency owner) within or immediately adjacent to the existing "For providers" section. Same sourcing constraint as §6.1 — real quote only, flag as open question if unavailable.
- Keep it lightweight: one quote, name + role (e.g., "R. Kumar, Mumbai, 9 years' experience" — matches the profile card pattern already shown in the provider app mockup), no separate large section needed.

**Acceptance criteria:**
- [ ] One real provider quote is present in the "For providers" section.
- [ ] Visual treatment is lighter than the client testimonials in §6.1 (this is a supporting quote, not a full section) — e.g., a pull-quote style rather than a card.

**Open question (content/marketing):** Same sourcing dependency as §6.1, provider-side.

---

### 6.3 Inline FAQ section

**Problem:** FAQs exist at `/faqs` but are not surfaced on the homepage, meaning common objections aren't addressed before a visitor decides whether to continue.

**Requirements:**
- Add an FAQ section to the homepage with 4–5 questions, using an accordion pattern (click/tap to expand, one open at a time is acceptable, or allow multiple open — either is fine, pick based on existing accordion components if one already exists in the codebase).
- Pull questions directly from the existing `/faqs` page rather than writing new content — select the 4–5 most relevant to a first-time visitor's hesitation, likely candidates:
  - "Is my address visible to the guard before I pay?"
  - "What happens if the guard doesn't show up?"
  - "How is the price calculated?"
  - "What if something goes wrong during the duty?"
  - "How is a provider verified?"
  (Confirm actual question set against the real `/faqs` content — do not invent questions not already answered there.)
- Placement: after the trust/compliance sections, before the final CTA — FAQs work best right before the point of conversion.
- Include a "See all FAQs →" link to the full `/faqs` page at the bottom of the section.

**Acceptance criteria:**
- [ ] 4–5 FAQ items render as an accordion, sourced from existing `/faqs` content (no net-new copy needed unless a question requires slight rewording for brevity).
- [ ] Link to full FAQ page is present and functional.
- [ ] Accordion is keyboard-accessible (expandable via Enter/Space, proper `aria-expanded` state).

---

## 7. Interaction & mobile-specific fixes

### 7.1 Sticky CTA on scroll

**Problem:** After the hero, "Book verified security" disappears until the final CTA section at the very bottom of a long page.

**Requirements:**
- Add a sticky/fixed header bar that appears after the user scrolls past the hero (trigger: hero out of viewport), containing a condensed nav + the primary CTA button.
- Desktop: sticky top bar, slim (48–56px height), logo + "Book verified security" button, dismissible only by scrolling back to the top (standard sticky-nav behavior, not a dismiss button).
- Mobile: consider a sticky bottom bar instead of top (better thumb reach on mobile), single CTA button, full-width or near-full-width.
- Must not overlap with or obscure content when it appears — account for its height in scroll-padding/anchor-offset calculations if the page uses anchor links (`#trust`, `#book`, `#how`, `#services` already exist in the nav).

**Acceptance criteria:**
- [ ] Sticky element appears only after scrolling past the hero, not on initial page load.
- [ ] Does not overlap page content or block anchor-link scroll targets.
- [ ] Present on both desktop (top) and mobile (bottom, or top if a bottom bar isn't feasible with the current component library — confirm before deviating).

---

### 7.2 Booking flow screenshots — mobile layout fix

**Problem:** The 8-step "How it works" flow uses phone-frame screenshots that likely don't lay out well at small viewports, and the step numbering ("Step 01") is visually minor relative to how good this content actually is.

**Requirements:**
- Desktop: no change needed to the fundamental layout, but increase screenshot size/prominence if current treatment is small — this is the site's best proof-of-product content and should be treated as a hero-level asset within its section, not a thumbnail.
- Mobile: convert the 8-step sequence into a horizontal-scroll carousel (swipeable, one step's screenshot + copy per "page") rather than a vertically stacked list of 8 large screenshot blocks, which currently likely creates excessive scroll length on mobile. Include a simple position indicator (dots or "Step 3 of 8") since content is genuinely sequential — this is one of the legitimate uses of step-numbering per the design constraints in §1.
- Ensure captions (the descriptive sentence under each step title) remain readable at the reduced width a carousel implies — truncate or tighten copy only if necessary, do not remove informational content.

**Acceptance criteria:**
- [ ] Desktop: screenshots are visually prominent (not shrunk to fit alongside dense copy).
- [ ] Mobile: 8-step flow is presented as a swipeable carousel with a step-position indicator, not a long vertical stack.
- [ ] Carousel is swipe- and keyboard/arrow-navigable, with visible affordance that more steps exist (partial next-slide peek, or clear arrow controls).

---

### 7.3 City coverage — visual upgrade

**Problem:** The 8 city links (Delhi, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Jaipur, Ahmedabad) currently render as plain text links, undervisualizing what should feel like real geographic coverage.

**Requirements:**
- Minimum viable fix: convert the plain link list into a card grid (2×4 desktop, 2-across mobile), each card showing city name + (if available) a live count, e.g. "142 verified providers" — pulling from the same data source used elsewhere on the site for provider counts, if one exists.
- If a live count isn't available without new backend work, ship without the count (city name + arrow only) rather than fabricating a number — flag as an open question.
- Enhanced option (if time allows, not required for v1): a simple map-of-India graphic with the 8 covered cities marked as points, cards/links below or overlaid. This is explicitly a stretch goal — do not let it block shipping the card-grid version.

**Acceptance criteria:**
- [ ] City coverage renders as a card grid, not a plain text link list.
- [ ] If provider counts are shown, they come from a real data source, refreshed at build/deploy time at minimum (does not need to be real-time for v1).
- [ ] Each card remains a functional link to `/security-providers?city={city}`, matching existing destination URLs.

**Open question (engineering):** Confirm whether a per-city provider count is available from an existing endpoint before committing to showing counts in v1.

---

### 7.4 WhatsApp contact CTA (client-facing)

**Problem:** WhatsApp support is already used for provider onboarding (mentioned in the "For providers" section) but is never surfaced to clients, despite WhatsApp being a standard, expected contact channel in the Indian market.

**Requirements:**
- Add a WhatsApp contact affordance visible to clients — a floating action button (bottom-right corner, standard WhatsApp-chat-widget pattern) or a prominent link in the FAQ/final-CTA area, linking to `https://wa.me/{number}` with a pre-filled message if desired (e.g., "Hi, I have a question about booking security").
- Confirm the correct client-facing WhatsApp number/line before implementing — do not reuse the provider-onboarding WhatsApp number if they're meant to be separate support lines. Flag as an **open question** if this isn't already clarified.
- If implemented as a floating button: must not obscure the sticky CTA from §7.1 — coordinate z-index and positioning so both can coexist (e.g., WhatsApp FAB above the sticky bottom bar on mobile, or positioned to the side).

**Acceptance criteria:**
- [ ] A WhatsApp contact option is visible and functional on the client-facing homepage.
- [ ] Does not visually conflict with the sticky CTA bar from §7.1.
- [ ] Uses the correct, confirmed WhatsApp number for client support (not the provider-onboarding number, unless confirmed they're the same).

**Open question (support/ops):** Confirm the WhatsApp number/line intended for client-facing support inquiries.

---

## 8. Explicitly out of scope / future considerations (P2)

Documented here so they're not accidentally designed against, but not part of this build:

- **Full audience-split page architecture** (tabbed/filtered client vs. provider experience) — §3.1 only covers a nav-level signal, not a structural rebuild.
- **Video testimonials** — v1 ships text testimonials only (§6.1); video is a fast-follow if text testimonials perform well.
- **Real-time provider counts per city with live updates** — v1 may ship without counts or with build-time-refreshed counts only (§7.3).
- **Map-of-India visual for city coverage** — explicitly a stretch goal, not required (§7.3).
- **Live, real-time pricing estimator wired to the actual booking pricing engine** — v1 may need to ship as a static/typical-range estimator depending on data availability (§4.1); wiring to live pricing is a natural v2 if v1 ships with static ranges.
- **Geolocation-based city pre-selection** — not part of this pass unless geolocation is already implemented elsewhere on the site (§2.3).

---

## 9. Open questions summary (for quick reference)

| # | Question | Owner | Blocking? |
|---|---|---|---|
| 1 | Does `/security-providers?city=X` support this query param server-side? | Engineering | No — client-side fallback acceptable |
| 2 | Does a pricing/rate-card estimate endpoint exist, or does §4.1 ship with static typical-range copy? | Engineering / Data | **Yes** — determines §4.1 implementation approach |
| 3 | Source 2–3 real client testimonials with publish permission | Content / Marketing | **Yes** for §6.1 |
| 4 | Source 1 real provider testimonial with publish permission | Content / Marketing | **Yes** for §6.2 |
| 5 | Is a per-city provider count available from an existing endpoint? | Engineering | No — ship without counts if unavailable |
| 6 | Confirm the correct client-facing WhatsApp number | Support / Ops | **Yes** for §7.4 |

---

## 10. Suggested build order

This spec is ordered roughly by priority already, but for implementation sequencing:

**Phase 1 — highest impact, lowest dependency risk:**
1. §2.1 Hero CTA consolidation
2. §5.4 Button hierarchy audit
3. §5.1 Typography scale
4. §2.4 Move duty-ticket animation to hero
5. §5.2 Trust section restructure
6. §7.1 Sticky CTA

**Phase 2 — needs content/data sourcing in parallel:**
7. §2.2 Social proof stats (needs real numbers confirmed)
8. §6.3 Inline FAQ (needs question selection from existing `/faqs`)
9. §7.3 City coverage upgrade (card grid version, no counts)
10. §7.4 WhatsApp CTA (needs number confirmed)

**Phase 3 — blocked on external dependencies:**
11. §6.1 / §6.2 Testimonials (blocked on sourcing real quotes)
12. §4.1 Pricing estimator (blocked on confirming data source — may ship static in this phase, live in a later one)
13. §2.3 City selector (blocked on confirming query-param support, though can ship as pure client-side UX regardless)
14. §3.1 Nav-level audience split
15. §7.2 Booking flow mobile carousel
16. §5.3 Section-level surface variation (polish pass, do last once section order/content is final)
