import React, { useState, useEffect, useRef } from 'react';

function useSameHeight(children) {
  const [sameHeight, setSameHeight] = useState({});

  const sameHeightRefs = useRef({});

  useEffect(() => {
    // First pass: assign sameHeight prop to all children
    const processChildren = (children) => {
      React.Children.forEach(children, (child) => {
        if (!child.props) return;

        const childSameHeight = child.props.sameHeight;
        if (childSameHeight) {
          sameHeightRefs.current[childSameHeight] = sameHeightRefs.current[childSameHeight] || [];
          sameHeightRefs.current[childSameHeight].push(React.createRef());
        }

        if (child.props.children) {
          processChildren(child.props.children);
        }
      });
    };

    processChildren(children);

    // Second pass: create sameHeight object and calculate heights
    const sameHeightObject = {};
    for (const key in sameHeightRefs.current) {
      sameHeightObject[key] = { children: [] };
      sameHeightRefs.current[key].forEach((ref) => {
        sameHeightObject[key].children.push(ref.current);
      });
    }

    setSameHeight(sameHeightObject);

    const calculateHeights = () => {
        for (const key in sameHeightRefs.current) {
          const heights = sameHeightRefs.current[key]
            .map((ref) => ref.current)
            .filter((el) => el !== null)
            .map((el) => el.offsetHeight);
          setSameHeight((prevSameHeight) => ({
            ...prevSameHeight,
            [key]: { ...prevSameHeight[key], height: heights },
          }));
        }
      };
      
    window.addEventListener('resize', calculateHeights);
    calculateHeights();

    return () => {
      window.removeEventListener('resize', calculateHeights);
    };
  }, [children]);

  return sameHeight;
}

export default useSameHeight;