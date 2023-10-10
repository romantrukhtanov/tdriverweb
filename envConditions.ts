const { IS_PRODUCTION_PIPELINE, NODE_ENV, WATCH_MODE, STORYBOOK, BUNDLE_ANALYZER, HTTPS_ENABLED } =
  process.env;

const isProduction = NODE_ENV === 'production' && WATCH_MODE !== 'true';
const isStorybook = STORYBOOK === 'true';
const isBundleAnalyzer = BUNDLE_ANALYZER === 'true';
const isLiveReload = !isProduction && !isStorybook;
const isProductionPipeline = IS_PRODUCTION_PIPELINE === 'true';
const isHttps = HTTPS_ENABLED === 'true';

export { isLiveReload, isBundleAnalyzer, isProduction, isProductionPipeline, isStorybook, isHttps };
