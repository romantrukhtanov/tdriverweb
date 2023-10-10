import { useDeferredValue, useEffect, useState } from 'react';

import { useUpdatedRef } from 'shared/view/hooks/useUpdatedRef';

export function useUiState<T extends number | string | boolean | null | undefined>(
  realValue: T,
  setRealValue: (value: T) => void,
): readonly [uiValue: T, setUiValue: (value: T) => void] {
  const [uiValue, setUiValue] = useState(realValue);
  const deferredValue = useDeferredValue(uiValue);

  const refSetRealValue = useUpdatedRef(setRealValue);
  useEffect(() => {
    refSetRealValue.current(deferredValue);
  }, [deferredValue, refSetRealValue]);

  useEffect(() => setUiValue(realValue), [realValue]);

  return [uiValue, setUiValue];
}
