import { PERSISTENT_KEYS } from '../constants';
import type { SetItem } from '../model';

/**
 * Copy old values to prefixed values
 */
export function migrate(setItem: SetItem) {
  for (const [key, value] of Object.entries(localStorage)) {
    if (PERSISTENT_KEYS.has(key)) {
      setItem(key, value);
    }
  }
}
