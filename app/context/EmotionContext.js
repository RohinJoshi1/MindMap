import { createContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
  // Define your array of JSONs
  const [jsonArray, setJsonArray] = useState([]);

  // Add any other functions or state variables you need

  return (
    <MyContext.Provider value={{ jsonArray, setJsonArray }}>
      {children}
    </MyContext.Provider>
  );
};
