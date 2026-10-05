import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import { LEGAL_NAME, CLIENT_APP_URL, CLIENT_PLAY_URL, PROVIDER_APP_URL, PROVIDER_PLAY_URL } from '@/app/site';
import { PlayIcon } from './PlayStoreButton';

// Three columns, not five: the old Compliance column was three labels for the
// same /#trust anchor, and the app links now live in their own strip below.
const COLUMNS = [
  {
    title: 'Hire',
    links: [
      ['Security guards', '/security-providers?category=guard'],
      ['Bouncers', '/security-providers?category=bouncer'],
      ['Armed gunmen', '/security-providers?category=gunman'],
      ['Personal security officers', '/security-providers?category=pso'],
      ['Browse all providers', '/security-providers'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['How it works', '/#how'],
      ['PSARA & verification', '/#trust'],
      ['Become a provider', '/join'],
      ['Help centre', '/faqs'],
      ['Support', '/support'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms of service', '/terms'],
      ['Privacy policy', '/privacy'],
      ['Refund & cancellation', '/refunds'],
      ['Grievance officer', '/grievance'],
    ],
  },
];

// External: the web apps live on their own subdomains and the Android builds
// on Play, so these render as plain anchors rather than <Link>s.
const APPS = [
  { name: 'Client app', blurb: 'Book verified security', web: CLIENT_APP_URL, play: CLIENT_PLAY_URL },
  { name: 'Provider app', blurb: 'Take duties, get paid', web: PROVIDER_APP_URL, play: PROVIDER_PLAY_URL },
];

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <Link className="brand" href="/">
              <Image src="/logo-mark.svg" alt="20fourr logo" width={40} height={40} />
              <span className="brand__name">20fourr</span>
            </Link>
            <p>Licensed private security, booked and verified from your phone.</p>
            {/* Same email/address already published on /privacy — this just
                makes it findable without having to open that page first. */}
            <address className="foot__contact">
              <a href="mailto:privacy@20fourr.com">privacy@20fourr.com</a>
              <span>Miyawala, Dehradun, Uttarakhand 248001</span>
            </address>
          </div>

          <nav className="foot__nav" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="foot__apps">
          {APPS.map((app) => (
            <div className="foot__app" key={app.name}>
              <div className="foot__app-id">
                <strong>{app.name}</strong>
                <span>{app.blurb}</span>
              </div>
              <div className="foot__app-links">
                <a className="foot__chip" href={app.web} {...ext}>
                  Open in browser
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M4 2h6v6M10 2 2.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
                <a className="foot__chip" href={app.play} {...ext} aria-label={`${app.name} on Google Play`}>
                  <PlayIcon />
                  Google Play
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="foot__legal">
          {/* The copyright line names the company that owns the product, not the
              product — 20fourr is a brand, Indorize Technologies is the entity. */}
          <p className="foot__credit">
            <span>&copy; {new Date().getFullYear()} {LEGAL_NAME}</span>
            <span>Made in India</span>
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
