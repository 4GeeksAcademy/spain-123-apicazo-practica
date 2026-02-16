import React, { createContext, useReducer } from "react";
import storeReducer, { initialStore } from "./store"; // ✅ misma carpeta

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};
