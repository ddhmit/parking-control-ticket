import { useState, useRef, useEffect } from 'react';

export default function useCountdown(
  count: number
): [number, NodeJS.Timeout | undefined] {
  const [restTime, setRestTime] = useState(count);
  const timerRef = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRestTime(c => {
          if (c <= 0) {
            timerRef.current && clearInterval(timerRef.current);
            timerRef.current = undefined;
            return 0;
          } else {
            return --c;
          }
        });
      }, 1000);
    }

    return () => {
      timerRef.current && clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, []);

  return [restTime, timerRef.current];
}
