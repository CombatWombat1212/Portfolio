import { useEffect, useState, useCallback } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useScreenWidth = (options = { debounceTime: RESIZE_TIMEOUT, checkIf: undefined }) => {
  const getWindowWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return null;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  const handleResize = useCallback(() => {
    const newWindowWidth = getWindowWidth();
    if (newWindowWidth !== windowWidth) {
      setWindowWidth(newWindowWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (options.checkIf !== undefined && !options.checkIf) {
      return;
    }

    const debouncedHandleResize = debounce(handleResize, options.debounceTime);
    window.addEventListener('resize', debouncedHandleResize);
    handleResize(); // Perform an immediate width check

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [handleResize, options.debounceTime, options.checkIf]);

  return windowWidth;
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

export default useScreenWidth;
