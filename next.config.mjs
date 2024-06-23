/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
