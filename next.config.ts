import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 增加内存限制，解决构建时内存不足的问题
    memoryBasedWorkersCount: true,
  },
  // 外部包配置（从experimental移动到这里）
  serverExternalPackages: [],
  // 启用静态导出
  output: 'export',
  // 设置基本路径，如果部署在子目录则需要修改
  // basePath: '',
  // 确保生成的静态文件可以在Cloudflare Pages上正常工作
  trailingSlash: true,
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
