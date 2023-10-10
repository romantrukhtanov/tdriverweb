import type { InlineConfig } from 'vite';

import { iconProps } from './iconProps';

export function modifyViteDefine(config: InlineConfig): void {
  config.define ??= {};

  config.define = {
    /** for IconsList.stories */
    VITE_ICON_PROPS: JSON.stringify(iconProps),
  };
}
