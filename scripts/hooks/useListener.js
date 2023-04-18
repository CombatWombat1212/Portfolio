import { useEffect } from 'react';

function useListener(event, callback, isEnabled = true, targetRef = null) {
  useEffect(() => {
    if (isEnabled) {
      // If targetRef is provided, add the event listener to the target element,
      // otherwise add it to the window
      const target = targetRef?.current || window;
      target.addEventListener(event, callback);

      // Remove the event listener on unmount or when isEnabled changes to false
      return () => {
        target.removeEventListener(event, callback);
      };
    } else {
      // Remove the event listener if isEnabled is false
      const target = targetRef?.current || window;
      target.removeEventListener(event, callback);
    }
  }, [event, callback, isEnabled, targetRef]);
}

export default useListener;
