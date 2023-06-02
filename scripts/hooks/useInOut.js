import { useEffect, useState } from 'react';

const useInOut = (trigger = false, options = {}) => {
  const { ref = null } = options;
  const [state, setState] = useState('initial');
  

  useEffect(() => {
    if (trigger) {
      setState('animate');
    } else if (state === 'animate') {
      setState('exit');
    }
  }, [trigger, state]);

  useEffect(() => {
    if (state === 'exit') {
      let transitionDuration = 300; // default value

      if (ref && ref.current) {
        const computedStyle = window.getComputedStyle(ref.current);
        const transitionValue = computedStyle.getPropertyValue('transition') || computedStyle.getPropertyValue('--transition');

        if (transitionValue) {
          // Extract the duration from the transition value
          const [property, duration] = transitionValue.split(' ');

          // Convert the duration to milliseconds
          if (duration.includes('s')) {
            transitionDuration = parseFloat(duration) * 1000;
          } else if (duration.includes('ms')) {
            transitionDuration = parseFloat(duration);
          }
        }
      }

      const timer = setTimeout(() => {
        setState('initial');
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [state, ref]);

  return state;
};

export default useInOut;
