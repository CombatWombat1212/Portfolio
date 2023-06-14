import { useState, useEffect, use } from "react";

const useScrollbarWidth = (options = {}) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const { update = false } = options;
  

  const computeScrollbarWidth = () => {
    const windowWidth = window.innerWidth;
    const viewportWidth = document.documentElement.clientWidth;

    const newScrollbarWidth = windowWidth - viewportWidth;

    setScrollbarWidth((prevWidth) => {
      if (prevWidth !== newScrollbarWidth) {
        return newScrollbarWidth;
      }
      return prevWidth;
    });
  };

  useEffect(() => {
    computeScrollbarWidth();
    setTimeout(() => {
    computeScrollbarWidth();
    }, 1000);
  }, [update]);


  useEffect(() => {

    window.addEventListener("resize", computeScrollbarWidth);

    // Compute the initial scrollbar width
    computeScrollbarWidth();

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", computeScrollbarWidth);
    };
  }, []);

  return scrollbarWidth;
};

export default useScrollbarWidth;



const usePostScrollbarSizeToRoot = (options = {}) => {
  const { update = false } = options;
  
  const scrollbarWidth = useScrollbarWidth({update: update});

  
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  }, [scrollbarWidth]);


};

export {usePostScrollbarSizeToRoot};
