import { useState, useEffect } from 'react';

function useScrollType() {
  const [scrollType, setScrollType] = useState('wheel');

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.type === 'touchmove') {
        setScrollType('touch');
      } else if (event.type === 'wheel') {
        setScrollType('wheel');
      }
    };

    document.addEventListener('touchmove', handleScroll, { passive: true });
    document.addEventListener('wheel', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('touchmove', handleScroll);
      document.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return scrollType;
}


export default useScrollType;