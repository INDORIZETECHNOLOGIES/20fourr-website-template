import JsonLd from '@/components/JsonLd';
import JumpNav from './JumpNav';
import { LEGAL_NAME, SITE_URL } from '../site';

/**
 * DRAFT — see the callout at the top of the page. Sections sourced from copy
 * already published elsewhere on the site (homepage, /faqs, /join, /privacy)
 * are written as fact. Sections that are standard marketplace-agreement
 * boilerplate with no site-specific source (limitation of liability,
 * indemnification, governing law/jurisdiction) are marked [DRAFT CLAUSE —
 * NEEDS LEGAL REVIEW] rather than presented as settled — these carry real
 * consequences if wrong and should not ship without counsel sign-off.
 *
 * noindex until reviewed — an unreviewed draft shouldn't be the version
 * Google indexes.
 */
export const metadata = {
  title: 'Terms of service',
  description: 'The terms governing use of the 20fourr platform by clients and security providers.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Terms of service | 20fourr',
    description: 'The terms governing use of the 20fourr platform.',
  },
};

const TERMS_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/terms#webpage`,
      url: `${SITE_URL}/terms`,
      name: 'Terms of service',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terms of service', item: `${SITE_URL}/terms` },
      ],
    },
  ],
};

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'what-we-are', title: 'What 20fourr is' },
  { id: 'accounts', title: 'Accounts & eligibility' },
  { id: 'bookings', title: 'Bookings & payments' },
  { id: 'cancellations', title: 'Cancellations & refunds' },
  { id: 'providers', title: 'Provider obligations' },
  { id: 'prohibited', title: 'Prohibited conduct' },
  { id: 'liability', title: 'Liability' },
  { id: 'ip', title: 'Intellectual property' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing-law', title: 'Governing law & disputes' },
  { id: 'changes', title: 'Changes' },
  { id: 'contact', title: 'Contact' },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={TERMS_LD} />

      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Legal &middot; Draft</p>
            <h1>Terms of service</h1>
            <div className="callout">
              <p>
                <b>This page is a working draft, not a finished agreement.</b> Sections that
                restate what&rsquo;s already published elsewhere on the site (pricing, provider
                payouts, verification) are accurate to that source. Sections marked{' '}
                <b>[DRAFT CLAUSE &mdash; NEEDS LEGAL REVIEW]</b> are standard boilerplate with no
                site-specific source and must not be relied on until counsel has reviewed them.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="band band--ink-2" id="all">
        <div className="wrap faqs">
          <JumpNav sections={SECTIONS} />

          <div>
            <div className="legal-group" id="overview">
              <div className="subhead"><h2>Overview</h2></div>
              <div className="legal-body">
                <p>
                  These terms govern use of the 20fourr platform (the website at 20fourr.com and
                  the client and provider apps) by {LEGAL_NAME} (&ldquo;20fourr&rdquo;,
                  &ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an account or making a booking,
                  you agree to these terms.
                </p>
              </div>
            </div>

            <div className="legal-group" id="what-we-are">
              <div className="subhead"><h2>What 20fourr is</h2></div>
              <div className="legal-body">
                <p>
                  20fourr is a marketplace that connects clients with independent, PSARA-licensed
                  security agencies and officers. <b>20fourr is not itself a security agency and
                  is not licensed under the Private Security Agencies (Regulation) Act, 2005.</b>{' '}
                  Verification means we have checked a provider&rsquo;s documents and history — it
                  is not a guarantee of future conduct, and no platform can honestly claim
                  otherwise.
                </p>
                <p>
                  Security work carries risk the platform cannot guarantee against. In an
                  emergency, contact the police (112) before contacting 20fourr.
                </p>
              </div>
            </div>

            <div className="legal-group" id="accounts">
              <div className="subhead"><h2>Accounts &amp; eligibility</h2></div>
              <div className="legal-body">
                <p>
                  You must be at least 18 years old and able to form a binding contract under
                  Indian law to create an account. You are responsible for the accuracy of the
                  information you provide and for activity under your account.
                </p>
              </div>
            </div>

            <div className="legal-group" id="bookings">
              <div className="subhead"><h2>Bookings &amp; payments</h2></div>
              <div className="legal-body">
                <p>
                  Prices shown before you book include the base amount, platform fee and GST.
                  Payments are processed online through Razorpay (card, UPI and netbanking) at the
                  time of booking. Pay-as-you-go bookings carry a &#8377;50 convenience fee
                  (&#8377;100 for night or urgent bookings); monthly and annual members pay
                  &#8377;0 convenience fee.
                </p>
                <p>
                  Providers set their own day rate. 20fourr charges providers a 15% platform
                  commission (plus GST on that commission) on completed bookings only — listing,
                  verification and onboarding are free. 30% of a provider&rsquo;s payout is
                  released when the duty-start code is confirmed; the remaining 70% settles two
                  days after the duty ends.
                </p>
              </div>
            </div>

            <div className="legal-group" id="cancellations">
              <div className="subhead"><h2>Cancellations &amp; refunds</h2></div>
              <div className="legal-body">
                <p>
                  Cancellation refunds are calculated on a sliding scale based on how long before
                  duty start you cancel. See the{' '}
                  <a href="/refunds">refund policy</a> for the current figures — that page is also
                  a draft pending review, so treat the exact percentages there the same way.
                </p>
              </div>
            </div>

            <div className="legal-group" id="providers">
              <div className="subhead"><h2>Provider obligations</h2></div>
              <div className="legal-body">
                <p>Providers listed on 20fourr must, before appearing in search results:</p>
                <ul className="legal-list">
                  <li>Hold a valid PSARA licence, verified against the issuing state authority</li>
                  <li>Complete KYC, including government photo ID matched to a live selfie</li>
                  <li>For armed assignments, hold a firearm licence checked per booking</li>
                </ul>
                <p>
                  Providers are independent contractors, not employees of 20fourr. An expired
                  licence or failed re-check takes a provider off the relevant category of work
                  immediately.
                </p>
              </div>
            </div>

            <div className="legal-group" id="prohibited">
              <div className="subhead"><h2>Prohibited conduct</h2></div>
              <div className="legal-body">
                <p>You may not use the platform to:</p>
                <ul className="legal-list">
                  <li>Arrange a booking off-platform to avoid the platform fee, before a booking is confirmed on-platform</li>
                  <li>Provide false identity, licensing or verification documents</li>
                  <li>Use the service for any unlawful purpose</li>
                  <li>Interfere with the platform&rsquo;s normal operation or security</li>
                </ul>
              </div>
            </div>

            <div className="legal-group" id="liability">
              <div className="subhead"><h2>Liability</h2></div>
              <div className="legal-body">
                <div className="callout">
                  <p>
                    <b>[DRAFT CLAUSE &mdash; NEEDS LEGAL REVIEW]</b> This section has real
                    consequences for a safety-related service and must be reviewed by counsel, not
                    shipped as boilerplate. A first-pass structure: 20fourr facilitates
                    introductions and verification between clients and independent providers, and
                    is not a party to the service each provider performs; liability for the
                    security service itself should sit with the provider. The extent to which
                    20fourr itself can or should limit its own liability &mdash; and for what
                    &mdash; needs a lawyer&rsquo;s judgment, not a template clause.
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-group" id="ip">
              <div className="subhead"><h2>Intellectual property</h2></div>
              <div className="legal-body">
                <p>
                  The 20fourr name, logo and platform are the property of {LEGAL_NAME}. Nothing in
                  these terms grants you rights to use them beyond what&rsquo;s needed to use the
                  platform itself.
                </p>
              </div>
            </div>

            <div className="legal-group" id="termination">
              <div className="subhead"><h2>Termination</h2></div>
              <div className="legal-body">
                <p>
                  Either party may close an account at any time. 20fourr may suspend or terminate
                  an account for a violation of these terms, a failed verification re-check, or
                  conduct that puts a client, provider or the platform at risk.
                </p>
              </div>
            </div>

            <div className="legal-group" id="governing-law">
              <div className="subhead"><h2>Governing law &amp; disputes</h2></div>
              <div className="legal-body">
                <div className="callout">
                  <p>
                    <b>[DRAFT CLAUSE &mdash; NEEDS LEGAL REVIEW]</b> These terms are intended to be
                    governed by the laws of India. The courts or arbitration venue with
                    jurisdiction &mdash; and whether disputes route through arbitration first
                    &mdash; is a decision for counsel to make deliberately (it does not have to
                    default to the registered address in Dehradun, Uttarakhand, just because that
                    is where the company is incorporated).
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-group" id="changes">
              <div className="subhead"><h2>Changes to these terms</h2></div>
              <div className="legal-body">
                <p>
                  We may update these terms from time to time. Material changes will be notified
                  via email or a platform notice before taking effect. Continued use of the
                  platform after a change takes effect constitutes acceptance of the revised
                  terms.
                </p>
              </div>
            </div>

            <div className="legal-group" id="contact">
              <div className="subhead"><h2>Contact us</h2></div>
              <div className="legal-body">
                <p>For questions about these terms:</p>
              </div>
              <div className="invoice" style={{ maxWidth: 480, marginTop: 16 }}>
                <div className="invoice__hd">
                  <span className="invoice__ttl">Contact</span>
                  <span className="invoice__ref">{LEGAL_NAME}</span>
                </div>
                <div className="rows">
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
                {LEGAL_NAME} &middot; CIN U62091UT2024PTC017166 &middot; GSTIN 05AAHCI6140B1Z2
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
