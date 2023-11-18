import { useState, useEffect } from 'react';

type MousePosition = {
  x: number | null;
  y: number | null;
};

export const useMousePosition = (includeTouch = true) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handeMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouch = (e: TouchEvent) => {
      if (!e.targetTouches?.[0]) {
        return;
      }
      e.preventDefault();

      const touch = e.targetTouches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
    };

    window.addEventListener('mousemove', handeMouseMove);

    if (includeTouch) {
      window.addEventListener('touchmove', handleTouch);
      window.addEventListener('touchstart', handleTouch);
    }

    return () => {
      window.removeEventListener('mousemove', handeMouseMove);

      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouch);
        window.removeEventListener('touchstart', handleTouch);
      }
    };
  }, [includeTouch]);

  return mousePosition;
};
