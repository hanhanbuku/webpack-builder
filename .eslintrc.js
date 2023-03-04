module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'global-require': 0,
  },
};
