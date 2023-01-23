import React from "react";

export default function useLocalStore() {
  const [value, setValue] = React.useState<string | null>(null);

  const setItem = (key: string, val: string) => {
    localStorage.setItem(key, val);
    setValue(val);
  };

  const getItem = (key: string) => {
    const valueToReturn = localStorage.getItem(key);
    setValue(valueToReturn);
    return valueToReturn;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
}
