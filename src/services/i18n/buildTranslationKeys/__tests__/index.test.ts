import { describe, it, expect } from 'vitest';

import { buildTranslationKeys } from 'services/i18n/buildTranslationKeys/index';

describe('(services/i18n/helpers) buildTranslationKey', () => {
  const locales = {
    shared: {
      error: {
        bug: 'bug',
        gug: {
          pug: 'pug',
        },
      },
      lol: 'troll',
      some_key_zero: 'zero',
      some_key_one: 'singular',
      some_key_two: 'two',
      another_key_other: 'other',
    },
    foo: 'bar',
  } as const;
  const tKeys = buildTranslationKeys(locales);

  it('should correctly build translation key', () => {
    expect(tKeys.shared.error.bug).toEqual('translation:shared.error.bug');
    expect(tKeys.shared.lol).toEqual('translation:shared.lol');
    expect(tKeys.foo).toEqual('translation:foo');
    expect(tKeys.shared.error.gug.pug).toEqual('translation:shared.error.gug.pug');
  });

  it('should correctly build plural translation key', () => {
    expect(tKeys.shared.some_key).toEqual('translation:shared.some_key');
    expect(tKeys.shared.another_key).toEqual('translation:shared.another_key');
  });
});
