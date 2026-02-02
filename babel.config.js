module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['module:@react-native/babel-preset', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
          },
        },
      ],
      [
        'transform-remove-console',
        {
          exclude: ['error', 'warn', 'info', 'log'],
        },
      ],
    ],
  };
};
