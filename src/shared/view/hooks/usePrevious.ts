import { useEffect, useRef, DependencyList } from 'react';

export function usePrevious<T>(value: T, deps?: DependencyList): T {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref.current;
}
