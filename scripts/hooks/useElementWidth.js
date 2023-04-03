import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

const useElementWidth = (ref, debounceTime = RESIZE_TIMEOUT) => {
  const getElementWidth = () => {
    if (ref.current) {
      const inner = ref.current;
      return (
        splitPx(window.getComputedStyle(inner).width) +
        splitPx(window.getComputedStyle(inner).paddingLeft) +
        splitPx(window.getComputedStyle(inner).paddingRight)
      );
    }
    return 0;
  };

  const [width, setWidth] = useState(getElementWidth);

  const handleResize = useCallback(() => {
    const newWidth = getElementWidth();
    if (newWidth !== width) {
      setWidth(newWidth);
    }
  }, [width, ref]);

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

  return width;
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
  


  export default useElementWidth;