import { useState, useEffect, useCallback } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useFlexWrapped = (ref, options = {}) => {
  const {
    debounceTime = RESIZE_TIMEOUT,
    observer = false,
    repeatChecks = 0,
  } = options;

  const repeatCheckDebounceTime = options.repeatCheckDebounceTime !== undefined
    ? options.repeatCheckDebounceTime
    : repeatChecks > 0 ? 100 : 0;

  const isFlexWrapped = () => {
    if (ref.current) {
      const element = ref.current;
      const children = Array.from(element.children);
      const firstChildTop = children[0].getBoundingClientRect().top;
      return children.some(child => child.getBoundingClientRect().top !== firstChildTop);
    }
    return false;
  };

  const [flexWrapped, setFlexWrapped] = useState(isFlexWrapped);

  const handleResize = useCallback(() => {
    const checkAndUpdateFlexWrapped = () => {
      const currentFlexWrapped = isFlexWrapped();
      if (currentFlexWrapped !== flexWrapped) {
        setFlexWrapped(currentFlexWrapped);
      }
    };

    checkAndUpdateFlexWrapped();

    if (repeatChecks > 0) {
      const intervalId = setInterval(() => {
        checkAndUpdateFlexWrapped();
      }, repeatCheckDebounceTime);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [flexWrapped, ref, repeatChecks, repeatCheckDebounceTime]);

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

  return flexWrapped;
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

export default useFlexWrapped;
