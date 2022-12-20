import { useState, useEffect, useCallback, useMemo } from 'react';

export const useCount = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log('Count changed');
  }, [count]);

  const increment = useCallback(() => {
    setCount((c) => {
      if (c < 10) {
        return c + 1;
      } else {
        return 10;
      }
    });
  }, []);

  const multiply = useMemo(() => {
    console.log('run multiply');
    return count * 5;
  }, [count]);

  return {
    multiply,
    increment,
  };
};
