import { useEffect } from 'react';
import { easings, useSpring, useSpringRef, UseSpringProps } from '@react-spring/web';

import { useService } from 'services/servicesProvider';

type ConfigParams = {
  x?: string;
  y?: string;
  opacity?: number;
  duration?: number;
  delay?: number;
  easing?(t: number): number;
};

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

export function getDefaultConfig(params?: ConfigParams): UseSpringProps {
  return {
    from: {
      x: params?.x,
      y: params?.y,
      opacity: params?.opacity ?? 0,
    },
    to: {
      x: '0%',
      y: '0%',
      opacity: 1,
    },
    config: {
      duration: params?.duration ?? 500,
      easing: params?.easing ?? easings.easeOutExpo,
    },
    delay: params?.delay ?? 350,
  };
}
