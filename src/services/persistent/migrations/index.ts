import { migrate as m1 } from './migration_1';
import { migrate as m2 } from './migration_2';

export const migrations = [
  { version: 1, migrate: m1 },
  { version: 2, migrate: m2 },
];
