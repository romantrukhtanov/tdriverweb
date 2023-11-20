import { useLocation } from 'react-router-dom';
import ym from 'react-yandex-metrika';

import { useUpdateEffect } from 'shared/view/hooks/useUpdateEffect';

export function useHitGoal() {
  const location = useLocation();

  useUpdateEffect(() => {
    ym('hit', location);
  }, [location]);
}
