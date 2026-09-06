import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import JumpNav from './JumpNav';
import { LEGAL_NAME, SITE_URL } from '../site';

export const metadata = {
  title: 'Privacy policy',
  description:
    'What 20fourr collects from clients and security providers, how it is used, who it is shared with, how long it is kept, and your rights under the DPDP Act, 2023.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy policy | 20fourr',
    description:
      'What we collect, how we use it, who we share it with, and your rights under the DPDP Act, 2023.',
  },
};

const PRIVACY_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/privacy#webpage`,
      url: `${SITE_URL}/privacy`,
      name: 'Privacy policy',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      dateModified: '2025-07-01',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Privacy policy', item: `${SITE_URL}/privacy` },
      ],
    },
  ],
};

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'data-collected', title: 'Data we collect' },
  { id: 'how-we-use', title: 'How we use it' },
  { id: 'sharing', title: 'Data sharing' },
  { id: 'retention', title: 'Retention' },
  { id: 'security', title: 'Security' },
  { id: 'rights', title: 'Your rights' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'children', title: "Children's privacy" },
  { id: 'dpdp', title: 'DPDP Act, 2023' },
  { id: 'changes', title: 'Changes' },
  { id: 'contact', title: 'Contact' },
];

const DATA_USES = [
  { purpose: 'Account registration and authentication', data: 'Name, email, phone, ID documents', basis: 'Contract performance' },
  { purpose: 'Booking and service facilitation', data: 'Deployment address, booking details, OTP records', basis: 'Contract performance' },
  { purpose: 'Payment processing and payouts', data: 'Bank details, GSTIN, PAN', basis: 'Contract / legal obligation' },
  { purpose: 'PSARA licence verification', data: 'Licence number, issuing authority, expiry', basis: 'Legal obligation' },
  { purpose: 'GST invoicing and tax compliance', data: 'GSTIN, invoice data', basis: 'Legal obligation' },
  { purpose: 'Fraud prevention and platform safety', data: 'Transaction patterns, login history', basis: 'Legitimate interest' },
  { purpose: 'Customer support', data: 'Communications, booking history', basis: 'Contract / legitimate interest' },
  { purpose: 'Platform improvement', data: 'Anonymised usage analytics', basis: 'Legitimate interest' },
  { purpose: 'Marketing communications', data: 'Email, phone', basis: 'Consent' },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={PRIVACY_LD} />

      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Legal</p>
            <h1>Privacy policy</h1>
            <p className="legal-meta">Effective date: 1 January 2025 &middot; Last updated: 1 July 2025</p>
          </div>
        </div>
      </header>

      {/* ---------- sections ---------- */}
      <section className="band band--ink-2" id="all">
        <div className="wrap faqs">
          <JumpNav sections={SECTIONS} />

          <div>
            <div className="legal-group" id="overview">
              <div className="subhead"><h2>Overview</h2></div>
              <div className="legal-body">
                <p>
                  {LEGAL_NAME} (&ldquo;20fourr&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to
                  protecting your privacy. This policy explains what personal data we collect from clients
                  and security providers who use the 20fourr platform, how we use it, and the rights you
                  have over your data.
                </p>
                <p>
                  This policy is written to comply with the{' '}
                  <b>Digital Personal Data Protection Act, 2023 (DPDP Act)</b> and the Information
                  Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                  Information) Rules, 2011.
                </p>
                <div className="callout">
                  <p>
                    By using 20fourr, you consent to the collection and processing of your personal data as
                    described in this policy. You may withdraw consent at any time, subject to the
                    conditions described under Your rights (Section 7).
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-group" id="data-collected">
              <div className="subhead"><h2>Data we collect</h2></div>
              <div className="legal-body">
                <h3>From clients</h3>
                <ul className="legal-list">
                  <li>Full name, email address, phone number</li>
                  <li>Deployment address and service requirements</li>
                  <li>GST registration number (business clients)</li>
                  <li>Payment information, processed via Razorpay &mdash; we do not store card details</li>
                  <li>Booking history, shift OTPs, and service reviews</li>
                  <li>Device and usage data (IP address, browser type, pages visited)</li>
                </ul>
                <h3>From security providers</h3>
                <ul className="legal-list">
                  <li>Business name, registered address, PSARA licence details</li>
                  <li>GSTIN, PAN, and bank account details for payouts</li>
                  <li>Director or proprietor identity documents</li>
                  <li>Personnel records, including police verification and training certificates</li>
                  <li>Profile information and service listings</li>
                </ul>
                <h3>Collected automatically</h3>
                <ul className="legal-list">
                  <li>Log data: access timestamps, API calls, error logs</li>
                  <li>Analytics: session duration, feature usage, funnel metrics, via anonymised analytics tools</li>
                  <li>Location data: approximate location for service-area matching, not real-time GPS tracking</li>
                </ul>
              </div>
            </div>

            <div className="legal-group" id="how-we-use">
              <div className="subhead"><h2>How we use your data</h2></div>
              <div className="badges">
                {DATA_USES.map((u) => (
                  <div className="bcard" key={u.purpose}>
                    <p className="bcard__k">{u.purpose}</p>
                    <p className="bcard__b">{u.data}</p>
                    <p className="bcard__m">
                      Legal basis &middot; <b>{u.basis}</b>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="legal-group" id="sharing">
              <div className="subhead"><h2>Data sharing</h2></div>
              <div className="legal-body">
                <p>We do not sell your personal data. We share it only in the following circumstances.</p>
                <h3>With service providers</h3>
                <ul className="legal-list">
                  <li><b>Razorpay</b> &mdash; payment processing and payout settlement</li>
                  <li><b>Cloud infrastructure</b> &mdash; secure data hosting</li>
                  <li><b>SMS/OTP providers</b> &mdash; OTP and delivery notifications</li>
                  <li><b>Analytics providers</b> &mdash; anonymised usage data only</li>
                </ul>
                <h3>Between clients and providers</h3>
                <p>
                  When a booking is confirmed, limited information is shared between the client and the
                  provider &mdash; specifically the deployment address, shift timings, and contact details
                  necessary to fulfil the service.
                </p>
                <h3>Legal and regulatory authorities</h3>
                <p>
                  We may disclose personal data to government authorities, courts, or law enforcement
                  agencies where required by law, court order, or to protect the rights and safety of users
                  or the public.
                </p>
                <div className="callout">
                  <p>
                    Every third-party service provider we use is contractually bound to process data only
                    for the stated purpose and to maintain appropriate security standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="legal-group" id="retention">
              <div className="subhead"><h2>Data retention</h2></div>
              <div className="legal-body">
                <p>
                  We retain personal data for as long as your account is active or as required to provide
                  services. After account closure:
                </p>
                <ul className="legal-list">
                  <li>Transaction and invoice records: <b>7 years</b> &mdash; GST and accounting obligations</li>
                  <li>PSARA-related provider records: <b>5 years</b> from last engagement</li>
                  <li>Shift OTP and attendance logs: <b>2 years</b></li>
                  <li>Marketing consent records: <b>3 years</b> from last interaction</li>
                  <li>Support communications: <b>2 years</b></li>
                </ul>
                <p>After the applicable retention period, data is securely deleted or anonymised.</p>
              </div>
            </div>

            <div className="legal-group" id="security">
              <div className="subhead"><h2>Data security</h2></div>
              <div className="legal-body">
                <p>We implement reasonable security practices under the IT (SPDI) Rules, 2011, including:</p>
                <ul className="legal-list">
                  <li>AES-256 encryption for data at rest; TLS 1.2+ for data in transit</li>
                  <li>Role-based access controls limiting internal data access to authorised personnel</li>
                  <li>Regular security reviews and vulnerability assessments</li>
                  <li>Secure OTP-based authentication for critical actions</li>
                  <li>No storage of payment card data &mdash; handled exclusively by Razorpay&rsquo;s PCI-DSS-compliant infrastructure</li>
                </ul>
                <p>
                  In the event of a data breach likely to result in a risk to your rights or freedoms, we
                  will notify you and the relevant authority as required under applicable law.
                </p>
              </div>
            </div>

            <div className="legal-group" id="rights">
              <div className="subhead"><h2>Your rights</h2></div>
              <div className="legal-body">
                <p>As a Data Principal under the DPDP Act, 2023, you have the right to:</p>
                <ul className="legal-list">
                  <li><b>Access</b> &mdash; request a summary of the personal data we hold about you</li>
                  <li><b>Correction</b> &mdash; request correction of inaccurate or incomplete data</li>
                  <li><b>Erasure</b> &mdash; request deletion of your personal data, subject to legal retention obligations</li>
                  <li><b>Grievance redressal</b> &mdash; file a complaint with our Grievance Officer</li>
                  <li><b>Withdraw consent</b> &mdash; withdraw consent for marketing communications at any time via your account settings or by emailing privacy@20fourr.com</li>
                  <li><b>Nominate</b> &mdash; nominate an individual to exercise your rights in the event of your death or incapacity</li>
                </ul>
                <p>
                  To exercise any right, write to <b>privacy@20fourr.com</b> from your registered email
                  address. We will respond within 30 days.
                </p>
              </div>
            </div>

            <div className="legal-group" id="cookies">
              <div className="subhead"><h2>Cookies and tracking</h2></div>
              <div className="legal-body">
                <p>We use cookies and similar technologies to operate the platform and improve your experience.</p>
                <ul className="legal-list">
                  <li><b>Essential cookies</b> &mdash; required for login sessions and security, cannot be disabled</li>
                  <li><b>Functional cookies</b> &mdash; remember your preferences, such as language and location filters</li>
                  <li><b>Analytics cookies</b> &mdash; anonymised data on platform usage, can be opted out</li>
                </ul>
                <p>
                  You can manage cookie preferences through your browser settings. Disabling essential
                  cookies will impair platform functionality. We do not use third-party advertising cookies.
                </p>
              </div>
            </div>

            <div className="legal-group" id="children">
              <div className="subhead"><h2>Children&rsquo;s privacy</h2></div>
              <div className="legal-body">
                <p>
                  The platform is not intended for individuals under 18 years of age. We do not knowingly
                  collect personal data from minors. If we become aware that a minor has registered an
                  account, we will delete the account and associated data promptly. If you believe a minor
                  has provided us with personal information, contact us at <b>privacy@20fourr.com</b>.
                </p>
              </div>
            </div>

            <div className="legal-group" id="dpdp">
              <div className="subhead"><h2>DPDP Act, 2023 compliance</h2></div>
              <div className="legal-body">
                <p>In compliance with the Digital Personal Data Protection Act, 2023:</p>
                <ul className="legal-list">
                  <li>We collect only data necessary for the stated purposes &mdash; data minimisation</li>
                  <li>We obtain free, specific, and informed consent before processing personal data where required</li>
                  <li>We have appointed a Grievance Officer accessible to Data Principals</li>
                  <li>We maintain a record of consent and purpose for all personal data processed</li>
                  <li>Significant Data Fiduciary obligations will be adopted as and when notified by the Government of India</li>
                </ul>
              </div>
            </div>

            <div className="legal-group" id="changes">
              <div className="subhead"><h2>Changes to this policy</h2></div>
              <div className="legal-body">
                <p>
                  We may update this privacy policy from time to time. Material changes will be notified
                  via email or a platform notice at least 15 days before taking effect. The &ldquo;Last
                  updated&rdquo; date at the top reflects the most recent revision. Continued use of the
                  platform constitutes acceptance of the revised policy.
                </p>
              </div>
            </div>

            <div className="legal-group" id="contact">
              <div className="subhead"><h2>Contact us</h2></div>
              <div className="legal-body">
                <p>For privacy-related queries or to exercise your data rights:</p>
              </div>
              <div className="invoice" style={{ maxWidth: 480, marginTop: 16 }}>
                <div className="invoice__hd">
                  <span className="invoice__ttl">Privacy office</span>
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
                  <div className="row">
                    <span className="row__k">Response time</span>
                    <span className="row__v">Within 30 days</span>
                  </div>
                </div>
                <div className="invoice__ft">
                  <p>
                    For escalated grievances, see the <Link href="/grievance">Grievance Officer</Link> page.
                  </p>
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
