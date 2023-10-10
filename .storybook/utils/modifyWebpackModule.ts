import { Configuration, RuleSetRule } from 'webpack';

import mainWebpackConfig from '../../webpack.config';

const mainConfigRules = mainWebpackConfig.module!.rules!;

function modifyWebpackModule(config: Configuration): void {
  const scssRules = (mainConfigRules as Array<RuleSetRule>).filter(rule => {
    if (Array.isArray(rule.use)) {
      return rule.use.some(useItem => {
        if (!useItem) {
          return false;
        }
        if (typeof useItem === 'string') {
          return useItem === 'sass-loader';
        }
        if ('loader' in useItem) {
          return useItem.loader === 'sass-loader';
        }
        return false;
      });
    }
    return false;
  });

  config.module ??= {};
  config.module.rules ??= [];
  config.module.rules.push(...scssRules);
}

export { modifyWebpackModule };
