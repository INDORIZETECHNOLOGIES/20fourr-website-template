/**
 * A numbered row of app screenshots on amber plates, used by BookingSteps and
 * DutySteps. Presentation only — each caller owns its own screens and copy.
 *
 * These are screenshots of the shipping client app, not drawings. That is the
 * opposite call to AppPreview and ProviderReel further down the page, which are
 * drawn from `.scr` primitives so they cannot go stale — worth stating, because
 * it is a real trade. What it buys is that the consent gates and the itemised
 * price are demonstrably the product's own screens rather than a marketing
 * rendering of them, which is the claim the compliance sections of the page are
 * already making in prose. What it costs is that these shots go stale silently
 * when the app reskins, so they need re-shooting on any UI change.
 *
 * Every frame renders at one fixed height rather than in a fixed aspect box.
 * The shots come off the device at slightly different ratios (1.94–2.04), and
 * matching heights is what the eye reads across a row; matching widths instead
 * would leave the plates ragged along the bottom.
 */
export default function PhoneSteps({ steps, variant = '' }) {
  return (
    <ol className={variant ? `steps steps--${variant}` : 'steps'}>
      {steps.map((s) => (
        <li className="step" key={s.n}>
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
        </li>
      ))}
    </ol>
  );
}
