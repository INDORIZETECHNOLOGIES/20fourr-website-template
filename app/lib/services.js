/* ============================================================
   Service landing content  (one page per service, for ads)
   ------------------------------------------------------------
   Four services, each its own indexable page under /services/[slug]
   and each mapped to one directory `category`. Per the build spec:
   ONE audience, ONE hero screenshot (a real app screen), ONE CTA.
   Event security is not its own page — it is the wedding/event angle
   of Bouncers, so it lives there.

   `screenshot` points at a real capture in /public/app (no stock).
   `headline` is the outcome line for that specific buyer.
   ============================================================ */

export const SERVICES = [
  {
    slug: 'security-guards',
    category: 'guard',
    code: 'GRD',
    navLabel: 'Security guards',
    what: 'security guards',
    title: 'Security Guards',
    // buyer: ops / facility manager
    headline: 'Put a verified guard on your gate this week.',
    lede: 'Static post and gate duty for buildings, warehouses, offices and sites — as a single shift or a standing weekly deployment. PSARA licence re-checked on a rolling basis, day rate shown before you book.',
    screenshot: { src: '/app/find-providers.webp', alt: 'Find Security Providers screen listing verified guards with day rates' },
    badges: ['verified_identity', 'psara_verified', 'background_verified'],
    whyVerified: 'A guard stands where your people and property are. Every listing shows a PSARA licence, a verified ID and a background check before you ever see it.',
    use: [
      ['Gate & lobby', 'Access control and visitor screening for apartments, offices and gated sites.'],
      ['Warehouse & site', 'Overnight and shift cover for stock, plant and construction.'],
      ['Retail & commercial', 'Floor presence and closing duty for shops, showrooms and banks.'],
      ['Residential', 'Standing weekly cover for societies and private residences.'],
    ],
    faqs: [
      ['How fast can a guard start?', 'Compare listed guards, price a date range and confirm in the app. In a covered city a verified guard can typically take a shift within the week.'],
      ['Single shift or standing deployment?', 'Both. Book one shift or set a recurring weekly deployment — the day rate is shown before you place anything.'],
      ['Is the PSARA licence kept current?', 'Yes. Licences are verified before listing and re-checked on a rolling basis; a lapsed licence blocks the provider from search and new bookings automatically.'],
    ],
  },
  {
    slug: 'bouncers',
    category: 'bouncer',
    code: 'BNC',
    navLabel: 'Bouncers & events',
    what: 'bouncers',
    title: 'Bouncers & Event Security',
    // buyer: event / family
    headline: 'Bouncers for your wedding or event — verified, priced upfront.',
    lede: 'Door supervision and crowd control for weddings, concerts, clubs and private functions. Book the number you need for the date, see the price with GST before you commit, and pay in the app — no cash at the gate.',
    screenshot: { src: '/app/booking-purpose.webp', alt: 'Booking Purpose screen for selecting an event security booking' },
    badges: ['verified_identity', 'psara_verified', 'top_rated'],
    whyVerified: 'A stranger managing your guests should be someone whose identity and licence were checked. Every bouncer is verified before listing, and their rating from past events is visible before you book.',
    use: [
      ['Weddings', 'Discreet guest management and entry control for large celebrations.'],
      ['Concerts & shows', 'Perimeter, pit and stage-front crowd control for ticketed events.'],
      ['Clubs & bars', 'Door management and capacity for nightlife venues.'],
      ['Corporate events', 'Screening and floor cover for launches, conferences and expos.'],
    ],
    faqs: [
      ['Can I book a team for one night?', 'Yes — book the number you need for the event date, with the day rate shown per person before you confirm.'],
      ['Do I pay cash on the day?', 'No. You pay in the app and get an itemised GST invoice; nothing changes hands at the gate.'],
      ['Are they trained for crowd control?', 'Providers list crowd and door-supervision experience on their profile, and ratings from past bookings are visible before you book.'],
      ['How far ahead should I book?', 'As soon as the date is set. Coverage and rates are shown live, so you can compare and confirm in one sitting.'],
    ],
  },
  {
    slug: 'armed-security',
    category: 'gunman',
    code: 'GUN',
    navLabel: 'Armed security',
    what: 'armed security',
    title: 'Armed Security',
    // buyer: cash movement / high-risk site
    headline: 'Licensed armed protection — firearm licence checked per booking.',
    lede: 'Armed officers for cash movement, industrial sites and elevated-risk premises. The individual firearm licence is verified separately from the agency licence, and re-checked before every armed assignment.',
    screenshot: { src: '/app/provider-documents.webp', alt: 'Provider Documents screen showing Arms Licence verified' },
    badges: ['firearms_authorized', 'psara_verified', 'verified_identity'],
    whyVerified: 'Armed work carries the highest bar. A gunman cannot accept an armed booking without a current individual weapon licence on file — checked separately from the agency, and again per booking.',
    use: [
      ['Cash & valuables', 'Escort for cash movement, bullion and high-value transfers.'],
      ['Industrial sites', 'Armed cover for plants, depots and elevated-risk premises.'],
      ['High-risk premises', 'Standing armed presence where a threat has been assessed.'],
      ['Escort duty', 'Armed accompaniment for movement between sites.'],
    ],
    faqs: [
      ['Is the firearm licence really checked?', 'Yes — separately from the agency licence, and again before every armed assignment. No current individual weapon licence, no armed booking.'],
      ['Who is armed security for?', 'Cash movement, industrial and elevated-risk sites where a threat has been assessed. For personal close protection, see executive protection.'],
      ['What documents does an armed provider clear?', 'PSARA licence, government ID matched to a live selfie, and a valid individual arms licence — each shown as Verified on the provider’s documents.'],
    ],
  },
  {
    slug: 'executive-protection',
    category: 'pso',
    code: 'PSO',
    navLabel: 'Executive protection',
    what: 'personal security officers',
    title: 'Executive Protection',
    // buyer: individual under credible threat
    headline: 'A close-protection officer, verified to our highest tier.',
    lede: 'A dedicated personal security officer for close protection, travel and daily movement. Our highest verification tier — PSARA re-checked per booking, an assignment-history review, and a threat brief released only after payment.',
    screenshot: { src: '/app/provider-detail.webp', alt: 'Provider Detail screen showing the Elite Protection badge' },
    badges: ['elite_protection', 'psara_verified', 'verified_identity'],
    whyVerified: 'Close protection is the one role where discretion and history matter as much as licences. Elite Protection clears every check plus an assignment-history review and manual approval.',
    use: [
      ['Close protection', 'A dedicated officer for an individual facing a named or credible threat.'],
      ['Travel & escort', 'Cover for movement, site visits and daily routine.'],
      ['Residence security', 'Standing protection at a private residence.'],
      ['Executive detail', 'Discreet cover for public figures and their families.'],
    ],
    faqs: [
      ['What makes this the highest tier?', 'A PSO clears every check the other roles do, plus a review of assignment history and manual approval. It is reserved for close-protection specialists.'],
      ['How is a threat brief handled?', 'If you record a past threat in your profile, it is released to the assigned officer after payment only — late enough to protect you, early enough for them to prepare.'],
      ['Is the booking discreet?', 'Yes. Contact details are exchanged only after a booking is confirmed, and the officer is briefed on a need-to-know basis.'],
    ],
  },
];

export function findService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
