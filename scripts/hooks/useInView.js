import { useState, useEffect, useRef } from 'react';

const useInView = (ref, options = {}) => {
  const [inView, setInView] = useState(false);
  const observer = useRef(null);

  let thresholds = [];
  let entryThreshold = 0;
  let exitThreshold = 0;

  if (options.threshold !== undefined) {
    if (typeof options.threshold === 'number') {
      thresholds = [options.threshold];
      entryThreshold = options.threshold;
      exitThreshold = options.threshold;
    } else if (typeof options.threshold === 'object') {
      entryThreshold = options.threshold.entry || 0;
      exitThreshold = options.threshold.exit || 0;
      thresholds = [exitThreshold, entryThreshold];
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) {
      return;
    }

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= entryThreshold) {
          setInView(true);
        } else if (!entry.isIntersecting || entry.intersectionRatio <= exitThreshold) {
          setInView(false);
        }
      });
    };

    const observerOptions = {
      threshold: thresholds,
    };

    observer.current = new IntersectionObserver(handleIntersect, observerOptions);

    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, ...thresholds]);

  return inView;
};

export default useInView;
