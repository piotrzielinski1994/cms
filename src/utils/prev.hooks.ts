import { useEffect, useRef } from 'react';

const usePrev = <T>(value: T): T => {
  const prev = useRef(value);

  useEffect(() => {
    prev.current = value;
  }, [value]);

  return prev.current;
};

export { usePrev };
