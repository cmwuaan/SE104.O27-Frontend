import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Retrieve the initial value from localStorage if it exists, or use the provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving value from localStorage:', error);
      return initialValue;
    }
  });

  // Update the stored value in localStorage and state
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting value to localStorage:', error);
    }
  };

  // Remove the item from localStorage and reset state
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error('Error removing value from localStorage:', error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
