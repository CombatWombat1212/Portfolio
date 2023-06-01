import { useEffect, useState, useCallback, useRef } from "react";
import { RESIZE_TIMEOUT } from "../GlobalUtilities";

const useHorizontalResize = (onResize, debounceTime = RESIZE_TIMEOUT) => {
  const getWindowWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return null;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const hasExecuted = useRef(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth !== windowWidth) {
      setWindowWidth(window.innerWidth);
      onResize();
    }
  }, [windowWidth, onResize]);

  useEffect(() => {
    if (typeof window !== "undefined" && !hasExecuted.current) {
      const handleLoad = () => {
        onResize(); // Run the callback once when the component mounts
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
  }, [onResize]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const debouncedHandleResize = debounce(handleResize, debounceTime);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [handleResize, debounceTime]);
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

export default useHorizontalResize;
