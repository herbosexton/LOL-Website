import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Node.js server deployment (SiteGround). Do not use static export.
  poweredByHeader: false,
  images: {
    // SiteGround/nginx returns 403 for /_next/image — serve static files directly.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 256, 384, 640],
  },
};

export default nextConfig;
