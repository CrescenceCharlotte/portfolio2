import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Configuration Turbopack (Next.js 16+)
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
    resolveAlias: {
      canvas: './src/empty-module.js',
    },
  },
}

export default nextConfig
