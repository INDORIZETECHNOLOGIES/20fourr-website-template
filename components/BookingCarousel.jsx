'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The booking flow's one-step-at-a-time strip, at every width — swipeable on
 * touch, arrow-key and prev/next-button navigable otherwise, with a
 * "Step X of N" position readout instead of the eight-plate grid PhoneSteps
 * renders for DutySteps' three-item strip. Renders the same step data
 * PhoneSteps does; see `.carousel` in globals.css for the responsive sizing.
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

  // Scrolls the track only. scrollIntoView would also scroll the page to
  // bring the plate into view, which jumps the viewport when a step is picked
  // from the desktop index while the plate sits partly off-screen.
  function goTo(index) {
    const track = trackRef.current;
    const el = itemRefs.current[index];
    if (!track || !el) return;
    track.scrollTo({ left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2, behavior: 'smooth' });
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(active + 1, steps.length - 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(active - 1, 0)); }
  }

  return (
    <div className="carousel" role="group" aria-roledescription="carousel" aria-label="Booking flow, step by step">
      <div className="carousel__head">
        <p className="carousel__pos" aria-live="polite">Step {active + 1} of {steps.length}</p>

        <div className="carousel__arrows">
          <button
            type="button"
            className="carousel__arrow"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous step"
          >
            &larr;
          </button>
          <button
            type="button"
            className="carousel__arrow"
            onClick={() => goTo(active + 1)}
            disabled={active === steps.length - 1}
            aria-label="Next step"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="carousel__track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {steps.map((s, i) => (
          <div
            className={`carousel__item${i === active ? ' is-active' : ''}`}
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

      {/* Desktop only (see .carousel__index): the whole sequence as a ruled
          list beside the plate, so the band's width carries the order of the
          eight steps while the screenshots still arrive one at a time. */}
      <ol className="carousel__index">
        {steps.map((s, i) => (
          <li key={s.n} className={i === active ? 'is-active' : undefined}>
            <button type="button" onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
              <span className="carousel__index-n">{s.n}</span>
              <span className="carousel__index-h">{s.h}</span>
            </button>
            <div className="carousel__index-body">
              <p>{s.b}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="carousel__dots">
        {steps.map((s, i) => (
          <button
            type="button"
            key={s.n}
            className={`carousel__dot${i === active ? ' is-on' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to step ${i + 1}: ${s.h}`}
            aria-current={i === active ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
