import { useEffect, useRef, useState } from 'react';

import { clamp } from 'shared/helpers/clamp';

export function useRotationByMousePosition<T extends SVGElement = SVGPathElement>(limits?: {
  min: number;
  max: number;
}) {
  const elementRef = useRef<T>(null);

  const [degree, setDegree] = useState(0);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (elementRef.current === null) {
      return;
    }

    const centerPoint = getComputedStyle(elementRef.current).transformOrigin;
    const centers = centerPoint.split(' ');

    const handeMouseMove = (e: MouseEvent) => {
      setDegree(calculateDegree(e.clientX, e.clientY));
    };

    const handleTouch = (e: TouchEvent) => {
      if (!e.targetTouches?.[0]) {
        return;
      }
      e.preventDefault();

      const touch = e.targetTouches[0];
      setDegree(calculateDegree(touch.pageX, touch.pageY));
    };

    function calculateDegree(mouseX: number, mouseY: number) {
      const originX = parseInt(centers[0], 10);
      const originY = parseInt(centers[1], 10);

      const centerY = window.innerHeight / 2 + originY - window.scrollY;
      const centerX = window.innerWidth / 2 + originX - window.scrollX;
      const radians = Math.atan2(mouseX - centerX, mouseY - centerY);
      const degreeValue = radians * (180 / Math.PI);
      const resultDegree = radians >= 0 ? degreeValue * -1 + 180 : (180 + degreeValue) * -1;

      return clamp(Math.round(resultDegree), limits);
    }

    window.addEventListener('mousemove', handeMouseMove);
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('mousemove', handeMouseMove);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [elementRef]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { elementRef, degree };
}
