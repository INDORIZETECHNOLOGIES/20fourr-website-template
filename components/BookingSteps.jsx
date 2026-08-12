import PhoneSteps from '@/components/PhoneSteps';

/**
 * The eight client screens a booking walks through, in order: search, profile,
 * purpose, request, the two disclaimer gates, confirmation, payment.
 *
 * Source: mobile/client-app-screens.html — screens 13, 15, 16, 17, 18, 19, 20, 21.
 * See PhoneSteps for why these are screenshots rather than drawn screens.
 */

const STEPS = [
  {
    n: '01',
    kicker: 'Step 01',
    h: 'Find a verified provider',
    b: 'Filter by city and service. Every listing carries the rating, the day and hourly rate, and the badges that provider has actually cleared.',
    src: '/bookings/booking1.png',
    alt: 'The 20fourr app listing verified security providers in Bengaluru, filtered by service type, each with a rating and day rate.',
    w: 684,
    ht: 1396,
  },
  {
    n: '02',
    kicker: 'Step 02',
    h: 'Read the whole profile',
    b: 'Completed bookings, rating, years served and the credentials behind them — PSARA, ex-serviceman, elite protection — before you commit to anything.',
    src: '/bookings/booking2.png',
    alt: 'A provider profile showing 214 completed bookings, a 4.8 rating, 11 years of experience and PSARA and ex-serviceman credentials.',
    w: 710,
    ht: 1400,
  },
  {
    n: '03',
    kicker: 'Step 03',
    h: 'Say what the duty is for',
    b: 'Political, wedding, corporate, celebrity, industrial or building duty. The purpose is what decides whether this provider is the right match at all.',
    src: '/bookings/booking3.png',
    alt: 'The booking purpose screen offering political, wedding, functions, celebrity, industrial and building guard options.',
    w: 702,
    ht: 1362,
  },
  {
    n: '04',
    kicker: 'Step 04',
    h: 'Set the date, hours and site',
    b: 'When the duty starts, how long it runs, where, and whether a vehicle comes with it. The price itemises as you go — base, fee, night surcharge, GST.',
    src: '/bookings/booking4.png',
    alt: 'The booking request screen with service date, start time, hours, site address and an itemised price breakdown.',
    w: 702,
    ht: 1372,
  },
  {
    n: '05',
    kicker: 'Step 05',
    h: 'Acknowledge the risk',
    b: 'Security work carries risk the platform cannot guarantee against. That is stated on its own screen, and it has to be ticked before anything proceeds.',
    src: '/bookings/booking5.png',
    alt: 'The risk acknowledgement screen stating the platform does not guarantee prevention of incidents, harm or loss.',
    w: 694,
    ht: 1364,
  },
  {
    n: '06',
    kicker: 'Step 06',
    h: 'See what we do not control',
    b: 'The platform does not supervise personnel on site or make operational decisions for them. Continue stays greyed out until this is read and ticked.',
    src: '/bookings/booking6.png',
    alt: 'The safety disclaimer screen with the Continue button disabled until the acknowledgement is ticked.',
    w: 686,
    ht: 1374,
  },
  {
    n: '07',
    kicker: 'Step 07',
    h: 'Confirm on the record',
    b: 'The summary, the independent-contractor position stated plainly, and your confirmation logged against the booking — all before any money moves.',
    src: '/bookings/booking7.png',
    alt: 'The booking confirmation screen summarising a PSO booking for 18 August 2026 with an independent contractor acknowledgement.',
    w: 696,
    ht: 1394,
  },
  {
    n: '08',
    kicker: 'Step 08',
    h: 'Pay once, itemised',
    b: 'Provider charge, platform fee and GST, each on its own line. SecureCoins, points and coupons come off the top. The total is the total.',
    src: '/bookings/booking8.png',
    alt: 'The payment screen itemising a 5,520 rupee provider charge, 828 rupee platform fee and 149 rupee GST for a 6,497 rupee total.',
    w: 696,
    ht: 1390,
  },
];

export default function BookingSteps() {
  return <PhoneSteps steps={STEPS} />;
}
