/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
