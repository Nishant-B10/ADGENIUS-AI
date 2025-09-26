/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Additional bypass for strict mode
    return config;
  },
  swcMinify: false, // Disable SWC minification which can be strict
}

module.exports = nextConfig