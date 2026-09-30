/**
 * Google's "Get it on Google Play" badge, drawn in markup rather than shipped
 * as a PNG so it stays sharp at any size and needs no extra request. Black
 * lozenge, grey hairline and the gradient Play mark follow Google's badge
 * guidelines; the hairline also keeps it from dissolving into the ink ground.
 */
export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="gp-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00A0FF" />
          <stop offset="1" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient id="gp-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00D873" />
          <stop offset="1" stopColor="#00F076" />
        </linearGradient>
        <linearGradient id="gp-yellow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFBD00" />
          <stop offset="1" stopColor="#FFE000" />
        </linearGradient>
        <linearGradient id="gp-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF3A44" />
          <stop offset="1" stopColor="#C31162" />
        </linearGradient>
      </defs>
      <path fill="url(#gp-blue)" d="M3.6 2.2 13.5 12l-9.9 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Z" />
      <path fill="url(#gp-green)" d="M3.6 2.2c.3-.2.8-.2 1.2 0L16.9 9.1 13.5 12Z" />
      <path fill="url(#gp-red)" d="M13.5 12l3.4 2.9L4.8 21.8c-.4.2-.9.2-1.2 0Z" />
      <path fill="url(#gp-yellow)" d="m16.9 9.1 3.5 2c.8.5.8 1.3 0 1.8l-3.5 2L13.5 12Z" />
    </svg>
  );
}

export default function PlayStoreButton({ href, className = '' }) {
  return (
    <a
      className={`play-badge ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
    >
      <PlayIcon />
      <span className="play-badge__text" aria-hidden="true">
        <span className="play-badge__top">Get it on</span>
        <span className="play-badge__name">Google Play</span>
      </span>
    </a>
  );
}
