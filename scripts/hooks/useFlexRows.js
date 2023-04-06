// TODO: instead of being a seperate hook you could incorporate this into useFlexWrapped and make it an option that changes the output from a bool to an int


import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useFlexRows = (ref, options = {}) => {
  const {
    debounceTime = RESIZE_TIMEOUT,
    observer = false,
    repeatChecks = 0,
  } = options;

  const repeatCheckDebounceTime = options.repeatCheckDebounceTime !== undefined
    ? options.repeatCheckDebounceTime
    : repeatChecks > 0 ? 100 : 0;

    const countFlexRows = () => {
        if (ref.current) {
          const element = ref.current;
          const children = Array.from(element.children);
          const rowTops = new Set();
          let rowCount = 0;
      
          children.forEach(child => {
            const childTop = child.getBoundingClientRect().top;
            if (!rowTops.has(childTop)) {
              rowTops.add(childTop);
              rowCount++;
            }
          });
      
          return rowCount;
        }
        return 0;
      };
      
  const [flexRows, setFlexRows] = useState(countFlexRows);

  const handleResize = useCallback(() => {
    const checkAndUpdateFlexRows = () => {
      const currentFlexRows = countFlexRows();
      if (currentFlexRows !== flexRows) {
        setFlexRows(currentFlexRows);
      }
    };

    checkAndUpdateFlexRows();

    if (repeatChecks > 0) {
      const intervalId = setInterval(() => {
        checkAndUpdateFlexRows();
      }, repeatCheckDebounceTime);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [flexRows, ref, repeatChecks, repeatCheckDebounceTime]);

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

  return flexRows;
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

export default useFlexRows;
