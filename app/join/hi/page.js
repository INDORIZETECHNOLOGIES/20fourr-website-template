import JsonLd from '@/components/JsonLd';
import JoinBody from '../JoinBody';
import { joinJsonLd, joinMetadata } from '../seo';

/**
 * The Hindi provider page.
 *
 * A real route rather than a toggle, because the copy in content.js is written
 * as Hindi rather than translated from English — and until this existed, none of
 * it was reachable by anyone searching in Hindi, which is the audience it was
 * written for.
 *
 * The page renders inside a `lang="hi"` wrapper (see JoinBody), which is what
 * switches the type stack to Devanagari via the `[lang="hi"]` rules in
 * globals.css. The document element stays `en-IN` — one route in a
 * predominantly English site does not change what the site is written in, and
 * hreflang is what tells a crawler this URL is the Hindi one.
 */
export const metadata = joinMetadata('hi');

export default function JoinHindiPage() {
  return (
    <>
      <JsonLd data={joinJsonLd('hi')} />
      <JoinBody lang="hi" />
    </>
  );
}
