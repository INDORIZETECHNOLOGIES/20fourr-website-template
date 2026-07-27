/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Marketing pages are fully static — city and service pages added later
  // will be generated at build time by generateStaticParams().
};

export default nextConfig;
