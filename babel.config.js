/**
 * Expo + Reanimated：reanimated 插件必须置于插件列表最后。
 */
module.exports = function cardverseBabel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
