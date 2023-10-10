const { isLiveReload, isProductionPipeline } = require('./envConditions');

module.exports = {
  presets: [
    // Preset ordering is reversed (last to first).
    [
      '@babel/preset-env',
      {
        bugfixes: true, // will be enabled by default in Babel 8
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-transform-runtime',
    /**
     * note: @babel/plugin-proposal-class-properties is enabled by default
     * in @babel/preset-env, but removing it breaks the build due to changing
     * the order of initialization class properties and parameter properties.
     * @see https://github.com/babel/babel/issues/13779
     * @see https://github.com/microsoft/TypeScript/issues/45995
     */
    '@babel/plugin-proposal-class-properties',
    isLiveReload && require.resolve('react-refresh/babel'),
    isProductionPipeline && [
      'babel-plugin-react-remove-properties',
      {
        properties: ['data-test'],
      },
    ],
  ].filter(Boolean),
};
