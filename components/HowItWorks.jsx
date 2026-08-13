import PhoneFrame from './PhoneFrame';

/**
 * The four screens between "I need a guard" and "the shift is proven", in order.
 * Shared by the home page and every service and city landing page — the spec's
 * "how it works (same 4 steps)" is one component, not four copies.
 *
 * Real app screens, one line each. The lines describe the mechanism, not a
 * customer story.
 */
const STEPS = [
  ['01', '/app/find-providers.png', 'Find Security Providers screen', 'Filter by city and service. Rating, day rate and badges on every listing.'],
  ['02', '/app/provider-detail.png', 'Provider Detail screen', 'Read the full profile — bookings, rating, years served, verified credentials.'],
  ['03', '/app/booking-request.png', 'Booking Request screen', 'See the price itemised before you book. The total is the total.'],
  ['04', '/app/duty-otp.png', 'Duty OTP screen', 'A code starts and ends the shift. Attendance is proof, not opinion.'],
];

export default function HowItWorks() {
  return (
    <ol className="hiw">
      {STEPS.map(([n, src, alt, line]) => (
        <li className="hiw__step" key={n}>
          <PhoneFrame src={src} alt={alt} />
          <div className="hiw__n">{n}</div>
          <p className="hiw__b">{line}</p>
        </li>
      ))}
    </ol>
  );
}
