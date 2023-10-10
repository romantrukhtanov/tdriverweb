import { useLayoutEffect, useEffect, useCallback, useState, useRef } from 'react';

import { usePrevious } from './usePrevious';

export type OnScrollProps = {
  offset: number;
  maxOffset: number;
};

export function useUserScroll(
  onScroll: (props: OnScrollProps) => void,
  initialScrollPosition: number,
) {
  const viewportRef = useRef<HTMLElement>(null);
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);
  const prevScrollPosition = usePrevious(scrollPosition);

  const handleGesture = useCallback(() => {
    const viewPortElement = viewportRef.current;
    if (viewPortElement) {
      setScrollPosition(viewPortElement.scrollTop);
    }
  }, []);

  const scrollTo = (offset: number) => viewportRef.current?.scrollTo({ top: offset });

  useWheelScroll(viewportRef.current, handleGesture);
  useMouseButtonScroll(viewportRef.current, handleGesture);
  useKeyDownScroll(handleGesture);

  useLayoutEffect(() => {
    if (prevScrollPosition !== scrollPosition) {
      const element = viewportRef.current;
      const maxOffset = (element?.scrollHeight ?? 0) - (element?.offsetHeight ?? 0);
      onScroll({ offset: scrollPosition, maxOffset });
    }
  }, [scrollPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  return [viewportRef, scrollTo] as const;
}

function useKeyDownScroll(setScroll: () => void) {
  useEffect(() => {
    document.addEventListener('keyup', setScroll);
    return () => {
      document.removeEventListener('keyup', setScroll);
    };
  }, [setScroll]);
}

function useMouseButtonScroll(element: HTMLElement | null, setScroll: () => void) {
  const handleMouseUp = useCallback(() => {
    setScroll();
    document.removeEventListener('mouseup', handleMouseUp);
  }, [setScroll]);

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  useEffect(() => {
    element?.addEventListener('mousedown', handleMouseDown);
    return () => {
      element?.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [element, handleMouseDown, handleMouseUp]);
}

function useWheelScroll(element: HTMLElement | null, setScroll: () => void) {
  useLayoutEffect(() => {
    element?.addEventListener('wheel', setScroll, { passive: true });
    return () => {
      element?.removeEventListener('wheel', setScroll);
    };
  }, [element, setScroll]);
}
