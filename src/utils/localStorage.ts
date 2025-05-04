export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  try {
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};
