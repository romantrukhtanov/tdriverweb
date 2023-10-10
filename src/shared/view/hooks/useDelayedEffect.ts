import { useEffect, DependencyList, EffectCallback } from 'react';

export function useDelayedEffect(callback: EffectCallback, deps: DependencyList, delay: number) {
  useEffect(() => {
    let destructor: ReturnType<EffectCallback>;

    const timeoutId = window.setTimeout(() => {
      destructor = callback();
    }, delay);

    return () => {
      if (destructor) {
        destructor();
      } else {
        window.clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
