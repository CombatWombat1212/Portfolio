import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

const useElementStyle = (ref, styleProperty, { debounceTime = RESIZE_TIMEOUT, observer = false } = {}) => {
  const useElementStyleValue = () => {
    if (ref.current) {
      const styleValue = window.getComputedStyle(ref.current).getPropertyValue(styleProperty);
      if (styleValue.includes('px')) {
        return splitPx(styleValue);
      }
      return styleValue;
    }
    return 0;
  };

  const [styleValue, setStyleValue] = useState(useElementStyleValue);

  const handleResize = useCallback(() => {
    const newStyleValue = useElementStyleValue();
    if (newStyleValue !== styleValue) {
      setStyleValue(newStyleValue);
    }
  }, [styleValue, ref, styleProperty]);

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

  return styleValue;
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

export default useElementStyle;
