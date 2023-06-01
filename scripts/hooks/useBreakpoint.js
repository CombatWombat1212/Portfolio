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
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

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
    if (typeof window === 'undefined' || typeof document === 'undefined') {
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
    .split(',')
    .map(bp => bp.trim());

  return breakpoints;
};


const useBreakpointUtils = ({debounceTime = RESIZE_TIMEOUT} = {}) => {

  const currentBreakpoint = useBreakpoint({debounceTime});

  const breakpointNames = useMemo(() => {
    return getBreakpointNames();
  }, []);

  const isBp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    return currentBreakpoint === targetBreakpoint;
  }, [currentBreakpoint]);

  const isntBp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    return currentBreakpoint !== targetBreakpoint;
  }, [currentBreakpoint]);

  const isBpOrDown = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex <= targetIndex;
  }, [breakpointNames, currentBreakpoint]);

  const isBpOrUp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex >= targetIndex;
  }, [breakpointNames, currentBreakpoint]);

  const isBpAndDown = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex < targetIndex;
  }, [breakpointNames, currentBreakpoint]);

  const isBpAndUp = useMemo(() => (currentBreakpoint, targetBreakpoint) => {
    const currentIndex = breakpointNames.indexOf(currentBreakpoint);
    const targetIndex = breakpointNames.indexOf(targetBreakpoint);

    return currentIndex > targetIndex;
  }, [breakpointNames, currentBreakpoint]);

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
  const currentBreakpoint = useBreakpoint({ debounceTime });
  const breakpointUtils = useBreakpointUtils({ debounceTime });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentBreakpoint) {
      setLoading(false);
    }
  }, [currentBreakpoint]);

  const responsiveUtils = useMemo(() => {
    const utils = {};
    for (const [key, value] of Object.entries(breakpointUtils)) {
      utils[key] = (targetBreakpoint) =>
        value(currentBreakpoint, targetBreakpoint);
    }
    return utils;
  }, [currentBreakpoint, breakpointUtils]);

  return { ...responsiveUtils, currentBreakpoint, loading };

};

export { useBreakpoint, useBreakpointUtils, useResponsiveUtils, getBreakpointNames}