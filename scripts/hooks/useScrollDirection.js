import { useState, useEffect } from 'react';

function useScrollDirection() {
  const [direction, setDirection] = useState('none');
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > lastScrollPosition) {
        setDirection('down');
      } else if (currentScrollPosition < lastScrollPosition) {
        setDirection('up');
      }

      setLastScrollPosition(currentScrollPosition);
    }

    function handleTouchStart(event) {
      setTouchStart(event.touches[0].clientY);
    }

    function handleTouchEnd(event) {
      const touchEnd = event.changedTouches[0].clientY;

      if (touchEnd > touchStart) {
        setDirection('up');
      } else if (touchEnd < touchStart) {
        setDirection('down');
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lastScrollPosition, touchStart]);

  return direction;
}

export default useScrollDirection;
