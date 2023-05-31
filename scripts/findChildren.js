import React from 'react';

const flattenChildren = (children) => {
  let flattened = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      flattened.push(child);
      if (child.props && child.props.children) {
        flattened = flattened.concat(flattenChildren(child.props.children));
      }
    }
  });

  return flattened;
};

const findChildren = (children, searchTermArray) => {
  const traverseAndOrganize = (element, searchProps, key, result) => {
    if (!React.isValidElement(element)) {
      return;
    }

    const elementProps = element.props;
    const elementType = element.type;
    // const elementTypeName = typeof elementType === 'function' ? elementType.name : elementType;
    const elementTypeName = (() => {
      if (typeof elementType === "string") {
        return elementType;
      } else if (typeof elementType === "function") {
        return elementType.displayName || elementType.name;
      }else if(elementType == React.Fragment){
        return "Fragment";
      } else {
        return "Unknown";
      }
    })();


    const matchesSearchTerm = Object.entries(searchProps).every(
      ([searchKey, searchValue]) => {
        if (searchKey === 'elemType') {
          return elementTypeName === searchValue;
        }
        return elementProps[searchKey] === searchValue;
      }
    );

    if (matchesSearchTerm) {
      result[key] = true;
    }
  };

  const foundChildren = {};

  if (!Array.isArray(searchTermArray[0])) {
    searchTermArray = [searchTermArray];
  }

  searchTermArray.forEach(([key, searchProps, flatten = false]) => {
    foundChildren[key] = false;
    const childrenToSearch = flatten ? flattenChildren(children) : children;

    React.Children.forEach(childrenToSearch, (child) =>
      traverseAndOrganize(child, searchProps, key, foundChildren)
    );
  });

  return foundChildren;
};

export default findChildren;
