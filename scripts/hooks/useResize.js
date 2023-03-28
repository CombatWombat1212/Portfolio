import { useEffect, useState, useCallback, useRef } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useResize = (onResize, debounceTime = RESIZE_TIMEOUT) => {
  const getWindowSize = () => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: null, height: null };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize);
  const hasExecuted = useRef(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth !== windowSize.width || window.innerHeight !== windowSize.height) {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      onResize();
    }
  }, [windowSize, onResize]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasExecuted.current) {
      const handleLoad = () => {
        onResize(); // Run the callback once when the component mounts
        hasExecuted.current = true;
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }
    }
  }, [onResize]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const debouncedHandleResize = debounce(handleResize, debounceTime);

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [handleResize, debounceTime]);
};

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default useResize;
