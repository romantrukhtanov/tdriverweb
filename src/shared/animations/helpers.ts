import { easings, UseSpringProps } from '@react-spring/web';

type ConfigParams = {
  x?: string;
  y?: string;
  opacity?: number;
  duration?: number;
  delay?: number;
  easing?(t: number): number;
};

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
