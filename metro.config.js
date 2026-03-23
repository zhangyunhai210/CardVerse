const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro：使用 Expo 默认解析，并配置 @ → src 别名以匹配 tsconfig paths。
 */
const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...config.resolver.alias,
  '@': path.resolve(__dirname, 'src'),
};

module.exports = config;
