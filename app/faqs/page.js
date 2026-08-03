import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import JumpNav from './JumpNav';
import { ORG_ID, SITE_URL } from '../site';
import { FAQ_GROUPS } from './content';

export const metadata = {
  title: 'FAQs — booking, verification, GST and cancellations',
  description:
    'Answers on PSARA verification, what a badge proves, GST-inclusive pricing, cancellations, what happens on duty, and how agencies get listed on 20fourr.',
  alternates: { canonical: '/faqs' },
  openGraph: {
    title: 'FAQs | 20fourr',
    description:
      'How verification works, what you pay, what happens on duty, and how agencies get listed.',
  },
};

/* One FAQPage node for the whole route rather than one per group. Google reads a
   single FAQPage per URL; seven nodes on one page is the same content declared
   seven times, which is how a page earns a structured-data warning instead of a
   rich result. Answers are the exact strings rendered below — markup that says
   something the page does not is the failure mode this file avoids.

   Worth knowing what this does and does not buy: since Google's August 2023
   change, FAQ rich results are shown only for recognised government and health
   sites. This will validate and it helps a crawler resolve what the page is and
   whose it is — it will not put dropdowns under our search listing.

   Shaped as a @graph with a breadcrumb like every other route, so the site reads
   as one connected entity rather than a set of unrelated templates. */
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/faqs#faq`,
      url: `${SITE_URL}/faqs`,
      name: 'Frequently asked questions',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      mainEntity: FAQ_GROUPS.flatMap((g) =>
        g.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        }))
      ),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'FAQs', item: `${SITE_URL}/faqs` },
      ],
    },
  ],
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={FAQ_LD} />

      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">Help centre</p>
            <h1>
              Questions, <em>answered</em> before you book.
            </h1>
            <p className="lede">
              What verification actually proves, what you pay and when, what happens once an officer
              is on site, and how an agency gets listed. If something here contradicts what you were
              told, the answer on this page is the one that holds.
            </p>
          </Reveal>

        </div>
      </header>

      {/* ---------- groups ---------- */}
      <section className="band band--ink-2" id="all">
        <div className="wrap faqs">
          {/* Only the id and title cross to the client — the answers are the bulk
              of this route and they have no business in the RSC payload twice. */}
          <JumpNav groups={FAQ_GROUPS.map(({ id, title }) => ({ id, title }))} />

          <div>
            {FAQ_GROUPS.map((g) => (
              <div className="faq-group" id={g.id} key={g.id}>
                <Reveal className="subhead subhead--faq">
                  <h2>{g.title}</h2>
                </Reveal>
                <Reveal className="faq">
                  {g.items.map((f) => (
                    <details className="qa" key={f.q}>
                      <summary>{f.q}</summary>
                      <p className="qa__a">{f.a}</p>
                    </details>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="stack g-20 cta-city">
            <p className="eyebrow">Still unanswered</p>
            <h2>
              Ask it against a <em>booking</em>.
            </h2>
            <p className="lede">
              Anything specific to a duty &mdash; a change of hours, an officer who has not reported,
              a document you doubt &mdash; belongs on the booking itself, where our compliance team
              and the agency see it at the same time with the record attached.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href="/security-providers">
                Browse verified providers
              </Link>
              <Link className="btn btn--outline" href="/join">
                List your agency
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
