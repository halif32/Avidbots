module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Import validation rules
    'import/no-unresolved': 'error',
    'import/named': 'error', 
    'import/default': 'error',
    'import/namespace': 'error',
    
    // React Native specific import rules
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'warn',
    
    // General code quality
    'no-undef': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
  },
  settings: {
    'import/resolver': {
      'node': {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js'],
        paths: ['src']
      },
      'alias': {
        map: [
          ['@', './src'],
          ['@screens', './src/screens'],
          ['@components', './src/components'],
          ['@assets', './src/assets'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js']
      }
    }
  },
  env: {
    'react-native/react-native': true
  },
  plugins: [
    'import',
    'react-native'
  ]
};