import LegalPlaceholder from '@/components/LegalPlaceholder';

export const metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'When and how refunds are issued for bookings made on 20fourr.',
  alternates: { canonical: '/refunds' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  '1. Cancellation windows',
  '2. Refund amounts (more than 24h, 12–24h, under 12h)',
  '3. How refunds are processed',
  '4. Provider no-show',
  '5. Disputes & partial refunds',
  '6. Non-refundable charges',
];

export default function RefundsPage() {
  return (
    <LegalPlaceholder
      title="Refund & Cancellation Policy"
      intro="The published clock for cancellations and refunds on every booking, so the terms are the same for everyone."
      sections={SECTIONS}
    />
  );
}
