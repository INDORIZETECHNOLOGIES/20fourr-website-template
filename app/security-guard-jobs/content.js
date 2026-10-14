/**
 * City pages for people looking for security work: /security-guard-jobs/{city}.
 *
 * Semrush (India, Oct 2026) puts "security guard job in kolkata" and "in mumbai"
 * at 2.9K searches a month each, Chennai 1.9K, Pune 1.6K. English /join is
 * noindex so it does not compete with provider.20fourr.com for provider
 * searches in general; that site has no city pages, so these do not compete
 * with it.
 *
 * Every page carries what is particular to its city: the state's licensing
 * authority, the PSARA training rules, the Security Guards Board where it
 * applies, and what work there is booked for. The pay terms are /join's,
 * word for word in substance. No salary figures and no JobPosting: 20fourr
 * does not employ guards (see app/join/page.js), and providers set their own
 * rates.
 */

import {
  CITY_GUIDES,
  TRAINING_RULE,
  demandLine,
  stateFacts,
  trainingFaq,
} from '../security-providers/cityGuides';
import { cityLabel } from '../security-providers/data';

export const JOB_CITIES = Object.keys(CITY_GUIDES);

export const jobsSlug = (city) => city.toLowerCase();
export const jobsPath = (city) => `/security-guard-jobs/${jobsSlug(city)}`;
export const cityFromJobsSlug = (slug) => JOB_CITIES.find((c) => jobsSlug(c) === slug);

/* Maharashtra districts the 1981 Security Guards Act covers, per the Board's
   own page (securityguardsboard.in/about.html): Greater Mumbai and Thane from
   the start, Pune, Raigad, Nashik, Aurangabad and Nagpur since December 2002. */
const BOARD_NOTE =
  'Maharashtra adds a rule of its own. Under the Maharashtra Private Security Guards Act, 1981, guards who work at offices, shops, warehouses and factories through an agency are supplied by the Security Guards Board or by an agency the state has exempted from it. The Act covers Greater Mumbai and Thane, and since 2002 Pune, Raigad, Nashik, Aurangabad and Nagpur districts.';

export function jobPage(city) {
  const { state } = CITY_GUIDES[city];
  const { authority } = stateFacts(state);
  const where = cityLabel(city);

  const needs = [
    {
      title: `A ${state} PSARA licence behind you`,
      body: `Private security work in ${city} runs under a PSARA licence issued in ${state}, by the ${authority}. An agency needs its own licence; if you work on your own, 20fourr needs your PSARA licence before you can accept bookings. A licence from another state does not cover work in ${city}.`,
    },
    { title: TRAINING_RULE.title, body: TRAINING_RULE.body },
    ...(state === 'Maharashtra' ? [{ title: 'The Security Guards Board', body: BOARD_NOTE }] : []),
    {
      title: 'A firearm licence, for gunman work',
      body: 'Armed bookings need a valid firearm licence, and 20fourr checks it again before every armed booking, not once at signup.',
    },
  ];

  const faqs = [
    {
      q: `Does 20fourr employ security guards in ${city}?`,
      a: `No. 20fourr does not employ guards. You take bookings in ${city} as an independent provider or through your agency, set your own rate, and are paid per booking: 30% when duty starts and the rest two days after it ends.`,
    },
    {
      q: `How much does a security guard job in ${city} pay?`,
      a: 'You set your own day or hourly rate, and what you charge for a vehicle. 20fourr takes a 15% commission, plus 18% GST on that commission, and nothing else. For example, at ₹2,000 a day for two days you receive ₹3,292: ₹987.60 on the day duty starts and ₹2,304.40 two days after it ends.',
    },
    trainingFaq(city),
    {
      q: `Can I take bookings outside ${city}?`,
      a: `Yes, wherever your licence covers. A PSARA licence covers only the state that issued it, so work outside ${state} needs a licence from that state too.`,
    },
    {
      q: 'Can I sign up in Hindi?',
      a: 'Yes. Support is in Hindi and English throughout onboarding, and the joining page is also available in Hindi.',
    },
  ];

  return {
    city,
    state,
    where,
    title: `Security guard jobs in ${where}, paid in two days`,
    description: `Security guard, bouncer and gunman jobs in ${where}. Set your own rate, get 30% when duty starts and the rest two days later. Free to join, with Hindi and English support.`,
    demand: demandLine(city),
    needs,
    faqs,
  };
}
