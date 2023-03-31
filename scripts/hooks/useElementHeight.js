import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

const useElementHeight = (ref, { debounceTime = RESIZE_TIMEOUT, observer = false } = {}) => {

  
  const getElementHeight = () => {
    if (ref.current) {
      const inner = ref.current;
      return (
        splitPx(window.getComputedStyle(inner).height) +
        splitPx(window.getComputedStyle(inner).paddingTop) +
        splitPx(window.getComputedStyle(inner).paddingBottom)
      );
    }
    return 0;
  };

  const [height, setHeight] = useState(getElementHeight);


  const handleResize = useCallback(() => {
    const newHeight = getElementHeight();
    if (newHeight !== height) {
      setHeight(newHeight);
    }
  }, [height, ref]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLoad = () => {
        handleResize(); // Run the callback once when the component mounts
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
  }, [handleResize]);

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

  useEffect(() => {
    if (observer && ref.current) {
      const resizeObserver = new ResizeObserver(handleResize);

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [observer, ref, handleResize]);

  return height;
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

export default useElementHeight;
