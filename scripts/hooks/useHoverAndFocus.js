import { useState, useEffect, useRef } from 'react';

function useHoverAndFocus(refConfig, classConfig = {}, overrideConfig = {}) {
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  const hasMounted = useRef(false);

  const handleStateChange = (element, parentElement, config, state) => {
    const applyClasses = (target) => { 
      if(Object.keys(classConfig).length === 0) return;

      const onClass = (typeof overrideConfig === 'object' && overrideConfig.on) || (typeof overrideConfig === 'string' && overrideConfig) || classConfig.on || null;
      const offClass = (typeof overrideConfig === 'object' && overrideConfig.off) || (typeof overrideConfig === 'string' && null ) || classConfig.off || null;

      if (state) {
        if (offClass) {
          target.classList.remove(offClass);
        } else if (config.off) {
          target.classList.remove(config.off);
        }

        if (onClass) {
          target.classList.add(onClass);
        } else if (config.on) {
          target.classList.add(config.on);
        }
      } else {
        if (onClass) {
          target.classList.remove(onClass);
        } else if (config.on) {
          target.classList.remove(config.on);
        }

        if (offClass) {
          target.classList.add(offClass);
        } else if (config.off) {
          target.classList.add(config.off);
        }
      }
    };

    if (config.elems) {
      if (config.elems === 'current') {
        applyClasses(element);
      } else if (config.elems === 'parent') {
        applyClasses(parentElement);
      }else {
        const targets = parentElement.querySelectorAll(config.elems);
        targets.forEach((target) => applyClasses(target));
      }
    } else {
      applyClasses(parentElement);
    }
  };

  useEffect(() => {
    const hoveredRef = refConfig.hovered || refConfig.hover || refConfig;
    const parentRef = refConfig.parent || hoveredRef;
    const element = hoveredRef.current;
    const parentElement = parentRef.current;

    if (!element || !parentElement) {
      return;
    }

    if (!hasMounted.current) {
      if (Array.isArray(classConfig)) {
        classConfig.forEach((config) => {
          if (config.off || (typeof overrideConfig === 'object' && overrideConfig.off)) {
            handleStateChange(element, parentElement, config, false);
          }
        });
      } else if (classConfig.off || (typeof overrideConfig === 'object' && overrideConfig.off)) {
        handleStateChange(element, parentElement, classConfig, false);
      }
      hasMounted.current = true;
    }

    const handleMouseEnter = () => {
      setIsHoveredOrFocused(true);
      
      if (typeof classConfig === 'string') {
        parentElement.classList.add(classConfig);
      } else if (Array.isArray(classConfig)) {
        classConfig.forEach((config) => handleStateChange(element, parentElement, config, true));
      } else {
        handleStateChange(element, parentElement, classConfig, true);
      }
    };

    const handleMouseLeave = () => {
      setIsHoveredOrFocused(false);

      if (typeof classConfig === 'string') {
        parentElement.classList.remove(classConfig);
      } else if (Array.isArray(classConfig)) {
        classConfig.forEach((config) => handleStateChange(element, parentElement, config, false));
      } else {
        handleStateChange(element, parentElement, classConfig, false);
      }
    };

    const handleFocus = handleMouseEnter;
    const handleBlur = handleMouseLeave;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [refConfig, classConfig, overrideConfig]);

  return isHoveredOrFocused;
}

export default useHoverAndFocus;
