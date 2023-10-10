/* eslint-disable no-restricted-imports */
import type { Duration, Locale } from 'date-fns';

import type { TimestampMilliseconds } from 'shared/types';

export type LocaleType = Locale;

export type DateInput = Date | TimestampMilliseconds;
export type DurationType = Duration;
