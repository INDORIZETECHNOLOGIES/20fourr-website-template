import LegalPlaceholder from '@/components/LegalPlaceholder';

export const metadata = {
  title: 'Grievance Redressal',
  description: 'How to raise a grievance with 20fourr and details of the Grievance Officer.',
  alternates: { canonical: '/grievance' },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  '1. How to raise a grievance',
  '2. Acknowledgement & resolution timelines',
  '3. Escalation',
];

export default function GrievancePage() {
  return (
    <LegalPlaceholder
      title="Grievance Redressal"
      intro="How to report a concern and reach the Grievance Officer, as required under the Information Technology (Intermediary Guidelines) Rules."
      sections={SECTIONS}
    >
      <h2>Grievance Officer</h2>
      <p className="legal__todo">
        [ Name: pending · Email: grievance@20fourr.com (to confirm) · Address:
        Indorse Technologies Pvt. Ltd., India · Contact number: pending ]
      </p>
    </LegalPlaceholder>
  );
}
