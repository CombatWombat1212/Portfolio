import { useEffect } from 'react';

function useBodyClass(className, isEnabled = true) {
  useEffect(() => {
    if (isEnabled) {
      // Add the class to the body element
      document.body.classList.add(className);

      // Remove the class from the body element on unmount or when isEnabled changes to false
      return () => {
        document.body.classList.remove(className);
      };
    }
  }, [className, isEnabled]);
}

export default useBodyClass;
