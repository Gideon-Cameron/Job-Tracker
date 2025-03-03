import React, { createContext, useState, useEffect, useContext } from "react";

// Define type for context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    console.log("Theme Changed:", theme); // ✅ Debugging: Log when theme updates

    // Remove any existing theme classes
    document.documentElement.classList.remove("light", "dark");

    // Apply the new theme class
    document.documentElement.classList.add(theme);

    // Save the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("Toggle Button Clicked"); // ✅ Debugging: Log when button is clicked
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
