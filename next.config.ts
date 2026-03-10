import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  basePath: '/AJbank',
  assetPrefix: '/AJbank',
};

export default nextConfig;
