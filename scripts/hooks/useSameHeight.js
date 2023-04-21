import { useEffect, useRef, useState } from "react";
import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

let groups = {};

const useSameHeight = (groupKey, ref, options = {}) => {
  const [heightObj, setHeightObj] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [output, setOutput] = useState(false);

  const prevWindowWidth = useRef(null);
  const prevWindowHeight = useRef(null);

  const resizeOption = options.resize || "both";
  const update = options.update || null; // Add this line

  if (!groupKey) {
    return false;
  }

  const logElementsByGroup = () => {
    // console.log("Groups:", groups);
  };

  const addElementToGroup = (element) => {
    if (!groups[groupKey]) {
      groups[groupKey] = {
        elems: [],
        height: {
          all: [],
          max: 0,
          min: Number.MAX_VALUE,
          index: [],
        },
        resizing: false,
      };
    }

    groups[groupKey].elems.push(element);
    groups[groupKey].height.index.push(groups[groupKey].elems.length - 1);
  };

  const updateGroupInfo = () => {
    let changed = false;
    groups[groupKey].height.all = [];
    groups[groupKey].height.max = 0;
    groups[groupKey].height.min = Number.MAX_VALUE;

    groups[groupKey].elems.forEach((element) => {
      const height =
        splitPx(window.getComputedStyle(element).height) +
        splitPx(window.getComputedStyle(element).paddingTop) +
        splitPx(window.getComputedStyle(element).paddingBottom);

      groups[groupKey].height.all.push(height);
      groups[groupKey].height.max = Math.max(groups[groupKey].height.max, height);
      groups[groupKey].height.min = Math.min(groups[groupKey].height.min, height);

      if (
        heightObj &&
        (heightObj.all !== groups[groupKey].height.all ||
          heightObj.max !== groups[groupKey].height.max ||
          heightObj.min !== groups[groupKey].height.min)
      ) {
        changed = true;
      }
    });

    if (!heightObj || changed) {
      setHeightObj(groups[groupKey].height);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      addElementToGroup(element);
      updateGroupInfo();
      // logElementsByGroup();
    }

    return () => {
      if (element) {
        const index = groups[groupKey].elems.indexOf(element);
        if (index !== -1) {
          groups[groupKey].elems.splice(index, 1);
          groups[groupKey].height.all.splice(index, 1);
          groups[groupKey].height.index.splice(index, 1);
        }
      }
    };
  }, [ref, groupKey]);
  // }, [ref, groupKey, ...(Array.isArray(update) ? update : [update])]);

  useEffect(() => {
    if (update) {
      setResizing(true);
      setTimeout(() => {
        setResizing(false);
        updateGroupInfo();
      }, 100);
    }
  }, [...(Array.isArray(update) ? update : [update])]);

  useEffect(() => {
    let resizeTimeout;

    const delayedResize = () => {
      clearTimeout(resizeTimeout);
      setResizing(false);
      updateGroupInfo();
      prevWindowWidth.current = window.innerWidth;
      prevWindowHeight.current = window.innerHeight;
    };

    const handleResize = (e) => {
      if (
        resizeOption === "both" ||
        (resizeOption === "horizontal" && e.target.innerWidth !== prevWindowWidth.current) ||
        (resizeOption === "vertical" && e.target.innerHeight !== prevWindowHeight.current)
      ) {
        setResizing(true);
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(delayedResize, RESIZE_TIMEOUT);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const componentIndex = typeof groups[groupKey] != "undefined" && ref.current ? groups[groupKey].elems.indexOf(ref.current) : null;

  useEffect(() => {
    if (heightObj && componentIndex != null) {
      setOutput({
        ...groups[groupKey],
        height: heightObj,
        resizing: resizing,
        index: componentIndex,
      });
    } else {
      setOutput(false);
    }
  }, [heightObj, resizing, componentIndex]);

  return output;
};

export default useSameHeight;
