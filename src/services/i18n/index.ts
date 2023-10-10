import { useTranslation, getI18n } from 'react-i18next';
import type { TFunction } from 'i18next';

import { buildTranslationKeys } from './buildTranslationKeys';
import { ru } from './translations/ruTranslations';
import { AVAILABLE_LANGUAGES, Language } from './constants';

type Translations = typeof ru;

type UseI18n = {
  tKeys: TKeys;
  t: TFunction;
  language: Language;
};

const tKeys = buildTranslationKeys(ru);
type TKeys = typeof tKeys;

function useI18n(): UseI18n {
  const { t, i18n } = useTranslation();

  return { tKeys, t, language: i18n.language as Language };
}

export { tKeys, useI18n, getI18n, AVAILABLE_LANGUAGES };
export type { Translations, Language, TKeys, TFunction };
