import Link from 'next/link';

/**
 * The thumb-reach action bar, mobile only. /join already established this
 * pattern (.jbar); this is the client-side equivalent for the home and landing
 * pages, carrying the site's single primary CTA — "Find Security" — so it is
 * always one tap away however far you have scrolled.
 *
 * One button, not two: the whole point of a sticky bar is a single unambiguous
 * next step. The spacer keeps the fixed bar from covering the footer's last row.
 */
export default function StickyCta({ href = '/security-providers', label = 'Find Security' }) {
  return (
    <>
      <div className="mbar-spacer" aria-hidden="true" />
      <div className="mbar">
        <Link className="btn btn--primary" href={href}>
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </>
  );
}
