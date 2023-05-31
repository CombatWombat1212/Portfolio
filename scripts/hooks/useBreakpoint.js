import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { RESIZE_TIMEOUT } from '../GlobalUtilities';


const useBreakpoint = ({ debounceTime = RESIZE_TIMEOUT } = {}) => {
  const getBreakpoint = () => {
    // console.log('getBreakpoint called');
    const breakpoints = getBreakpointNames();

    const breakpointValues = breakpoints.map(bp => ({
      name: bp,
      value: parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue(`--${bp}`))
    }));

    const windowWidthInEm = window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize);

    for (let i = breakpointValues.length - 1; i >= 0; i--) {
      if (windowWidthInEm >= breakpointValues[i].value) {
        // console.log('Breakpoint found:', breakpointValues[i].name);
        return breakpointValues[i].name;
      }
    }
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState(null);
  const hasExecuted = useRef(false);

  const handleBreakpointChange = useCallback(() => {
    // console.log('handleBreakpointChange called');
    const newBreakpoint = getBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      // console.log('Setting currentBreakpoint:', newBreakpoint);
      setCurrentBreakpoint(newBreakpoint);
    }
  }, [currentBreakpoint]);

  useEffect(() => {
    // console.log('useEffect (handleLoad) called');
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (typeof window !== 'undefined' && !hasExecuted.current) {
      const handleLoad = () => {
        // console.log('handleLoad called');
        handleBreakpointChange();
        hasExecuted.current = true;
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => {
          // console.log('Removing event listener for handleLoad');
          window.removeEventListener('load', handleLoad);
        };
      }
    }
  }, [handleBreakpointChange]);

  useEffect(() => {
    // console.log('useEffect (resize) called');
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const debouncedHandleBreakpointChange = debounce(handleBreakpointChange, debounceTime);

    window.addEventListener('resize', debouncedHandleBreakpointChange);
    return () => {
      // console.log('Removing event listener for debouncedHandleBreakpointChange');
      window.removeEventListener('resize', debouncedHandleBreakpointChange);
    };
  }, [handleBreakpointChange, debounceTime]);

  // console.log('Returning currentBreakpoint:', currentBreakpoint);
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
  console.log('Current Breakpoint:', currentBreakpoint);
  const breakpointUtils = useBreakpointUtils({ debounceTime });

  const [loading, setLoading] = useState(true);
  console.log('Loading State (Before Effect):', loading);

  useEffect(() => {
    console.log('Inside useEffect, Current Breakpoint:', currentBreakpoint);
    if (currentBreakpoint) {
      setLoading(false);
    }
    console.log('Loading State (After State Update):', loading);
  }, [currentBreakpoint]);

  const responsiveUtils = useMemo(() => {
    const utils = {};
    for (const [key, value] of Object.entries(breakpointUtils)) {
      utils[key] = (targetBreakpoint) =>
        value(currentBreakpoint, targetBreakpoint);
    }
    return utils;
  }, [currentBreakpoint, breakpointUtils]);

  console.log('Responsive Utils:', responsiveUtils);

  return { ...responsiveUtils, currentBreakpoint, loading };
};

export { useBreakpoint, useBreakpointUtils, useResponsiveUtils, getBreakpointNames}