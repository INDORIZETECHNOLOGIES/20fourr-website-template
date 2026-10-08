/* ============================================================
   City guides — the written half of a /security-providers?city= page
   ------------------------------------------------------------
   A city page was a grid of sample cards and little else, and it
   ranked 35–75 for "security services in {city}". These guides
   are what the page has to say about hiring security in that city
   that a directory alone cannot: which licence applies, what the
   state adds on top of PSARA, and the questions people ask.

   Every claim here is a legal or regulatory fact with a source in
   `sources`, or a statement about how 20fourr works that the rest
   of the site already makes. Nothing about the sample providers.
   Answers are plain strings for the same reason as faqs/content.js:
   they feed both the rendered list and the FAQPage JSON-LD.

   Licence counts and controlling authorities come from the national
   PSARA portal (psara.gov.in) as read on the REVIEWED date. They
   change; re-read them when a guide is reviewed.

   Day rates are deliberately absent until 20fourr confirms real
   ranges per city — the directory's rates are samples.
   ============================================================ */

const REVIEWED = 'October 2026';

const PORTAL = 'https://psara.gov.in';
const rulesPdf = (file) => `${PORTAL}/Upload_file/${file}`;

/* Read from psara.gov.in on 8 October 2026. */
const STATES = {
  Maharashtra: {
    authority: 'Principal Secretary (Special) of the state government',
    rulesDate: '20 December 2022',
    rulesUrl: rulesPdf('MHStateRules2022.pdf'),
    licences: { issued: '9,299', active: '5,554', expired: '3,745' },
    cashRulesDate: '28 April 2025',
  },
  Delhi: {
    authority: 'Special Secretary-I in the Home Department of the Delhi government',
    rulesDate: '5 February 2024',
    rulesUrl: rulesPdf('Delhi_Rules.pdf'),
    licences: { issued: '2,543', active: '1,274', expired: '1,269' },
    cashRulesDate: '26 June 2019',
  },
  Telangana: {
    authority: 'Additional Director General of Police, Intelligence',
    rulesDate: '16 August 2022',
    rulesUrl: rulesPdf('PSARA_MODEL_RULES_2022_TELANGANA.pdf'),
    licences: { issued: '1,477', active: '943', expired: '534' },
    cashRulesDate: '16 August 2022',
  },
  Karnataka: {
    authority: 'Additional Director General of Police, Internal Security',
    rulesDate: '5 September 2023',
    rulesUrl: rulesPdf('Notified_Rules_of_Karnataka.pdf'),
    licences: { issued: '4,764', active: '1,709', expired: '3,055' },
    cashRulesDate: '1 January 2021',
  },
  'Tamil Nadu': {
    authority: 'state controlling authority for private security agencies',
    rulesDate: '16 December 2022',
    rulesUrl: rulesPdf('tamilnadu_rules2022.pdf'),
    licences: { issued: '2,318', active: '1,078', expired: '1,240' },
    cashRulesDate: '25 January 2022',
  },
  Gujarat: {
    authority: 'Additional Director General of Police (Law & Order)',
    rulesDate: '7 June 2024',
    rulesUrl: rulesPdf('Gujrat_Model_Rules.pdf'),
    licences: { issued: '8,365', active: '3,813', expired: '4,552' },
    cashRulesDate: null,
  },
  Rajasthan: {
    authority: 'Director General and Commandant General, the controlling authority the state has designated',
    rulesDate: '26 August 2022',
    rulesUrl: rulesPdf('Rajasthan_private_security_agencies_rules_2022_gazette_copy.pdf'),
    licences: { issued: '4,505', active: '2,380', expired: '2,125' },
    cashRulesDate: '24 December 2019',
  },
  Haryana: {
    authority: 'Additional Director General of Police, Law & Order',
    rulesDate: '6 May 2022',
    rulesUrl: rulesPdf('HaryanaPSARARules06_05_2022.pdf'),
    licences: { issued: '3,049', active: '1,612', expired: '1,437' },
    cashRulesDate: '13 September 2019',
  },
  'Uttar Pradesh': {
    authority: 'Additional Director General of Police, Law & Order',
    rulesDate: '2 November 2023',
    rulesUrl: rulesPdf('PSARA_Rules_of_Uttar_Pradesh.pdf'),
    licences: { issued: '5,420', active: '3,640', expired: '1,780' },
    cashRulesDate: '26 March 2020',
  },
  'West Bengal': {
    authority: 'Additional Secretary the state has designated as controlling authority',
    rulesDate: '28 February 2025',
    rulesUrl: rulesPdf('WB_Rules_28april2025.pdf'),
    licences: { issued: '741', active: '741', expired: '0' },
    cashRulesDate: null,
  },
  Chandigarh: {
    authority: 'controlling authority of the Chandigarh administration',
    rulesDate: '20 May 2021',
    rulesUrl: rulesPdf('ChandigarhNotificationRules.pdf'),
    licences: { issued: '434', active: '187', expired: '247' },
    cashRulesDate: '4 December 2020',
  },
  Uttarakhand: {
    authority: 'Additional Secretary the state has designated as controlling authority',
    rulesDate: '7 April 2022',
    rulesUrl: rulesPdf('UttarakhandRules_7apr2022.pdf'),
    licences: { issued: '819', active: '425', expired: '394' },
    cashRulesDate: '18 July 2019',
  },
  'Madhya Pradesh': {
    authority: 'Home Secretary of the state government',
    rulesDate: '7 August 2024',
    rulesUrl: rulesPdf('Psara_model_rules_madhya_pradesh.pdf'),
    licences: { issued: '2,082', active: '1,779', expired: '303' },
    cashRulesDate: '7 August 2024',
  },
  Kerala: {
    authority: 'Special Secretary the state has designated as controlling authority',
    rulesDate: '10 November 2022',
    rulesUrl: rulesPdf('Annexure1_KeralaPrivate_Security_Agency_Rule2022.pdf'),
    licences: { issued: '1,435', active: '552', expired: '883' },
    cashRulesDate: '27 May 2020',
  },
};

/* ---------- building blocks shared by every city ---------- */

function licenceRule(city, state) {
  const s = STATES[state];
  return {
    title: `A ${state} PSARA licence`,
    body: `The Private Security Agencies (Regulation) Act, 2005 requires every agency to hold a licence from the state or union territory it deploys guards in. For ${city} that is a licence issued in ${state}, by the ${s.authority}, under rules notified on ${s.rulesDate}. A licence from another state does not cover work here.`,
  };
}

const TRAINING_RULE = {
  title: 'Trained before deployment',
  body: 'The central model rules under PSARA, issued by the Ministry of Home Affairs in December 2020, set the training baseline: at least 100 hours of classroom instruction and 60 hours of field training over at least 20 working days for a new guard. Ex-servicemen and former police take a shorter course of 40 hours in class and 16 in the field over at least seven working days.',
};

function expiredRule(state) {
  const { issued, expired } = STATES[state].licences;
  return {
    title: 'Check the licence is current',
    body: `A licence that was issued is not one that is valid. Of the ${issued} PSARA licences the national portal lists for ${state}, ${expired} have expired. Ask for the licence number and its validity date, and match the agency name to it.`,
  };
}

function licenceCheckFaq(city, state) {
  const { issued, active, expired } = STATES[state].licences;
  const counts =
    expired === '0'
      ? `As of ${REVIEWED}, the national PSARA portal lists ${issued} licences in ${state}, all of them active, but a licence still lapses five years after it is granted unless renewed.`
      : `Expired licences are common: as of ${REVIEWED}, the national PSARA portal lists ${issued} licences issued in ${state}, of which ${active} are active and ${expired} have expired.`;
  return {
    q: `How do I check a security agency's PSARA licence in ${city}?`,
    a: `Ask the agency for its licence number, the state that issued it and its validity date, and check that the licence is in the agency's own name. ${counts} 20fourr verifies every provider's licence against the issuing state authority before listing them.`,
  };
}

function otherStateFaq(city, state) {
  return {
    q: `Can an agency from another state send guards to ${city}?`,
    a: `Only if it also holds a PSARA licence issued by ${state}. A PSARA licence covers the state that issued it, so an agency licensed elsewhere needs a separate ${state} licence to deploy in ${city}.`,
  };
}

function armedFaq(city, state) {
  const cash = STATES[state].cashRulesDate;
  return {
    q: `Can I book an armed guard in ${city}?`,
    a: `Yes. Armed gunmen must hold a valid firearm licence, and 20fourr checks it before every armed assignment, not once at signup. Armed roles usually need more notice than unarmed ones because the licence and assignment checks are stricter.${
      cash
        ? ` Moving cash is covered separately: ${state} notified cash transportation rules under PSARA on ${cash}, and cash-in-transit work has to meet them as well as the agency's licence.`
        : ''
    }`,
  };
}

const trainingFaq = (city) => ({
  q: `What training should a security guard in ${city} have?`,
  a: 'Under the central model rules for PSARA, a new guard needs at least 100 hours of classroom instruction and 60 hours of field training, spread over at least 20 working days. Ex-servicemen and former police personnel take a condensed course of 40 classroom hours and 16 field hours over at least seven working days.',
});

function stateSources(state) {
  return [
    { label: `${state} PSARA rules, notified ${STATES[state].rulesDate} (official PDF)`, url: STATES[state].rulesUrl },
    { label: 'Licence counts by state, PSARA portal (Ministry of Home Affairs)', url: `${PORTAL}/` },
    { label: 'State controlling authorities, PSARA portal', url: `${PORTAL}/Officer_listrpt.aspx` },
  ];
}

const TRAINING_SOURCE = {
  label: 'MHA training rules for private security guards (PTI, Dec 2020)',
  url: 'https://www.theweek.in/wire-updates/national/2020/12/17/del35-mha-private-security-guards.html',
};

const GUARDS_BOARD_SOURCES = [
  { label: 'Maharashtra Security Guards Board: scope and district boards', url: 'https://www.securityguardsboard.in/about.html' },
  { label: 'Exemption conditions under section 23 of the 1981 Act (Govt. of Maharashtra notification)', url: 'https://www.securityguardsboard.in/images/pdf/ExemptionsNotification.pdf' },
];

const ROLES_LINE =
  'All four roles on 20fourr can be booked here: security guards, bouncers, armed gunmen and personal security officers.';

/* ---------- the guides ---------- */

export const CITY_GUIDES = {
  Mumbai: {
    state: 'Maharashtra',
    reviewed: REVIEWED,
    intro: [
      `Security in Mumbai is booked for offices and corporate towers, warehouses and docks, housing societies, film shoots, weddings and venues, and close protection for executives and public figures. ${ROLES_LINE}`,
      'Mumbai is where Maharashtra’s Security Guards Act began. Businesses that employ guards here fall under the Security Guards Board for Greater Mumbai and Thane, on top of the national PSARA licence.',
    ],
    rules: [
      licenceRule('Mumbai', 'Maharashtra'),
      {
        title: 'The Security Guards Board, for business premises',
        body: 'The Maharashtra Private Security Guards (Regulation of Employment and Welfare) Act, 1981 first applied only to Greater Mumbai and Thane. Factories and establishments such as offices, shops and warehouses that employ private guards register with the board as principal employers, and use guards supplied by the board or by an agency the state has exempted. An exempted agency must itself hold a PSARA licence and police-verify its guards.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'Does my office in Mumbai have to go through the Security Guards Board?',
        a: 'If your premises is a factory or an establishment such as an office, shop or warehouse in Greater Mumbai or Thane, the Maharashtra Private Security Guards Act, 1981 applies: you register with the Security Guards Board as a principal employer and use guards supplied by the board or by an agency the state has exempted. Check your case with the board before arranging long-term cover.',
      },
      licenceCheckFaq('Mumbai', 'Maharashtra'),
      armedFaq('Mumbai', 'Maharashtra'),
      trainingFaq('Mumbai'),
    ],
    sources: [...stateSources('Maharashtra'), ...GUARDS_BOARD_SOURCES, TRAINING_SOURCE],
  },

  Pune: {
    state: 'Maharashtra',
    reviewed: REVIEWED,
    intro: [
      `Security in Pune is booked for offices and IT parks, factories and warehouses, housing societies, weddings and venues, and for executives travelling through the city. ${ROLES_LINE}`,
      'Pune has one rule most cities do not. Alongside the national PSARA licence, Maharashtra runs a Security Guards Board for the Pune district, and businesses that employ guards fall under it.',
    ],
    rules: [
      licenceRule('Pune', 'Maharashtra'),
      {
        title: 'The Security Guards Board, for business premises',
        body: 'The Maharashtra Private Security Guards (Regulation of Employment and Welfare) Act, 1981 has covered Pune district since a 2002 notification, with a district board in Pune since 6 February 2003. Factories and establishments such as offices, shops and warehouses that employ private guards register with the board as principal employers, and use guards supplied by the board or by an agency the state has exempted. An exempted agency must itself hold a PSARA licence and police-verify its guards.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'Does my office in Pune have to go through the Security Guards Board?',
        a: 'If your premises is a factory or an establishment such as an office, shop or warehouse in Pune district, the Maharashtra Private Security Guards Act, 1981 applies: you register with the Pune district Security Guards Board as a principal employer and use guards supplied by the board or by an agency the state has exempted. Check your case with the board before arranging long-term cover.',
      },
      otherStateFaq('Pune', 'Maharashtra'),
      licenceCheckFaq('Pune', 'Maharashtra'),
      armedFaq('Pune', 'Maharashtra'),
      trainingFaq('Pune'),
    ],
    sources: [...stateSources('Maharashtra'), ...GUARDS_BOARD_SOURCES, TRAINING_SOURCE],
  },

  Delhi: {
    state: 'Delhi',
    reviewed: REVIEWED,
    intro: [
      `Security in Delhi is booked for offices, embassies and corporate events, weddings and venues, residences, and close protection for executives and visiting delegations. ${ROLES_LINE}`,
      'Delhi is one state in a three-state region. Noida is in Uttar Pradesh and Gurugram is in Haryana, and that matters for which agency can work where.',
    ],
    rules: [
      licenceRule('Delhi', 'Delhi'),
      {
        title: 'Every guard verified and fit for duty',
        body: 'Delhi’s rules require an agency to verify each guard’s character and antecedents before employment, through police databases such as CCTNS and ICJS; the report is due within 15 days and stays valid for five years, even across a change of employer. Guards must also meet physical standards, including a minimum height of 160 cm (150 cm for women) and running 1 km in six minutes.',
      },
      {
        title: 'Trained before deployment',
        body: 'The Delhi rules set the training at no less than 100 hours in class and 60 in the field over at least 20 working days, or 40 and 16 over seven working days for ex-servicemen and former police. A training certificate issued in another state is accepted in Delhi.',
      },
    ],
    faqs: [
      {
        q: 'Can a Delhi agency send guards to Noida or Gurugram?',
        a: 'Only with separate licences. Noida is in Uttar Pradesh and Gurugram is in Haryana, and a PSARA licence covers the state that issued it. An agency working across NCR needs a licence from each of Delhi, Uttar Pradesh and Haryana.',
      },
      {
        q: 'How are security guards police-verified in Delhi?',
        a: 'Under the Delhi Private Security Agencies (Regulation) Rules, 2023, the agency verifies each guard’s character and antecedents before employment, through police databases such as CCTNS and ICJS. The verification report is due within 15 days of the application and stays valid for five years, including across a change of employer.',
      },
      licenceCheckFaq('Delhi', 'Delhi'),
      {
        q: 'Can I book a personal security officer in Delhi?',
        a: 'Yes. Personal security officers are booked like any other role. An armed PSO must hold a valid firearm licence, which 20fourr checks before every armed assignment, and armed roles usually need more notice than unarmed ones.',
      },
      trainingFaq('Delhi'),
    ],
    sources: [...stateSources('Delhi'), TRAINING_SOURCE],
  },

  Hyderabad: {
    state: 'Telangana',
    reviewed: REVIEWED,
    intro: [
      `Security in Hyderabad is booked for IT campuses and offices, pharma and industrial sites, gated communities, weddings and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Telangana rewrote its PSARA rules in 2022, and they set entry standards for guards that go beyond the national baseline, including the languages a guard must work in.',
    ],
    rules: [
      licenceRule('Hyderabad', 'Telangana'),
      {
        title: 'Entry standards for guards',
        body: 'As reported when Telangana’s 2022 rules were tabled in the Assembly, a guard needs at least a Class 8 education, a working knowledge of Telugu, Hindi and English, and a minimum height of 160 cm. Supervisors need Intermediate or SSC with two years’ experience as a guard, and agencies must run a background check on every employee.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'What languages should a security guard in Hyderabad speak?',
        a: 'Telangana’s 2022 PSARA rules, as reported when they were tabled, ask for a working knowledge of Telugu, Hindi and English, so a guard can deal with residents, visitors and staff in any of the three.',
      },
      otherStateFaq('Hyderabad', 'Telangana'),
      licenceCheckFaq('Hyderabad', 'Telangana'),
      armedFaq('Hyderabad', 'Telangana'),
      trainingFaq('Hyderabad'),
    ],
    sources: [
      ...stateSources('Telangana'),
      {
        label: 'Telangana to regulate private security agencies (Deccan Chronicle, Sep 2022)',
        url: 'https://deccanchronicle.com/nation/in-other-news/070922/telangana-to-regulate-private-security-agencies.html',
      },
      TRAINING_SOURCE,
    ],
  },

  Bengaluru: {
    state: 'Karnataka',
    reviewed: REVIEWED,
    intro: [
      `Security in Bengaluru is booked for tech parks and offices, warehouses and data centres, apartment complexes, pubs, weddings and venues, and close protection for founders and visiting executives. ${ROLES_LINE}`,
      'The figure to know in Karnataka is how many licences have lapsed. Most PSARA licences ever issued in the state are no longer valid, so an agency’s licence is worth checking rather than assuming.',
    ],
    rules: [licenceRule('Bengaluru', 'Karnataka'), expiredRule('Karnataka'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Bengaluru', 'Karnataka'),
      otherStateFaq('Bengaluru', 'Karnataka'),
      armedFaq('Bengaluru', 'Karnataka'),
      trainingFaq('Bengaluru'),
    ],
    sources: [...stateSources('Karnataka'), TRAINING_SOURCE],
  },

  Chennai: {
    state: 'Tamil Nadu',
    reviewed: REVIEWED,
    intro: [
      `Security in Chennai is booked for offices and IT corridors, factories and port-side warehouses, apartment complexes, weddings and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Tamil Nadu replaced its PSARA rules in December 2022, and more than half of the licences ever issued in the state have since expired, so a current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Chennai', 'Tamil Nadu'), expiredRule('Tamil Nadu'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Chennai', 'Tamil Nadu'),
      otherStateFaq('Chennai', 'Tamil Nadu'),
      armedFaq('Chennai', 'Tamil Nadu'),
      trainingFaq('Chennai'),
    ],
    sources: [...stateSources('Tamil Nadu'), TRAINING_SOURCE],
  },

  Ahmedabad: {
    state: 'Gujarat',
    reviewed: REVIEWED,
    intro: [
      `Security in Ahmedabad is booked for offices, factories and industrial estates, housing societies, weddings and garba venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Gujarat has issued 8,365 PSARA licences, and more of them have expired than are still active, so a current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Ahmedabad', 'Gujarat'), expiredRule('Gujarat'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Ahmedabad', 'Gujarat'),
      otherStateFaq('Ahmedabad', 'Gujarat'),
      armedFaq('Ahmedabad', 'Gujarat'),
      trainingFaq('Ahmedabad'),
    ],
    sources: [...stateSources('Gujarat'), TRAINING_SOURCE],
  },

  Surat: {
    state: 'Gujarat',
    reviewed: REVIEWED,
    intro: [
      `Security in Surat is booked for diamond and textile units, factories and warehouses, offices, housing societies, weddings and venues. ${ROLES_LINE}`,
      'Gujarat has issued 8,365 PSARA licences, and more of them have expired than are still active, so a current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Surat', 'Gujarat'), expiredRule('Gujarat'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Surat', 'Gujarat'),
      otherStateFaq('Surat', 'Gujarat'),
      armedFaq('Surat', 'Gujarat'),
      trainingFaq('Surat'),
    ],
    sources: [...stateSources('Gujarat'), TRAINING_SOURCE],
  },

  Jaipur: {
    state: 'Rajasthan',
    reviewed: REVIEWED,
    intro: [
      `Security in Jaipur is booked for hotels and heritage venues, destination weddings, offices, showrooms and jewellery businesses, residences, and close protection for visiting executives. ${ROLES_LINE}`,
      'Rajasthan’s 2022 rules spell out what a client can check for themselves: how a guard is police-verified, and what the photo identity card every guard carries has to show.',
    ],
    rules: [
      licenceRule('Jaipur', 'Rajasthan'),
      {
        title: 'Verified, and carrying a proper ID card',
        body: 'Before employing a guard, an agency verifies their character and antecedents, through police databases such as CCTNS and ICJS or a police report applied for online or through E-Mitra; the report is due within 30 days and stays valid for five years. Every guard carries a photo identity card showing a full-face colour photo, their name, the agency’s name, an employee number, their position and the date the card is valid until.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'What should a security guard’s ID card show in Jaipur?',
        a: 'Under the Rajasthan Private Security Agencies (Regulation) Rules, 2022, the photo identity card an agency issues must show a full-face colour photo, the guard’s full name, the agency’s name, the guard’s employee number and position, and the date the card is valid until. A card missing any of these, or past its date, is worth questioning.',
      },
      {
        q: 'How many supervisors should a large deployment in Jaipur have?',
        a: 'Rajasthan’s rules require one supervisor for every 15 guards at most. Where guards are spread across different premises and one supervisor cannot practically oversee them, the agency must post more, so that there is at least one supervisor for every six guards.',
      },
      licenceCheckFaq('Jaipur', 'Rajasthan'),
      armedFaq('Jaipur', 'Rajasthan'),
      trainingFaq('Jaipur'),
    ],
    sources: [...stateSources('Rajasthan'), TRAINING_SOURCE],
  },

  Gurugram: {
    state: 'Haryana',
    reviewed: REVIEWED,
    intro: [
      `Security in Gurugram is booked for corporate towers and offices, malls, warehouses along the expressways, gated communities, weddings and venues, and close protection for executives. ${ROLES_LINE}`,
      'Gurugram is in Haryana, not Delhi. An agency licensed only in Delhi or Uttar Pradesh cannot deploy here, even though the three cities share one metro area.',
    ],
    rules: [
      licenceRule('Gurugram', 'Haryana'),
      {
        title: 'Verified and supervised',
        body: 'Haryana’s 2022 rules require an agency to verify each guard’s character and antecedents before employment, through police databases such as CCTNS and ICJS; the report is due within 15 days and stays valid for five years. Every 15 guards need a supervisor, and guards spread across separate premises need one for every six.',
      },
      TRAINING_RULE,
    ],
    faqs: [
      {
        q: 'Can a Delhi or Noida agency send guards to Gurugram?',
        a: 'Only with a Haryana licence. Gurugram is in Haryana, Delhi is its own state, and Noida is in Uttar Pradesh, and a PSARA licence covers the state that issued it. An agency working across NCR needs a licence from each of the three.',
      },
      {
        q: 'How many supervisors should a large deployment in Gurugram have?',
        a: 'Haryana’s rules require one supervisor for every 15 guards at most. Where guards are on duty at different premises and one supervisor cannot practically oversee them, the agency must post more, so that there is at least one supervisor for every six guards.',
      },
      licenceCheckFaq('Gurugram', 'Haryana'),
      armedFaq('Gurugram', 'Haryana'),
      trainingFaq('Gurugram'),
    ],
    sources: [...stateSources('Haryana'), TRAINING_SOURCE],
  },

  Noida: {
    state: 'Uttar Pradesh',
    reviewed: REVIEWED,
    intro: [
      `Security in Noida is booked for IT and media offices, factories and warehouses, high-rise societies, weddings and venues, and close protection for executives. ${ROLES_LINE}`,
      'Noida is in Uttar Pradesh, not Delhi. An agency licensed only in Delhi or Haryana cannot deploy here, even though the three cities share one metro area.',
    ],
    rules: [licenceRule('Noida', 'Uttar Pradesh'), expiredRule('Uttar Pradesh'), TRAINING_RULE],
    faqs: [
      {
        q: 'Can a Delhi or Gurugram agency send guards to Noida?',
        a: 'Only with an Uttar Pradesh licence. Noida is in Uttar Pradesh, Delhi is its own state, and Gurugram is in Haryana, and a PSARA licence covers the state that issued it. An agency working across NCR needs a licence from each of the three.',
      },
      licenceCheckFaq('Noida', 'Uttar Pradesh'),
      armedFaq('Noida', 'Uttar Pradesh'),
      trainingFaq('Noida'),
    ],
    sources: [...stateSources('Uttar Pradesh'), TRAINING_SOURCE],
  },

  Lucknow: {
    state: 'Uttar Pradesh',
    reviewed: REVIEWED,
    intro: [
      `Security in Lucknow is booked for offices and government contractors, hospitals and institutions, residences, weddings and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Uttar Pradesh replaced its PSARA rules in November 2023, and a third of the licences ever issued in the state have since expired, so a current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Lucknow', 'Uttar Pradesh'), expiredRule('Uttar Pradesh'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Lucknow', 'Uttar Pradesh'),
      otherStateFaq('Lucknow', 'Uttar Pradesh'),
      armedFaq('Lucknow', 'Uttar Pradesh'),
      trainingFaq('Lucknow'),
    ],
    sources: [...stateSources('Uttar Pradesh'), TRAINING_SOURCE],
  },

  Kolkata: {
    state: 'West Bengal',
    reviewed: REVIEWED,
    intro: [
      `Security in Kolkata is booked for offices, factories and port-side warehouses, housing complexes, weddings, pujo pandals and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'West Bengal replaced its 2007 PSARA rules in February 2025, so agencies here now work under rules rewritten that year.',
    ],
    rules: [licenceRule('Kolkata', 'West Bengal'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Kolkata', 'West Bengal'),
      otherStateFaq('Kolkata', 'West Bengal'),
      armedFaq('Kolkata', 'West Bengal'),
      trainingFaq('Kolkata'),
    ],
    sources: [...stateSources('West Bengal'), TRAINING_SOURCE],
  },

  Chandigarh: {
    state: 'Chandigarh',
    reviewed: REVIEWED,
    intro: [
      `Security in Chandigarh is booked for offices and institutions, showrooms, residences, weddings and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Chandigarh is a union territory with its own PSARA licensing. Mohali is in Punjab and Panchkula is in Haryana, so the tricity is three licensing areas, not one.',
    ],
    rules: [licenceRule('Chandigarh', 'Chandigarh'), expiredRule('Chandigarh'), TRAINING_RULE],
    faqs: [
      {
        q: 'Can a Chandigarh agency send guards to Mohali or Panchkula?',
        a: 'Only with separate licences. Chandigarh is a union territory, Mohali is in Punjab and Panchkula is in Haryana, and a PSARA licence covers the state or territory that issued it. An agency working across the tricity needs a licence from each.',
      },
      licenceCheckFaq('Chandigarh', 'Chandigarh'),
      armedFaq('Chandigarh', 'Chandigarh'),
      trainingFaq('Chandigarh'),
    ],
    sources: [...stateSources('Chandigarh'), TRAINING_SOURCE],
  },

  Dehradun: {
    state: 'Uttarakhand',
    reviewed: REVIEWED,
    intro: [
      `Security in Dehradun is booked for institutions and schools, offices, hotels and resorts, residences, weddings and venues, and close protection for visitors. ${ROLES_LINE}`,
      'Uttarakhand replaced its PSARA rules in April 2022, and close to half of the licences ever issued in the state have since expired, so a current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Dehradun', 'Uttarakhand'), expiredRule('Uttarakhand'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Dehradun', 'Uttarakhand'),
      otherStateFaq('Dehradun', 'Uttarakhand'),
      armedFaq('Dehradun', 'Uttarakhand'),
      trainingFaq('Dehradun'),
    ],
    sources: [...stateSources('Uttarakhand'), TRAINING_SOURCE],
  },

  Indore: {
    state: 'Madhya Pradesh',
    reviewed: REVIEWED,
    intro: [
      `Security in Indore is booked for offices, factories and warehouses, hospitals and institutions, residences, weddings and venues, and close protection for executives and visitors. ${ROLES_LINE}`,
      'Madhya Pradesh rewrote its PSARA rules in August 2024 and notified separate rules for cash transportation the same day, replacing rules that dated from 2012.',
    ],
    rules: [licenceRule('Indore', 'Madhya Pradesh'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Indore', 'Madhya Pradesh'),
      otherStateFaq('Indore', 'Madhya Pradesh'),
      armedFaq('Indore', 'Madhya Pradesh'),
      trainingFaq('Indore'),
    ],
    sources: [...stateSources('Madhya Pradesh'), TRAINING_SOURCE],
  },

  Kochi: {
    state: 'Kerala',
    reviewed: REVIEWED,
    intro: [
      `Security in Kochi is booked for port and logistics sites, IT parks and offices, hotels, residences, weddings and venues, and close protection for visiting executives. ${ROLES_LINE}`,
      'Most PSARA licences ever issued in Kerala have expired: 883 of 1,435 on the national portal. A current licence is the first thing to confirm.',
    ],
    rules: [licenceRule('Kochi', 'Kerala'), expiredRule('Kerala'), TRAINING_RULE],
    faqs: [
      licenceCheckFaq('Kochi', 'Kerala'),
      otherStateFaq('Kochi', 'Kerala'),
      armedFaq('Kochi', 'Kerala'),
      trainingFaq('Kochi'),
    ],
    sources: [...stateSources('Kerala'), TRAINING_SOURCE],
  },
};

export function cityGuideFor(city) {
  return city ? CITY_GUIDES[city] : undefined;
}

/* One metro area, separate states: each needs its own licence, which is exactly
   why a reader on one of these pages wants the others. */
const SAME_METRO = [['Delhi', 'Gurugram', 'Noida']];

/** Other guided cities a reader of this one is likely to want: same metro, then same state. */
export function relatedCities(city) {
  const guide = CITY_GUIDES[city];
  if (!guide) return [];
  const metro = SAME_METRO.find((group) => group.includes(city)) ?? [];
  const sameState = Object.keys(CITY_GUIDES).filter((c) => CITY_GUIDES[c].state === guide.state);
  return [...new Set([...metro, ...sameState])].filter((c) => c !== city);
}
