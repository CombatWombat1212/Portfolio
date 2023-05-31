import { useEffect } from 'react';

const useBrowserClass = () => {
  useEffect(() => {
    let userAgentString = navigator.userAgent;
    
    if (userAgentString.indexOf("Chrome") > -1) {
      document.documentElement.classList.add('chrome');
    } else if (userAgentString.indexOf("Safari") > -1) {
      document.documentElement.classList.add('safari');
    } else if (userAgentString.indexOf("Firefox") > -1) {
      document.documentElement.classList.add('firefox');
    }
    // ...you can add more conditions for other browsers.

    // Cleanup function to remove classes when component is unmounted or conditions change.
    return () => {
      document.documentElement.classList.remove('chrome', 'safari', 'firefox');
      // ...you can add more browsers to remove here.
    };
  }, []); // Empty array means this effect runs once on mount and cleanup on unmount.
};

export default useBrowserClass;
