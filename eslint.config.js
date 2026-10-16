import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules/', '.appium/', 'reports/', 'apps/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.mocha } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='browser'][callee.property.name='pause']",
          message: 'Use explicit waits instead of browser.pause().',
        },
        {
          selector: "CallExpression[callee.object.name='driver'][callee.property.name='pause']",
          message: 'Use explicit waits instead of driver.pause().',
        },
      ],
    },
  },
);
