const config = {
  verbose: true,
  preset: '@testing-library/react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['tsx', 'jsx', 'ts', 'js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui)/)',
  ],
  setupFiles: ['<rootDir>/jest/setup.ts'],
};

module.exports = config;
