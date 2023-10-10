import { useRef, useState, useEffect } from 'react';

export function useRepeatableCallback(cb: () => void, repeatInterval = 100, delay = 400) {
  const callback = useRef<() => void>(cb);
  const timer = useRef<number>();
  const interval = useRef<number>();
  const [isActive, setIsActive] = useState(false);

  const onStart = () => setIsActive(true);
  const onStop = () => setIsActive(false);
  const tick = () => callback.current();

  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  useEffect(() => {
    if (isActive) {
      callback.current();
      timer.current = window.setTimeout(() => {
        interval.current = window.setInterval(tick, repeatInterval);
      }, delay);
    }

    return () => {
      window.clearTimeout(timer.current);
      window.clearInterval(interval.current);
    };
  }, [repeatInterval, isActive, delay]);

  return [onStart, onStop, isActive] as const;
}
