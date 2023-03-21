import React, { useMemo } from 'react';

function usePropModifier(jsxElement, modificationsArray, override = true) {
  function matchProps(element, searchProps) {
    const elementType = element.type;
    const elementTypeName = typeof elementType === 'function' ? elementType.name : elementType;

    return Object.entries(searchProps).every(([key, value]) => {
      if (key === 'elemType') {
        return elementTypeName === value;
      } else {
        return element.props[key] === value;
      }
    });
  }

  function applyModifications(element, modifications, override) {
    const updatedProps = { ...element.props };

    for (const [key, value] of Object.entries(modifications)) {
      if (key === 'elemType') {
        continue;
      }

      if (override || !updatedProps[key]) {
        updatedProps[key] = value;
      } else {
        updatedProps[key] = `${updatedProps[key]} ${value}`;
      }
    }

    return updatedProps;
  }

  function traverseAndModify(element, modificationsList, override) {
    if (!element || !element.props || !element.props.children) {
      return element;
    }

    let updatedElement = element;

    for (const [searchProps, modifyProps] of modificationsList) {
      if (matchProps(element, searchProps)) {
        const updatedProps = applyModifications(element, modifyProps, override);
        const elementType = element.type;
        const elementTypeName = typeof elementType === 'function' ? elementType.name : elementType;
        const newType = modifyProps.elemType ? modifyProps.elemType : elementType;
        updatedElement = React.cloneElement(element, updatedProps, updatedElement.props.children);
        if (modifyProps.elemType) {
          updatedElement = React.createElement(newType, updatedProps, ...[updatedElement.props.children]);
        }
        break;
      }
    }

    const updatedChildren = React.Children.map(updatedElement.props.children, (child) => {
      return traverseAndModify(child, modificationsList, override);
    });

    return React.cloneElement(updatedElement, updatedElement.props, updatedChildren);
  }

  const modifiedElement = useMemo(() => {
    const elementsArray = React.Children.toArray(jsxElement);

    const modificationsList = Array.isArray(modificationsArray[0]) ? modificationsArray : [modificationsArray];

    const updatedElements = elementsArray.map((element) =>
      traverseAndModify(element, modificationsList, override)
    );

    return updatedElements;
  }, [jsxElement, modificationsArray, override]);

  return modifiedElement;
}

export default usePropModifier;
