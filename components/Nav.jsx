import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <Link className="brand" href="/">
          <Image src="/logo-mark.svg" alt="20fourr logo" width={48} height={48} priority />
          <span className="brand__name">20fourr</span>
        </Link>

        <div className="nav__links">
          <Link href="/#services">Services</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#trust">Trust &amp; compliance</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#business">For business</Link>
        </div>

        <div className="nav__cta">
          <Link className="btn btn--sm btn--ghost" href="/join">
            Work as a guard
          </Link>
          <Link className="btn btn--sm btn--primary" href="/#book">
            Book security
          </Link>
        </div>
      </div>
    </nav>
  );
}
