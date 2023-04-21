import { useEffect, useRef, useState } from "react";
import { useResponsive } from "../contexts/ResponsiveContext";

const compareChildren = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((child, index) => compareChildren(child, b[index]));
  }

  if (a.type !== b.type) return false;
  if (a.key !== b.key) return false;

  const aProps = a.props || {};
  const bProps = b.props || {};

  const aKeys = Object.keys(aProps).filter((k) => k !== "children");
  const bKeys = Object.keys(bProps).filter((k) => k !== "children");

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (aProps[key] !== bProps[key]) return false;
  }

  return compareChildren(aProps.children, bProps.children);
};



const compareSameHeightChildren = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
  
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
  
    if (aKeys.length !== bKeys.length) return false;
  
    return aKeys.every((key) => {
      if (!(key in b)) return false;
  
      const aChildren = a[key];
      const bChildren = b[key];
  
      if (aChildren.length !== bChildren.length) return false;
  
      return aChildren.every((child, index) =>
        compareChildren(child, bChildren[index])
      );
    });
  };
  

  const collectSameHeightChildren = (children, refMap, result = {}) => {
    if (!children) {
      return result;
    }
  
    const childrenArray = Array.isArray(children) ? children : [children];
  
    childrenArray.forEach((child) => {
      if (!child || !child.type) {
        return;
      }
  
      if (child.props && child.props.sameHeight) {
        let sameHeightValue;
  
        if (typeof child.props.sameHeight === "object") {
          sameHeightValue = child.props.sameHeight.key;
        } else {
          sameHeightValue = child.props.sameHeight;
        }
  
        if (!result[sameHeightValue]) {
          result[sameHeightValue] = [];
        }
  
        // Use the existing ref in refMap or create a new one
        const childKey = child.key || child.props['data-key'] || child.type.displayName || child.type.name;
        const childRefId = `${sameHeightValue}_${childKey}`;
        if (!refMap.current[childRefId]) {
          refMap.current[childRefId] = React.createRef();
        }
        
        // Clone the child element and attach the ref
        const clonedChild = React.cloneElement(child, { ref: refMap.current[childRefId] });

        result[sameHeightValue].push(clonedChild);
            }
  
      if (child.props && child.props.children) {
        collectSameHeightChildren(child.props.children, refMap, result);
      }
    });
  
    return result;
  };
  
  

const calculateHeights = (sameHeightChildren) => {
    const heights = {};
    for (const key in sameHeightChildren) {
      const children = sameHeightChildren[key];
      const heightData = children.map((child) => {
        const element = child.ref.current;
        if (!element) return 0;
        const height =
          element.offsetHeight +
          parseInt(window.getComputedStyle(element).paddingTop) +
          parseInt(window.getComputedStyle(element).paddingBottom);
        return height;
      });
  
      heights[key] = {
        children,
        all: heightData,
        max: Math.max(...heightData),
        min: Math.min(...heightData),
      };
    }
    return heights;
  };
  
  
  const useMatchHeight = (children) => {
    const prevChildrenRef = useRef();
    const refMap = useRef({});
    const [sameHeightChildren, setSameHeightChildren] = useState(() => collectSameHeightChildren(children, refMap.current = {}));
  
    const { bp } = useResponsive();
  
    useEffect(() => {
      if (!compareChildren(prevChildrenRef.current, children)) {
        const newSameHeightChildren = collectSameHeightChildren(children, refMap.current);
        if (!compareSameHeightChildren(sameHeightChildren, newSameHeightChildren)) {
          setSameHeightChildren(newSameHeightChildren);
        }
        prevChildrenRef.current = children;
      }
    }, [children, bp]);
  
    const heights = calculateHeights(sameHeightChildren);
    return heights;
  };
  
  export default useMatchHeight;
  