import JsonLd from '@/components/JsonLd';
import JoinBody from './JoinBody';
import { joinJsonLd, joinMetadata } from './seo';

export const metadata = joinMetadata('en');

/* What this page declares, and deliberately what it does not.
 *
 * No JobPosting. 20fourr does not employ anyone — the home page says so in as
 * many words, and the whole product rests on providers being independent,
 * PSARA-licensed agencies and individuals. Marking this up as a job ad would
 * name us as the hiring organisation for security work we do not perform, which
 * is a false claim before it is an SEO decision.
 *
 * No HowTo for the five joining steps: Google removed HowTo rich results
 * entirely in 2023, so it is markup that can only cost a validation warning.
 *
 * No FAQPage for the six questions at the foot. FAQPage declares what a page
 * *is*, and this page is a recruitment landing page with an FAQ on it, not an
 * FAQ page — /faqs is that, and it already holds the node.
 */
export default function JoinPage() {
  return (
    <>
      <JsonLd data={joinJsonLd('en')} />
      <JoinBody lang="en" />
    </>
  );
}
