import { useEffect, useRef, useState } from "react";
import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

let groups = {};

const useSameHeight = (groupKey, ref, options = {}) => {
  const actualGroupKey = typeof groupKey === "object" ? groupKey.key : groupKey;

  const [heightObj, setHeightObj] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [output, setOutput] = useState(false);

  const prevWindowWidth = useRef(null);
  const prevWindowHeight = useRef(null);

  const resizeOption = options.resize || "both";
  const update = options.update || null;

  if (!actualGroupKey) {
    return false;
  }

  const logElementsByGroup = () => {
    // console.log("Groups:", groups);
  };

  const addElementToGroup = (element) => {
    if (!groups[actualGroupKey]) {
      groups[actualGroupKey] = {
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

    groups[actualGroupKey].elems.push(element);
    groups[actualGroupKey].height.index.push(groups[actualGroupKey].elems.length - 1);
  };

  const updateGroupInfo = () => {
    if (typeof groupKey === "object" && groupKey.remove && groups[groupKey.remove]) {
      groups = delete groups[groupKey.remove];
      if (!groups[actualGroupKey]) return;
    }

    // console.log(groups);

    let changed = false;
    groups[actualGroupKey].height.all = [];
    groups[actualGroupKey].height.max = 0;
    groups[actualGroupKey].height.min = Number.MAX_VALUE;

    groups[actualGroupKey].elems.forEach((element) => {
      const height =
        splitPx(window.getComputedStyle(element).height) +
        splitPx(window.getComputedStyle(element).paddingTop) +
        splitPx(window.getComputedStyle(element).paddingBottom);

      groups[actualGroupKey].height.all.push(height);
      groups[actualGroupKey].height.max = Math.max(groups[actualGroupKey].height.max, height);
      groups[actualGroupKey].height.min = Math.min(groups[actualGroupKey].height.min, height);

      if (
        heightObj &&
        (heightObj.all !== groups[actualGroupKey].height.all ||
          heightObj.max !== groups[actualGroupKey].height.max ||
          heightObj.min !== groups[actualGroupKey].height.min)
      ) {
        changed = true;
      }
    });

    if (!heightObj || changed) {
      setHeightObj(groups[actualGroupKey].height);
    }
  };

  useEffect(() => {
    const element = ref.current;

    // If groupKey is an object and has a remove property, delete the specified group
    if (typeof groupKey === "object" && groupKey.remove && groups[groupKey.remove]) {
      delete groups[groupKey.remove];
    }

    if (element) {
      addElementToGroup(element);
      updateGroupInfo();
      logElementsByGroup();
    }

    return () => {
      if (element) {
        const index = groups[actualGroupKey].elems.indexOf(element);
        if (index !== -1) {
          groups[actualGroupKey].elems.splice(index, 1);
          groups[actualGroupKey].height.all.splice(index, 1);
          groups[actualGroupKey].height.index.splice(index, 1);
        }
      }
    };
  }, [ref, actualGroupKey]);
  // }, [ref, actualGroupKey, ...(Array.isArray(update) ? update : [update])]);

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

  const componentIndex = typeof groups[actualGroupKey] != "undefined" && ref.current ? groups[actualGroupKey].elems.indexOf(ref.current) : null;

  useEffect(() => {
    if (heightObj && componentIndex != null) {
      setOutput({
        ...groups[actualGroupKey],
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
