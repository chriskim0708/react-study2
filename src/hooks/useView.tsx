import { useState, useEffect, useCallback } from 'react';

export const useColor = () => {
  const [color, setColor] = useState<string>('#00ff00');

  useEffect(() => {
    console.log('Color changed');
  }, [color]);

  const changeColor = useCallback(() => {
    setColor((state) => (state === '#0000ff' ? '#00ff00' : '#0000ff'));
  }, []);

  return {
    color,
    changeColor,
  };
};
