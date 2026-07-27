# SecureConnect — marketing site

Public marketing site. Separate from the three product apps (client mobile, provider mobile, admin web) and talks to no backend.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # every page prerenders to static HTML
npm start
```

## Stack

Next.js 15 (App Router), React 19, plain CSS. **No Tailwind** — the design is a token
system in `app/globals.css`, and pushing it through utility classes would cost precision
without buying anything on a site this size.

## Pages

| Route | Audience | Notes |
|---|---|---|
| `/` | Clients — individuals and business | Demand funnel. Serif-led editorial treatment. |
| `/join` | Guards, bouncers, gunmen, agencies | Supply funnel. Bilingual (EN/हिंदी), mobile-first, WhatsApp CTA. |

The two funnels are deliberately different in register. Clients are buying *safety* and
need to be reassured; providers are buying *income* and need the numbers up front. Do not
merge them into one page.

## Design system

All of it lives in `app/globals.css`.

**Color.** One fixed scheme — ink ground, paper bands cut into it, amber as the only
saturated colour. There is no light/dark pair and no `prefers-color-scheme` branch: the
page ground is ink everywhere, so there is nothing to flip.

| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#12181B` | Main dark background — body, hero, nav, footer |
| `--ink-2` | `#1B2429` | Cards on dark — duty ticket, ledger, invoice, download band |
| `--ink-3` | `#232F35` | Third dark tone, for depth and hover states |
| `--paper` | `#EDEFE7` | Light band ground — cool sage-grey, not warm cream |
| `--paper-2` | `#E3E6DB` | Secondary paper tone, card footers and hover |
| `--amber` | `#E8A33D` | The one accent — CTAs, eyebrows, active states, dividers |
| `--amber-dim` | `#B87F2A` | Amber as *text* on paper. Never as a fill |
| `--verified` | `#3FA66B` | "Verified" states only — ticket dots, the stamp |
| `--verified-dim` | `#2C7A4B` | The same, legible on paper |
| `--charcoal` | `#1B2226` | Body text on paper |
| `--steel` | `#92A0A6` | Muted secondary text on ink |
| `--steel-dim` | `#5C6A70` | Muted secondary text on paper |
| `--hair` | `rgba(146,160,166,.18)` | Hairline dividers on ink |
| `--hair-paper` | `rgba(27,34,38,.12)` | Hairline dividers on paper |

Amber is rationed: CTAs, eyebrow dots, active states, and the one divider under a total.
Green is reserved *exclusively* for "this has been verified" — the guard's OTP pane, the
DUTY STARTED stamp, the compliance ticks — so it never competes with amber for attention.
Everything else is greyscale. That restraint is the whole look; a third hue undoes it.

`--verified-dim` is a local extension: `--verified` at `#3FA66B` only reaches ~2.7:1 on
paper, so the paper bands get a darker green. It exists for the same reason `--amber-dim`
does.

**Two layers, one of which re-resolves.** The palette above is raw values. Components read
a *semantic* layer on top of it — `--bg`, `--bg-2`, `--bg-3`, `--text`, `--text-2`,
`--text-3`, `--line`, `--accent`, `--ok` — which is declared for the ink context at
`:root` and redeclared inside `.band--paper`. So the same card CSS works on either ground
with no per-context overrides:

```css
.tcard { background: var(--bg); color: var(--text); border-color: var(--line); }
```

Style components through the semantic layer. Reach for a raw palette token only where a
component is permanently dark regardless of band (nav, hero, footer, ledger, OTP ticket)
or where the value must not step down on paper (`.btn--primary` stays full `--amber`).

**Band rhythm.** `.band` is ink. `.band--ink-2` is the lighter dark, used to separate two
adjacent dark sections. `.band--paper` is a document band. Cards on paper are cut out by a
hairline, not by a fill — `--bg-2` equals the ground there on purpose.

**Type.** Loaded through `next/font/google` in `app/layout.js`, self-hosted at build time,
so there is no runtime request to Google and no layout shift.

- `--display` — **Big Shoulders**, set **light (300) and UPPERCASE** at a restrained size.
  That combination is the entire character: light condensed capitals read as *engraved* — a
  stamped plate, a licence, a document header. The same face set heavy at 5rem turns into a
  sports poster, which is the opposite claim. Google folded "Big Shoulders Display" into
  this family with an `opsz` axis, so each level sets `font-variation-settings: "opsz"`.
- `--body` — **IBM Plex Sans**, 400/500/600. Note it is wider than a system grotesque;
  anything that used to fit on one line may not.
- `--mono` — **IBM Plex Mono**, 400/500. Every code, timestamp, OTP digit, log ordinal,
  eyebrow, chip — **and every button label**. A monospaced CTA reads as a command rather
  than a marketing word, which is the same argument the codes and ledger rows make. Always
  with `font-variant-numeric: tabular-nums`. There is no 600 — emphasis comes from size and
  colour.
- `--deva` — **IBM Plex Sans Devanagari**, 400/500/600. Neither the display nor the mono
  face has Devanagari, so `[lang="hi"]` swaps the face, relaxes line-height, steps the
  weight back up (300 is far too fragile in this script) and drops `text-transform`
  (Devanagari has no case). Never let Hindi silently fall back — including in the mono and
  display slots on `/join`, where not every "number" is a number.

**Uppercase is for `h1`, `h2` and `.subhead h3` only.** Card titles stay sentence case at
weight 500, because a paragraph-length title in light capitals stops being readable. If you
add a heading level, decide which of those two it is.

**The log.** One row pattern carries every ordered sequence on the site — duty states,
payment tranches, compliance guarantees, provider onboarding:

```
.log        ordinal │ STATE (display, light, caps) │ description
.log--money figure in the display face replaces the ordinal
.log--narrow stacks for a sidebar column
```

Full-bleed hairlines and a hard left key column make it read as a *record* rather than a
feature list, which is the whole claim the product makes. Reach for it before inventing a
card grid; the site already had four near-identical grids and they diluted each other.

**Imagery is drawn, not shipped.** The app screens in the home download band
(`AppPreview`) and the onboarding chat on `/join` (`ChatPreview`) are CSS, not screenshots.
A PNG of the product goes stale the moment the app ships a change and then quietly starts
lying; these inherit the same tokens the real UI does, weigh nothing, and stay sharp at any
density. Everything scales off container query units, so one `--phone-w` on `.phones`
drives a whole mock. If you swap in real screenshots later, keep the frames — it's the
frames that make a section read as *an app* at a glance.

`ChatPreview` is deliberately **not** a WhatsApp replica: outgoing bubbles are amber,
incoming are `--ink-3`. Copying another product's chrome would put a second brand's green
on a page that rations colour to one accent, and a convincing fake of someone else's UI
implies an endorsement that does not exist. The glyph in the header says which app it is;
the CTA beside it says the rest. Its first bubble is the message `WHATSAPP_URL` actually
prefills — if you change that prefill, change the bubble.

**Motion.** One orchestrated moment: the duty ticket in the hero, whose rows light up in
sequence. It is pure CSS on a server component — no client bundle, no hydration gap before
it can start. Everything else is a quiet scroll fade. `prefers-reduced-motion` shows the
end state instead.

## Content that still needs filling in

- **`WHATSAPP_URL`** in `app/join/content.js` — currently a placeholder number.
- **`metadataBase`** in `app/layout.js` and the URLs in `app/sitemap.js` / `app/robots.js`
  — currently `https://secureconnect.in`.
- **App Store / Play Store links** — the download buttons are `href="#"`.
- **Legal pages** — the footer links to `/terms`, `/privacy`, `/refunds`, `/grievance`.
  These routes do not exist yet and are mandatory for both app stores and Razorpay.
- **Photography.** Two supplied images are now live in the `/join` hero
  (`public/roles/guard.jpg`, `public/roles/gunman.jpg`); the `BNC` frame is still a plate.
  **Both need review before this ships — see "Calls worth revisiting" below.** The original
  rule has not changed: an implied provider who is not a provider is worse than an empty
  frame.

  To change or add a photo, drop the file into `public/roles/` and set `src` on the
  matching entry in the `roles` object at the top of `app/join/content.js`:

  | | |
  |---|---|
  | Files | `public/roles/guard.jpg`, `bouncer.jpg`, `gunman.jpg` |
  | Ratio | Portrait **3:4.5** — the frame crops with `object-fit: cover` |
  | Size | At least 900px tall, ~150KB each after compression |
  | Subject | Standing, three-quarter or full length, head in the upper third — the plate sits over the bottom quarter |
  | Treatment | Applied in CSS (`grayscale(.35)`, ink scrim). Supply them ungraded |
  | `alt` | Describe the uniform and setting, not the person |

  A frame with no `src` renders as a plate — service code, role, credential — which is a
  finished state, not a placeholder. Nothing looks broken if a photo never arrives, so
  removing one is always a safe move.

  Sources are converted with `sips` (crop to 3:4.5, resize to 1200px tall, JPEG q62–64) to
  land each file near 150KB. Keep that budget: this is the hero of the page that most often
  loads on a mid-range Android over mobile data.

## Provenance

The visual language above is taken from the `20fourr website` frame in the team Figma
library (`LaujRxmjMCtIo7xFOqne8S`, node `3311-4`) — the light-uppercase display setting,
the mono buttons, the amber-square credential ticker, the duty log and the duty ticket all
come from there. That file predates the current copy and scope, so the *wording* is this
repo's, not the Figma's, apart from the client hero and the duty-log state names.

## Calls worth revisiting

**`public/roles/gunman.jpg` shows a police officer, labelled "Armed gunman".** The chest
plate reads **POLICE** and it is legible at rendered size, sitting directly above the role
label. PSARA private security is legally distinct from police, and state PSARA rules
restrict uniforms resembling police precisely because the confusion matters. A page whose
entire argument is that credentials are checked cannot illustrate its armed-provider tier
with someone holding a credential the platform does not supply. The setting is also visibly
not India — the signage and the police motorcycles read as East Asian. Recommend replacing
it; `src: null` on the `GUN` entry reverts it to a plate immediately.

**`public/roles/guard.jpg` is a Western event, not an Indian one.** Less acute — the
subject is shot from behind, the jacket reads SECURITY rather than any authority, and the
crop removes the venue branding. But to an Indian guard or agency it will read as foreign
stock on sight, on the one page whose whole job is to convince them this is real.

**Neither image's licensing has been verified.** Confirm the rights before launch.

**The WhatsApp CTA on `/join`** keeps the WhatsApp glyph but is filled amber, not brand
green (`#25D366`). Brand green would be a second saturated colour and would collide with
the reserved verified green. The glyph carries the recognition on its own. This is the
primary conversion path on the supply side, so if it measurably costs clicks,
`.btn--whatsapp` is already a separate class — change the two declarations back and nothing
else moves.

**The OTP handshake is gone.** The hero used to run an animated six-digit code from the
client's phone to the guard's, ending in a VERIFIED stamp. It has been replaced by the
static `DutyTicket`, per the Figma. The handshake dramatised the mechanism; the ticket
asserts the outcome. The ticket is quieter, ships zero client JS and survives
`prefers-reduced-motion` intact — but it no longer *shows* the one gesture the whole
product turns on. If conversion on `#book` drops, that trade is the first place to look.

**Light 300 at small sizes is fragile.** `.log__state` and the `/join` money figures sit at
the bottom of what Big Shoulders 300 can carry legibly, especially on the paper bands where
contrast is lower. Anything smaller needs to step up to 400, not shrink further.

Every rupee figure on both pages traces to the pricing engine in the SRS (₹2,000/day × 2
days → ₹5,487 client total, ₹3,292 provider net, split ₹987.60 / ₹2,304.40). If commission
or GST rates change in Platform Settings, these need updating too.

There are deliberately **no traction claims** — no guard counts, no city counts, no
"trusted by N businesses". Add them when they are true. On a page whose entire argument is
verifiability, an invented number is the one thing that can't be there.

## Not built yet

1. City × service pages (`/security-guards-in-mumbai`) — the main organic channel for a
   marketplace. Build with `generateStaticParams()`.
2. `/for-business` as its own page with a real lead form.
3. The legal set.

## `index.html`

The standalone single-file version of the home page, kept as the published design
reference. It is not part of the Next build and Next ignores it. It will drift from
`app/page.js` — treat `app/` as the source of truth.

**It has drifted.** It is still on the old seal-green palette and the serif display face;
the ink/paper/amber system above has been applied to `app/` only. Either re-theme it or
delete it — a "design reference" that contradicts the built site is worse than none.
