import * as netlify from '@netlify/next'; // Import everything from the module
const { withNetlify } = netlify; // Destructure the withNetlify function

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNetlify(nextConfig);
