/**
 * The three roles a provider can sign up as, shown as frames rather than a list.
 *
 * These are built to work with no photography at all, because the site has
 * none and a stock photo of a generic guard would undo the credibility the
 * rest of the page is spending its effort on. Each frame reads as a plate:
 * service code, role name, and the credential that role has to clear.
 *
 * To use a real photograph, put the file in `public/roles/` and set `src` on
 * the role below. The frame keeps its aspect ratio, drops the photo in behind
 * a scrim, and the plate text stays exactly where it is. Nothing else changes.
 *
 * Real guards in real uniforms, or none. Do not fill these with stock.
 */
export default function RoleFrames({ roles }) {
  return (
    <div className="roles">
      {roles.map((r) => (
        <figure className={`role${r.src ? ' role--photo' : ''}`} key={r.code}>
          {r.src ? (
            <img className="role__img" src={r.src} alt={r.alt} loading="lazy" />
          ) : null}
          <figcaption className="role__plate">
            <span className="role__code">{r.code}</span>
            <span className="role__name">{r.name}</span>
            <span className="role__req">{r.req}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
