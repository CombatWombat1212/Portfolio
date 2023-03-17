import { useEffect, useState, useCallback, useRef } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useVerticalResize = (onResize, debounceTime = RESIZE_TIMEOUT) => {
  const getWindowHeight = () => {
    if (typeof window !== 'undefined') {
      return window.innerHeight;
    }
    return null;
  };

  const [windowHeight, setWindowHeight] = useState(getWindowHeight);
  const hasExecuted = useRef(false);

  const handleResize = useCallback(() => {
    if (window.innerHeight !== windowHeight) {
      setWindowHeight(window.innerHeight);
      onResize();
    }
  }, [windowHeight, onResize]);

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

export default useVerticalResize;
