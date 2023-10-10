import path from 'path';
import type { PluginCreator as PostcssPluginCreator } from 'postcss';

export const CSS_MODULES_LOCALS_CONVENTION = 'camelCase';

export const SASS_OPTIONS = {
  includePaths: [path.resolve(`./src/shared/view/styles/`)],
};

// remove postcssUnwrapGlobalTheme if and when transition to css modules will be over
export const postcssUnwrapGlobalTheme = (): ReturnType<PostcssPluginCreator<never>> => ({
  postcssPlugin: 'postcssUnwrapGlobalTheme',
  Rule(rule, { result }) {
    if (result.opts.from?.endsWith('.module.scss')) {
      return;
    }
    rule.selector = rule.selector.replaceAll(':global(.theme-day)', '.theme-day');
    rule.selector = rule.selector.replaceAll(':global(.theme-night)', '.theme-night');
  },
});
postcssUnwrapGlobalTheme.postcss = true;
