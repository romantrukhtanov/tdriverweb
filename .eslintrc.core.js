// basic eslint settings to use via CLI

const banOptions = [
  { name: 'require', message: 'Prefer use `import`' },
  { name: 'lazy', message: 'Prefer use helper `lazyfy`' },
  { name: ['localStorage', '*'], message: 'Please use the `persistent` service' },
];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'mobx', 'ban'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'airbnb-typescript', // must be below `@typescript-eslint/*`, e.g. for disabling @typescript-eslint/require-await
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:mobx/recommended',
    'plugin:compat/recommended',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-danger': 'error',
    'react/destructuring-assignment': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'react/function-component-definition': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unstable-nested-components': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-cycle': [
      'error',
      {
        maxDepth: 2,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
    // off recommended rules
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off', // index signature can be more informative
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // part of the old logic can rely on `||`
    '@typescript-eslint/no-unsafe-call': 'off', // can be hard for typing
    '@typescript-eslint/no-unsafe-member-access': 'off', // can be hard for typing
    '@typescript-eslint/no-unsafe-argument': 'off', // enabled only for IDE, +5s to execution time
    '@typescript-eslint/no-unsafe-return': 'off', // enabled only for IDE, +5s to execution time
    '@typescript-eslint/no-confusing-void-expression': 'off', // enabled only for IDE, +3s to execution time
    '@typescript-eslint/no-floating-promises': 'off', // false-positive
    '@typescript-eslint/no-unsafe-assignment': 'off', // false-positive
    '@typescript-eslint/no-misused-promises': 'off', // false-positive
    '@typescript-eslint/unbound-method': 'off', // false-positive
    '@typescript-eslint/no-unsafe-enum-comparison': 'off', // false-positive
    '@typescript-eslint/lines-between-class-members': 'off', // formatting-related, not recommended for use
    // end off recommended rules
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/member-ordering': [
      'error',
      { default: ['constructor', 'field', 'method', 'signature'] },
    ],
    'class-methods-use-this': 'off',
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    'func-names': [
      'error',
      'as-needed',
      {
        generators: 'never',
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true, allow: ['__'] }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase', 'snake_case'],
        leadingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'method',
        format: ['camelCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
    ],
    'mobx/missing-observer': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true, varsIgnorePattern: '^R$' },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['date-fns', 'date-fns-tz'],
            message: 'Please use the datetime service or import from datetime helpers.',
          },
        ],
        paths: [
          {
            name: 'react-slick',
            message: 'Please use Carousel from shared/view/components/Carousel instead.',
          },
        ],
      },
    ],
    'ban/ban': ['error', ...banOptions],
    'compat/compat': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: [
          'CallExpression[callee.name="autorun"] > ArrowFunctionExpression[async="true"]',
          'CallExpression[callee.name="autorun"] > FunctionExpression[async="true"]',
        ].join(', '),
        message: 'autorun() only accepts synchronous functions',
      },
      {
        selector: [
          'MethodDefinition[value.async="true"] Decorator[expression.object.name="action"]',
          'MethodDefinition[value.async="true"] Decorator[expression.name="action"]',
          'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.object.name="action"]',
          'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.name="action"]',
        ].join(', '),
        message: '@action must be synchronous function',
      },
    ],
    curly: ['error', 'all'],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/*.test.ts', '**/__tests__/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    window: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
