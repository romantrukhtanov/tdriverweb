// extended eslint settings to use with IDE

module.exports = {
  plugins: ['no-array-any'],
  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    '.eslintrc.core.js', // should be after `strict-type-checked` because some rules already disabled
  ],
  rules: {
    'react/display-name': 'warn',
    'import/no-cycle': [
      'error',
      {
        maxDepth: Infinity,
      },
    ],
    'no-array-any/no-array-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off', // index signature can be more informative
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // false-positive
    '@typescript-eslint/no-unnecessary-condition': 'off', // false-positive
    '@typescript-eslint/no-base-to-string': 'off', // false-positive
    '@typescript-eslint/no-invalid-void-type': 'off', // false-positive
    '@typescript-eslint/prefer-ts-expect-error': 'off', // false-positive
    '@typescript-eslint/non-nullable-type-assertion-style': 'off', // false-positive
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
  },
  settings: {
    componentWrapperFunctions: ['observer'],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      rules: {
        'no-array-any/no-array-any': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
