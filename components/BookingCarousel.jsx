'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Mobile counterpart to the desktop `.steps` grid in PhoneSteps — one screen
 * per "page", swipeable, with a "Step X of N" position readout instead of the
 * eight stacked plates a vertical layout would produce below 601px. Renders
 * the same step data PhoneSteps does; see `.steps-view--*` in globals.css for
 * which of the two is shown at a given width.
 */
export default function BookingCarousel({ steps }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!track || !items.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(items.indexOf(mostVisible.target));
      },
      { root: track, threshold: [0.6] }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps]);

  function goTo(index) {
    const el = itemRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(active + 1, steps.length - 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(active - 1, 0)); }
  }

  return (
    <div className="carousel" role="group" aria-roledescription="carousel" aria-label="Booking flow, step by step">
      <p className="carousel__pos" aria-live="polite">Step {active + 1} of {steps.length}</p>

      <div className="carousel__track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {steps.map((s, i) => (
          <div
            className="carousel__item"
            key={s.n}
            ref={(el) => { itemRefs.current[i] = el; }}
          >
            <div className="step__stage">
              <img
                className="step__shot"
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.ht}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="step__n">{s.kicker}</p>
            <h3 className="step__h">{s.h}</h3>
            <p className="step__b">{s.b}</p>
          </div>
        ))}
      </div>

      <div className="carousel__dots" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s.n} className={`carousel__dot${i === active ? ' is-on' : ''}`} />
        ))}
      </div>
    </div>
  );
}
