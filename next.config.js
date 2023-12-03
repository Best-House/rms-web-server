/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/external-interface/:path*",
        destination: "https://hojun.asuscomm.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
