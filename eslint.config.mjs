import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['build'] },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
];

export default tseslint.config(
  ...eslintConfig,

  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] },
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
        { selector: 'enum', format: ['PascalCase'], prefix: ['E'] },
        {
          selector: ['variable', 'function', 'parameter'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          types: ['boolean'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          prefix: ['is', 'IS', 'Is', 'has', 'HAS', 'Has', 'can', 'CAN', 'Can'],
        },
      ],
    },
  },
  // fix esling.config.mjs error
  {
    files: ['**/eslint.config.mjs', '**/.prettierrc.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
