/**
 * "Why 20fourr vs a traditional agency" — the spec's simple two-column compare:
 * left "The old way", right "20fourr", one row per claim. Every row is
 * discharged elsewhere on the site (price upfront, badges, the OTP, the dispute
 * route), so this is the summary, not a new promise. The 20fourr side carries a
 * gold check; the old side stays muted, so the contrast is the argument.
 */
const ROWS = [
  ['Ten calls, unclear quotes', 'One search, price upfront'],
  ['Cash at the gate', 'Prepaid, itemised GST invoice'],
  ['“Trust us, he’s verified”', 'Badges computed from documents an admin approved'],
  ['No proof of attendance', 'OTP-verified start/end, logged'],
  ['No recourse', 'A tracked dispute ticket with an owner'],
];

export default function CompareAgency() {
  return (
    <div className="cmp">
      <div className="cmp__hd">
        <span className="cmp__old">The old way</span>
        <span className="cmp__new">20fourr</span>
      </div>
      {ROWS.map(([old, now]) => (
        <div className="cmp__row" key={now}>
          <span className="cmp__old">{old}</span>
          <span className="cmp__new">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12.5l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {now}
          </span>
        </div>
      ))}
    </div>
  );
}
