import JsonLd from '@/components/JsonLd';
import JumpNav from './JumpNav';
import { LEGAL_NAME, SITE_URL } from '../site';

/**
 * DRAFT — see the callout at the top of the page. Every figure below is
 * sourced from copy already published elsewhere on the site (the homepage's
 * cancellation-policy card, /faqs's pricing section, /join's payout
 * breakdown) rather than invented here. Anything not already stated
 * elsewhere on the site is marked [TO CONFIRM] instead of guessed at.
 *
 * noindex until this has had a real legal review — an unreviewed draft
 * shouldn't be the version Google indexes.
 */
export const metadata = {
  title: 'Refund policy',
  description:
    'How cancellation refunds are calculated, how they are paid out, and how to raise a dispute on 20fourr.',
  alternates: { canonical: '/refunds' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Refund policy | 20fourr',
    description: 'How cancellation refunds are calculated and paid out.',
  },
};

const REFUNDS_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/refunds#webpage`,
      url: `${SITE_URL}/refunds`,
      name: 'Refund policy',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Refund policy', item: `${SITE_URL}/refunds` },
      ],
    },
  ],
};

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'client-cancellations', title: 'Client cancellations' },
  { id: 'provider-side', title: 'Provider-side changes' },
  { id: 'refund-method', title: 'How refunds are paid' },
  { id: 'disputes', title: 'Disputes' },
  { id: 'contact', title: 'Contact' },
];

export default function RefundsPage() {
  return (
    <>
      <JsonLd data={REFUNDS_LD} />

      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Legal &middot; Draft</p>
            <h1>Refund policy</h1>
            <div className="callout">
              <p>
                <b>This page is a working draft, not a finished policy.</b> It restates the
                cancellation figures already published on the homepage and in the FAQs so this
                page exists and the footer link resolves &mdash; it has not been reviewed by
                counsel. Do not treat it as final or enforceable until it has been.
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
                  This policy covers refunds for bookings made through the 20fourr client app. It
                  does not cover provider payouts, which are described in the provider agreement
                  shown during onboarding.
                </p>
              </div>
            </div>

            <div className="legal-group" id="client-cancellations">
              <div className="subhead"><h2>Client cancellations</h2></div>
              <div className="legal-body">
                <p>Cancellation refunds are calculated on a sliding scale based on how long before duty start the cancellation is made:</p>
                <ul className="legal-list">
                  <li><b>More than 24 hours before duty start</b> &mdash; 90% returned to your wallet</li>
                  <li><b>Between 12 and 24 hours before duty start</b> &mdash; 50% returned to your wallet</li>
                  <li><b>Less than 12 hours before duty start</b> &mdash; no refund, because the assigned provider has already turned down other work for that slot</li>
                </ul>
                <p>
                  The pay-as-you-go convenience fee (&#8377;50, or &#8377;100 for night or urgent
                  bookings) is <b>[TO CONFIRM — not stated elsewhere on the site]</b> whether this
                  is refundable under any of the tiers above. Monthly/annual members do not pay
                  this fee, so it does not apply to their cancellations.
                </p>
                <p>
                  GST charged on a booking is refunded in proportion to the base amount refunded,
                  consistent with how it was charged at checkout.
                </p>
              </div>
            </div>

            <div className="legal-group" id="provider-side">
              <div className="subhead"><h2>Provider-side changes</h2></div>
              <div className="legal-body">
                <div className="callout">
                  <p>
                    <b>[TO CONFIRM]</b> &mdash; what happens if the assigned provider cancels, does
                    not show up, or is unable to complete the duty is not described anywhere else
                    on the site yet. This section needs real input before publishing; it is not
                    safe to guess at for a safety-related service.
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-group" id="refund-method">
              <div className="subhead"><h2>How refunds are paid</h2></div>
              <div className="legal-body">
                <p>
                  Refunds under this policy are credited to your 20fourr wallet, not returned
                  directly to your original payment method. Payments themselves are processed
                  through Razorpay (card, UPI and netbanking are supported).{' '}
                  <b>[TO CONFIRM]</b> whether wallet balance can be withdrawn to a bank account, and
                  on what timeline.
                </p>
              </div>
            </div>

            <div className="legal-group" id="disputes">
              <div className="subhead"><h2>Disputes</h2></div>
              <div className="legal-body">
                <p>
                  Raising a dispute in the app opens a tracked ticket with an assigned reviewer and
                  a full chat record. Resolutions fall into one of four types: refund, credit,
                  replacement, or penalty against the provider.
                </p>
              </div>
            </div>

            <div className="legal-group" id="contact">
              <div className="subhead"><h2>Contact</h2></div>
              <div className="legal-body">
                <p>For a refund that has not resolved through the in-app dispute flow:</p>
              </div>
              <div className="invoice" style={{ maxWidth: 480, marginTop: 16 }}>
                <div className="invoice__hd">
                  <span className="invoice__ttl">Support</span>
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
                <div className="invoice__ft">
                  <p>
                    For escalated grievances, see the{' '}
                    <a href="/grievance">Grievance Officer</a> page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
