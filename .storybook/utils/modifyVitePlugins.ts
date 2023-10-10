import type { InlineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export function modifyVitePlugins(config: InlineConfig): void {
  /** setup aliases */
  config.plugins ??= [];
  config.plugins.push(tsconfigPaths());
}
