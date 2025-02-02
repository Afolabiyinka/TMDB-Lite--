// ThemeContext.js
import React, { createContext, useState, useContext } from "react";

// Create Context
const ThemeContext = createContext();

// Custom Hook to use Theme
export const useTheme = () => useContext(ThemeContext);

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is "light"

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
