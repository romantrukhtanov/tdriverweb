import React, { useEffect, useRef, useState } from 'react';

import { useMousePosition } from 'shared/view/hooks/useMousePosition';

import styles from './Sphere.module.scss';

const Sphere: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { x, y } = useMousePosition();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current;
    const domRect = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);

    const nextX = (x || 0) - parseInt(computedStyle.left, 10) - domRect.width / 2;
    const nextY = (y || 0) - parseInt(computedStyle.top, 10) - domRect.height / 2;

    setPosition({ x: nextX, y: nextY });
  }, [ref, x, y]);

  return (
    <div
      className={styles.root}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      ref={ref}
    />
  );
};

export { Sphere };
