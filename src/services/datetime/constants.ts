export enum UnitOfTime {
  MILLISECONDS = 'MILLISECONDS',
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
  WEEKS = 'WEEKS',
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
  QUARTERS = 'QUARTERS',
  YEARS = 'YEARS',
}

export const TIMEZONE_LOCAL = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const TIMEZONE_UTC = 'Etc/UTC';

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_WEEK = 604800;

export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_DAY = 86400000;
export const MILLISECONDS_IN_WEEK = 604800000;
