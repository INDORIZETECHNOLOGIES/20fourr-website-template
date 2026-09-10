'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * Mobile-only bottom bar carrying the one primary action, shown only once the
 * hero (and its own "Book verified security" button) has scrolled out of
 * view. Desktop already keeps the action reachable in the sticky nav, so this
 * renders nothing there — see the `.stickybar` media query in globals.css.
 */
export default function StickyBookBar({ href = '#book' }) {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) return;
    targetRef.current = hero;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-66px 0px 0px 0px', threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`stickybar${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <Link className="btn btn--primary" href={href} tabIndex={visible ? 0 : -1}>
        Book verified security
      </Link>
    </div>
  );
}
