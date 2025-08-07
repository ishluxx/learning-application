import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizeFonts: false, // Disable font optimization temporarily
  experimental: {
    turbo: {
      resolveAlias: {
        '@vercel/turbopack-next/internal/font/google/font': '@next/font/google'
      }
    }
  }
};

export default nextConfig;
