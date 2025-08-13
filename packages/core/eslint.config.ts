import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import {defineConfig} from 'eslint/config';
import {ESLint} from 'eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      '@typescript-eslint': tsPlugin as unknown as ESLint.Plugin
    },
    extends: ['js/recommended'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    }
  },
  {
    rules: {
      'max-len': [
        'warn', {'code': 120, 'ignoreComments': true}
      ],
      'semi': 'error',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'indent': ['error', 2, {'SwitchCase': 1}],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'quotes': [2, 'single', 'avoid-escape'],
      'no-multi-spaces': 'error',
    }
  }
]);
