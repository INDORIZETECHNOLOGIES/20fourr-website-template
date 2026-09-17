import JsonLd from '@/components/JsonLd';
import { LEGAL_NAME, SITE_URL } from '../site';

/**
 * DRAFT. /privacy already links here (Section 7, "Your rights") and so does
 * the footer — both were 404ing before this page existed. The DPDP Act,
 * 2023 requires a named Grievance Officer; the officer's name/designation is
 * a real person's identity, not something to invent, so it's left as an
 * explicit placeholder rather than guessed at. Contact details reuse the
 * email/address already published on /privacy — nothing here is new/invented.
 *
 * noindex until a real officer is named and this has had a legal review.
 */
export const metadata = {
  title: 'Grievance officer',
  description: 'How to file a grievance with 20fourr under the DPDP Act, 2023.',
  alternates: { canonical: '/grievance' },
  robots: { index: false, follow: true },
};

const GRIEVANCE_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/grievance#webpage`,
      url: `${SITE_URL}/grievance`,
      name: 'Grievance officer',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Grievance officer', item: `${SITE_URL}/grievance` },
      ],
    },
  ],
};

export default function GrievancePage() {
  return (
    <>
      <JsonLd data={GRIEVANCE_LD} />

      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Legal &middot; Draft</p>
            <h1>Grievance officer</h1>
            <div className="callout">
              <p>
                <b>Draft &mdash; the officer&rsquo;s name below is a placeholder.</b> This page
                exists because <a href="/privacy">/privacy</a> and the footer both already link
                here. The Digital Personal Data Protection Act, 2023 requires a named Grievance
                Officer; naming one is a decision for {LEGAL_NAME}, not something to fill in here.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="band band--ink-2">
        <div className="wrap faqs">
          <div>
            <div className="legal-group" id="overview">
              <div className="subhead"><h2>How to file a grievance</h2></div>
              <div className="legal-body">
                <p>
                  Under the Digital Personal Data Protection Act, 2023, you have the right to file
                  a grievance regarding how your personal data is processed. Write to the
                  Grievance Officer below with your registered email address and a description of
                  the issue. We aim to acknowledge within a reasonable time and resolve within{' '}
                  <b>[TO CONFIRM &mdash; matches the 30-day response time stated for data-rights
                  requests on /privacy, but should be confirmed as the grievance SLA specifically]</b>.
                </p>
              </div>
            </div>
            <div className="legal-group" id="officer">
              <div className="subhead"><h2>Grievance officer</h2></div>
              <div className="invoice" style={{ maxWidth: 480, marginTop: 16 }}>
                <div className="invoice__hd">
                  <span className="invoice__ttl">Grievance officer</span>
                  <span className="invoice__ref">{LEGAL_NAME}</span>
                </div>
                <div className="rows">
                  <div className="row">
                    <span className="row__k">Name</span>
                    <span className="row__v">[TO BE NAMED]</span>
                  </div>
                  <div className="row">
                    <span className="row__k">Email</span>
                    <span className="row__v">privacy@20fourr.com</span>
                  </div>
                  <div className="row">
                    <span className="row__k">Address</span>
                    <span className="row__v">Miyawala, Dehradun, Uttarakhand &mdash; 248001</span>
                  </div>
                </div>
              </div>
              <p className="legal-meta" style={{ marginTop: 16 }}>
                {LEGAL_NAME} &middot; CIN U62091UT2024PTC017166
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
