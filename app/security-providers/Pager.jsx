import Link from 'next/link';

/**
 * Renders real links rather than buttons, so pagination works without JavaScript
 * and each page is independently crawlable.
 */
export default function Pager({ page, pages, params }) {
  if (pages <= 1) return null;

  const href = (n) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v && k !== 'page') q.set(k, v);
    });
    if (n > 1) q.set('page', String(n));
    const s = q.toString();
    return `/security-providers${s ? `?${s}` : ''}`;
  };

  const prev = page - 1;
  const next = page + 1;

  return (
    <nav className="pager" aria-label="Pagination">
      {prev >= 1 ? (
        <Link href={href(prev)}>&larr; Previous</Link>
      ) : (
        <span className="disabled">&larr; Previous</span>
      )}
      <span className="pager__pos">
        Page {page} of {pages}
      </span>
      {next <= pages ? (
        <Link href={href(next)}>Next &rarr;</Link>
      ) : (
        <span className="disabled">Next &rarr;</span>
      )}
    </nav>
  );
}
