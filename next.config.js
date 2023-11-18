/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: false },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://hojun.asuscomm.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
