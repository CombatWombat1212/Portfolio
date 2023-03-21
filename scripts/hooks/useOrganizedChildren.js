import React from 'react';

const useOrganizeChildren = (children, searchTermArray) => {
  const traverseAndOrganize = (element, searchProps, key, result, unwrapChildren) => {
    if (!React.isValidElement(element)) {
      return;
    }

    const elementProps = element.props;
    const elementType = element.type;
    const elementTypeName = typeof elementType === 'function' ? elementType.name : elementType;

    const matchesSearchTerm = Object.entries(searchProps).every(
      ([searchKey, searchValue]) => {
        if (searchKey === 'elemType') {
          return elementTypeName === searchValue;
        }
        return elementProps[searchKey] === searchValue;
      }
    );

    if (matchesSearchTerm) {
      if (unwrapChildren && elementProps.children) {
        React.Children.forEach(elementProps.children, (child) => {
          result[key].push(child);
        });
      } else {
        result[key].push(element);
      }
    }

    if (elementProps && elementProps.children) {
      React.Children.forEach(elementProps.children, (child) =>
        traverseAndOrganize(child, searchProps, key, result, unwrapChildren)
      );
    }
  };

  const organizedChildren = {};

  if (!Array.isArray(searchTermArray[0])) {
    searchTermArray = [searchTermArray];
  }

  searchTermArray.forEach(([key, searchProps, unwrapChildren = false]) => {
    organizedChildren[key] = [];
    React.Children.forEach(children, (child) =>
      traverseAndOrganize(child, searchProps, key, organizedChildren, unwrapChildren)
    );
  });

  return organizedChildren;
};

export default useOrganizeChildren;
