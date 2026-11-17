import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Node.js server deployment (SiteGround). Do not use static export.
  // Apache .htaccess is not on the request path: SiteGround runs `next start`.
  // Legacy URL handling lives in src/proxy.ts (308 and 410). Skipping the
  // built-in trailing-slash redirect lets that file answer the exact indexed
  // URL in one response. Proxy still 308s normal trailing slashes to the
  // canonical path.
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  images: {
    // SiteGround/nginx returns 403 for /_next/image, serve static files directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tymber-blaze-products.imgix.net",
      },
      {
        protocol: "https",
        hostname: "images.weedmaps.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 256, 384, 640],
  },
};

export default nextConfig;
