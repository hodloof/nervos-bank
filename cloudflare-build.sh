#!/bin/bash

# 确保使用正确的Node.js和Yarn版本
echo "Using Node.js $(node -v) and Yarn $(yarn -v)"

# 确保yarn.lock文件存在
if [ ! -f "yarn.lock" ]; then
  echo "Creating yarn.lock file..."
  touch yarn.lock
fi

# 安装依赖
echo "Installing dependencies..."
yarn install

# 构建项目
echo "Building project..."
yarn build

echo "Build completed successfully!"