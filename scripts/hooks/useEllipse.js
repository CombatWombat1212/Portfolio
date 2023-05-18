import { useState, useEffect } from "react";

const DEFAULT_OPTIONS = {
  duration: 500,
  min: 1,
  max: 3,
  character: ".",
};

const useEllipse = (options = {}) => {
  const { duration, min, max, character } = { ...DEFAULT_OPTIONS, ...options };
  const [ellipse, setEllipse] = useState(character.repeat(max));
  const [direction, setDirection] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipse((prevEllipse) => {
        const newLength = prevEllipse.length + direction;

        if (newLength <= min) {
          setDirection(1);
          return character.repeat(min);
        }

        if (newLength >= max) {
          setDirection(-1);
          return character.repeat(max);
        }

        return character.repeat(newLength);
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, max, min, direction, character]);

  return ellipse;
};

function Ellipse(props = {}) {
  const { duration, min, max, character } = { ...DEFAULT_OPTIONS, ...props };
  const ellipse = useEllipse({ duration, min, max, character });
  return <>{ellipse}</>;
}

export default useEllipse;
export { Ellipse };
