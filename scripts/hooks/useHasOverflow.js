import { useState, useEffect, useCallback } from 'react';

const useHasOverflow = (ref, options = {}) => {
  const {
    debounceTime = 250,
    observer = false,
    repeatChecks = 0,
  } = options;

  const repeatCheckDebounceTime = options.repeatCheckDebounceTime !== undefined
    ? options.repeatCheckDebounceTime
    : repeatChecks > 0 ? 100 : 0;

  const hasOverflow = () => {
    if (ref.current) {
      const element = ref.current;
      return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
    }
    return false;
  };

  const [overflow, setOverflow] = useState(hasOverflow);

  const handleResize = useCallback(() => {
    const checkAndUpdateOverflow = () => {
      const currentOverflow = hasOverflow();
      if (currentOverflow !== overflow) {
        setOverflow(currentOverflow);
      }
    };

    checkAndUpdateOverflow();

    if (repeatChecks > 0) {
      const intervalId = setInterval(() => {
        checkAndUpdateOverflow();
      }, repeatCheckDebounceTime);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [overflow, ref, repeatChecks, repeatCheckDebounceTime]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLoad = () => {
        handleResize();
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
    if (!observer || typeof window === 'undefined' || !ref.current) {
      return;
    }

    const debouncedHandleResize = debounce(handleResize, debounceTime);

    const mutationObserver = new MutationObserver(debouncedHandleResize);
    mutationObserver.observe(ref.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
      attributeFilter: ['style'],
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [handleResize, debounceTime, observer, ref]);

  return overflow;
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

export default useHasOverflow;
