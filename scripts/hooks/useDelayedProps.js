import { useState, useEffect, useMemo } from 'react';

const useDelayedProps = (inputProps, { delay = 0, prop = true } = {}) => {
  const props = useMemo(() => inputProps, [
    ...Object.keys(inputProps).map((key) => inputProps[key]),
  ]);

  const [delayedProps, setDelayedProps] = useState(props);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedProps((prevProps) => ({ ...prevProps, ...props }));
    }, delay);

    // return () => {
    //   clearTimeout(timeout);
    // };
  }, [props, delay, prop]);

  const memoizedDelayedProps = useMemo(() => delayedProps, [
    ...Object.keys(delayedProps).map((key) => delayedProps[key]),
  ]);

  return memoizedDelayedProps;
};

export default useDelayedProps;
