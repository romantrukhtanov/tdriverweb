import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useResetScroll<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T>(null);
  const location = useLocation();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const viewPortElement = elementRef.current;

    if (viewPortElement && viewPortElement.scrollTop !== 0) {
      viewPortElement.scrollTo(0, 0);
    }
  }, [elementRef, location]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return elementRef;
}
