/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  // Disable source maps for faster builds
  productionBrowserSourceMaps: false,
  // Optimize for deployment
  experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = nextConfig