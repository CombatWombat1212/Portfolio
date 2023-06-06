import { useEffect, useState } from 'react';

const useInOut = (trigger = false, options = {}) => {
  const { ref = null, startDelay = 0, endDelay = 0 } = options;
  const [state, setState] = useState('initial');

  useEffect(() => {
    let timer;
    if (trigger) {
      timer = setTimeout(() => {
        setState('animate');
      }, startDelay);
    } else if (state === 'animate') {
      timer = setTimeout(() => {
        setState('exit');
      }, endDelay);
    }
    return () => clearTimeout(timer);
  }, [trigger, state, startDelay, endDelay]);

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
