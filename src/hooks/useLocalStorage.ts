export default function useLocalStorage() {
  const get = (key: string, defaultValue?: any) => {
    const value = localStorage.getItem(`${import.meta.env.VITE_WEBAPP_LOCAL_STORAGE_KEYNAME}:${key}`);

    if (defaultValue !== undefined && value === null) {
      return defaultValue;
    }

    return value;
  };

  const set = (key: string, value: any) => {
    localStorage.setItem(`${import.meta.env.VITE_WEBAPP_LOCAL_STORAGE_KEYNAME}:${key}`, value);
  };

  return { get, set };
}
