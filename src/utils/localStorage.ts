const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  return JSON.parse(storedValue);
};

const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorage, setLocalStorage };
