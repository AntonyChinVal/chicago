module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@factories': './src/factories',
          '@hooks': './src/hooks',
          '@repositories': './src/repositories',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@entities': './src/entities',
          '@nativeModules': './src/nativeModules',
        },
      },
    ],
  ],
};
