# Cloudflare Pages 部署指南

本文档提供了将此 Next.js 项目部署到 Cloudflare Pages 的步骤和注意事项。

## 部署步骤

1. 登录 Cloudflare Dashboard
2. 进入 Pages 部分
3. 点击 "Create a project" 或 "Connect to Git"
4. 选择包含此项目的 Git 仓库
5. 配置构建设置：
   - **项目名称**：选择一个合适的名称（如 nervos-bank）
   - **生产分支**：选择您的主分支（通常是 `main` 或 `master`）
   - **构建命令**：`yarn install && yarn build`
   - **构建输出目录**：`out`
   - **Node.js 版本**：`18`（或更高）

## 项目配置

已经为 Cloudflare Pages 部署做了以下配置：

1. **next.config.ts**：
   - 启用了静态导出 `output: 'export'`
   - 禁用了图像优化 `images: { unoptimized: true }`
   - 启用了尾部斜杠 `trailingSlash: true`

2. **package.json**：
   - 添加了 `prebuild` 脚本以确保依赖安装

3. **wrangler.toml**：
   - 配置了构建命令和输出目录
   - 设置了环境变量和缓存配置

4. **.yarnrc.yml**：
   - 配置了 `enableImmutableInstalls: false` 以允许在没有锁文件的情况下安装

5. **.gitignore**：
   - 确保 `yarn.lock` 文件不被忽略

## 注意事项

1. Cloudflare Pages 不支持服务器端渲染 (SSR)，因此项目使用静态导出。
2. 如果您的项目使用 API 路由，需要将其转换为 Cloudflare Workers 或 Functions。
3. 如果需要在子路径下部署，请在 `next.config.ts` 中设置 `basePath` 选项。
4. 部署后，可能需要清除 Cloudflare 缓存以查看最新更改。

## 故障排除

如果遇到部署问题：

1. 检查 Cloudflare Pages 构建日志
2. 确保 `yarn.lock` 文件已提交到仓库
3. 验证 Node.js 和 Yarn 版本兼容性
4. 尝试增加构建内存限制（已在配置中设置）