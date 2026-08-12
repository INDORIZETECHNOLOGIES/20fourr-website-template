import PhoneSteps from '@/components/PhoneSteps';

/**
 * What happens to a booking after it is paid for: acceptance, the duty codes,
 * the rating.
 *
 * `public/duty/` also holds request.png and paid.png, and they are not used
 * here — both are byte-identical to booking4.png and booking8.png, which the
 * booking strip already shows a section earlier. Showing the same screenshot
 * twice on one page reads as a mistake rather than as a recap, so this section
 * starts where that one stops. The lede carries the two missing states in prose
 * so the lifecycle is not misrepresented as three.
 *
 * Three plates against the booking strip's eight, and three columns against its
 * four — both sections use the same card, so the differing count is what stops
 * the second reading as a repeat of the first.
 *
 * The app carries six states; there are three screens here because the duty
 * code screen is one screen that issues both codes — it generates the end code
 * only after the start code has been verified. Card 02 therefore covers duty
 * started and duty ended together, which is why the section heading no longer
 * counts the states out loud.
 */

const STATES = [
  {
    n: '01',
    kicker: 'Accepted',
    h: 'A provider takes it, or says why not',
    b: 'The booking moves to live, awaiting or pay-now in your list. No silent expiry, and no waiting to find out where you stand.',
    src: '/duty/bookings.png',
    alt: 'The My Bookings screen showing ongoing bookings marked live, pay now and awaiting, each with its dates and total.',
    w: 628,
    ht: 1232,
  },
  {
    n: '02',
    kicker: 'Started & ended',
    h: 'A code opens and closes the shift',
    b: 'Six digits on your phone. You read them out on arrival, they enter them — that is the attendance record, and it releases the first 30%. The same again at the end, which closes the duty and schedules the remaining 70%.',
    src: '/duty/duty-started.png',
    alt: 'The duty OTP screen showing a six-digit start code valid for 27 minutes, with the 30 and 70 percent payment schedule below.',
    w: 612,
    ht: 1244,
  },
  {
    n: '03',
    kicker: 'Rated',
    h: 'Both sides rate each other',
    b: 'Punctuality and professionalism, scored separately, with tags for what went well and what did not. Reputation follows the account into the next booking.',
    src: '/duty/rated.png',
    alt: 'The rate provider screen with a four-star overall rating, separate punctuality and professionalism scores, and feedback tags.',
    w: 632,
    ht: 1252,
  },
];

export default function DutySteps() {
  return <PhoneSteps steps={STATES} variant="duty" />;
}
