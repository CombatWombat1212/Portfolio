import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';

const useBreakpoint = ({ debounceTime = RESIZE_TIMEOUT } = {}) => {
  const getBreakpoint = () => {
    const breakpoints = getBreakpointNames();

    const breakpointValues = breakpoints.map(bp => ({
      name: bp,
      value: parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue(`--${bp}`))
    }));

    const windowWidthInEm = window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize);

    for (let i = breakpointValues.length - 1; i >= 0; i--) {
      if (windowWidthInEm >= breakpointValues[i].value) {
        return breakpointValues[i].name;
      }
    }
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState(null);
  const hasExecuted = useRef(false);

  const handleBreakpointChange = useCallback(() => {
    const newBreakpoint = getBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    }
  }, [currentBreakpoint]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasExecuted.current) {
      const handleLoad = () => {
        handleBreakpointChange();
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
  }, [handleBreakpointChange]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const debouncedHandleBreakpointChange = debounce(handleBreakpointChange, debounceTime);

    window.addEventListener('resize', debouncedHandleBreakpointChange);
    return () => {
      window.removeEventListener('resize', debouncedHandleBreakpointChange);
    };
  }, [handleBreakpointChange, debounceTime]);

  return currentBreakpoint;
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


const getBreakpointNames = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const breakpoints = window.getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoints')
    .split(', ')
    .map(bp => bp.trim());

  return breakpoints;
};



const useBreakpointUtils = () => {
  const breakpointNames = useMemo(() => {
    return getBreakpointNames();
  }, []);

  const isBp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    return currentBreakpoint === targetBreakpoint;
  }, []);

  const isntBp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    return currentBreakpoint !== targetBreakpoint;
  }, []);

  const isBpOrDown = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex <= targetIndex;
  }, [breakpointNames]);

  const isBpOrUp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex >= targetIndex;
  }, [breakpointNames]);

  const isBpAndDown = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex < targetIndex;
  }, [breakpointNames]);

  const isBpAndUp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex > targetIndex;
  }, [breakpointNames]);

  return {
    isBp,
    isntBp,
    isBpOrDown,
    isBpOrUp,
    isBpAndDown,
    isBpAndUp,
  };
};





const useResponsiveUtils = ({ debounceTime = RESIZE_TIMEOUT } = {}) => {
  const bp = useBreakpoint({ debounceTime });
  const breakpointNames = useMemo(() => {
    return getBreakpointNames();
  }, []);

  const isBp = useMemo(() => (targetBreakpoint) => {
    return bp === targetBreakpoint;
  }, [bp]);

  const isntBp = useMemo(() => (targetBreakpoint) => {
    return bp !== targetBreakpoint;
  }, [bp]);

  const isBpOrDown = useMemo(() => (targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(bp);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex <= targetIndex;
  }, [breakpointNames, bp]);

  const isBpOrUp = useMemo(() => (targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(bp);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex >= targetIndex;
  }, [breakpointNames, bp]);

  const isBpAndDown = useMemo(() => (targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(bp);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex < targetIndex;
  }, [breakpointNames, bp]);

  const isBpAndUp = useMemo(() => (targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(bp);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex > targetIndex;
  }, [breakpointNames, bp]);

  return {
    bp,
    isBp,
    isntBp,
    isBpOrDown,
    isBpOrUp,
    isBpAndDown,
    isBpAndUp,
  };
};


export { useBreakpoint, useBreakpointUtils, useResponsiveUtils, getBreakpointNames}