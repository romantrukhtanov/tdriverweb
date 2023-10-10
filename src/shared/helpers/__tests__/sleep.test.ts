import { describe, it, expect, vi } from 'vitest';

import { sleep } from '../sleep';

describe('shared/helpers/sleep', () => {
  it('should be resolved after arg time', async () => {
    vi.useFakeTimers();
    const afterSleepFn = vi.fn();
    vi.spyOn(global, 'setTimeout');

    const sleepPromise = sleep(100).then(afterSleepFn);

    expect(afterSleepFn).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledOnce();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    await sleepPromise;

    expect(afterSleepFn).toHaveBeenCalled();
  });
});
