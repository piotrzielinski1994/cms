import { useState } from 'react';

const usePrev = <T>(value: T): T => {
  const [state, setState] = useState<{ current: T; prev: T }>({ current: value, prev: value });

  if (state.current !== value) {
    setState({ current: value, prev: state.current });
  }

  return state.prev;
};

export { usePrev };
