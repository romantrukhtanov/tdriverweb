import { NAME_SPACE } from 'services/i18n/constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
export interface ITree extends Record<string, ITree | string | ReadonlyArray<string>> {}

export const pluralModifiers = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;
export const pluralModifiersRegExp = new RegExp(`_(${pluralModifiers.join('|')})$`);
export const trimPlural = (key: string) => key.replace(pluralModifiersRegExp, '');

type PluralModifier = (typeof pluralModifiers)[number];
type PluralKey = `${string}_${PluralModifier}`;

type KeysSimple<T> = {
  [Key in keyof T]: Key extends PluralKey ? never : Key;
}[keyof T];

type ExtractMainKeyFromPlural<T> = T extends `${infer R}_${PluralModifier}` ? R : never;
type KeysPlural<T> = {
  [Key in keyof T]: Key extends PluralKey ? Key : never;
}[keyof T];

type TranslationKeysTree<T extends ITree> = {
  [Key in KeysSimple<T>]: T[Key] extends Record<string, string> | ITree
    ? TranslationKeysTree<T[Key]>
    : T[Key];
} & {
  [Key in ExtractMainKeyFromPlural<KeysPlural<T>>]: {
    [PKey in `${Key}_${PluralModifier}`]: T[PKey] extends string ? T[PKey] : never;
  }[`${Key}_${PluralModifier}`];
};

const getKey = (path: string[]) =>
  path.reduce<string>((acc, value) => {
    if (!acc) {
      return `${NAME_SPACE}:${value}`;
    }
    return `${acc}.${value}`;
  }, '');

const getKeysFromArray = (array: ReadonlyArray<string>, path: string[]) => {
  return array.map((value, index) => {
    return getKey([...path, `${index}`]);
  });
};

export function buildTranslationKeys<T extends ITree>(messagesTree: T): TranslationKeysTree<T> {
  function buildTreeKeys(tree: T, path: string[] = []): TranslationKeysTree<T> {
    return Object.entries(tree).reduce((acc, [keyRaw, value]) => {
      const key = typeof value === 'string' ? trimPlural(keyRaw) : keyRaw;
      const xPath = [...path, key];

      const tKey = (() => {
        if (Array.isArray(value)) {
          return getKeysFromArray(value, xPath);
        }

        if (typeof value === 'string') {
          return getKey(xPath);
        }

        return buildTreeKeys(value as T, xPath);
      })();

      return {
        ...acc,
        [key]: tKey,
      };
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter -- cast, not just type set
    }, {} as TranslationKeysTree<T>);
  }

  return buildTreeKeys(messagesTree);
}
