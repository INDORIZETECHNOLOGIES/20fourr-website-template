import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, REDDIT_URL, X_URL } from '@/app/site';

/* One outline set (24px grid, 1.75 stroke) so the five read as a family. They
   are drawn at 20px in --paper inside a bordered 40px tap target; the old 18px
   steel-grey glyphs were hard to see on the ink footer. */
const PROFILES = [
  {
    label: 'X (Twitter)',
    href: X_URL,
    paths: ['M4 4l11.733 16h4.267l-11.733 -16z', 'M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772'],
  },
  {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    paths: ['M8 11v5', 'M8 8v.01', 'M12 16v-5', 'M16 16v-3a2 2 0 0 0 -4 0'],
    rect: { x: 4, y: 4, width: 16, height: 16, rx: 2 },
  },
  {
    label: 'Facebook',
    href: FACEBOOK_URL,
    paths: ['M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3'],
  },
  {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    paths: ['M16.5 7.5v.01'],
    rect: { x: 4, y: 4, width: 16, height: 16, rx: 4 },
    circle: { cx: 12, cy: 12, r: 3 },
  },
  {
    label: 'Reddit',
    href: REDDIT_URL,
    paths: [
      'M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.316 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.316 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z',
      'M12 8l1 -5l6 1',
      'M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5',
      'M9 13v.01',
      'M15 13v.01',
    ],
  },
];

export default function SocialLinks() {
  return (
    <div className="social">
      {PROFILES.map(({ label, href, paths, rect, circle }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {rect && <rect {...rect} />}
            {circle && <circle {...circle} />}
            {paths.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        </a>
      ))}
    </div>
  );
}
