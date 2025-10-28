import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const start = 0;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = start + (end - start) * progress;

      if (frame === totalFrames) {
        setCount(end);
        cancelAnimationFrame(ref.current);
        return;
      }

      setCount(currentCount);
      ref.current = requestAnimationFrame(counter);
    };

    ref.current = requestAnimationFrame(counter);

    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);

  return count;
}
