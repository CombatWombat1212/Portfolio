import { useState, useEffect, useRef } from "react";

function useInputDown(inputs) {
  const [inputStates, setInputStates] = useState(
    Array.isArray(inputs) ? inputs.reduce((acc, input) => ({ ...acc, [input]: false }), {}) : { [inputs]: false }
  );

  const inputStatesRef = useRef(inputStates);

  useEffect(() => {
    inputStatesRef.current = inputStates;
  }, [inputStates]);

  useEffect(() => {
    const inputNames = Array.isArray(inputs) ? inputs : [inputs];

    const mouseButtonMap = {
      LeftMouse: 0,
      MiddleMouse: 1,
      RightMouse: 2,
    };

    const handleKeyDown = (e) => {
      if (inputNames.includes(e.key)) {
        setInputStates((prevState) => ({ ...prevState, [e.key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (inputNames.includes(e.key)) {
        setInputStates((prevState) => ({ ...prevState, [e.key]: false }));
      }
    };
  
    const handleMouseDown = (e) => {
      const buttonName = Object.keys(mouseButtonMap).find((key) => mouseButtonMap[key] === e.button);
      if (inputNames.includes(buttonName)) {
        setInputStates((prevState) => ({ ...prevState, [buttonName]: true }));
      }
    };

    const handleMouseUp = (e) => {
      const buttonName = Object.keys(mouseButtonMap).find((key) => mouseButtonMap[key] === e.button);
      if (inputNames.includes(buttonName)) {
        setInputStates((prevState) => ({ ...prevState, [buttonName]: false }));
      }
    };
  
    const handleWheel = (e) => {
      if (inputNames.includes("Scroll")) {
        setInputStates((prevState) => ({ ...prevState, Scroll: true }));
        setTimeout(() => {
          setInputStates((prevState) => ({ ...prevState, Scroll: false }));
        }, 100);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [inputs]);

  const down = Object.values(inputStates).some((state) => state);

  return down;
}

export default useInputDown;
