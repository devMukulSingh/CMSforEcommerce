"use client";

interface IsetInLocaStorage {
  key: string;
  item: any;
}

export const useLocalStorage = () => {
  const setInLocalStorage = ({ key, item }: IsetInLocaStorage) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(item));
    }
    return;
  };

  const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || "{}");
    }
  };
  return { setInLocalStorage, getFromLocalStorage };
};
