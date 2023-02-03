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

  const getCurrentSession = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const { sessionId } = JSON.parse(user);
      return sessionId;
    }
    return null;
  };

  return { value, setItem, getItem, removeItem, getCurrentSession };
}
