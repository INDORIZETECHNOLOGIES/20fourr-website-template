import { ORG_ID, SITE_URL } from '../site';

/**
 * Metadata and structured data for both language versions of /join.
 *
 * Built from one table so the pair can never disagree: a canonical that points
 * at the wrong language, or an hreflang set that lists a URL the other page does
 * not list back, is worse than no hreflang at all — Google drops the whole
 * cluster rather than guessing which side is right.
 */
const PATH = { en: '/join', hi: '/join/hi' };

/* Every page in the set lists every page in the set, itself included, plus one
   x-default for a visitor whose language we have no version for. English is
   x-default because it is what the rest of the site is written in. */
const LANGUAGES = {
  'en-IN': PATH.en,
  'hi-IN': PATH.hi,
  'x-default': PATH.en,
};

const COPY = {
  en: {
    title: 'Work as a security guard — get paid in two days',
    description:
      'Join 20fourr as a security guard, bouncer, gunman, PSO or agency. Set your own rate, get 30% the moment duty starts and the rest two days later. Free to join. Hindi and English support.',
    ogTitle: 'Work as a security guard — get paid in two days | 20fourr',
    ogDescription:
      'Set your own rate. 30% released the moment duty starts, the remaining 70% two days after it ends. Free to join.',
    name: 'Work as a security guard, bouncer, gunman or agency',
    ldDescription:
      'Join 20fourr as an independent security provider. Set your own rate, clear KYC once, and receive 30% when duty starts with the balance two days after it ends.',
    crumb: 'Work as a provider',
    locale: 'en_IN',
    inLanguage: 'en-IN',
  },
  hi: {
    title: 'सिक्योरिटी गार्ड का काम — दो दिन में पेमेंट',
    description:
      '20fourr से गार्ड, बाउंसर, गनमैन, PSO या एजेंसी के तौर पर जुड़ें। अपना रेट खुद तय करें, ड्यूटी शुरू होते ही 30% और बाक़ी दो दिन में। जुड़ना मुफ़्त। हिंदी में सहायता।',
    ogTitle: 'सिक्योरिटी गार्ड का काम — दो दिन में पेमेंट | 20fourr',
    ogDescription:
      'अपना रेट खुद तय करें। ड्यूटी शुरू होते ही 30%, बाक़ी 70% ख़त्म होने के दो दिन बाद। जुड़ना बिल्कुल मुफ़्त।',
    name: 'गार्ड, बाउंसर, गनमैन और एजेंसियों के लिए काम',
    ldDescription:
      '20fourr से एक स्वतंत्र सिक्योरिटी प्रोवाइडर के तौर पर जुड़ें। अपना रेट खुद तय करें, KYC एक बार पूरा करें, ड्यूटी शुरू होते ही 30% और बाक़ी दो दिन बाद।',
    crumb: 'प्रोवाइडर के तौर पर काम',
    locale: 'hi_IN',
    inLanguage: 'hi-IN',
  },
};

export function joinMetadata(lang) {
  const c = COPY[lang];

  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: PATH[lang], languages: LANGUAGES },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      locale: c.locale,
      url: PATH[lang],
    },
  };
}

/* No JobPosting, HowTo or FAQPage here — see the note in page.js for why. The
 * Hindi page gets its own node rather than sharing the English one: two URLs
 * with one @id is one entity claiming to be at two addresses. */
export function joinJsonLd(lang) {
  const c = COPY[lang];
  const url = `${SITE_URL}${PATH[lang]}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: c.name,
        description: c.ldDescription,
        inLanguage: c.inLanguage,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: c.crumb, item: url },
        ],
      },
    ],
  };
}
