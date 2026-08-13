import LegalPlaceholder from '@/components/LegalPlaceholder';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the 20fourr private security marketplace.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  '1. Acceptance of terms',
  '2. Nature of the platform',
  '3. Eligibility',
  '4. Bookings & payment',
  '5. Cancellations & refunds',
  '6. Provider verification & responsibility',
  '7. Prohibited use',
  '8. Limitation of liability',
  '9. Governing law & jurisdiction',
  '10. Changes to these terms',
];

export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms of Service"
      intro="The agreement between you and 20fourr when you use the platform to book private security services."
      sections={SECTIONS}
    />
  );
}
