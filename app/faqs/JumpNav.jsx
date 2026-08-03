'use client';

import { useEffect, useState } from 'react';

/**
 * The sticky section rail.
 *
 * Scroll position is read directly rather than through IntersectionObserver: the
 * question is "which heading did I last pass under the nav", and an observer
 * answers "which elements overlap a band", which is not the same thing once two
 * short groups are on screen at once. A rect check against one line is exact.
 *
 * `groups` arrives as {id, title} only — the answers stay on the server.
 */
export default function JumpNav({ groups }) {
  const [active, setActive] = useState(groups[0]?.id);

  useEffect(() => {
    const ids = groups.map((g) => g.id);
    let frame = 0;

    const pick = () => {
      frame = 0;

      // The detection line sits just below the sticky nav (66px) — a heading is
      // "current" from the moment it passes under it.
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }

      // At the page foot the last heading may still be below the line — nothing
      // scrolls further, so light it anyway rather than stranding the rail on
      // whichever group happens to be tall enough to reach.
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atEnd) current = ids[ids.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [groups]);

  return (
    <nav className="jump" aria-label="FAQ sections">
      <p className="jump__l">Jump to</p>
      <ul className="jump__list">
        {groups.map((g) => {
          const on = active === g.id;
          return (
            <li key={g.id}>
              <a
                className={on ? 'jump__i is-active' : 'jump__i'}
                href={`#${g.id}`}
                aria-current={on ? 'true' : undefined}
              >
                {g.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
