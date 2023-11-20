import { useEffect, useRef, useState } from 'react';
import { throttle } from 'throttle-debounce';

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

    const handleMouseMove = (e: MouseEvent) => {
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

    const throttledHandleMouseMove = throttle(200, handleMouseMove);
    const throttledHandleTouch = throttle(200, handleTouch);

    window.addEventListener('mousemove', throttledHandleMouseMove);
    window.addEventListener('touchmove', throttledHandleTouch);
    window.addEventListener('touchstart', throttledHandleTouch);

    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      window.removeEventListener('touchmove', throttledHandleTouch);
      window.removeEventListener('touchstart', throttledHandleTouch);
    };
  }, [elementRef]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { elementRef, degree };
}
