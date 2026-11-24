import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 is used for Meta Ads screenshots so the figures stay legible.
    qualities: [75, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
};

export default nextConfig;
