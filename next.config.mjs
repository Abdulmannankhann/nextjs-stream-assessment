/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev Strict Mode double-invokes render; that made the list counter jump by 2 per click.
  reactStrictMode: false,
};

export default nextConfig;
