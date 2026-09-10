import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { FAQ_GROUPS } from '@/app/faqs/content';

/**
 * A five-question preview of /faqs, picked for what a first-time visitor is
 * likely to hesitate on before booking. Pulled by question text from the one
 * FAQ_GROUPS source rather than re-typed here, so this can never drift from
 * the answer the full FAQ page gives the same question.
 */
const HOME_FAQ_QUESTIONS = [
  'What does PSARA-verified actually mean?',
  'Are there hidden charges?',
  'What happens in a serious incident?',
  'What is the cancellation policy?',
  'How do I know the officer actually arrived?',
];

const ALL_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
const HOME_FAQS = HOME_FAQ_QUESTIONS.map((q) => ALL_ITEMS.find((item) => item.q === q)).filter(Boolean);

export default function HomeFaq() {
  return (
    <section className="band band--paper" id="faqs">
      <div className="wrap">
        <Reveal className="head">
          <p className="eyebrow">Before you book</p>
          <h2>Questions people ask first.</h2>
          <p className="lede">
            The short version of the answers below the price, the badges and the cancellation clock.
          </p>
        </Reveal>

        <Reveal className="faq">
          {HOME_FAQS.map((f) => (
            <details className="qa" key={f.q}>
              <summary>{f.q}</summary>
              <p className="qa__a">{f.a}</p>
            </details>
          ))}
        </Reveal>

        <p style={{ marginTop: 28 }}>
          <Link className="text-link" href="/faqs">See all FAQs &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
