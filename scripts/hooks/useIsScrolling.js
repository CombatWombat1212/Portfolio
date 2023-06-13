import { useEffect, useState, useCallback } from 'react';
import { RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";

const useIsScrolling = ({ debounce = RESIZE_TIMEOUT } = {}) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => setIsScrolling(false), debounce);
  }, [debounce]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScrolling;
};

export default useIsScrolling;
