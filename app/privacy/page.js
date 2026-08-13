import LegalPlaceholder from '@/components/LegalPlaceholder';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How 20fourr collects, uses and protects your personal data.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  '1. Information we collect',
  '2. How we use your information',
  '3. KYC & verification data',
  '4. Sharing with providers and third parties',
  '5. Payment & financial data',
  '6. Data retention',
  '7. Your rights (access, correction, deletion)',
  '8. Cookies & analytics',
  '9. Security measures',
  '10. Contact & grievance officer',
];

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      intro="What personal data 20fourr collects, why, how it is protected, and the rights you have over it under Indian data-protection law."
      sections={SECTIONS}
    />
  );
}
