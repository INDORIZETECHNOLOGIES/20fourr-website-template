const CODE = ['4', '9', '2', '7', '1', '6'];

/**
 * Two app screens, drawn in CSS rather than shipped as screenshots.
 *
 * Drawn, not photographed, for three reasons: it stays truthful when the real
 * app UI changes (a stale PNG quietly starts lying), it costs no image weight,
 * and it inherits the site's own tokens so the marketing page and the product
 * cannot drift apart visually.
 *
 * The screens scale with container query units, so the whole mock is driven by
 * one width on `.phone` and stays legible from 180px to 250px.
 *
 * The back screen is the booking; the front is the start code — the gesture the
 * whole product turns on, and the reason this section is not just two buttons.
 */
export default function AppPreview() {
  return (
    <div className="phones" aria-hidden="true">
      <div className="phone phone--back">
        <div className="phone__screen">
          <div className="scr">
            <div className="scr__bar">
              <span>9:41</span>
              <span className="scr__sig" />
            </div>

            <div className="scr__eyebrow">Booking &middot; SC-4471</div>
            <div className="scr__title">Security guard</div>
            <div className="scr__meta">
              Mon 12 Aug &middot; 2 days
              <br />
              Andheri East, Mumbai
            </div>

            <div className="scr__card">
              <div className="scr__who">
                <span className="scr__av" />
                <span>R. Kumar</span>
              </div>
              <div className="scr__ok">PSARA verified</div>
              <div className="scr__rate">&#8377;2,000 / day</div>
            </div>

            <div className="scr__rows">
              <div className="scr__row">
                <span>Service charge</span>
                <span>&#8377;4,000</span>
              </div>
              <div className="scr__row">
                <span>Platform fee + GST</span>
                <span>&#8377;1,487</span>
              </div>
              <div className="scr__row scr__row--total">
                <span>Total</span>
                <span>&#8377;5,487</span>
              </div>
            </div>

            <div className="scr__cta">Confirm &amp; pay &#8377;5,487</div>
          </div>
        </div>
      </div>

      <div className="phone phone--front">
        <div className="phone__screen">
          <div className="scr scr--code">
            <div className="scr__bar">
              <span>9:41</span>
              <span className="scr__sig" />
            </div>

            <div className="scr__eyebrow scr__eyebrow--amber">Start code</div>
            <div className="scr__lede">
              Read this out to your guard when they arrive.
            </div>

            <div className="scr__digits">
              {CODE.map((d, i) => (
                <span className="scr__digit" key={i}>
                  {d}
                </span>
              ))}
            </div>

            <div className="scr__stamp">
              <span className="scr__dot" />
              Duty started &middot; 08:02
            </div>
            <div className="scr__payout">&#8377;987.60 released to guard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
