import { useEffect } from 'react';

function useListener(event, callback, isEnabled = true) {
  useEffect(() => {
    if (isEnabled) {
      // Add the event listener
      window.addEventListener(event, callback);

      // Remove the event listener on unmount or when isEnabled changes to false
      return () => {
        window.removeEventListener(event, callback);
      };
    } else {
      // Remove the event listener if isEnabled is false
      window.removeEventListener(event, callback);
    }
  }, [event, callback, isEnabled]);
}

export default useListener;
