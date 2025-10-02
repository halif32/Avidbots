module.exports = {
  presets: [
    'module:@react-native/babel-preset',
  ],
  plugins: [
    'react-native-worklets/plugin',
    [ 
      'module-resolver',
      {
        root: ['./src/app'],
        alias: {
          src: './src',
          assets: './src/app/assets',
          components: './src/app/components',
          contexts: './src/app/contexts',
          models: './src/app/models',
          navigations: './src/app/navigations',
          pages: './src/app/pages',
          services: './src/app/services',
          shared: './src/app/shared',
          utils: './src/app/utils',
          constants: './src/app/constants',
          styles: './src/app/styles',
        },
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
  ],
};
