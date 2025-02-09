import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
