import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 增加内存限制，解决构建时内存不足的问题
    memoryBasedWorkersCount: true,
  },
  // 外部包配置（从experimental移动到这里）
  serverExternalPackages: [],
  webpack: (config) => {
    // 增加 webpack 内存限制
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };
    return config;
  },
};

export default nextConfig;
