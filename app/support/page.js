import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { LEGAL_NAME, SITE_URL } from '../site';

/**
 * The Support URL on both App Store listings. App Review rejected /faqs for it
 * (guideline 1.5) because it gives no way to contact us, so this page must
 * always carry a working contact channel. Contact details reuse the email and
 * address already published on /privacy and in the footer.
 */
export const metadata = {
  title: 'Support',
  description:
    'Get help with the 20fourr client and provider apps: contact our team, raise an issue on a booking, or delete your account.',
  alternates: { canonical: '/support' },
};

const SUPPORT_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/support#webpage`,
      url: `${SITE_URL}/support`,
      name: 'Support',
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Support', item: `${SITE_URL}/support` },
      ],
    },
  ],
};

export default function SupportPage() {
  return (
    <>
      <JsonLd data={SUPPORT_LD} />

      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <div className="stack g-20">
            <p className="eyebrow">Support</p>
            <h1>Talk to the 20fourr team</h1>
            <p className="lede">
              Help for clients and security providers using the 20fourr apps. Write to us with your
              registered email or phone number, and the booking ID if your question is about a
              booking, so we can find your account straight away.
            </p>
          </div>
        </div>
      </header>

      <section className="band band--ink-2">
        <div className="wrap">
          <div>
            <div className="legal-group" id="contact">
              <div className="subhead"><h2>Contact us</h2></div>
              <div className="invoice" style={{ maxWidth: 600, marginTop: 16 }}>
                <div className="invoice__hd">
                  <span className="invoice__ttl">20fourr support</span>
                  <span className="invoice__ref">{LEGAL_NAME}</span>
                </div>
                <div className="rows">
                  <div className="row">
                    <span className="row__k">Email</span>
                    <span className="row__v">
                      <a href="mailto:privacy@20fourr.com">privacy@20fourr.com</a>
                    </span>
                  </div>
                  <div className="row">
                    <span className="row__k">Address</span>
                    <span className="row__v">Miyawala, Dehradun, Uttarakhand &mdash; 248001</span>
                  </div>
                  <div className="row">
                    <span className="row__k">Languages</span>
                    <span className="row__v">English, Hindi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="legal-group" id="booking">
              <div className="subhead"><h2>A problem with a booking</h2></div>
              <div className="legal-body">
                <p>
                  The quickest route is from the booking itself. Open it in the app and raise an
                  issue: it reaches our compliance team and the agency together, with the booking
                  record attached. Use it for an officer who has not reported, conduct you are
                  unhappy with, or a charge or refund you think is wrong.
                </p>
                <p>
                  <b>In an emergency, call the police on 112 first.</b> 20fourr is not an emergency
                  service.
                </p>
              </div>
            </div>

            <div className="legal-group" id="delete-account">
              <div className="subhead"><h2>Deleting your account</h2></div>
              <div className="legal-body">
                <p>
                  You can delete your account from inside the client or provider app: open{' '}
                  <b>Profile</b>, tap <b>Delete Account</b>, and confirm. If you can no longer sign
                  in, write to <b>privacy@20fourr.com</b> from your registered email address instead.
                </p>
                <ul className="legal-list">
                  <li>Bookings already in progress are completed before the account is removed</li>
                  <li>Records we are required by law to keep, such as tax invoices, are retained for that period and then deleted</li>
                </ul>
                <p>
                  More on your data rights is in the <Link href="/privacy">privacy policy</Link>.
                </p>
              </div>
            </div>

            <div className="legal-group" id="faqs">
              <div className="subhead"><h2>Common questions</h2></div>
              <div className="legal-body">
                <p>
                  Pricing, cancellations, verification and provider onboarding are answered in the{' '}
                  <Link href="/faqs">help centre</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
