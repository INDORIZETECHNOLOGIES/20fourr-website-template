/**
 * The verification claims as visual chips rather than paragraphs.
 *
 * Each chip is one check, drawn with a small ink glyph so the row scans in a
 * glance — the home page's badge grid still does the explaining; this is the
 * at-a-glance version that sits high on the page and repeats on every landing.
 *
 * The labels are the same BADGE_LABEL vocabulary the provider chips use, so a
 * visitor meets the identical words on the listings a click away. Icons are
 * inline SVG — no second asset, and they inherit the accent like everything else.
 */

const ICONS = {
  shield: (
    <path d="M12 3l7 3v5c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V6l7-3z" strokeLinejoin="round" />
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M13 10h5M13 13.5h5M5.5 15.5c.6-1.4 4.4-1.4 5 0" strokeLinecap="round" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  star: (
    <path d="M12 4l2.3 4.7 5.2.8-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1L4.5 9.5l5.2-.8L12 4z" strokeLinejoin="round" />
  ),
  firearm: (
    <path d="M4 7h13l3 3v3h-5l-2 4H8l1-4H4V7z" strokeLinejoin="round" />
  ),
  medal: (
    <>
      <path d="M8 3l2 6M16 3l-2 6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="5" />
      <path d="M12 13v2l1.4 1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

const CHIPS = {
  psara_verified: ['shield', 'PSARA verified'],
  verified_identity: ['id', 'ID verified'],
  background_verified: ['check', 'Background checked'],
  firearms_authorized: ['firearm', 'Firearms authorised'],
  top_rated: ['star', 'Top rated'],
  elite_protection: ['shield', 'Elite protection'],
  ex_serviceman: ['medal', 'Ex-serviceman'],
};

export default function TrustStrip({ badges = ['psara_verified', 'verified_identity', 'background_verified', 'top_rated'] }) {
  return (
    <ul className="tstrip">
      {badges.map((b, i) => {
        const [icon, label] = CHIPS[b] ?? ['check', b];
        // Gold is rationed to one badge per section: the first (most important)
        // chip carries the accent, the rest read in the muted tone. Order the
        // list so the badge worth highlighting comes first.
        return (
          <li className={`tchip${i === 0 ? ' tchip--key' : ''}`} key={b}>
            <svg className="tchip__i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {ICONS[icon]}
            </svg>
            {label}
          </li>
        );
      })}
    </ul>
  );
}
