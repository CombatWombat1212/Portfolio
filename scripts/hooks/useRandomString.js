import { useState, useEffect } from 'react';

function useRandomString(strings) {
  const [randomString, setRandomString] = useState('');
  const [availableStrings, setAvailableStrings] = useState([...strings]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const getRandomString = () => {
      if (availableStrings.length === 0) {
        setAvailableStrings([...strings]);
      }

      const randomIndex = Math.floor(Math.random() * availableStrings.length);
      const selectedString = availableStrings[randomIndex];

      setAvailableStrings((prevAvailableStrings) =>
        prevAvailableStrings.filter((_, index) => index !== randomIndex),
      );
      return selectedString;
    };

    if (!mounted) {
      setRandomString(getRandomString());
      setMounted(true);
    }
  }, [strings, availableStrings, mounted]);

  return randomString;
}

export default useRandomString;
