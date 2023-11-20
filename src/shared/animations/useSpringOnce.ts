import { useEffect } from 'react';
import { useSpring, useSpringRef, UseSpringProps } from '@react-spring/web';

import { useService } from 'services/servicesProvider';

const memoryStore = new Set<string>();

export function useSpringOnce(key: string, props: UseSpringProps, lockMobile?: boolean) {
  const api = useSpringRef();
  const { isMobile } = useService('settings');
  const isLockMobile = lockMobile ?? isMobile;

  const spring = useSpring({ ...props, ref: api });

  useEffect(() => {
    if (memoryStore.has(key)) {
      api.start({ ...props, immediate: true, delay: undefined });
      return;
    }
    api.start();
    memoryStore.add(key);
  }, [api, key, props]);

  if (isLockMobile) {
    return;
  }

  return spring;
}
