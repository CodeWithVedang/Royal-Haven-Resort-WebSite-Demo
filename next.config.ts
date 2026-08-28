import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo photography is served from Pexels so that it can be swapped for the
    // property's own asset host by changing `IMAGE_HOST` in src/lib/images.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [96, 128, 200, 256, 320, 384],
    qualities: [60, 68, 75, 82],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
};

export default nextConfig;
