import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote patterns here once real photography is hosted externally
    // (e.g. a CMS or asset bucket). Local files under /public work with no config.
    remotePatterns: [],
  },
};

export default nextConfig;
