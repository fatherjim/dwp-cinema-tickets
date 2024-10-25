import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser';

export default [
  {
    languageOptions: {
      globals: globals.node,
      parser: babelParser,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_',
        },
      ],
    },
  },
  eslintConfigPrettier,
];
