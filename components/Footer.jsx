import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      ['Security guards', '/#services'],
      ['Bouncers', '/#services'],
      ['Armed gunmen', '/#services'],
      ['Personal security officers', '/#services'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['For business', '/#business'],
      ['Become a provider', '/join'],
      ['How it works', '/#how'],
      ['Help centre', '/#faq'],
    ],
  },
  {
    title: 'Compliance',
    links: [
      ['PSARA & licensing', '/#trust'],
      ['Verification standards', '/#trust'],
      ['GST & invoicing', '/#pricing'],
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
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot__legal">
          <span>&copy; {new Date().getFullYear()} SecureConnect</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
