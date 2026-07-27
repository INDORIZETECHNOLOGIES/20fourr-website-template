const ROWS = [
  <>Booking requested</>,
  <>Provider PSARA-checked</>,
  <>Payment secured</>,
  <>
    Duty started &middot; OTP <code>4-8-2-1</code>
  </>,
  <>Duty ended &middot; payout released</>,
];

/**
 * The hero's evidence object — a booking's audit trail, already closed.
 *
 * Every row is a state the platform can prove, which is why every dot is
 * green. It reads as a record rather than a demo: nothing here is a feature
 * the visitor has to imagine, it is a receipt they are being shown.
 *
 * Server-rendered. The sequence is pure CSS, so there is no client bundle
 * and no hydration gap before the animation can start.
 */
export default function DutyTicket() {
  return (
    <div className="ticket play">
      <div className="ticket__hd">Duty ticket</div>

      <div className="ticket__rows">
        {ROWS.map((r, i) => (
          <div className="trow" key={i}>
            <span className="trow__dot" aria-hidden="true" />
            <span className="trow__t">{r}</span>
          </div>
        ))}
      </div>

      <div className="ticket__ft">&#8377;987.60 advance released to guard</div>
    </div>
  );
}
