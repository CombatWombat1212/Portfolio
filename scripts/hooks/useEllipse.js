// useEllipse.js
import { useState, useEffect } from 'react';

const useEllipse = (duration = 500, maxLength = 3, minLength = 1) => {
  const [ellipse, setEllipse] = useState('.'.repeat(maxLength));
  const [direction, setDirection] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipse((prevEllipse) => {
        const newLength = prevEllipse.length + direction;

        if (newLength <= minLength) {
          setDirection(1);
          return '.'.repeat(minLength);
        }

        if (newLength >= maxLength) {
          setDirection(-1);
          return '.'.repeat(maxLength);
        }

        return '.'.repeat(newLength);
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, maxLength, minLength, direction]);

  return ellipse;
};

export default useEllipse;
