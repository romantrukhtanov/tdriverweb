import type { SetItem, GetItem } from './model';
import { migrations } from './migrations';

const MIGRATION_VERSION = 'migrationVersion';

export const migration = (setItem: SetItem, getItem: GetItem) => {
  if (localStorage.length === 0) {
    return;
  }

  const currentVersion = getCurrentVersion(getItem);

  migrations
    .filter(({ version }) => version > currentVersion)
    .forEach(({ version, migrate }) => {
      migrate(setItem, getItem);
      setItem(MIGRATION_VERSION, version);
    });
};

function getCurrentVersion(getItem: GetItem) {
  const savedVersionString = getItem(MIGRATION_VERSION);
  if (savedVersionString) {
    return parseInt(savedVersionString, 10);
  }

  const isLegacyMigrated = getItem('isMigrated');
  return isLegacyMigrated ? 1 : 0;
}
