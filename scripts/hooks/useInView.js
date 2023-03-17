import { useState, useEffect, useRef } from 'react';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) {
      return;
    }

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting);
      });
    };

    observer.current = new IntersectionObserver(handleIntersect);

    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref]);

  return inView;
};

export default useInView;
