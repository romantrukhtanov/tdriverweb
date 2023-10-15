import { describe, it, expect, vi, afterEach } from 'vitest';

import { checkIsLocalhost } from '../env';
import { parseURLSearch } from '../parseURLSearch';

describe('shared/helpers', () => {
  describe('env', () => {
    afterEach(() => {
      mockHostname('');
    });

    it('isLocalhost should return true if hostname is localhost', () => {
      mockHostname('');
      expect(checkIsLocalhost()).toBe(false);
      mockHostname('localhost');
      expect(checkIsLocalhost()).toBe(true);
    });
  });

  describe('parseURLSearch', () => {
    it('should correctly parse search string', () => {
      const foo = 666;
      const bar = 420;
      const { search } = new URL(`https://example.com?foo=${foo}&bar=${bar}`);
      const result = parseURLSearch<'foo' | 'bar'>(search);
      expect(result.foo).toBe(String(foo));
      expect(result.bar).toBe(String(bar));
    });
  });
});

function mockHostname(hostname: string) {
  const windowSpy = vi.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(
    () =>
      ({
        location: {
          hostname,
        },
      }) as any,
  );
}
