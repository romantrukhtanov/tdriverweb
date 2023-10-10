import { useCallback, useEffect, useState } from 'react';

import { useService } from 'services/servicesProvider';

type Options = {
  lockCalculation?: boolean;
};

type ElementSize = {
  width: number;
  height: number;
};

type ReturnProps<T> = {
  element: null | T;
  elementRef: (element: null | T) => void;
  elementSize: ElementSize;
  changeElementSize(): void;
};

export function useElementSize<T extends HTMLElement = HTMLDivElement>({
  lockCalculation,
}: Options): ReturnProps<T> {
  const [ref, setRef] = useState<null | T>(null);
  const [size, setSize] = useState<ElementSize>({
    width: 0,
    height: 0,
  });

  const handleChangeSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  const { screenSize } = useService('settings');
  useEffect(() => {
    if (lockCalculation) {
      return;
    }
    handleChangeSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, screenSize]);

  useEffect(() => {
    if (lockCalculation) {
      return;
    }
    handleChangeSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return {
    element: ref,
    elementRef: setRef,
    elementSize: size,
    changeElementSize: handleChangeSize,
  };
}
