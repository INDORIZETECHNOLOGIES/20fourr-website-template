/* ============================================================
   Service guides — the written half of a /security-providers?category= page
   ------------------------------------------------------------
   The same idea as cityGuides.js, for the two services people search
   for by what the service is rather than where:

   - "personal security officer" (720 a month in India, Semrush Oct
     2026) is a what-is-it search, and the PSO view had no answer;
   - "event security services" (210 a month, keyword difficulty 8)
     is the easiest buyer keyword the site targets.

   Rendered on page 1 of the service view with no city: a city
   narrows the listing, not what the service is, and repeating the
   guide on every service × city page would make 17 near-duplicates.

   Every claim is a PSARA rule the city guides already cite, or how
   20fourr works as the home page and /faqs already state it. No day
   rates, for the same reason as the city guides.
   ============================================================ */

import { TRAINING_RULE } from './cityGuides';

const REVIEWED = 'October 2026';

const LICENCE_SOURCES = [
  { label: 'State/UT wise PSARA licences and agency lists, PSARA portal (Ministry of Home Affairs)', url: 'https://psara.gov.in' },
  { label: 'MHA training rules for private security guards (PTI, Dec 2020)', url: 'https://www.theweek.in/wire-updates/national/2020/12/17/del35-mha-private-security-guards.html' },
];

export const CATEGORY_GUIDES = {
  pso: {
    eyebrow: 'Personal security officers',
    heading: 'What a personal security officer (PSO) is, and what to check before you hire one.',
    intro: [
      'A personal security officer, or PSO, is a bodyguard: close protection for one person, a family or an executive, covering travel, site visits, events and daily movement rather than a fixed gate. The two words describe the same job; PSO is the formal one.',
      'In government use, a PSO is a police officer the state assigns to a protected person. A private PSO is different: a guard supplied by a PSARA-licensed security agency, booked and paid for by the client, for as long as the client needs.',
    ],
    rules: [
      {
        title: 'From a licensed agency',
        body: 'A private PSO is supplied by a security agency, and the agency needs a PSARA licence from the state the PSO will work in. A licence from another state does not cover the assignment.',
      },
      {
        title: 'Armed or unarmed',
        body: 'Most close protection is unarmed. An armed PSO needs a valid firearm licence on top of the agency’s PSARA licence, and 20fourr checks it before every armed assignment, not once at signup.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'What is a personal security officer?',
        a: 'A personal security officer (PSO) is a bodyguard: a trained guard assigned to protect a person rather than a place. A PSO stays with the client through travel, meetings, site visits and events. Private PSOs are supplied by PSARA-licensed security agencies.',
      },
      {
        q: 'Is a PSO the same as a bodyguard?',
        a: 'Yes. Bodyguard is the everyday word and PSO, personal security officer, is the formal one. In government use a PSO is a police officer assigned to a protected person; a private PSO is booked from a licensed agency.',
      },
      {
        q: 'Can a private bodyguard carry a gun in India?',
        a: 'Only with a valid firearm licence, held in addition to the agency’s PSARA licence. On 20fourr the firearm licence is checked before every armed assignment, and no armed booking is accepted without it.',
      },
      {
        q: 'Can I ask for an ex-army or ex-police bodyguard?',
        a: 'Yes. Where a provider lists prior service in the army or police, it is shown on their profile, so you can choose on it.',
      },
      {
        q: 'How much notice does booking a PSO need?',
        a: 'More than an unarmed guard. Personal security officers and armed personnel usually need extra notice because the licence and assignment checks behind them are stricter.',
      },
      {
        q: 'How much does a personal bodyguard cost?',
        a: 'It depends on whether the PSO is armed, how many hours a day they cover and for how many days. Armed PSOs cost more because of the extra licence and checks. On 20fourr you choose the role, city and dates and see the full price, with GST shown separately, before you book.',
      },
    ],
    sources: LICENCE_SOURCES,
  },

  bouncer: {
    eyebrow: 'Event security',
    heading: 'Event security services: what bouncers cover, and what to sort out before the day.',
    intro: [
      'Event security is door control and crowd management: checking entry, managing queues, keeping order inside and handling trouble before it spreads. It is booked for clubs and bars, concerts, weddings, corporate events and large private functions.',
      'A security guard holds a fixed post at a premises. A bouncer works the door and the crowd at an event or venue, which is why event bookings are planned around the guest list, the entry points and the hours rather than a shift roster.',
    ],
    rules: [
      {
        title: 'Supplied by a licensed agency',
        body: 'An agency supplying bouncers is providing private security, so it needs a PSARA licence from the state the event is in, like any other security agency. Check the licence on psara.gov.in before you pay a deposit.',
      },
      {
        title: 'Brief the agency on the event, not just the date',
        body: 'Give the venue, the hours, the expected headcount, the number of entry points, whether alcohol is served and whether guests will be checked at the door. Those decide how many bouncers you need, and whether you need women staff to check women guests.',
      },
      {
        title: 'Security is not a permit',
        body: 'Bouncers do not replace any permission a public event needs from the local police or licensing authority. If your event needs one, the organiser arranges it separately.',
      },
    ],
    faqs: [
      {
        q: 'What do event security services include?',
        a: 'Door control and entry checks, queue and crowd management, keeping order inside the venue and dealing with incidents. On 20fourr these are booked as bouncers, by venue, date and hours.',
      },
      {
        q: 'Can I book bouncers for a wedding?',
        a: 'Yes. Weddings are one of the most common event bookings, alongside clubs, concerts, corporate events and private parties. Book for the hours of the event and say how many entry points the venue has.',
      },
      {
        q: 'How many bouncers do I need for an event?',
        a: 'There is no single national ratio. It depends on the headcount, the number of entrances, the venue’s layout and whether alcohol is served. Brief the agency on all four and it should propose a number for that venue.',
      },
      {
        q: 'Do bouncers need a licence?',
        a: 'The agency that supplies them needs a PSARA licence from the state the event is in, the same as for security guards. On 20fourr, every bouncer provider’s PSARA licence and identity are verified before they are listed.',
      },
      {
        q: 'What is the difference between a security guard and a bouncer?',
        a: 'A security guard covers static duty at premises such as offices, warehouses, sites and residential societies. A bouncer handles door control and crowd management at events and venues.',
      },
      {
        q: 'How much do bouncers cost for an event?',
        a: 'It depends on how many you need, the length of the event and the city. On 20fourr you choose the role, city and dates and see the full price, with GST shown separately, before you book, with no account, phone number or sales call.',
      },
    ],
    sources: LICENCE_SOURCES,
  },
};

export function categoryGuideFor({ category, city, page }) {
  return category && !city && page === 1 ? CATEGORY_GUIDES[category] : undefined;
}

export { REVIEWED as CATEGORY_GUIDES_REVIEWED };
