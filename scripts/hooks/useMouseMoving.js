import { useEffect, useState, useCallback, useRef } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useMouseMoving = (onMouseMove = null, debounceTime = RESIZE_TIMEOUT) => {
  const lastMousePosition = useRef({ x: null, y: null });
  const [isMoving, setIsMoving] = useState(false);
  const movementTimeout = useRef(null);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;

      if (
        clientX !== lastMousePosition.current.x ||
        clientY !== lastMousePosition.current.y
      ) {
        lastMousePosition.current = { x: clientX, y: clientY };
        setIsMoving(true);

        if (onMouseMove) {
          onMouseMove();
        }

        clearTimeout(movementTimeout.current);
        movementTimeout.current = setTimeout(() => {
          setIsMoving(false);
        }, debounceTime);
      }
    },
    [onMouseMove, debounceTime]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return isMoving;
};

export default useMouseMoving;
