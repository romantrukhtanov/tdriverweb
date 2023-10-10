import * as R from 'remeda';

import { Theme, themeTypes } from 'services/settings';
import { AVAILABLE_LANGUAGES, Language } from 'services/i18n';

export const stringValidator = (value: unknown): value is string => R.isString(value);
export const numberValidator = (value: unknown): value is number => R.isNumber(value);
export const booleanValidator = (value: unknown): value is boolean => R.isBoolean(value);
export const objectValidator = (value: unknown): value is Record<string, unknown> =>
  R.isObject(value);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const objectExtendedValidator = <T extends string | number | symbol>(
  keys: readonly T[],
  object: unknown,
  objectValueValidator: (key: T, value: Record<T, unknown>) => boolean,
) =>
  objectValidator(object) &&
  keys.every(key => key in object && objectValueValidator(key, object as Record<T, unknown>));

export const themeValidator = (value: unknown): value is Theme =>
  themeTypes.includes(value as Theme);
export const languageValidator = (value: unknown): value is Language =>
  AVAILABLE_LANGUAGES.includes(value as Language);
