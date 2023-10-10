import { useLayoutEffect, useRef } from 'react';

const memoryStore = new Map<string, ScrollToOptions>();

export function useScrollRestoration<T extends HTMLElement = HTMLDivElement>(key: string) {
  const elementRef = useRef<T>(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    const viewPortElement = elementRef.current;
    const scrollOptions = memoryStore.get(key);

    if (scrollOptions && viewPortElement) {
      viewPortElement.scrollTo(scrollOptions);
    }

    return () => {
      if (elementRef.current) {
        const options = { left: elementRef.current.scrollLeft, top: elementRef.current.scrollTop };
        memoryStore.set(key, options);
      }
    };
  }, [elementRef]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return elementRef;
}
