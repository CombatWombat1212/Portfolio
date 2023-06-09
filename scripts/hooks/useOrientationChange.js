import { useEffect, useState, useCallback, useRef } from "react";
import { RESIZE_TIMEOUT } from "../GlobalUtilities";

const useOrientationChange = (onOrientationChange, debounceTime = RESIZE_TIMEOUT) => {
  const getOrientation = () => {
    if (typeof window !== "undefined" && window.screen && 'orientation' in window.screen) {
      return window.screen.orientation.angle;
    }
    return null;
  };

  const [orientation, setOrientation] = useState(getOrientation);
  const hasExecuted = useRef(false);

  const handleOrientationChange = useCallback(() => {
    if (window.screen.orientation.angle !== orientation) {
      setOrientation(window.screen.orientation.angle);
      onOrientationChange();
    }
  }, [orientation, onOrientationChange]);

  useEffect(() => {
    if (typeof window !== "undefined" && !hasExecuted.current) {
      const handleLoad = () => {
        onOrientationChange(); // Run the callback once when the component mounts
        hasExecuted.current = true;
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => {
          window.removeEventListener("load", handleLoad);
        };
      }
    }
  }, [onOrientationChange]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const debouncedHandleOrientationChange = debounce(handleOrientationChange, debounceTime);

    window.addEventListener("orientationchange", debouncedHandleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", debouncedHandleOrientationChange);
    };
  }, [handleOrientationChange, debounceTime]);
};

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default useOrientationChange;
