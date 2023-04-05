import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useHasScrollbar = (ref, options = {}) => {
  const {
    debounceTime = RESIZE_TIMEOUT,
    observer = false,
    repeatChecks = 0, // Add the new parameter here
  } = options;

  const repeatCheckDebounceTime = options.repeatCheckDebounceTime !== undefined
    ? options.repeatCheckDebounceTime
    : repeatChecks > 0 ? 100 : 0; // Update the logic here

  const hasScrollbar = () => {
    if (ref.current) {
      const element = ref.current;
      return element.scrollHeight > element.clientHeight;
    }
    return false;
  };

  const [scrollbar, setScrollbar] = useState(hasScrollbar);

  const handleResize = useCallback(() => {
    const checkAndUpdateScrollbar = () => {
      const currentScrollbar = hasScrollbar();
      if (currentScrollbar !== scrollbar) {
        setScrollbar(currentScrollbar);
      }
    };

    checkAndUpdateScrollbar();

    // Repeatedly check for the scrollbar with the specified interval
    if (repeatChecks > 0) {
      const intervalId = setInterval(() => {
        checkAndUpdateScrollbar();
      }, repeatCheckDebounceTime);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [scrollbar, ref, repeatChecks, repeatCheckDebounceTime]);

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
      attributeFilter: ['style'], // Add the attributeFilter option here
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [handleResize, debounceTime, observer, ref]);

  return scrollbar;
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

export default useHasScrollbar;
