import { useState, useEffect } from 'react';

const useAttrObserver = (ref, propertyName) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(mutationsList => {
        for(let mutation of mutationsList) {
          // Check if the mutation is for the 'style' attribute and if the property name starts with '--'
          if (mutation.type === 'attributes' && mutation.attributeName === 'style' && propertyName.startsWith('--')) {
            const propertyValue = window.getComputedStyle(ref.current).getPropertyValue(propertyName).trim();
            setState(propertyValue === 'true');
          }
          // Check if the mutation is for the specified attribute and if the property name doesn't start with '--'
          else if (mutation.type === 'attributes' && mutation.attributeName === propertyName && !propertyName.startsWith('--')) {
            const attributeValue = ref.current.getAttribute(propertyName);
            setState(attributeValue === 'true');
          }
        }
      });

      observer.observe(ref.current, {
        attributes: true,
        attributeFilter: ['style', propertyName]
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [ref, propertyName]);

  return state;
};

export default useAttrObserver;
