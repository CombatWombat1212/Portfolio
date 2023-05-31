import { useState, useEffect, useRef } from "react";

function useRandomString(items, options = {}) {
  const { localStorage: useLocalStorage, key = "useRandomString", count = 1 } = options;
  randomItemsErrors(count, useLocalStorage, key, items);

  const [randomItems, setRandomItems] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const availableIndexesRef = useRef([]);
  const itemsRef = useRef(items);

  useEffect(() => {
    let savedIndexes = [];
    let savedRandomItemIndexes = [];
    if (useLocalStorage) {
      const savedData = JSON.parse(window.localStorage.getItem(key));
      if (savedData && savedData.allItemsLength === itemsRef.current.length) {
        savedIndexes = savedData.availableIndexes;
        savedRandomItemIndexes = savedData.randomItemIndexes;
      }
    }
    availableIndexesRef.current = savedIndexes.length > 0 ? savedIndexes : [...Array(itemsRef.current.length).keys()];
    setRandomItems(savedRandomItemIndexes.map((index) => itemsRef.current[index]));
    setInitialized(true);
  }, [useLocalStorage, key]);

  useEffect(() => {
    const getRandomItems = () => {
      let selectedIndexes = [];
      for (let i = 0; i < count; i++) {
        if (availableIndexesRef.current.length === 0) {
          availableIndexesRef.current = [...Array(itemsRef.current.length).keys()];
        }

        const randomIndex = Math.floor(Math.random() * availableIndexesRef.current.length);
        const selectedIndex = availableIndexesRef.current[randomIndex];

        selectedIndexes.push(selectedIndex);
        availableIndexesRef.current = availableIndexesRef.current.filter((_, index) => index !== randomIndex);
      }
      return selectedIndexes.map((index) => itemsRef.current[index]);
    };

    if (initialized) {
      const newRandomItems = getRandomItems();
      setRandomItems(newRandomItems);
      if (useLocalStorage) {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            allItemsLength: itemsRef.current.length,
            availableIndexes: availableIndexesRef.current,
            randomItemIndexes: newRandomItems.map((item) => itemsRef.current.indexOf(item)),
          })
        );
      }
    }
  }, [initialized, useLocalStorage, key, count]);

  return count === 1 ? randomItems[0] : randomItems;
}

function randomItemsErrors(count, useLocalStorage, key, items) {
  if (count < 1) {
    throw new Error("The count must be at least 1");
  }

  if (useLocalStorage && !key) {
    throw new Error("If using localStorage, a key must be provided");
  }

  if (count > items.length) {
    throw new Error("The count must not exceed the number of items");
  }
}

export default useRandomString;
