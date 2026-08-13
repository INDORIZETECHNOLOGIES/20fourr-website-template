'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * The header menu for small screens. The desktop link row is hidden below
 * 900px; without this, Services / Cities / Trust / Providers / FAQs were
 * unreachable from the header on a phone — the site's primary audience.
 *
 * A hamburger toggles a full-width panel under the bar. It closes on link tap,
 * on Escape, and when the viewport grows back to desktop, and it locks body
 * scroll while open so the page behind doesn't drift.
 */
const LINKS = [
  ['Services', '/services'],
  ['Cities', '/cities'],
  ['Trust & compliance', '/#trust'],
  ['Providers', '/security-providers'],
  ['FAQs', '/faqs'],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    // lock scroll and hide the sticky bottom CTA so it doesn't show through
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobmenu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
      document.body.classList.remove('mobmenu-open');
    };
  }, [open]);

  return (
    <>
      <button
        className="navburger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`navburger__box${open ? ' is-open' : ''}`}>
          <span /><span /><span />
        </span>
      </button>

      {open && (
        <div className="mobmenu" id="mobile-menu" onClick={() => setOpen(false)}>
          <nav className="mobmenu__panel" aria-label="Menu" onClick={(e) => e.stopPropagation()}>
            <ul className="mobmenu__links">
              {LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} onClick={() => setOpen(false)}>{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mobmenu__ctas">
              <Link className="btn btn--outline" href="/join" onClick={() => setOpen(false)}>Work as a guard</Link>
              <Link className="btn btn--primary" href="/security-providers" onClick={() => setOpen(false)}>Find Security</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
