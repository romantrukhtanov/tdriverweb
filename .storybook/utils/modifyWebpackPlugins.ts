import { Configuration, EnvironmentPlugin } from 'webpack';
import { iconProps } from './iconProps';

function modifyWebpackPlugins(config: Configuration): void {
  config.plugins?.forEach(plugin => {
    if (plugin instanceof EnvironmentPlugin) {
      throw new Error(
        'It looks like the storybook is now using the EnvironmentPlugin. Refactoring required. Pass ICON_PROPS through DefinePlugin, or replace instance of EnvironmentPlugin.'
      );
    }
  });

  config.plugins ??= [];
  config.plugins.push(
    new EnvironmentPlugin({
      ICON_PROPS: JSON.stringify(iconProps),
    })
  );
}

export { modifyWebpackPlugins };
