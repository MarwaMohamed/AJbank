import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  // Only apply basePath/assetPrefix in production (GitHub Pages)
  basePath: isProd ? '/AJbank' : '',
  assetPrefix: isProd ? '/AJbank' : '',
};

export default nextConfig;
