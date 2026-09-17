'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Below 900px the link row (Services / How it works / Trust & compliance /
 * Security / FAQs) has nowhere to go — it used to just disappear entirely,
 * which meant /faqs in particular had no mobile entry point outside this
 * homepage's own in-page anchors. This toggles the same link list into a
 * dropdown panel instead of removing it.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={open ? 'nav nav--open' : 'nav'}>
      <div className="wrap nav__in">
        <Link className="brand" href="/" onClick={close}>
          <Image src="/logo-mark.svg" alt="20fourr logo" width={48} height={48} priority />
          <span className="brand__name">20fourr</span>
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>

        <div className="nav__links" id="nav-links">
          <Link href="/#services" onClick={close}>Services</Link>
          <Link href="/#how" onClick={close}>How it works</Link>
          <Link href="/#trust" onClick={close}>Trust &amp; compliance</Link>
          <Link href="/security-providers" onClick={close}>Security</Link>
          <Link href="/faqs" onClick={close}>FAQs</Link>
        </div>

        <div className="nav__cta">
          <Link className="btn btn--sm btn--ghost" href="/join">
            <span className="btn__label-full">Work as a guard</span>
            <span className="btn__label-short">Guard</span>
          </Link>
          <Link className="btn btn--sm btn--primary" href="/#book">
            <span className="btn__label-full">Book security</span>
            <span className="btn__label-short">Book</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
