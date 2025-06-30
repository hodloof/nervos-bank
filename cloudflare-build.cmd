@echo off

REM 确保使用正确的Node.js和Yarn版本
echo Using Node.js version:
node -v
echo Using Yarn version:
yarn -v

REM 确保yarn.lock文件存在
if not exist yarn.lock (
  echo Creating yarn.lock file...
  type nul > yarn.lock
)

REM 安装依赖
echo Installing dependencies...
yarn install

REM 构建项目
echo Building project...
yarn build

echo Build completed successfully!