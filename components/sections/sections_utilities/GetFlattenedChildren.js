import React, { isValidElement } from "react";


function getFlattenedChildren(elements) {
    return elements.reduce((acc, element) => {
      if (Array.isArray(element)) {
        acc.push(...getFlattenedChildren(element));
      } else if (isValidElement(element)) {
        acc.push(element);
        if (element.props.children) {
          acc.push(...getFlattenedChildren(React.Children.toArray(element.props.children)));
        }
      }
      return acc;
    }, []);
  }
  

  export default getFlattenedChildren;