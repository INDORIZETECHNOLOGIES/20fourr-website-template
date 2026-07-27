import JoinClient from './JoinClient';

export const metadata = {
  title: 'Work as a security guard — get paid in two days',
  description:
    'Join SecureConnect as a security guard, bouncer, gunman, PSO or agency. Set your own rate, get 30% the moment duty starts and the rest two days later. Free to join. Hindi and English support.',
  alternates: { canonical: '/join' },
  openGraph: {
    title: 'Work as a security guard — get paid in two days | SecureConnect',
    description:
      'Set your own rate. 30% released the moment duty starts, the remaining 70% two days after it ends. Free to join.',
  },
};

export default function JoinPage() {
  return <JoinClient />;
}
