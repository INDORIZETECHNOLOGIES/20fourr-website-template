/**
 * Structural shell for the four legal pages the footer links to
 * (/terms, /privacy, /refunds, /grievance). These existed only as footer links
 * before — every one 404'd.
 *
 * This is a PLACEHOLDER: the section headings are in place so the real,
 * binding copy can be dropped straight in, but the page says plainly that it is
 * a draft and every route is set to noindex until it is real. Legal text is not
 * something to invent — it has to come from the company/counsel.
 */
export default function LegalPlaceholder({ title, intro, sections = [], children }) {
  return (
    <>
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Legal</p>
            <h1>{title}</h1>
            <p className="lede">{intro}</p>
          </div>
        </div>
      </header>

      <section className="band band--paper">
        <div className="wrap">
          <div className="legal">
            <p className="legal__note">
              <b>Draft placeholder.</b> This is not the final {title.toLowerCase()}. The binding
              version will be published before launch — do not rely on this text.
            </p>

            {sections.map((s) => (
              <div key={s}>
                <h2>{s}</h2>
                <p className="legal__todo">[ Content pending — to be supplied by 20fourr / legal counsel. ]</p>
              </div>
            ))}

            {children}

            <p className="legal__meta">Last updated: pending · Indorse Technologies Pvt. Ltd.</p>
          </div>
        </div>
      </section>
    </>
  );
}
