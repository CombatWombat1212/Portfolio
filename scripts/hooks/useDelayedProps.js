import React, { useState, useEffect } from 'react';

const useDelayedProps = (prop, delay = 200) => {
  const [delayedProp, setDelayedProp] = useState(prop);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedProp(prop);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [prop, delay]);

  return delayedProp;
};


export default useDelayedProps;