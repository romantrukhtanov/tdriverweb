import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import {
  isBundleAnalyzer,
  isLiveReload,
  isProduction,
  isStorybook,
  isHttps,
} from './envConditions';
import {
  CSS_MODULES_LOCALS_CONVENTION,
  postcssUnwrapGlobalTheme,
  SASS_OPTIONS,
} from './styles.config';

const ENTRY_APP = 'app';
const ENTRY_SW = 'service-worker';

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName:
        isProduction && !isStorybook ? '[hash:base64]' : '[name]__[local]--[hash:base64:5]',
      exportLocalsConvention: CSS_MODULES_LOCALS_CONVENTION,
    },
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: { plugins: [autoprefixer(), postcssUnwrapGlobalTheme()] },
  },
};

const scssLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: SASS_OPTIONS,
  },
};

const devtool = (() => {
  if (isProduction) {
    return;
  }

  return 'eval-cheap-module-source-map';
})();

const devServerHttpsRelated = (() => {
  if (!isHttps) {
    return {
      port: 3000,
    };
  }
  return {
    server: {
      type: 'https',
      options: {
        key: process.env.HTTPS_PATH_KEY!,
        cert: process.env.HTTPS_PATH_CERT!,
        ca: process.env.HTTPS_PATH_CA!,
      },
    },
    allowedHosts: [process.env.HTTPS_HOST!],
    port: 443,
  };
})();

const devServer: DevServerConfiguration = {
  ...devServerHttpsRelated,
  static: {
    directory: outPath,
  },
  hot: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  devMiddleware: {
    stats: 'minimal',
  },
  client: {
    logging: 'warn',
  },
};

const hashType = isProduction ? 'contenthash' : 'fullhash';

const webpackConfig: Configuration = {
  context: sourcePath,
  mode: isProduction ? 'production' : 'development',
  entry: {
    [ENTRY_APP]: './index.tsx',
    [ENTRY_SW]: './core/serviceWorker/service-worker.ts',
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: ({ runtime }) => {
      switch (runtime) {
        case ENTRY_SW:
          return `${ENTRY_SW}.js`;
        default:
          return `[name].[${hashType}].js`;
      }
    },
    chunkFilename: `chunks/[name].[${hashType}].js`,
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          isProduction && !isStorybook ? MiniCssExtractPlugin.loader : 'style-loader',
          cssLoader,
          postcssLoader,
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          isProduction && !isStorybook ? MiniCssExtractPlugin.loader : 'style-loader',
          cssLoader,
          postcssLoader,
          scssLoader,
        ],
      },
      {
        test: /\.(a?png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: { filename: 'images/[hash][ext][query]' },
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: isProduction ? 'fonts/[hash][ext][query]' : 'fonts/[name]_[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __SENTRY_DEBUG__: false,
    }),
    // remove source maps after deploying to sentry
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['*.js.map'],
    }),
    new MiniCssExtractPlugin({
      filename: `app.[${hashType}].css`,
      chunkFilename: `chunks/[name].[${hashType}].css`,
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: 'core/index.html',
      excludeChunks: [ENTRY_SW],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
    isLiveReload && new ReactRefreshWebpackPlugin(),
    isBundleAnalyzer &&
      new BundleAnalyzerPlugin({
        defaultSizes: 'gzip',
      }),
  ].filter((plugin): plugin is Exclude<typeof plugin, false> => Boolean(plugin)),
  devServer,
  devtool,
  optimization: {
    minimizer: [
      '...' as const,
      isProduction &&
        new ImageMinimizerPlugin({
          minimizer: [
            {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  png: {
                    palette: true,
                  },
                },
              },
            },
            {
              implementation: ImageMinimizerPlugin.svgoMinify,
              options: {
                encodeOptions: {
                  plugins: ['preset-default'],
                  removeViewBox: false,
                  floatPrecision: 2,
                },
              },
            },
          ],
        }),
    ].filter((minimizer): minimizer is Exclude<typeof minimizer, false> => Boolean(minimizer)),
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: chunk => chunk.name === ENTRY_APP,
        },
      },
    },
  },
};

export default webpackConfig;
