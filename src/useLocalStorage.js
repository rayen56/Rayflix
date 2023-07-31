// useLocalStorage.js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [localState, setLocalState] = useState(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localState));
  }, [key, localState]);

  return [localState, setLocalState];
};

export default useLocalStorage;
