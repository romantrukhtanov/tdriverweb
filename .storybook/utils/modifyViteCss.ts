import type { InlineConfig } from 'vite';

import {
  CSS_MODULES_LOCALS_CONVENTION,
  postcssUnwrapGlobalTheme,
  SASS_OPTIONS,
} from '../../styles.config';

export function modifyViteCss(config: InlineConfig): void {
  config.css ??= {};

  /** setup css modules */
  if (!(config.css.modules instanceof Object)) {
    config.css.modules = {};
  }
  config.css.modules.localsConvention = CSS_MODULES_LOCALS_CONVENTION;

  /** setup scss */
  config.css.preprocessorOptions ??= {};
  config.css.preprocessorOptions.scss = SASS_OPTIONS;

  /** setup postcss custom plugin */
  if (!(config.css.postcss instanceof Object)) {
    config.css.postcss = {};
  }
  config.css.postcss.plugins ??= [];
  config.css.postcss.plugins.push(postcssUnwrapGlobalTheme());
}
