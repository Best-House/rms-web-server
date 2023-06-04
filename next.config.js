/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
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
