import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';
import { LEGAL_NAME, CLIENT_APP_URL, PROVIDER_APP_URL } from '@/app/site';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      ['Security guards', '/security-providers?category=guard'],
      ['Bouncers', '/security-providers?category=bouncer'],
      ['Armed gunmen', '/security-providers?category=gunman'],
      ['Personal security officers', '/security-providers?category=pso'],
    ],
  },
  {
    title: 'Apps',
    links: [
      // External: the two shipping web apps live on their own subdomains, so
      // these render as plain anchors rather than routed <Link>s.
      ['Client app', CLIENT_APP_URL, true],
      ['Provider app', PROVIDER_APP_URL, true],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Become a provider', '/join'],
      ['How it works', '/#how'],
      ['Help centre', '/faqs'],
    ],
  },
  {
    title: 'Compliance',
    links: [
      ['PSARA & licensing', '/#trust'],
      ['Verification standards', '/#trust'],
      ['Browse providers', '/security-providers'],
      ['Cancellation policy', '/#trust'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms of service', '/terms'],
      ['Privacy policy', '/privacy'],
      ['Refund policy', '/refunds'],
      ['Grievance officer', '/grievance'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__cols">
          <div className="foot__brand">
            <Link className="brand" href="/">
              <Image src="/logo-mark.svg" alt="20fourr logo" width={48} height={48} priority />
              <span className="brand__name" style={{ color: 'var(--paper)' }}>
                20fourr
              </span>
            </Link>
            <p>Licensed private security, booked and verified from your phone.</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(([label, href, external]) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot__legal">
          {/* The copyright line names the company that owns the product, not the
              product — 20fourr is a brand, Indorse Technologies is the entity. */}
          <span>
            &copy; {new Date().getFullYear()} {LEGAL_NAME}
          </span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
