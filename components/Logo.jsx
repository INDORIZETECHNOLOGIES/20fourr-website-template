export default function Logo({ className = 'brand__mark' }) {
  return (
    <svg className={className} viewBox="0 0 22 26" fill="none" aria-hidden="true">
      <path
        d="M11 1 20.5 4.4v8.3c0 5.6-3.8 10.2-9.5 12.3C5.8 22.9 2 18.3 2 12.7V4.4L11 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7 13.2 9.9 16 15.4 10"
        stroke="var(--amber)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
