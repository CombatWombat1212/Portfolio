import { useState, useEffect } from "react";

function useInputDown(inputs) {
  const [inputDown, setInputDown] = useState(false);

  useEffect(() => {
    const inputNames = Array.isArray(inputs) ? inputs : [inputs];

    const mouseButtonMap = {
      LeftMouse: 0,
      MiddleMouse: 1,
      RightMouse: 2,
    };

    const handleKeyDown = (e) => {
      if (inputNames.includes(e.key)) {
        setInputDown(true);
      }
    };

    const handleKeyUp = (e) => {
      if (inputNames.includes(e.key)) {
        setInputDown(false);
      }
    };

    const handleMouseDown = (e) => {
      const buttonName = Object.keys(mouseButtonMap).find((key) => mouseButtonMap[key] === e.button);
      if (inputNames.includes(buttonName)) {
        setInputDown(true);
      }
    };

    const handleMouseUp = (e) => {
      const buttonName = Object.keys(mouseButtonMap).find((key) => mouseButtonMap[key] === e.button);
      if (inputNames.includes(buttonName)) {
        setInputDown(false);
      }
    };

    const handleWheel = (e) => {
      if (inputNames.includes("Scroll")) {
        setInputDown(true);
        setTimeout(() => setInputDown(false), 100);
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

  return inputDown;
}

export default useInputDown;
