import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { OG_BASE, ORG_ID, SITE_URL } from '../site';
import { CITY_GUIDES, TRAINING_RULE } from '../security-providers/cityGuides';
import { NATIONAL, PORTAL, READ_DATE, STATE_LICENCES, expiredShare, fmt } from './licences';

/* ============================================================
   /psara-license — what a PSARA licence is and how to check one
   ------------------------------------------------------------
   "psara license" is searched about 6,600 times a month in India
   (Semrush, Oct 2026), more than every city query this site targets
   put together. Most of those searchers want one of three things:
   the portal, the fee and validity, or a way to check an agency.
   This page answers all three from the portal itself, and it is the
   check 20fourr's whole pitch rests on.

   Spelled "license" in the URL and title because that is how it is
   searched; the body keeps the site's "licence".

   Every fact is from psara.gov.in (its FAQ, its licence table and its
   state agency lists) or repeats a rule the city guides already cite.
   No penalty amounts: the Act's text on the portal is a scanned PDF,
   and the figures in circulation come from consultancy blogs.
   ============================================================ */

const PATH = '/psara-license';
const URL = `${SITE_URL}${PATH}`;

const SHARE = expiredShare(NATIONAL);

/* Guide cities per state, so a state row can point at the city pages that
   explain its rules. Built from CITY_GUIDES so a new guide links itself. */
const CITIES_BY_STATE = Object.entries(CITY_GUIDES).reduce((acc, [city, g]) => {
  (acc[g.state] ||= []).push(city);
  return acc;
}, {});

const STEPS = [
  {
    title: 'Ask for the licence details',
    body: 'Get the licence number, the state that issued it and the "valid upto" date, in writing. A genuine agency has these to hand. The number names the state: a Delhi licence reads PSA/L/…/DL/…, for example.',
  },
  {
    title: 'Open the state’s list on the portal',
    body: `Go to psara.gov.in. On the home page, the "State/UT wise PSARA Licence Status" table lists every state and union territory. Click the state's name and the portal opens its full list of licensed agencies.`,
  },
  {
    title: 'Find the agency by name',
    body: 'Use your browser’s find (Ctrl+F, or "Find in page" on a phone) to search the list for the agency’s name. Each entry shows the name, address, operational districts, licence number and the dates it is valid from and to.',
  },
  {
    title: 'Match every field',
    body: 'The name on the list should be the name on your contract and invoice. The licence number should be the one you were given, the "valid upto" date should be in the future, and the operational districts should include the district your site is in.',
  },
  {
    title: 'Check the extra licences',
    body: 'An armed guard needs a valid firearm licence as well as the agency’s PSARA licence. If the agency is not on the list, or the details do not match, ask the state’s controlling authority before you sign. The portal lists their contacts.',
  },
];

const RULES = [
  {
    title: 'Issued state by state',
    body: 'There is no single national licence. Each state and union territory has a controlling authority that grants PSARA licences for its own territory, and a licence from one state does not cover work in another.',
  },
  {
    title: 'For a district, several districts or the whole state',
    body: 'A licence is granted for an area of operation. The fee depends on it: ₹5,000 for one district, ₹10,000 for two to five districts and ₹25,000 for the whole state, as the portal lists them under the Act.',
  },
  {
    title: 'Valid for five years',
    body: 'A licence runs for five years. The agency has to apply for renewal at least 45 days before it expires, which is why the "valid upto" date is the field that matters most when you check.',
  },
  TRAINING_RULE,
];

const FAQS = [
  {
    q: 'What is a PSARA licence?',
    a: 'It is the licence a business needs to provide private security guards in India, under the Private Security Agencies (Regulation) Act, 2005, known as PSARA. It is granted by the controlling authority of the state or union territory the agency works in, after the authority has checked the applicant’s antecedents.',
  },
  {
    q: 'How do I check a security agency’s PSARA licence online?',
    a: 'Open psara.gov.in, click your state in the "State/UT wise PSARA Licence Status" table on the home page, and search the list that opens for the agency’s name. Check that its licence number matches the one the agency gave you, that the "valid upto" date has not passed, and that its operational districts include yours.',
  },
  {
    q: 'How long is a PSARA licence valid?',
    a: 'Five years. The agency must apply to the controlling authority for renewal at least 45 days before the licence expires.',
  },
  {
    q: 'What is the PSARA licence fee?',
    a: 'It depends on the area the agency will operate in. The portal lists ₹5,000 for one district, ₹10,000 for two to five districts and ₹25,000 for the whole state.',
  },
  {
    q: 'Is a PSARA licence from one state valid in another?',
    a: 'No. Licences are granted state by state, and even within a state a licence covers only the districts it was granted for. An agency that deploys guards in several states needs a licence from each of them.',
  },
  {
    q: 'What should I do if the agency’s licence has expired?',
    a: `Ask for the renewed licence and check it on the portal the same way before you sign. Expired licences are common: of the ${fmt(NATIONAL.issued)} licences the portal lists as issued, ${fmt(NATIONAL.expired)} (${SHARE}%) had expired on ${READ_DATE}.`,
  },
  {
    q: 'Who can apply for a PSARA licence, and how?',
    a: 'Any citizen, partnership, firm or company that intends to run a private security business. The application is made online on psara.gov.in by creating an agency login, uploading the documents the state asks for and paying the fee electronically; the state’s controlling authority then processes it.',
  },
  {
    q: 'Does 20fourr check PSARA licences?',
    a: 'Yes. 20fourr verifies every provider’s licence against the issuing state authority before they are listed, and checks an armed gunman’s firearm licence before every armed assignment.',
  },
];

const SOURCES = [
  { label: `State/UT wise PSARA Licence Status, PSARA portal home page (Ministry of Home Affairs), read ${READ_DATE}`, url: PORTAL },
  { label: 'Frequently asked questions: fees, validity, renewal and who can apply, PSARA portal', url: `${PORTAL}/FAQNew.aspx` },
  { label: 'State controlling authorities, PSARA portal', url: `${PORTAL}/Officer_listrpt.aspx` },
  { label: 'State/UT rules notified under PSARA, PSARA portal', url: `${PORTAL}/UTRoles.aspx` },
  { label: 'MHA training rules for private security guards (PTI, Dec 2020)', url: 'https://www.theweek.in/wire-updates/national/2020/12/17/del35-mha-private-security-guards.html' },
];

const TITLE = 'PSARA License: How to Check an Agency’s Licence';
const DESCRIPTION = `Check any security agency’s PSARA licence on psara.gov.in in five steps. Fees, five-year validity, renewal, and licence counts for every state: ${SHARE}% of licences issued have expired.`;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} | 20fourr`,
    description: `How to verify a PSARA licence, what it covers, and how many have expired in each state.`,
  },
};

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${URL}#article`,
      url: URL,
      headline: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-IN',
      dateModified: '2026-10-17',
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@type': 'Thing', name: 'Private Security Agencies (Regulation) Act, 2005' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${URL}#faq`,
      url: URL,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': ORG_ID },
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'PSARA licence', item: URL },
      ],
    },
  ],
};

export default function PsaraLicensePage() {
  return (
    <>
      <JsonLd data={LD} />

      {/* ---------- head ---------- */}
      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap">
          <Reveal className="stack g-20">
            <p className="eyebrow">PSARA licence</p>
            <h1>
              How to check a <em>PSARA licence</em> before you hire.
            </h1>
            <p className="lede">
              Every private security agency in India needs a licence under the Private Security
              Agencies (Regulation) Act, 2005, and anyone can check one for free on the Ministry of
              Home Affairs portal. It is worth the two minutes: of the {fmt(NATIONAL.issued)} PSARA
              licences the portal lists as issued, {fmt(NATIONAL.expired)} ({SHARE}%) have expired.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---------- the check ---------- */}
      <section className="band band--ink-2" id="check">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">The check</p>
            <h2>Verify an agency in five steps.</h2>
          </Reveal>
          <Reveal>
            <ol className="lic-steps">
              {STEPS.map((s) => (
                <li className="lic-step" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <p className="guide-roles">
            <a className="text-link" href={PORTAL} target="_blank" rel="noopener noreferrer">
              Open psara.gov.in &rarr;
            </a>
            <a
              className="text-link"
              href={`${PORTAL}/Officer_listrpt.aspx`}
              target="_blank"
              rel="noopener noreferrer"
            >
              State controlling authorities &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ---------- what it covers ---------- */}
      <section className="band band--paper" id="rules">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">What the licence covers</p>
            <h2>One state, a set area, five years.</h2>
          </Reveal>
          <Reveal className="guide-rules">
            {RULES.map((r) => (
              <div className="guide-rule" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- by state ---------- */}
      <section className="band" id="by-state">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">By state</p>
            <h2>PSARA licences issued, active and expired.</h2>
            <p className="lede">
              Every licence the portal has recorded, by the state or union territory that issued it,
              as shown on {READ_DATE}. The counts change daily as licences are granted and lapse.
            </p>
          </Reveal>

          <div className="lic-table-wrap" role="region" aria-label="PSARA licences by state" tabIndex={0}>
            <table className="lic-table">
              <thead>
                <tr>
                  <th scope="col">State or UT</th>
                  <th scope="col">Issued</th>
                  <th scope="col">Active</th>
                  <th scope="col">Expired</th>
                  <th scope="col">Expired share</th>
                </tr>
              </thead>
              <tbody>
                {STATE_LICENCES.map((r) => {
                  const cities = CITIES_BY_STATE[r.state] || [];
                  return (
                    <tr key={r.state}>
                      <th scope="row">
                        {r.state}
                        {cities.length > 0 && (
                          <span className="lic-table__cities">
                            {cities.map((c) => (
                              <Link
                                key={c}
                                className="text-link"
                                href={`/security-providers?city=${encodeURIComponent(c)}`}
                              >
                                Hiring in {c}
                              </Link>
                            ))}
                          </span>
                        )}
                      </th>
                      <td>{fmt(r.issued)}</td>
                      <td>{r.active === null ? 'not shown' : fmt(r.active)}</td>
                      <td>{fmt(r.expired)}</td>
                      {/* A blank active count makes the expired share unreliable too:
                          West Bengal read all-active on 8 October, all-expired on 17. */}
                      <td>{r.active === null ? 'not shown' : `${expiredShare(r)}%`}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">India</th>
                  <td>{fmt(NATIONAL.issued)}</td>
                  <td>{fmt(NATIONAL.active)}</td>
                  <td>{fmt(NATIONAL.expired)}</td>
                  <td>{SHARE}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="guide-sources">
            &ldquo;Not shown&rdquo; means the portal left the active count blank for that state on
            the read date, so its expired share cannot be trusted either. Ladakh&rsquo;s second, empty row on the portal and Lakshadweep, with no
            licences, are left out.
          </p>
        </div>
      </section>

      {/* ---------- questions ---------- */}
      <section className="band band--ink-2" id="questions">
        <div className="wrap">
          <Reveal className="head">
            <p className="eyebrow">Questions</p>
            <h2>PSARA licence questions, answered.</h2>
          </Reveal>
          <Reveal className="faq">
            {FAQS.map((f, i) => (
              <details className="qa" key={f.q} open={i === 0 || undefined}>
                <summary>{f.q}</summary>
                <p className="qa__a">{f.a}</p>
              </details>
            ))}
          </Reveal>

          <div className="guide-sources">
            <p>
              Sources, last reviewed {READ_DATE}. This is a summary, not legal advice; the
              controlling authority in each state has the final word.
            </p>
            <ul>
              {SOURCES.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section className="band">
        <div className="wrap">
          <Reveal className="stack g-20 cta-city">
            <p className="eyebrow">Skip the paperwork</p>
            <h2>
              Hire from agencies whose licence is <em>already checked</em>.
            </h2>
            <p className="lede">
              Every provider on 20fourr has its PSARA licence verified against the issuing state
              before it is listed, and you see the full price before you book.
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
