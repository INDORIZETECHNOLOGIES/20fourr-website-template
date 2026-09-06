'use client';

import { useEffect, useState } from 'react';

/**
 * The sticky section rail — identical scroll logic to the FAQ page's JumpNav.
 * Duplicated rather than shared because each route owns its section list and
 * neither is a component the other imports.
 */
export default function JumpNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    let frame = 0;

    const pick = () => {
      frame = 0;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }

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
  }, [sections]);

  return (
    <nav className="jump" aria-label="Privacy policy sections">
      <p className="jump__l">Jump to</p>
      <ul className="jump__list">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                className={on ? 'jump__i is-active' : 'jump__i'}
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
