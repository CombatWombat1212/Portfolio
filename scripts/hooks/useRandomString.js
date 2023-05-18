import { useState, useEffect, useRef } from "react";

function useRandomString(strings, options = {}) {
  const { localStorage: useLocalStorage, key = "useRandomString" } = options;

  const [randomString, setRandomString] = useState("");
  const [initialized, setInitialized] = useState(false);

  const availableStringsRef = useRef([]);
  const stringsRef = useRef(strings);

  useEffect(() => {
    let savedStrings = [];
    let savedRandomString = "";
    if (useLocalStorage) {
      const savedData = JSON.parse(window.localStorage.getItem(key));
      if (savedData && JSON.stringify(savedData.allStrings) === JSON.stringify(stringsRef.current)) {
        savedStrings = savedData.availableStrings;
        savedRandomString = savedData.randomString;
      }
    }
    availableStringsRef.current = savedStrings.length > 0 ? savedStrings : [...stringsRef.current];
    setRandomString(savedRandomString || "");
    setInitialized(true);
  }, [useLocalStorage, key]);

  useEffect(() => {
    const getRandomString = () => {
      if (availableStringsRef.current.length === 0) {
        availableStringsRef.current = [...stringsRef.current];
        return "";
      }

      const randomIndex = Math.floor(Math.random() * availableStringsRef.current.length);
      const selectedString = availableStringsRef.current[randomIndex];

      availableStringsRef.current = availableStringsRef.current.filter((_, index) => index !== randomIndex);
      return selectedString;
    };

    if (initialized) {
      const newRandomString = getRandomString();
      setRandomString(newRandomString);
      if (useLocalStorage) {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            allStrings: stringsRef.current,
            availableStrings: availableStringsRef.current,
            randomString: newRandomString,
          })
        );
      }
    }
  }, [initialized, useLocalStorage, key]);

  return randomString;
}

export default useRandomString;
