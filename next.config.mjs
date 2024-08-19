/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;
