import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

function modifyWebpackResolve(config: Configuration): void {
  config.resolve ??= {};
  config.resolve.plugins ??= [];
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      extensions: config.resolve!.extensions,
    })
  );
}

export { modifyWebpackResolve };
