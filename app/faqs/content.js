/**
 * The help centre, in one place.
 *
 * Answers are plain strings rather than JSX on purpose: the same array feeds the
 * rendered <details> list and the FAQPage JSON-LD, and schema.org acceptedAnswer
 * has to be text. Keeping one source means a question can never be answered one
 * way on the page and another way in the markup Google reads.
 *
 * `id` is the anchor a header link can target, so /faqs#pricing lands on the
 * right group instead of the top of the page.
 */
export const FAQ_GROUPS = [
  {
    id: 'basics',
    title: 'Getting started',
    items: [
      {
        q: 'Do I need an account to see prices?',
        a: 'No. Pricing is visible to anyone. You only create an account at the point of booking, because we need somewhere to send your confirmation and receipt.',
      },
      {
        q: 'Is 20fourr a security agency?',
        a: 'No. 20fourr is a technology platform that connects clients with independent, PSARA-licensed security agencies and personnel. We do not employ guards or provide security services ourselves, and we are not a private security agency under the Private Security Agencies (Regulation) Act, 2005.',
      },
      {
        q: 'Which cities do you cover?',
        a: 'Coverage expands as verified agencies join. Search by city on the providers page to see live availability — if we have no verified provider there yet, you will be told so rather than shown an unverified one.',
      },
      {
        q: 'How quickly can I get someone on site?',
        a: 'For most roles in covered cities, same-day and next-day bookings are possible subject to availability. Armed personnel and personal security officers usually need more notice because licence and assignment checks are stricter.',
      },
      {
        q: 'Can individuals book, or is this only for businesses?',
        a: 'Both. A homeowner booking one guard for a wedding and a company booking forty for a warehouse use the same platform.',
      },
    ],
  },
  {
    id: 'verification',
    title: 'Verification and safety',
    items: [
      {
        q: 'What does PSARA-verified actually mean?',
        a: 'It means an admin has seen the agency’s licence issued under the Private Security Agencies (Regulation) Act, 2005 and confirmed it is current. It is not a claim the agency makes about itself — a provider cannot award themselves a badge.',
      },
      {
        q: 'Who does the verification?',
        a: 'Our compliance team, before a provider is ever listed. Documents are reviewed by a person, not auto-approved by an upload form.',
      },
      {
        q: 'What is checked for an individual officer?',
        a: 'Identity documents, police verification where applicable, and — for armed roles — a separately verified weapon licence. Which checks a provider has cleared is shown on their listing.',
      },
      {
        q: 'How is the Top rated badge earned?',
        a: 'It requires an average of 4.5 or higher across at least five completed bookings. It cannot be bought, and it is removed automatically if the average drops.',
      },
      {
        q: 'What happens if a licence expires mid-contract?',
        a: 'Listings are tied to licence validity. If a licence lapses, the provider stops appearing in search and cannot accept new bookings until it is renewed and re-verified.',
      },
      {
        q: 'How do you handle my personal data?',
        a: 'Data is processed under the Digital Personal Data Protection Act, 2023. Booking details are shared with the assigned agency because they need them to perform the job, and not with anyone else.',
      },
    ],
  },
  {
    id: 'roles',
    title: 'Roles and services',
    items: [
      {
        q: 'What is the difference between a security guard and a bouncer?',
        a: 'A security guard covers static duty at premises — offices, warehouses, sites and residential societies. A bouncer handles door control and crowd management at events and venues.',
      },
      {
        q: 'What is the difference between an armed gunman and a security guard?',
        a: 'An armed gunman carries a firearm and therefore needs a separately verified weapon licence on top of PSARA registration. We check that licence independently, and no armed booking is accepted without it.',
      },
      {
        q: 'What does a personal security officer do?',
        a: 'Close protection for an individual, family or executive — travel, site visits, events and daily movement — rather than guarding a fixed location.',
      },
      {
        q: 'Can I request ex-army or ex-police personnel?',
        a: 'Yes. Where a provider lists prior service, it is shown on their profile.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing, GST and payments',
    items: [
      {
        q: 'Is GST included in the price I see?',
        a: 'Yes. The figure on screen is the amount payable, broken into base amount, platform fee and GST so you can see exactly what you are paying for.',
      },
      {
        q: 'Why do rates differ between providers?',
        a: 'Rates reflect the role, the city, shift length, experience, whether the officer is armed, and the agency’s own pricing. You see each provider’s rate before choosing, rather than one blended number.',
      },
      {
        q: 'Are there hidden charges?',
        a: 'No. The breakdown shown before you commit is the full amount. Any additional cost — extended hours, overtime, extra personnel added later — is quoted and approved separately.',
      },
      {
        q: 'How do I pay?',
        a: 'Payments are made online through Razorpay at the time of booking. Card, UPI and netbanking are supported.',
      },
      {
        q: 'Does membership actually remove the convenience fee?',
        a: 'Yes. Pay-as-you-go bookings carry a ₹50 convenience fee (₹100 for night or urgent bookings). Monthly and annual members pay ₹0 convenience fee on every booking, and the full breakdown is shown at checkout before you commit.',
      },
    ],
  },
  {
    id: 'booking',
    title: 'Booking, changes and cancellations',
    items: [
      {
        q: 'What do I get when a booking is confirmed?',
        a: 'Written confirmation with the assigned officer’s name, an ID reference, reporting time and site address. The agency receives the same record, so nothing depends on a phone call being remembered.',
      },
      {
        q: 'Can I change the dates or hours after booking?',
        a: 'Changes can be requested from your booking in the app. Whether they are accepted depends on the provider’s availability, and any price difference is shown before you confirm.',
      },
      {
        q: 'What is the cancellation policy?',
        a: 'Cancellation refunds are calculated on a sliding scale based on how long before duty start the cancellation is made, shown at checkout before you book.',
      },
    ],
  },
  {
    id: 'onduty',
    title: 'During the booking',
    items: [
      {
        q: 'How do I know the officer actually arrived?',
        a: 'Check-in and check-out are recorded against the shift you paid for and visible on your booking, so attendance is a matter of record rather than a claim.',
      },
      {
        q: 'What if I have a problem while the officer is on duty?',
        a: 'Raise an issue against the live booking in the app. It goes to our team and the agency at the same time, with the booking record attached.',
      },
      {
        q: 'What happens in a serious incident?',
        a: 'Contact emergency services first — 20fourr is not an emergency service. Then raise an incident on the booking so the agency, our compliance team and the record are all aligned for anything that follows.',
      },
    ],
  },
  {
    id: 'for-providers',
    title: 'For security agencies',
    items: [
      {
        q: 'How do I list my agency on 20fourr?',
        a: 'Apply through the onboarding wizard. You will be asked for your PSARA licence, company registration, GST details and personnel records before your listing can go live.',
      },
      {
        q: 'What does it cost to list?',
        a: 'Listing is free. 20fourr charges a platform fee on completed bookings, which is shown transparently to the client as part of the price breakdown.',
      },
      {
        q: 'How long does verification take?',
        a: 'It depends on how quickly complete documents are submitted. Incomplete or expired paperwork is the most common cause of delay — typically 2 to 5 working days once everything is in.',
      },
      {
        q: 'What gets a provider removed?',
        a: 'Falsified documents, an expired licence, repeated no-shows, or a persistently poor rating. Document fraud results in immediate and permanent removal.',
      },
    ],
  },
];
