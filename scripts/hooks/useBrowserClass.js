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

    // Detect OS
    if (userAgentString.indexOf("Win") !== -1) {
      document.documentElement.classList.add('windows');
    } else if (userAgentString.indexOf("Mac") !== -1) {
      document.documentElement.classList.add('mac');
    } else if (userAgentString.indexOf("Linux") !== -1) {
      document.documentElement.classList.add('linux');
    } else if (userAgentString.indexOf("Android") !== -1) {
      document.documentElement.classList.add('android');
    } else if (/iPad|iPhone|iPod/.test(userAgentString) && !window.MSStream) {
      document.documentElement.classList.add('ios');
    }
    

    // Cleanup function to remove classes when component is unmounted or conditions change.
    return () => {
      document.documentElement.classList.remove('chrome', 'safari', 'firefox', 'windows', 'mac', 'linux', 'android', 'ios');
      // ...you can add more browsers to remove here.
    };
  }, []); // Empty array means this effect runs once on mount and cleanup on unmount.
};

export default useBrowserClass;