import { useState, useEffect, useCallback } from 'react';

const useOffsetTop = (ref, options = {}) => {
  const {
    debounceTime = 250,
    observer = false,
    repeatChecks = 0,
    repeatCheckDebounceTime = repeatChecks > 0 ? 100 : 0,
    parent = null,
  } = options;

  const calculateOffsetTop = () => {
    if (ref.current) {
      const element = ref.current;
      const parentElement = parent ? parent.current : null;
      let offsetTop = element.offsetTop;

      if (parentElement) {
        offsetTop -= parentElement.offsetTop;
      }

      return offsetTop;
    }
    return 0;
  };

  const [offsetTop, setOffsetTop] = useState(calculateOffsetTop);

  const handleResize = useCallback(() => {
    const checkAndUpdateOffsetTop = () => {
      const currentOffsetTop = calculateOffsetTop();
      if (currentOffsetTop !== offsetTop) {
        setOffsetTop(currentOffsetTop);
      }
    };

    checkAndUpdateOffsetTop();

    if (repeatChecks > 0) {
      const intervalId = setInterval(() => {
        checkAndUpdateOffsetTop();
      }, repeatCheckDebounceTime);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [offsetTop, ref, parent, repeatChecks, repeatCheckDebounceTime]);

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

  return offsetTop;
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

export default useOffsetTop;
