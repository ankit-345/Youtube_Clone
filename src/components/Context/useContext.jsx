import React, { createContext, useState } from "react";
export const myContext = createContext();

const MyProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <myContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </myContext.Provider>
  );
};

export default MyProvider;
