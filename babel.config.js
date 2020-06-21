module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          shared: './src/shared',
          pages: './src/pages',
          core: './src/core',
          assets: './src/assets',
          navigators: './src/navigators',
          utils: './src/utils',
          components: './src/components',
          config: './src/config',
        },
      },
    ]
  ],
};
